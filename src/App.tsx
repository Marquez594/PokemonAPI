import Nav from "./Nav";
import Body from "./Body";
import { useEffect, useState } from "react";
import { usePokemon } from "./Hooks/usePokemon";
import PokemonData from "./PokemonData";

function App() {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, error } = usePokemon(search.trim());
  useEffect(() => console.log(data), [data]);
  return (
    <div className="min-h-screen flex flex-col">
      {/**Whole body */}
      <Nav setSearch={setSearch}></Nav>
      {!search && <Body></Body>}
      {search && isLoading && (
        <div className="flex  flex-1 justify-center items-center">
          <h1>Loading Pokemon</h1>
        </div>
      )}
      {search && error && (
        <div className="flex flex-1 justify-center items-center">
          <h1>Could not find Pokemon</h1>
        </div>
      )}
      {search && data && <PokemonData data={data} setSearch={setSearch}></PokemonData>}
    </div>
  );
}

export default App;
