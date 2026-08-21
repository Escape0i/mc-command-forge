/* ============================================================
   cb.js - 命令方块模式（V2 实验性）
   画布摆放 / 属性编辑 / 指令向导 / 铺设指令生成
   由Escape制作，适用于JAVA1.20.1
   ============================================================ */
'use strict';

const CBMode = {
  enabled: false,
  anchor: { x: 0, y: 64, z: 0 },
  cols: 9,
  rows: 7,
  blocks: {},          // "col,row" -> block
  selected: null,      // "col,row"
  orderCounter: 1,
};

const CB_TYPES = {
  impulse:   { id: 'minecraft:command_block',           zh: '普通（脉冲）', en: 'Impulse',   color: '#c98a3d' },
  chain:     { id: 'minecraft:chain_command_block',     zh: '连锁',          en: 'Chain',     color: '#3da8c9' },
  repeating: { id: 'minecraft:repeating_command_block', zh: '循环',          en: 'Repeating', color: '#a03dc9' },
};
const CB_FACINGS = {
  north: { arrow: '↑', zh: '北', en: 'North' }, south: { arrow: '↓', zh: '南', en: 'South' },
  east:  { arrow: '→', zh: '东', en: 'East' },  west:  { arrow: '←', zh: '西', en: 'West' },
  up:    { arrow: '▲', zh: '上', en: 'Up' },    down:  { arrow: '▼', zh: '下', en: 'Down' },
};
const CB_DIR_DELTA = { north: [0, -1], south: [0, 1], east: [1, 0], west: [-1, 0] };

/* ---------- 工具 ---------- */
const cbEscNbt = s => String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
const cbKey = (c, r) => c + ',' + r;

function cbT(key) {
  const d = I18N[LANG] || I18N.zh;
  return d[key] !== undefined ? d[key] : key;
}

/* ========== 画布 ========== */
function cbRenderCanvas() {
  const canvas = document.getElementById('cb-canvas');
  canvas.innerHTML = '';
  canvas.style.gridTemplateColumns = 'repeat(' + CBMode.cols + ', 48px)';
  canvas.style.gridTemplateRows = 'repeat(' + CBMode.rows + ', 48px)';

  for (let r = 0; r < CBMode.rows; r++) {
    for (let c = 0; c < CBMode.cols; c++) {
      const key = cbKey(c, r);
      const cell = document.createElement('div');
      cell.className = 'cb-cell';
      cell.dataset.key = key;
      const b = CBMode.blocks[key];
      if (b) {
        const t = CB_TYPES[b.type] || CB_TYPES.impulse;
        cell.classList.add('cb-cell-block');
        cell.style.background = 'linear-gradient(145deg, ' + t.color + 'cc, ' + t.color + '66)';
        cell.style.borderColor = t.color;
        // 编号 + 箭头
        const num = document.createElement('span');
        num.className = 'cb-cell-num';
        num.textContent = b.order;
        const arr = document.createElement('span');
        arr.className = 'cb-cell-arrow';
        arr.textContent = CB_FACINGS[b.facing] ? CB_FACINGS[b.facing].arrow : '';
        cell.appendChild(num); cell.appendChild(arr);
        // 指令标记
        if (b.command) {
          const dot = document.createElement('span');
          dot.className = 'cb-cell-dot';
          cell.appendChild(dot);
        }
        if (key === CBMode.selected) cell.classList.add('cb-cell-selected');
      }
      // 右键删除
      cell.addEventListener('contextmenu', e => {
        e.preventDefault();
        if (CBMode.blocks[key]) {
          delete CBMode.blocks[key];
          if (CBMode.selected === key) { CBMode.selected = null; }
          cbRenderCanvas(); cbRenderProps(); cbRenderOutput();
        }
      });
      // 左键：选中 / 放置
      cell.addEventListener('click', () => {
        if (CBMode.blocks[key]) {
          CBMode.selected = key;
          cbRenderCanvas(); cbRenderProps();
        } else if (CBMode.selected !== key) {
          cbPlace(key);
        }
      });
      canvas.appendChild(cell);
    }
  }
  cbRenderLinks(canvas);
}

