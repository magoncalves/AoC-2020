import { anyPass, pipe } from "ramda";

type AnswerGroup = {
  counter: number;
  total: number;
};

const extractGroupsAnswers = (input: string): string[] => input.split("\n\n");

const extractPeopleAnswers = (groups: string[]): string[][] =>
  groups.map((g) => g.split("\n"));

const summarizePeopleAnswers = (
  peopleAnswers: string[][]
): Map<string, AnswerGroup>[] => {
  const summary = peopleAnswers.map((answer) =>
    answer.reduce((acc, cur) => {
      cur.split("").map((a, _, arr) => {
        let counter = 0;
        if (acc.has(a)) {
          counter = acc.get(a).counter + 1;
        } else {
          counter = arr.filter((x) => x === a).length;
        }
        acc.set(a, {
          counter,
          total: answer.length,
        });
      });

      return acc;
    }, new Map())
  );

  return summary;
};

const groupUnanimous = (summary: Map<string, AnswerGroup>[]): number[] =>
  summary.reduce((acc, s) => {
    const unanimous = [...s.values()].filter((u) => u.counter === u.total);
    return [...acc, unanimous.length];
  }, []);

const concatGroupsAnswers = (groups: string[]): string[] =>
  groups.map((g) => g.replace(/\n/g, ""));

const removeDuplicates = (groupAnswers: string[]): string[][] =>
  groupAnswers.map((peopleAnswer) =>
    Array.from(
      peopleAnswer.split("").reduce((acc, answer) => {
        acc.add(answer);
        return acc;
      }, new Set<string>())
    )
  );

const countGroupAnswers = (groupsAnswers: string[][]) =>
  groupsAnswers.reduce((acc, grpAnswer) => [...acc, grpAnswer.length], []);

const countTotal = (groupsCount: number[]): number =>
  groupsCount.reduce((acc, grpCount) => acc + grpCount, 0);

export const sumYesAnswersFromAnyone = (input: string): number => {
  const yesCount = pipe(
    extractGroupsAnswers,
    concatGroupsAnswers,
    removeDuplicates,
    countGroupAnswers,
    countTotal
  )(input);

  return yesCount;
};

export const sumYesAnswersFromEveryone = (input: string): number => {
  const yesCount = pipe(
    extractGroupsAnswers,
    extractPeopleAnswers,
    summarizePeopleAnswers,
    groupUnanimous,
    countTotal
  )(input);

  return yesCount;
};
