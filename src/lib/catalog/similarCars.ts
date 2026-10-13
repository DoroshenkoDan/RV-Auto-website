export const SIMILAR_CARS_LIMIT = 4;

export function pickClosestByPrice<T extends { price: number }>(
  candidates: readonly T[],
  price: number,
  limit: number,
): T[] {
  return [...candidates]
    .sort((a, b) => {
      const distance = Math.abs(a.price - price) - Math.abs(b.price - price);
      return distance !== 0 ? distance : a.price - b.price;
    })
    .slice(0, limit);
}
