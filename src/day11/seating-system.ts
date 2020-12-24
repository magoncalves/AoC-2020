import { clone, equals, pipe } from "ramda";

type Position = { row: number; column: number };

const getSeatsLayout = (input: string): string[][] =>
  input.split("\n").map((rows) => rows.split(""));

const getSeatsPositions = (seatsLayout: string[][], type) =>
  seatsLayout
    .map((row) =>
      row
        .map((r, i) => ({ position: i, value: r }))
        .filter((r) => r.value === type)
    )
    .reduce(
      (acc, cur, index) => [
        ...acc,
        ...cur.map((c) => ({ row: index, column: c.position })),
      ],
      []
    );

const getAdjacents = (seatsLayout: string[][], position: Position) => {
  const adjacents = [
    { row: position.row - 1, column: position.column - 1, refersTo: position },
    { row: position.row - 1, column: position.column, refersTo: position },
    { row: position.row - 1, column: position.column + 1, refersTo: position },
    { row: position.row, column: position.column - 1, refersTo: position },
    { row: position.row, column: position.column + 1, refersTo: position },
    { row: position.row + 1, column: position.column - 1, refersTo: position },
    { row: position.row + 1, column: position.column, refersTo: position },
    { row: position.row + 1, column: position.column + 1, refersTo: position },
  ];

  return adjacents
    .filter(
      (a) =>
        a.row >= 0 &&
        a.row < seatsLayout.length &&
        a.column >= 0 &&
        a.column < seatsLayout[0].length
    )
    .map((a) => ({ ...a, value: seatsLayout[a.row][a.column] }));
};

const getTopLeftAdjacents = (position: Position, seatsLayout: string[][]) => {
  const topLeftAdjacents = [];
  for (
    let i = position.row - 1, j = position.column - 1;
    i >= 0 && j >= 0;
    i--, j--
  ) {
    if (seatsLayout[i][j] === ".") {
      continue;
    }

    topLeftAdjacents.push({ row: i, column: j, refersTo: position });
    break;
  }

  return topLeftAdjacents;
};
const getTopAdjacents = (position: Position, seatsLayout: string[][]) => {
  const topAdjacents = [];
  for (let i = position.row - 1; i >= 0; i--) {
    if (seatsLayout[i][position.column] === ".") {
      continue;
    }

    topAdjacents.push({ row: i, column: position.column, refersTo: position });
    break;
  }

  return topAdjacents;
};
const getTopRightAdjacents = (position: Position, seatsLayout: string[][]) => {
  const topRightAdjacents = [];
  for (
    let i = position.row - 1, j = position.column + 1;
    i >= 0 && j < seatsLayout[0].length;
    i--, j++
  ) {
    if (seatsLayout[i][j] === ".") {
      continue;
    }

    topRightAdjacents.push({ row: i, column: j, refersTo: position });
    break;
  }

  return topRightAdjacents;
};
const getLeftAdjacents = (position: Position, seatsLayout: string[][]) => {
  const leftAdjacents = [];
  for (let j = position.column - 1; j >= 0; j--) {
    if (seatsLayout[position.row][j] === ".") {
      continue;
    }

    leftAdjacents.push({ row: position.row, column: j, refersTo: position });
    break;
  }

  return leftAdjacents;
};
const getRightAdjacents = (position: Position, seatsLayout: string[][]) => {
  const rightAdjacents = [];
  for (let j = position.column + 1; j < seatsLayout[0].length; j++) {
    if (seatsLayout[position.row][j] === ".") {
      continue;
    }

    rightAdjacents.push({ row: position.row, column: j, refersTo: position });
    break;
  }

  return rightAdjacents;
};
const getBottomLeftAdjacents = (
  position: Position,
  seatsLayout: string[][]
) => {
  const bottomLeftAdjacents = [];
  for (
    let i = position.row + 1, j = position.column - 1;
    i < seatsLayout.length && j >= 0;
    i++, j--
  ) {
    if (seatsLayout[i][j] === ".") {
      continue;
    }

    bottomLeftAdjacents.push({ row: i, column: j, refersTo: position });
    break;
  }

  return bottomLeftAdjacents;
};
const getBottomAdjacents = (position: Position, seatsLayout: string[][]) => {
  const bottomAdjacents = [];
  for (let i = position.row + 1; i < seatsLayout.length; i++) {
    if (seatsLayout[i][position.column] === ".") {
      continue;
    }

    bottomAdjacents.push({
      row: i,
      column: position.column,
      refersTo: position,
    });
    break;
  }

  return bottomAdjacents;
};
const getBottomRightAdjacents = (
  position: Position,
  seatsLayout: string[][]
) => {
  const bottomRightAdjacents = [];
  for (
    let i = position.row + 1, j = position.column + 1;
    i < seatsLayout.length && j < seatsLayout[0].length;
    i++, j++
  ) {
    if (seatsLayout[i][j] === ".") {
      continue;
    }

    bottomRightAdjacents.push({ row: i, column: j, refersTo: position });
    break;
  }

  return bottomRightAdjacents;
};

