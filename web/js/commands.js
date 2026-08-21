/* ============================================================
   commands.js - 指令模板（Java 1.20.1）
   由Escape制作，适用于JAVA1.20.1
   参数类型：text / number / select / checkbox / target / item /
             entity / pos / nbt / rot
   build(v) 返回指令字符串（不带 "/"）；无 build 时通用拼接
   ============================================================ */
'use strict';

/* ---------- 内置注册表 ---------- */

// gamerule 规则（1.20.1 全部）
const RULES = [
  ['announceAdvancements','游戏内公告进度','Announce Advancements','bool'],
  ['blockExplosionDropDecay','方块爆炸掉落衰减','Block Explosion Drop Decay','bool'],
  ['commandBlockOutput','命令方块输出','Command Block Output','bool'],
  ['disableElytraMovementCheck','禁用鞘翅移动检测','Disable Elytra Movement Check','bool'],
  ['disableRaids','禁用袭击','Disable Raids','bool'],
  ['doDaylightCycle','昼夜循环','Do Daylight Cycle','bool'],
  ['doEntityDrops','实体掉落','Do Entity Drops','bool'],
  ['doFireTick','火焰蔓延','Do Fire Tick','bool'],
  ['doImmediateRespawn','立即重生','Do Immediate Respawn','bool'],
  ['doInsomnia','幻翼生成','Do Insomnia','bool'],
  ['doLimitedCrafting','限制合成','Do Limited Crafting','bool'],
  ['doMobLoot','生物掉落物','Do Mob Loot','bool'],
  ['doMobSpawning','生物生成','Do Mob Spawning','bool'],
  ['doPatrolSpawning','灾厄巡逻队生成','Do Patrol Spawning','bool'],
  ['doTileDrops','方块掉落','Do Tile Drops','bool'],
  ['doTraderSpawning','流浪商人生成','Do Trader Spawning','bool'],
  ['doVinesSpread','藤蔓蔓延','Do Vines Spread','bool'],
  ['doWardenSpawning','循声守卫生成','Do Warden Spawning','bool'],
  ['doWeatherCycle','天气循环','Do Weather Cycle','bool'],
  ['drowningDamage','溺水伤害','Drowning Damage','bool'],
  ['enderPearlsVanishOnDeath','末影珍珠死亡消失','Ender Pearls Vanish On Death','bool'],
  ['fallDamage','摔落伤害','Fall Damage','bool'],
  ['fireDamage','火焰伤害','Fire Damage','bool'],
  ['forgiveDeadPlayers','宽恕死亡玩家','Forgive Dead Players','bool'],
  ['freezeDamage','冰冻伤害','Freeze Damage','bool'],
  ['globalSoundEvents','全局音效事件','Global Sound Events','bool'],
  ['keepInventory','死亡保留物品','Keep Inventory','bool'],
  ['lavaSourceConversion','熔岩源转换','Lava Source Conversion','bool'],
  ['logAdminCommands','记录管理员指令','Log Admin Commands','bool'],
  ['maxCommandChainLength','最大连锁命令方块长度','Max Command Chain Length','int'],
  ['maxEntityCramming','实体挤压上限','Max Entity Cramming','int'],
  ['mobExplosionDropDecay','生物爆炸掉落衰减','Mob Explosion Drop Decay','bool'],
  ['mobGriefing','生物破坏','Mob Griefing','bool'],
  ['naturalRegeneration','自然生命恢复','Natural Regeneration','bool'],
  ['playersSleepingPercentage','玩家睡眠百分比','Players Sleeping Percentage','int'],
  ['randomTickSpeed','随机刻速度','Random Tick Speed','int'],
  ['reducedDebugInfo','精简调试信息','Reduced Debug Info','bool'],
  ['sendCommandFeedback','发送指令反馈','Send Command Feedback','bool'],
  ['showBorderEffect','显示边界效果','Show Border Effect','bool'],
  ['showCoordinates','显示坐标','Show Coordinates','bool'],
  ['showDeathMessages','显示死亡消息','Show Death Messages','bool'],
  ['showRecipeMessages','显示合成配方消息','Show Recipe Messages','bool'],
  ['snowAccumulationHeight','积雪高度','Snow Accumulation Height','int'],
  ['spawnRadius','出生点半径','Spawn Radius','int'],
  ['spectatorsGenerateChunks','旁观者生成区块','Spectators Generate Chunks','bool'],
  ['tntExplosionDropDecay','TNT爆炸掉落衰减','TNT Explosion Drop Decay','bool'],
  ['universalAnger','全体愤怒','Universal Anger','bool'],
  ['waterSourceConversion','水源转换','Water Source Conversion','bool'],
];

// 附魔（1.20.1 全部，带中文名）
const ENCHANTS = [
  ['protection','保护','Protection'],['fire_protection','火焰保护','Fire Protection'],
  ['feather_falling','摔落保护','Feather Falling'],['blast_protection','爆炸保护','Blast Protection'],
  ['projectile_protection','弹射物保护','Projectile Protection'],['respiration','水下呼吸','Respiration'],
  ['aqua_affinity','水下速掘','Aqua Affinity'],['thorns','荆棘','Thorns'],
  ['depth_strider','深海探索者','Depth Strider'],['frost_walker','冰霜行者','Frost Walker'],
  ['binding_curse','绑定诅咒','Curse of Binding'],['sharpness','锋利','Sharpness'],
  ['smite','亡灵杀手','Smite'],['bane_of_arthropods','节肢杀手','Bane of Arthropods'],
  ['knockback','击退','Knockback'],['fire_aspect','火焰附加','Fire Aspect'],
  ['looting','抢夺','Looting'],['sweeping_edge','横扫之刃','Sweeping Edge'],
  ['efficiency','效率','Efficiency'],['silk_touch','精准采集','Silk Touch'],
  ['unbreaking','耐久','Unbreaking'],['fortune','时运','Fortune'],
  ['power','力量','Power'],['punch','冲击','Punch'],['flame','火矢','Flame'],['infinity','无限','Infinity'],
  ['luck_of_the_sea','海之眷顾','Luck of the Sea'],['lure','饵钓','Lure'],
  ['loyalty','忠诚','Loyalty'],['impaling','穿刺','Impaling'],['riptide','激流','Riptide'],
  ['channeling','引雷','Channeling'],['multishot','多重射击','Multishot'],
  ['quick_charge','快速装填','Quick Charge'],['piercing','穿透','Piercing'],
  ['mending','经验修补','Mending'],['vanishing_curse','消失诅咒','Curse of Vanishing'],
  ['soul_speed','灵魂疾行','Soul Speed'],['swift_sneak','迅捷潜行','Swift Sneak'],
];

// 生物群系（1.20.1 主要，含下界/末地）
const BIOMES = [
  ['plains','平原','Plains'],['sunflower_plains','向日葵平原','Sunflower Plains'],
  ['snowy_plains','积雪平原','Snowy Plains'],['ice_spikes','冰刺之地','Ice Spikes'],
  ['desert','沙漠','Desert'],['swamp','沼泽','Swamp'],['mangrove_swamp','红树林沼泽','Mangrove Swamp'],
  ['forest','森林','Forest'],['flower_forest','繁花森林','Flower Forest'],['birch_forest','白桦林','Birch Forest'],
  ['old_growth_birch_forest','原始白桦林','Old Growth Birch Forest'],['dark_forest','黑森林','Dark Forest'],
  ['pale_garden','苍白花园','Pale Garden'],['jungle','丛林','Jungle'],['sparse_jungle','稀疏丛林','Sparse Jungle'],
  ['bamboo_jungle','竹林','Bamboo Jungle'],['taiga','针叶林','Taiga'],['snowy_taiga','积雪针叶林','Snowy Taiga'],
  ['old_growth_pine_taiga','原始松木针叶林','Old Growth Pine Taiga'],['old_growth_spruce_taiga','原始云杉针叶林','Old Growth Spruce Taiga'],
  ['savanna','热带草原','Savanna'],['savanna_plateau','热带高原','Savanna Plateau'],
  ['windswept_hills','风袭丘陵','Windswept Hills'],['windswept_gravelly_hills','风袭砂砾丘陵','Windswept Gravelly Hills'],
  ['windswept_forest','风袭森林','Windswept Forest'],['windswept_savanna','风袭热带草原','Windswept Savanna'],
  ['meadow','草甸','Meadow'],['grove','雪林','Grove'],['snowy_slopes','雪坡','Snowy Slopes'],
  ['frozen_peaks','冰封山峰','Frozen Peaks'],['jagged_peaks','尖峭山峰','Jagged Peaks'],['stony_peaks','裸岩山峰','Stony Peaks'],
  ['beach','海滩','Beach'],['snowy_beach','积雪海滩','Snowy Beach'],['stony_shore','石岸','Stony Shore'],
  ['mushroom_fields','蘑菇岛','Mushroom Fields'],['badlands','恶地','Badlands'],['eroded_badlands','侵蚀恶地','Eroded Badlands'],
  ['wooded_badlands','繁茂恶地','Wooded Badlands'],['deep_dark','深暗之域','Deep Dark'],
  ['dripstone_caves','溶洞','Dripstone Caves'],['lush_caves','繁茂洞穴','Lush Caves'],
  ['river','河流','River'],['frozen_river','冻河','Frozen River'],['ocean','海洋','Ocean'],
  ['cold_ocean','冷水海洋','Cold Ocean'],['deep_cold_ocean','深层冷水海洋','Deep Cold Ocean'],
  ['deep_frozen_ocean','深层冰冻海洋','Deep Frozen Ocean'],['deep_lukewarm_ocean','深层温水海洋','Deep Lukewarm Ocean'],
  ['deep_ocean','深海','Deep Ocean'],['frozen_ocean','冰冻海洋','Frozen Ocean'],['lukewarm_ocean','温水海洋','Lukewarm Ocean'],
  ['warm_ocean','暖水海洋','Warm Ocean'],
  ['nether_wastes','下界荒地','Nether Wastes'],['soul_sand_valley','灵魂沙峡谷','Soul Sand Valley'],
  ['crimson_forest','绯红森林','Crimson Forest'],['warped_forest','诡异森林','Warped Forest'],
  ['basalt_deltas','玄武岩三角洲','Basalt Deltas'],
  ['the_end','末地','The End'],['small_end_islands','末地小岛','Small End Islands'],
  ['end_midlands','末地内陆','End Midlands'],['end_highlands','末地高地','End Highlands'],['end_barrens','末地荒地','End Barrens'],
];

