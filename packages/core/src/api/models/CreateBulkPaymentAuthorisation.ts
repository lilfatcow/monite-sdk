/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Payments } from './Payments';

export type CreateBulkPaymentAuthorisation = {
    client_id: string;
    institution_id: string;
    callback?: string;
    payment_request: Payments;
};

