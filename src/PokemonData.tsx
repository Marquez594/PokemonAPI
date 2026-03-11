import { typeColor } from "./typesColor";
import { barColor } from "./barColor";
import { useState } from "react";
import type { pokemonType } from "./API/pokemon";

type PokemonDataProps = {
  data: pokemonType;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function PokemonData({ data, setSearch }: PokemonDataProps) {
  const [moveSet, setMoveSet] = useState<string>("level");
  return (
    <div className=" flex-1 flex flex-col">
      <div className="flex flex-col lg:flex-row ">
        <div className="flex flex-1 flex-col justify-center items-center  gap-6 md:p-2 lg:min-h-screen">
          {/**Left side */}
          <h1 className="capitalize text-7xl font-bold">{data.name}</h1>
          <p className="text-xl">No: {data.id}</p>
          <img
            src={data.sprites.front_default}
            className="w-1/2 h-1/2 border-4 rounded-4xl "
          ></img>
          <div className="flex   justify-center items-center lg:w-1/2 rounded-2xl overflow-hidden shadow-inner">
            {/**Types */}
            {data.types.map((type, index) => (
              <h1
                key={index}
                className={`capitalize flex-1 flex items-center justify-center p-2 ${typeColor(type.type.name)} text-white  font-extrabold text-2xl`}
              >
                {type.type.name}
              </h1>
            ))}
          </div>
          <div className="flex gap-10 justify-center items-center">
            {/**Height and weight */}
            <h1>Height: {data.height / 10}m</h1>
            <h1>Weight: {data.weight / 10}kg</h1>
          </div>
        </div>
        <div className="flex flex-2 flex-col items-start  p-2 gap-4 pl-5">
          {/**Right side */}
          <div className="flex flex-col gap-2">
            {/**Stats */}
            <h1 className="text-5xl font-bold">Base Stats</h1>
            <table className="mx-auto border-spacing-4 border-separate border bg-gray-100 rounded-3xl">
              <tr className="border border-b-2 border-black">
                <td>HP</td>
                <td>{data.stats[0].base_stat}</td>
                <td className="w-2xl py-1">
                  <div
                    className={`${barColor(data.stats[0].base_stat)} h-4 rounded-2xl`}
                    style={{
                      width: `${(data.stats[0].base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Attack</td>
                <td>{data.stats[1].base_stat}</td>
                <td className="w-2xl py-1">
                  <div
                    className={`${barColor(data.stats[1].base_stat)} h-4 rounded-2xl`}
                    style={{
                      width: `${(data.stats[1].base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Defense</td>
                <td>{data.stats[2].base_stat}</td>
                <td className="w-2xl py-1">
                  <div
                    className={`${barColor(data.stats[2].base_stat)} h-4 rounded-2xl`}
                    style={{
                      width: `${(data.stats[2].base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Sp. Atk</td>
                <td>{data.stats[3].base_stat}</td>
                <td className="w-2xl py-1">
                  <div
                    className={`${barColor(data.stats[3].base_stat)} h-4 rounded-2xl`}
                    style={{
                      width: `${(data.stats[3].base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Sp. Def</td>
                <td>{data.stats[4].base_stat}</td>
                <td className="w-2xl py-1">
                  <div
                    className={`${barColor(data.stats[4].base_stat)} h-4 rounded-2xl`}
                    style={{
                      width: `${(data.stats[4].base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Speed</td>
                <td>{data.stats[5].base_stat}</td>
                <td className="w-2xl py-1">
                  <div
                    className={`${barColor(data.stats[5].base_stat)} h-4 rounded-2xl`}
                    style={{
                      width: `${(data.stats[5].base_stat / 255) * 100}%`,
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                  {data.stats[0].base_stat +
                    data.stats[1].base_stat +
                    data.stats[2].base_stat +
                    data.stats[3].base_stat +
                    data.stats[4].base_stat +
                    data.stats[5].base_stat}
                </td>
              </tr>
            </table>
          </div>
          <div className="flex flex-col gap-4">
            {/**Abilities */}
            <h1 className="text-4xl font-bold">Abilities</h1>
            <ol>
              {data.abilities.map((data, index) => (
                <li key={index} className="capitalize pb-2">
                  <span className="text-xl">
                    {data.ability.name}{" "}
                    {data.is_hidden == true ? "(Hidden)" : null} :
                  </span>
                  <p className="ml-10 text-2sm text-gray-500 italic">
                    {data.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div className="p-5 flex justify-center flex-col">
        {/**Evolution Chain */}
        <h1 className="text-3xl font-bold justify-self-start ">
          Evolution Chart
        </h1>
        <div className="flex gap-5 justify-center">
          {/**Evo Body */}
          {data.pokemonEvolution.evolutionData.map((pokemon, index) => (
            <div
              className="flex flex-col justify-center items-center hover:cursor-pointer"
              key={index}
              onClick={() => setSearch(pokemon.name)}
            >
              <img src={pokemon.sprite} className="h-48"></img>
              <h1 className="capitalize font-bold text-2xl flex-auto">{pokemon.name}</h1>
              <div className="flex justify-center flex-col items-center">
                <p>{pokemon?.level}</p>
                <p className="capitalize">{pokemon?.trigger}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1">
        {/**moves */}
        <div className="flex-1  p-5 flex justify-center flex-col gap-5 overflow-x-scroll">
          <select
            className="lg:text-3xl font-bold w-fit text-xl"
            value={moveSet}
            onChange={(e) => setMoveSet(e.target.value)}
          >
            <option value="level">Moves Learned By Level</option>
            <option value="other">Moves Learned By Other</option>
          </select>
          {/**Level up moves */}
          <table className="w-full text-sm border border-separate border-spacing-5 lg:border-spacing-0 text-center lg:table-fixed rounded-2xl">
            <tr className="text-2xl border-b-black border">
              <th className="lg:border-b">Name</th>
              <th className="lg:border-b">Level</th>
              <th className="lg:border-b">Type</th>
              <th className="lg:border-b">Category</th>
              <th className="lg:border-b">Power</th>
              <th className="lg:border-b">Accuracy</th>
              <th className="lg:w-1/2 min-w-96 lg:border-b  p-2">Description</th>
            </tr>
            {moveSet == "level"
              ? data.levelUpMoves.map((move, index) => (
                  <tr key={index} className="border text-center">
                    <td className="capitalize">{move.move.name}</td>
                    <td>{move.level}</td>
                    <td>
                      <p
                        className={`border p-1 rounded-md ${typeColor(move.type)} text-white capitalize`}
                      >
                        {move.type}
                      </p>
                    </td>
                    <td className="capitalize">{move.category}</td>
                    <td>{move.power != null ? move.power : "--"}</td>
                    <td>{move.accuracy != null ? move.accuracy : "--"}</td>
                    <td className="text-left p-2">{move.effect}</td>
                  </tr>
                ))
              : data.nonLevelUpMoves.map((move, index) => (
                  <tr key={index} className="border text-center">
                    <td className="capitalize">{move.move.name}</td>
                    <td>{move.level}</td>
                    <td>
                      <p
                        className={`border p-1 rounded-md ${typeColor(move.type)} text-white capitalize`}
                      >
                        {move.type}
                      </p>
                    </td>
                    <td className="capitalize">{move.category}</td>
                    <td>{move.power != null ? move.power : "--"}</td>
                    <td>{move.accuracy != null ? move.accuracy : "--"}</td>
                    <td className="text-left p-2">{move.effect}</td>
                  </tr>
                ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default PokemonData;
