import {
  sumYesAnswersFromAnyone,
  sumYesAnswersFromEveryone,
} from "./custom-customs";
import { getLargeInput } from "./fixture";

describe("Custom Customs", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should sum the 'yes' answers from anyone", () => {
        const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;
        const output = sumYesAnswersFromAnyone(input);

        expect(output).toEqual(11);
      });
    });

    describe("when the input is large", () => {
      it("should sum the 'yes' answers from anyone", () => {
        const input = getLargeInput();
        const output = sumYesAnswersFromAnyone(input);

        expect(output).toEqual(6521);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should sum the 'yes' answers from everyone", () => {
        const input = `abc

a
b
c

ab
ac

a
a
a
a

b`;
        const output = sumYesAnswersFromEveryone(input);

        expect(output).toEqual(6);
      });
    });

    describe("when the input is large", () => {
      it("should sum the 'yes' answers from everyone", () => {
        const input = getLargeInput();
        const output = sumYesAnswersFromEveryone(input);

        expect(output).toEqual(3305);
      });
    });
  });
});
