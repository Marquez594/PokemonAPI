import { getAbilityDesc } from "./ability";
import { moveDesc } from "./moveDes";
import { evolutionChain } from "./evolution";

const baseURL: string = "https://pokeapi.co/api/v2";

type pokemonMoves = {
  accuracy: number;
  category: string;
  effect: string;
  level: number;
  move: {
    name: string;
    url: string;
  };
  power: number;
  type: string;
};

export type pokemonType = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    description: string;
  }[];
  height: number;
  id: number;
  name: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  sprites: {
    front_default: string;
  };
  levelUpMoves: pokemonMoves[];
  nonLevelUpMoves: pokemonMoves[];
  species: {
    name: string;
    url: string;
  };
  pokemonEvolution: {
    evolutionData: {
      name: string;
      sprite: string;
      level: number | null;
      trigger: string;
    }[];
  };
};

export const getPokemon = async (name: string) => {
  const res = await fetch(`${baseURL}/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error("Pokemon Not Found");
  const data: pokemonType = await res.json();

  const abilities = await Promise.all(
    data.abilities.map(async (ab) => {
      const desc = await getAbilityDesc(ab.ability.url);
      return { ...ab, description: desc };
    }),
  );

  const filterMove = data.moves
    .filter((move) =>
      move.version_group_details.some(
        (v) =>
          v.version_group.name === "scarlet-violet" &&
          v.move_learn_method.name === "level-up",
      ),
    )
    .map((moves) => ({
      ...moves,
      version_group_details: moves.version_group_details.filter(
        (v) =>
          v.version_group.name === "scarlet-violet" &&
          v.move_learn_method.name === "level-up",
      ),
    }));

  const filterNonLevelMoves = data.moves.filter((move) =>
    move.version_group_details.some(
      (v) =>
        v.version_group.name === "scarlet-violet" &&
        v.move_learn_method.name != "level-up",
    ),
  );

  filterNonLevelMoves.sort(
    (a, b) =>
      a.version_group_details[0].level_learned_at -
      b.version_group_details[0].level_learned_at,
  );

  filterMove.sort(
    (a, b) =>
      a.version_group_details[0].level_learned_at -
      b.version_group_details[0].level_learned_at,
  );

  const levelUpMoves = await Promise.all(
    filterMove.map(async (mv) => {
      const desc = await moveDesc(mv.move.url);
      return {
        ...mv,
        ...desc,
        level: mv.version_group_details[0].level_learned_at,
      };
    }),
  );

  const nonLevelUpMoves = await Promise.all(
    filterNonLevelMoves.map(async (mv) => {
      const desc = await moveDesc(mv.move.url);
      return {
        ...mv,
        ...desc,
        level: mv.version_group_details[0].level_learned_at,
      };
    }),
  );

  const pokemonEvolution = await evolutionChain(data.species.url);

  return {
    ...data,
    abilities,
    levelUpMoves,
    nonLevelUpMoves,
    pokemonEvolution,
  };
};
