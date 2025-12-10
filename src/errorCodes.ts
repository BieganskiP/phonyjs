/**
 * Standard error codes for phone validation
 * Use these codes on the frontend to display custom messages in any language
 */
export const ErrorCodes = {
  // Length errors
  TOO_SHORT: "TOO_SHORT",
  TOO_LONG: "TOO_LONG",

  // Format errors
  INVALID_CHARACTERS: "INVALID_CHARACTERS",
  INVALID_FORMAT: "INVALID_FORMAT",

  // Prefix/code errors
  INVALID_AREA_CODE: "INVALID_AREA_CODE",
  INVALID_MOBILE_PREFIX: "INVALID_MOBILE_PREFIX",
  INVALID_EXCHANGE_CODE: "INVALID_EXCHANGE_CODE",
  INVALID_PREFIX: "INVALID_PREFIX",

  // Country/system errors
  UNSUPPORTED_COUNTRY: "UNSUPPORTED_COUNTRY",

  // Country-specific errors
  PERSONAL_NUMBER_PREFIX: "PERSONAL_NUMBER_PREFIX", // UK 070
  MISSING_LEADING_ZERO: "MISSING_LEADING_ZERO",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

type MessageDetails = Record<string, unknown>;

/**
 * Default English error messages
 * Frontend can use errorCode to display messages in any language
 */
export const defaultMessages: Record<
  ErrorCode,
  (details: MessageDetails) => string
> = {
  [ErrorCodes.TOO_SHORT]: (details) => {
    const {
      expected,
      got,
      unit = "digits",
    } = details as {
      expected: string | number;
      got: number;
      unit?: string;
    };
    return `Too short - expected ${expected} ${unit}, got ${got}`;
  },

  [ErrorCodes.TOO_LONG]: (details) => {
    const {
      expected,
      got,
      unit = "digits",
    } = details as {
      expected: string | number;
      got: number;
      unit?: string;
    };
    return `Too long - expected ${expected} ${unit}, got ${got}`;
  },

  [ErrorCodes.INVALID_CHARACTERS]: () =>
    "Invalid characters - only digits, spaces, hyphens, parentheses, and + allowed",

  [ErrorCodes.INVALID_FORMAT]: (details) => {
    const { country } = details as { country?: string };
    return country
      ? `Invalid phone number format for ${country}`
      : "Invalid phone number format";
  },

  [ErrorCodes.INVALID_AREA_CODE]: (details) => {
    const { code, reason } = details as { code?: string; reason?: string };
    if (reason) return `Invalid area code - ${reason}`;
    if (code) return `Invalid area code: ${code}`;
    return "Invalid area code";
  },

  [ErrorCodes.INVALID_MOBILE_PREFIX]: (details) => {
    const { validPrefixes, got } = details as {
      validPrefixes?: string[];
      got?: string;
    };
    if (validPrefixes && Array.isArray(validPrefixes)) {
      return `Invalid mobile prefix - must be ${validPrefixes.join(", ")}`;
    }
    if (got) return `Invalid mobile prefix: ${got}`;
    return "Invalid mobile prefix";
  },

  [ErrorCodes.INVALID_EXCHANGE_CODE]: (details) => {
    const { code, reason } = details as { code?: string; reason?: string };
    if (reason) return `Invalid exchange code - ${reason}`;
    if (code) return `Invalid exchange code: ${code}`;
    return "Invalid exchange code";
  },

  [ErrorCodes.INVALID_PREFIX]: (details) => {
    const { validPrefixes, country } = details as {
      validPrefixes?: string[];
      country?: string;
    };
    if (validPrefixes && Array.isArray(validPrefixes)) {
      const prefixList = validPrefixes.join(", ");
      if (country)
        return `Invalid prefix - ${country} numbers must start with ${prefixList}`;
      return `Invalid prefix - must start with ${prefixList}`;
    }
    return "Invalid prefix";
  },

  [ErrorCodes.UNSUPPORTED_COUNTRY]: (details) => {
    const { code } = details as { code: string };
    return `Unsupported country code: ${code}`;
  },

  [ErrorCodes.PERSONAL_NUMBER_PREFIX]: (details) => {
    const { prefix } = details as { prefix: string };
    return `Invalid mobile prefix - ${prefix} is for personal numbers, not standard mobile`;
  },

  [ErrorCodes.MISSING_LEADING_ZERO]: (details) => {
    const { country } = details as { country?: string };
    return country
      ? `Invalid format - ${country} numbers must start with 0 (or country code for international)`
      : "Invalid format - number must start with 0";
  },
};

/**
 * Get default English message for an error code
 */
export function getMessage(
  errorCode: ErrorCode,
  details: MessageDetails = {}
): string {
  const formatter = defaultMessages[errorCode];
  return formatter ? formatter(details) : "Invalid phone number";
}