/* 链接线：facing 水平方向相邻方块之间画线 */
const CB_CELL = 48, CB_GAP = 3, CB_PAD = 8;
function cbCellCenter(c, r) {
  return {
    x: CB_PAD + c * (CB_CELL + CB_GAP) + CB_CELL / 2,
    y: CB_PAD + r * (CB_CELL + CB_GAP) + CB_CELL / 2,
  };
}
function cbRenderLinks(canvas) {
  const old = canvas.querySelectorAll('.cb-link');
  old.forEach(o => o.remove());
  Object.keys(CBMode.blocks).forEach(key => {
    const [c, r] = key.split(',').map(Number);
    const b = CBMode.blocks[key];
    const d = CB_DIR_DELTA[b.facing];
    if (!d) return;
    const nk = cbKey(c + d[0], r + d[1]);
    if (!CBMode.blocks[nk]) return;
    const p1 = cbCellCenter(c, r);
    const p2 = cbCellCenter(c + d[0], r + d[1]);
    const link = document.createElement('div');
    link.className = 'cb-link';
    link.style.left = ((p1.x + p2.x) / 2 - 4) + 'px';
    link.style.top = ((p1.y + p2.y) / 2 - 4) + 'px';
    canvas.appendChild(link);
  });
}

/* 放置方块（用工具栏当前配置） */
function cbPlace(key) {
  const type = document.getElementById('cb-tool-type').value;
  const facing = document.getElementById('cb-tool-facing').value;
  const auto = document.getElementById('cb-tool-auto').checked;
  const conditional = document.getElementById('cb-tool-cond').checked;
  const delay = parseInt(document.getElementById('cb-tool-delay').value) || 0;
  CBMode.blocks[key] = {
    type, facing, auto, conditional, delay,
    name: '', command: '',
    order: CBMode.orderCounter++,
  };
  CBMode.selected = key;
  cbRenderCanvas(); cbRenderProps(); cbRenderOutput();
}

/* ========== 属性面板 ========== */
function cbRenderProps() {
  const wrap = document.getElementById('cb-props');
  wrap.innerHTML = '';
  const key = CBMode.selected;
  if (!key || !CBMode.blocks[key]) {
    const empty = document.createElement('div');
    empty.className = 'cb-props-empty';
    empty.textContent = cbT('cb_props_empty');
    wrap.appendChild(empty);
    return;
  }
  const b = CBMode.blocks[key];
  const [c, r] = key.split(',').map(Number);

  const pos = document.createElement('div');
  pos.className = 'cb-prop-pos';
  pos.textContent = cbT('cb_pos_label') + ': (' + (CBMode.anchor.x + c) + ', ' + (CBMode.anchor.y) + ', ' + (CBMode.anchor.z + r) + ')';
  wrap.appendChild(pos);

  // 类型
  wrap.appendChild(cbPropSelect(cbT('cb_type'), 'type',
    Object.keys(CB_TYPES).map(t => [t, CB_TYPES[t].zh, CB_TYPES[t].en]), b, cbSaveProp));
  // 朝向
  wrap.appendChild(cbPropSelect(cbT('cb_facing'), 'facing',
    Object.keys(CB_FACINGS).map(f => [f, CB_FACINGS[f].zh + ' ' + CB_FACINGS[f].arrow, CB_FACINGS[f].en]), b, cbSaveProp));
  // 红石 / 条件
  const toggles = document.createElement('div');
  toggles.className = 'param-row';
  [['auto', cbT('cb_auto')], ['conditional', cbT('cb_cond')]].forEach(cfg => {
    const label = document.createElement('label');
    label.className = 'nbt-check';
    const cbx = document.createElement('input');
    cbx.type = 'checkbox';
    cbx.checked = !!b[cfg[0]];
    cbx.addEventListener('change', () => { b[cfg[0]] = cbx.checked; cbRenderCanvas(); cbRenderProps(); cbRenderOutput(); });
    label.appendChild(cbx);
    const span = document.createElement('span');
    span.textContent = cfg[1];
    label.appendChild(span);
    toggles.appendChild(label);
  });
  wrap.appendChild(toggles);
  // 延迟
  wrap.appendChild(cbPropNumber(cbT('cb_delay'), 'delay', b, cbSaveProp));
  // 名称
  wrap.appendChild(cbPropText(cbT('cb_name_label'), 'name', b, cbSaveProp));
  // 指令
  const cmdLabel = document.createElement('div');
  cmdLabel.className = 'cb-prop-label';
  cmdLabel.textContent = cbT('cb_cmd_label');
  wrap.appendChild(cmdLabel);
  const cmdTa = document.createElement('textarea');
  cmdTa.className = 'cb-cmd-input';
  cmdTa.rows = 3;
  cmdTa.placeholder = cbT('cb_cmd_ph');
  cmdTa.value = b.command;
  cmdTa.spellcheck = false;
  cmdTa.addEventListener('input', () => { b.command = cmdTa.value; cbRenderCanvas(); cbRenderOutput(); });
  wrap.appendChild(cmdTa);
  const cmdHint = document.createElement('div');
  cmdHint.className = 'hint';
  cmdHint.textContent = cbT('cb_cmd_hint');
  wrap.appendChild(cmdHint);

  // 指令向导
  cbRenderGuide(wrap, b);

  // 移除
  const rm = document.createElement('button');
  rm.type = 'button';
  rm.className = 'btn-ghost cb-rm-btn';
  rm.textContent = cbT('cb_rm_btn');
  rm.addEventListener('click', () => {
    delete CBMode.blocks[key];
    CBMode.selected = null;
    cbRenderCanvas(); cbRenderProps(); cbRenderOutput();
  });
  wrap.appendChild(rm);
}

