/* ============================================================
   ids_items_vanilla.js - 原版物品（1.20.1）
   系列物品用生成器批量创建，独特物品手工列出
   由Escape制作，适用于JAVA1.20.1
   ============================================================ */
'use strict';

(function () {
  const V = 'vanilla';
  const P = [];
  const I = (id, zh, en) => P.push({ id: 'minecraft:' + id, zh, en, mod: V });

  // ---- 16 色系列 ----
  const COLORS = [
    ['white','白色','White'],['orange','橙色','Orange'],['magenta','品红色','Magenta'],['light_blue','淡蓝色','Light Blue'],
    ['yellow','黄色','Yellow'],['lime','黄绿色','Lime'],['pink','粉红色','Pink'],['gray','灰色','Gray'],
    ['light_gray','淡灰色','Light Gray'],['cyan','青色','Cyan'],['purple','紫色','Purple'],['blue','蓝色','Blue'],
    ['brown','棕色','Brown'],['green','绿色','Green'],['red','红色','Red'],['black','黑色','Black'],
  ];
  COLORS.forEach(c => {
    const n = c[0], z = c[1], e = c[2];
    I(n + '_wool', z + '羊毛', e + ' Wool');
    I(n + '_carpet', z + '地毯', e + ' Carpet');
    I(n + '_terracotta', z + '陶瓦', e + ' Terracotta');
    I(n + '_glazed_terracotta', z + '带釉陶瓦', e + ' Glazed Terracotta');
    I(n + '_concrete', z + '混凝土', e + ' Concrete');
    I(n + '_concrete_powder', z + '混凝土粉末', e + ' Concrete Powder');
    I(n + '_stained_glass', z + '染色玻璃', e + ' Stained Glass');
    I(n + '_stained_glass_pane', z + '染色玻璃板', e + ' Stained Glass Pane');
    I(n + '_bed', z + '床', e + ' Bed');
    I(n + '_banner', z + '旗帜', e + ' Banner');
    I(n + '_candle', z + '蜡烛', e + ' Candle');
    I(n + '_shulker_box', z + '潜影盒', e + ' Shulker Box');
    I(n + '_dye', z + '染料', e + ' Dye');
    if (n !== 'white') I(n + '_concrete' + '', z + '混凝土', e + ' Concrete');
  });

  // ---- 木材系列（10 种） ----
  const WOODS = [
    ['oak','橡木','Oak'],['spruce','云杉木','Spruce'],['birch','白桦木','Birch'],['jungle','丛林木','Jungle'],
    ['acacia','金合欢木','Acacia'],['dark_oak','深色橡木','Dark Oak'],['mangrove','红树木','Mangrove'],['cherry','樱花木','Cherry'],
    ['crimson','绯红木','Crimson'],['warped','诡异木','Warped'],
  ];
  WOODS.forEach(w => {
    const n = w[0], z = w[1], e = w[2];
    I(n + '_planks', z + '木板', e + ' Planks');
    I(n + '_log', z + '原木', e + ' Log');
    I(n + '_wood', z + '木头', e + ' Wood');
    I(n + '_stripped_log', '去皮' + z + '原木', 'Stripped ' + e + ' Log');
    I(n + '_stripped_wood', '去皮' + z + '木头', 'Stripped ' + e + ' Wood');
    I(n + '_leaves', z + '树叶', e + ' Leaves');
    I(n + '_sapling', z + '树苗', e + ' Sapling');
    I(n + '_slab', z + '台阶', e + ' Slab');
    I(n + '_stairs', z + '楼梯', e + ' Stairs');
    I(n + '_fence', z + '栅栏', e + ' Fence');
    I(n + '_fence_gate', z + '栅栏门', e + ' Fence Gate');
    I(n + '_door', z + '门', e + ' Door');
    I(n + '_trapdoor', z + '活板门', e + ' Trapdoor');
    I(n + '_pressure_plate', z + '压力板', e + ' Pressure Plate');
    I(n + '_button', z + '按钮', e + ' Button');
    I(n + '_sign', z + '告示牌', e + ' Sign');
    I(n + '_hanging_sign', z + '悬挂式告示牌', e + ' Hanging Sign');
  });
  // 船（只有 6 种非下界木）
  ['oak','spruce','birch','jungle','acacia','dark_oak','mangrove','cherry'].forEach(n => {
    I(n + '_boat', n + '木船', 'Boat'); // 名称用通用英文，中文标注木种
    I(n + '_chest_boat', n + '木箱子船', 'Chest Boat');
  });

  // ---- 矿石/材料系列 ----
  const ORES = [
    ['coal','煤炭','Coal'],['iron','铁','Iron'],['copper','铜','Copper'],['gold','金','Gold'],
    ['redstone','红石','Redstone'],['lapis','青金石','Lapis Lazuli'],['diamond','钻石','Diamond'],
    ['emerald','绿宝石','Emerald'],['quartz','下界石英','Nether Quartz'],['netherite','下界合金','Netherite'],
  ];
  ORES.forEach(o => {
    const n = o[0], z = o[1], e = o[2];
    if (n !== 'quartz' && n !== 'netherite') {
      I(n + '_ore', z + '矿石', e + ' Ore');
      I('deepslate_' + n + '_ore', '深层' + z + '矿石', 'Deepslate ' + e + ' Ore');
    }
    if (n !== 'redstone' && n !== 'netherite') I(n + '_block', z + '块', e + ' Block');
  });
  I('nether_quartz_ore', '下界石英矿石', 'Nether Quartz Ore');
  I('raw_iron', '粗铁', 'Raw Iron'); I('raw_gold', '粗金', 'Raw Gold'); I('raw_copper', '粗铜', 'Raw Copper');
  I('raw_iron_block', '粗铁块', 'Raw Iron Block'); I('raw_gold_block', '粗金块', 'Raw Gold Block'); I('raw_copper_block', '粗铜块', 'Raw Copper Block');
  I('iron_ingot', '铁锭', 'Iron Ingot'); I('gold_ingot', '金锭', 'Gold Ingot'); I('copper_ingot', '铜锭', 'Copper Ingot');
  I('netherite_ingot', '下界合金锭', 'Netherite Ingot'); I('netherite_scrap', '下界合金碎片', 'Netherite Scrap');
  I('iron_nugget', '铁粒', 'Iron Nugget'); I('gold_nugget', '金粒', 'Gold Nugget');
  I('diamond', '钻石', 'Diamond'); I('emerald', '绿宝石', 'Emerald'); I('lapis_lazuli', '青金石', 'Lapis Lazuli');
  I('quartz', '下界石英', 'Nether Quartz'); I('amethyst_shard', '紫水晶碎片', 'Amethyst Shard'); I('echo_shard', '回响碎片', 'Echo Shard');

  // ---- 工具/武器 ----
  const TOOL_TIERS = [
    ['wooden','木','Wooden'],['stone','石','Stone'],['iron','铁','Iron'],['golden','金','Golden'],['diamond','钻石','Diamond'],['netherite','下界合金','Netherite'],
  ];
  const TOOLS = [
    ['sword','剑','Sword'],['pickaxe','镐','Pickaxe'],['axe','斧','Axe'],['shovel','锹','Shovel'],['hoe','锄','Hoe'],
  ];
  TOOL_TIERS.forEach(tier => {
    TOOLS.forEach(tool => I(tier[0] + '_' + tool[0], tier[1] + tool[1], tier[2] + ' ' + tool[2]));
  });
  // 盔甲
  const ARMOR_TIERS = [
    ['leather','皮革','Leather'],['chainmail','锁链','Chainmail'],['iron','铁','Iron'],['golden','金','Golden'],['diamond','钻石','Diamond'],['netherite','下界合金','Netherite'],
  ];
  const ARMOR = [
    ['helmet','头盔','Helmet'],['chestplate','胸甲','Chestplate'],['leggings','护腿','Leggings'],['boots','靴子','Boots'],
  ];
  ARMOR_TIERS.forEach(tier => {
    ARMOR.forEach(a => I(tier[0] + '_' + a[0], tier[1] + a[1], tier[2] + ' ' + a[2]));
  });
  I('turtle_helmet', '海龟壳', 'Turtle Shell');
  I('bow', '弓', 'Bow'); I('crossbow', '弩', 'Crossbow'); I('arrow', '箭', 'Arrow'); I('tipped_arrow', '药箭', 'Tipped Arrow');
  I('spectral_arrow', '光灵箭', 'Spectral Arrow'); I('trident', '三叉戟', 'Trident'); I('shield', '盾牌', 'Shield');
  I('shears', '剪刀', 'Shears'); I('flint_and_steel', '打火石', 'Flint and Steel');
  I('fishing_rod', '钓鱼竿', 'Fishing Rod'); I('carrot_on_a_stick', '胡萝卜钓竿', 'Carrot on a Stick');
  I('warped_fungus_on_a_stick', '诡异菌钓竿', 'Warped Fungus on a Stick'); I('brush', '刷子', 'Brush');
  I('spyglass', '望远镜', 'Spyglass'); I('clock', '时钟', 'Clock'); I('compass', '指南针', 'Compass');
  I('recovery_compass', '追溯指南针', 'Recovery Compass'); I('lead', '拴绳', 'Lead'); I('name_tag', '命名牌', 'Name Tag');
  I('saddle', '鞍', 'Saddle'); I('bucket', '桶', 'Bucket'); I('water_bucket', '水桶', 'Water Bucket');
  I('lava_bucket', '熔岩桶', 'Lava Bucket'); I('milk_bucket', '奶桶', 'Milk Bucket'); I('powder_snow_bucket', '细雪桶', 'Powder Snow Bucket');
  ['cod','salmon','pufferfish','tropical_fish','axolotl','tadpole'].forEach(f => I(f + '_bucket', f + '桶', 'Bucket of ' + f));

  // ---- 刷怪蛋（从实体表生成） ----
  const NO_EGG = ['player','item','item_display','block_display','text_display','marker','interaction','area_effect_cloud',
    'experience_orb','lightning_bolt','fishing_bobber','leash_knot','llama_spit','falling_block','fireball','small_fireball',
    'dragon_fireball','firework_rocket','arrow','spectral_arrow','snowball','egg','ender_pearl','eye_of_ender','trident',
    'wither_skull','shulker_bullet','evoker_fangs','boat','chest_boat','minecart','chest_minecart','furnace_minecart',
    'hopper_minecart','command_block_minecart','tnt_minecart','tnt','end_crystal','painting','armor_stand'];
  IDS.entities.forEach(e => {
    if (e.mod !== V || NO_EGG.includes(e.id.replace('minecraft:', ''))) return;
    I(e.id.replace('minecraft:', '') + '_spawn_egg', e.zh + '刷怪蛋', e.en + ' Spawn Egg');
  });

  // ================= 手工独特物品 =================

  // 石头/矿物方块
  [['stone','石头','Stone'],['granite','花岗岩','Granite'],['diorite','闪长岩','Diorite'],['andesite','安山岩','Andesite'],
   ['deepslate','深板岩','Deepslate'],['tuff','凝灰岩','Tuff'],['calcite','方解石','Calcite'],['dripstone_block','滴水石块','Dripstone Block'],
   ['cobblestone','圆石','Cobblestone'],['mossy_cobblestone','苔石','Mossy Cobblestone'],['sandstone','砂岩','Sandstone'],
   ['red_sandstone','红砂岩','Red Sandstone'],['bedrock','基岩','Bedrock'],['obsidian','黑曜石','Obsidian'],
   ['crying_obsidian','哭泣的黑曜石','Crying Obsidian'],['end_stone','末地石','End Stone'],['netherrack','下界岩','Netherrack'],
   ['soul_sand','灵魂沙','Soul Sand'],['soul_soil','灵魂土','Soul Soil'],['basalt','玄武岩','Basalt'],['smooth_basalt','平滑玄武岩','Smooth Basalt'],
   ['blackstone','黑石','Blackstone'],['gilded_blackstone','镶金黑石','Gilded Blackstone'],['polished_blackstone','磨制黑石','Polished Blackstone'],
   ['polished_granite','磨制花岗岩','Polished Granite'],['polished_diorite','磨制闪长岩','Polished Diorite'],['polished_andesite','磨制安山岩','Polished Andesite'],
   ['polished_deepslate','磨制深板岩','Polished Deepslate'],['cobbled_deepslate','深板岩圆石','Cobbled Deepslate'],['smooth_stone','平滑石头','Smooth Stone'],
   ['smooth_sandstone','平滑砂岩','Smooth Sandstone'],['smooth_red_sandstone','平滑红砂岩','Smooth Red Sandstone'],
   ['chiseled_stone_bricks','錾制石砖','Chiseled Stone Bricks'],['stone_bricks','石砖','Stone Bricks'],['cracked_stone_bricks','裂纹石砖','Cracked Stone Bricks'],
   ['mossy_stone_bricks','苔石砖','Mossy Stone Bricks'],['chiseled_deepslate','錾制深板岩','Chiseled Deepslate'],['cracked_deepslate_bricks','裂纹深板岩砖','Cracked Deepslate Bricks'],
   ['deepslate_bricks','深板岩砖','Deepslate Bricks'],['deepslate_tiles','深板岩瓦','Deepslate Tiles'],['cracked_deepslate_tiles','裂纹深板岩瓦','Cracked Deepslate Tiles'],
   ['polished_blackstone_bricks','磨制黑石砖','Polished Blackstone Bricks'],['chiseled_polished_blackstone','錾制磨制黑石','Chiseled Polished Blackstone'],
   ['cracked_polished_blackstone_bricks','裂纹磨制黑石砖','Cracked Polished Blackstone Bricks'],['mud_bricks','泥砖','Mud Bricks'],
   ['packed_mud','泥坯','Packed Mud'],['reinforced_deepslate','强化深板岩','Reinforced Deepslate']
  ].forEach(b => I(b[0], b[1], b[2]));

  // 自然方块
  [['grass_block','草方块','Grass Block'],['dirt','泥土','Dirt'],['coarse_dirt','砂土','Coarse Dirt'],['rooted_dirt','缠根泥土','Rooted Dirt'],
   ['podzol','灰化土','Podzol'],['mycelium','菌丝','Mycelium'],['mud','泥巴','Mud'],['clay','黏土块','Clay'],['gravel','沙砾','Gravel'],['sand','沙子','Sand'],
   ['red_sand','红沙','Red Sand'],['moss_block','苔藓块','Moss Block'],['moss_carpet','苔藓地毯','Moss Carpet'],['snow','雪','Snow'],
   ['snow_block','雪块','Snow Block'],['powder_snow','细雪','Powder Snow'],['ice','冰','Ice'],['packed_ice','浮冰','Packed Ice'],
   ['blue_ice','蓝冰','Blue Ice'],['frosted_ice','霜冰','Frosted Ice'],['cactus','仙人掌','Cactus'],['sugar_cane','甘蔗','Sugar Cane'],
   ['bamboo','竹子','Bamboo'],['kelp','海带','Kelp'],['dried_kelp_block','干海带块','Dried Kelp Block'],['seagrass','海草','Seagrass'],
   ['lily_pad','睡莲','Lily Pad'],['vine','藤蔓','Vine'],['weeping_vines','垂泪藤','Weeping Vines'],['twisting_vines','缠怨藤','Twisting Vines'],
   ['glow_lichen','发光地衣','Glow Lichen'],['hanging_roots','垂根','Hanging Roots'],['spore_blossom','孢子花','Spore Blossom'],
   ['nether_wart','下界疣','Nether Wart'],['nether_wart_block','下界疣块','Nether Wart Block'],['warped_wart_block','诡异疣块','Warped Wart Block'],
   ['shroomlight','菌光体','Shroomlight'],['crimson_roots','绯红菌索','Crimson Roots'],['warped_roots','诡异菌索','Warped Roots'],
   ['nether_sprouts','下界苗','Nether Sprouts'],['brown_mushroom','棕色蘑菇','Brown Mushroom'],['red_mushroom','红色蘑菇','Red Mushroom'],
   ['warped_fungus','诡异菌','Warped Fungus'],['crimson_fungus','绯红菌','Crimson Fungus'],['mushroom_stem','蘑菇柄','Mushroom Stem'],
   ['brown_mushroom_block','棕色蘑菇方块','Brown Mushroom Block'],['red_mushroom_block','红色蘑菇方块','Red Mushroom Block'],
   ['sculk','幽匿块','Sculk'],['sculk_vein','幽匿脉络','Sculk Vein'],['sculk_catalyst','幽匿催发体','Sculk Catalyst'],
   ['sculk_sensor','幽匿感测体','Sculk Sensor'],['sculk_shrieker','幽匿尖啸体','Sculk Shrieker'],['calibrated_sculk_sensor','校频幽匿感测体','Calibrated Sculk Sensor'],
   ['frogspawn','青蛙卵','Frogspawn'],['sea_pickle','海泡菜','Sea Pickle'],['turtle_egg','海龟蛋','Turtle Egg'],['sniffer_egg','嗅探兽蛋','Sniffer Egg'],
   ['sponge','海绵','Sponge'],['wet_sponge','湿海绵','Wet Sponge'],['sea_lantern','海晶灯','Sea Lantern'],['prismarine','海晶石','Prismarine'],
   ['prismarine_bricks','海晶石砖','Prismarine Bricks'],['dark_prismarine','暗海晶石','Dark Prismarine'],['magma_block','岩浆块','Magma Block'],
   ['glowstone','荧石','Glowstone'],['ochre_froglight','赭黄蛙明灯','Ochre Froglight'],['verdant_froglight','翠绿蛙明灯','Verdant Froglight'],
   ['pearlescent_froglight','珠光蛙明灯','Pearlescent Froglight'],['pumpkin','南瓜','Pumpkin'],['carved_pumpkin','雕刻南瓜','Carved Pumpkin'],
   ['jack_o_lantern','南瓜灯','Jack o\'Lantern'],['melon','西瓜','Melon'],['hay_block','干草块','Hay Block'],['bone_block','骨块','Bone Block']
  ].forEach(b => I(b[0], b[1], b[2]));

  // 花/植物
  [['dandelion','蒲公英','Dandelion'],['poppy','虞美人','Poppy'],['blue_orchid','兰花','Blue Orchid'],['allium','绒球葱','Allium'],
   ['azure_bluet','茜草花','Azure Bluet'],['red_tulip','红色郁金香','Red Tulip'],['orange_tulip','橙色郁金香','Orange Tulip'],
   ['white_tulip','白色郁金香','White Tulip'],['pink_tulip','粉色郁金香','Pink Tulip'],['oxeye_daisy','滨菊','Oxeye Daisy'],
   ['cornflower','矢车菊','Cornflower'],['lily_of_the_valley','铃兰','Lily of the Valley'],['wither_rose','凋零玫瑰','Wither Rose'],
   ['torchflower','火把花','Torchflower'],['pitcher_plant','猪笼草','Pitcher Plant'],['sunflower','向日葵','Sunflower'],
   ['lilac','丁香','Lilac'],['rose_bush','玫瑰丛','Rose Bush'],['peony','牡丹','Peony'],['pitcher_pod','猪笼草荚','Pitcher Pod'],
   ['torchflower_seeds','火把花种子','Torchflower Seeds'],['fern','蕨','Fern'],['large_fern','大型蕨','Large Fern'],['grass','草','Grass'],
   ['tall_grass','高草丛','Tall Grass'],['dead_bush','枯萎的灌木','Dead Bush'],['sweet_berry_bush','甜浆果丛','Sweet Berry Bush'],
   ['cocoa','可可果','Cocoa'],['wheat','小麦','Wheat'],['carrots','胡萝卜','Carrots'],['potatoes','马铃薯','Potatoes'],
   ['beetroots','甜菜','Beetroots'],['mangrove_propagule','红树胎生苗','Mangrove Propagule'],['cherry_sapling','樱花树苗','Cherry Sapling']
  ].forEach(b => I(b[0], b[1], b[2]));

  // 功能方块
  [['furnace','熔炉','Furnace'],['blast_furnace','高炉','Blast Furnace'],['smoker','烟熏炉','Smoker'],['crafting_table','工作台','Crafting Table'],
   ['chest','箱子','Chest'],['trapped_chest','陷阱箱','Trapped Chest'],['ender_chest','末影箱','Ender Chest'],['barrel','木桶','Barrel'],
   ['hopper','漏斗','Hopper'],['dispenser','发射器','Dispenser'],['dropper','投掷器','Dropper'],['observer','侦测器','Observer'],
   ['piston','活塞','Piston'],['sticky_piston','粘性活塞','Sticky Piston'],['lever','拉杆','Lever'],['redstone_torch','红石火把','Redstone Torch'],
   ['redstone_lamp','红石灯','Redstone Lamp'],['redstone_block','红石块','Redstone Block'],['repeater','红石中继器','Redstone Repeater'],
   ['comparator','红石比较器','Redstone Comparator'],['daylight_detector','阳光探测器','Daylight Detector'],['note_block','音符盒','Note Block'],
   ['jukebox','唱片机','Jukebox'],['enchanting_table','附魔台','Enchanting Table'],['anvil','铁砧','Anvil'],
   ['chipped_anvil','开裂的铁砧','Chipped Anvil'],['damaged_anvil','损坏的铁砧','Damaged Anvil'],['grindstone','砂轮','Grindstone'],
   ['smithing_table','锻造台','Smithing Table'],['fletching_table','制箭台','Fletching Table'],['cartography_table','制图台','Cartography Table'],
   ['stonecutter','切石机','Stonecutter'],['loom','织布机','Loom'],['composter','堆肥桶','Composter'],['cauldron','炼药锅','Cauldron'],
   ['brewing_stand','酿造台','Brewing Stand'],['beacon','信标','Beacon'],['conduit','潮涌核心','Conduit'],['campfire','营火','Campfire'],
   ['soul_campfire','灵魂营火','Soul Campfire'],['lantern','灯笼','Lantern'],['soul_lantern','灵魂灯笼','Soul Lantern'],['torch','火把','Torch'],
   ['soul_torch','灵魂火把','Soul Torch'],['ladder','梯子','Ladder'],['scaffolding','脚手架','Scaffolding'],['lightning_rod','避雷针','Lightning Rod'],
   ['target','标靶','Target'],['bell','钟','Bell'],['chain','锁链','Chain'],['iron_bars','铁栏杆','Iron Bars'],['glass','玻璃','Glass'],
   ['glass_pane','玻璃板','Glass Pane'],['honey_block','蜂蜜块','Honey Block'],['honeycomb_block','蜜脾块','Honeycomb Block'],
   ['slime_block','粘液块','Slime Block'],['tnt','TNT','TNT'],['bookshelf','书架','Bookshelf'],['chiseled_bookshelf','雕纹书架','Chiseled Bookshelf'],
   ['lectern','讲台','Lectern'],['flower_pot','花盆','Flower Pot'],['decorated_pot','饰纹陶罐','Decorated Pot'],
   ['amethyst_block','紫水晶块','Amethyst Block'],['budding_amethyst','紫水晶母岩','Budding Amethyst'],['amethyst_cluster','紫水晶簇','Amethyst Cluster'],
   ['large_amethyst_bud','大型紫水晶芽','Large Amethyst Bud'],['medium_amethyst_bud','中型紫水晶芽','Medium Amethyst Bud'],
   ['small_amethyst_bud','小型紫水晶芽','Small Amethyst Bud'],['pointed_dripstone','滴水石锥','Pointed Dripstone'],['cobweb','蜘蛛网','Cobweb'],
   ['spawner','刷怪笼','Spawner'],['crafter','合成器','Crafter']
  ].forEach(b => I(b[0], b[1], b[2]));

  // 食物
  [['apple','苹果','Apple'],['golden_apple','金苹果','Golden Apple'],['enchanted_golden_apple','附魔金苹果','Enchanted Golden Apple'],
   ['melon_slice','西瓜片','Melon Slice'],['sweet_berries','甜浆果','Sweet Berries'],['glow_berries','荧光浆果','Glow Berries'],
   ['bread','面包','Bread'],['porkchop','生猪排','Raw Porkchop'],['cooked_porkchop','熟猪排','Cooked Porkchop'],
   ['chicken','生鸡肉','Raw Chicken'],['cooked_chicken','熟鸡肉','Cooked Chicken'],['cod','生鳕鱼','Raw Cod'],['cooked_cod','熟鳕鱼','Cooked Cod'],
   ['salmon','生鲑鱼','Raw Salmon'],['cooked_salmon','熟鲑鱼','Cooked Salmon'],['mutton','生羊肉','Raw Mutton'],['cooked_mutton','熟羊肉','Cooked Mutton'],
   ['beef','生牛肉','Raw Beef'],['cooked_beef','牛排','Steak'],['rabbit','生兔肉','Raw Rabbit'],['cooked_rabbit','熟兔肉','Cooked Rabbit'],
   ['carrot','胡萝卜','Carrot'],['potato','马铃薯','Potato'],['baked_potato','烤马铃薯','Baked Potato'],['poisonous_potato','毒马铃薯','Poisonous Potato'],
   ['golden_carrot','金胡萝卜','Golden Carrot'],['pumpkin_pie','南瓜派','Pumpkin Pie'],['cake','蛋糕','Cake'],['cookie','曲奇','Cookie'],
   ['honey_bottle','蜂蜜瓶','Honey Bottle'],['mushroom_stew','蘑菇煲','Mushroom Stew'],['beetroot_soup','甜菜汤','Beetroot Soup'],
   ['rabbit_stew','兔肉煲','Rabbit Stew'],['suspicious_stew','迷之炖菜','Suspicious Stew'],['dried_kelp','干海带','Dried Kelp'],
   ['chorus_fruit','紫颂果','Chorus Fruit'],['popped_chorus_fruit','爆裂紫颂果','Popped Chorus Fruit'],['rotten_flesh','腐肉','Rotten Flesh'],
   ['spider_eye','蜘蛛眼','Spider Eye'],['fermented_spider_eye','发酵蛛眼','Fermented Spider Eye'],['beetroot','甜菜根','Beetroot'],
   ['beetroot_seeds','甜菜种子','Beetroot Seeds'],['wheat','小麦','Wheat'],['wheat_seeds','小麦种子','Wheat Seeds'],
   ['cocoa_beans','可可豆','Cocoa Beans'],['egg','鸡蛋','Egg'],['bone_meal','骨粉','Bone Meal'],['glow_ink_sac','荧光墨囊','Glow Ink Sac'],
   ['ink_sac','墨囊','Ink Sac'],['honeycomb','蜜脾','Honeycomb']
  ].forEach(b => I(b[0], b[1], b[2]));

  // 材料/杂项
  [['coal','煤炭','Coal'],['charcoal','木炭','Charcoal'],['stick','木棍','Stick'],['bone','骨头','Bone'],['string','线','String'],
   ['feather','羽毛','Feather'],['flint','燧石','Flint'],['leather','皮革','Leather'],['rabbit_hide','兔子皮','Rabbit Hide'],
   ['rabbit_foot','兔子脚','Rabbit\'s Foot'],['blaze_rod','烈焰棒','Blaze Rod'],['blaze_powder','烈焰粉','Blaze Powder'],
   ['ghast_tear','恶魂之泪','Ghast Tear'],['gunpowder','火药','Gunpowder'],['ender_pearl','末影珍珠','Ender Pearl'],
   ['ender_eye','末影之眼','Eye of Ender'],['shulker_shell','潜影壳','Shulker Shell'],['slime_ball','粘液球','Slime Ball'],
   ['magma_cream','岩浆膏','Magma Cream'],['nether_star','下界之星','Nether Star'],['totem_of_undying','不死图腾','Totem of Undying'],
   ['phantom_membrane','幻翼膜','Phantom Membrane'],['nautilus_shell','鹦鹉螺壳','Nautilus Shell'],['heart_of_the_sea','海洋之心','Heart of the Sea'],
   ['prismarine_shard','海晶碎片','Prismarine Shard'],['prismarine_crystals','海晶砂粒','Prismarine Crystals'],['glowstone_dust','荧石粉','Glowstone Dust'],
   ['redstone_dust','红石粉','Redstone Dust'],['sugar','糖','Sugar'],['paper','纸','Paper'],['book','书','Book'],
   ['writable_book','书与笔','Book and Quill'],['written_book','成书','Written Book'],['enchanted_book','附魔书','Enchanted Book'],
   ['map','空白地图','Empty Map'],['filled_map','地图','Filled Map'],['experience_bottle','附魔之瓶','Bottle o\' Enchanting'],
   ['glass_bottle','玻璃瓶','Glass Bottle'],['dragon_breath','龙息','Dragon\'s Breath'],['firework_rocket','烟花火箭','Firework Rocket'],
   ['firework_star','烟花之星','Firework Star'],['bundle','收纳袋','Bundle'],['scute','鳞甲','Scute'],['nether_brick','下界砖','Nether Brick'],
   ['nether_bricks','下界砖块','Nether Bricks'],['red_nether_bricks','红色下界砖块','Red Nether Bricks'],['nether_brick_fence','下界砖栅栏','Nether Brick Fence'],
   ['nether_brick_slab','下界砖台阶','Nether Brick Slab'],['nether_brick_stairs','下界砖楼梯','Nether Brick Stairs'],
   ['purpur_block','紫珀块','Purpur Block'],['purpur_pillar','紫珀柱','Purpur Pillar'],['purpur_slab','紫珀台阶','Purpur Slab'],
   ['purpur_stairs','紫珀楼梯','Purpur Stairs'],['end_stone_bricks','末地石砖','End Stone Bricks'],['end_rod','末地烛','End Rod'],
   ['chorus_plant','紫颂植株','Chorus Plant'],['chorus_flower','紫颂花','Chorus Flower'],['dragon_egg','龙蛋','Dragon Egg'],
   ['elytra','鞘翅','Elytra'],['heart_of_the_sea','海洋之心','Heart of the Sea']
  ].forEach(m => I(m[0], m[1], m[2]));

  // 唱片
  ['13','cat','blocks','chirp','far','mall','mellohi','stal','strad','ward','11','wait','otherside','relic','pigstep','5']
    .forEach(d => I('music_disc_' + d, '音乐唱片 ' + d, 'Music Disc ' + d));
  I('disc_fragment_5', '唱片残片 5', 'Disc Fragment 5');

  // 锻造模板
  ['netherite_upgrade','coast_armor_trim','dune_armor_trim','eye_armor_trim','host_armor_trim','rib_armor_trim',
   'sentry_armor_trim','shaper_armor_trim','silence_armor_trim','snout_armor_trim','spire_armor_trim',
   'tide_armor_trim','vex_armor_trim','ward_armor_trim','wayfinder_armor_trim','wild_armor_trim']
    .forEach(t => I(t + '_smithing_template', t + '锻造模板', t + ' Smithing Template'));

  // 陶器碎片/旗帜图案
  ['angler','archer','arms_up','blade','brewer','burn','danger','explorer','friend','heart','heartbreak','howl',
   'miner','mourner','plenty','prize','sheaf','shelter','skull','snort'].forEach(s => I(s + '_pottery_sherd', s + '陶器碎片', s + ' Pottery Sherd'));
  ['creeper','skull','flower','mojang','globe','piglin'].forEach(b => I(b + '_banner_pattern', b + '旗帜图案', b + ' Banner Pattern'));

  IDS.items.push.apply(IDS.items, P);
})();
