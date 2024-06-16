import { create } from "zustand";
import Character from "./Character";

export type CharactersStore = {
  characters: Character[];
  addCharacter: (character?: Character) => void;
  removeCharacter: (index: number) => void;
  updateCharacter: (index: number, character: Character) => void;
};

export const useCharactersStore = create<CharactersStore>((set) => ({
  characters: [
    new Character({
      name: "John Doe",
      stats: { strength: 10, agility: 5, intelligence: 0, charisma: 0 },
    }),
  ],
  addCharacter: (character) =>
    set((state) => ({
      characters: [...state.characters, character ?? new Character()],
    })),
  removeCharacter: (index) =>
    set((state) => ({
      characters: state.characters.filter((_, i) => i !== index),
    })),
  updateCharacter: (index, character) =>
    set((state) => ({
      characters: state.characters.map((c, i) => (i === index ? character : c)),
    })),
}));

export default useCharactersStore;
