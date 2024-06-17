# RPG Character Editor

This is a simple RPG character editor that allows you to create and edit characters for a role-playing game. The editor is written in React TS and uses Zustand for state management.

## Features

### Create a new character

To add a new character you need to click `CREATE NEW CHARACTER` button 
![2024-06-18 00-37-45](https://github.com/6ECCMEPTHIoIIJ/rpg-character-maker/assets/96795933/4c1765b0-22c0-490e-a238-836d439fc805)
then character with name "New Character" and all stats set to zero will be added to list.

Or if you already have some characters in the list than you can copy one of them by clicking copy icon
![2024-06-18 00-37-45 (3)](https://github.com/6ECCMEPTHIoIIJ/rpg-character-maker/assets/96795933/79f3ecba-eb65-4cd7-a99d-015c5d6328c0)
and character with the same parameters will be added to the end of list.


### Import and export characters

To save your work you can export file in JSON format by clicking export icon below exported character card.
JSON file with character name will be directly download to you computer. Then you can easyly import character back again by chosing `UPLOAD EXISTING CHARACTER FROM DISK` option.
![2024-06-18 00-37-45 (1)](https://github.com/6ECCMEPTHIoIIJ/rpg-character-maker/assets/96795933/00739b4a-0e96-48fe-ba41-993258a4aecc)
You can also edit values in the exported character and then iomport it. Attempt that if you set ureachable stats values character stats will be clamped into their bounds.

### Edit an existing character 

You can also edit character name, base stats and skills values. Derived stats such as `Health` computes automatically and are unable to edit.
After finishing editing you can save changes by clicking `SAVE CHANGES BUTTON`
![2024-06-18 00-37-45 (4)](https://github.com/6ECCMEPTHIoIIJ/rpg-character-maker/assets/96795933/b2aa5b4c-685b-4a08-b3aa-3cf7f3b2c914)
then al changes will by applied to edited character. You can also revert edited stats to initiali values before editing or completely discard all changes witout saving.

### Delete a character

You can delte one of created characters by clicking delete button. If you have alredy exported deleting character than you may upload him again.

## Character stats and skills system explanation

- All base stats except `Charisma` are capped at 10 points (`Charisma` is limited by 5)
- The total number of stat points is capped at 15 points, which means you cannot have a character whose `Strength` and `Agility` are set to 10 point each
- In that point derived stats have limitations based on their base stats limits (`Energy`  has a limit of 15 points instead of 20, since it depends on two characteristics at the same time)
- All skills have 5 levels from `Novice` to `Expert`. Each skill also limited by the base stat value it depends on
- The total number of skill points is limited by 20
- A character's class depends on his base stats. Initially, each character has a base class of `Nomad`. To get a specialization class character must have at least one basic characteristic with a value has at least 5 points
- Character picture picks automatically and depends on character class
