import { getLargeInput } from "./fixture";
import {
  countSeatsOccupied,
  countSeatsOccupiedPartTwo,
} from "./seating-system";

describe("Seating System", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should count how many seats end up occupied", () => {
        const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
        const output = countSeatsOccupied(input);

        expect(output).toEqual(37);
      });
    });

    describe("when the input is large", () => {
      it("should count how many seats end up occupied", () => {
        const input = getLargeInput();
        const output = countSeatsOccupied(input);

        expect(output).toEqual(2275);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should count how many seats end up occupied", () => {
        const input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;
        const output = countSeatsOccupiedPartTwo(input);

        expect(output).toEqual(26);
      });
    });

    describe("when the input is large", () => {
      it("should count how many seats end up occupied", () => {
        const input = getLargeInput();
        const output = countSeatsOccupiedPartTwo(input);

        expect(output).toEqual(2121);
      });
    });
  });
});
