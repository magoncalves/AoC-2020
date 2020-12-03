const getPasswordsWithPolicies = (
  input: string
): Map<string, Array<string>> => {
  const passwordsWithPolicies: Array<string> = input.split("\n");
  const passwordsWithPoliciesMap = passwordsWithPolicies.reduce(
    (
      map: Map<string, Array<string>>,
      passwordWithPolicy: string
    ): Map<string, Array<string>> => {
      const [policy, password] = passwordWithPolicy
        .split(":")
        .map((p) => p.trim());

      const passwords = [...(map.get(policy) || []), password];
      map.set(policy, passwords);

      return map;
    },
    new Map<string, Array<string>>()
  );

  return passwordsWithPoliciesMap;
};

const getPolicyCriterias = (policyDescription: string) => {
  const [ranges, value] = policyDescription.split(" ");
  const [minimum, maximum] = ranges.split("-").map((r) => parseInt(r));

  return { value, minimum, maximum };
};

export const countValidPasswordsPartOne = (input: string): number => {
  const passwordsWithPolicies = getPasswordsWithPolicies(input);
  const validPasswords = [...passwordsWithPolicies].reduce(
    (count: number, pass: [string, string[]]): number => {
      const [policyDescription, passwords] = pass;
      const { value, minimum, maximum } = getPolicyCriterias(policyDescription);

      const occurrences = passwords.reduce(
        (acc: number, password: string): number => {
          const amount = (password.match(new RegExp(value, "g")) || []).length;
          const valid = amount >= minimum && amount <= maximum ? 1 : 0;

          return acc + valid;
        },
        0
      );

      return count + occurrences;
    },
    0
  );

  return validPasswords;
};

export const countValidPasswordsPartTwo = (input: string): number => {
  const passwordsWithPolicies = getPasswordsWithPolicies(input);
  const validPasswords = [...passwordsWithPolicies].reduce(
    (count: number, pass: [string, string[]]): number => {
      const [policyDescription, passwords] = pass;
      const { value, minimum, maximum } = getPolicyCriterias(policyDescription);

      const occurrences = passwords.reduce(
        (acc: number, password: string): number => {
          const matchesMinimum = password[minimum - 1] === value;
          const matchesMaximum = password[maximum - 1] === value;

          // Logical XOR
          const isValid = matchesMinimum ? !matchesMaximum : matchesMaximum;
          const valid = isValid ? 1 : 0;

          return acc + valid;
        },
        0
      );

      return count + occurrences;
    },
    0
  );

  return validPasswords;
};
