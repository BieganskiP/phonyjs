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
import { validateAE } from "./ae";
import { validateEG } from "./eg";
import { validateES } from "./es";
import { validateIT } from "./it";
import { validateNL } from "./nl";
import { validateJP } from "./jp";
import { validateCN } from "./cn";
import { validateKR } from "./kr";
import { validateSG } from "./sg";
import { validateID } from "./id";
import { validateTR } from "./tr";
import { validatePK } from "./pk";
import { validateGR } from "./gr";
import { validateSD } from "./sd";
import { validateOM } from "./om";
import { validateQA } from "./qa";
import { validateKW } from "./kw";
import { validateBH } from "./bh";
import { validateJO } from "./jo";
import { validateYE } from "./ye";
import { validateLB } from "./lb";
import { validateIQ } from "./iq";
import { validateIE } from "./ie";
import { validateCH } from "./ch";
import { validateAT } from "./at";
import { validateBE } from "./be";
import { validateDK } from "./dk";
import { validateFI } from "./fi";
import { validateHU } from "./hu";
import { validateCZ } from "./cz";
import { validateHR } from "./hr";
import { validateRO } from "./ro";
import { validateBA } from "./ba";
import { validateAL } from "./al";
import { validateME } from "./me";
import { validateGE } from "./ge";
import { validateAM } from "./am";
import { validateKE } from "./ke";
import { validateUG } from "./ug";
import { validateSN } from "./sn";
import { validateAO } from "./ao";
import { validateZA } from "./za";
import { validateMV } from "./mv";
import { validateTH } from "./th";
import { validateMY } from "./my";
import { validateNP } from "./np";
import { validateLK } from "./lk";
import { validateHK } from "./hk";
import { validateUZ } from "./uz";
import { validateKG } from "./kg";
import { validateAF } from "./af";
import { validateCY } from "./cy";
import { validateRU } from "./ru";
import { validatePH } from "./ph";
import { validatePT } from "./pt";
import { validateSE } from "./se";
import { validateNO } from "./no";
import { validateUA } from "./ua";
import { validateBG } from "./bg";
import { validateSK } from "./sk";
import { validateSI } from "./si";
import { validateEE } from "./ee";
import { validateLV } from "./lv";
import { validateLT } from "./lt";
import { validateLU } from "./lu";
import { validateMT } from "./mt";
import { validateIS } from "./is";
import { validateRS } from "./rs";
import { validateBY } from "./by";
import { validateMD } from "./md";
import { validateMK } from "./mk";
import { validateAZ } from "./az";
import { validateMC } from "./mc";
import { validateLI } from "./li";
import { validateSM } from "./sm";
import { validateAD } from "./ad";
import { validateVA } from "./va";
import { validateXK } from "./xk";
import { validateKZ } from "./kz";
import { validateIR } from "./ir";
import { validateIL } from "./il";
import { validatePS } from "./ps";
import { validateSY } from "./sy";
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
  ae: validateAE,
  eg: validateEG,
  es: validateES,
  it: validateIT,
  nl: validateNL,
  jp: validateJP,
  cn: validateCN,
  kr: validateKR,
  sg: validateSG,
  id: validateID,
  tr: validateTR,
  pk: validatePK,
  gr: validateGR,
  sd: validateSD,
  om: validateOM,
  qa: validateQA,
  kw: validateKW,
  bh: validateBH,
  jo: validateJO,
  ye: validateYE,
  lb: validateLB,
  iq: validateIQ,
  ie: validateIE,
  ch: validateCH,
  at: validateAT,
  be: validateBE,
  dk: validateDK,
  fi: validateFI,
  hu: validateHU,
  cz: validateCZ,
  hr: validateHR,
  ro: validateRO,
  ba: validateBA,
  al: validateAL,
  me: validateME,
  ge: validateGE,
  am: validateAM,
  ke: validateKE,
  ug: validateUG,
  sn: validateSN,
  ao: validateAO,
  za: validateZA,
  mv: validateMV,
  th: validateTH,
  my: validateMY,
  np: validateNP,
  lk: validateLK,
  hk: validateHK,
  uz: validateUZ,
  kg: validateKG,
  af: validateAF,
  cy: validateCY,
  ru: validateRU,
  ph: validatePH,
  pt: validatePT,
  se: validateSE,
  no: validateNO,
  ua: validateUA,
  bg: validateBG,
  sk: validateSK,
  si: validateSI,
  ee: validateEE,
  lv: validateLV,
  lt: validateLT,
  lu: validateLU,
  mt: validateMT,
  is: validateIS,
  rs: validateRS,
  by: validateBY,
  md: validateMD,
  mk: validateMK,
  az: validateAZ,
  mc: validateMC,
  li: validateLI,
  sm: validateSM,
  ad: validateAD,
  va: validateVA,
  xk: validateXK,
  kz: validateKZ,
  ir: validateIR,
  il: validateIL,
  ps: validatePS,
  sy: validateSY,
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