// 粒子（1.20.1 主要）
const PARTICLES = [
  ['ash','灰烬','Ash'],['bubble','气泡','Bubble'],['bubble_pop','气泡破裂','Bubble Pop'],
  ['campfire_cosy_smoke','营火轻烟','Campfire Cosy Smoke'],['campfire_signal_smoke','营火浓烟','Campfire Signal Smoke'],
  ['cloud','云','Cloud'],['crit','暴击','Critical Hit'],['damage_indicator','伤害指示','Damage Indicator'],
  ['dragon_breath','龙息','Dragon Breath'],['dripping_dripstone_lava','滴落熔岩滴石','Dripping Dripstone Lava'],
  ['dripping_dripstone_water','滴落水滴石','Dripping Dripstone Water'],['dripping_lava','滴落熔岩','Dripping Lava'],
  ['dripping_water','滴水','Dripping Water'],['dust','粉尘','Dust'],['dust_color_transition','渐变色粉尘','Dust Color Transition'],
  ['effect','治疗粒子','Effect'],['elder_guardian','远古守卫者粒子','Elder Guardian'],['electric_spark','电火花','Electric Spark'],
  ['enchant','附魔粒子','Enchant'],['enchanted_hit','附魔击中','Enchanted Hit'],['end_rod','末地烛','End Rod'],
  ['entity_effect','实体效果','Entity Effect'],['explosion','爆炸','Explosion'],['explosion_emitter','爆炸源','Explosion Emitter'],
  ['falling_dust','下落灰尘','Falling Dust'],['firework','烟花','Firework'],['fishing','钓鱼','Fishing'],
  ['flame','火焰','Flame'],['flash','闪光','Flash'],['glow','萤光','Glow'],['glow_squid_ink','发光鱿鱼墨','Glow Squid Ink'],
  ['happy_villager','村民开心','Happy Villager'],['heart','爱心','Heart'],['instant_effect','瞬间效果','Instant Effect'],
  ['item_slime','史莱姆','Item Slime'],['item_snowball','雪球','Item Snowball'],['item_cobweb','蜘蛛网','Item Cobweb'],
  ['lava','熔岩','Lava'],['mycelium','菌丝','Mycelium'],['nectar','花蜜','Nectar'],['note','音符','Note'],
  ['poof','消散','Poof'],['portal','传送门','Portal'],['rain','雨','Rain'],['scrape','刮痕','Scrape'],
  ['sculk_charge','幽匿充能','Sculk Charge'],['sculk_charge_pop','幽匿充能爆裂','Sculk Charge Pop'],['sculk_soul','幽匿灵魂','Sculk Soul'],
  ['sensitive_sleep','敏感睡眠','Sensitive Sleep'],['shriek','尖啸','Shriek'],['sneeze','喷嚏','Sneeze'],
  ['snowflake','雪花','Snowflake'],['sonic_boom','音爆','Sonic Boom'],['soul','灵魂','Soul'],
  ['soul_fire_flame','灵魂火','Soul Fire Flame'],['spit','吐口水','Spit'],['splash','水花','Splash'],
  ['spore_blossom_air','孢子花','Spore Blossom Air'],['squid_ink','鱿鱼墨','Squid Ink'],['sweep_attack','横扫','Sweep Attack'],
  ['totem_of_undying','不死图腾','Totem of Undying'],['underwater','水下','Underwater'],['vibration','振动','Vibration'],
  ['wax_off','除蜡','Wax Off'],['wax_on','上蜡','Wax On'],['white_ash','白色灰烬','White Ash'],['witch','女巫','Witch'],
];

// 音效（1.20.1 常用，按注册名）
const SOUNDS = [
  ['entity.player.levelup','玩家升级','Player Level Up'],['entity.player.burp','玩家打嗝','Player Burp'],
  ['entity.experience_orb.pickup','经验球拾取','XP Orb Pickup'],['entity.item.pickup','物品拾取','Item Pickup'],
  ['entity.ender_dragon.death','末影龙死亡','Ender Dragon Death'],['entity.wither.spawn','凋灵生成','Wither Spawn'],
  ['entity.ender_dragon.growl','末影龙吼叫','Ender Dragon Growl'],['entity.wither.shoot','凋灵射击','Wither Shoot'],
  ['entity.ghast.hurt','恶魂受伤','Ghast Hurt'],['entity.ghast.warn','恶魂警告','Ghast Warn'],
  ['entity.creeper.primed','苦力怕点燃','Creeper Primed'],['entity.creeper.explode','苦力怕爆炸','Creeper Explode'],
  ['entity.generic.explode','爆炸','Generic Explode'],['entity.tnt.primed','TNT点燃','TNT Primed'],
  ['entity.zombie.ambient','僵尸叫声','Zombie Ambient'],['entity.zombie_horse.ambient','僵尸马叫声','Zombie Horse'],
  ['entity.skeleton.ambient','骷髅叫声','Skeleton Ambient'],['entity.spider.ambient','蜘蛛叫声','Spider Ambient'],
  ['entity.enderman.ambient','末影人叫声','Enderman Ambient'],['entity.enderman.scream','末影人尖叫','Enderman Scream'],
  ['entity.blaze.ambient','烈焰人叫声','Blaze Ambient'],['entity.magma_cube.squish','岩浆怪挤压','Magma Cube Squish'],
  ['entity.slime.squish','史莱姆挤压','Slime Squish'],['entity.witch.ambient','女巫叫声','Witch Ambient'],
  ['entity.villager.ambient','村民嘀咕','Villager Ambient'],['entity.villager.yes','村民同意','Villager Yes'],
  ['entity.villager.no','村民反对','Villager No'],['entity.villager.trade','村民交易','Villager Trade'],
  ['entity.iron_golem.step','铁傀儡脚步','Iron Golem Step'],['entity.sheep.ambient','羊叫','Sheep Ambient'],
  ['entity.pig.ambient','猪叫','Pig Ambient'],['entity.cow.ambient','牛叫','Cow Ambient'],
  ['entity.chicken.ambient','鸡叫','Chicken Ambient'],['entity.wolf.ambient','狼嚎','Wolf Ambient'],
  ['entity.cat.ambient','猫叫','Cat Ambient'],['entity.horse.ambient','马叫','Horse Ambient'],
  ['entity.donkey.ambient','驴叫','Donkey Ambient'],['entity.bat.ambient','蝙蝠叫声','Bat Ambient'],
  ['entity.fish.swim','鱼游动','Fish Swim'],['entity.parrot.ambient','鹦鹉叫声','Parrot Ambient'],
  ['entity.bee.pollinate','蜜蜂授粉','Bee Pollinate'],['entity.axolotl.splash','美西螈水花','Axolotl Splash'],
  ['entity.goat.ambient','山羊叫声','Goat Ambient'],['entity.allay.ambient','悦灵声音','Allay Ambient'],
  ['entity.warden.heartbeat','循声守卫心跳','Warden Heartbeat'],['entity.warden.roar','循声守卫咆哮','Warden Roar'],
  ['entity.warden.sonic_boom','循声守卫音爆','Warden Sonic Boom'],['entity.frog.ambient','青蛙叫声','Frog Ambient'],
  ['entity.sniffer.sniffing','嗅探兽嗅探','Sniffer Sniffing'],['entity.camel.ambient','骆驼叫声','Camel Ambient'],
  ['block.note_block.pling','音符盒','Note Block Pling'],['block.note_block.hat','音符盒踩镲','Note Block Hat'],
  ['block.note_block.bass','音符盒贝斯','Note Block Bass'],['block.note_block.snare','音符盒军鼓','Note Block Snare'],
  ['block.anvil.place','铁砧放置','Anvil Place'],['block.anvil.land','铁砧落地','Anvil Land'],
  ['block.anvil.break','铁砧破碎','Anvil Break'],['block.chest.open','箱子打开','Chest Open'],
  ['block.chest.close','箱子关闭','Chest Close'],['block.ender_chest.open','末影箱打开','Ender Chest Open'],
  ['block.shulker_box.open','潜影盒打开','Shulker Box Open'],['block.barrel.open','木桶打开','Barrel Open'],
  ['block.furnace.fire_crackle','熔炉噼啪','Furnace Crackle'],['block.bell.use','钟响','Bell Use'],
  ['block.portal.ambient','传送门声','Portal Ambient'],['block.portal.travel','传送门传送','Portal Travel'],
  ['block.end_portal_frame.fill','末地传送门填充','End Portal Frame Fill'],['block.respawn_anchor.set_spawn','重生锚设置','Respawn Anchor Set'],
  ['block.beacon.activate','信标激活','Beacon Activate'],['block.beacon.deactivate','信标关闭','Beacon Deactivate'],
  ['block.beehive.work','蜂巢工作','Beehive Work'],['block.ender_eye.place','末影之眼放置','Ender Eye Place'],
  ['block.enchantment_table.use','附魔台使用','Enchantment Table Use'],['block.grass.break','草方块破坏','Grass Break'],
  ['block.stone.break','石头破坏','Stone Break'],['block.wood.break','木头破坏','Wood Break'],
  ['block.wool.break','羊毛破坏','Wool Break'],['block.glass.break','玻璃破坏','Glass Break'],
  ['block.sand.break','沙子破坏','Sand Break'],['block.lava.ambient','熔岩声','Lava Ambient'],
  ['block.water.ambient','水声','Water Ambient'],['block.fire.ambient','火焰声','Fire Ambient'],
  ['block.amethyst_block.chime','紫水晶轻响','Amethyst Chime'],['block.sculk_sensor.clicking','幽匿感测体触发','Sculk Sensor Click'],
  ['block.note_block.pling','音符盒点击','Note Block'],['block.piston.extend','活塞伸出','Piston Extend'],
  ['block.piston.contract','活塞收回','Piston Contract'],['item.elytra.flying','鞘翅飞行','Elytra Flying'],
  ['item.trident.thunder','三叉戟引雷','Trident Thunder'],['item.trident.riptide','三叉戟激流','Trident Riptide'],
  ['item.shield.block','盾牌格挡','Shield Block'],['item.bucket.empty','桶倒出','Bucket Empty'],
  ['item.bucket.fill','桶装水','Bucket Fill'],['item.bow.shoot','弓射箭','Bow Shoot'],
  ['item.crossbow.shoot','弩发射','Crossbow Shoot'],['item.flintandsteel.use','打火石使用','Flint and Steel'],
  ['item.ender_pearl.throw','末影珍珠投掷','Ender Pearl Throw'],['item.firework_rocket.launch','烟花发射','Firework Launch'],
  ['item.honey_bottle.drink','蜂蜜瓶喝','Honey Bottle Drink'],['item.goat_horn.play','山羊角吹响','Goat Horn Play'],
  ['ui.button.click','按钮点击','UI Button Click'],['ui.toast.in','弹窗进入','Toast In'],
  ['ambient.cave','洞穴环境','Cave Ambient'],['weather.rain','雨声','Rain'],['weather.rain.above','雨（上方）','Rain Above'],
  ['music.creative','创造模式音乐','Creative Music'],['music_disc.13','唱片 13','Music Disc 13'],
  ['music_disc.cat','唱片 cat','Music Disc Cat'],['music_disc.blocks','唱片 blocks','Music Disc Blocks'],
  ['music_disc.chirp','唱片 chirp','Music Disc Chirp'],['music_disc.far','唱片 far','Music Disc Far'],
  ['music_disc.mall','唱片 mall','Music Disc Mall'],['music_disc.mellohi','唱片 mellohi','Music Disc Mellohi'],
  ['music_disc.stal','唱片 stal','Music Disc Stal'],['music_disc.strad','唱片 strad','Music Disc Strad'],
  ['music_disc.ward','唱片 ward','Music Disc Ward'],['music_disc.11','唱片 11','Music Disc 11'],
  ['music_disc.wait','唱片 wait','Music Disc Wait'],['music_disc.otherside','唱片 other side','Music Disc Otherside'],
  ['music_disc.relic','唱片 relic','Music Disc Relic'],['music_disc.pigstep','唱片 pigstep','Music Disc Pigstep'],
  ['music_disc.creator','唱片 creator','Music Disc Creator'],['music_disc.creator_music_box','唱片 creator music box','Music Disc Creator Music Box'],
  ['music_disc.precipice','唱片 precipice','Music Disc Precipice'],['music_disc.five','唱片 five','Music Disc Five'],
];

