# next-progressbar-link

A lightweight Next.js navigation progress indicator that wraps `next/link` to provide visual feedback during page transitions.

## The Problem

In Next.js App Router with Server Components, navigation can sometimes take a moment, leaving users uncertain whether their click registered. This creates a poor user experience with no visual feedback during transitions.

## The Solution

`next-progressbar-link` solves this by adding a customizable progress bar that appears during navigation, giving users clear visual feedback that the page is transitioning.

## Features

- 🚀 **Lightweight** - Minimal overhead, simple wrapper around `next/link`
- 🎨 **Fully Customizable** - Built with Tailwind CSS for complete styling control
- 📍 **Flexible Positioning** - Place the progress bar at the top, bottom, left, or right
- ⚡ **Zero Config** - Works out of the box with sensible defaults
- 🔄 **Native Next.js** - All `next/link` props and features work exactly as expected

## Installation

```bash
npm install next-progressbar-link
```

```bash
yarn add next-progressbar-link
```

```bash
pnpm add next-progressbar-link
```

## Requirements

- Next.js with App Router (required)
- Tailwind CSS

## Usage

### 1. Add NavigationProgress to your root layout

Add the `NavigationProgress` component inside the `<body>` tag of your root layout:

```tsx
// app/layout.tsx
import { NavigationProgress } from 'next-progressbar-link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
```

### 2. Use the Link component

Replace your `next/link` imports with the Link from this package:

```tsx
import Link from 'next-progressbar-link';

export default function MyComponent() {
  return (
    <div>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
}
```

That's it! Your navigation links now show a progress bar during navigation.

## Customization

The `NavigationProgress` component accepts all Tailwind CSS classes and additional props for positioning:

```tsx
<NavigationProgress
  className="bg-blue-500 h-1"
  direction="top" // 'top' | 'bottom' | 'left' | 'right'
/>
```

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `"bg-blue-600 h-1"` | Tailwind classes for styling |
| `direction` | `string` | `"top"` | Position of progress bar: `top`, `bottom`, `left`, or `right` |

### Examples

**Custom color and height:**
```tsx
<NavigationProgress className="bg-gradient-to-r from-purple-500 to-pink-500 h-2" />
```

**Bottom positioned:**
```tsx
<NavigationProgress direction="bottom" className="bg-green-500 h-1" />
```

**Left side vertical bar:**
```tsx
<NavigationProgress direction="left" className="bg-red-500 w-2" />
```

## How It Works

This package is a simple wrapper around Next.js's native `next/link` component. It:

1. Preserves all `next/link` functionality and props
2. Adds a progress indicator during navigation
3. Works seamlessly with Next.js App Router and Server Components

**Important:** This is not a new Link component - it's the actual `next/link` with progress feedback added. All Next.js link features work exactly as documented.

## Demo

Check out the [demo repository](https://github.com/yourusername/next-progressbar-link-demo) for live examples and usage patterns.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/yourusername/next-progressbar-link).