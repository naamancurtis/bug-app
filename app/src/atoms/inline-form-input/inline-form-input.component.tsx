import React, { FC, useState, useEffect, useRef } from 'react';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
} from './inline-form-input.styles';
import ReadOnlySelect from '../readonly-select/readonly-select.component';

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  TEXTAREA = 'textarea',
  SELECT = 'select',
}

type FormInputTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

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
      <FormLabel id={labelText}>{labelText}</FormLabel>
      {type === InputTypes.TEXTAREA ? (
        <FormTextArea
          ref={(instance) => (inputRef.current = instance)}
          aria-labelledby={labelText}
          onChange={handleOnChange}
          onClick={handleOnClick}
          onBlur={() => handleOnBlur()}
          readOnly={isReadOnly}
          value={value}
          cols={cols}
          rows={rows || 3}
        />
      ) : type === InputTypes.SELECT ? (
        <ReadOnlySelect
          ref={(instance: HTMLSelectElement | null) =>
            (inputRef.current = instance)
          }
          aria-labelledby={labelText}
          onChange={handleOnChange}
          onClick={handleOnClick}
          onBlur={() => handleOnBlur()}
          isReadOnly={isReadOnly}
          formValue={value}
        />
      ) : (
        <FormInput
          ref={(instance) => (inputRef.current = instance)}
          aria-labelledby={labelText}
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
