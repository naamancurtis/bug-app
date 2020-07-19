import React, { FC } from 'react';
import { Wrapper } from './project.styles';
import FormInput from '../../atoms/inline-form-input/inline-form-input.component';
import { InputTypes as FormInputTypes } from '../../atoms/inline-form-input/inline-form-input.types';

type Props = {};

const Project: FC<Props> = () => {
  return (
    <Wrapper>
      <FormInput labelText={'Text'} formValue="1" type={FormInputTypes.TEXT} />
      <FormInput
        labelText={'Select'}
        formValue="1"
        type={FormInputTypes.SELECT}
      />
      <FormInput
        labelText={'Area'}
        formValue="12345"
        type={FormInputTypes.TEXTAREA}
      />
    </Wrapper>
  );
};

export default Project;
