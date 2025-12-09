# Contributing to PhonyJS

Thank you for your interest in contributing to PhonyJS! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/phonyjs.git
   cd phonyjs
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Building

```bash
npm run build
```

### Linting and Formatting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Adding a New Country Validator

Adding support for a new country is straightforward. Here's the process:

### 1. Create the Validator File

Create a new file in `src/validators/` with the country code as the filename:

```typescript
// src/validators/de.ts
import { PhoneValidator } from "../types";

/**
 * Validates German phone numbers.
 * 
 * Rules:
 * - Mobile numbers: 10-11 digits starting with 15, 16, or 17
 * - Non-digit characters are stripped before validation
 * 
 * @example
 * validateDE("1512 3456789") // true
 * validateDE("1712345678") // true
 */
export const validateDE: PhoneValidator = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return /^1[567]\d{9,10}$/.test(digits);
};
```

### 2. Register the Validator

Add your validator to the registry in `src/validators/index.ts`:

```typescript
import { validateDE } from "./de";

export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
  de: validateDE, // Add here
} satisfies Record<string, PhoneValidator>;
```

### 3. Export the Validator

Add the export to `src/index.ts` for tree-shaking:

```typescript
export { validateDE } from "./validators/de";
```

### 4. Add Tests

Create a test file in `test/` with comprehensive test cases:

```typescript
// test/de.test.ts
import { describe, test, expect } from "vitest";
import { validateDE } from "../src/validators/de";

describe("validateDE - German phone numbers", () => {
  test("should accept valid German mobile numbers", () => {
    expect(validateDE("1512 3456789")).toBe(true);
    expect(validateDE("1712345678")).toBe(true);
  });

  test("should reject invalid numbers", () => {
    expect(validateDE("1412345678")).toBe(false);
    expect(validateDE("151234567")).toBe(false);
  });
});
```

### 5. Update Documentation

Add your country to the "Supported Countries" table in `README.md`:

```markdown
| Germany | `de` | 10-11 digits | `1512 3456789` |
```

### 6. Run Tests and Build

Ensure everything works:

```bash
npm test
npm run build
```

## Validation Rules Guidelines

When creating validators:

1. **Strip non-digit characters** - Always use `.replace(/\D/g, "")` to normalize input
2. **Be specific** - Document the exact rules your validator follows
3. **Consider edge cases** - Empty strings, very long numbers, special characters
4. **Use regex** - Regular expressions are fast and readable for phone validation
5. **Add comments** - Explain complex validation logic

## Testing Guidelines

### Test Coverage

Ensure your tests cover:

- ✅ Valid phone numbers (multiple formats)
- ✅ Valid numbers with formatting (spaces, dashes, parentheses)
- ✅ Invalid numbers (wrong length, invalid patterns)
- ✅ Edge cases (empty strings, special characters only)
- ✅ Numbers with letters mixed in

### Test Structure

Use descriptive test names:

```typescript
describe("validateXX - Country phone numbers", () => {
  test("should accept valid numbers", () => {
    // Multiple examples
  });

  test("should accept numbers with formatting", () => {
    // Various formats
  });

  test("should reject invalid numbers", () => {
    // Various invalid cases
  });
});
```

## Code Style

- Use TypeScript strict mode
- Follow ESLint rules (run `npm run lint`)
- Format with Prettier (run `npm run format`)
- Add JSDoc comments for exported functions
- Use meaningful variable names

## Pull Request Process

1. **Create a branch** for your feature:
   ```bash
   git checkout -b add-validator-xx
   ```

2. **Make your changes** following the guidelines above

3. **Test thoroughly**:
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit with clear messages**:
   ```bash
   git commit -m "feat: add validator for Country XX"
   ```

5. **Push to your fork**:
   ```bash
   git push origin add-validator-xx
   ```

6. **Create a Pull Request** with:
   - Clear description of changes
   - Test results
   - Any relevant documentation updates

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions/changes
- `refactor:` - Code refactoring
- `chore:` - Maintenance tasks

Examples:
- `feat: add German phone validator`
- `fix: correct US area code validation`
- `docs: update README with new country`
- `test: add edge cases for PL validator`

## Questions or Issues?

- Open an issue on GitHub
- Tag maintainers for questions
- Check existing issues and PRs first

## Code of Conduct

Be respectful, constructive, and collaborative. We're all here to make PhonyJS better!

Thank you for contributing! 🎉

