import { PhoneValidator } from "../types";
import { validatePL } from "./pl";
import { validateUS } from "./us";
import { validateGB } from "./gb";
import { validateSA } from "./sa";
import { validateFR } from "./fr";
import { validateDE } from "./de";
import { validateIN } from "./in";
import { validateCA } from "./ca";
import { validateAU } from "./au";
import { validateGeneric } from "./generic";

/**
 * Registry of all available phone validators.
 *
 * This object uses TypeScript's `satisfies` keyword to ensure:
 * - All validators conform to the PhoneValidator type
 * - Type inference works automatically for country codes
 * - No manual maintenance of country code types needed
 *
 * To add a new country:
 * 1. Create a new file (e.g., de.ts) with a validator function
 * 2. Import it here
 * 3. Add it to the validators object below
 *
 * TypeScript will automatically update the AvailableCountryCode type.
 */
export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
  sa: validateSA,
  fr: validateFR,
  de: validateDE,
  in: validateIN,
  ca: validateCA,
  au: validateAU,
} satisfies Record<string, PhoneValidator>;

/**
 * Generic validator used as fallback for countries without specific validators.
 */
export { validateGeneric };

/**
 * Automatically inferred type of all available country codes.
 * This type is derived from the keys of the validators object,
 * so it's always in sync with the actual validators.
 */
export type AvailableCountryCode = keyof typeof validators;