// 难度
const DIFFICULTIES = [['peaceful','和平','Peaceful'],['easy','简单','Easy'],['normal','普通','Normal'],['hard','困难','Hard']];

// 天气
const WEATHERS = [['clear','晴天','Clear'],['rain','下雨','Rain'],['thunder','雷暴','Thunder']];

// 时间关键字
const TIME_KEYS = [['day','白天(1000)','Day'],['noon','正午(6000)','Noon'],['night','夜晚(13000)','Night'],['midnight','午夜(18000)','Midnight']];

// 声音来源（playsound）
const SOUND_SOURCES = [['master','主音量','Master'],['music','音乐','Music'],['record','唱片','Record'],['weather','天气','Weather'],['block','方块','Block'],['hostile','敌对','Hostile'],['neutral','友好','Neutral'],['player','玩家','Player'],['ambient','环境','Ambient'],['voice','语音','Voice']];

// 游戏模式
const GAMEMODES = [['survival','生存','Survival'],['creative','创造','Creative'],['adventure','冒险','Adventure'],['spectator','旁观','Spectator']];

/* ---------- 指令模板 ---------- */
const COMMAND_CATS = [
  { key: 'cat_common', items: ['give','summon','effect','enchant','clear','kill','tp','gamemode','xp','item','loot'] },
  { key: 'cat_entity', items: ['attribute','ride','spectate','spreadplayers','team','teammsg','trigger'] },
  { key: 'cat_world', items: ['time','weather','difficulty','gamerule','setworldspawn','spawnpoint','locate','locatebiome','seed','worldborder','forceload','defaultgamemode','publish','setidletimeout'] },
  { key: 'cat_block', items: ['setblock','fill','clone','fillbiome','place'] },
  { key: 'cat_logic', items: ['execute','scoreboard','tag','data','datapack','function','schedule','return','bossbar','advancement','recipe','debug','jfr'] },
  { key: 'cat_chat', items: ['say','me','msg','tellraw','title','particle','playsound','stopsound','help','list'] },
  { key: 'cat_server', items: ['ban','ban-ip','banlist','deop','op','kick','whitelist','save-all','save-off','save-on','reload','stop'] },
];

const COMMANDS = {};

/* ===== 常用 ===== */

COMMANDS.give = {
  zh: '给予物品', en: 'Give Item', usage: 'give <目标> <物品> [数量] [NBT]',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'item', t:'item', zh:'物品', en:'Item' },
    { k:'count', t:'number', zh:'数量', en:'Count', def:'1', min:1, max:6400, opt:true },
    { k:'nbt', t:'nbt_give', zh:'NBT 数据（可选）', en:'NBT (optional)', opt:true },
  ],
  build(v){
    let s = 'give ' + v.targets + ' ' + v.item;
    if (v.count && v.count !== '1') s += ' ' + v.count;
    const nbt = buildGiveNbt(v);
    if (nbt) s += ' ' + nbt;
    return s;
  }
};

/* give 的 NBT 组装（由可视化编辑器提供 state.nbt_data） */
function buildGiveNbt(v) {
  const d = v.nbt_data;
  if (!d) return '';
  const parts = [];
  const esc = s => String(s).replace(/"/g, '\\"');
  if (d.enchants && d.enchants.length) {
    const list = d.enchants.filter(e => e.id).map(e => '{id:"' + e.id + '",lvl:' + (parseInt(e.lvl) || 1) + 's}');
    parts.push('Enchantments:[' + list.join(',') + ']');
  }
  const display = [];
  if (d.name) {
    display.push("Name:'{\"text\":\"" + esc(d.name) + '\"}\'');
  }
  if (d.lore && d.lore.trim()) {
    const lines = d.lore.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length) {
      display.push("Lore:[" + lines.map(l => "'{\"text\":\"" + esc(l) + '\"}\'').join(',') + ']');
    }
  }
  if (display.length) parts.push('display:{' + display.join(',') + '}');
  if (d.unbreakable) parts.push('Unbreakable:1b');
  if (d.hideflags) parts.push('HideFlags:63b');
  if (d.custom && d.custom.trim()) {
    const c = d.custom.trim().replace(/^\{/, '').replace(/\}$/, '');
    if (c) parts.push(c);
  }
  return parts.length ? '{' + parts.join(',') + '}' : '';
}

COMMANDS.summon = {
  zh: '生成实体', en: 'Summon Entity', usage: 'summon <实体> [坐标] [NBT]',
  params: [
    { k:'entity', t:'entity', zh:'实体', en:'Entity' },
    { k:'pos', t:'pos', zh:'坐标（可选）', en:'Position (optional)', opt:true, def:'~ ~ ~' },
    { k:'nbt', t:'text', zh:'NBT 数据（可选）', en:'NBT (optional)', opt:true, ph:'{CustomName:\'{"text":"BOSS"}\',NoAI:true}', h:'常用：NoAI 关闭AI、Silent 静音、CustomName 自定义名称、Invulnerable 无敌、Attributes 属性' },
  ],
  build(v){
    let s = 'summon ' + v.entity;
    if (v.pos) s += ' ' + v.pos;
    if (v.nbt) s += ' ' + v.nbt;
    return s;
  }
};

COMMANDS.effect = {
  zh: '药水效果', en: 'Effect', usage: 'effect give|clear <目标> [效果] [秒数] [等级] [隐藏粒子]',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'give', opts:[['give','给予','Give'],['clear','清除','Clear']] },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'effect', t:'select', zh:'效果', en:'Effect', def:'minecraft:speed', opts:[
      ['minecraft:speed','速度','Speed'],['minecraft:slowness','缓慢','Slowness'],['minecraft:haste','急迫','Haste'],
      ['minecraft:mining_fatigue','挖掘疲劳','Mining Fatigue'],['minecraft:strength','力量','Strength'],
      ['minecraft:instant_health','瞬间治疗','Instant Health'],['minecraft:instant_damage','瞬间伤害','Instant Damage'],
      ['minecraft:jump_boost','跳跃提升','Jump Boost'],['minecraft:nausea','反胃','Nausea'],['minecraft:regeneration','生命恢复','Regeneration'],
      ['minecraft:resistance','抗性提升','Resistance'],['minecraft:fire_resistance','抗火','Fire Resistance'],
      ['minecraft:water_breathing','水下呼吸','Water Breathing'],['minecraft:invisibility','隐身','Invisibility'],
      ['minecraft:blindness','失明','Blindness'],['minecraft:night_vision','夜视','Night Vision'],
      ['minecraft:hunger','饥饿','Hunger'],['minecraft:weakness','虚弱','Weakness'],['minecraft:poison','中毒','Poison'],
      ['minecraft:wither','凋零','Wither'],['minecraft:health_boost','生命提升','Health Boost'],
      ['minecraft:absorption','伤害吸收','Absorption'],['minecraft:saturation','饱和','Saturation'],
      ['minecraft:glowing','发光','Glowing'],['minecraft:levitation','漂浮','Levitation'],['minecraft:luck','幸运','Luck'],
      ['minecraft:unluck','霉运','Unluck'],['minecraft:slow_falling','缓降','Slow Falling'],
      ['minecraft:conduit_power','潮涌能量','Conduit Power'],['minecraft:dolphins_grace','海豚的恩惠','Dolphins Grace'],
      ['minecraft:bad_omen','不祥之兆','Bad Omen'],['minecraft:hero_of_the_village','村庄英雄','Hero of the Village'],
      ['minecraft:darkness','黑暗','Darkness'] ] },
    { k:'seconds', t:'number', zh:'秒数', en:'Seconds', def:'30', min:1, opt:true },
    { k:'level', t:'number', zh:'等级（0=1级）', en:'Level (0 = I)', def:'0', min:0, opt:true },
    { k:'hide', t:'checkbox', zh:'隐藏粒子', en:'Hide Particles', def:false, opt:true },
  ],
  build(v){
    if (v.action === 'clear') {
      let s = 'effect clear ' + v.targets;
      if (v.effect) s += ' ' + v.effect;
      return s;
    }
    let s = 'effect give ' + v.targets + ' ' + v.effect;
    if (v.seconds) s += ' ' + v.seconds;
    if (v.level !== undefined && v.level !== '' && Number(v.level) > 0) s += ' ' + v.level;
    if (v.hide) s += ' true';
    return s;
  }
};

COMMANDS.enchant = {
  zh: '附魔', en: 'Enchant', usage: 'enchant <目标> <附魔>（1.20.1 无等级参数，用 give 附魔书代替）',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'enchant', t:'select', zh:'附魔', en:'Enchantment', def:'minecraft:sharpness', opts: ENCHANTS.map(e => ['minecraft:' + e[0], e[1], e[2]]) },
  ],
  build(v){ return 'enchant ' + v.targets + ' ' + v.enchant; }
};

COMMANDS.clear = {
  zh: '清除物品', en: 'Clear Items', usage: 'clear <目标> [物品] [数量]',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'item', t:'item', zh:'物品（可选）', en:'Item (optional)', opt:true },
    { k:'count', t:'number', zh:'数量（可选）', en:'Count (optional)', opt:true, min:1 },
  ],
  build(v){
    let s = 'clear ' + v.targets;
    if (v.item) s += ' ' + v.item;
    if (v.count) s += ' ' + v.count;
    return s;
  }
};

COMMANDS.kill = {
  zh: '清除实体/死亡', en: 'Kill', usage: 'kill <目标>',
  params: [ { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@e' } ],
  build(v){ return 'kill ' + v.targets; }
};

COMMANDS.tp = {
  zh: '传送', en: 'Teleport', usage: 'tp <目标> <坐标> | tp <目标> <目的地>',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'mode', t:'select', zh:'方式', en:'Mode', def:'pos', opts:[['pos','到坐标','To Position'],['dest','到玩家/实体','To Entity']] },
    { k:'pos', t:'pos', zh:'坐标', en:'Position', def:'~ ~ ~', showIf:v=>v.mode==='pos' },
    { k:'dest', t:'target', zh:'目的地实体', en:'Destination Entity', def:'@p', showIf:v=>v.mode==='dest' },
  ],
  build(v){
    return 'tp ' + v.targets + ' ' + (v.mode === 'pos' ? v.pos : v.dest);
  }
};

