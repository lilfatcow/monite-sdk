import React, { ReactNode, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { components } from '@/api';
import { ReminderDetails } from '@/components/receivables/InvoiceDetails/CreateReceivable/sections/components/ReminderSection/ReminderDetail';
import { CreateReceivablesFormProps } from '@/components/receivables/InvoiceDetails/CreateReceivable/validation';
import { useMoniteContext } from '@/core/context/MoniteContext';
import { useCounterpartById, useCounterpartContactList } from '@/core/queries';
import { useIsActionAllowed } from '@/core/queries/usePermissions';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import type { SectionGeneralProps } from '../../Section.types';
import { AutocompleteWithCreateItem } from './AutocompleteWithCreateItem';

const usePaymentReminderById = (id: string | undefined) => {
  const { api } = useMoniteContext();
  return api.paymentReminders.getPaymentRemindersId.useQuery(
    { path: { payment_reminder_id: id ?? '' } },
    { enabled: !!id }
  );
};

const useOverdueReminderById = (id: string | undefined) => {
  const { api } = useMoniteContext();
  return api.overdueReminders.getOverdueRemindersId.useQuery(
    { path: { overdue_reminder_id: id ?? '' } },
    { enabled: !!id }
  );
};

const ReminderSectionContent = ({
  disabled,
  onUpdateOverdueReminder,
  onUpdatePaymentReminder,
  onCreateReminder,
}: ReminderSectionProps) => {
  const { api } = useMoniteContext();
  const { data: paymentReminders, isLoading: isPaymentRemindersLoading } =
    api.paymentReminders.getPaymentReminders.useQuery(undefined, {
      select: (data) =>
        data.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
    });
  const { data: overdueReminders, isLoading: isOverdueRemindersLoading } =
    api.overdueReminders.getOverdueReminders.useQuery(undefined, {
      select: (data) =>
        data.data.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
    });

  const { i18n } = useLingui();

  const { data: isUpdatePaymentReminderAllowed } = useIsActionAllowed({
    method: 'payment_reminder',
    action: 'update',
  });
  const { data: isUpdateOverdueReminderAllowed } = useIsActionAllowed({
    method: 'overdue_reminder',
    action: 'update',
  });
  const { data: isCreatePaymentReminderAllowed } = useIsActionAllowed({
    method: 'payment_reminder',
    action: 'create',
  });
  const { data: isCreateOverdueReminderAllowed } = useIsActionAllowed({
    method: 'overdue_reminder',
    action: 'create',
  });

  const { control, watch, resetField } =
    useFormContext<CreateReceivablesFormProps>();
  const counterpartId = watch('counterpart_id');
  const { data: paymentReminder, isLoading: isPaymentReminderLoading } =
    usePaymentReminderById(watch('payment_reminder_id'));
  const { data: overdueReminder, isLoading: isOverdueReminderLoading } =
    useOverdueReminderById(watch('overdue_reminder_id'));

  const { data: counterpart, isLoading: isCounterpartLoading } =
    useCounterpartById(counterpartId);

  const {
    data: hasCounterpartDefaultContactEmail,
    isLoading: isCounterpartDefaultContactEmailLoading,
  } = api.counterparts.getCounterpartsIdContacts.useQuery(
    {
      path: { counterpart_id: counterpartId ?? '' },
    },
    {
      enabled: Boolean(counterpart?.type === 'organization'),
      select: (data) =>
        Boolean(data.data.find((contact) => contact.is_default)?.email),
    }
  );

  const hasValidReminderEmail =
    counterpart && 'individual' in counterpart
      ? Boolean(counterpart.individual.email)
      : hasCounterpartDefaultContactEmail;

  const hasValidReminderEmailLoading =
    isCounterpartLoading || isCounterpartDefaultContactEmailLoading;

  useEffect(() => {
    if (hasValidReminderEmailLoading) return;
    if (hasValidReminderEmail && counterpart?.reminders_enabled) return;
    resetField('payment_reminder_id');
    resetField('overdue_reminder_id');
  }, [
    counterpart?.reminders_enabled,
    hasValidReminderEmail,
    hasValidReminderEmailLoading,
    resetField,
  ]);

  const paymentReminderOptions = paymentReminders?.some(
    ({ value }) => value === paymentReminder?.id
  )
    ? paymentReminders
    : [
        ...(paymentReminders ?? []),
        ...(paymentReminder
          ? [{ value: paymentReminder.id, label: paymentReminder.name }]
          : []),
      ];

  const overdueReminderOptions = overdueReminders?.some(
    ({ value }) => value === overdueReminder?.id
  )
    ? overdueReminders
    : [
        ...(overdueReminders ?? []),
        ...(overdueReminder
          ? [{ value: overdueReminder.id, label: overdueReminder.name }]
          : []),
      ];

  return (
    <>
      {!hasValidReminderEmailLoading && Boolean(counterpartId) && (
        <>
          {!counterpart?.reminders_enabled && (
            <Alert severity="warning" sx={{ mb: 2 }}>{t(
              i18n
            )`Reminders are disabled for this Counterpart.`}</Alert>
          )}
          {!hasValidReminderEmail && (
            <Alert severity="warning" sx={{ mb: 2 }}>{t(
              i18n
            )`No default email for selected Counterpart. Reminders will not be sent.`}</Alert>
          )}
        </>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectReminderLayout
            reminder={paymentReminder}
            isReminderLoading={isPaymentReminderLoading}
            updateDisabled={
              disabled || !isUpdatePaymentReminderAllowed || !paymentReminder
            }
            onUpdate={onUpdatePaymentReminder}
          >
            <AutocompleteWithCreateItem
              name="payment_reminder_id"
              label={t(i18n)`Before due date`}
              options={paymentReminderOptions}
              noOptionsText={t(i18n)`No payment reminders available`}
              disabled={
                disabled ||
                !counterpartId ||
                !hasValidReminderEmail ||
                !counterpart?.reminders_enabled
              }
              createOptionLabel={t(i18n)`Create a reminder preset`}
              createOptionDisabled={!isCreatePaymentReminderAllowed}
              onCreate={() => onCreateReminder('payment')}
              control={control}
            />
          </SelectReminderLayout>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectReminderLayout
            reminder={overdueReminder}
            isReminderLoading={isOverdueReminderLoading}
            updateDisabled={
              disabled || !isUpdateOverdueReminderAllowed || !overdueReminder
            }
            onUpdate={onUpdateOverdueReminder}
          >
            <AutocompleteWithCreateItem
              name="overdue_reminder_id"
              label={t(i18n)`Overdue reminders`}
              options={overdueReminderOptions}
              noOptionsText={t(i18n)`No overdue reminders available`}
              disabled={
                disabled ||
                !counterpartId ||
                !hasValidReminderEmail ||
                !counterpart?.reminders_enabled
              }
              createOptionLabel={t(i18n)`Create a reminder preset`}
              createOptionDisabled={!isCreateOverdueReminderAllowed}
              onCreate={() => onCreateReminder('overdue')}
              control={control}
            />
          </SelectReminderLayout>
        </Grid>
      </Grid>
    </>
  );
};

const SelectReminderLayout = ({
  children,
  reminder,
  isReminderLoading,
  updateDisabled,
  onUpdate,
}: {
  children: ReactNode;
  reminder:
    | components['schemas']['OverdueReminderResponse']
    | components['schemas']['PaymentReminderResponse']
    | undefined;
  isReminderLoading: boolean;
  updateDisabled: boolean;
  onUpdate?: () => void;
}) => {
  const { i18n } = useLingui();

  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item xs={onUpdate ? 10 : 12}>
        {children}
      </Grid>
      {onUpdate && (
        <Grid item xs={2}>
          <Button
            variant="outlined"
            disabled={updateDisabled}
            onClick={(event) => {
              event.preventDefault();
              onUpdate();
            }}
            fullWidth
            size="large"
          >
            {t(i18n)`Edit`}
          </Button>
        </Grid>
      )}
      {(isReminderLoading || reminder) && (
        <Grid item xs={12}>
          {isReminderLoading ? (
            <Skeleton variant="text" width="60%" sx={{ m: 2 }} />
          ) : reminder ? (
            <ReminderDetails reminder={reminder} />
          ) : null}
        </Grid>
      )}
    </Grid>
  );
};

interface ReminderSectionProps extends SectionGeneralProps {
  onCreateReminder: (type: 'payment' | 'overdue') => void;
  onUpdatePaymentReminder: () => void;
  onUpdateOverdueReminder: () => void;
}

export const ReminderSection = (props: ReminderSectionProps) => {
  const { i18n } = useLingui();

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{t(i18n)`Reminders`}</Typography>
      <Card variant="outlined" sx={{ borderRadius: 2 }}>
        <CardContent>
          <ReminderSectionContent {...props} />
        </CardContent>
      </Card>
    </Stack>
  );
};
