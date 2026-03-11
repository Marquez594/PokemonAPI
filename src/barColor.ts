export function barColor(stat: number) {
  if (stat <= 50) return "bg-red-500";
  else if (stat > 50 && stat <= 85) return "bg-yellow-500";
  else if (stat > 85 && stat <= 110) return "bg-green-400";
  else if (stat > 110 && stat <= 150) return "bg-green-600";
  else if (stat > 150) return "bg-blue-400";
}
