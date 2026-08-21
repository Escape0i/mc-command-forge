/* ============================================================
   ids.js - ID 库骨架：来源定义 + 原版实体
   物品数据在 ids_items_vanilla.js / ids_items_mods.js
   由Escape制作，适用于JAVA1.20.1
   ============================================================ */
'use strict';

const IDS = {
  MODS: [
    { key: 'vanilla', zh: '原版', en: 'Vanilla', color: '#8a8a8a' },
    { key: 'create', zh: '机械动力', en: 'Create', color: '#d97706' },
    { key: 'ae2', zh: '应用能源2', en: 'AE2', color: '#4f9dd1' },
    { key: 'botania', zh: '植物魔法', en: 'Botania', color: '#6bbf59' },
    { key: 'twilight', zh: '暮色森林', en: 'Twilight Forest', color: '#5b7bd5' },
    { key: 'ie', zh: '沉浸工程', en: 'Immersive Engineering', color: '#b8860b' },
    { key: 'ma', zh: '神秘农业', en: 'Mystical Agriculture', color: '#7fb069' },
    { key: 'quark', zh: '夸克', en: 'Quark', color: '#e07a5f' },
    { key: 'de', zh: '龙之研究', en: 'Draconic Evolution', color: '#c33c3c' },
    { key: 'iaf', zh: '冰火传说', en: 'Ice and Fire', color: '#e25822' },
    { key: 'alexsmobs', zh: 'Alex的生物', en: "Alex's Mobs", color: '#5aa469' },
    { key: 'alexscaves', zh: 'Alex的洞穴', en: "Alex's Caves", color: '#3f7f8f' },
    { key: 'cataclysm', zh: '灾变', en: "L_Ender's Cataclysm", color: '#8e44ad' },
    { key: 'goety', zh: '诡厄巫法', en: 'Goety', color: '#4a5d9e' },
    { key: 'enigmatic', zh: '神秘遗物', en: 'Enigmatic Legacy', color: '#b8860b' },
    { key: 'terracurio', zh: '泰拉饰品', en: 'Terra Curio', color: '#c9a227' },
    { key: 'tlm', zh: '车万女仆', en: 'Touhou Little Maid', color: '#e87bb8' },
    { key: 'simplyswords', zh: '简易刀剑', en: 'Simply Swords', color: '#9aa5b1' },
    { key: 'gobber', zh: '戈伯2', en: 'Gobber 2', color: '#43aa8b' },
    { key: 'sb', zh: '精妙背包', en: 'Sophisticated Backpacks', color: '#8a6f4d' },
    { key: 'rs', zh: '精致存储', en: 'Refined Storage', color: '#7d5ba6' },
    { key: 'fd', zh: '农夫乐事', en: "Farmer's Delight", color: '#c8a24b' },
    { key: 'aquaculture', zh: '水产业2', en: 'Aquaculture 2', color: '#3d8bd1' },
    { key: 'ru', zh: '未至之地', en: 'Regions Unexplored', color: '#6c9e6c' },
    { key: 'imarmor', zh: '沉浸式盔甲', en: 'Immersive Armors', color: '#9b8a7d' },
    { key: 'mowzies', zh: 'Mowzie的生物', en: "Mowzie's Mobs", color: '#d1603d' },
    { key: 'mutant', zh: '突变怪物', en: 'Mutant Monsters', color: '#4f7942' },
    { key: 'graveyard', zh: '墓园', en: 'The Graveyard', color: '#5a5a6e' },
    { key: 'bomd', zh: '祸乱鬼魅', en: 'Bosses of Mass Destruction', color: '#7a3b8e' },
    { key: 'borninchaos', zh: '生于混沌', en: 'Born in Chaos', color: '#6d4c41' },
    { key: 'aquamirae', zh: '海灵物语', en: 'Aquamirae', color: '#2a9d8f' },
  ],
  items: [],
  entities: [],
};

