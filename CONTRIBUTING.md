# Contributing to LOGOS

First off, thank you for considering contributing to LOGOS. It is people like you that make open-source software and corporate engineering cultures thrive. 

The following is a set of guidelines for contributing to LOGOS and its packages. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Pull Requests](#pull-requests)
- [Development Environment Setup](#development-environment-setup)
- [Styleguides](#styleguides)
  - [Git Commit Messages](#git-commit-messages)
  - [TypeScript Coding Standards](#typescript-coding-standards)

---

## Code of Conduct

This project and everyone participating in it is governed by the [LOGOS Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to `opensource@example.com`.

---

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as GitHub issues. When creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps** to reproduce the problem.
* **Provide specific examples** to demonstrate the steps. Include links to files, or copy/paste code snippets.
* **Describe the behavior you observed** after following the steps and point out what exactly is the problem.
* **Explain which behavior you expected to see instead** and why.
* **Include your environment details** (OS, Node.js version, browser version).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When you create an enhancement suggestion, please:

* **Provide a clear and descriptive title**.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples** to demonstrate the steps.
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Explain why this enhancement would be useful** to most LOGOS users.

### Pull Requests

The process described here ensures a high standard of code quality and architectural integrity:

1. **Fork the repo** and create your branch from `main`.
2. **Update documentation** if you've changed APIs or UI behaviors.
3. **Ensure the test suite passes**. Run local validation before pushing.
4. **Format your code** using the configured Prettier/ESLint rules.
5. **Issue that pull request!** Wait for CI checks to pass and a core maintainer to review.

---

## Development Environment Setup

Please refer to the "Getting Started" section in the [README.md](README.md) for detailed instructions on spinning up the Next.js local development server and connecting to the Neon PostgreSQL database.

---

## Styleguides

### Git Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This allows us to auto-generate changelogs and enforce semantic versioning.

* Use the present tense ("Add feature" not "Added feature").
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
* Limit the first line to 72 characters or less.
* Reference issues and pull requests liberally after the first line.

**Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Allowed Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

### TypeScript Coding Standards

* **Strict Mode:** TypeScript `strict` mode is enabled and must not be bypassed. Do not use `any`; define explicit interfaces or use `unknown`.
* **Functional Components:** Use React Functional Components with Hooks. Avoid Class Components.
* **Tailwind Utility Classes:** Avoid hardcoded hex colors in `className`. Always utilize our CSS variables mapped in `tailwind.config.ts` (e.g., `text-accent`, `bg-surface`) to respect the dynamic HUD theming system.
* **Server Components:** By default, App Router components should be Server Components. Only add `'use client'` when interactivity or browser APIs are strictly required.
