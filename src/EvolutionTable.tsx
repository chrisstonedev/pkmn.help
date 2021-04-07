import * as React from "react";
import { AllPokemon, Pokemon } from "./pkmn";
import { getImage } from "./getImage";
import { FaArrowLeft, FaArrowRight, FaArrowsAltH } from "react-icons/fa";

export interface EvolutionTableProps {
  pokemon: Pokemon;
}

export default function EvolutionTable(props: EvolutionTableProps) {
  const { pokemon } = props;

  function getPokemonName(id: string) {
    const pokemon = AllPokemon.find((x) => x.id === id);
    return formatName(pokemon!.formName, pokemon!.name);
  }

  function formatName(formName: string, name: string) {
    if (formName.length === 0) return name;
    else if (formName.includes(name)) return formName;
    else return formName + " " + name;
  }

  const preEvolution = AllPokemon.filter(
    (x) => x.evolve.length > 0 && x.evolve.find((y) => y.id === pokemon.id)
  );

  const otherForms = AllPokemon.filter(
    (x) => x.number === pokemon.number && x.id !== pokemon.id
  );

  const imgSize = 68;

  return (
    <div className="EvolutionTable">
      {preEvolution.length > 0 &&
        preEvolution.map((evolveFrom) => (
          <>
            <div className={"pa2 bg3 br4 bn b--white-70 evolveArrow"}>
              <FaArrowLeft />
            </div>
            <img
              src={getImage(evolveFrom.id)}
              role="presentation"
              className={`pa1 bg3 br4 bn b--white-70`}
              width={imgSize}
              height={imgSize}
            />
            <div className={"pa3 bg3 br4 bn b--white-70"}>
              It evolves from {formatName(evolveFrom.formName, evolveFrom.name)}{" "}
              {evolveFrom.evolve.find((x) => x.id === pokemon.id)?.condition}.
            </div>
          </>
        ))}
      {pokemon.evolve.length > 0 &&
        pokemon.evolve.map((evolution) => (
          <>
            <div className={"pa2 bg3 br4 bn b--white-70 evolveArrow"}>
              <FaArrowRight />
            </div>
            <img
              src={getImage(evolution.id)}
              role="presentation"
              className={`pa1 bg3 br4 bn b--white-70`}
              width={imgSize}
              height={imgSize}
            />
            <div className={"pa3 bg3 br4 bn b--white-70"}>
              It evolves into {getPokemonName(evolution.id)}{" "}
              {evolution.condition}.
            </div>
          </>
        ))}
      {pokemon.transform !== undefined &&
        pokemon.transform.length > 0 &&
        pokemon.transform.map((transformation) => (
          <>
            <div className={"pa2 bg3 br4 bn b--white-70 evolveArrow"}>
              <FaArrowsAltH />
            </div>
            <img
              src={getImage(transformation.id)}
              role="presentation"
              className={`pa1 bg3 br4 bn b--white-70`}
              width={imgSize}
              height={imgSize}
            />
            <div className={"pa3 bg3 br4 bn b--white-70"}>
              It can transform into {getPokemonName(transformation.id)}{" "}
              {transformation.condition}.
            </div>
          </>
        ))}
      {/* {pokemon.transform !== undefined &&
        pokemon.transform.id !== undefined &&
        pokemon.transform.id.length > 0 &&
        pokemon.transform.id.map((evolution) => (
          <>
            <div className={"pa1 bg3 br4 bn b--white-70 evolveArrow"}>
              <FaArrowsAltH />
            </div>
            <img
              src={getImage(evolution)}
              role="presentation"
              className={`pa1 bg3 br4 bn b--white-70`}
              width={imgSize}
              height={imgSize}
            />
            <div className={"pa3 bg3 br4 bn b--white-70"}>
              It can transform into {getPokemonName(evolution)}{" "}
              {pokemon.transform}.
            </div>
          </>
        ))} */}
      {preEvolution.length === 0 &&
        pokemon.evolve.length === 0 &&
        (pokemon.transform === undefined || pokemon.transform.length === 0) && (
          <div>It is not known to evolve from or into any other Pokémon.</div>
        )}
    </div>
  );
}

EvolutionTable.displayName = "EvolutionTable";
