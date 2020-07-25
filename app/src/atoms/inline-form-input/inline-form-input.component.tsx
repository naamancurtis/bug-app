import React, { FC, useState, useEffect, useRef } from 'react';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextArea,
  FormSelect,
} from './inline-form-input.styles';
import {
  SelectOptions,
  InputTypes,
  FormInputTypes,
} from './inline-form-input.types';
import { Project } from '../../models/project';

type Props = {
  inputKey: keyof Project;
  labelText: string;
  type: InputTypes;
  formValue: any;
  updateProperty: (key: keyof Project, value: any) => void;
  cols?: number;
  rows?: number;
  selectOptions?: SelectOptions[];
};

const InlineFormComponent: FC<Props> = ({
  inputKey,
  labelText,
  formValue,
  updateProperty,
  type,
  cols,
  rows,
  selectOptions,
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
    updateProperty(inputKey, value);
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

  const createId = (s: string): string => s.replaceAll(' ', '-').toLowerCase();

  return (
    <FormGroup onClick={handleOnClick}>
      <FormLabel id={createId(labelText)}>{labelText}:</FormLabel>
      {type === InputTypes.TEXTAREA ? (
        <FormTextArea
          ref={(instance) => (inputRef.current = instance)}
          aria-labelledby={createId(labelText)}
          onChange={handleOnChange}
          onClick={handleOnClick}
          onBlur={() => handleOnBlur()}
          readOnly={isReadOnly}
          value={value}
          cols={cols}
          rows={rows || 3}
        />
      ) : type === InputTypes.SELECT ? (
        <FormSelect
          ref={(instance: HTMLSelectElement) => (inputRef.current = instance)}
          aria-labelledby={createId(labelText)}
          onChange={handleOnChange}
          onClick={handleOnClick}
          onBlur={() => handleOnBlur()}
          isReadOnly={isReadOnly}
          value={value}
          className={isReadOnly ? 'readonly' : ''}
          options={selectOptions || []}
          classNamePrefix="select"
        />
      ) : (
        <FormInput
          ref={(instance) => (inputRef.current = instance)}
          aria-labelledby={createId(labelText)}
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
