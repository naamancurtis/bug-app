import React from 'react';
import { Wrapper, Button } from './form.styles';
import FormInput from '../../atoms/inline-form-input/inline-form-input.component';
import { ButtonIcons } from '../../atoms/button/button.component';
import { Form, FormTypes } from '../../models/form';

type Props<F extends Form<T>, T extends FormTypes> = {
  data: T;
  form: F[];
  submitForm: () => void;
  updateForm: (key: keyof T, value: any) => void;
  showButton: boolean;
};

type FormValue<T> = T[keyof T];

const FormComponent = <F extends Form<T>, T extends FormTypes>({
  data,
  form,
  submitForm,
  updateForm,
  showButton,
}: Props<F, T>) => {
  const getValue = (key: keyof T): FormValue<T> => {
    return data[key];
  };

  return (
    <Wrapper>
      {form.map((control: Form<T>) => (
        <FormInput
          key={control.key}
          inputKey={control.key}
          labelText={control.labelText}
          type={control.type}
          formValue={getValue(control.key)}
          updateProperty={updateForm}
        />
      ))}
      {showButton ? (
        <Button
          text="Create new project!"
          icon={ButtonIcons.PLUS}
          onClick={submitForm}
        />
      ) : null}
    </Wrapper>
  );
};

export default FormComponent;
