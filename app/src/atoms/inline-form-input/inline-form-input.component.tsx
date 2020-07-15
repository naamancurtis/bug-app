import React, { FC, useState, useEffect, useRef } from 'react';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
} from './inline-form-input.styles';

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
}

type FormInputTypes = HTMLInputElement | HTMLTextAreaElement;

type Props = {
  labelText: string;
  type: InputTypes;
  formValue: string | number;
  cols?: number;
  rows?: number;
};

const InlineFormComponent: FC<Props> = ({
  labelText,
  formValue,
  type,
  cols,
  rows,
}) => {
  const inputRef = useRef<FormInputTypes | null>(null);
  const [isReadOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState(formValue);

  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);
    }

    // Submit the form control if it was not read only
    return () => {
      if (isReadOnly) return;
      handleOnBlur();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleOnChange = (e: React.ChangeEvent<FormInputTypes>) => {
    setValue(e?.target.value);
  };

  return (
    <FormGroup onClick={handleOnClick}>
      <FormLabel>{labelText}</FormLabel>
      {type === InputTypes.TEXTAREA ? (
        <FormTextArea
          ref={(instance) => (inputRef.current = instance)}
          onChange={handleOnChange}
          onClick={handleOnClick}
          onBlur={() => handleOnBlur()}
          readOnly={isReadOnly}
          value={value}
          cols={cols}
          rows={rows || 3}
        />
      ) : (
        <FormInput
          ref={(instance) => (inputRef.current = instance)}
          onChange={handleOnChange}
          onClick={handleOnClick}
          onBlur={() => handleOnBlur()}
          readOnly={isReadOnly}
          value={value}
          type={type}
        />
      )}
    </FormGroup>
  );
};

export default InlineFormComponent;
