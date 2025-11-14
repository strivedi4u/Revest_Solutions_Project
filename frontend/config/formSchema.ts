export interface FormField {
  id: number;
  name: string;
  fieldType: 'TEXT' | 'LIST' | 'RADIO';
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
  required: boolean;
  listOfValues1?: string[];
}

export interface FormSchema {
  data: FormField[];
}

export const signupFormSchema: FormSchema = {
  data: [
    {
      id: 1,
      name: 'Full Name',
      fieldType: 'TEXT',
      minLength: 1,
      maxLength: 100,
      defaultValue: 'John Doe',
      required: true,
    },
    {
      id: 2,
      name: 'Email',
      fieldType: 'TEXT',
      minLength: 1,
      maxLength: 50,
      defaultValue: 'hello@mail.com',
      required: true,
    },
    {
      id: 6,
      name: 'Gender',
      fieldType: 'LIST',
      defaultValue: '1',
      required: true,
      listOfValues1: ['Male', 'Female', 'Others'],
    },
    {
      id: 7,
      name: 'Love React?',
      fieldType: 'RADIO',
      defaultValue: '1',
      required: true,
      listOfValues1: ['Yes', 'No'],
    },
  ],
};