function cbPropLabel(text) {
  const l = document.createElement('div');
  l.className = 'cb-prop-label';
  l.textContent = text;
  return l;
}
function cbPropSelect(label, field, opts, b, save) {
  const box = document.createElement('div');
  box.className = 'cb-prop-row';
  box.appendChild(cbPropLabel(label));
  const sel = document.createElement('select');
  opts.forEach(o => {
    const opt = document.createElement('option');
    opt.value = o[0];
    opt.textContent = (LANG === 'zh' ? o[1] : o[2]);
    sel.appendChild(opt);
  });
  sel.value = b[field];
  sel.addEventListener('change', () => { save(b, field, sel.value); });
  box.appendChild(sel);
  return box;
}
function cbPropNumber(label, field, b, save) {
  const box = document.createElement('div');
  box.className = 'cb-prop-row';
  box.appendChild(cbPropLabel(label));
  const inp = document.createElement('input');
  inp.type = 'number'; inp.min = 0; inp.max = 999;
  inp.value = b[field];
  inp.addEventListener('input', () => { save(b, field, parseInt(inp.value) || 0); });
  box.appendChild(inp);
  return box;
}
function cbPropText(label, field, b, save) {
  const box = document.createElement('div');
  box.className = 'cb-prop-row';
  box.appendChild(cbPropLabel(label));
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.value = b[field];
  inp.addEventListener('input', () => { save(b, field, inp.value); cbRenderCanvas(); });
  box.appendChild(inp);
  return box;
}
function cbSaveProp(b, field, val) {
  b[field] = val;
  cbRenderCanvas(); cbRenderProps(); cbRenderOutput();
}

/* ========== 指令向导（独立于单指令模式） ========== */
const cbGuideState = { cmd: 'give', params: {} };

