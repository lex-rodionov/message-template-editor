import { generateMessage } from './messageGenerator';
import {
  mockVariables,
  mockTemplate,
  mockEmptyTemplate,
  mockAllVariablesResult,
  mockVariablesWithoutPositionResult,
  mockOnlyNameVariablesResult,
  mockNoVariablesResult,
  mockEmptyVariables,
} from './messageGenearatorMock';


test('All variables have values', () => {
  const result = generateMessage(mockTemplate, mockVariables);

  expect(result).toBe(mockAllVariablesResult);
});

test('All variables except {position} have values', () => {
  const result = generateMessage(mockTemplate, {
    ...mockVariables,
    position: '',
  });

  expect(result).toBe(mockVariablesWithoutPositionResult);
});

test('Only {firstname} and {lastname} variables have values', () => {
  const result = generateMessage(mockTemplate, {
    ...mockVariables,
    company: '',
    position: '',
  });

  expect(result).toBe(mockOnlyNameVariablesResult);
});

test('Do not have variables', () => {
  const result = generateMessage(mockTemplate, mockEmptyVariables);

  expect(result).toBe(mockNoVariablesResult);
});

test('Empty template', () => {
  const result = generateMessage(mockEmptyTemplate, mockVariables);

  expect(result).toBe('');
});
