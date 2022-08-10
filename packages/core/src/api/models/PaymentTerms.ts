/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentTermDiscountWithDate } from './PaymentTermDiscountWithDate';
import type { TermFinalWithDate } from './TermFinalWithDate';

export type PaymentTerms = {
    id: string;
    name?: string;
    term_final: TermFinalWithDate;
    term_1?: PaymentTermDiscountWithDate;
    term_2?: PaymentTermDiscountWithDate;
};