COMMANDS.gamemode = {
  zh: '游戏模式', en: 'Game Mode', usage: 'gamemode <模式> [目标]',
  params: [
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'creative', opts: GAMEMODES.map(m => m) },
    { k:'targets', t:'target', zh:'目标（可选）', en:'Targets (optional)', def:'@p', opt:true },
  ],
  build(v){
    let s = 'gamemode ' + v.mode;
    if (v.targets) s += ' ' + v.targets;
    return s;
  }
};

COMMANDS.xp = {
  zh: '经验', en: 'Experience', usage: 'xp add|set <目标> <数量> [points|levels]',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'add', opts:[['add','增加','Add'],['set','设置','Set']] },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'amount', t:'number', zh:'数量', en:'Amount', def:'10', min:0 },
    { k:'unit', t:'select', zh:'单位', en:'Unit', def:'points', opts:[['points','经验值','Points'],['levels','等级','Levels']] },
  ],
  build(v){ return 'xp ' + v.action + ' ' + v.targets + ' ' + v.amount + ' ' + v.unit; }
};

COMMANDS.item = {
  zh: '修改物品栏', en: 'Item', usage: 'item replace|modify <目标> <槽位> <物品>',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'replace', opts:[['replace','替换','Replace'],['modify','修改','Modify']] },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'slot', t:'text', zh:'槽位', en:'Slot', def:'weapon.mainhand', h:'常用：weapon.mainhand 主手 / weapon.offhand 副手 / armor.head 头盔 / inventory.0 背包第1格', ph:'weapon.mainhand' },
    { k:'item', t:'item', zh:'物品', en:'Item' },
  ],
  build(v){ return 'item ' + v.action + ' ' + v.targets + ' ' + v.slot + ' ' + v.item; }
};

COMMANDS.loot = {
  zh: '战利品', en: 'Loot', usage: 'loot give|insert|spawn|replace <目标> <来源>',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'give', opts:[['give','给予','Give'],['insert','放入箱子','Insert'],['spawn','生成实体','Spawn'],['replace','替换物品栏','Replace']] },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'source', t:'select', zh:'来源', en:'Source', def:'minecraft:chests/simple_dungeon', opts:[
      ['minecraft:chests/simple_dungeon','地牢箱子','Simple Dungeon'],['minecraft:chests/abandoned_mineshaft','废弃矿井','Abandoned Mineshaft'],
      ['minecraft:chests/village_plains_house','村庄房子','Village House'],['minecraft:chests/stronghold_corridor','要塞走廊','Stronghold Corridor'],
      ['minecraft:chests/nether_bridge','下界要塞','Nether Bridge'],['minecraft:chests/end_city_treasure','末地城宝藏','End City Treasure'],
      ['minecraft:chests/ancient_city','远古城市','Ancient City'],['minecraft:chests/buried_treasure','埋藏的宝藏','Buried Treasure'],
      ['minecraft:chests/underwater_ruin_big','海底废墟大','Underwater Ruin Big'],['minecraft:chests/desert_pyramid','沙漠神殿','Desert Pyramid'],
      ['minecraft:chests/jungle_temple','丛林神庙','Jungle Temple'],['minecraft:chests/woodland_mansion','林地府邸','Woodland Mansion'],
      ['minecraft:chests/shipwreck_treasure','沉船宝藏','Shipwreck Treasure'],['minecraft:chests/igloo_chest','雪屋箱子','Igloo Chest'],
      ['minecraft:chests/pillager_outpost','掠夺者前哨站','Pillager Outpost'],['minecraft:chests/trial_chambers','试炼密室','Trial Chambers'],
      ['minecraft:gameplay/fishing','钓鱼','Fishing'],['minecraft:gameplay/hero_of_the_village','村庄英雄奖励','Hero of the Village'],
      ['minecraft:entities/zombie','僵尸掉落','Zombie Loot'],['minecraft:entities/creeper','苦力怕掉落','Creeper Loot'],
      ['minecraft:entities/ender_dragon','末影龙掉落','Ender Dragon Loot'],['minecraft:entities/wither','凋灵掉落','Wither Loot'],
      ['minecraft:entities/warden','循声守卫掉落','Warden Loot'],['minecraft:entities/elder_guardian','远古守卫者掉落','Elder Guardian Loot'],
      ['minecraft:entities/allay','悦灵掉落','Allay Loot'],['minecraft:entities/sniffer','嗅探兽掉落','Sniffer Loot'],
      ['minecraft:entities/trial_spawner','试炼刷怪笼掉落','Trial Spawner Loot'] ] },
  ],
  build(v){ return 'loot ' + v.action + ' ' + v.targets + ' loot ' + v.source; }
};

/* ===== 世界与环境 ===== */

COMMANDS.time = {
  zh: '时间', en: 'Time', usage: 'time set|add|query <时间>',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'set', opts:[['set','设置','Set'],['add','增加','Add'],['query','查询','Query']] },
    { k:'time', t:'select', zh:'时间', en:'Time', def:'day', opts: TIME_KEYS.map(x => x) },
    { k:'custom', t:'number', zh:'自定义刻（可选）', en:'Custom Ticks (optional)', opt:true, min:0, h:'0~23999，如 6000 = 正午' },
  ],
  build(v){
    if (v.action === 'query') return 'time query daytime';
    return 'time ' + v.action + ' ' + (v.custom !== undefined && v.custom !== '' ? v.custom : v.time);
  }
};

COMMANDS.weather = {
  zh: '天气', en: 'Weather', usage: 'weather <天气> [持续时间]',
  params: [
    { k:'weather', t:'select', zh:'天气', en:'Weather', def:'clear', opts: WEATHERS.map(x => x) },
    { k:'duration', t:'number', zh:'持续时间（秒，可选）', en:'Duration (s, optional)', opt:true, min:1 },
  ],
  build(v){
    let s = 'weather ' + v.weather;
    if (v.duration) s += ' ' + v.duration;
    return s;
  }
};

COMMANDS.difficulty = {
  zh: '难度', en: 'Difficulty', usage: 'difficulty <难度>',
  params: [ { k:'diff', t:'select', zh:'难度', en:'Difficulty', def:'normal', opts: DIFFICULTIES.map(x => x) } ],
  build(v){ return 'difficulty ' + v.diff; }
};

COMMANDS.gamerule = {
  zh: '游戏规则', en: 'Game Rule', usage: 'gamerule <规则> [值]',
  params: [
    { k:'rule', t:'select', zh:'规则', en:'Rule', def:'keepInventory', opts: RULES.map(r => [r[0], r[1], r[2]]) },
    { k:'val', t:'text', zh:'值', en:'Value', def:'true', h:'布尔规则填 true/false；数值规则填数字（如 randomTickSpeed 3）' },
  ],
  build(v){ return 'gamerule ' + v.rule + ' ' + v.val; }
};

COMMANDS.setworldspawn = {
  zh: '设置世界出生点', en: 'Set World Spawn', usage: 'setworldspawn [坐标] [角度]',
  params: [
    { k:'pos', t:'pos', zh:'坐标（可选）', en:'Position (optional)', opt:true, def:'~ ~ ~' },
    { k:'angle', t:'number', zh:'角度（可选）', en:'Angle (optional)', opt:true, min:0, h:'面向的角度，0 = 正南' },
  ],
  build(v){
    let s = 'setworldspawn';
    if (v.pos) s += ' ' + v.pos;
    if (v.angle !== undefined && v.angle !== '') s += ' ' + v.angle;
    return s;
  }
};

COMMANDS.spawnpoint = {
  zh: '设置玩家出生点', en: 'Spawn Point', usage: 'spawnpoint [目标] [坐标] [角度]',
  params: [
    { k:'targets', t:'target', zh:'目标（可选）', en:'Targets (optional)', def:'@p', opt:true },
    { k:'pos', t:'pos', zh:'坐标（可选）', en:'Position (optional)', opt:true, def:'~ ~ ~' },
    { k:'angle', t:'number', zh:'角度（可选）', en:'Angle (optional)', opt:true, min:0 },
  ],
  build(v){
    let s = 'spawnpoint';
    if (v.targets) s += ' ' + v.targets;
    if (v.pos) s += ' ' + v.pos;
    if (v.angle !== undefined && v.angle !== '') s += ' ' + v.angle;
    return s;
  }
};

COMMANDS.locate = {
  zh: '定位结构', en: 'Locate Structure', usage: 'locate structure <结构>',
  params: [
    { k:'structure', t:'select', zh:'结构', en:'Structure', def:'minecraft:village_plains', opts:[
      ['minecraft:village_plains','平原村庄','Plains Village'],['minecraft:village_desert','沙漠村庄','Desert Village'],
      ['minecraft:village_savanna','热带草原村庄','Savanna Village'],['minecraft:village_snowy','雪原村庄','Snowy Village'],
      ['minecraft:village_taiga','针叶林村庄','Taiga Village'],['minecraft:pillager_outpost','掠夺者前哨站','Pillager Outpost'],
      ['minecraft:desert_pyramid','沙漠神殿','Desert Pyramid'],['minecraft:jungle_pyramid','丛林神庙','Jungle Pyramid'],
      ['minecraft:swamp_hut','沼泽小屋','Swamp Hut'],['minecraft:igloo','雪屋','Igloo'],
      ['minecraft:ancient_city','远古城市','Ancient City'],['minecraft:stronghold','要塞','Stronghold'],
      ['minecraft:mansion','林地府邸','Woodland Mansion'],['minecraft:monument','海底神殿','Ocean Monument'],
      ['minecraft:shipwreck','沉船','Shipwreck'],['minecraft:ocean_ruin_cold','冷水海底废墟','Ocean Ruin Cold'],
      ['minecraft:ocean_ruin_warm','温水海底废墟','Ocean Ruin Warm'],['minecraft:ruined_portal','废弃传送门','Ruined Portal'],
      ['minecraft:trail_ruins','古迹废墟','Trail Ruins'],['minecraft:buried_treasure','埋藏的宝藏','Buried Treasure'],
      ['minecraft:endcity','末地城','End City'],['minecraft:nether_fortress','下界要塞','Nether Fortress'],
      ['minecraft:bastion_remnant','堡垒遗迹','Bastion Remnant'],['minecraft:fortress','下界要塞（旧）','Nether Fortress (legacy)'],
      ['minecraft:woodland_mansion','林地府邸','Woodland Mansion'],['minecraft:monument','海底神殿','Monument'],
      ['minecraft:ancient_city','远古城市','Ancient City'],['minecraft:trial_chambers','试炼密室','Trial Chambers'],
      ['minecraft:mineshaft','废弃矿井','Mineshaft'] ] },
  ],
  build(v){ return 'locate structure ' + v.structure; }
};

