import { getLargeInput } from "./fixture";
import {
  repairReportThreeEntries,
  repairReportTwoEntries,
} from "./report-repair";

describe("Report Repair", () => {
  describe("Part One", () => {
    describe("when the input is short", () => {
      it("should find the two entries that sum to 2020 and multiply them", () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const output = repairReportTwoEntries(input);

        expect(output).toEqual(514579);
      });
    });

    describe("when the input is much larger", () => {
      it("should find the two entries that sum to 2020 and multiply them", () => {
        const input = getLargeInput();
        const output = repairReportTwoEntries(input);

        expect(output).toEqual(691771);
      });
    });
  });

  describe("Part Two", () => {
    describe("when the input is short", () => {
      it("should find the three entries that sum to 2020 and multiply them", () => {
        const input = [1721, 979, 366, 299, 675, 1456];
        const output = repairReportThreeEntries(input);

        expect(output).toEqual(241861950);
      });
    });

    describe("when the input is much larger", () => {
      it("should find the three entries that sum to 2020 and multiply them", () => {
        const input = getLargeInput();
        const output = repairReportThreeEntries(input);

        expect(output).toEqual(232508760);
      });
    });
  });
});
