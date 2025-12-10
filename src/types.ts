/**
 * Type definition for a phone validator function.
 * Can return either a boolean or a detailed ValidationResult.
 */
export type PhoneValidator = (phone: string) => ValidationResult;

/**
 * Validation result with detailed error information
 */
export interface ValidationResult {
  isValid: boolean;
  errorCode?: string;
  message?: string;
  details?: Record<string, unknown>;
}

/**
 * This type will be automatically inferred from the validators registry.
 * No need to manually maintain this list.
 */
export type CountryCode = string;
