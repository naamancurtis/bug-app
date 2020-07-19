export type SelectOptions = {
  value: string;
  label: string | number;
};

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
}

export type FormInputTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;
