import { useState } from "react";

export default function useVariables(variableNames: string[]) {
  const [variables, setVariables] = useState(nameArrayToObject(variableNames));

  const updateVariable = (name: string, value: string) => {
    setVariables(current => ({
      ...current,
      [name]: value,
    }));
  }

  return {
    variables,
    updateVariable,
  };
}

function nameArrayToObject(variableNames: string[]): {[key: string]: string} {
  return variableNames.reduce(
    (prev, current) => ({...prev, [current]: ''}),
    {},
  );
}