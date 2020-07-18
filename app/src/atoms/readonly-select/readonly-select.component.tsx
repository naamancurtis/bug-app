import React, { forwardRef } from 'react';
import { FormSelect, ReadOnlyText } from './readonly-select.styles';

type Props = {
  isReadOnly: boolean;
  formValue: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  onClick: (e: React.MouseEvent<any, any>) => void;
  onBlur: () => void;
};

type ReturnTypes = HTMLSelectElement;

const ReadOnlySelect = forwardRef<ReturnTypes, Props>(
  ({ isReadOnly, formValue, onChange, onClick, onBlur }, ref) => {
    return isReadOnly ? (
      <ReadOnlyText className="readonly" onClick={onClick}>
        {formValue}
      </ReadOnlyText>
    ) : (
      <FormSelect
        ref={ref}
        onChange={onChange}
        onClick={onClick}
        onBlur={() => onBlur()}
      />
    );
  },
);

export default ReadOnlySelect;
