/* ============================================================
   ids_entities_mods.js - mod 实体（30 个热门 mod 全实体）
   由Escape制作，适用于JAVA1.20.1
   ============================================================ */
'use strict';

(function () {
  const P = [];
  const E = (ns, id, zh, en, mod) => P.push({ id: ns + ':' + id, zh, en, mod });

  /* ---- 暮色森林 Twilight Forest ---- */
  ['twilightforest', 'twilight'].forEach(m => {
    const NS = 'twilightforest';
    [['naga', '娜迦', 'Naga'], ['lich', '巫妖', 'Lich'], ['minoshroom', '米诺菇', 'Minoshroom'],
     ['hydra', '九头蛇', 'Hydra'], ['snow_queen', '冰雪女王', 'Snow Queen'], ['ur_ghast', '暮色恶魂', 'Ur-Ghast'],
     ['knight_phantom', '幻影骑士', 'Knight Phantom'], ['alpha_yeti', '阿尔法雪人', 'Alpha Yeti'], ['yeti', '雪人', 'Yeti'],
     ['wraith', '幽魂', 'Wraith'], ['tower_golem', '高塔傀儡', 'Tower Golem'], ['redcap', '红帽哥布林', 'Redcap'],
     ['redcap_sapper', '红帽工兵', 'Redcap Sapper'], ['blockchain_goblin', '锁链哥布林', 'Blockchain Goblin'],
     ['goblin_knight', '哥布林骑士', 'Goblin Knight'], ['knight_phantom', '幻影骑士', 'Knight Phantom'],
     ['ice_crystal', '冰晶', 'Ice Crystal'], ['stable_ice_core', '稳定冰核', 'Stable Ice Core'], ['unstable_ice_core', '不稳定冰核', 'Unstable Ice Core'],
     ['snow_guardian', '雪之守卫', 'Snow Guardian'], ['bighorn_sheep', '大角羊', 'Bighorn Sheep'], ['wild_deer', '野鹿', 'Wild Deer'],
     ['dwarf_rabbit', '矮兔', 'Dwarf Rabbit'], ['tiny_bird', '小鸟', 'Tiny Bird'], ['raven', '乌鸦', 'Raven'],
     ['squirrel', '松鼠', 'Squirrel'], ['penguin', '企鹅', 'Penguin'], ['bunny', '小兔', 'Bunny'],
     ['firefly', '火蝇', 'Firefly'], ['maze_slime', '迷宫史莱姆', 'Maze Slime'], ['tower_termite', '高塔白蚁', 'Tower Termite'],
     ['hedge_spider', '树篱蜘蛛', 'Hedge Spider'], ['swarm_spider', '蜘蛛群', 'Swarm Spider'], ['death_tome', '死亡之书', 'Death Tome'],
     ['mosquito_swarm', '蚊子群', 'Mosquito Swarm'], ['king_spider', '蜘蛛王', 'King Spider'], ['carminite_golem', '卡尔迈特傀儡', 'Carminite Golem'],
     ['carminite_ghastguard', '卡尔迈特恶魂守卫', 'Carminite Ghastguard'], ['carminite_ghastling', '卡尔迈特恶魂幼体', 'Carminite Ghastling'],
     ['carminite_broodling', '卡尔迈特蜘蛛幼体', 'Carminite Broodling'], ['slime_beetle', '史莱姆甲虫', 'Slime Beetle'],
     ['fire_beetle', '火焰甲虫', 'Fire Beetle'], ['pinch_beetle', '钳甲虫', 'Pinch Beetle'], ['giant_miner', '巨人矿工', 'Giant Miner'],
     ['armored_giant', '武装巨人', 'Armored Giant'], ['lich_minion', '巫妖仆从', 'Lich Minion'], ['adherent', '信徒', 'Adherent'],
     ['unstable_ice_core', '不稳定冰核', 'Unstable Ice Core'], ['hostile_wolf', '敌意之狼', 'Hostile Wolf'], ['winter_wolf', '冬狼', 'Winter Wolf'],
     ['mist_wolf', '迷雾之狼', 'Mist Wolf'], ['skeleton_druid', '骷髅德鲁伊', 'Skeleton Druid'], ['skeleton_force_field', '骷髅力场', 'Skeleton Force Field'],
     ['wooden_golem', '木质傀儡', 'Wooden Golem'], ['iron_golem', '铁傀儡', 'Iron Golem'], ['lich_minion', '巫妖仆从', 'Lich Minion']
    ].forEach(x => E(NS, x[0], x[1], x[2], 'twilight'));
  });

  /* ---- 冰火传说 Ice and Fire ---- */
  [['fire_dragon', '火龙', 'Fire Dragon'], ['ice_dragon', '冰龙', 'Ice Dragon'], ['lightning_dragon', '雷龙', 'Lightning Dragon'],
   ['hippogryph', '狮鹫', 'Hippogryph'], ['gorgon', '蛇发女妖', 'Gorgon'], ['cyclops', '独眼巨人', 'Cyclops'],
   ['sea_serpent', '海蟒', 'Sea Serpent'], ['death_worm', '死亡蠕虫', 'Death Worm'], ['myrmex_worker', '恐蚁工蚁', 'Myrmex Worker'],
   ['myrmex_soldier', '恐蚁兵蚁', 'Myrmex Soldier'], ['myrmex_sentinel', '恐蚁哨兵', 'Myrmex Sentinel'], ['myrmex_royal', '恐蚁蚁后', 'Myrmex Royal'],
   ['siren', '塞壬', 'Siren'], ['hippocampus', '海马', 'Hippocampus'], ['amphithere', '飞蛇', 'Amphithere'],
   ['cockatrice', '鸡蛇', 'Cockatrice'], ['stymphalian_bird', '斯廷法利斯鸟', 'Stymphalian Bird'], ['troll', '巨魔', 'Troll'],
   ['snow_troll', '雪巨魔', 'Snow Troll'], ['mountain_troll', '山巨魔', 'Mountain Troll'], ['forest_troll', '森林巨魔', 'Forest Troll'],
   ['dread_ghoul', '恐惧食尸鬼', 'Dread Ghoul'], ['dread_beast', '恐惧野兽', 'Dread Beast'], ['dread_lich', '恐惧巫妖', 'Dread Lich'],
   ['dread_knight', '恐惧骑士', 'Dread Knight'], ['dread_horse', '恐惧战马', 'Dread Horse'], ['dread_thrall', '恐惧奴仆', 'Dread Thrall'],
   ['hydra', '九头蛇', 'Hydra'], ['ghost', '幽灵', 'Ghost'], ['pixie', '小精灵', 'Pixie'],
   ['siren', '塞壬', 'Siren'], ['hippogryph', '狮鹫', 'Hippogryph'], ['amphithere', '飞蛇', 'Amphithere'],
   ['cockatrice', '鸡蛇', 'Cockatrice'], ['stymphalian_bird', '斯廷法利斯鸟', 'Stymphalian Bird'], ['troll', '巨魔', 'Troll']
  ].forEach(x => E('iceandfire', x[0], x[1], x[2], 'iaf'));

  /* ---- Alex 的生物 Alex's Mobs ---- */
  [['lion', '狮子', 'Lion'], ['tiger', '老虎', 'Tiger'], ['whale_shark', '鲸鲨', 'Whale Shark'], ['humpback_whale', '座头鲸', 'Humpback Whale'],
   ['vulture', '秃鹫', 'Vulture'], ['crocodile', '鳄鱼', 'Crocodile'], ['gorilla', '大猩猩', 'Gorilla'], ['hummingbird', '蜂鸟', 'Hummingbird'],
   ['rattlesnake', '响尾蛇', 'Rattlesnake'], ['scorpion', '蝎子', 'Scorpion'], ['tarantula_hawk', '蛛蜂', 'Tarantula Hawk'],
   ['flamingo', '火烈鸟', 'Flamingo'], ['secretary_bird', '蛇鹫', 'Secretary Bird'], ['rhino', '犀牛', 'Rhino'],
   ['elephant', '大象', 'Elephant'], ['giraffe', '长颈鹿', 'Giraffe'], ['zebra', '斑马', 'Zebra'], ['hyena', '鬣狗', 'Hyena'],
   ['snow_leopard', '雪豹', 'Snow Leopard'], ['cougar', '美洲狮', 'Cougar'], ['grizzly_bear', '灰熊', 'Grizzly Bear'],
   ['black_bear', '黑熊', 'Black Bear'], ['polar_bear', '北极熊', 'Polar Bear'], ['komodo_dragon', '科莫多龙', 'Komodo Dragon'],
   ['blue_footed_booby', '蓝脚鲣鸟', 'Blue-footed Booby'], ['puffin', '海鹦', 'Puffin'], ['seal', '海豹', 'Seal'],
   ['sea_lion', '海狮', 'Sea Lion'], ['walrus', '海象', 'Walrus'], ['manatee', '海牛', 'Manatee'],
   ['cachalot_whale', '抹香鲸', 'Cachalot Whale'], ['hammerhead_shark', '锤头鲨', 'Hammerhead Shark'], ['manta_ray', '蝠鲼', 'Manta Ray'],
   ['flying_fish', '飞鱼', 'Flying Fish'], ['blobfish', '水滴鱼', 'Blobfish'], ['jellyfish', '水母', 'Jellyfish'],
   ['lobster', '龙虾', 'Lobster'], ['crab', '螃蟹', 'Crab'], ['hermit_crab', '寄居蟹', 'Hermit Crab'],
   ['mimic_octopus', '拟态章鱼', 'Mimic Octopus'], ['giant_squid', '大王乌贼', 'Giant Squid'], ['frilled_shark', '皱鳃鲨', 'Frilled Shark'],
   ['alligator_snapping_turtle', '鳄龟', 'Alligator Snapping Turtle'], ['terrapin', '泥龟', 'Terrapin'], ['sugar_glider', '蜜袋鼯', 'Sugar Glider'],
   ['raccoon', '浣熊', 'Raccoon'], ['opossum', '负鼠', 'Opossum'], ['anteater', '食蚁兽', 'Giant Anteater'],
   ['capuchin_monkey', '卷尾猴', 'Capuchin Monkey'], ['spider_monkey', '蛛猴', 'Spider Monkey'], ['snow_monkey', '雪猴', 'Snow Monkey'],
   ['crocodile', '鳄鱼', 'Crocodile'], ['platypus', '鸭嘴兽', 'Platypus'], ['kangaroo', '袋鼠', 'Kangaroo'],
   ['koala', '考拉', 'Koala'], ['tasmanian_devil', '袋獾', 'Tasmanian Devil'], ['emu', '鸸鹋', 'Emu'],
   ['cockroach', '蟑螂', 'Cockroach'], ['termite', '白蚁', 'Termite'], ['centipede', '蜈蚣', 'Centipede'],
   ['millipede', '马陆', 'Millipede'], ['mantis_shrimp', '螳螂虾', 'Mantis Shrimp'], ['banana_slug', '香蕉蛞蝓', 'Banana Slug'],
   ['leafcutter_ant', '切叶蚁', 'Leafcutter Ant'], ['mosquito', '蚊子', 'Mosquito'], ['fly', '苍蝇', 'Fly'],
   ['warped_toad', '诡异蟾蜍', 'Warped Toad'], ['crimson_mosquito', '绯红蚊子', 'Crimson Mosquito'], ['soul_vulture', '灵魂秃鹫', 'Soul Vulture'],
   ['froststalker', '霜行者', 'Froststalker'], ['sunbird', '太阳鸟', 'Sunbird'], ['potoo', '林鸱', 'Potoo'],
   ['murmur', '低语者', 'Murmur'], ['skreecher', '尖啸者', 'Skreecher'], ['bone_serpent', '骨蛇', 'Bone Serpent'],
   ['void_worm', '虚空蠕虫', 'Void Worm'], ['cosmic_cod', '宇宙鳕鱼', 'Cosmic Cod'], ['spectre', '幽灵', 'Spectre'],
   ['straddler', '斯特拉德勒', 'Straddler'], ['stradpole', '斯特拉蝌蚪', 'Stradpole'], ['crocodile', '鳄鱼', 'Crocodile'],
   ['tiger', '老虎', 'Tiger'], ['shark', '鲨鱼', 'Shark'], ['underminer', '地底挖掘者', 'Underminer'],
   ['rocky_roller', '岩石滚轮', 'Rocky Roller'], ['guster', '狂风', 'Guster'], ['cloudy_creeper', '云苦力怕', 'Cloudy Creeper'],
   ['baleen_whale', '须鲸', 'Baleen Whale'], ['moose', '驼鹿', 'Moose'], ['bald_eagle', '白头鹰', 'Bald Eagle']
  ].forEach(x => E('alexsmobs', x[0], x[1], x[2], 'alexsmobs'));

  /* ---- Alex 的洞穴 Alex's Caves ---- */
  [['subterranodon', '地下翼龙', 'Subterranodon'], ['atlatitan', '亚特兰巨兽', 'Atlatitan'], ['notor', '诺托尔', 'Notor'],
   ['gammaroach', '伽马蟑螂', 'Gammaroach'], ['raycat', '射线猫', 'Raycat'], ['tremorsaurus', '震颤龙', 'Tremorsaurus'],
   ['tremorzilla', '震颤吉拉', 'Tremorzilla'], ['underzealot', '地下狂热者', 'Underzealot'], ['vesper', '夜蝠', 'Vesper'],
   ['corrodent', '腐蚀兽', 'Corrodent'], ['gulpbeast', '吞噬兽', 'Gulpbeast'], ['flytrap', '捕蝇草', 'Flytrap'],
   ['nuclear_crab', '核蟹', 'Nuclear Crab'], ['teletor', '传送蟹', 'Teletor'], ['sulfur_creeper', '硫磺苦力怕', 'Sulfur Creeper'],
   ['magnetron', '磁控蟹', 'Magnetron'], ['ferrouslime', '铁质粘液', 'Ferrouslime'], ['lanternfish', '灯笼鱼', 'Lanternfish'],
   ['tripodfish', '三脚鱼', 'Tripodfish'], ['guanlin', '冠林', 'Guanlin'], ['hullbreaker', '破壳鲨', 'Hullbreaker'],
   ['mussel', '贻贝', 'Mussel'], ['deep_one', '深海一族', 'Deep One'], ['deepling', '深渊子民', 'Deepling'],
   ['selenia', '塞勒涅', 'Selenia'], ['watcher', '守望者', 'Watcher'], ['tremorzilla', '震颤吉拉', 'Tremorzilla'],
   ['archaeocaris', '古虾', 'Archaeocaris'], ['pirarucu', '巨骨舌鱼', 'Pirarucu'], ['sea_angel', '海天使', 'Sea Angel']
  ].forEach(x => E('alexscaves', x[0], x[1], x[2], 'alexscaves'));

  /* ---- 灾变 L_Ender's Cataclysm ---- */
  [['ignis', '火神伊格尼斯', 'Ignis'], ['the_leviathan', '利维坦', 'The Leviathan'], ['netherite_monstrosity', '下界合金巨兽', 'Netherite Monstrosity'],
   ['ancient_remnant', '远古遗魂', 'Ancient Remnant'], ['ender_golem', '末影傀儡', 'Ender Golem'], ['maledictus', '咒灵', 'Maledictus'],
   ['the_harbinger', '先驱者', 'The Harbinger'], ['the_ender_guardian', '末影守卫', 'The Ender Guardian'],
   ['the_ender_guardian_phase2', '末影守卫（二阶段）', 'The Ender Guardian (Phase 2)'], ['void_howitzer', '虚空炮', 'Void Howitzer'],
   ['coral_giant', '珊瑚巨像', 'Coral Giant'], ['coral_golem', '珊瑚傀儡', 'Coral Golem'], ['coral_crab', '珊瑚蟹', 'Coral Crab'],
   ['netherite_monstrosity', '下界合金巨兽', 'Netherite Monstrosity'], ['decayed_abyssal_remnant', '腐化深渊残骸', 'Decayed Abyssal Remnant'],
   ['abyssal_remnant', '深渊残骸', 'Abyssal Remnant'], ['decayed_abyssal_remnant', '腐化深渊残骸', 'Decayed Abyssal Remnant'],
   ['the_watcher', '观察者', 'The Watcher'], ['void_blossom', '虚空之花', 'Void Blossom']
  ].forEach(x => E('cataclysm', x[0], x[1], x[2], 'cataclysm'));

  /* ---- 诡厄巫法 Goety ---- */
  [['wraith', '幽魂', 'Wraith'], ['spectral_ghast', '灵体恶魂', 'Spectral Ghast'], ['skeleton_servant', '骷髅仆从', 'Skeleton Servant'],
   ['zombie_servant', '僵尸仆从', 'Zombie Servant'], ['vindicator_servant', '卫道士仆从', 'Vindicator Servant'],
   ['evoker_servant', '唤魔者仆从', 'Evoker Servant'], ['nether_servant', '下界仆从', 'Nether Servant'],
   ['marrow', '髓魔', 'Marrow'], ['cairn_necromancer', '石冢死灵法师', 'Cairn Necromancer'], ['cairn_guard', '石冢守卫', 'Cairn Guard'],
   ['redstone_golem', '红石傀儡', 'Redstone Golem'], ['frost_golem', '冰霜傀儡', 'Frost Golem'],
   ['skeleton_servant', '骷髅仆从', 'Skeleton Servant'], ['zombie_servant', '僵尸仆从', 'Zombie Servant'],
   ['soul_skull', '灵魂颅骨', 'Soul Skull'], ['soul_bolt', '灵魂箭', 'Soul Bolt'], ['cursed_skull', '诅咒颅骨', 'Cursed Skull'],
   ['conjured_phantom', '召唤幻翼', 'Conjured Phantom'], ['skeleton_horse_servant', '骷髅马仆从', 'Skeleton Horse Servant'],
   ['zombie_horse_servant', '僵尸马仆从', 'Zombie Horse Servant'], ['ghost_servant', '幽灵仆从', 'Ghost Servant'],
   ['blazing_servant', '炽焰仆从', 'Blazing Servant'], ['wraith', '幽魂', 'Wraith'], ['necro_servant', '死灵仆从', 'Necro Servant'],
   ['soul_wraith', '灵魂幽魂', 'Soul Wraith']
  ].forEach(x => E('goety', x[0], x[1], x[2], 'goety'));

  /* ---- 车万女仆 Touhou Little Maid ---- */
  [['maid', '女仆', 'Maid'], ['chair', '椅子', 'Chair'], ['phantom', '幻影', 'Phantom'], ['box', '箱子', 'Box'],
   ['maid_backpack_entity', '女仆背包', 'Maid Backpack'], ['lantern_entity', '灯笼', 'Lantern'], ['fairy', '妖精', 'Fairy'],
   ['maid', '女仆', 'Maid'], ['trolley', '手推车', 'Trolley']
  ].forEach(x => E('touhou_little_maid', x[0], x[1], x[2], 'tlm'));

  /* ---- Mowzie 的生物 Mowzie's Mobs ---- */
  [['barakoa', '巴拉科', 'Barakoa'], ['barakoana', '巴拉科纳', 'Barakoana'], ['frostmaw', '霜颚', 'Frostmaw'],
   ['naga', '娜迦', 'Naga'], ['lantern', '提灯精灵', 'Lantern'], ['umvuthi', '乌姆武提', 'Umvuthi'],
   ['grottol', '格罗托尔', 'Grottol'], ['ferrous_wroughtnaut', '钢铁武神', 'Ferrous Wroughtnaut'], ['axebeak', '斧喙鸟', 'Axebeak'],
   ['geonach', '土石精', 'Geonach'], ['fumo', '伏魔', 'Fumo'], ['tusklin', '獠牙兽', 'Tusklin'],
   ['barakoa', '巴拉科', 'Barakoa'], ['naga', '娜迦', 'Naga'], ['frostmaw', '霜颚', 'Frostmaw']
  ].forEach(x => E('mowziesmobs', x[0], x[1], x[2], 'mowzies'));

  /* ---- 突变怪物 Mutant Monsters ---- */
  [['mutant_zombie', '突变僵尸', 'Mutant Zombie'], ['mutant_skeleton', '突变骷髅', 'Mutant Skeleton'],
   ['mutant_creeper', '突变苦力怕', 'Mutant Creeper'], ['mutant_enderman', '突变末影人', 'Mutant Enderman'],
   ['mutant_spider', '突变蜘蛛', 'Mutant Spider'], ['mutant_snow_golem', '突变雪傀儡', 'Mutant Snow Golem'],
   ['mutant_zombie', '突变僵尸', 'Mutant Zombie'], ['mutant_creeper', '突变苦力怕', 'Mutant Creeper']
  ].forEach(x => E('mutantmonsters', x[0], x[1], x[2], 'mutant'));

  /* ---- 墓园 The Graveyard ---- */
  [['corpse', '尸体', 'Corpse'], ['ghoul', '食尸鬼', 'Ghoul'], ['revenant', '怨灵', 'Revenant'], ['wraith', '幽魂', 'Wraith'],
   ['skeleton_creeper', '骷髅苦力怕', 'Skeleton Creeper'], ['acolyte', '侍僧', 'Acolyte'], ['nightmare', '梦魇', 'Nightmare'],
   ['corpse', '尸体', 'Corpse'], ['ghoul', '食尸鬼', 'Ghoul'], ['revenant', '怨灵', 'Revenant'],
   ['skeleton_creeper', '骷髅苦力怕', 'Skeleton Creeper'], ['nightmare', '梦魇', 'Nightmare']
  ].forEach(x => E('graveyard', x[0], x[1], x[2], 'graveyard'));

  /* ---- 祸乱鬼魅 BOMD ---- */
  [['void_blossom', '虚空之花', 'Void Blossom'], ['obsidilith', '黑曜魔石', 'Obsidilith'], ['the_gauntlet', '巨拳', 'The Gauntlet'],
   ['nidhogg', '尼德霍格', 'Nidhogg'], ['necromancer', '死灵法师', 'Necromancer'],
   ['void_blossom', '虚空之花', 'Void Blossom'], ['obsidilith', '黑曜魔石', 'Obsidilith'], ['the_gauntlet', '巨拳', 'The Gauntlet'],
   ['nidhogg', '尼德霍格', 'Nidhogg'], ['necromancer', '死灵法师', 'Necromancer']
  ].forEach(x => E('bosses_of_mass_destruction', x[0], x[1], x[2], 'bomd'));

  /* ---- 生于混沌 Born in Chaos ---- */
  [['peko', '佩可', 'Peko'], ['buttercup', '黄油杯', 'Buttercup'], ['lump', '肿块怪', 'Lump'],
   ['screecher', '尖啸者', 'Screecher'], ['drowned_necromancer', '溺尸死灵法师', 'Drowned Necromancer'],
   ['sniffer', '嗅嗅', 'Sniffer'], ['skeleton_dog', '骷髅犬', 'Skeleton Dog'], ['skeleton_knight', '骷髅骑士', 'Skeleton Knight'],
   ['skeleton_thrall', '骷髅奴仆', 'Skeleton Thrall'], ['skeleton_berserker', '骷髅狂战士', 'Skeleton Berserker'],
   ['skeleton_warlord', '骷髅军阀', 'Skeleton Warlord'], ['zombie_brute', '僵尸蛮兵', 'Zombie Brute'],
   ['zombie_necromancer', '僵尸死灵法师', 'Zombie Necromancer'], ['peko', '佩可', 'Peko'], ['buttercup', '黄油杯', 'Buttercup'],
   ['lump', '肿块怪', 'Lump'], ['screecher', '尖啸者', 'Screecher'], ['zombie_brute', '僵尸蛮兵', 'Zombie Brute']
  ].forEach(x => E('born_in_chaos_v1', x[0], x[1], x[2], 'borninchaos'));

  /* ---- 海灵物语 Aquamirae ---- */
  [['captain_cornelia', '科内莉亚船长', 'Captain Cornelia'], ['guardian_phoenix', '守护凤凰', 'Guardian Phoenix'],
   ['eel', '鳗鱼', 'Eel'], ['anglerfish', '鮟鱇鱼', 'Anglerfish'], ['nautilus', '鹦鹉螺', 'Nautilus'],
   ['maw', '深渊巨口', 'Maw'], ['sea_guardian', '海洋守卫', 'Sea Guardian'], ['sea_serpent', '海蟒', 'Sea Serpent'],
   ['piranha', '食人鱼', 'Piranha'], ['submarine', '潜艇', 'Submarine'],
   ['captain_cornelia', '科内莉亚船长', 'Captain Cornelia'], ['guardian_phoenix', '守护凤凰', 'Guardian Phoenix'],
   ['eel', '鳗鱼', 'Eel'], ['anglerfish', '鮟鱇鱼', 'Anglerfish'], ['maw', '深渊巨口', 'Maw']
  ].forEach(x => E('aquamirae', x[0], x[1], x[2], 'aquamirae'));

  IDS.entities.push.apply(IDS.entities, P);
})();
