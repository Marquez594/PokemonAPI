export type moveData = {
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  accuracy: number | null;
  power: number | null;
  type: {
    name: string;
    url: string;
  };
  damage_class: {
    name: string;
    url: string;
  };
  effect_chance: number | null;
};

export const moveDesc = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Move Description not found");
  const data: moveData = await res.json();
  const effectEntry = data.effect_entries.find(
    (entry) => entry.language.name === "en",
  );
  const effectText = effectEntry?.effect ?? "";
  const effectChance = data.effect_chance;

  const updateEffect =
    effectChance != null
      ? effectText.replace("$effect_chance", effectChance.toString())
      : effectText;
  return {
    effect: updateEffect,
    type: data.type.name,
    category: data.damage_class.name,
    accuracy: data.accuracy,
    power: data.power,
  };
};