COMMANDS.locatebiome = {
  zh: '定位生物群系', en: 'Locate Biome', usage: 'locate biome <生物群系>',
  params: [ { k:'biome', t:'select', zh:'生物群系', en:'Biome', def:'minecraft:plains', opts: BIOMES.map(b => ['minecraft:' + b[0], b[1], b[2]]) } ],
  build(v){ return 'locate biome ' + v.biome; }
};

COMMANDS.seed = {
  zh: '查看种子', en: 'Seed', usage: 'seed',
  params: [],
  build(){ return 'seed'; }
};

COMMANDS.worldborder = {
  zh: '世界边界', en: 'World Border', usage: 'worldborder add|set|center|damage|get|warning ...',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'set', opts:[['add','扩展/收缩','Add'],['set','设置直径','Set'],['center','设置中心','Center'],['get','查询直径','Get'],['warning','警告距离','Warning']] },
    { k:'size', t:'number', zh:'直径（格）', en:'Diameter (blocks)', def:'1000', min:1, showIf:v=>v.action==='set'||v.action==='add' },
    { k:'time', t:'number', zh:'变化用时（秒，可选）', en:'Change time (s, optional)', opt:true, min:1, showIf:v=>v.action==='set'||v.action==='add' },
    { k:'center', t:'pos', zh:'中心坐标', en:'Center', def:'~ ~', showIf:v=>v.action==='center' },
    { k:'dist', t:'number', zh:'警告距离（格）', en:'Warning distance', def:'5', min:0, showIf:v=>v.action==='warning' },
  ],
  build(v){
    if (v.action === 'get') return 'worldborder get';
    if (v.action === 'set' || v.action === 'add') {
      let s = 'worldborder ' + v.action + ' ' + v.size;
      if (v.time) s += ' ' + v.time;
      return s;
    }
    if (v.action === 'center') return 'worldborder center ' + v.center;
    if (v.action === 'warning') return 'worldborder warning distance ' + v.dist;
    return 'worldborder';
  }
};

COMMANDS.forceload = {
  zh: '强制加载区块', en: 'Force Load', usage: 'forceload add|remove|query [坐标]',
  params: [
    { k:'action', t:'select', zh:'操作', en:'Action', def:'add', opts:[['add','添加','Add'],['remove','移除','Remove'],['removeall','全部移除','Remove All'],['query','查询','Query']] },
    { k:'pos', t:'pos', zh:'坐标', en:'Position', def:'~ ~', showIf:v=>v.action==='add'||v.action==='remove' },
  ],
  build(v){
    if (v.action === 'query') return 'forceload query';
    if (v.action === 'removeall') return 'forceload remove all';
    return 'forceload ' + v.action + ' ' + v.pos;
  }
};

COMMANDS.defaultgamemode = {
  zh: '默认游戏模式', en: 'Default Game Mode', usage: 'defaultgamemode <模式>',
  params: [ { k:'mode', t:'select', zh:'模式', en:'Mode', def:'survival', opts: GAMEMODES.map(m => m) } ],
  build(v){ return 'defaultgamemode ' + v.mode; }
};

COMMANDS.publish = {
  zh: '开放局域网', en: 'Open to LAN', usage: 'publish [端口]',
  params: [ { k:'port', t:'number', zh:'端口（可选）', en:'Port (optional)', opt:true, min:1, max:65535 } ],
  build(v){ return 'publish' + (v.port ? ' ' + v.port : ''); }
};

COMMANDS.setidletimeout = {
  zh: '踢出挂机玩家', en: 'Set Idle Timeout', usage: 'setidletimeout <分钟>',
  params: [ { k:'mins', t:'number', zh:'分钟', en:'Minutes', def:'5', min:0 } ],
  build(v){ return 'setidletimeout ' + v.mins; }
};

/* ===== 方块与结构 ===== */

COMMANDS.setblock = {
  zh: '放置方块', en: 'Set Block', usage: 'setblock <坐标> <方块> [模式] [NBT]',
  params: [
    { k:'pos', t:'pos', zh:'坐标', en:'Position', def:'~ ~ ~' },
    { k:'block', t:'item', zh:'方块', en:'Block' },
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'replace', opts:[['replace','替换','Replace'],['destroy','破坏掉落','Destroy'],['keep','保留原有','Keep']] },
    { k:'nbt', t:'text', zh:'NBT（可选）', en:'NBT (optional)', opt:true, ph:'{Command:"say hi"}' },
  ],
  build(v){
    let s = 'setblock ' + v.pos + ' ' + v.block;
    if (v.mode !== 'replace') s += ' ' + v.mode;
    if (v.nbt) s += ' ' + v.nbt;
    return s;
  }
};

COMMANDS.fill = {
  zh: '填充区域', en: 'Fill', usage: 'fill <起点> <终点> <方块> [模式]',
  params: [
    { k:'from', t:'pos', zh:'起点', en:'From', def:'~ ~ ~' },
    { k:'to', t:'pos', zh:'终点', en:'To', def:'~ ~ ~' },
    { k:'block', t:'item', zh:'方块', en:'Block' },
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'replace', opts:[['replace','替换','Replace'],['destroy','破坏掉落','Destroy'],['hollow','空心','Hollow'],['outline','边框','Outline'],['keep','保留原有','Keep']] },
  ],
  build(v){ return 'fill ' + v.from + ' ' + v.to + ' ' + v.block + (v.mode !== 'replace' ? ' ' + v.mode : ''); }
};

COMMANDS.clone = {
  zh: '克隆区域', en: 'Clone', usage: 'clone <起点> <终点> <目的地> [模式]',
  params: [
    { k:'from', t:'pos', zh:'起点', en:'From', def:'~ ~ ~' },
    { k:'to', t:'pos', zh:'终点', en:'To', def:'~ ~ ~' },
    { k:'dest', t:'pos', zh:'目的地', en:'Destination', def:'~ ~ ~' },
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'replace', opts:[['replace','替换','Replace'],['masked','仅非空气','Masked'],['force','强制','Force'],['move','移动','Move'],['normal','普通','Normal']] },
  ],
  build(v){ return 'clone ' + v.from + ' ' + v.to + ' ' + v.dest + (v.mode !== 'replace' ? ' ' + v.mode : ''); }
};

COMMANDS.fillbiome = {
  zh: '填充生物群系', en: 'Fill Biome', usage: 'fillbiome <起点> <终点> <生物群系>',
  params: [
    { k:'from', t:'pos', zh:'起点', en:'From', def:'~ ~ ~' },
    { k:'to', t:'pos', zh:'终点', en:'To', def:'~ ~ ~' },
    { k:'biome', t:'select', zh:'生物群系', en:'Biome', def:'minecraft:plains', opts: BIOMES.map(b => ['minecraft:' + b[0], b[1], b[2]]) },
  ],
  build(v){ return 'fillbiome ' + v.from + ' ' + v.to + ' ' + v.biome; }
};

COMMANDS.place = {
  zh: '放置结构/特性', en: 'Place', usage: 'place template|feature|jigsaw <id> [坐标]',
  params: [
    { k:'kind', t:'select', zh:'类型', en:'Kind', def:'template', opts:[['template','结构模板','Template'],['feature','地形特征','Feature'],['jigsaw','拼图结构','Jigsaw']] },
    { k:'id', t:'text', zh:'ID', en:'ID', ph:'minecraft:village_plains', h:'结构：minecraft:village_plains；特征：minecraft:oak_tree' },
    { k:'pos', t:'pos', zh:'坐标（可选）', en:'Position (optional)', opt:true, def:'~ ~ ~' },
  ],
  build(v){
    let s = 'place ' + v.kind + ' ' + v.id;
    if (v.pos) s += ' ' + v.pos;
    return s;
  }
};

/* ===== 显示与聊天 ===== */

COMMANDS.say = {
  zh: '广播消息', en: 'Say', usage: 'say <消息>',
  params: [ { k:'msg', t:'text', zh:'消息', en:'Message' } ],
  build(v){ return 'say ' + v.msg; }
};

COMMANDS.me = {
  zh: '动作消息', en: 'Me', usage: 'me <动作>',
  params: [ { k:'msg', t:'text', zh:'动作', en:'Action' } ],
  build(v){ return 'me ' + v.msg; }
};

COMMANDS.msg = {
  zh: '私聊', en: 'Message (msg)', usage: 'msg <目标> <消息>',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'msg', t:'text', zh:'消息', en:'Message' },
  ],
  build(v){ return 'msg ' + v.targets + ' ' + v.msg; }
};

COMMANDS.tellraw = {
  zh: 'JSON 文本', en: 'Tellraw', usage: 'tellraw <目标> <JSON 文本组件>',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@a' },
    { k:'text', t:'text', zh:'文本内容', en:'Text', def:'你好！' },
    { k:'color', t:'select', zh:'颜色', en:'Color', def:'white', opts:[['white','白色','White'],['black','黑色','Black'],['gray','灰色','Gray'],['dark_gray','深灰','Dark Gray'],['dark_red','深红','Dark Red'],['red','红色','Red'],['gold','金色','Gold'],['yellow','黄色','Yellow'],['dark_green','深绿','Dark Green'],['green','绿色','Green'],['aqua','青色','Aqua'],['dark_aqua','深青','Dark Aqua'],['dark_blue','深蓝','Dark Blue'],['blue','蓝色','Blue'],['light_purple','亮紫','Light Purple'],['dark_purple','深紫','Dark Purple']] },
    { k:'bold', t:'checkbox', zh:'加粗', en:'Bold', def:false },
    { k:'italic', t:'checkbox', zh:'斜体', en:'Italic', def:false },
    { k:'underlined', t:'checkbox', zh:'下划线', en:'Underlined', def:false },
    { k:'click', t:'select', zh:'点击事件', en:'Click Event', def:'none', opts:[['none','无','None'],['run_command','执行指令','Run Command'],['open_url','打开链接','Open URL'],['suggest_command','填入指令','Suggest Command'],['copy_to_clipboard','复制到剪贴板','Copy to Clipboard']] },
    { k:'click_val', t:'text', zh:'点击事件值', en:'Click Event Value', opt:true, showIf:v=>v.click!=='none', ph:'/say hi 或 https://…' },
    { k:'hover', t:'select', zh:'悬停事件', en:'Hover Event', def:'none', opts:[['none','无','None'],['show_text','显示文本','Show Text'],['show_item','显示物品','Show Item'],['show_entity','显示实体','Show Entity']] },
    { k:'hover_val', t:'text', zh:'悬停事件值', en:'Hover Event Value', opt:true, showIf:v=>v.hover!=='none' },
    { k:'extra', t:'checkbox', zh:'追加内容（JSON，可选）', en:'Append JSON (optional)', def:false },
    { k:'extra_val', t:'text', zh:'追加 JSON', en:'Append JSON', opt:true, showIf:v=>v.extra, ph:'[{"text":" 第二段","color":"gold"}]' },
  ],
  build(v){
    let obj = { text: v.text };
    if (v.color !== 'white') obj.color = v.color;
    if (v.bold) obj.bold = true;
    if (v.italic) obj.italic = true;
    if (v.underlined) obj.underlined = true;
    if (v.click !== 'none' && v.click_val) obj.clickEvent = { action: v.click, value: v.click_val };
    if (v.hover !== 'none' && v.hover_val) obj.hoverEvent = { action: v.hover, contents: v.hover_val };
    if (v.extra && v.extra_val) {
      try { obj.extra = JSON.parse(v.extra_val); } catch(e) {}
    }
    return 'tellraw ' + v.targets + ' ' + JSON.stringify(obj);
  }
};

