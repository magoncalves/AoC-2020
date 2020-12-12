import {
  findEncryptionWeakness,
  getNumberNotMatchingPreamble,
} from "./encoding-error";
import { getLargeInput } from "./fixture";

describe("Encoding Error", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should return the first number which is not the sum of its previous", () => {
        const PREAMBLE = 5;
        const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
        const output = getNumberNotMatchingPreamble(input, PREAMBLE);

        expect(output).toEqual(127);
      });
    });

    describe("when the input is large", () => {
      it("should return the first number which is not the sum of its previous", () => {
        const input = getLargeInput();
        const output = getNumberNotMatchingPreamble(input);

        expect(output).toEqual(15690279);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should find the encryption weakness", () => {
        const PREAMBLE = 5;
        const input = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;
        const output = findEncryptionWeakness(input, PREAMBLE);

        expect(output).toEqual(62);
      });
    });

    describe("when the input is large", () => {
      it("should find the encryption weakness", () => {
        const input = getLargeInput();
        const output = findEncryptionWeakness(input);

        expect(output).toEqual(2174232);
      });
    });
  });
});
