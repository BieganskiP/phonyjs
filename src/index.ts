/**
 * PhonyJS - Type-safe phone number validation library
 *
 * A modern, extensible library for validating phone numbers with country-specific rules.
 * Built with TypeScript for maximum type safety and developer experience.
 */

// Main validation functions
export {
  validatePhone,
  isValidPhone,
  validatePhoneWithFallback,
} from "./validatePhone";

// Validators registry (for direct access to individual validators)
export { validators, validateGeneric } from "./validators";

// Error codes for frontend i18n
export { ErrorCodes } from "./errorCodes";
export type { ErrorCode } from "./errorCodes";

// Type exports for TypeScript consumers
export type { PhoneValidator, ValidationResult } from "./types";
export type { AvailableCountryCode } from "./validators";

// Re-export individual validators for tree-shaking
// Europe
export { validatePL } from "./validators/europe/pl";
export { validateGB } from "./validators/europe/gb";
export { validateFR } from "./validators/europe/fr";
export { validateDE } from "./validators/europe/de";
export { validateES } from "./validators/europe/es";
export { validateIT } from "./validators/europe/it";
export { validateNL } from "./validators/europe/nl";
export { validateCH } from "./validators/europe/ch";
export { validateAT } from "./validators/europe/at";
export { validateBE } from "./validators/europe/be";
export { validateIE } from "./validators/europe/ie";
export { validateGR } from "./validators/europe/gr";
export { validateTR } from "./validators/europe/tr";
export { validateDK } from "./validators/europe/dk";
export { validateFI } from "./validators/europe/fi";
export { validateHU } from "./validators/europe/hu";
export { validateCZ } from "./validators/europe/cz";
export { validateHR } from "./validators/europe/hr";
export { validateRO } from "./validators/europe/ro";
export { validateBA } from "./validators/europe/ba";
export { validateAL } from "./validators/europe/al";
export { validateME } from "./validators/europe/me";
export { validateGE } from "./validators/europe/ge";
export { validateAM } from "./validators/europe/am";
export { validateRU } from "./validators/europe/ru";
export { validateCY } from "./validators/europe/cy";
export { validatePT } from "./validators/europe/pt";
export { validateSE } from "./validators/europe/se";
export { validateNO } from "./validators/europe/no";
export { validateUA } from "./validators/europe/ua";
export { validateBG } from "./validators/europe/bg";
export { validateSK } from "./validators/europe/sk";
export { validateSI } from "./validators/europe/si";
export { validateEE } from "./validators/europe/ee";
export { validateLV } from "./validators/europe/lv";
export { validateLT } from "./validators/europe/lt";
export { validateLU } from "./validators/europe/lu";
export { validateMT } from "./validators/europe/mt";
export { validateIS } from "./validators/europe/is";
export { validateRS } from "./validators/europe/rs";
export { validateBY } from "./validators/europe/by";
export { validateMD } from "./validators/europe/md";
export { validateMK } from "./validators/europe/mk";
export { validateAZ } from "./validators/europe/az";
export { validateMC } from "./validators/europe/mc";
export { validateLI } from "./validators/europe/li";
export { validateSM } from "./validators/europe/sm";
export { validateAD } from "./validators/europe/ad";
export { validateVA } from "./validators/europe/va";
export { validateXK } from "./validators/europe/xk";
export { validateKZ } from "./validators/europe/kz";
// Asia
export { validateSA } from "./validators/asia/sa";
export { validateAE } from "./validators/asia/ae";
export { validateQA } from "./validators/asia/qa";
export { validateKW } from "./validators/asia/kw";
export { validateBH } from "./validators/asia/bh";
export { validateOM } from "./validators/asia/om";
export { validateJO } from "./validators/asia/jo";
export { validateYE } from "./validators/asia/ye";
export { validateLB } from "./validators/asia/lb";
export { validateIQ } from "./validators/asia/iq";
export { validateIR } from "./validators/asia/ir";
export { validateIL } from "./validators/asia/il";
export { validatePS } from "./validators/asia/ps";
export { validateSY } from "./validators/asia/sy";
export { validateIN } from "./validators/asia/in";
export { validatePK } from "./validators/asia/pk";
export { validateCN } from "./validators/asia/cn";
export { validateJP } from "./validators/asia/jp";
export { validateKR } from "./validators/asia/kr";
export { validateSG } from "./validators/asia/sg";
export { validateID } from "./validators/asia/id";
export { validatePH } from "./validators/asia/ph";
export { validateTH } from "./validators/asia/th";
export { validateMY } from "./validators/asia/my";
export { validateNP } from "./validators/asia/np";
export { validateLK } from "./validators/asia/lk";
export { validateHK } from "./validators/asia/hk";
export { validateUZ } from "./validators/asia/uz";
export { validateKG } from "./validators/asia/kg";
export { validateAF } from "./validators/asia/af";
export { validateMV } from "./validators/asia/mv";
export { validateVN } from "./validators/asia/vn";
export { validateBD } from "./validators/asia/bd";
export { validateTW } from "./validators/asia/tw";
export { validateMM } from "./validators/asia/mm";
export { validateKH } from "./validators/asia/kh";
export { validateLA } from "./validators/asia/la";
export { validateBN } from "./validators/asia/bn";
export { validateMN } from "./validators/asia/mn";
export { validateMO } from "./validators/asia/mo";
export { validateBT } from "./validators/asia/bt";
export { validateTL } from "./validators/asia/tl";
export { validateKP } from "./validators/asia/kp";
export { validateTJ } from "./validators/asia/tj";
export { validateTM } from "./validators/asia/tm";
// Oceania
export { validateAU } from "./validators/oceania/au";
export { validateNZ } from "./validators/oceania/nz";
export { validateFJ } from "./validators/oceania/fj";
export { validatePG } from "./validators/oceania/pg";
export { validateSB } from "./validators/oceania/sb";
export { validateTO } from "./validators/oceania/to";
export { validateVU } from "./validators/oceania/vu";
export { validateWS } from "./validators/oceania/ws";
export { validateKI } from "./validators/oceania/ki";
export { validateMH } from "./validators/oceania/mh";
export { validateFM } from "./validators/oceania/fm";
export { validateNR } from "./validators/oceania/nr";
export { validatePW } from "./validators/oceania/pw";
export { validateTV } from "./validators/oceania/tv";
// Africa
export { validateDZ } from "./validators/africa/dz";
export { validateEG } from "./validators/africa/eg";
export { validateLY } from "./validators/africa/ly";
export { validateMA } from "./validators/africa/ma";
export { validateSD } from "./validators/africa/sd";
export { validateTN } from "./validators/africa/tn";
export { validateAO } from "./validators/africa/ao";
export { validateBF } from "./validators/africa/bf";
export { validateBJ } from "./validators/africa/bj";
export { validateBW } from "./validators/africa/bw";
export { validateCD } from "./validators/africa/cd";
export { validateCF } from "./validators/africa/cf";
export { validateCG } from "./validators/africa/cg";
export { validateCI } from "./validators/africa/ci";
export { validateCM } from "./validators/africa/cm";
export { validateCV } from "./validators/africa/cv";
export { validateDJ } from "./validators/africa/dj";
export { validateER } from "./validators/africa/er";
export { validateET } from "./validators/africa/et";
export { validateGA } from "./validators/africa/ga";
export { validateGH } from "./validators/africa/gh";
export { validateGM } from "./validators/africa/gm";
export { validateGN } from "./validators/africa/gn";
export { validateGQ } from "./validators/africa/gq";
export { validateGW } from "./validators/africa/gw";
export { validateKE } from "./validators/africa/ke";
export { validateKM } from "./validators/africa/km";
export { validateLR } from "./validators/africa/lr";
export { validateLS } from "./validators/africa/ls";
export { validateMG } from "./validators/africa/mg";
export { validateML } from "./validators/africa/ml";
export { validateMR } from "./validators/africa/mr";
export { validateMU } from "./validators/africa/mu";
export { validateMW } from "./validators/africa/mw";
export { validateMZ } from "./validators/africa/mz";
export { validateNA } from "./validators/africa/na";
export { validateNE } from "./validators/africa/ne";
export { validateNG } from "./validators/africa/ng";
export { validateRW } from "./validators/africa/rw";
export { validateSC } from "./validators/africa/sc";
export { validateSL } from "./validators/africa/sl";
export { validateSN } from "./validators/africa/sn";
export { validateSO } from "./validators/africa/so";
export { validateSS } from "./validators/africa/ss";
export { validateST } from "./validators/africa/st";
export { validateTD } from "./validators/africa/td";
export { validateTG } from "./validators/africa/tg";
export { validateTZ } from "./validators/africa/tz";
export { validateUG } from "./validators/africa/ug";
export { validateZA } from "./validators/africa/za";
export { validateZM } from "./validators/africa/zm";
export { validateZW } from "./validators/africa/zw";
// Americas
export { validateUS } from "./validators/north-america/us";
export { validateCA } from "./validators/north-america/ca";