COMMANDS.title = {
  zh: '标题', en: 'Title', usage: 'title <目标> title|subtitle|actionbar <文本>',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@a' },
    { k:'type', t:'select', zh:'类型', en:'Type', def:'title', opts:[['title','主标题','Title'],['subtitle','副标题','Subtitle'],['actionbar','物品栏上方','Action Bar'],['times','显示时长','Times'],['clear','清除','Clear'],['reset','重置','Reset']] },
    { k:'text', t:'text', zh:'文本（可用 JSON）', en:'Text (JSON allowed)', def:'Hello!', showIf:v=>v.type==='title'||v.type==='subtitle'||v.type==='actionbar', ph:'{"text":"你好","color":"gold"}' },
    { k:'fadein', t:'number', zh:'淡入刻（1/20秒）', en:'Fade-in ticks', def:'10', min:0, showIf:v=>v.type==='times' },
    { k:'stay', t:'number', zh:'停留刻', en:'Stay ticks', def:'70', min:0, showIf:v=>v.type==='times' },
    { k:'fadeout', t:'number', zh:'淡出刻', en:'Fade-out ticks', def:'20', min:0, showIf:v=>v.type==='times' },
  ],
  build(v){
    if (v.type === 'times') return 'title ' + v.targets + ' times ' + v.fadein + ' ' + v.stay + ' ' + v.fadeout;
    if (v.type === 'clear' || v.type === 'reset') return 'title ' + v.targets + ' ' + v.type;
    return 'title ' + v.targets + ' ' + v.type + ' ' + v.text;
  }
};

COMMANDS.particle = {
  zh: '粒子', en: 'Particle', usage: 'particle <粒子> [坐标] [扩散] [速度] [数量] [force]',
  params: [
    { k:'name', t:'select', zh:'粒子', en:'Particle', def:'minecraft:flame', opts: PARTICLES.map(p => ['minecraft:' + p[0], p[1], p[2]]) },
    { k:'pos', t:'pos', zh:'坐标', en:'Position', def:'~ ~ ~' },
    { k:'delta', t:'pos', zh:'扩散范围', en:'Spread (dx dy dz)', def:'0 0 0', opt:true },
    { k:'speed', t:'number', zh:'速度', en:'Speed', def:'0', min:0, opt:true },
    { k:'count', t:'number', zh:'数量', en:'Count', def:'1', min:0, opt:true },
    { k:'force', t:'checkbox', zh:'强制显示（无视距离）', en:'Force', def:false, opt:true },
  ],
  build(v){
    let s = 'particle ' + v.name + ' ' + v.pos;
    if (v.delta) s += ' ' + v.delta;
    s += ' ' + (v.speed || 0) + ' ' + (v.count || 1);
    if (v.force) s += ' force';
    return s;
  }
};

COMMANDS.playsound = {
  zh: '播放音效', en: 'Play Sound', usage: 'playsound <音效> <来源> <目标> [坐标] [音量] [音调]',
  params: [
    { k:'sound', t:'select', zh:'音效', en:'Sound', def:'minecraft:entity.player.levelup', opts: SOUNDS.map(s => ['minecraft:' + s[0], s[1], s[2]]) },
    { k:'source', t:'select', zh:'声音来源', en:'Source', def:'master', opts: SOUND_SOURCES.map(x => x) },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@a' },
    { k:'pos', t:'pos', zh:'坐标（可选）', en:'Position (optional)', opt:true, def:'~ ~ ~' },
    { k:'volume', t:'number', zh:'音量', en:'Volume', def:'1', min:0, opt:true },
    { k:'pitch', t:'number', zh:'音调', en:'Pitch', def:'1', min:0, max:2, step:0.1, opt:true },
  ],
  build(v){
    let s = 'playsound ' + v.sound + ' ' + v.source + ' ' + v.targets;
    if (v.pos) s += ' ' + v.pos;
    if (v.volume) s += ' ' + v.volume;
    if (v.pitch) s += ' ' + v.pitch;
    return s;
  }
};

COMMANDS.stopsound = {
  zh: '停止音效', en: 'Stop Sound', usage: 'stopsound <目标> [来源] [音效]',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@a' },
    { k:'source', t:'select', zh:'声音来源（可选）', en:'Source (optional)', def:'*', opt:true, opts:[['*','全部','All'],['master','主音量','Master'],['music','音乐','Music'],['record','唱片','Record'],['weather','天气','Weather'],['block','方块','Block'],['hostile','敌对','Hostile'],['neutral','友好','Neutral'],['player','玩家','Player'],['ambient','环境','Ambient'],['voice','语音','Voice']] },
    { k:'sound', t:'text', zh:'音效 ID（可选）', en:'Sound ID (optional)', opt:true, ph:'minecraft:music_disc.13' },
  ],
  build(v){
    let s = 'stopsound ' + v.targets;
    if (v.source) s += ' ' + v.source;
    if (v.sound) s += ' ' + v.sound;
    return s;
  }
};

COMMANDS.help = {
  zh: '帮助', en: 'Help', usage: 'help [指令]',
  params: [ { k:'cmd', t:'text', zh:'指令名（可选）', en:'Command (optional)', opt:true, ph:'give' } ],
  build(v){ return 'help' + (v.cmd ? ' ' + v.cmd : ''); }
};

COMMANDS.list = {
  zh: '在线列表', en: 'List', usage: 'list [uuids]',
  params: [ { k:'uuids', t:'checkbox', zh:'显示 UUID', en:'Show UUIDs', def:false } ],
  build(v){ return 'list' + (v.uuids ? ' uuids' : ''); }
};

/* ===== 实体与玩家 ===== */

COMMANDS.attribute = {
  zh: '属性', en: 'Attribute', usage: 'attribute <目标> <属性> get|base set|get|modifier add|remove|get',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'attr', t:'select', zh:'属性', en:'Attribute', def:'minecraft:generic.max_health', opts:[
      ['minecraft:generic.max_health','最大生命值','Max Health'],['minecraft:generic.follow_range','追踪范围','Follow Range'],
      ['minecraft:generic.knockback_resistance','击退抗性','Knockback Resistance'],['minecraft:generic.movement_speed','移动速度','Movement Speed'],
      ['minecraft:generic.attack_damage','攻击伤害','Attack Damage'],['minecraft:generic.armor','护甲','Armor'],
      ['minecraft:generic.armor_toughness','护甲韧性','Armor Toughness'],['minecraft:generic.attack_speed','攻击速度','Attack Speed'],
      ['minecraft:generic.luck','幸运','Luck'],['minecraft:generic.flying_speed','飞行速度','Flying Speed'],
      ['minecraft:generic.attack_knockback','攻击击退','Attack Knockback'],['minecraft:generic.max_absorption','伤害吸收上限','Max Absorption'],
      ['minecraft:generic.step_height','步高','Step Height'],['minecraft:generic.scale','体型','Scale'],
      ['minecraft:player.block_break_speed','挖掘速度','Block Break Speed'],['minecraft:player.block_interaction_range','交互范围','Block Interaction Range'],
      ['minecraft:player.entity_interaction_range','实体交互范围','Entity Interaction Range'],['minecraft:zombie.spawn_reinforcements','僵尸增援','Zombie Reinforcements'] ] },
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'get', opts:[['get','查询','Get'],['base','基础值','Base'],['modifier','修改器','Modifier']] },
    { k:'sub', t:'select', zh:'子操作', en:'Sub-op', def:'get', opts:[['get','查询','Get'],['set','设置','Set'],['add','添加','Add'],['remove','移除','Remove']] },
    { k:'val', t:'number', zh:'数值（0-2）', en:'Value (0-2)', def:'1', opt:true, showIf:v=>v.op!=='get' },
    { k:'mod_id', t:'text', zh:'修改器 UUID（可选）', en:'Modifier UUID (optional)', opt:true, ph:'add-e5b2-4f3b-9c1a-8d7e6f5a4b3c', showIf:v=>v.op==='modifier' },
    { k:'mod_op', t:'select', zh:'修改器运算', en:'Modifier Op', def:'addition', opts:[['addition','加法','Addition'],['multiply_base','乘基础值','Multiply Base'],['multiply_total','乘总值','Multiply Total']], showIf:v=>v.op==='modifier' },
  ],
  build(v){
    if (v.op === 'get') return 'attribute ' + v.targets + ' ' + v.attr + ' get';
    if (v.op === 'base') {
      if (v.sub === 'get') return 'attribute ' + v.targets + ' ' + v.attr + ' base get';
      return 'attribute ' + v.targets + ' ' + v.attr + ' base set ' + v.val;
    }
    if (v.op === 'modifier') {
      if (v.sub === 'get') return 'attribute ' + v.targets + ' ' + v.attr + ' modifier get';
      if (v.sub === 'remove') return 'attribute ' + v.targets + ' ' + v.attr + ' modifier remove ' + v.mod_id;
      return 'attribute ' + v.targets + ' ' + v.attr + ' modifier add ' + v.mod_id + ' ' + v.val + ' ' + v.mod_op;
    }
    return 'attribute ' + v.targets + ' ' + v.attr;
  }
};

COMMANDS.ride = {
  zh: '骑乘', en: 'Ride', usage: 'ride <目标> mount|dismount|summon <实体>',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'mount', opts:[['mount','骑上','Mount'],['dismount','下来','Dismount'],['summon','召唤并骑上','Summon']] },
    { k:'entity', t:'entity', zh:'坐骑实体', en:'Mount Entity', showIf:v=>v.op==='summon' },
  ],
  build(v){
    if (v.op === 'dismount') return 'ride ' + v.targets + ' dismount';
    if (v.op === 'mount') return 'ride ' + v.targets + ' mount';
    return 'ride ' + v.targets + ' summon ' + v.entity;
  }
};

