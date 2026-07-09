<h1 align="center">Form Blocks Monorepo</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Alpha-orange?style=for-the-badge" alt="Status Alpha">
  <img src="https://img.shields.io/badge/Vue-3.x-4fc08d?style=for-the-badge&logo=vue.js" alt="Vue 3">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>

---

**Form Blocks** is a modular, high-performance ecosystem for building dynamic forms driven by smart layout blocks and an ultra-lean shorthand string DSL. It is architected from the ground up to completely decouple **form logic**, **the presentation/styling layer (UI)**, and **framework-specific adapters**.

> 🚧 **Alpha Version:** The core API is highly stable in its architectural goals, but minor breaking changes may occur as we fine-tune features towards the official `1.0.0` stable release.

---

## 📦 Ecosystem Architecture (Monorepo)

This repository is managed as a monorepo workspace, splitting the framework into specialized, decoupled packages:

| Package | Description | Documentation & Guides |
| :--- | :--- | :--- |
| **`@form-blocks/core`** | The framework-agnostic engine. Handles DSL parsing, deep context resolution, and validation schema compilation (Yup). | [Explore Core ↗](./packages/core) |
| **`@form-blocks/styles`** | Global design system, utility-first classes, and visual design tokens without heavy third-party UI dependencies. | [Explore Styles ↗](./packages/styles) |
| **`@form-blocks/vue`** | **[MAIN]** The official render engine for Vue 3 (powered by high-performance Render Functions). Contains components, composables (`useForm`), and reactive lifecycle hooks. | [👉 Read Full Documentation](./packages/vue) |

---

## ⚡ Quick Start for Vue 3 Developers

If you want to install and immediately start rendering dynamic forms with our clean string DSL inside your Vue 3 app, **you don't need to worry about the global monorepo configurations**. 

Head directly over to the main framework integration package where you will find step-by-step installation guides, schema design examples, `dslContext` usage, event lifecycle hooks, and structural layout blocks:

👉 **[Go to the quick guide Installation & Usage Guide](https://skarlaks71.github.io/Form-Blocks-Docs/en/guide/first-steps/getting-started.html)**

---

## 🛠️ Local Development (For Contributors)

If you wish to clone this repository to contribute to the **Form Blocks** ecosystem, run package build pipelines, or submit pull requests:

1. Ensure you use the native package manager configured for the workspace.
2. Install dependencies at the root directory:
   ```bash
   npm install # or pnpm i / yarn install depending on your workspace setup
3. Run the development or build scripts for the specific subpackages you are working on.
