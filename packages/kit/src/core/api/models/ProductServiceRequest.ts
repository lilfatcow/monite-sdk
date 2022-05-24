/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Price } from './Price';

export type ProductServiceRequest = {
    /**
     * Name of the product.
     */
    name: string;
    /**
     * Description of the product.
     */
    description?: string;
    price?: Price;
    /**
     * The unique ID reference of the unit used to measure the quantity of this product (e.g. items, meters, kilograms).
     */
    measure_unit_id: string;
    /**
     * The list of unique ID references of VAT classes for the product.
     */
    vat_classes: Array<string>;
    /**
     * The smallest amount allowed for this product.
     */
    smallest_amount?: number;
};
