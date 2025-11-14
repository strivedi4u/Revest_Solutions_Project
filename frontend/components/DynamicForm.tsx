import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormField } from '@/config/formSchema';

interface DynamicFormFieldProps {
  field: FormField;
  control: any;
  errors: any;
}

export const DynamicFormField: React.FC<DynamicFormFieldProps> = ({
  field,
  control,
  errors,
}) => {
  const getFieldRules = () => {
    const rules: any = {};

    if (field.required) {
      rules.required = `${field.name} is required`;
    }

    if (field.minLength) {
      rules.minLength = {
        value: field.minLength,
        message: `Minimum ${field.minLength} characters required`,
      };
    }

    if (field.maxLength) {
      rules.maxLength = {
        value: field.maxLength,
        message: `Maximum ${field.maxLength} characters allowed`,
      };
    }

    if (field.fieldType === 'TEXT' && field.name.toLowerCase().includes('email')) {
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      };
    }

    return rules;
  };

  switch (field.fieldType) {
    case 'TEXT':
      return (
        <Controller
          name={`field_${field.id}`}
          control={control}
          rules={getFieldRules()}
          defaultValue={field.defaultValue || ''}
          render={({ field: fieldProps }) => (
            <TextField
              {...fieldProps}
              fullWidth
              label={field.name}
              variant="outlined"
              margin="normal"
              error={!!errors[`field_${field.id}`]}
              helperText={
                errors[`field_${field.id}`]
                  ? errors[`field_${field.id}`].message
                  : ''
              }
              required={field.required}
              inputProps={{
                minLength: field.minLength,
                maxLength: field.maxLength,
              }}
            />
          )}
        />
      );

    case 'LIST':
      return (
        <Controller
          name={`field_${field.id}`}
          control={control}
          rules={getFieldRules()}
          defaultValue={field.defaultValue || ''}
          render={({ field: fieldProps }) => (
            <FormControl
              fullWidth
              margin="normal"
              error={!!errors[`field_${field.id}`]}
            >
              <InputLabel>{field.name}</InputLabel>
              <Select
                {...fieldProps}
                label={field.name}
              >
                {field.listOfValues1?.map((value, index) => (
                  <MenuItem key={index} value={String(index + 1)}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {errors[`field_${field.id}`] && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors[`field_${field.id}`].message}
                </Typography>
              )}
            </FormControl>
          )}
        />
      );

    case 'RADIO':
      return (
        <Controller
          name={`field_${field.id}`}
          control={control}
          rules={getFieldRules()}
          defaultValue={field.defaultValue || ''}
          render={({ field: fieldProps }) => (
            <FormGroup>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                {field.name}
                {field.required && <span style={{ color: 'red' }}>*</span>}
              </Typography>
              <RadioGroup
                {...fieldProps}
                row
              >
                {field.listOfValues1?.map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={String(index + 1)}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
              {errors[`field_${field.id}`] && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors[`field_${field.id}`].message}
                </Typography>
              )}
            </FormGroup>
          )}
        />
      );

    default:
      return null;
  }
};
