import {create} from "zustand";
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
            stats: {strength: 4, agility: 4, intelligence: 4, charisma: 4},
            skills: {
                appearance: 3,
                archery: 2,
                attack: 7,
                intimidation: 2,
                insight: 2,
                learning: 2,
                manipulation: 2,
                medicine: 2,
                stealth: 2,
                survival: 2,
            }
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
