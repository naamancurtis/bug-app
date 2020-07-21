import { InputTypes } from '../atoms/inline-form-input/inline-form-input.types';

export type Form<M> = {
  key: keyof M;
  labelText: string;
  type: InputTypes;
};