/* ---------- 原版实体（1.20.1） ---------- */
(function () {
  const V = 'vanilla';
  const E = [
    // 友好生物
    ['allay', '悦灵', 'Allay'], ['axolotl', '美西螈', 'Axolotl'], ['bat', '蝙蝠', 'Bat'],
    ['camel', '骆驼', 'Camel'], ['cat', '猫', 'Cat'], ['chicken', '鸡', 'Chicken'],
    ['cod', '鳕鱼', 'Cod'], ['cow', '牛', 'Cow'], ['donkey', '驴', 'Donkey'],
    ['fox', '狐狸', 'Fox'], ['frog', '青蛙', 'Frog'], ['glow_squid', '发光鱿鱼', 'Glow Squid'],
    ['horse', '马', 'Horse'], ['mooshroom', '哞菇', 'Mooshroom'], ['mule', '骡', 'Mule'],
    ['ocelot', '豹猫', 'Ocelot'], ['parrot', '鹦鹉', 'Parrot'], ['pig', '猪', 'Pig'],
    ['polar_bear', '北极熊', 'Polar Bear'], ['pufferfish', '河豚', 'Pufferfish'], ['rabbit', '兔子', 'Rabbit'],
    ['salmon', '鲑鱼', 'Salmon'], ['sheep', '羊', 'Sheep'], ['skeleton_horse', '骷髅马', 'Skeleton Horse'],
    ['sniffer', '嗅探兽', 'Sniffer'], ['snow_golem', '雪傀儡', 'Snow Golem'], ['squid', '鱿鱼', 'Squid'],
    ['strider', '炽足兽', 'Strider'], ['tadpole', '蝌蚪', 'Tadpole'], ['trader_llama', '商队羊驼', 'Trader Llama'],
    ['tropical_fish', '热带鱼', 'Tropical Fish'], ['turtle', '海龟', 'Turtle'], ['villager', '村民', 'Villager'],
    ['wandering_trader', '流浪商人', 'Wandering Trader'], ['wolf', '狼', 'Wolf'], ['zombie_horse', '僵尸马', 'Zombie Horse'],
    ['bee', '蜜蜂', 'Bee'], ['dolphin', '海豚', 'Dolphin'], ['goat', '山羊', 'Goat'],
    ['llama', '羊驼', 'Llama'], ['iron_golem', '铁傀儡', 'Iron Golem'], ['panda', '熊猫', 'Panda'],
    // 敌对生物
    ['blaze', '烈焰人', 'Blaze'], ['bogged', '沼泽骷髅', 'Bogged'], ['breeze', '旋风人', 'Breeze'],
    ['cave_spider', '洞穴蜘蛛', 'Cave Spider'], ['creeper', '苦力怕', 'Creeper'], ['drowned', '溺尸', 'Drowned'],
    ['elder_guardian', '远古守卫者', 'Elder Guardian'], ['enderman', '末影人', 'Enderman'], ['endermite', '末影螨', 'Endermite'],
    ['evoker', '唤魔者', 'Evoker'], ['ghast', '恶魂', 'Ghast'], ['guardian', '守卫者', 'Guardian'],
    ['hoglin', '疣猪兽', 'Hoglin'], ['husk', '尸壳', 'Husk'], ['magma_cube', '岩浆怪', 'Magma Cube'],
    ['phantom', '幻翼', 'Phantom'], ['piglin', '猪灵', 'Piglin'], ['piglin_brute', '猪灵蛮兵', 'Piglin Brute'],
    ['pillager', '掠夺者', 'Pillager'], ['ravager', '劫掠兽', 'Ravager'], ['shulker', '潜影贝', 'Shulker'],
    ['silverfish', '蠹虫', 'Silverfish'], ['skeleton', '骷髅', 'Skeleton'], ['slime', '史莱姆', 'Slime'],
    ['spider', '蜘蛛', 'Spider'], ['stray', '流浪者', 'Stray'], ['vex', '恼鬼', 'Vex'],
    ['vindicator', '卫道士', 'Vindicator'], ['warden', '循声守卫', 'Warden'], ['witch', '女巫', 'Witch'],
    ['wither_skeleton', '凋灵骷髅', 'Wither Skeleton'], ['zoglin', '僵尸疣猪兽', 'Zoglin'], ['zombie', '僵尸', 'Zombie'],
    ['zombie_villager', '僵尸村民', 'Zombie Villager'], ['zombified_piglin', '僵尸猪灵', 'Zombified Piglin'],
    // Boss
    ['ender_dragon', '末影龙', 'Ender Dragon'], ['wither', '凋灵', 'Wither'],
    // 工具/载具/投射物等
    ['armor_stand', '盔甲架', 'Armor Stand'], ['arrow', '箭', 'Arrow'], ['spectral_arrow', '光灵箭', 'Spectral Arrow'],
    ['block_display', '方块展示实体', 'Block Display'], ['boat', '船', 'Boat'], ['chest_boat', '箱子船', 'Chest Boat'],
    ['chest_minecart', '箱子矿车', 'Chest Minecart'], ['command_block_minecart', '命令方块矿车', 'Command Block Minecart'],
    ['furnace_minecart', '熔炉矿车', 'Furnace Minecart'], ['hopper_minecart', '漏斗矿车', 'Hopper Minecart'],
    ['minecart', '矿车', 'Minecart'], ['tnt_minecart', 'TNT矿车', 'TNT Minecart'],
    ['end_crystal', '末影水晶', 'End Crystal'], ['evoker_fangs', '唤魔者尖牙', 'Evoker Fangs'],
    ['experience_orb', '经验球', 'XP Orb'], ['falling_block', '下落的方块', 'Falling Block'],
    ['fireball', '火球', 'Fireball'], ['small_fireball', '小火球', 'Small Fireball'], ['dragon_fireball', '龙息火球', 'Dragon Fireball'],
    ['firework_rocket', '烟花火箭', 'Firework Rocket'], ['fishing_bobber', '浮漂', 'Fishing Bobber'],
    ['interaction', '交互实体', 'Interaction'], ['item', '掉落物', 'Item Entity'], ['item_display', '物品展示实体', 'Item Display'],
    ['leash_knot', '拴绳结', 'Leash Knot'], ['lightning_bolt', '闪电', 'Lightning Bolt'], ['llama_spit', '羊驼口水', 'Llama Spit'],
    ['marker', '标记实体', 'Marker'], ['painting', '画', 'Painting'], ['player', '玩家', 'Player'],
    ['shulker_bullet', '潜影贝导弹', 'Shulker Bullet'], ['snowball', '雪球', 'Snowball'], ['tnt', 'TNT', 'TNT'],
    ['trident', '三叉戟', 'Trident'], ['egg', '鸡蛋', 'Egg'], ['ender_pearl', '末影珍珠', 'Ender Pearl'],
    ['eye_of_ender', '末影之眼', 'Eye of Ender'], ['wither_skull', '凋灵之首', 'Wither Skull'],
    ['area_effect_cloud', '区域效果云', 'Area Effect Cloud'], ['text_display', '文本展示实体', 'Text Display'],
  ];
  E.forEach(e => IDS.entities.push({ id: 'minecraft:' + e[0], zh: e[1], en: e[2], mod: V }));
})();
