/* ============================================================
   app.js - MC指令生成器 前端核心逻辑
   由Escape制作，适用于JAVA1.20.1
   ============================================================ */
'use strict';

/* ---------- 状态 ---------- */
let currentCmd = null;
let state = {};            // 当前指令的参数值
let cmdSearch = '';        // 指令搜索关键词
const cmdHistory = [];     // 生成历史
const $ = id => document.getElementById(id);

/* ---------- 指令树 ---------- */
function renderTree() {
  const tree = $('cmd-tree');
  tree.innerHTML = '';
  const q = cmdSearch.trim().toLowerCase();
  COMMAND_CATS.forEach(cat => {
    const items = cat.items.filter(key => {
      const cmd = COMMANDS[key];
      if (!cmd) return false;
      if (!q) return true;
      return key.toLowerCase().includes(q) ||
        (cmd.zh || '').toLowerCase().includes(q) ||
        (cmd.en || '').toLowerCase().includes(q);
    });
    if (!items.length) return;
    const group = document.createElement('div');
    group.className = 'tree-group';
    const title = document.createElement('div');
    title.className = 'tree-group-title';
    title.textContent = t(cat.key);
    group.appendChild(title);
    items.forEach(key => {
      const cmd = COMMANDS[key];
      const btn = document.createElement('button');
      btn.className = 'tree-cmd';
      btn.dataset.cmd = key;
      btn.textContent = '/' + key + ' ' + (LANG === 'zh' ? cmd.zh : cmd.en);
      if (key === currentCmd) btn.classList.add('active');
      btn.addEventListener('click', () => selectCommand(key));
      group.appendChild(btn);
    });
    tree.appendChild(group);
  });
  if (!tree.children.length) {
    const empty = document.createElement('div');
    empty.className = 'tree-empty';
    empty.textContent = t('search_no_result');
    tree.appendChild(empty);
  }
}

function selectCommand(key) {
  currentCmd = key;
  state = {};
  document.querySelectorAll('.tree-cmd').forEach(b => b.classList.toggle('active', b.dataset.cmd === key));
  renderCmdInfo();
  renderParams();
  renderOutput();
}

/* ---------- 指令信息卡 ---------- */
function renderCmdInfo() {
  const info = $('cmd-info');
  if (!currentCmd || !COMMANDS[currentCmd]) { info.classList.add('hidden'); return; }
  const cmd = COMMANDS[currentCmd];
  const cat = COMMAND_CATS.find(c => c.items.indexOf(currentCmd) > -1);
  info.innerHTML = '';
  info.classList.remove('hidden');

  const name = document.createElement('div');
  name.className = 'cmd-info-name';
  const slash = document.createElement('span');
  slash.className = 'cmd-slash';
  slash.textContent = '/';
  const keySpan = document.createElement('span');
  keySpan.className = 'cmd-key';
  keySpan.textContent = currentCmd;
  const zh = document.createElement('span');
  zh.className = 'cmd-zh';
  zh.textContent = ' ' + (LANG === 'zh' ? cmd.zh : cmd.en);
  name.appendChild(slash); name.appendChild(keySpan); name.appendChild(zh);
  info.appendChild(name);

  const meta = document.createElement('div');
  meta.className = 'cmd-info-meta';
  if (cat) {
    const tag = document.createElement('span');
    tag.className = 'cmd-info-tag';
    tag.textContent = t(cat.key);
    meta.appendChild(tag);
  }
  info.appendChild(meta);

  const usage = document.createElement('div');
  usage.className = 'cmd-info-usage';
  const lbl = document.createElement('span');
  lbl.className = 'cmd-info-lbl';
  lbl.textContent = t('usage_label');
  usage.appendChild(lbl);
  const code = document.createElement('code');
  code.textContent = cmd.usage || ('/' + currentCmd);
  usage.appendChild(code);
  info.appendChild(usage);
}

