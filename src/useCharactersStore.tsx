import {create} from "zustand";
import Character from "./Character";

export type CharactersStore = {
    characters: Character[];
    addCharacter: (character?: Character) => void;
    removeCharacter: (index: number) => void;
    updateCharacter: (index: number, character: Character) => void;
    setCharacters: (characters: Character[]) => void;
};

export const useCharactersStore = create<CharactersStore>((set) => ({
    characters: [],
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
    setCharacters: (characters) => set({characters}),
}));

export default useCharactersStore;