COMMANDS.spectate = {
  zh: '旁观', en: 'Spectate', usage: 'spectate [目标] [玩家]',
  params: [
    { k:'target', t:'target', zh:'旁观目标（可选）', en:'Spectate target (optional)', opt:true, def:'@e' },
    { k:'player', t:'target', zh:'玩家（可选）', en:'Player (optional)', opt:true, def:'@p' },
  ],
  build(v){
    let s = 'spectate';
    if (v.target) s += ' ' + v.target;
    if (v.player) s += ' ' + v.player;
    return s;
  }
};

COMMANDS.spreadplayers = {
  zh: '分散玩家', en: 'Spread Players', usage: 'spreadplayers <x> <z> <最小距离> <最大范围> <是否团队> <目标>',
  params: [
    { k:'cx', t:'number', zh:'中心 X', en:'Center X', def:'0' },
    { k:'cz', t:'number', zh:'中心 Z', en:'Center Z', def:'0' },
    { k:'min', t:'number', zh:'最小距离', en:'Min distance', def:'0', min:0 },
    { k:'max', t:'number', zh:'最大范围', en:'Max range', def:'50', min:1 },
    { k:'teams', t:'checkbox', zh:'按团队聚集', en:'Respect teams', def:false },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@a' },
  ],
  build(v){ return 'spreadplayers ' + v.cx + ' ' + v.cz + ' ' + v.min + ' ' + v.max + ' ' + v.teams + ' ' + v.targets; }
};

COMMANDS.team = {
  zh: '队伍', en: 'Team', usage: 'team add|remove|empty|join|leave|modify|list <队伍>',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'add', opts:[['add','创建','Add'],['remove','删除','Remove'],['empty','清空成员','Empty'],['join','加入','Join'],['leave','离开','Leave'],['modify','修改','Modify'],['list','列表','List']] },
    { k:'team', t:'text', zh:'队伍名', en:'Team name', def:'red', showIf:v=>v.op!=='list' && v.op!=='leave' },
    { k:'member', t:'target', zh:'成员', en:'Member', def:'@p', showIf:v=>v.op==='join' },
    { k:'prop', t:'select', zh:'修改项', en:'Property', def:'displayName', opts:[['displayName','显示名','Display Name'],['color','颜色','Color'],['friendlyFire','友军伤害','Friendly Fire'],['seeFriendlyInvisibles','看见隐身队友','See Friendly Invisibles'],['nametagVisibility','名牌可见','Nametag Visibility'],['deathMessageVisibility','死亡消息','Death Message Visibility'],['collisionRule','碰撞规则','Collision Rule']], showIf:v=>v.op==='modify' },
    { k:'prop_val', t:'text', zh:'修改值', en:'Property value', opt:true, showIf:v=>v.op==='modify' },
  ],
  build(v){
    if (v.op === 'list') return 'team list';
    if (v.op === 'leave') return 'team leave';
    if (v.op === 'join') return 'team join ' + v.team + ' ' + v.member;
    if (v.op === 'modify') return 'team modify ' + v.team + ' ' + v.prop + (v.prop_val ? ' ' + v.prop_val : '');
    return 'team ' + v.op + ' ' + v.team;
  }
};

COMMANDS.teammsg = {
  zh: '队伍消息', en: 'Team Message', usage: 'teammsg <消息>',
  params: [ { k:'msg', t:'text', zh:'消息', en:'Message' } ],
  build(v){ return 'teammsg ' + v.msg; }
};

COMMANDS.trigger = {
  zh: '触发器', en: 'Trigger', usage: 'trigger <目标> [add|set] [值]',
  params: [
    { k:'objective', t:'text', zh:'计分板目标', en:'Objective', ph:'my_trigger', h:'需要先用 scoreboard objectives add <目标> trigger 创建' },
    { k:'op', t:'select', zh:'操作（可选）', en:'Operation (optional)', def:'add', opts:[['add','增加','Add'],['set','设置','Set']] },
    { k:'val', t:'number', zh:'值', en:'Value', def:'1' },
  ],
  build(v){ return 'trigger ' + v.objective + ' ' + v.op + ' ' + v.val; }
};

/* ===== 数据与逻辑 ===== */

COMMANDS.execute = {
  zh: '执行（高级）', en: 'Execute (advanced)', usage: 'execute as|at|positioned|rotated|facing|align|anchor|if|unless ... run <指令>',
  params: [
    { k:'as', t:'target', zh:'as（以…身份）', en:'As (run as)', opt:true, def:'@p', ph:'@p' },
    { k:'at', t:'target', zh:'at（在…位置）', en:'At (run at)', opt:true, def:'@p', ph:'@p' },
    { k:'positioned', t:'pos', zh:'positioned（指定坐标）', en:'Positioned (coords)', opt:true, def:'~ ~ ~' },
    { k:'rotated', t:'text', zh:'rotated（角度）', en:'Rotated (angle)', opt:true, ph:'0 0 或 as @p', h:'格式：<y> <x> 或 as <目标>' },
    { k:'facing', t:'target', zh:'facing（面向实体）', en:'Facing (entity)', opt:true, def:'@p', ph:'entity @e[limit=1] 或 坐标' },
    { k:'align', t:'select', zh:'align（对齐）', en:'Align', opt:true, def:'none', opts:[['none','无','None'],['xyz','整数坐标','XYZ'],['xy','XY 平面','XY'],['xz','XZ 平面','XZ'],['yz','YZ 平面','YZ']] },
    { k:'anchor', t:'select', zh:'anchor（锚点）', en:'Anchor', opt:true, def:'none', opts:[['none','无','None'],['eyes','眼睛位置','Eyes'],['feet','脚部位置','Feet']] },
    { k:'cond', t:'select', zh:'条件', en:'Condition', def:'none', opts:[['none','无','None'],['if','if（满足时）','If'],['unless','unless（不满足时）','Unless']] },
    { k:'cond_type', t:'select', zh:'条件类型', en:'Condition type', def:'entity', opts:[['entity','实体存在','Entity'],['block','方块匹配','Block'],['score','分数比较','Score']], showIf:v=>v.cond!=='none' },
    { k:'cond_val', t:'text', zh:'条件值', en:'Condition value', def:'@p', showIf:v=>v.cond!=='none', ph:'@p 或 ~ ~ ~ minecraft:stone 或 玩家 目标 值' },
    { k:'run', t:'text', zh:'run（要执行的指令）', en:'Run (command)', def:'say hi', ph:'give @p minecraft:diamond' },
  ],
  build(v){
    let parts = ['execute'];
    if (v.as) parts.push('as ' + v.as);
    if (v.at) parts.push('at ' + v.at);
    if (v.positioned) parts.push('positioned ' + v.positioned);
    if (v.rotated) parts.push('rotated ' + v.rotated);
    if (v.facing) parts.push('facing ' + v.facing);
    if (v.align && v.align !== 'none') parts.push('align ' + v.align);
    if (v.anchor && v.anchor !== 'none') parts.push('anchored ' + v.anchor);
    if (v.cond !== 'none' && v.cond_val) parts.push(v.cond + ' ' + v.cond_type + ' ' + v.cond_val);
    parts.push('run ' + v.run);
    return parts.join(' ');
  }
};

COMMANDS.scoreboard = {
  zh: '计分板', en: 'Scoreboard', usage: 'scoreboard objectives|players ...',
  params: [
    { k:'scope', t:'select', zh:'范围', en:'Scope', def:'objectives', opts:[['objectives','目标','Objectives'],['players','玩家分数','Players']] },
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'add', opts:[
      ['add','添加目标','Add Objective'],['remove','移除目标','Remove Objective'],['list','列出目标','List Objectives'],
      ['set','设置分数','Set Score'],['add','增加分数','Add Score'],['remove','减少分数','Remove Score'],['reset','重置分数','Reset Score'] ] },
    { k:'objective', t:'text', zh:'目标名', en:'Objective name', def:'score', showIf:v=>v.scope==='objectives' || (v.scope==='players' && v.op!=='reset') },
    { k:'criteria', t:'select', zh:'准则', en:'Criteria', def:'dummy', showIf:v=>v.scope==='objectives' && v.op==='add', opts:[
      ['dummy','自定义（指令操作）','Dummy'],['deathCount','死亡次数','Death Count'],['playerKillCount','击杀玩家数','Player Kills'],
      ['totalKillCount','总击杀数','Total Kills'],['health','生命值','Health'],['xp','经验值','XP'],['level','等级','Level'],
      ['food','饥饿值','Food'],['armor','护甲值','Armor'],['air','氧气','Air'],['trigger','触发器','Trigger'] ] },
    { k:'player', t:'target', zh:'玩家', en:'Player', def:'@p', showIf:v=>v.scope==='players' },
    { k:'val', t:'number', zh:'数值', en:'Value', def:'1', showIf:v=>v.scope==='players' && (v.op==='set'||v.op==='add'||v.op==='remove') },
  ],
  build(v){
    if (v.scope === 'objectives') {
      if (v.op === 'add') return 'scoreboard objectives add ' + v.objective + ' ' + v.criteria;
      if (v.op === 'remove') return 'scoreboard objectives remove ' + v.objective;
      return 'scoreboard objectives list';
    }
    if (v.op === 'reset') return 'scoreboard players reset ' + v.player;
    return 'scoreboard players ' + v.op + ' ' + v.player + ' ' + v.objective + ' ' + v.val;
  }
};

COMMANDS.tag = {
  zh: '标签', en: 'Tag', usage: 'tag <目标> add|remove|list <标签>',
  params: [
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'add', opts:[['add','添加','Add'],['remove','移除','Remove'],['list','列出','List']] },
    { k:'tag', t:'text', zh:'标签名', en:'Tag name', def:'my_tag', showIf:v=>v.op!=='list' },
  ],
  build(v){
    if (v.op === 'list') return 'tag ' + v.targets + ' list';
    return 'tag ' + v.targets + ' ' + v.op + ' ' + v.tag;
  }
};

COMMANDS.data = {
  zh: 'NBT 数据', en: 'Data', usage: 'data get|merge|remove <目标> [路径]',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'get', opts:[['get','查询','Get'],['merge','合并','Merge'],['remove','移除','Remove']] },
    { k:'target_type', t:'select', zh:'目标类型', en:'Target type', def:'entity', opts:[['entity','实体','Entity'],['block','方块','Block'],['storage','存储','Storage']] },
    { k:'target', t:'text', zh:'目标', en:'Target', def:'@p', ph:'@p 或 ~ ~ ~ 或 存储名' },
    { k:'path', t:'text', zh:'NBT 路径（可选）', en:'NBT path (optional)', opt:true, ph:'Inventory[0].id' },
    { k:'nbt', t:'text', zh:'NBT 数据', en:'NBT data', opt:true, showIf:v=>v.op==='merge', ph:'{CustomName:"hi"}' },
  ],
  build(v){
    let s = 'data ' + v.op + ' ' + v.target_type + ' ' + v.target;
    if (v.op === 'merge') s += ' ' + (v.nbt || '{}');
    else if (v.path) s += ' ' + v.path;
    return s;
  }
};

