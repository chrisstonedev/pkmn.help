import * as React from "react";
import { Type } from "./data";
import { Pokemon } from "./pkmn";
import * as Matchups from "./Matchups";

const STAT_MAX = 255;

export interface DefenseTableProps {
  pokemon: Pokemon;
}

export default function DefenseTable(props: DefenseTableProps) {
  const { pokemon } = props;

  return (
    <Matchups.Defense
      type1={pokemon.types[0]}
      type2={pokemon.types.length > 1 ? pokemon.types[1] : Type.NONE}
    />
  );
}

DefenseTable.displayName = "DefenseTable";
