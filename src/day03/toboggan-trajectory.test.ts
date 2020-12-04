import { getLargeInput } from "./fixture";
import { countTreesPartOne, countTreesPartTwo } from "./toboggan-trajectory";

describe("Toboggan Trajectory", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should encounter 7 trees", () => {
        const input = `..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#`;
        const output = countTreesPartOne(input);

        expect(output).toEqual(7);
      });
    });

    describe("when the input is large", () => {
      it("should encounter 173 trees", () => {
        const input = getLargeInput();
        const output = countTreesPartOne(input);

        expect(output).toEqual(173);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should multiply and get 336", () => {
        const input = `..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#`;
        const trajectories = [
          { x: 1, y: 1 },
          { x: 3, y: 1 },
          { x: 5, y: 1 },
          { x: 7, y: 1 },
          { x: 1, y: 2 },
        ];
        const output = countTreesPartTwo(input, trajectories);

        expect(output).toEqual(336);
      });
    });

    describe("when the input is large", () => {
      it("should multiply and get 4385176320", () => {
        const input = getLargeInput();
        const trajectories = [
          { x: 1, y: 1 },
          { x: 3, y: 1 },
          { x: 5, y: 1 },
          { x: 7, y: 1 },
          { x: 1, y: 2 },
        ];
        const output = countTreesPartTwo(input, trajectories);

        expect(output).toEqual(4385176320);
      });
    });
  });
});
