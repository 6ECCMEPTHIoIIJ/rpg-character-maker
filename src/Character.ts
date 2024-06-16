import getEntries from "./getEntries";

import warriorImg from "/warrior.jpg";
import rogueImg from "/rogue.jpg";
import mageImg from "/mage.jpg";
import lordImg from "/knight.jpg";
import nomadImg from "/nomad.jpg";

export type CharacterBaseStatName =
  | "strength"
  | "agility"
  | "intelligence"
  | "charisma";
export type CharacterBaseStats = {
  [key in CharacterBaseStatName]: number;
};

export type CharacterDerivedStatName = "health" | "dodge" | "energy";
export type CharacterDerivedStats = {
  [key in CharacterDerivedStatName]: (baseStats: CharacterBaseStats) => number;
};

export type CharacterClassName =
  | "warrior"
  | "mage"
  | "rogue"
  | "lord"
  | "nomad";

export type CharacterSkillName =
  | "attack"
  | "stealth"
  | "archery"
  | "learning"
  | "survival"
  | "medicine"
  | "intimidation"
  | "insight"
  | "appearance"
  | "manipulation";

export type CharacterSkills = {
  [key in CharacterSkillName]: number;
};

export type CharacterSkillLevelName =
  | "novice"
  | "beginner"
  | "apprentice"
  | "adept"
  | "expert"
  | "master";

export class Character {
  name: string = "New Character";

  baseStats: CharacterBaseStats = {
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
  };

  skills: CharacterSkills = {
    appearance: 0,
    archery: 0,
    attack: 0,
    intimidation: 0,
    insight: 0,
    learning: 0,
    manipulation: 0,
    medicine: 0,
    stealth: 0,
    survival: 0,
  };

  constructor(
    name?: string,
    stats?: CharacterBaseStats,
    skills?: CharacterSkills
  ) {
    if (name) {
      this.name = name.slice(0, 20) + (name.length > 20 ? "..." : "");
    }
    if (stats) {
      const entries = getEntries(stats);
      let statPointsLeft = Character.totalStatPoints;
      entries.forEach(([stat, value]) => {
        this.baseStats[stat] = Math.min(
          statPointsLeft,
          Math.max(0, Math.min(Character.maxBaseStats[stat], value))
        );
        statPointsLeft -= this.baseStats[stat];
      });
    }
    if (skills) {
      const entries = getEntries(skills);
      let skillPointsLeft = Character.totalSkillPoints;
      entries.forEach(([skill, value]) => {
        this.skills[skill] = Math.min(
          skillPointsLeft,
          Math.max(0, Math.min(Character.maxSkillLevel, value))
        );
        skillPointsLeft -= this.skills[skill];
      });
    }
  }

  static derivedStats: CharacterDerivedStats = {
    health: ({ strength }) => 3 + strength,
    dodge: ({ agility }) => 10 + agility,
    energy: ({ agility, intelligence }) => agility + intelligence,
  };

  getBaseStats(): [CharacterBaseStatName, number][] {
    return getEntries(this.baseStats);
  }

  getDerivedStats(): [CharacterDerivedStatName, number][] {
    return getEntries(Character.derivedStats).map(([stat, fn]) => [
      stat,
      fn(this.baseStats),
    ]);
  }

  getMainStat(): CharacterBaseStatName {
    const entries = this.getBaseStats();
    return entries.reduce((maxStat, [stat, value]) => {
      return value > this.baseStats[maxStat] ? stat : maxStat;
    }, entries[0][0]);
  }

  getClass(mainStat: CharacterBaseStatName): CharacterClassName {
    if (this.baseStats[mainStat] < Character.maxSkillLevel) return "nomad";
    switch (mainStat) {
      case "strength":
        return "warrior";
      case "agility":
        return "rogue";
      case "intelligence":
        return "mage";
      case "charisma":
        return "lord";
    }
  }

  getSkillLevel(
    skill: CharacterSkillName
  ): CharacterSkillLevelName | undefined {
    return Character.skillLevelNames[this.skills[skill]];
  }

  static maxSkillLevel = 5;
  static totalStatPoints = 15;
  static totalSkillPoints = 30;

  static zeroStats: CharacterBaseStats = {
    strength: 0,
    agility: 0,
    intelligence: 0,
    charisma: 0,
  };

  static maxBaseStats: CharacterBaseStats = {
    strength: 10,
    agility: 10,
    intelligence: 10,
    charisma: 5,
  };

  static maxDerivedStats: { [key in CharacterDerivedStatName]: number } = {
    health: Character.derivedStats.health({
      ...Character.zeroStats,
      strength: Character.maxBaseStats.strength,
    }),
    dodge: Character.derivedStats.dodge({
      ...Character.zeroStats,
      agility: Character.maxBaseStats.agility,
    }),
    energy: Character.derivedStats.energy({
      ...Character.zeroStats,
      agility: Math.min(
        Character.maxBaseStats.agility,
        Character.totalStatPoints - Character.maxBaseStats.intelligence
      ),
      intelligence: Math.max(
        this.totalStatPoints - Character.maxBaseStats.agility,
        Character.maxBaseStats.intelligence
      ),
    }),
  };

  static classImages: { [key in CharacterClassName]: string } = {
    warrior: warriorImg,
    rogue: rogueImg,
    mage: mageImg,
    lord: lordImg,
    nomad: nomadImg,
  };

  static classColors: { [key in CharacterClassName]: string } = {
    warrior: "#eb2323",
    rogue: "#f0960e",
    mage: "#02d6d3",
    lord: "#b409e8",
    nomad: "#5f5f5f",
  };

  static baseStatsColors: {
    [key in CharacterBaseStatName]: { primary: string; secondary: string };
  } = {
    agility: { primary: "#f0960e", secondary: "#f2e3cb" },
    charisma: { primary: "#b409e8", secondary: "#f2d9fa" },
    intelligence: { primary: "#02d6d3", secondary: "#cef5f4" },
    strength: { primary: "#eb2323", secondary: "#f5d5d5" },
  };

  static derivedStatsColors: {
    [key in CharacterDerivedStatName]: { primary: string; secondary: string };
  } = {
    dodge: { primary: "#90cc41", secondary: "#dfedcc" },
    energy: { primary: "#2279bf", secondary: "#c0d9ed" },
    health: { primary: "#db1d6c", secondary: "#f0d1de" },
  };

  static skillLevelNames: CharacterSkillLevelName[] = [
    "novice",
    "beginner",
    "apprentice",
    "adept",
    "expert",
    "master",
  ];

  static skillColors: { [key in CharacterSkillName]: string } = {
    appearance: "#ffcc00",
    archery: "#00ff00",
    attack: "#ff0000",
    intimidation: "#0000ff",
    insight: "#ff00ff",
    learning: "#00ffff",
    manipulation: "#ffff00",
    medicine: "#ff9900",
    stealth: "#9900ff",
    survival: "#00ff99",
  };

  static baseStatsClasses: {
    [key in CharacterBaseStatName]: CharacterClassName;
  } = {
    agility: "rogue",
    charisma: "lord",
    intelligence: "mage",
    strength: "warrior",
  };
}

export default Character;
