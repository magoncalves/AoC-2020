import { getLargeInput } from "./fixture";
import {
  countValidPasswordsPartOne,
  countValidPasswordsPartTwo,
} from "./password-philosophy";

describe("Password Philosophy", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should return the amount of valid passwords", () => {
        const input = `1-3 a: abcde
          1-3 b: cdefg
          2-9 c: ccccccccc`;
        const output = countValidPasswordsPartOne(input);

        expect(output).toEqual(2);
      });
    });

    describe("when the input is large", () => {
      it("should return the amount of valid passwords", () => {
        const input = getLargeInput();
        const output = countValidPasswordsPartOne(input);

        expect(output).toEqual(515);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should return the amount of valid passwords", () => {
        const input = `1-3 a: abcde
          1-3 b: cdefg
          2-9 c: ccccccccc`;
        const output = countValidPasswordsPartTwo(input);

        expect(output).toEqual(1);
      });
    });

    describe("when the input is large", () => {
      it("should return the amount of valid passwords", () => {
        const input = getLargeInput();
        const output = countValidPasswordsPartTwo(input);

        expect(output).toEqual(711);
      });
    });
  });
});