const getAdjacentsPartTwo = (seatsLayout: string[][], position: Position) => {
  const adjacents = [
    getTopLeftAdjacents(position, seatsLayout),
    getTopAdjacents(position, seatsLayout),
    getTopRightAdjacents(position, seatsLayout),
    getLeftAdjacents(position, seatsLayout),
    getRightAdjacents(position, seatsLayout),
    getBottomLeftAdjacents(position, seatsLayout),
    getBottomAdjacents(position, seatsLayout),
    getBottomRightAdjacents(position, seatsLayout),
  ].flat();

  return adjacents.map((a) => ({ ...a, value: seatsLayout[a.row][a.column] }));
};

const emptySeats = (
  seatsLayout: string[][],
  occupiedSeatsPositions
): string[][] => {
  if (!occupiedSeatsPositions.length) {
    return seatsLayout;
  }

  const adjacents = occupiedSeatsPositions.map((seat) =>
    getAdjacents(seatsLayout, seat)
  );
  const seatsWithFourOrMoreAdjacents = adjacents
    .map((a) => a.filter((f) => f.value === "#"))
    .filter((a) => a.length >= 4)
    .map((a) => a[0].refersTo);

  const newLayout = clone(seatsLayout);
  seatsWithFourOrMoreAdjacents.forEach((position) => {
    newLayout[position.row][position.column] = "L";
  });

  return newLayout;
};

const occupySeats = (
  seatsLayout: string[][],
  emptiedSeatsPositions
): string[][] => {
  if (!emptiedSeatsPositions.length) {
    return seatsLayout;
  }

  const adjacents = emptiedSeatsPositions.map((seat) =>
    getAdjacents(seatsLayout, seat)
  );
  const seatsWithNoOccupiedAdjacents = adjacents
    .map((a) => a.filter((f) => f.value !== "#"))
    .filter((a, i) => a.length === adjacents[i].length)
    .map((a) => a[0].refersTo);

  const newLayout = clone(seatsLayout);
  seatsWithNoOccupiedAdjacents.forEach((position) => {
    newLayout[position.row][position.column] = "#";
  });

  return newLayout;
};

const emptySeatsPartTwo = (
  seatsLayout: string[][],
  occupiedSeatsPositions
): string[][] => {
  if (!occupiedSeatsPositions.length) {
    return seatsLayout;
  }

  const adjacents = occupiedSeatsPositions.map((seat) =>
    getAdjacentsPartTwo(seatsLayout, seat)
  );
  const seatsWithFourOrMoreAdjacents = adjacents
    .map((a) => a.filter((f) => f.value === "#"))
    .filter((a) => a.length >= 5)
    .map((a) => a[0].refersTo);

  const newLayout = clone(seatsLayout);
  seatsWithFourOrMoreAdjacents.forEach((position) => {
    newLayout[position.row][position.column] = "L";
  });

  return newLayout;
};

const occupySeatsPartTwo = (
  seatsLayout: string[][],
  emptiedSeatsPositions
): string[][] => {
  if (!emptiedSeatsPositions.length) {
    return seatsLayout;
  }

  const adjacents = emptiedSeatsPositions.map((seat) =>
    getAdjacentsPartTwo(seatsLayout, seat)
  );
  const seatsWithNoOccupiedAdjacents = adjacents
    .map((a) => a.filter((f) => f.value !== "#"))
    .filter((a, i) => a.length === adjacents[i].length)
    .map((a) => a[0].refersTo);

  const newLayout = clone(seatsLayout);
  seatsWithNoOccupiedAdjacents.forEach((position) => {
    newLayout[position.row][position.column] = "#";
  });

  return newLayout;
};

const applyRules = (seatsLayout: string[][]): string[][] => {
  const occupiedSeatsPositions = getSeatsPositions(seatsLayout, "#");
  const emptySeatsPositions = getSeatsPositions(seatsLayout, "L");

  const emptiedSeats = emptySeats(seatsLayout, occupiedSeatsPositions);
  const occupiedSeats = occupySeats(emptiedSeats, emptySeatsPositions);

  if (equals(seatsLayout, occupiedSeats)) {
    return occupiedSeats;
  }

  return applyRules(occupiedSeats);
};

const applyRulesPartTwo = (seatsLayout: string[][]): string[][] => {
  const occupiedSeatsPositions = getSeatsPositions(seatsLayout, "#");
  const emptySeatsPositions = getSeatsPositions(seatsLayout, "L");

  const emptiedSeats = emptySeatsPartTwo(seatsLayout, occupiedSeatsPositions);
  const occupiedSeats = occupySeatsPartTwo(emptiedSeats, emptySeatsPositions);

  if (equals(seatsLayout, occupiedSeats)) {
    return occupiedSeats;
  }

  return applyRulesPartTwo(occupiedSeats);
};

const countSeats = (seatType: string) => (seatsLayout: string[][]): number =>
  seatsLayout.reduce(
    (acc, cur) => acc + cur.filter((seat) => seat === seatType).length,
    0
  );

export const countSeatsOccupied = (input: string): any => {
  const seatsOccupied = pipe(
    getSeatsLayout,
    applyRules,
    countSeats("#")
  )(input);

  return seatsOccupied;
};

export const countSeatsOccupiedPartTwo = (input: string): any => {
  const seatsOccupied = pipe(
    getSeatsLayout,
    applyRulesPartTwo,
    countSeats("#")
  )(input);

  return seatsOccupied;
};
