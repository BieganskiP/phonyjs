/**
 * PhonyJS - Type-safe phone number validation library
 * 
 * A modern, extensible library for validating phone numbers with country-specific rules.
 * Built with TypeScript for maximum type safety and developer experience.
 */

// Main validation functions
export { validatePhone, validatePhoneWithFallback } from "./validatePhone";

// Validators registry (for direct access to individual validators)
export { validators, validateGeneric } from "./validators";

// Type exports for TypeScript consumers
export type { PhoneValidator } from "./types";
export type { AvailableCountryCode } from "./validators";

// Re-export individual validators for tree-shaking
export { validatePL } from "./validators/pl";
export { validateUS } from "./validators/us";
export { validateGB } from "./validators/gb";
export { validateSA } from "./validators/sa";
export { validateFR } from "./validators/fr";
export { validateDE } from "./validators/de";
export { validateIN } from "./validators/in";
export { validateCA } from "./validators/ca";
export { validateAU } from "./validators/au";