function cbRenderGuide(wrap, b) {
  const title = document.createElement('div');
  title.className = 'cb-guide-title';
  title.textContent = cbT('cb_guide_title');
  wrap.appendChild(title);

  const sel = document.createElement('select');
  sel.className = 'cb-guide-select';
  COMMAND_CATS.forEach(cat => {
    const g = document.createElement('optgroup');
    g.label = cbT(cat.key);
    cat.items.forEach(key => {
      if (!COMMANDS[key]) return;
      const opt = document.createElement('option');
      opt.value = key;
      opt.textContent = '/' + key + ' ' + (LANG === 'zh' ? COMMANDS[key].zh : COMMANDS[key].en);
      g.appendChild(opt);
    });
    sel.appendChild(g);
  });
  sel.value = cbGuideState.cmd in COMMANDS ? cbGuideState.cmd : 'give';
  sel.addEventListener('change', () => { cbGuideState.cmd = sel.value; cbGuideState.params = {}; cbRenderGuideParams(wrap, b); });
  wrap.appendChild(sel);

  const paramBox = document.createElement('div');
  paramBox.id = 'cb-guide-params';
  wrap.appendChild(paramBox);
  cbRenderGuideParams(wrap, b);

  const apply = document.createElement('button');
  apply.type = 'button';
  apply.className = 'btn-main cb-guide-apply';
  apply.textContent = cbT('cb_apply_cmd');
  apply.addEventListener('click', () => {
    const cmd = COMMANDS[cbGuideState.cmd];
    if (!cmd) return;
    try {
      const text = cmd.build(cbGuideState.params).replace(/^\/+/, '');
      b.command = text;
      const ta = wrap.querySelector('.cb-cmd-input');
      if (ta) ta.value = text;
      cbRenderCanvas(); cbRenderOutput();
    } catch (e) {}
  });
  wrap.appendChild(apply);
}

function cbRenderGuideParams(wrap, b) {
  const box = document.getElementById('cb-guide-params');
  if (!box) return;
  box.innerHTML = '';
  const cmd = COMMANDS[cbGuideState.cmd];
  if (!cmd || !cmd.params || !cmd.params.length) {
    const h = document.createElement('div');
    h.className = 'hint';
    h.textContent = cbT('no_args');
    box.appendChild(h);
    return;
  }
  cmd.params.forEach(p => {
    box.appendChild(cbBuildParam(p));
  });
}

