import { useState } from "react";

type NavProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function Nav({ setSearch }: NavProps) {
  const [currentSearch, setCurrentSearch] = useState<string>("");
  return (
    <div className=" p-5 flex justify-center items-center bg-red-600">
      <div className="bg-white flex w-2xl rounded-xl">
        <input
          type="search"
          name="searchBar"
          id="searchBar"
          value={currentSearch}
          onChange={(e) => setCurrentSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              setSearch(currentSearch);
            }
          }}
          className="focus:outline-none focus:ring-2 w-full p-2 rounded-bl-xl rounded-tl-xl border-r-2 border-gray-200 focus:border-none "
        ></input>
        <button
          className="px-2 rounded-tr-xl rounded-br-xl hover:cursor-pointer"
          onClick={() => setSearch(currentSearch)}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Nav;
