# MC Command Forge（MC指令生成器）

> 面向 Minecraft Java 1.20.1 的图形化指令生成工具 / A GUI command generator for Minecraft Java 1.20.1

由Escape制作，适用于JAVA1.20.1 · Made by Escape for Java 1.20.1

---

## 简介 / About

**中文**：面向 Minecraft Java 1.20.1 的图形化指令生成器，内置 30 个热门 Forge mod 物品库。

**English**：A GUI command generator for Minecraft Java 1.20.1, bundled with an item database of 30 popular Forge mods.

## 功能亮点 / Features

- **72 条指令全覆盖**：give / summon / execute / tellraw / scoreboard / gamerule / 服务器管理……参数向导化，严格遵循 1.20.1 语法
- **4000+ ID 库**：原版全部物品实体 + 机械动力、AE2、植物魔法、暮色森林、冰火传说、Alex 的生物/洞穴、灾变、诡厄巫法、神秘遗物、车万女仆、龙之研究、农夫乐事、未至之地等 30 个 mod 核心物品
- **来源筛选**：ID 选择框上方一键切换原版 / 各 mod，中英双语模糊搜索
- **give 可视化 NBT 编辑**：附魔列表、自定义名称、Lore、不可破坏、隐藏工具提示
- **中英文界面切换**、**明亮/暗色双主题**、动态科技风格界面
- **生成记录**：复制过的指令自动留存，点击一键复制
- **单文件 exe**：约 15MB，win11 直接运行，无需安装

## 使用 / Usage

生成指令不含前导 `/`，复制后粘贴进游戏聊天栏或命令方块即可。
Generated commands have no leading `/`; copy and paste into chat or a command block.

## 技术栈 / Tech

Python 3.14 · pywebview (WebView2) · HTML/CSS/JS · PyInstaller 单文件打包

## 说明 / Notes

- 指令与 ID 基于 1.20.1 原版及各 mod 主流 Forge 版本注册名，个别社区版/特供版可能存在差异
- 聊天栏单条指令上限 256 字符，长指令请使用命令方块
- 命令方块模式（多命令方块串联）为 V2 规划
