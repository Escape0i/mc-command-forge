# Changelog

## [v3.0] - 2026-09-30

### Added
- **Command Block Mode (V2, experimental)** — new mode switch in the top-right corner:
  - Visual canvas (9×7 grid) to place impulse / chain / repeating command blocks
  - Set facing (6 directions), redstone mode (always active / needs redstone), conditional, tick delay and custom name per block
  - Glowing link lines show the chain direction between adjacent blocks
  - Per-block command editing: same graphical wizard as single-command mode (with item/entity ID pickers), plus manual editing for compound commands (e.g. `execute … run …`)
  - Generates `setblock` place-commands to build the whole chain in-game
- **Mod entity database** — 299 entities from 13 mods (Twilight Forest, Ice and Fire, Alex's Mobs/Caves, Cataclysm, Goety, Touhou Little Maid, Mowzie's Mobs, Mutant Monsters, The Graveyard, BOMD, Born in Chaos, Aquamirae); 418 entities in total
- **Smart source filters** — entity pickers only show mods that actually have entities
- **Feedback button** — copy author email with one click (bottom-right corner)
- **Target selector hints** — Chinese explanations for `@p/@a/@e/@r/@s` with advanced filter examples
- **Custom number steppers** — themed −/+ buttons replace native OS spinners
- **Custom confirm dialog** — themed modal replaces the system dialog
- Command search box, per-command info card, generation history

### Fixed
- `give` NBT: merged duplicate `display` blocks (Name + Lore)
- Parameter defaults now injected into state (no more `undefined` in output)
- Missing-required-parameter validation before generating
- Command block link line coordinates (aligned to cell gaps)
- Clear-canvas confirm callback (dialog closed before callback ran)

### Changed
- UI overhaul: tech-style theme with dynamic background effects and startup splash
- Version bumped to v2.0

## [v1.0] - 2026-08-21

### Added
- 72 vanilla commands with parameter wizards for Minecraft Java 1.20.1
- 4000+ item/entity ID database (vanilla + 30 popular Forge mods)
- Per-mod source filters + bilingual CN/EN search
- Visual NBT editor for `/give` (enchantments, custom name, lore, unbreakable)
- Bilingual UI (中文/EN) with dark & light themes
- Single-file exe (~15 MB), no installation needed
