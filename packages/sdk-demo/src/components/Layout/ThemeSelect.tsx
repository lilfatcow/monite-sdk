import React from 'react';

import { ThemeConfig } from '@/types';
import type { I18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useMenuButton } from '@monite/sdk-react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LightModeIcon from '@mui/icons-material/LightMode';
import {
  Button,
  Typography,
  Menu,
  MenuItem,
  Divider,
  FormControlLabel,
  Switch,
} from '@mui/material';

const getButtonLabel = (themeVariant: string, i18n: I18n) => {
  switch (themeVariant) {
    case 'material':
      return t(i18n)`Material UI`;
    case 'monite':
      return t(i18n)`Monite`;
    default:
      return t(i18n)`Material UI`;
  }
};

interface ThemeSelectorProps {
  value: ThemeConfig;
  onChange: (themeConfig: ThemeConfig) => void;
}

export const ThemeSelect = ({ value, onChange }: ThemeSelectorProps) => {
  const { i18n } = useLingui();

  const { getButtonProps, getMenuProps, open } = useMenuButton();

  const { variant: themeVariant, mode: themeMode } = value;

  return (
    <>
      <Button
        {...getButtonProps()}
        sx={{ justifyContent: 'space-between' }}
        startIcon={themeMode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        variant="outlined"
      >
        {getButtonLabel(themeVariant, i18n)}
        <Menu {...getMenuProps()}>
          <Typography variant="body2" color="grey" pl={2} pr={2} pb={1}>{t(
            i18n
          )`Theme`}</Typography>
          <MenuItem
            selected={themeVariant === 'material'}
            onClick={() => onChange({ ...value, variant: 'material' })}
          >
            {t(i18n)`Material UI`}
          </MenuItem>
          <MenuItem
            selected={themeVariant === 'monite'}
            onClick={() => onChange({ ...value, variant: 'monite' })}
          >
            {t(i18n)`Monite`}
          </MenuItem>
          <Divider />
          <MenuItem>
            <FormControlLabel
              control={
                <Switch color="primary" checked={themeMode === 'dark'} />
              }
              label={t(i18n)`Dark Mode`}
              sx={{ ml: 0 }}
              labelPlacement="start"
              onChange={(_, checked) =>
                onChange({
                  ...value,
                  mode: checked ? 'dark' : 'light',
                })
              }
            />
          </MenuItem>
        </Menu>
      </Button>
    </>
  );
};
