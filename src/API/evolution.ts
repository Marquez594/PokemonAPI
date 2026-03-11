export const evolutionChain = async (url: string) => {
  const speciesRes = await fetch(url);
  if (!speciesRes.ok) throw new Error("Species not found");
  const species = await speciesRes.json();
  const eveRes = await fetch(species.evolution_chain.url);
  if (!eveRes.ok) throw new Error("Evolution chain not found");
  const eveData = await eveRes.json();
  let evolution = [];
  let current = eveData.chain;
  while (current) {
    if (current.evolution_details.length == 0) {
      evolution.push({
        species: current.species,
      });
    } else if (current.evolution_details.length != 0) {
      evolution.push({
        species: current.species,
        level: current.evolution_details[0].min_level,
        trigger: current.evolution_details[0].trigger.name,
      });
    }
    if (current.evolves_to.length == 0) break;
    current = current.evolves_to[0];
  }

  const evolutionData = await Promise.all(
    evolution.map(async (evo) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${evo.species.name.toLowerCase()}`,
      );
      const data = await res.json();
      return {
        ...evo,
        name: data.name,
        sprite: data.sprites.front_default,
      };
    }),
  );
  return {
    evolutionData,
  };
};
