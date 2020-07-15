import React, { FC } from 'react';
import { Wrapper } from './project.styles';
import FormInput from '../../atoms/inline-form-input/inline-form-input.component';

type Props = {};

const Project: FC<Props> = () => {
  return (
    <Wrapper>
      <FormInput labelText={'Hello'} formValue="1" type="text" />
    </Wrapper>
  );
};

export default Project;
