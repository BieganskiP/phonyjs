# PhonyJS

> Type-safe phone number validation library with country-specific rules

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Package](https://img.shields.io/npm/v/phonyjs.svg)](https://www.npmjs.com/package/phonyjs)
[![Buy Me A Coffee](https://img.shields.io/badge/☕_Support-Buy_Me_A_Coffee-orange.svg)](https://buycoffee.to/pbieganski)

**Created by [Patryk Biegański](https://github.com/BieganskiP)** | [GitHub](https://github.com/BieganskiP/phonyjs) | [NPM](https://www.npmjs.com/package/phonyjs) | [LinkedIn](https://www.linkedin.com/in/patrykbieganski)

## Features

✅ **Type-safe** - Full TypeScript support with strict typing  
✅ **Extensible** - Easy to add new country validators  
✅ **Tree-shakeable** - Import only what you need  
✅ **Zero dependencies** - Lightweight and fast  
✅ **Modern** - ESM and CJS support  
✅ **Well-tested** - Comprehensive test coverage

## Installation

```bash
npm install phonyjs
```

## Quick Start

```typescript
import { validatePhone } from "phonyjs";

// Validate phone numbers from 31 countries 🌍
validatePhone("us", "212-456-7890"); // true
validatePhone("pl", "123 456 789"); // true
validatePhone("gb", "07912345678"); // true
validatePhone("jp", "090 1234 5678"); // true
validatePhone("cn", "138 0013 8000"); // true
validatePhone("sa", "050 123 4567"); // true (Saudi Arabia)
validatePhone("qa", "3123 4567"); // true (Qatar)

// Invalid numbers return false
validatePhone("us", "invalid"); // false
```

## Usage

### Basic Validation

The main `validatePhone` function takes a country code and phone number:

```typescript
import { validatePhone } from "phonyjs";

const isValid = validatePhone("us", "+1 (212) 456-7890");
console.log(isValid); // true
```

### TypeScript Support

Full autocomplete and type checking for country codes:

```typescript
import { validatePhone, AvailableCountryCode } from "phonyjs";

// TypeScript will autocomplete all 31 supported countries:
// "pl" | "us" | "gb" | "sa" | "fr" | "de" | "in" | "ca" | "au" | "ae" | "eg" |
// "es" | "it" | "nl" | "jp" | "cn" | "kr" | "sg" | "id" | "tr" | "pk" | "gr" |
// "sd" | "om" | "qa" | "kw" | "bh" | "jo" | "ye" | "lb" | "iq"
const countryCode: AvailableCountryCode = "qa";

// Type error if using unsupported country code
validatePhone("xx", "123456789"); // ❌ TypeScript error
```

### Tree-Shaking (Direct Import)

Import only the validators you need for optimal bundle size:

```typescript
// Import only what you need - great for bundle size!
import { validatePL, validateUS, validateJP, validateCN } from "phonyjs";

validatePL("123 456 789"); // true
validateUS("212-456-7890"); // true
validateJP("090 1234 5678"); // true
validateCN("138 0013 8000"); // true
```

### Access Validator Registry

For advanced use cases, you can access the validators object directly:

```typescript
import { validators } from "phonyjs";

// Get all available country codes
const countryCodes = Object.keys(validators);
console.log(countryCodes); 
// ["pl", "us", "gb", "sa", "fr", "de", "in", "ca", "au", "ae", "eg",
//  "es", "it", "nl", "jp", "cn", "kr", "sg", "id", "tr", "pk", "gr",
//  "sd", "om", "qa", "kw", "bh", "jo", "ye", "lb", "iq"]

// Use validators directly
validators.us("212-456-7890"); // true
validators.jp("090 1234 5678"); // true
validators.qa("3123 4567"); // true
validators.tr("+90 532 123 4567"); // true
```

## Supported Countries

**31 countries** with both mobile and landline support 🌍

### Europe (8)
| Country        | Code | Mobile Format    | Landline Format | Example          |
| -------------- | ---- | ---------------- | --------------- | ---------------- |
| Poland         | `pl` | 9 digits         | 9 digits        | `123 456 789`    |
| United Kingdom | `gb` | 07[1-9] + 8 digits | 01/02 + 9 digits | `07912 345678`   |
| France         | `fr` | 06/07 + 8 digits | 01-05 + 8 digits | `06 12 34 56 78` |
| Germany        | `de` | 015/016/017 + 7-9 | 0[2-9] + 8-10   | `0151 12345678`  |
| Spain          | `es` | 6/7 + 8 digits   | 8/9 + 8 digits  | `612 345 678`    |
| Italy          | `it` | 3 + 9 digits     | 0 + 8-9 digits  | `312 345 6789`   |
| Netherlands    | `nl` | 06 + 8 digits    | 0[1-5] + 8-9    | `06 1234 5678`   |
| Greece         | `gr` | 69x + 7 digits   | 2x + 8 digits   | `690 123 4567`   |

### North America (2)
| Country        | Code | Mobile Format    | Landline Format | Example          |
| -------------- | ---- | ---------------- | --------------- | ---------------- |
| United States  | `us` | 10 digits        | 10 digits       | `(212) 456-7890` |
| Canada         | `ca` | 10 digits        | 10 digits       | `416-123-4567`   |

### Middle East (13) 🏆 **Complete GCC + Levant**
| Country        | Code | Mobile Format    | Landline Format | Example          |
| -------------- | ---- | ---------------- | --------------- | ---------------- |
| Saudi Arabia   | `sa` | 05[034689] + 7   | 01[123467] + 7  | `050 123 4567`   |
| UAE            | `ae` | 05[024568] + 7   | 0[234679] + 7   | `050 123 4567`   |
| Qatar          | `qa` | 3/5/6/7 + 7 digits | 4 + 7 digits  | `3123 4567`      |
| Kuwait         | `kw` | 5/6/9 + 7 digits | 2 + 7 digits    | `5123 4567`      |
| Bahrain        | `bh` | 3 + 7 digits     | 1/7 + 7 digits  | `3123 4567`      |
| Oman           | `om` | 7/9 + 7 digits   | 2 + 7 digits    | `7123 4567`      |
| Egypt          | `eg` | 01[0125] + 8     | 0[2-9] + 7-8    | `010 1234 5678`  |
| Turkey         | `tr` | 05xx + 8 digits  | 02-04xx + 7     | `0532 123 4567`  |
| Jordan         | `jo` | 7 + 8 digits     | Area codes      | `7 9123 4567`    |
| Lebanon        | `lb` | 3/7/8 + 6-7      | Area codes      | `3 123 456`      |
| Iraq           | `iq` | 7 + 9 digits     | Area codes      | `7812 345 678`   |
| Yemen          | `ye` | 7 + 8 digits     | Area codes      | `7 1234 5678`    |
| Sudan          | `sd` | 9x + 7 digits    | Area codes      | `091 234 5678`   |

### Asia-Pacific (8)
| Country        | Code | Mobile Format    | Landline Format | Example          |
| -------------- | ---- | ---------------- | --------------- | ---------------- |
| India          | `in` | [6-9] + 9 digits | 0 + area + 6-8  | `98765 43210`    |
| Pakistan       | `pk` | 03[0-4] + 8      | Area codes      | `0300 1234567`   |
| Australia      | `au` | 04 + 8 digits    | 0[2378] + 8     | `04 1234 5678`   |
| Japan          | `jp` | 0[789]0 + 8      | 0[1-9] + 8-9    | `090 1234 5678`  |
| China          | `cn` | 1[3-9] + 9       | 0[1-9] + 8-10   | `138 0013 8000`  |
| South Korea    | `kr` | 010 + 7-8        | 0[2-9] + 6-9    | `010 1234 5678`  |
| Singapore      | `sg` | 8/9 + 7 digits   | 6 + 7 digits    | `8123 4567`      |
| Indonesia      | `id` | 08 + 8-11        | 0[1-79] + 7-9   | `0812 3456 7890` |

### Coverage Stats
- 🌍 **Countries**: 31 across 4 continents
- 👥 **Population**: 3.5+ billion people
- 💼 **Tech Hubs**: All major markets covered
- 🏆 **Complete Regions**: All GCC countries, Complete Levant
- 🚀 **Top Markets**: China, India, USA, Indonesia, Pakistan

## Validation Rules

### Poland (`pl`)

- Must contain exactly 9 digits
- Formatting characters (spaces, dashes, etc.) are ignored

### United States (`us`)

- Must be 10 digits (or 11 if starting with '1')
- Area code cannot start with 0 or 1
- Exchange code cannot start with 0 or 1
- Formatting characters are ignored

### United Kingdom (`gb`)

- Must be 11 digits
- Must start with `07` (mobile numbers only)
- Formatting characters are ignored

## Adding New Countries

Want to add support for a new country? Here's how:

1. Create a new validator file in `src/validators/`:

```typescript
// src/validators/de.ts
import { PhoneValidator } from "../types";

export const validateDE: PhoneValidator = (phone) => {
  const digits = phone.replace(/\D/g, "");
  // German mobile numbers: 10-11 digits starting with 15, 16, or 17
  return /^1[567]\d{9,10}$/.test(digits);
};
```

2. Register it in `src/validators/index.ts`:

```typescript
import { validateDE } from "./de";

export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
  de: validateDE, // Add here
} satisfies Record<string, PhoneValidator>;
```

3. Export it in `src/index.ts`:

```typescript
export { validateDE } from "./validators/de";
```

That's it! TypeScript will automatically update the `AvailableCountryCode` type.

## API Reference

### `validatePhone(countryCode, phoneNumber)`

Validates a phone number for a specific country.

**Parameters:**

- `countryCode: AvailableCountryCode` - Two-letter country code
- `phoneNumber: string` - Phone number to validate (can include formatting)

**Returns:** `boolean` - `true` if valid, `false` otherwise

### `validators`

Object containing all validator functions, keyed by country code.

**Type:** `Record<AvailableCountryCode, PhoneValidator>`

### Types

```typescript
// Function type for validators
type PhoneValidator = (phone: string) => boolean;

// Union type of all 31 supported country codes
type AvailableCountryCode = 
  | "pl" | "us" | "gb" | "sa" | "fr" | "de" | "in" | "ca" | "au" | "ae" | "eg"
  | "es" | "it" | "nl" | "jp" | "cn" | "kr" | "sg" | "id" | "tr" | "pk" | "gr"
  | "sd" | "om" | "qa" | "kw" | "bh" | "jo" | "ye" | "lb" | "iq";
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build the library
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Testing

The library uses [Vitest](https://vitest.dev/) for testing:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Building

Uses [tsup](https://tsup.egoist.dev/) for blazing fast builds:

```bash
npm run build
```

Outputs:

- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ESM bundle
- `dist/index.d.ts` - TypeScript definitions
- Source maps for all bundles

## Contributing

Contributions are welcome! Here's how you can help:

1. Add support for new countries
2. Improve validation rules
3. Add more test cases
4. Improve documentation
5. Report bugs

Please ensure all tests pass before submitting a PR.

## Author

**Patryk Biegański**

- GitHub: [@BieganskiP](https://github.com/BieganskiP)
- LinkedIn: [in/patrykbieganski](https://www.linkedin.com/in/patrykbieganski)

Fullstack Developer specializing in JavaScript/TypeScript, ReactJS, NodeJS, NestJS, MongoDB, and MySQL.

## Support

If you find PhonyJS useful, consider supporting the project! ☕

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buycoffee.to/pbieganski)

Your support helps maintain and improve PhonyJS:
- 🌍 Adding more countries
- 🐛 Bug fixes and improvements
- 📚 Better documentation
- ✨ New features

[**☕ Buy me a coffee**](https://buycoffee.to/pbieganski) to keep this project growing!

## License

MIT © [Patryk Biegański](https://github.com/BieganskiP)

## Roadmap

- [ ] Add more country validators
- [ ] Add phone number formatting utilities
- [ ] Add phone number parsing
- [ ] Add region/carrier detection
- [ ] Improve validation rules based on real-world data
