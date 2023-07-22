import { MessageTemplate } from 'types';

export const mockEmptyTemplate: MessageTemplate = {
  'header': '',
  'body': null,
  'footer': '',
  'conditionList': [],
  'selectedInput': null
}

export const mockTemplate: MessageTemplate = {
  'header': 'Hello {firstname}!\n\nI just went through your profile and I would love to join your network!',
  'body': {
      'ifId': '6f89cdba-343c-4edf-9f66-50b18deca8a8',
      'thenId': '600a2df9-31e7-421e-8a90-0ce50fc7b0bc',
      'elseId': '68ed75ef-41c3-43dd-a3c3-fd1dff80655e'
  },
  'footer': '\n\nJake\nSoftware Developer\njakelennard911@gmail.com',
  'conditionList': [
      {
          'id': '6f89cdba-343c-4edf-9f66-50b18deca8a8',
          'startText': '{company}',
          'condition': null
      },
      {
          'id': '600a2df9-31e7-421e-8a90-0ce50fc7b0bc',
          'startText': 'I know you work at {company}',
          'condition': {
              'ifId': '857ed4c4-9084-4c03-bda4-ba9816cb4f4e',
              'thenId': 'b8312c68-782d-4153-90fa-72b1b819ea78',
              'elseId': '2e7d12b4-7b78-4947-a052-015382f0e396'
          },
          'endText': ':)'
      },
      {
          'id': '68ed75ef-41c3-43dd-a3c3-fd1dff80655e',
          'startText': 'Where do you work at the moment?',
          'condition': null
      },
      {
          'id': '857ed4c4-9084-4c03-bda4-ba9816cb4f4e',
          'startText': '{position}',
          'condition': null
      },
      {
          'id': 'b8312c68-782d-4153-90fa-72b1b819ea78',
          'startText': ' as {position}. ',
          'condition': null
      },
      {
          'id': '2e7d12b4-7b78-4947-a052-015382f0e396',
          'startText': ', but what is your role?',
          'condition': null
      }
  ],
  'selectedInput': null
};

export const mockVariables = {
  'firstname': 'Bill',
  'lastname': 'Gates',
  'company': 'Gates Corp',
  'position': 'Co-chair'
};

export const mockAllVariablesResult = `Hello Bill!

I just went through your profile and I would love to join your network!
I know you work at Gates Corp as Co-chair. :)

Jake
Software Developer
jakelennard911@gmail.com`;

export const mockVariablesWithoutPositionResult = `Hello Bill!

I just went through your profile and I would love to join your network!
I know you work at Gates Corp, but what is your role?:)

Jake
Software Developer
jakelennard911@gmail.com`;

export const mockOnlyNameVariablesResult = `Hello Bill!

I just went through your profile and I would love to join your network!
Where do you work at the moment?

Jake
Software Developer
jakelennard911@gmail.com`;

export const mockNoVariablesResult = `Hello !

I just went through your profile and I would love to join your network!
Where do you work at the moment?

Jake
Software Developer
jakelennard911@gmail.com`;