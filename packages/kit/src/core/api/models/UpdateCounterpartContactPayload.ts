/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The contact person for an organization.
 */
export type UpdateCounterpartContactPayload = {
    /**
     * The first name of a contact person.
     */
    first_name?: string;
    /**
     * The last name of a contact person.
     */
    last_name?: string;
    /**
     * The email address of a contact person.
     */
    email?: string;
    /**
     * The phone number of a contact person
     */
    phone?: string;
    /**
     * Specifies if this contact person is the default one in case the organization has multiple contacts.
     */
    is_default?: boolean;
    /**
     * The title or honorific of a contact person. Examples: Mr., Ms., Dr., Prof.
     */
    title?: string;
};
