export type abilityType = {
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
};

export const getAbilityDesc = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Ability not found");
  const data: abilityType = await res.json();
  return data.effect_entries.find((entry) => entry.language.name === "en")
    ?.effect;
};