function cbBuildParam(p) {
  const block = document.createElement('div');
  block.className = 'cb-gp';
  const label = document.createElement('div');
  label.className = 'cb-prop-label';
  label.textContent = (LANG === 'zh' ? p.zh : p.en) + (p.opt ? '' : ' *');
  block.appendChild(label);
  const row = document.createElement('div');
  row.className = 'param-row';
  const gs = cbGuideState.params;

  const init = () => {
    if (gs[p.k] === undefined) {
      if (p.t === 'checkbox') gs[p.k] = !!p.def;
      else if (p.def !== undefined) gs[p.k] = p.def;
      else gs[p.k] = '';
    }
    return gs[p.k];
  };

  switch (p.t) {
    case 'text': {
      const inp = document.createElement('input');
      inp.type = 'text'; inp.value = init();
      inp.addEventListener('input', () => { gs[p.k] = inp.value; });
      row.appendChild(inp);
      break;
    }
    case 'number': {
      const inp = document.createElement('input');
      inp.type = 'number';
      inp.min = p.min !== undefined ? p.min : 0;
      inp.max = p.max !== undefined ? p.max : 9999;
      inp.value = init();
      inp.addEventListener('input', () => { gs[p.k] = inp.value; });
      row.appendChild(inp);
      break;
    }
    case 'select': {
      const sel = document.createElement('select');
      (p.opts || []).forEach(o => {
        const opt = document.createElement('option');
        opt.value = o[0];
        opt.textContent = LANG === 'zh' ? o[1] : o[2];
        sel.appendChild(opt);
      });
      sel.value = init();
      sel.addEventListener('change', () => { gs[p.k] = sel.value; });
      row.appendChild(sel);
      break;
    }
    case 'checkbox': {
      const cbx = document.createElement('input');
      cbx.type = 'checkbox';
      cbx.checked = !!init();
      cbx.addEventListener('change', () => { gs[p.k] = cbx.checked; });
      row.appendChild(cbx);
      break;
    }
    case 'target': {
      const inp = document.createElement('input');
      inp.type = 'text'; inp.value = init(); inp.spellcheck = false;
      inp.addEventListener('input', () => { gs[p.k] = inp.value; });
      row.appendChild(inp);
      ['@p', '@a', '@e', '@r', '@s'].forEach(s => {
        const b2 = document.createElement('button');
        b2.type = 'button'; b2.className = 'btn-ghost sel-chip'; b2.textContent = s;
        b2.addEventListener('click', () => { inp.value = s; gs[p.k] = s; });
        row.appendChild(b2);
      });
      break;
    }
    case 'pos': {
      const parts = String(init()).split(' ');
      ['x', 'y', 'z'].forEach((ax, i) => {
        const inp = document.createElement('input');
        inp.type = 'text'; inp.value = parts[i] !== undefined ? parts[i] : '~'; inp.spellcheck = false;
        inp.addEventListener('input', () => {
          const all = row.querySelectorAll('.cb-gp-pos');
          gs[p.k] = Array.from(all).map(o => o.value).join(' ');
        });
        inp.className = 'cb-gp-pos';
        row.appendChild(inp);
      });
      break;
    }
    case 'item':
    case 'entity': {
      row.appendChild(cbBuildIdPicker(p));
      break;
    }
  }
  block.appendChild(row);
  if (p.h) {
    const h = document.createElement('div');
    h.className = 'hint';
    h.textContent = LANG === 'zh' ? p.h.replace(/`([^`]+)`/g, '$1') : p.h;
    block.appendChild(h);
  }
  return block;
}

/* 简化 ID 选择器 */
function cbBuildIdPicker(p) {
  const wrap = document.createElement('div');
  wrap.className = 'id-picker';
  const kind = p.t;
  const gs = cbGuideState.params;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'param-text id-input';
  input.value = gs[p.k] || '';
  input.spellcheck = false;
  input.addEventListener('input', () => { gs[p.k] = input.value; });
  const toggle = document.createElement('button');
  toggle.type = 'button'; toggle.className = 'btn-ghost id-toggle'; toggle.textContent = '▾';
  const rowWrap = document.createElement('div');
  rowWrap.className = 'param-row';
  rowWrap.appendChild(input); rowWrap.appendChild(toggle);
  wrap.appendChild(rowWrap);

  const panel = document.createElement('div');
  panel.className = 'id-picker';
  panel.hidden = true;
  const filters = document.createElement('div');
  filters.className = 'id-filters';
  const allChip = document.createElement('button');
  allChip.type = 'button'; allChip.className = 'id-filter-chip active';
  allChip.textContent = cbT('id_all'); allChip.dataset.mod = '';
  filters.appendChild(allChip);
  // 只显示当前类型下有数据的 mod
  const src = kind === 'item' ? (IDS.items || []) : (IDS.entities || []);
  (IDS.MODS || []).filter(m => src.some(it => it.mod === m.key)).forEach(m => {
    const chip = document.createElement('button');
    chip.type = 'button'; chip.className = 'id-filter-chip';
    chip.textContent = LANG === 'zh' ? m.zh : m.en;
    chip.dataset.mod = m.key;
    filters.appendChild(chip);
  });
  panel.appendChild(filters);
  const search = document.createElement('input');
  search.type = 'text'; search.className = 'id-search-box'; search.placeholder = cbT('id_search_ph');
  panel.appendChild(search);
  const list = document.createElement('div');
  list.className = 'id-list';
  panel.appendChild(list);
  wrap.appendChild(panel);

  const modMap = {};
  (IDS.MODS || []).forEach(m => modMap[m.key] = m);

  function render() {
    const modKey = panel.querySelector('.id-filter-chip.active').dataset.mod;
    const q = search.value.trim().toLowerCase();
    const all = kind === 'item' ? (IDS.items || []) : (IDS.entities || []);
    const matched = all.filter(it => {
      if (modKey && it.mod !== modKey) return false;
      if (!q) return true;
      return it.id.toLowerCase().includes(q) || (it.zh || '').includes(q) || (it.en || '').toLowerCase().includes(q);
    });
    list.innerHTML = '';
    matched.slice(0, 150).forEach(it => {
      const opt = document.createElement('div');
      opt.className = 'id-option';
      const m = modMap[it.mod];
      const tag = document.createElement('span');
      tag.className = 'id-tag';
      tag.textContent = m ? (LANG === 'zh' ? m.zh : m.en) : it.mod;
      tag.style.background = m ? m.color : '#666';
      const zh = document.createElement('span');
      zh.className = 'id-zh'; zh.textContent = it.zh;
      const en = document.createElement('span');
      en.className = 'id-en'; en.textContent = it.en;
      opt.appendChild(tag); opt.appendChild(zh); opt.appendChild(en);
      opt.addEventListener('click', () => {
        gs[p.k] = it.id;
        input.value = it.id;
        panel.hidden = true;
        list.querySelectorAll('.id-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
      list.appendChild(opt);
    });
    if (!list.children.length) {
      const d = document.createElement('div');
      d.className = 'id-empty';
      d.textContent = cbT('id_no_result');
      list.appendChild(d);
    }
  }

  toggle.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) { search.value = ''; render(); }
  });
  search.addEventListener('input', render);
  filters.addEventListener('click', e => {
    const chip = e.target.closest('.id-filter-chip');
    if (!chip) return;
    filters.querySelectorAll('.id-filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    render();
  });
  return wrap;
}

/* ========== 铺设指令生成 ========== */
function cbRenderOutput() {
  const ta = document.getElementById('cb-output-text');
  if (!ta) return;
  const keys = Object.keys(CBMode.blocks);
  if (!keys.length) {
    ta.value = '// ' + cbT('cb_empty_output');
    return;
  }
  const lines = [];
  keys.sort((a, b) => CBMode.blocks[a].order - CBMode.blocks[b].order);
  keys.forEach(key => {
    const [c, r] = key.split(',').map(Number);
    const b = CBMode.blocks[key];
    const t = CB_TYPES[b.type] || CB_TYPES.impulse;
    const x = CBMode.anchor.x + c;
    const y = CBMode.anchor.y;
    const z = CBMode.anchor.z + r;
    const nbt = [];
    nbt.push('facing:' + b.facing);
    nbt.push('auto:' + (b.auto ? '1b' : '0b'));
    nbt.push('conditional:' + (b.conditional ? '1b' : '0b'));
    if (b.delay > 0) nbt.push('TickDelay:' + b.delay + 'd');
    if (b.name) nbt.push('CustomName:"' + cbEscNbt(b.name) + '"');
    if (b.command) nbt.push('Command:"' + cbEscNbt(b.command) + '"');
    lines.push('setblock ' + x + ' ' + y + ' ' + z + ' ' + t.id + '{' + nbt.join(',') + '} replace');
  });
  ta.value = lines.join('\n');
}

function cbCopyAll() {
  const ta = document.getElementById('cb-output-text');
  if (!ta || !ta.value || ta.value.indexOf('//') === 0) return;
  ta.focus(); ta.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) {}
  const btn = document.getElementById('cb-copy-all');
  const old = btn.textContent;
  btn.textContent = cbT('cb_copied');
  btn.classList.add('copied-flash');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('copied-flash'); }, 900);
}

/* ========== 初始化 ========== */
function cbInit() {
  document.getElementById('cb-clear-all').addEventListener('click', () => {
    if (!Object.keys(CBMode.blocks).length) return;
    showConfirm(LANG === 'zh' ? '确定清空画布上的所有命令方块？' : 'Clear all command blocks on the canvas?', () => {
      CBMode.blocks = {};
      CBMode.selected = null;
      CBMode.orderCounter = 1;
      cbRenderCanvas(); cbRenderProps(); cbRenderOutput();
    });
  });
  document.getElementById('cb-copy-all').addEventListener('click', cbCopyAll);
  // 锚点变化
  ['cb-anchor-x', 'cb-anchor-y', 'cb-anchor-z'].forEach((id, i) => {
    document.getElementById(id).addEventListener('input', e => {
      const axis = ['x', 'y', 'z'][i];
      CBMode.anchor[axis] = parseInt(e.target.value) || 0;
      cbRenderProps(); cbRenderOutput();
    });
  });
  cbRenderCanvas(); cbRenderProps(); cbRenderOutput();
}