/* ---------- 参数表单 ---------- */
function buildParamBlock(p, val) {
  const block = document.createElement('div');
  block.className = 'param-block';
  block.dataset.key = p.k;

  const label = document.createElement('label');
  label.className = 'param-label';
  label.textContent = (LANG === 'zh' ? p.zh : p.en) + (p.opt ? '' : ' *');
  block.appendChild(label);

  const row = document.createElement('div');
  row.className = 'param-row';

  switch (p.t) {
    case 'text': {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'param-text';
      input.value = val !== undefined ? val : (p.def !== undefined ? p.def : '');
      input.placeholder = p.ph || '';
      input.addEventListener('input', () => { state[p.k] = input.value; refreshBlock(p, block); renderOutput(); });
      row.appendChild(input);
      break;
    }
    case 'number': {
      const input = document.createElement('input');
      input.type = 'number';
      input.className = 'param-num';
      if (p.min !== undefined) input.min = p.min;
      if (p.max !== undefined) input.max = p.max;
      if (p.step !== undefined) input.step = p.step;
      input.value = val !== undefined ? val : (p.def !== undefined ? p.def : '');
      input.addEventListener('input', () => { state[p.k] = input.value; refreshBlock(p, block); renderOutput(); });
      // 自定义步进按钮
      const stepVal = () => (p.step !== undefined ? p.step : 1);
      const bump = (dir) => {
        let cur = parseFloat(input.value);
        if (isNaN(cur)) cur = p.min !== undefined ? p.min : 0;
        let nv = cur + dir * stepVal();
        nv = Math.round(nv * 100) / 100;
        if (p.min !== undefined && nv < p.min) nv = p.min;
        if (p.max !== undefined && nv > p.max) nv = p.max;
        input.value = String(nv);
        state[p.k] = input.value;
        refreshBlock(p, block);
        renderOutput();
      };
      const dec = document.createElement('button');
      dec.type = 'button'; dec.className = 'num-step'; dec.textContent = '−';
      dec.addEventListener('click', () => bump(-1));
      const inc = document.createElement('button');
      inc.type = 'button'; inc.className = 'num-step num-inc'; inc.textContent = '+';
      inc.addEventListener('click', () => bump(1));
      const grp = document.createElement('div');
      grp.className = 'num-group';
      grp.appendChild(input); grp.appendChild(dec); grp.appendChild(inc);
      row.appendChild(grp);
      break;
    }
    case 'select': {
      const sel = document.createElement('select');
      (p.opts || []).forEach(o => {
        const opt = document.createElement('option');
        opt.value = o[0];
        opt.textContent = (LANG === 'zh' ? o[1] : o[2]) + (o[0] !== (LANG === 'zh' ? o[1] : o[2]) ? ' (' + o[0] + ')' : '');
        sel.appendChild(opt);
      });
      sel.value = val !== undefined ? val : (p.def !== undefined ? p.def : (p.opts[0] && p.opts[0][0]));
      sel.addEventListener('change', () => { state[p.k] = sel.value; refreshBlock(p, block); renderOutput(); });
      row.appendChild(sel);
      break;
    }
    case 'checkbox': {
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!val || !!p.def;
      cb.addEventListener('change', () => { state[p.k] = cb.checked; refreshBlock(p, block); renderOutput(); });
      row.appendChild(cb);
      break;
    }
    case 'target': {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'param-text target-input';
      input.value = val !== undefined ? val : (p.def !== undefined ? p.def : '@p');
      input.spellcheck = false;
      input.addEventListener('input', () => { state[p.k] = input.value; renderOutput(); });
      row.appendChild(input);
      const SEL_TIPS = {
        '@p': LANG === 'zh' ? '最近的玩家' : 'Nearest player',
        '@a': LANG === 'zh' ? '所有玩家' : 'All players',
        '@e': LANG === 'zh' ? '所有实体（含生物、掉落物等）' : 'All entities',
        '@r': LANG === 'zh' ? '随机玩家' : 'Random player',
        '@s': LANG === 'zh' ? '指令执行者（自己/命令方块）' : 'Executor',
      };
      ['@p', '@a', '@e', '@r', '@s'].forEach(s => {
        const b = document.createElement('button');
        b.className = 'btn-ghost sel-chip';
        b.textContent = s;
        b.type = 'button';
        b.title = SEL_TIPS[s];
        b.addEventListener('click', () => { input.value = s; state[p.k] = s; renderOutput(); });
        row.appendChild(b);
      });
      const th = document.createElement('div');
      th.className = 'hint target-hint';
      th.innerHTML = LANG === 'zh'
        ? '<code>@p</code> 最近的玩家 · <code>@a</code> 所有玩家 · <code>@e</code> 所有实体 · <code>@r</code> 随机玩家 · <code>@s</code> 指令执行者'
        : '<code>@p</code> nearest player · <code>@a</code> all players · <code>@e</code> all entities · <code>@r</code> random player · <code>@s</code> executor';
      const th2 = document.createElement('div');
      th2.className = 'hint';
      th2.innerHTML = LANG === 'zh'
        ? '进阶：<code>@e[type=zombie]</code> 筛选指定实体，<code>@a[tag=admin]</code> 筛选带标签的玩家，<code>@p[limit=3]</code> 取最近的 3 个'
        : 'Advanced: <code>@e[type=zombie]</code> filter entities, <code>@a[tag=admin]</code> filter by tag, <code>@p[limit=3]</code> take nearest 3';
      block.appendChild(th);
      block.appendChild(th2);
      break;
    }
    case 'pos': {
      const parts = (val !== undefined && val !== '' ? String(val).split(' ') : (p.def || '~ ~ ~').split(' '));
      ['x', 'y', 'z'].forEach((ax, i) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'param-num pos-input';
        input.value = parts[i] !== undefined ? parts[i] : '~';
        input.spellcheck = false;
        input.addEventListener('input', () => {
          const others = row.querySelectorAll('.pos-input');
          state[p.k] = Array.from(others).map(o => o.value).join(' ');
          renderOutput();
        });
        row.appendChild(input);
      });
      const hint = document.createElement('span');
      hint.className = 'pos-hint';
      hint.textContent = 'x y z（~ 相对坐标，^ 局部坐标）';
      row.appendChild(hint);
      break;
    }
    case 'nbt_give': {
      row.appendChild(renderNbtEditor(p, val));
      break;
    }
  }

  if (p.h) {
    const h = document.createElement('div');
    h.className = 'hint';
    h.innerHTML = p.h.replace(/`([^`]+)`/g, '<code>$1</code>');
    block.appendChild(h);
  }

  block.insertBefore(row, block.querySelector('.hint'));
  block.appendChild(row);
  return block;
}

/* ---------- give 的 NBT 可视化编辑器 ---------- */
function renderNbtEditor(p, val) {
  const wrap = document.createElement('div');
  wrap.className = 'nbt-editor';
  const d = state.nbt_data || (state.nbt_data = { enchants: [], name: '', lore: '', unbreakable: false, hideflags: false, custom: '' });
  const L = () => (LANG === 'zh' ? 0 : 1);
  const S = [['附魔', 'Enchantments'], ['自定义名称', 'Custom Name'], ['描述 (Lore)', 'Lore'], ['不可破坏', 'Unbreakable'], ['隐藏工具提示', 'Hide Tooltips'], ['其他 NBT（高级）', 'Other NBT (advanced)'], ['添加附魔', 'Add Enchantment']];

  /* 附魔列表 */
  const enchBox = document.createElement('div');
  enchBox.className = 'nbt-enchants';
  const enchTitle = document.createElement('div');
  enchTitle.className = 'nbt-sec-title';
  enchTitle.textContent = S[0][L()];
  enchBox.appendChild(enchTitle);
  const enchRows = document.createElement('div');
  enchBox.appendChild(enchRows);
  function renderEnchRows() {
    enchRows.innerHTML = '';
    if (!d.enchants.length) {
      const empty = document.createElement('div');
      empty.className = 'hint';
      empty.textContent = LANG === 'zh' ? '未添加附魔' : 'No enchantments added';
      enchRows.appendChild(empty);
    }
    d.enchants.forEach((en, i) => {
      const row = document.createElement('div');
      row.className = 'param-row ench-row';
      const sel = document.createElement('select');
      (ENCHANTS || []).forEach(e => {
        const o = document.createElement('option');
        o.value = 'minecraft:' + e[0];
        o.textContent = (LANG === 'zh' ? e[1] : e[2]) + ' (' + e[0] + ')';
        sel.appendChild(o);
      });
      sel.value = en.id || 'minecraft:sharpness';
      sel.addEventListener('change', () => { en.id = sel.value; renderOutput(); });
      const lvl = document.createElement('input');
      lvl.type = 'number'; lvl.min = 1; lvl.max = 255; lvl.value = en.lvl || 1;
      lvl.className = 'param-num'; lvl.title = '等级 / Level';
      lvl.addEventListener('input', () => { en.lvl = parseInt(lvl.value) || 1; renderOutput(); });
      const del = document.createElement('button');
      del.type = 'button'; del.className = 'btn-ghost'; del.textContent = '✕'; del.title = '移除 / Remove';
      del.addEventListener('click', () => { d.enchants.splice(i, 1); renderEnchRows(); renderOutput(); });
      row.appendChild(sel); row.appendChild(lvl); row.appendChild(del);
      enchRows.appendChild(row);
    });
  }
  const addEnch = document.createElement('button');
  addEnch.type = 'button'; addEnch.className = 'btn-ghost';
  addEnch.textContent = S[6][L()];
  addEnch.addEventListener('click', () => { d.enchants.push({ id: 'minecraft:sharpness', lvl: 1 }); renderEnchRows(); renderOutput(); });
  enchBox.appendChild(addEnch);
  renderEnchRows();
  wrap.appendChild(enchBox);

  /* 自定义名称 */
  const nameLabel = document.createElement('div');
  nameLabel.className = 'nbt-sec-title';
  nameLabel.textContent = S[1][L()];
  wrap.appendChild(nameLabel);
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'param-text';
  nameInput.value = d.name;
  nameInput.placeholder = LANG === 'zh' ? '如：神剑' : 'e.g. Legendary Sword';
  nameInput.addEventListener('input', () => { d.name = nameInput.value; renderOutput(); });
  wrap.appendChild(nameInput);

  /* 描述 Lore */
  const loreLabel = document.createElement('div');
  loreLabel.className = 'nbt-sec-title';
  loreLabel.textContent = S[2][L()];
  wrap.appendChild(loreLabel);
  const loreInput = document.createElement('textarea');
  loreInput.className = 'param-text nbt-lore';
  loreInput.rows = 2;
  loreInput.value = d.lore;
  loreInput.placeholder = LANG === 'zh' ? '每行一条描述' : 'One line per lore';
  loreInput.addEventListener('input', () => { d.lore = loreInput.value; renderOutput(); });
  wrap.appendChild(loreInput);

  /* 开关组：不可破坏 / 隐藏工具提示 */
  const toggleBox = document.createElement('div');
  toggleBox.className = 'param-row nbt-toggles';
  [['unbreakable', S[3], 0], ['hideflags', S[4], 1]].forEach(cfg => {
    const key = cfg[0];
    const label = document.createElement('label');
    label.className = 'nbt-check';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = !!d[key];
    cb.addEventListener('change', () => { d[key] = cb.checked; renderOutput(); });
    label.appendChild(cb);
    const span = document.createElement('span');
    span.textContent = cfg[1][cfg[2]];
    label.appendChild(span);
    toggleBox.appendChild(label);
  });
  wrap.appendChild(toggleBox);

  /* 其他 NBT */
  const customLabel = document.createElement('div');
  customLabel.className = 'nbt-sec-title';
  customLabel.textContent = S[5][L()];
  wrap.appendChild(customLabel);
  const customInput = document.createElement('textarea');
  customInput.className = 'param-text nbt-lore';
  customInput.rows = 2;
  customInput.value = d.custom;
  customInput.placeholder = 'AttributeModifiers:[...]';
  customInput.addEventListener('input', () => { d.custom = customInput.value; renderOutput(); });
  wrap.appendChild(customInput);

  const hint = document.createElement('div');
  hint.className = 'hint';
  hint.textContent = LANG === 'zh' ? '生成的 NBT 符合 1.20.1 格式，直接可用。附魔等级超出上限时游戏会自动降级。' : 'Generated NBT follows 1.20.1 format. Levels above cap are clamped in-game.';
  wrap.appendChild(hint);
  return wrap;
}

/* 条件显示刷新 */
function refreshBlock(p, block) {
  if (p.showIf) {
    const show = p.showIf(state);
    block.style.display = show ? '' : 'none';
    if (!show) delete state[p.k];
  }
}

function renderParams() {
  const wrap = $('param-wrap');
  wrap.innerHTML = '';
  if (!currentCmd) return;
  const cmd = COMMANDS[currentCmd];
  if (!cmd || !cmd.params || !cmd.params.length) {
    const empty = document.createElement('div');
    empty.id = 'param-empty';
    empty.className = 'i18n';
    empty.setAttribute('data-i18n', 'no_args');
    empty.textContent = t('no_args');
    wrap.appendChild(empty);
    return;
  }
  cmd.params.forEach(p => {
    // 默认值注入 state，保证 build 时能取到
    if (state[p.k] === undefined) {
      if (p.t === 'checkbox') state[p.k] = !!p.def;
      else if (p.def !== undefined) state[p.k] = p.def;
    }
    const block = buildParamBlock(p, state[p.k]);
    wrap.appendChild(block);
    // 处理 item/entity 类型：在 block 上挂 ID 选择器
    if (p.t === 'item' || p.t === 'entity') {
      attachIdPicker(block, p);
    }
    refreshBlock(p, block);
  });
}

/* ---------- ID 选择器（带来源筛选） ---------- */
function attachIdPicker(block, p) {
  const kind = p.t; // item / entity
  const row = block.querySelector('.param-row');
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'param-text id-input';
  input.value = state[p.k] || '';
  input.spellcheck = false;
  input.placeholder = 'minecraft:' + kind;
  input.addEventListener('input', () => {
    state[p.k] = input.value;
    const picker = block.querySelector('.id-picker');
    if (picker && !picker.hidden) renderIdList(picker, p, '');
    renderOutput();
  });
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'btn-ghost id-toggle';
  toggle.textContent = '▾';
  row.appendChild(input);
  row.appendChild(toggle);

  const picker = document.createElement('div');
  picker.className = 'id-picker';
  picker.hidden = true;
  block.appendChild(picker);

  // 来源筛选按钮
  const filters = document.createElement('div');
  filters.className = 'id-filters';
  picker.appendChild(filters);
  const allChip = document.createElement('button');
  allChip.type = 'button';
  allChip.className = 'id-filter-chip active';
  allChip.textContent = t('id_all');
  allChip.dataset.mod = '';
  filters.appendChild(allChip);
  // 只显示当前类型下有数据的 mod
  const src = kind === 'item' ? (IDS.items || []) : (IDS.entities || []);
  (IDS.MODS || []).filter(m => src.some(it => it.mod === m.key)).forEach(m => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'id-filter-chip';
    chip.textContent = LANG === 'zh' ? m.zh : m.en;
    chip.dataset.mod = m.key;
    chip.style.borderColor = m.color;
    filters.appendChild(chip);
  });

  // 搜索框
  const search = document.createElement('input');
  search.type = 'text';
  search.className = 'id-search-box';
  search.placeholder = t('id_search_ph');
  search.addEventListener('input', () => renderIdList(picker, p, search.value));
  picker.appendChild(search);

  // 列表
  const list = document.createElement('div');
  list.className = 'id-list';
  picker.appendChild(list);

  let currentMod = '';
  filters.addEventListener('click', e => {
    const chip = e.target.closest('.id-filter-chip');
    if (!chip) return;
    filters.querySelectorAll('.id-filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentMod = chip.dataset.mod;
    renderIdList(picker, p, search.value);
  });

  toggle.addEventListener('click', () => {
    picker.hidden = !picker.hidden;
    if (!picker.hidden) {
      search.value = '';
      renderIdList(picker, p, '');
    }
  });

  renderIdList(picker, p, '');
}

function renderIdList(picker, p, query) {
  const list = picker.querySelector('.id-list');
  const modKey = picker.querySelector('.id-filter-chip.active').dataset.mod;
  const kind = p.t;
  const q = (query || '').trim().toLowerCase();
  const all = (kind === 'item' ? (IDS.items || []) : (IDS.entities || []));
  const matched = all.filter(it => {
    if (modKey && it.mod !== modKey) return false;
    if (!q) return true;
    return it.id.toLowerCase().includes(q) || (it.zh || '').includes(q) || (it.en || '').toLowerCase().includes(q);
  });
  const shown = matched.slice(0, 150);
  list.innerHTML = '';
  if (!shown.length) {
    const d = document.createElement('div');
    d.className = 'id-empty';
    d.textContent = t('id_no_result');
    list.appendChild(d);
    return;
  }
  const modMap = {};
  (IDS.MODS || []).forEach(m => modMap[m.key] = m);
  shown.forEach(it => {
    const opt = document.createElement('div');
    opt.className = 'id-option';
    const m = modMap[it.mod];
    const tag = document.createElement('span');
    tag.className = 'id-tag';
    tag.textContent = m ? (LANG === 'zh' ? m.zh : m.en) : it.mod;
    tag.style.background = m ? m.color : '#666';
    const zh = document.createElement('span');
    zh.className = 'id-zh';
    zh.textContent = it.zh;
    const en = document.createElement('span');
    en.className = 'id-en';
    en.textContent = it.en;
    const idc = document.createElement('span');
    idc.className = 'id-id';
    idc.textContent = it.id;
    idc.style.opacity = '.6';
    opt.appendChild(tag); opt.appendChild(zh); opt.appendChild(en); opt.appendChild(idc);
    if (state[p.k] === it.id) opt.classList.add('selected');
    opt.addEventListener('click', () => {
      state[p.k] = it.id;
      const input = picker.parentElement.querySelector('.id-input');
      if (input) input.value = it.id;
      picker.hidden = true;
      renderOutput();
      // 高亮选择
      list.querySelectorAll('.id-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
    list.appendChild(opt);
  });
}

/* ---------- 指令生成 ---------- */
function renderOutput() {
  const out = $('cmd-output');
  if (!currentCmd || !COMMANDS[currentCmd]) { out.value = ''; $('cmd-len').textContent = ''; return; }
  const cmd = COMMANDS[currentCmd];
  // 必填参数校验
  const missing = (cmd.params || []).filter(p =>
    !p.opt && p.t !== 'checkbox' && (state[p.k] === undefined || state[p.k] === null || state[p.k] === '')
  );
  if (missing.length) {
    out.value = '// ' + (LANG === 'zh' ? '请填写必填项：' : 'Missing required: ') +
      missing.map(p => (LANG === 'zh' ? p.zh : p.en)).join(', ');
    const lenEl = $('cmd-len');
    lenEl.textContent = '';
    lenEl.classList.remove('over');
    return;
  }
  let text = '';
  try {
    if (typeof cmd.build === 'function') {
      text = cmd.build(state);
    } else {
      // 通用拼接：按 params 顺序
      const parts = ['/' + currentCmd];
      cmd.params.forEach(p => {
        const v = state[p.k];
        if (v === undefined || v === null || v === '') return;
        if (typeof v === 'boolean') { if (v) parts.push('true'); return; }
        parts.push(String(v));
      });
      text = parts.join(' ');
    }
    text = text.replace(/^\/+/, '');
  } catch (e) {
    text = '// 生成出错: ' + e.message;
  }
  out.value = text;
  renderLen(text.length);
}

/* 长度显示 */
function renderLen(len) {
  const lenEl = $('cmd-len');
  lenEl.textContent = len + ' chars';
  lenEl.classList.toggle('over', len > 32500);
}

/* ---------- 生成历史 ---------- */
let lastHistText = '';

function pushHistory(text) {
  if (!text || text.indexOf('//') === 0) return;
  const idx = cmdHistory.indexOf(text);
  if (idx > -1) cmdHistory.splice(idx, 1);
  cmdHistory.unshift(text);
  lastHistText = text;
  if (cmdHistory.length > 12) cmdHistory.pop();
  renderHistory();
}

function renderHistory() {
  const list = $('history-list');
  if (!list) return;
  list.innerHTML = '';
  if (!cmdHistory.length) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = t('history_empty');
    list.appendChild(empty);
    return;
  }
  cmdHistory.forEach(c => {
    const item = document.createElement('div');
    item.className = 'history-item';
    if (c === lastHistText) item.classList.add('history-new');
    item.textContent = c;
    item.title = t('copy');
    item.addEventListener('click', () => {
      const out = $('cmd-output');
      out.value = c;
      renderLen(c.length);
      copyCmd();
    });
    list.appendChild(item);
  });
}

/* ---------- 复制 / 清空 ---------- */
function copyCmd() {
  const out = $('cmd-output');
  if (!out.value) return;
  pushHistory(out.value);
  out.focus();
  out.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  const btn = $('btn-copy');
  const old = btn.textContent;
  btn.textContent = t('copied');
  btn.classList.add('copied-flash');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('copied-flash'); }, 800);
}

function clearCmd() {
  state = {};
  renderParams();
  renderOutput();
}

/* ---------- 问题反馈：点击复制邮箱 ---------- */
const FEEDBACK_EMAIL = '3419500575@qq.com';

function feedback() {
  const btn = $('btn-feedback');
  const ta = document.createElement('textarea');
  ta.value = FEEDBACK_EMAIL;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
  const old = btn.textContent;
  btn.textContent = FEEDBACK_EMAIL + ' ✓';
  btn.classList.add('copied-flash');
  setTimeout(() => { btn.textContent = old; btn.classList.remove('copied-flash'); }, 1600);
}

/* ---------- 通用确认弹窗 ---------- */
let modalOkCb = null;
function showConfirm(msg, onOk) {
  document.getElementById('modal-title').textContent = msg;
  document.getElementById('modal').classList.remove('hidden');
  modalOkCb = onOk || null;
}
function hideModal() {
  document.getElementById('modal').classList.add('hidden');
  modalOkCb = null;
}

/* ---------- 模式切换（单指令 / 命令方块） ---------- */
function setMode(mode) {
  const single = mode === 'single';
  document.getElementById('main').classList.toggle('hidden', !single);
  document.getElementById('cb-mode').classList.toggle('hidden', single);
  document.getElementById('mode-single').classList.toggle('active', single);
  document.getElementById('mode-cb').classList.toggle('active', !single);
  if (!single && !CBMode.enabled) {
    CBMode.enabled = true;
    cbInit();
  }
}

/* ---------- 语言 & 主题 ---------- */
function setLang(l) {
  LANG = l;
  try { localStorage.setItem('mc_lang', l); } catch (e) {}
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en-US';
  applyI18n();
  renderTree();
  renderParams();
  renderOutput();
}

function setTheme(th) {
  document.documentElement.setAttribute('data-theme', th);
  try { localStorage.setItem('mc_theme', th); } catch (e) {}
}

/* ---------- 初始化 ---------- */
function init() {
  // 数据全局去重（按注册名）
  IDS.items = IDS.items.filter((v, i, a) => a.findIndex(x => x.id === v.id) === i);
  IDS.entities = IDS.entities.filter((v, i, a) => a.findIndex(x => x.id === v.id) === i);

  // 启动画面：加载条动画结束后淡出
  setTimeout(() => {
    const sp = $('splash');
    if (sp) sp.classList.add('hide');
  }, 1150);

  try {
    const savedLang = localStorage.getItem('mc_lang');
    if (savedLang === 'en') setLang('en');
    const savedTheme = localStorage.getItem('mc_theme');
    setTheme(savedTheme === 'light' ? 'light' : 'dark');
  } catch (e) {}

  $('btn-lang').addEventListener('click', () => setLang(LANG === 'zh' ? 'en' : 'zh'));
  $('btn-theme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') || 'dark';
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });
  $('btn-copy').addEventListener('click', copyCmd);
  $('btn-clear').addEventListener('click', clearCmd);
  $('btn-feedback').addEventListener('click', feedback);

  // 确认弹窗
  document.getElementById('modal-ok').addEventListener('click', () => {
    const cb = modalOkCb;
    hideModal();
    if (cb) cb();
  });
  document.getElementById('modal-cancel').addEventListener('click', hideModal);
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target.classList.contains('modal-mask')) hideModal();
  });

  // 模式切换
  document.getElementById('mode-single').addEventListener('click', () => setMode('single'));
  document.getElementById('mode-cb').addEventListener('click', () => setMode('cb'));

  // 指令搜索
  const search = $('cmd-search');
  if (search) {
    search.placeholder = t('search_ph');
    search.addEventListener('input', () => {
      cmdSearch = search.value;
      renderTree();
    });
  }

  renderHistory();
  renderTree();
  selectCommand('give');
}

document.addEventListener('DOMContentLoaded', init);
