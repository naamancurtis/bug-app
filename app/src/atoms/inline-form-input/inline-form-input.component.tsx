import React, { FC, useState, useEffect, useRef } from 'react';
import { FormGroup, FormLabel, FormInput } from './inline-form-input.styles';

type Props = {
  labelText: string;
  type: string;
  formValue: string | number;
};

const InlineFormComponent: FC<Props> = ({ labelText, formValue, type }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isReadOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState(formValue);

  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);
    }

    // @Todo - Implement clean up to submit a control if it's destroyed
    // and not disabled
  }, [formValue]);

  const handleOnBlur = () => {
    setReadOnly(true);
  };

  const handleOnClick = (e: React.MouseEvent<any, any>) => {
    e.preventDefault();
    e.stopPropagation();
    setReadOnly(false);
    inputRef?.current?.focus();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target.value);
  };

  return (
    <FormGroup onClick={handleOnClick}>
      <FormLabel>{labelText}</FormLabel>
      <FormInput
        ref={inputRef}
        onChange={handleOnChange}
        onClick={handleOnClick}
        onBlur={() => handleOnBlur()}
        readOnly={isReadOnly}
        value={value}
        type={type}
      />
    </FormGroup>
  );
};

export default InlineFormComponent;
