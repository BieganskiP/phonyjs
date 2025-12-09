# Quick Reference Guide

## 🚀 Installation & Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build library
npm run build

# Run all checks
npm test && npm run lint && npm run build
```

## 📝 Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run build` | Build the library (ESM + CJS + types) |
| `npm run lint` | Check for linting errors |
| `npm run format` | Format code with Prettier |

## 📦 Publishing

```bash
# 1. Login to NPM (first time only)
npm login

# 2. Update version
npm version patch    # 1.0.0 -> 1.0.1
npm version minor    # 1.0.0 -> 1.1.0
npm version major    # 1.0.0 -> 2.0.0

# 3. Publish
npm publish --access=public
```

## 🌍 Adding a New Country (5-Minute Guide)

### Step 1: Create Validator (2 min)

```typescript
// src/validators/de.ts
import { PhoneValidator } from "../types";

export const validateDE: PhoneValidator = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return /^1[567]\d{9,10}$/.test(digits);
};
```

### Step 2: Register It (1 min)

```typescript
// src/validators/index.ts
import { validateDE } from "./de";

export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
  de: validateDE,  // ← Add here
} satisfies Record<string, PhoneValidator>;
```

### Step 3: Export It (1 min)

```typescript
// src/index.ts
export { validateDE } from "./validators/de";
```

### Step 4: Test It (1 min)

```typescript
// test/de.test.ts
import { describe, test, expect } from "vitest";
import { validateDE } from "../src/validators/de";

describe("validateDE", () => {
  test("valid", () => {
    expect(validateDE("1512 3456789")).toBe(true);
  });
});
```

**Done!** TypeScript automatically knows about `"de"` now.

## 📚 File Locations

| What | Where |
|------|-------|
| Validators | `src/validators/*.ts` |
| Tests | `test/*.test.ts` |
| Type definitions | `src/types.ts` |
| Main API | `src/index.ts` |
| Build output | `dist/` (generated) |
| Config | `*.config.ts`, `*.json` |

## 🔍 Testing Patterns

### Valid Number Test
```typescript
test("should accept valid numbers", () => {
  expect(validateXX("123456789")).toBe(true);
  expect(validateXX("987654321")).toBe(true);
});
```

### Formatted Number Test
```typescript
test("should accept formatted numbers", () => {
  expect(validateXX("123 456 789")).toBe(true);
  expect(validateXX("123-456-789")).toBe(true);
  expect(validateXX("+XX 123 456 789")).toBe(true);
});
```

### Invalid Number Test
```typescript
test("should reject invalid numbers", () => {
  expect(validateXX("123")).toBe(false);
  expect(validateXX("12345678901234567890")).toBe(false);
  expect(validateXX("")).toBe(false);
});
```

## 💡 Usage Examples

### Basic Usage
```typescript
import { validatePhone } from 'phonyjs';

validatePhone('us', '212-456-7890'); // true
validatePhone('pl', '123 456 789');  // true
validatePhone('gb', '07912345678');  // true
```

### Tree-Shaking
```typescript
import { validateUS, validatePL } from 'phonyjs';

validateUS('212-456-7890'); // true
validatePL('123456789');    // true
```

### Type-Safe
```typescript
import { validatePhone, AvailableCountryCode } from 'phonyjs';

const country: AvailableCountryCode = 'us'; // 'pl' | 'us' | 'gb'
validatePhone(country, '212-456-7890');
```

### Direct Registry Access
```typescript
import { validators } from 'phonyjs';

Object.keys(validators); // ['pl', 'us', 'gb']
validators.us('212-456-7890'); // true
```

## 🎯 Validation Pattern

All validators follow this pattern:

```typescript
export const validateXX: PhoneValidator = (phone) => {
  // 1. Strip non-digits
  const digits = phone.replace(/\D/g, "");
  
  // 2. Test with regex
  return /^your-pattern$/.test(digits);
};
```

## 📋 Pre-Publish Checklist

- [ ] All tests pass (`npm test`)
- [ ] Build succeeds (`npm run build`)
- [ ] No linting errors (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] Version bumped

## 🐛 Troubleshooting

### TypeScript errors in IDE
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Tests not found
```bash
# Clear cache
rm -rf node_modules
npm install
```

### Build fails
```bash
# Check types
npx tsc --noEmit

# Clear and rebuild
rm -rf dist
npm run build
```

## 📊 Project Stats

- **Languages**: TypeScript (100%)
- **Dependencies**: 0 runtime, 7 dev
- **Bundle Size**: ~1KB minified
- **Test Coverage**: Comprehensive
- **Supported Countries**: 3 (PL, US, GB)

## 🔗 Important Files

- `README.md` - Main documentation
- `GETTING_STARTED.md` - Developer onboarding
- `CONTRIBUTING.md` - How to contribute
- `PROJECT_SUMMARY.md` - Complete overview
- `CHANGELOG.md` - Version history

## 🎓 Learning Path

1. **Start here**: `GETTING_STARTED.md`
2. **Read code**: `src/validators/pl.ts` (simplest example)
3. **Understand types**: `src/validators/index.ts`
4. **See tests**: `test/pl.test.ts`
5. **Contribute**: `CONTRIBUTING.md`

## ⚡ Speed Tips

- Use `npm run test:watch` during development
- Keep terminal open with test watch running
- Make changes → tests auto-run → instant feedback
- Build only when ready to test/publish

## 🎨 Code Style

- **Strict TypeScript**: No `any` types
- **Pure functions**: No side effects
- **Clear naming**: Descriptive variable names
- **JSDoc comments**: Document public APIs
- **Regex with comments**: Explain complex patterns

## 🔑 Key Concepts

### Type Inference
```typescript
// TypeScript automatically infers this:
type AvailableCountryCode = "pl" | "us" | "gb"

// From this:
const validators = { pl: ..., us: ..., gb: ... };
```

### Tree-Shaking
Consumers can import only what they need:
```typescript
// Only imports US validator code
import { validateUS } from 'phonyjs';
```

### Type Safety
```typescript
validatePhone('us', '...'); // ✅ OK
validatePhone('xx', '...'); // ❌ TypeScript error
```

---

**Need more help?** Check the other documentation files or open an issue on GitHub!

