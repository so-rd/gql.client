import { Controller, useFormContext } from 'react-hook-form';
import cuid from 'cuid';

// @mui/material dependencies
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Local dependencies
import type { DropdownProps } from './types';

export const ControlledDropdown = (props: DropdownProps) => {
  const {
    className = '',
    name,
    label,
    options = [],
    disabled = false,
    required = false,
    handleChange = () => null,
    error,
  } = props;

  /* react-hook-form */
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          size="small"
          variant="outlined"
          className={className}
          fullWidth
          error={!!error}
          required={required}
        >
          <InputLabel id={`select-${label.toLowerCase()}-label`}>
            {label}
          </InputLabel>
          <Select
            labelId={`select-${label.toLowerCase()}-label`}
            id={`select-${label.toLowerCase()}`}
            label={label}
            disabled={disabled}
            required={required}
            {...field}
          >
            {options.map((option) => (
              <MenuItem
                key={cuid()}
                value={option.value}
                onClick={() => handleChange(option)}
              >
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {error?.message && <FormHelperText>error?.message</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
