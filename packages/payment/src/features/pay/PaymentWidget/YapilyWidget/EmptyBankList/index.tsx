import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from 'emotion-theming';
import { useComponentsContext } from '@team-monite/ui-widgets-react';

import {
  Text,
  UMinusCircle,
  Theme,
  Flex,
  Box,
  Button,
} from '@team-monite/ui-kit-react';

const EmptyScreen = () => {
  const { t } = useComponentsContext();
  const theme = useTheme<Theme>();
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <Flex flexDirection="column" alignItems="center">
      <Box>
        <UMinusCircle width={40} height={40} color={theme.colors.grey} />
      </Box>
      <Box padding={'0px 80px'}>
        <Text textSize="h3" textAlign="center" color={theme.colors.grey}>
          {t('payment:widget.emptyBankListTitle')}
        </Text>
        <Text textAlign="center" color={theme.colors.grey}>
          {t('payment:widget.emptyBankListContent')}
        </Text>
      </Box>
      <Box padding={'16px'}>
        <Button color="secondary" onClick={() => navigate(`/${search}`)}>
          {t('payment:widget.changeMethod')}
        </Button>
      </Box>
    </Flex>
  );
};

export default EmptyScreen;
