import classnames from "classnames";
import matchSorter from "match-sorter";
import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { Type } from "./data";
import { getImage } from "./getImage";
import Paginator from "./Paginator";
import { AllPokemon, Pokemon } from "./pkmn";
import Search from "./Search";
import DefenseTable from "./DefenseTable";
import { useSearch } from "./useSearch";

const PAGE_SIZE = 20;
const nbsp = "\u00a0";

interface MonsterTypeProps {
  type: Type;
  index: number;
}

function MonsterType(props: MonsterTypeProps) {
  return (
    <div
      className={classnames(
        `type-${props.type} type-bg-light`,
        "ttc tc flex",
        "pv0 ph2 lh-copy",
        "br1 ba border3 f6",
        { ml1: props.index > 0 }
      )}
    >
      {props.type}
    </div>
  );
}

MonsterType.displayName = "MonsterType";

interface MonsterProps {
  pokemon: Pokemon;
  index: number;
}

function Monster(props: MonsterProps) {
  const displayNumber = "#" + String(props.pokemon.number).padStart(3, "0");
  const imgSize = 68 * 2;
  return (
    <div
      className={classnames(
        "fg1 pv3",
        "flex-ns items-center",
        "Monster",
        "bb border4",
        props.index === 0 ? "bt" : ""
      )}
    >
      <div className="flex flex-column">
        <div className="flex mb2 items-center">
          <div className="fg3 mv0 tabular-nums f4">{displayNumber}</div>
          <div className="ph1" />
          <h2 className="mv0 f3">{props.pokemon.name}</h2>
        </div>
        <h3 className="nt2 mb2 f4 normal">{props.pokemon.formName || nbsp}</h3>
        <div className="flex">
          {props.pokemon.types.map((t, i) => (
            <MonsterType key={i} type={t} index={i} />
          ))}
        </div>
        <div className="mv2 lh-copy">
          <Link
            className="underline fg-link OutlineFocus"
            to={`/defense?${new URLSearchParams({
              types: props.pokemon.types.join(" "),
            })}#matchup-defense`}
            aria-label={`Defense for ${props.pokemon.name}`}
          >
            Defense
          </Link>{" "}
          &bull;{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.pokemon.bulbapediaURL}
            className="underline fg-link OutlineFocus"
            aria-label={`${props.pokemon.name} on Bulbapedia`}
          >
            Bulbapedia
          </a>
        </div>
        <img
          src={getImage(props.pokemon.id)}
          role="presentation"
          className={`pa1 mt2 bg3 br4 bn b--white-70`}
          width={imgSize}
          height={imgSize}
        />
      </div>
      <DefenseTable pokemon={props.pokemon} />
    </div>
  );
}

Monster.displayName = "Monster";

interface DexProps {
  setPokedexParams: (params: string) => void;
}

export default function ScreenPokedex(props: DexProps) {
  const search = useSearch();
  const history = useHistory();

  const query = search.get("q") || "";
  const page = Number(search.get("page") || 1) - 1;

  const pkmn = React.useMemo(() => {
    const s = query.trim();
    if (/^[0-9]+$/.test(s)) {
      const number = Number(s);
      return AllPokemon.filter((p) => p.number === number);
    }
    return matchSorter(AllPokemon, s, { keys: ["name", "number"] });
  }, [query]);

  function createParams(newQuery: string, newPage: number): string {
    const params = new URLSearchParams();
    if (newQuery) {
      params.set("q", newQuery);
    }
    if (Number(newPage) > 0) {
      params.set("page", String(newPage + 1));
    }
    return "?" + params;
  }

  function update(newQuery: string, newPage: number) {
    const params = createParams(newQuery, newPage);
    history.replace({ search: params });
  }

  const params = createParams(query, page);
  React.useEffect(() => {
    props.setPokedexParams(params);
  }, [params]);

  return (
    <main className="ph3 mt3 center content-narrow">
      <Search
        search={query}
        updateSearch={(newQuery) => {
          update(newQuery, 0);
        }}
      />
      <Paginator
        currentPage={page}
        urlForPage={(newPage) => {
          return createParams(query, newPage);
        }}
        pageSize={PAGE_SIZE}
        emptyState={<p className="fg4 f4 b tc m0">No Pok??mon found</p>}
        items={pkmn}
        renderPage={(page) =>
          page.map((pokemon, index) => (
            <Monster key={pokemon.id} pokemon={pokemon} index={index} />
          ))
        }
      />
    </main>
  );
}

ScreenPokedex.displayName = "ScreenPokedex";
