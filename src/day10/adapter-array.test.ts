import {
  getNumberOfDistinctArrangements,
  getProductOfJoltDifferencesBetween,
} from "./adapter-array";
import { getLargeInput } from "./fixture";

describe("Adapter Array", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should return the product between the '1' and '3'-jolt differences", () => {
        const input = `16
10
15
5
1
11
7
19
6
12
4`;
        const output = getProductOfJoltDifferencesBetween(input, [1, 3]);

        expect(output).toEqual(35);
      });
    });

    describe("when the input is intermediate", () => {
      it("should return the product between the '1' and '3'-jolt differences", () => {
        const input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;
        const output = getProductOfJoltDifferencesBetween(input, [1, 3]);

        expect(output).toEqual(220);
      });
    });

    describe("when the input is large", () => {
      it("should return the product between the '1' and '3'-jolt differences", () => {
        const input = getLargeInput();
        const output = getProductOfJoltDifferencesBetween(input, [1, 3]);

        expect(output).toEqual(2470);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should return the number of distinct arrangements", () => {
        const input = `16
        10
        15
        5
        1
        11
        7
        19
        6
        12
        4`;
        const output = getNumberOfDistinctArrangements(input);

        expect(output).toEqual(8);
      });
    });

    describe("when the input is intermediate", () => {
      it("should return the product between the '1' and '3'-jolt differences", () => {
        const input = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;
        const output = getNumberOfDistinctArrangements(input);

        expect(output).toEqual(19208);
      });
    });

    describe("when the input is large", () => {
      it("should return the number of distinct arrangements", () => {
        const input = getLargeInput();
        const output = getNumberOfDistinctArrangements(input);

        expect(output).toEqual(1973822685184);
      });
    });
  });
});
