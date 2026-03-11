export const typeColor = (type: string) => {
  switch (type) {
    case "fire":
      return "bg-red-500";
    case "electric":
      return "bg-yellow-500";
    case "flying":
      return "bg-blue-200";
    case "grass":
      return "bg-green-500";
    case "bug":
      return "bg-[#9CF527]";
    case "electric":
      return "bg-yellow-400";
    case "fairy":
      return "bg-pink-200";
    case "steel":
      return "bg-gray-400";
    case "dark":
      return "bg-[#4D3930]";
    case "poison":
      return "bg-purple-700";
    case "ghost":
      return "bg-[#9768A6]";
    case "water":
      return "bg-blue-500";
    case "psychic":
      return "bg-pink-500";
    case "ice":
      return "bg-[#85FFFF]";
    case "fighting":
      return "bg-[#B83F1D]";
    case "ground":
      return "bg-[#EBBD6C]";
    case "rock":
      return "bg-[#CF8E17]";
    case "normal":
      return "bg-[#E0DBC5]";
    case "dragon":
      return "bg-[#B669E0]";
  }
};
