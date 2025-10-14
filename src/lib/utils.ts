import type { Cafe } from "$lib/types";

export function sortCafeList(cafes: Array<Cafe>) : Array<Cafe> {
  return [...cafes].sort(
    (c1,c2) =>
      new Date(c2.date).valueOf() -
      new Date(c1.date).valueOf()
  );
}
