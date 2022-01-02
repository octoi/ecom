import React from 'react';
import { TextField as TextInputField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface Props {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder: string;
  className?: string;
  required?: boolean;
  value: string | number | readonly string[] | undefined;
  onChange: (val: string) => void;
}

export const TextField: React.FC<Props> = ({
  type,
  placeholder,
  className,
  value,
  onChange,
  required,
}) => {
  return (
    <StyledTextInputField
      fullWidth
      label={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`mt-3 ${className}`}
    />
  );
};

const StyledTextInputField = styled(TextInputField)({
  '& label.Mui-focused': {
    color: '#0f172a',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0f172a ',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#0f172a',
    },
  },
});
