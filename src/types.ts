/**
 * Type definition for a phone validator function.
 * Takes a phone number string and returns true if valid, false otherwise.
 */
export type PhoneValidator = (phone: string) => boolean;

/**
 * This type will be automatically inferred from the validators registry.
 * No need to manually maintain this list.
 */
export type CountryCode = string;

