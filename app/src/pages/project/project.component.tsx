import React, { FC } from 'react';
import { Wrapper } from './project.styles';
import FormInput, {
  InputTypes,
} from '../../atoms/inline-form-input/inline-form-input.component';

type Props = {};

const Project: FC<Props> = () => {
  return (
    <Wrapper>
      <FormInput labelText={'Text'} formValue="1" type={InputTypes.TEXT} />
      <FormInput labelText={'Select'} formValue="1" type={InputTypes.SELECT} />
      <FormInput
        labelText={'Area'}
        formValue="12345"
        type={InputTypes.TEXTAREA}
      />
    </Wrapper>
  );
};

export default Project;
