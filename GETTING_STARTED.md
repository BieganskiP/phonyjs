# Getting Started with PhonyJS

This guide will help you get PhonyJS up and running quickly.

## Installation

First, install the dependencies:

```bash
npm install
```

This will install:

- TypeScript compiler
- tsup (bundler)
- Vitest (testing framework)
- ESLint & Prettier (code quality)

## Project Structure

```
phonyjs/
├── src/                      # Source code
│   ├── index.ts             # Public API exports
│   ├── types.ts             # TypeScript type definitions
│   ├── validatePhone.ts     # Main validation function
│   └── validators/          # Country-specific validators
│       ├── index.ts         # Validator registry
│       ├── pl.ts           # Poland validator
│       ├── us.ts           # US validator
│       └── gb.ts           # UK validator
├── test/                     # Test files
│   ├── pl.test.ts
│   ├── us.test.ts
│   ├── gb.test.ts
│   └── validatePhone.test.ts
├── dist/                     # Build output (generated)
├── package.json
├── tsconfig.json            # TypeScript configuration
├── tsup.config.ts           # Bundler configuration
└── vitest.config.ts         # Test configuration
```

## Development Commands

### Testing

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Building

```bash
# Build the library
npm run build
```

This creates:

- `dist/index.js` - CommonJS bundle
- `dist/index.mjs` - ES Module bundle
- `dist/index.d.ts` - TypeScript type definitions
- Source maps for debugging

### Code Quality

```bash
# Check for linting errors
npm run lint

# Format code with Prettier
npm run format
```

## Testing Your Changes

After making changes, always run:

```bash
npm test && npm run build
```

This ensures:

1. All tests pass ✅
2. The code builds without errors ✅
3. TypeScript types are correct ✅

## How the Type System Works

PhonyJS uses advanced TypeScript features for maximum type safety:

### 1. Validator Type

```typescript
type PhoneValidator = (phone: string) => boolean;
```

All validators must match this signature.

### 2. Validator Registry

```typescript
export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
} satisfies Record<string, PhoneValidator>;
```

The `satisfies` keyword ensures:

- All validators have the correct type
- TypeScript can still infer the exact keys

### 3. Automatic Type Inference

```typescript
export type AvailableCountryCode = keyof typeof validators;
// Result: "pl" | "us" | "gb"
```

This is automatically derived from the validators object, so you never need to manually update the country code type!

### 4. Type-Safe API

```typescript
export function validatePhone(
  countryCode: AvailableCountryCode,
  phoneNumber: string
): boolean;
```

TypeScript will:

- Autocomplete available country codes
- Show type errors for unsupported codes
- Provide inline documentation

## Local Testing

You can test the library locally before publishing:

### 1. Build the library

```bash
npm run build
```

### 2. Create a test project

```bash
mkdir ../test-phonyjs
cd ../test-phonyjs
npm init -y
```

### 3. Link your local library

```bash
npm link ../phonyjs
```

### 4. Test it

```javascript
// test.js
const { validatePhone } = require("phonyjs");

console.log(validatePhone("us", "212-456-7890")); // true
console.log(validatePhone("pl", "123 456 789")); // true
```

## Publishing to NPM

When you're ready to publish:

### 1. Update version

```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### 2. Login to NPM

```bash
npm login
```

### 3. Publish

```bash
npm publish --access=public
```

The `prepublishOnly` script will automatically run tests and build before publishing.

## Adding Your First Country

Let's add support for France (FR) as an example:

### Step 1: Create the validator

```typescript
// src/validators/fr.ts
import { PhoneValidator } from "../types";

export const validateFR: PhoneValidator = (phone) => {
  const digits = phone.replace(/\D/g, "");
  // French mobile: 10 digits starting with 06 or 07
  return /^0[67]\d{8}$/.test(digits);
};
```

### Step 2: Register it

```typescript
// src/validators/index.ts
import { validateFR } from "./fr";

export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
  fr: validateFR, // Add here
} satisfies Record<string, PhoneValidator>;
```

### Step 3: Export it

```typescript
// src/index.ts
export { validateFR } from "./validators/fr";
```

### Step 4: Add tests

```typescript
// test/fr.test.ts
import { describe, test, expect } from "vitest";
import { validateFR } from "../src/validators/fr";

describe("validateFR", () => {
  test("valid French mobile", () => {
    expect(validateFR("06 12 34 56 78")).toBe(true);
    expect(validateFR("07 98 76 54 32")).toBe(true);
  });

  test("invalid French numbers", () => {
    expect(validateFR("05 12 34 56 78")).toBe(false);
    expect(validateFR("06123")).toBe(false);
  });
});
```

### Step 5: Test it

```bash
npm test
npm run build
```

Done! 🎉 TypeScript automatically knows about the new `"fr"` country code.

## Tips & Best Practices

1. **Always test edge cases** - Empty strings, very long numbers, special characters
2. **Document validation rules** - Add JSDoc comments explaining the logic
3. **Keep validators pure** - No side effects, just input → output
4. **Use meaningful regex** - Comment complex patterns
5. **Test with real examples** - Use actual phone numbers from each country

## Troubleshooting

### Tests failing

```bash
# Clear cache and rerun
rm -rf node_modules
npm install
npm test
```

### Build errors

```bash
# Check TypeScript errors
npx tsc --noEmit

# Clear build cache
rm -rf dist
npm run build
```

### Type errors in IDE

```bash
# Restart TypeScript server
# VS Code: Cmd/Ctrl + Shift + P -> "TypeScript: Restart TS Server"
```

## Next Steps

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Check [README.md](README.md) for API documentation
- Look at existing validators for examples
- Add support for your country!

## Questions?

Open an issue on GitHub or check the documentation.

Happy coding! 🚀
