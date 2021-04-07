import { Type } from "./data";
import data from "./data-pkmn.json";

export interface Pokemon {
  id: string;
  bulbapediaURL: string;
  name: string;
  formName: string;
  number: number;
  types: Type[];
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
  evolve: {id: string, condition: string}[];
  transform: {id: string, condition: string}[];
}

export const AllPokemon: Pokemon[] = data;
