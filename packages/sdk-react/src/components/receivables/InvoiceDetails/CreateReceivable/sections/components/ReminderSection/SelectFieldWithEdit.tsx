import { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { RHFAutocomplete } from '@/components/RHF/RHFAutocomplete';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, MenuItem } from '@mui/material';

import { ReminderDetail, ReminderDetails } from './ReminderDetail';

interface CustomSelectFieldProps {
  label: string;
  disabled?: boolean;
  options: Array<{ id: string | number; name: string }>;
  createOptionLabel: string;
  details: ReminderDetail | undefined;
  noOptionsText: string;
  name: string;
}

export const SelectFieldWithEdit = ({
  name,
  label,
  disabled,
  options,
  details,
  createOptionLabel,
  noOptionsText,
}: CustomSelectFieldProps) => {
  const { i18n } = useLingui();

  const extendedOptions = [
    { value: 'create', label: createOptionLabel },
    ...options.map(({ id, name }) => ({ value: id, label: name })),
  ];

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={10}>
        <RHFAutocomplete
          name={name}
          label={label}
          options={extendedOptions}
          disabled={disabled}
          optionKey={'value'}
          labelKey={'label'}
          noOptionsText={noOptionsText}
          // @ts-expect-error - we have to use `onChange` to handle the case when the user selects "Create a reminder preset" and to handle the case when the user selects "No payment reminders available"
          onChange={(_, data: Record<string, string> | null) => {
            if (data?.value === 'create') {
              // eslint-disable-next-line lingui/no-unlocalized-strings
              alert('You have selected Create a reminder preset');
            }
          }}
          renderOption={(props, option) => (
            <MenuItem
              {...props}
              key={option.value}
              value={option.value}
              sx={
                option.value === 'create'
                  ? {
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      color: 'primary.main',
                    }
                  : {
                      whiteSpace: 'unset',
                    }
              }
            >
              {option.value === 'create' && <AddIcon sx={{ marginRight: 1 }} />}
              {option.label}
            </MenuItem>
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          disabled={disabled}
          onClick={() => {
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alert('You have selected Edit');
          }}
          fullWidth
          style={{ height: 50 }}
        >
          {t(i18n)`Edit`}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ReminderDetails details={details} />
      </Grid>
    </Grid>
  );
};
