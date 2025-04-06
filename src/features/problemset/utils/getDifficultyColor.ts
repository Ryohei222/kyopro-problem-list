export const getDifficultyColor = (difficulty: number) => {
  if (difficulty < 400) {
    return "bg-gray-400";
  }
  if (difficulty < 800) {
    return "bg-amber-800";
  }
  if (difficulty < 1200) {
    return "bg-green-600";
  }
  if (difficulty < 1600) {
    return "bg-cyan-500";
  }
  if (difficulty < 2000) {
    return "bg-blue-600";
  }
  if (difficulty < 2400) {
    return "bg-yellow-400";
  }
  if (difficulty < 2800) {
    return "bg-orange-500";
  }
  return "bg-red-600";
};