COMMANDS.datapack = {
  zh: '数据包', en: 'Datapack', usage: 'datapack list|enable|disable <数据包>',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'list', opts:[['list','列表','List'],['enable','启用','Enable'],['disable','禁用','Disable']] },
    { k:'pack', t:'text', zh:'数据包名', en:'Pack name', ph:'file/my_pack', showIf:v=>v.op!=='list' },
    { k:'mode', t:'select', zh:'启用方式', en:'Mode', def:'normal', showIf:v=>v.op==='enable', opts:[['normal','普通','Normal'],['before','优先于…','Before'],['after','在…之后','After']] },
    { k:'pack2', t:'text', zh:'参考数据包', en:'Reference pack', opt:true, showIf:v=>v.op==='enable' && v.mode!=='normal' },
  ],
  build(v){
    if (v.op === 'list') return 'datapack list';
    if (v.op === 'disable') return 'datapack disable ' + v.pack;
    if (v.mode === 'normal') return 'datapack enable ' + v.pack;
    return 'datapack enable ' + v.pack + ' ' + v.mode + ' ' + v.pack2;
  }
};

COMMANDS['function'] = {
  zh: '函数', en: 'Function', usage: 'function <函数> [参数]',
  params: [
    { k:'name', t:'text', zh:'函数名', en:'Function name', ph:'minecraft:test' },
    { k:'args', t:'text', zh:'参数（宏，可选）', en:'Arguments (macro, optional)', opt:true, ph:'{arg:"值"}' },
  ],
  build(v){ return 'function ' + v.name + (v.args ? ' ' + v.args : ''); }
};

COMMANDS.schedule = {
  zh: '延迟执行', en: 'Schedule', usage: 'schedule function <函数> <时间> [append|replace]',
  params: [
    { k:'func', t:'text', zh:'函数名', en:'Function name', ph:'minecraft:test' },
    { k:'time', t:'text', zh:'延迟时间', en:'Delay', def:'1s', h:'单位：t 刻 / s 秒 / d 天，如 5s' },
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'append', opts:[['append','追加','Append'],['replace','替换','Replace']] },
    { k:'clear', t:'checkbox', zh:'清除已排定任务', en:'Clear scheduled', def:false },
  ],
  build(v){
    if (v.clear) return 'schedule clear ' + v.func;
    return 'schedule function ' + v.func + ' ' + v.time + ' ' + v.mode;
  }
};

COMMANDS['return'] = {
  zh: '返回值', en: 'Return', usage: 'return <值> | return run <指令> | return fail',
  params: [
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'val', opts:[['val','返回值','Return value'],['run','运行指令','Run command'],['fail','失败','Fail']] },
    { k:'val', t:'number', zh:'返回值', en:'Return value', def:'0', min:0, showIf:v=>v.mode==='val' },
    { k:'cmd', t:'text', zh:'指令', en:'Command', opt:true, showIf:v=>v.mode==='run', ph:'execute if entity @p' },
  ],
  build(v){
    if (v.mode === 'fail') return 'return fail';
    if (v.mode === 'run') return 'return run ' + v.cmd;
    return 'return ' + v.val;
  }
};

COMMANDS.bossbar = {
  zh: 'Boss 血条', en: 'Boss Bar', usage: 'bossbar add|remove|set|get|list <id> ...',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'add', opts:[['add','创建','Add'],['remove','删除','Remove'],['set','设置属性','Set'],['get','查询属性','Get'],['list','列出','List']] },
    { k:'id', t:'text', zh:'ID', en:'ID', ph:'my_bar', showIf:v=>v.op!=='list' },
    { k:'name', t:'text', zh:'显示名', en:'Display name', def:'Boss', showIf:v=>v.op==='add' },
    { k:'prop', t:'select', zh:'属性', en:'Property', def:'max', showIf:v=>v.op==='set'||v.op==='get', opts:[['max','最大值','Max'],['value','当前值','Value'],['color','颜色','Color'],['style','样式','Style'],['players','玩家','Players'],['visible','可见','Visible'],['name','名称','Name']] },
    { k:'prop_val', t:'text', zh:'属性值', en:'Property value', opt:true, showIf:v=>v.op==='set', ph:'100 或 red 或 @a 或 true' },
  ],
  build(v){
    if (v.op === 'list') return 'bossbar list';
    if (v.op === 'add') return 'bossbar add ' + v.id + ' ' + JSON.stringify(v.name || 'Boss');
    if (v.op === 'remove') return 'bossbar remove ' + v.id;
    if (v.op === 'get') return 'bossbar get ' + v.id + ' ' + v.prop;
    return 'bossbar set ' + v.id + ' ' + v.prop + ' ' + (v.prop_val || '');
  }
};

COMMANDS.advancement = {
  zh: '进度', en: 'Advancement', usage: 'advancement grant|revoke <目标> everything|from|only|through|until <进度>',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'grant', opts:[['grant','给予','Grant'],['revoke','撤销','Revoke']] },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'mode', t:'select', zh:'模式', en:'Mode', def:'everything', opts:[['everything','全部','Everything'],['from','从…之后','From'],['only','仅…','Only'],['through','到…为止','Through'],['until','直到…','Until']] },
    { k:'adv', t:'text', zh:'进度 ID', en:'Advancement ID', opt:true, showIf:v=>v.mode!=='everything', ph:'minecraft:story/mine_stone' },
  ],
  build(v){
    if (v.mode === 'everything') return 'advancement ' + v.op + ' ' + v.targets + ' everything';
    return 'advancement ' + v.op + ' ' + v.targets + ' ' + v.mode + ' ' + v.adv;
  }
};

COMMANDS.recipe = {
  zh: '配方', en: 'Recipe', usage: 'recipe give|take <目标> <配方|*>',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'give', opts:[['give','给予','Give'],['take','移除','Take']] },
    { k:'targets', t:'target', zh:'目标', en:'Targets', def:'@p' },
    { k:'recipe', t:'text', zh:'配方 ID', en:'Recipe ID', def:'*', ph:'* 或 minecraft:stick' },
  ],
  build(v){ return 'recipe ' + v.op + ' ' + v.targets + ' ' + v.recipe; }
};

COMMANDS.debug = {
  zh: '调试', en: 'Debug', usage: 'debug start|stop|function <函数>',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'start', opts:[['start','开始','Start'],['stop','停止','Stop'],['function','函数调试','Function']] },
    { k:'func', t:'text', zh:'函数名', en:'Function name', opt:true, showIf:v=>v.op==='function' },
  ],
  build(v){
    if (v.op === 'function') return 'debug function ' + v.func;
    return 'debug ' + v.op;
  }
};

COMMANDS.jfr = {
  zh: 'JFR 性能录制', en: 'JFR', usage: 'jfr start|stop',
  params: [ { k:'op', t:'select', zh:'操作', en:'Operation', def:'start', opts:[['start','开始','Start'],['stop','停止','Stop']] } ],
  build(v){ return 'jfr ' + v.op; }
};

/* ===== 服务器管理 ===== */

COMMANDS.ban = {
  zh: '封禁玩家', en: 'Ban', usage: 'ban <玩家> [理由]',
  params: [
    { k:'player', t:'text', zh:'玩家名', en:'Player name' },
    { k:'reason', t:'text', zh:'理由（可选）', en:'Reason (optional)', opt:true },
  ],
  build(v){ return 'ban ' + v.player + (v.reason ? ' ' + v.reason : ''); }
};

COMMANDS['ban-ip'] = {
  zh: '封禁 IP', en: 'Ban IP', usage: 'ban-ip <IP> [理由]',
  params: [
    { k:'ip', t:'text', zh:'IP 地址', en:'IP address', ph:'192.168.1.1' },
    { k:'reason', t:'text', zh:'理由（可选）', en:'Reason (optional)', opt:true },
  ],
  build(v){ return 'ban-ip ' + v.ip + (v.reason ? ' ' + v.reason : ''); }
};

COMMANDS.banlist = {
  zh: '封禁列表', en: 'Ban List', usage: 'banlist [ips]',
  params: [ { k:'ips', t:'checkbox', zh:'显示 IP 封禁', en:'Show IP bans', def:false } ],
  build(v){ return 'banlist' + (v.ips ? ' ips' : ''); }
};

COMMANDS.op = {
  zh: '给予管理员', en: 'Op', usage: 'op <玩家>',
  params: [ { k:'player', t:'text', zh:'玩家名', en:'Player name' } ],
  build(v){ return 'op ' + v.player; }
};

COMMANDS.deop = {
  zh: '取消管理员', en: 'Deop', usage: 'deop <玩家>',
  params: [ { k:'player', t:'text', zh:'玩家名', en:'Player name' } ],
  build(v){ return 'deop ' + v.player; }
};

COMMANDS.kick = {
  zh: '踢出玩家', en: 'Kick', usage: 'kick <玩家> [理由]',
  params: [
    { k:'player', t:'text', zh:'玩家名', en:'Player name' },
    { k:'reason', t:'text', zh:'理由（可选）', en:'Reason (optional)', opt:true },
  ],
  build(v){ return 'kick ' + v.player + (v.reason ? ' ' + v.reason : ''); }
};

COMMANDS.whitelist = {
  zh: '白名单', en: 'Whitelist', usage: 'whitelist add|remove|list|on|off|reload [玩家]',
  params: [
    { k:'op', t:'select', zh:'操作', en:'Operation', def:'on', opts:[['on','开启','On'],['off','关闭','Off'],['list','列表','List'],['reload','重载','Reload'],['add','添加','Add'],['remove','移除','Remove']] },
    { k:'player', t:'text', zh:'玩家名', en:'Player name', opt:true, showIf:v=>v.op==='add'||v.op==='remove' },
  ],
  build(v){
    if (v.op === 'add' || v.op === 'remove') return 'whitelist ' + v.op + ' ' + v.player;
    return 'whitelist ' + v.op;
  }
};

COMMANDS['save-all'] = {
  zh: '保存世界', en: 'Save All', usage: 'save-all [flush]',
  params: [ { k:'flush', t:'checkbox', zh:'立即写入磁盘', en:'Flush to disk', def:false } ],
  build(v){ return 'save-all' + (v.flush ? ' flush' : ''); }
};

COMMANDS['save-off'] = {
  zh: '关闭自动保存', en: 'Save Off', usage: 'save-off',
  params: [],
  build(){ return 'save-off'; }
};

COMMANDS['save-on'] = {
  zh: '开启自动保存', en: 'Save On', usage: 'save-on',
  params: [],
  build(){ return 'save-on'; }
};

COMMANDS.reload = {
  zh: '重载数据包', en: 'Reload', usage: 'reload',
  params: [],
  build(){ return 'reload'; }
};

COMMANDS.stop = {
  zh: '关闭服务器', en: 'Stop Server', usage: 'stop',
  params: [],
  build(){ return 'stop'; }
};
