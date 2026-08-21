/* ============================================================
   i18n 双语字典（界面通用文本）
   指令名与参数标签在 commands.js 中内联双语，此处只管界面元素
   ============================================================ */
'use strict';

const I18N = {
  zh: {
    app_title: 'MC指令生成器',
    empty_hint: '从左侧选择一个指令开始',
    output_title: '指令预览',
    copy: '复制',
    copied: '已复制 ✓',
    clear: '清空',
    chat_limit_tip: '提示：聊天栏单条指令上限 256 字符，长指令请使用命令方块。',
    no_args: '该指令无参数，直接输出。',
    history_title: '生成记录（点击可复制）',
    history_empty: '还没有生成记录',
    search_ph: '搜索指令…',
    search_no_result: '没有匹配的指令',
    usage_label: '语法',
    cat_label: '分类',
    examples_label: '示例',
    feedback: '问题反馈',
    mode_single: '单指令',
    mode_cb: '命令方块',
    cb_warn: '⚠ 命令方块模式为实验性功能（V2 beta），铺设指令请在创造模式世界先行测试，不同环境（整合包/插件）可能存在兼容差异。',
    cb_type: '类型', cb_type_impulse: '普通（脉冲）', cb_type_chain: '连锁', cb_type_repeating: '循环',
    cb_facing: '朝向', cb_anchor: '起点坐标', cb_defaults: '放置默认',
    cb_auto: '保持开启', cb_cond: '有条件', cb_delay: '延迟',
    cb_clear_all: '清空画布', cb_canvas_hint: '左键放置/选中，右键删除。箭头表示指令输出方向（连锁生效方向）。',
    cb_props: '方块属性', cb_props_empty: '在画布上点击一个命令方块进行编辑',
    cb_place_cmds: '铺设指令（在游戏内依次执行，自动搭建命令方块链）', cb_copy_all: '全部复制',
    cb_cmd_label: '指令内容', cb_cmd_ph: '点击下方向导生成，或直接输入 1.20.1 指令（不含 /）',
    cb_guide_title: '指令向导（与单指令模式一致）', cb_apply_cmd: '填入指令', cb_cmd_hint: '指令可为复合指令（如 execute … run …），支持手动修改。',
    cb_name_label: '方块名称（可选）', cb_pos_label: '位置', cb_copied: '已复制 ✓',
    cb_rm_btn: '移除', cb_empty_output: '画布为空，先摆放命令方块',
    cb_out_count: '条铺设指令',
    modal_ok: '确定', modal_cancel: '取消',
    id_search_ph: '搜索 ID…（中/英）',
    id_all: '全部',
    id_no_result: '没有匹配的 ID',
    id_selected: '已选',
    target_label: '目标',
    item_label: '物品',
    entity_label: '实体',
    pos_label: '坐标',
    nbt_label: 'NBT 数据',
    count_label: '数量',
    tag_label: '标签',
    val_label: '值',
    mode_label: '模式',
    angle_label: '角度',
    sel_tip: '选择器',
    // 分类
    cat_common: '常用',
    cat_entity: '实体与玩家',
    cat_world: '世界与环境',
    cat_block: '方块与结构',
    cat_logic: '数据与逻辑',
    cat_chat: '显示与聊天',
    cat_server: '服务器管理',
    cat_other: '其他',
  },
  en: {
    app_title: 'MC Command Generator',
    empty_hint: 'Select a command from the left to begin',
    output_title: 'Command Preview',
    copy: 'Copy',
    copied: 'Copied ✓',
    clear: 'Clear',
    chat_limit_tip: 'Note: chat limit is 256 chars per command; use command blocks for long commands.',
    no_args: 'This command takes no arguments.',
    history_title: 'History (click to copy)',
    history_empty: 'No history yet',
    search_ph: 'Search command…',
    search_no_result: 'No matching command',
    usage_label: 'Usage',
    cat_label: 'Category',
    examples_label: 'Examples',
    feedback: 'Feedback',
    mode_single: 'Single Command',
    mode_cb: 'Command Blocks',
    cb_warn: '⚠ Command Block mode is experimental (V2 beta). Test the build commands in a Creative world first; compatibility may vary across environments (modpacks/plugins).',
    cb_type: 'Type', cb_type_impulse: 'Impulse', cb_type_chain: 'Chain', cb_type_repeating: 'Repeating',
    cb_facing: 'Facing', cb_anchor: 'Anchor position', cb_defaults: 'Placement defaults',
    cb_auto: 'Always active', cb_cond: 'Conditional', cb_delay: 'Delay',
    cb_clear_all: 'Clear canvas', cb_canvas_hint: 'Left-click to place/select, right-click to remove. Arrows show the output (chain) direction.',
    cb_props: 'Block properties', cb_props_empty: 'Click a command block on the canvas to edit',
    cb_place_cmds: 'Place commands (run in game to build the chain)', cb_copy_all: 'Copy All',
    cb_cmd_label: 'Command', cb_cmd_ph: 'Generate with the wizard below, or type a 1.20.1 command (no leading /)',
    cb_guide_title: 'Command wizard (same as single mode)', cb_apply_cmd: 'Apply', cb_cmd_hint: 'Compound commands are allowed (e.g. execute … run …), and manual editing is supported.',
    cb_name_label: 'Block name (optional)', cb_pos_label: 'Position', cb_copied: 'Copied ✓',
    cb_rm_btn: 'Remove', cb_empty_output: 'Canvas is empty — place some command blocks',
    cb_out_count: 'place commands',
    modal_ok: 'OK', modal_cancel: 'Cancel',
    id_search_ph: 'Search ID… (CN/EN)',
    id_all: 'All',
    id_no_result: 'No matching ID',
    id_selected: 'Selected',
    target_label: 'Target',
    item_label: 'Item',
    entity_label: 'Entity',
    pos_label: 'Position',
    nbt_label: 'NBT',
    count_label: 'Count',
    tag_label: 'Tag',
    val_label: 'Value',
    mode_label: 'Mode',
    angle_label: 'Angle',
    sel_tip: 'Selector',
    cat_common: 'Common',
    cat_entity: 'Entities & Players',
    cat_world: 'World & Environment',
    cat_block: 'Blocks & Structures',
    cat_logic: 'Data & Logic',
    cat_chat: 'Display & Chat',
    cat_server: 'Server Admin',
    cat_other: 'Other',
  }
};

let LANG = 'zh';

function t(key) {
  const dict = I18N[LANG] || I18N.zh;
  return dict[key] !== undefined ? dict[key] : (I18N.zh[key] !== undefined ? I18N.zh[key] : key);
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.title = t('app_title');
  const langBtn = document.getElementById('btn-lang');
  if (langBtn) langBtn.textContent = LANG === 'zh' ? 'EN' : '中';
}
