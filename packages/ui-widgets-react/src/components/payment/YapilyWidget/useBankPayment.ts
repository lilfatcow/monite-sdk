import { useState, useRef, useCallback } from 'react';

import {
  PaymentIntentWithSecrets,
  PaymentsPaymentsBank,
  PaymentsYapilyCountriesCoverageCodes,
  api__endpoints__payment_intents__schemas__AccountType,
} from '@team-monite/sdk-api';

import { getDefaultBankAccount } from '../helpers';
import { useAuthorizePaymentLink } from 'core/queries/usePayment';

type UseBankPaymentProps = {
  paymentIntent: PaymentIntentWithSecrets;
  onAuthorizePayment: (url: string) => void;
};

type UseBankPaymentReturnType = {
  currentStep: BankPaymentSteps;
  selectedBank?: PaymentsPaymentsBank;
  setSelectedBank: (bank: PaymentsPaymentsBank) => void;
  selectedCountry: PaymentsYapilyCountriesCoverageCodes;
  setSelectedCountry: (country: PaymentsYapilyCountriesCoverageCodes) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  payerName: string;
  setPayerName: (name: string) => void;
  payerIban: string;
  setPayerIban: (iban: string) => void;
  authorizePayment: () => void;
  isLoadingAuthorize: boolean;
};

export enum BankPaymentSteps {
  BANK_LIST = 'bank_list',
  PAYER_FORM = 'payer_form',
  CONFIRM = 'confirm',
}

const getSteps = (selectedBank?: PaymentsPaymentsBank) => [
  BankPaymentSteps.BANK_LIST,
  ...(selectedBank?.payer_required ? [BankPaymentSteps.PAYER_FORM] : []),
  BankPaymentSteps.CONFIRM,
];

export function useBankPayment({
  paymentIntent,
  onAuthorizePayment,
}: UseBankPaymentProps): UseBankPaymentReturnType {
  const [currentStep, setCurrentStep] = useState(BankPaymentSteps.BANK_LIST);
  const selectedBankRef = useRef<PaymentsPaymentsBank>();
  const [selectedCountry, setSelectedCountry] = useState(
    PaymentsYapilyCountriesCoverageCodes.DE
  );

  const handleNextStep = () => {
    const steps = getSteps(selectedBankRef.current);
    const nextStepIndex = steps.findIndex((step) => step === currentStep) + 1;
    setCurrentStep(steps[nextStepIndex]);
  };

  const handlePrevStep = () => {
    const steps = getSteps(selectedBankRef.current);

    const prevStepIndex = steps.findIndex((step) => step === currentStep) - 1;
    setCurrentStep(steps[prevStepIndex]);
    setPayerIban(bankAccount?.iban || '');
    setPayerName(bankAccount?.name || '');
  };

  const bankAccount = paymentIntent.payer?.bank_accounts
    ? getDefaultBankAccount(paymentIntent.payer?.bank_accounts)
    : null;

  const [payerName, setPayerName] = useState(bankAccount?.name || '');

  const [payerIban, setPayerIban] = useState(bankAccount?.iban || '');

  const setSelectedBank = (bank: PaymentsPaymentsBank) => {
    selectedBankRef.current = bank;
  };

  const authorizePaymentMutation = useAuthorizePaymentLink(
    paymentIntent.id,
    onAuthorizePayment
  );

  const authorizePayment = useCallback(async () => {
    selectedBankRef.current &&
      (await authorizePaymentMutation.mutateAsync({
        bank_id: selectedBankRef.current?.code,
        payer_account_identification: {
          type: api__endpoints__payment_intents__schemas__AccountType.IBAN,
          value: payerIban,
        },
      }));
  }, [authorizePaymentMutation]);

  return {
    currentStep,
    selectedBank: selectedBankRef.current,
    setSelectedBank,
    selectedCountry,
    setSelectedCountry,
    handleNextStep,
    handlePrevStep,
    payerName,
    setPayerName,
    payerIban,
    setPayerIban,
    authorizePayment,
    isLoadingAuthorize: authorizePaymentMutation.isLoading,
  };
}
