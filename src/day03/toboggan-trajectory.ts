import { pipe } from "ramda";

const defaultTrajectory = {
  x: 3,
  y: 1,
};

const isTree = (input: string): boolean => input === "#";

const buildArea = (input: string): string[][] =>
  input.split("\n").map((row) => row.split(""));

const getPositions = (
  area: string[][],
  trajectory = defaultTrajectory
): { area: string[][]; positions: number[][] } => {
  const maxHeight = area.length - 1;
  const maxLength = area[0].length;

  const positions = area.reduce(
    (pos) => {
      const [y, x] = pos[pos.length - 1];
      const currentY = y + trajectory.y;
      const currentX = x + trajectory.x;

      if (currentY > maxHeight) {
        return pos;
      }

      const deltaX = maxLength > currentX ? 0 : maxLength;
      return [...pos, [currentY, currentX - deltaX]];
    },
    [[0, 0]]
  );

  return { area, positions };
};

const countTrees = (trajectory: {
  area: string[][];
  positions: number[][];
}): number => {
  const { area, positions } = trajectory;

  const trees = positions.reduce((acc, slot) => {
    const [y, x] = slot;
    const counter = isTree(area[y][x]) ? 1 : 0;

    return acc + counter;
  }, 0);

  return trees;
};

export const countTreesPartOne = (input: string): number => {
  const trees = pipe(
    buildArea,
    getPositions,
    countTrees
  )(input);

  return trees;
};

export const countTreesPartTwo = (
  input: string,
  trajectories: { x: number; y: number }[]
): number => {
  const area = buildArea(input);

  const treesList = trajectories.reduce((acc, trajectory) => {
    const trees = pipe(
      getPositions,
      countTrees
    )(area, trajectory);

    return [...acc, trees];
  }, []);

  return treesList.reduce((acc, trees) => acc * trees, 1);
};
