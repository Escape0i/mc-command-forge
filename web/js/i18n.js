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
