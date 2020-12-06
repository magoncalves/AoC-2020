import { pipe, startsWith } from "ramda";

const LIMITS = {
  row: 127,
  column: 7,
};
const MULTIPLIER = 8;

type PositionLookup = {
  ref: string;
  start?: number;
  end: number;
};

const extractTickets = (input: string): string[] => input.split("\n");

const splitRowsAndColumns = (tickets: string[]): string[][] =>
  tickets.map((t) => [t.slice(0, 7), t.slice(7)]);

const isFirstHalf = (key: string): boolean => key === "F" || key === "L";

const getPosition = ({ ref, start = 0, end }: PositionLookup): number => {
  if (!ref || start === end) {
    return start;
  }

  const newBoundary = Math.floor((end - start) / 2);
  if (isFirstHalf(ref[0])) {
    return getPosition({
      ref: ref.slice(1),
      start,
      end: end - newBoundary - 1,
    });
  }
  return getPosition({
    ref: ref.slice(1),
    start: newBoundary + start + 1,
    end,
  });
};

const getPositions = (rowsAndColumns: string[][]): number[][] =>
  rowsAndColumns.map((rc) => {
    const [rowRef, columnRef] = rc;
    const row = getPosition({ ref: rowRef, end: LIMITS.row });
    const column = getPosition({ ref: columnRef, end: LIMITS.column });

    return [row, column];
  });

const getSeatIDs = (positions: number[][]): number[] =>
  positions.map((p) => {
    const [row, column] = p;
    return row * MULTIPLIER + column;
  });

const getHighest = (seatIDs: number[]): number => Math.max(...seatIDs);

export const getHighestSeatID = (input: string): number => {
  const highestSeat = pipe(
    extractTickets,
    splitRowsAndColumns,
    getPositions,
    getSeatIDs,
    getHighest
  )(input);

  return highestSeat;
};

const getMissingSeatID = (seatIDs: number[]): number => {
  const sortedSeatIDs = [...seatIDs].sort();
  const seatBefore = sortedSeatIDs.find(
    (seat, index) => seat + 1 !== sortedSeatIDs[index + 1]
  );
  return seatBefore + 1;
};

export const getMySeatID = (input: string): number => {
  const highestSeat = pipe(
    extractTickets,
    splitRowsAndColumns,
    getPositions,
    getSeatIDs,
    getMissingSeatID
  )(input);

  return highestSeat;
};
