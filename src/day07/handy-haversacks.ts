import { pipe } from "ramda";

const sanitizeBagsRefs = (input: string): string[] =>
  input.replace(/bags/g, "bag").split("\n");

const removeExtraInfo = (bagRef: string): string[] => {
  const bagTypes = bagRef.split("bag").slice(0, -1);
  return bagTypes.map((b) =>
    b
      .trim()
      .split(" ")
      .slice(-2)
      .join(" ")
      .replace(/no other/g, "")
  );
};

const removeExtraInfoKeepingQuantity = (bagRef: string): any[] => {
  const bagTypes = bagRef.split("bag").slice(0, -1);
  return bagTypes.map((b, index) => {
    const splittedBags = b.trim().split(" ");

    if (index === 0) {
      return splittedBags
        .slice(-2)
        .join(" ")
        .replace(/no other/g, "");
    }

    const bags = splittedBags.slice(-3);
    const [quantity, ...bag] = bags;
    return { bag: bag.join(" ").replace(/no other/g, ""), quantity };
  });
};

const extractBagTypes = (bagsRef: string[]): string[][] =>
  bagsRef.map((bagRef) => removeExtraInfo(bagRef));

const extractBagTypesWithQuantity = (bagsRef: string[]): string[][] =>
  bagsRef.map((bagRef) => removeExtraInfoKeepingQuantity(bagRef));

const mapBags = (bags: string[][]): Map<string, string[]> =>
  bags.reduce((bagsMap, bagRef) => {
    const [head, ...xs] = bagRef;
    bagsMap.set(head, xs);

    return bagsMap;
  }, new Map());

const getContainers = (bagsMap: Map<string, string[]>) => {
  const buildContainers = (
    target: string[],
    bagSet: Set<string> = new Set()
  ): Set<string> => {
    const newSet = [...bagsMap].reduce((containersSet, bagMap) => {
      const [key, values] = bagMap;
      target.forEach((t) => {
        const found = values.find((v) => v === t);
        if (found) {
          containersSet.add(key);
        }
      });
      return containersSet;
    }, new Set(bagSet));

    if (newSet.size === bagSet.size) {
      return newSet;
    }

    const newItems = new Set([...newSet].filter((n) => !bagSet.has(n)));
    return buildContainers([...newItems], newSet);
  };

  return buildContainers;
};

const countBags = (bagsMap: Map<string, any[]>) => {
  const counter = (target: string): number => {
    const content = bagsMap.get(target);
    if (!content || !content.length || !content[0] || !content[0]["bag"]) {
      return 1;
    }

    return content.reduce(
      (agg, cur) => agg + parseInt(cur.quantity) * counter(cur.bag),
      1
    );
  };

  return counter;
};

export const countBagColorsContainingPartOne = (
  input: string,
  bagType: string
): number => {
  const bags = pipe(
    sanitizeBagsRefs,
    extractBagTypes,
    mapBags,
    getContainers
  )(input);

  const containersSet = bags([bagType]);
  return containersSet.size;
};

export const countBagColorsContainingPartTwo = (
  input: string,
  bagType: string
): number => {
  const bags = pipe(
    sanitizeBagsRefs,
    extractBagTypesWithQuantity,
    mapBags,
    countBags
  )(input);

  const amount = bags(bagType) - 1;
  return amount;
};
