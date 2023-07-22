import { generateMessage } from './messageGenerator';
import {
  mockVariables,
  mockTemplate,
  mockEmptyTemplate,
  mockAllVariablesResult,
  mockVariablesWithoutPositionResult,
  mockOnlyNameVariablesResult,
  mockNoVariablesResult,
} from './messageGenearatorMock';


test('All variables have values', () => {
  const result = generateMessage(mockTemplate, mockVariables);

  expect(result).toBe(mockAllVariablesResult);
});

test('All variables except {position} have values', () => {
  const {
    position,
    ...variablesWithoutPosition
  } = mockVariables;

  const result = generateMessage(mockTemplate, variablesWithoutPosition);

  expect(result).toBe(mockVariablesWithoutPositionResult);
});

test('Only {firstname} and {lastname} variables have values', () => {
  const { firstname, lastname } = mockVariables;

  const result = generateMessage(mockTemplate, {
    firstname,
    lastname,
  });

  expect(result).toBe(mockOnlyNameVariablesResult);
});

test('Do not have variables', () => {
  const result = generateMessage(mockTemplate, {});

  expect(result).toBe(mockNoVariablesResult);
});

test('Empty template', () => {
  const result = generateMessage(mockEmptyTemplate, mockVariables);

  console.log({result});

  expect(result).toBe('');
});
