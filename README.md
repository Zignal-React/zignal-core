# @zignal/core

[![npm version](https://img.shields.io/npm/v/@zignal/core.svg)](https://www.npmjs.com/package/@zignal/core)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@zignal/core)](https://bundlephobia.com/result?p=@zignal/core)
[![npm downloads](https://img.shields.io/npm/dm/@zignal/core.svg)](https://www.npmjs.com/package/@zignal/core)

Minimal, type-safe signal store for React (no persistence, no dependencies).

## Install

```sh
npm install @zignal/core
# or
yarn add @zignal/core
# or
pnpm add @zignal/core
```

## Usage

```tsx
import { createZignal } from '@zignal/core';

const useCounter = createZignal(0);

function Counter() {
  const [count, setCount] = useCounter();
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

## API

### `createZignal<T>(initial: T): () => [T, (v: T) => void]`
Creates a React hook for a signal store. Returns a hook that gives you the value and a setter.

- **Type-safe**: The value type is inferred from `initial`.
- **No dependencies**: Only React is required.

---
MIT License. 