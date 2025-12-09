# PhonyJS

> Type-safe phone number validation library with country-specific rules

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NPM Package](https://img.shields.io/npm/v/phonyjs.svg)](https://www.npmjs.com/package/phonyjs)

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

// Validate a phone number
validatePhone("us", "212-456-7890"); // true
validatePhone("pl", "123 456 789"); // true
validatePhone("gb", "07912345678"); // true

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

// TypeScript will autocomplete: "pl" | "us" | "gb"
const countryCode: AvailableCountryCode = "us";

// Type error if using unsupported country code
validatePhone("xx", "123456789"); // ❌ TypeScript error
```

### Tree-Shaking (Direct Import)

Import only the validators you need for optimal bundle size:

```typescript
import { validatePL, validateUS } from "phonyjs";

validatePL("123 456 789"); // true
validateUS("212-456-7890"); // true
```

### Access Validator Registry

For advanced use cases, you can access the validators object directly:

```typescript
import { validators } from "phonyjs";

// Get all available country codes
const countryCodes = Object.keys(validators);
console.log(countryCodes); // ["pl", "us", "gb"]

// Use validators directly
validators.us("212-456-7890"); // true
```

## Supported Countries

| Country        | Code | Format             | Example          |
| -------------- | ---- | ------------------ | ---------------- |
| Poland         | `pl` | 9 digits           | `123 456 789`    |
| United States  | `us` | 10 digits          | `(212) 456-7890` |
| United Kingdom | `gb` | 11 digits (mobile) | `07912 345678`   |

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

// Union type of all supported country codes
type AvailableCountryCode = "pl" | "us" | "gb";
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

## License

MIT © [Patryk Biegański](https://github.com/BieganskiP)

## Roadmap

- [ ] Add more country validators
- [ ] Add phone number formatting utilities
- [ ] Add phone number parsing
- [ ] Add region/carrier detection
- [ ] Improve validation rules based on real-world data
