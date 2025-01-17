import { components } from '@/api';
import { getInvoiceOverdueDays } from '@/components/payables/utils/getInvoiceOverdueDays';
import { createDayPluralForm } from '@/components/receivables/InvoiceDetails/ExistingInvoiceDetails/components/reminderCardTermsHelpers';
import { useDateFormat } from '@/utils/MoniteOptions';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Box, Typography } from '@mui/material';

interface DueDateCellProps {
  data:
    | components['schemas']['PayableResponseSchema']
    | components['schemas']['ReceivableResponse'];
}

export const DueDateCell = ({ data }: DueDateCellProps) => {
  const { i18n } = useLingui();
  const dateFormat = useDateFormat();

  if (!data.due_date) return null;

  const formattedDate = i18n.date(new Date(data.due_date), dateFormat);
  const overdueDays = getInvoiceOverdueDays(data);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      height="inherit"
      justifyContent="center"
    >
      <Typography
        variant="body2"
        color={overdueDays > 0 ? 'error' : 'text.primary'}
      >
        {formattedDate}
      </Typography>
      {overdueDays > 0 && (
        <Typography
          variant="caption"
          color="error"
          fontWeight="bold"
          fontSize="small"
        >
          {t(i18n)`${overdueDays} ${createDayPluralForm(
            i18n,
            overdueDays
          )} overdue`}
        </Typography>
      )}
    </Box>
  );
};
