import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, UArrowLeft, Box } from '@team-monite/ui-kit-react';

type NavHeaderProps = {
  handleBack?: () => void;
};

const NavHeader = ({ handleBack }: NavHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box height={48} ml={'-10px'}>
      <Button
        color="grey"
        leftIcon={<UArrowLeft width={24} height={24} />}
        variant="text"
        onClick={handleBack ? handleBack : () => navigate(-1)}
      >
        {t('payment:widget.back')}
      </Button>
    </Box>
  );
};

export default NavHeader;
