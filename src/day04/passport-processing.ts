import { pipe } from "ramda";

const mandatoryFields = [
  {
    key: "byr",
    validation: (value: string): boolean => {
      return (
        value.length === 4 &&
        (parseInt(value) >= 1920 && parseInt(value) <= 2002)
      );
    },
  },
  {
    key: "iyr",
    validation: (value: string): boolean => {
      return (
        value.length === 4 &&
        (parseInt(value) >= 2010 && parseInt(value) <= 2020)
      );
    },
  },
  {
    key: "eyr",
    validation: (value: string): boolean => {
      return (
        value.length === 4 &&
        (parseInt(value) >= 2020 && parseInt(value) <= 2030)
      );
    },
  },
  {
    key: "hgt",
    validation: (value: string): boolean => {
      const matchCm = value.match(/^([0-9]+)(cm)$/);
      const matchIn = value.match(/^([0-9]+)(in)$/);

      if (matchCm) {
        return parseInt(matchCm[1]) >= 150 && parseInt(matchCm[1]) <= 193;
      }
      if (matchIn) {
        return parseInt(matchIn[1]) >= 59 && parseInt(matchIn[1]) <= 76;
      }
    },
  },
  {
    key: "hcl",
    validation: (value: string): boolean =>
      Boolean(value.match(/^#[0-9a-f]{6}$/)),
  },
  {
    key: "ecl",
    validation: (value: string): boolean => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value);
    },
  },
  {
    key: "pid",
    validation: (value: string): boolean => Boolean(value.match(/^[0-9]{9}$/)),
  },
];

const extractValidProps = (props: string[]): string[] =>
  props.filter((prop) => {
    const [key, value] = prop.split(":");

    const field = mandatoryFields.find((field) => field.key === key);
    return field && field.validation(value);
  });

const getPasswords = (input: string): string[] => input.split("\n\n");

const extractProps = (passwords: string[]): string[][] =>
  passwords.map((p) =>
    p
      .split("\n")
      .map((row) => row.split(" "))
      .flat()
  );

const getValidProps = (passwordProps: string[][]): string[][] =>
  passwordProps.map(extractValidProps);

const extractKeys = (passwordProps: string[][]): string[][] =>
  passwordProps.map((passProp) => passProp.map((prop) => prop.split(":")[0]));

const getValidPasswords = (passwordKeys: string[][]): boolean[] =>
  passwordKeys.map((passKey) =>
    mandatoryFields.every((field) => passKey.includes(field.key))
  );

const countValidPasswords = (validPasswords: boolean[]): number =>
  validPasswords.filter(Boolean).length;

export const countValidPassportsPartOne = (input: string): any => {
  const validPasswords = pipe(
    getPasswords,
    extractProps,
    extractKeys,
    getValidPasswords,
    countValidPasswords
  )(input);

  return validPasswords;
};

export const countValidPassportsPartTwo = (input: string): number => {
  const validPasswords = pipe(
    getPasswords,
    extractProps,
    getValidProps,
    extractKeys,
    getValidPasswords,
    countValidPasswords
  )(input);

  return validPasswords;
};
