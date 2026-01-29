# next-progressbar-link

A lightweight Next.js navigation progress indicator that wraps `next/link` to provide visual feedback during page transitions.

## The Problem

In Next.js App Router with Server Components, navigation can sometimes take a moment, leaving users uncertain whether their click registered. This creates a poor user experience with no visual feedback during transitions.

## The Solution

`next-progressbar-link` solves this by adding a customizable progress bar that appears during navigation, giving users clear visual feedback that the page is transitioning.

## Features

- 🚀 **Lightweight** - Minimal overhead, simple wrapper around `next/link`
- 🎨 **Fully Customizable** - Control colors, directions, and styling with ease
- 📍 **8 Direction Options** - Choose position (top/bottom/left/right) and animation direction
- 🎯 **Smart Navigation** - Automatically detects and shows progress only when needed
- ⚡ **Zero Config** - Works out of the box with sensible defaults
- 🔄 **Native Next.js** - All `next/link` props and features work exactly as expected
- 💨 **Smooth Animations** - Built-in progress simulation with smooth transitions
- 🎭 **Portal Rendering** - Uses React portals for proper z-index layering

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
- Tailwind CSS (optional - for advanced styling with `containerClassName` and `progressClassName`)

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
      <Link href="/contact" className="text-blue-500">Contact</Link>
      <Link href="https://example.com" target="_blank">External Link</Link>
    </div>
  );
}
```

**Note:** The Link component accepts all standard `next/link` props including `href`, `target`, `className`, `prefetch`, `replace`, `scroll`, etc.

That's it! Your navigation links now show a progress bar during navigation.

## Customization

The `NavigationProgress` component accepts props for full customization:

```tsx
<NavigationProgress
  direction="top-to-right"
  color="#3b82f6"
  containerClassName="h-1"
  progressClassName="shadow-lg"
/>
```

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `ProgressDirection` | `"top-to-right"` | Direction and position of progress bar (see below) |
| `color` | `string` | `"#00b207"` | Color of the progress bar (any valid CSS color) |
| `containerClassName` | `string` | `""` | Tailwind classes for the container |
| `progressClassName` | `string` | `""` | Tailwind classes for the progress bar itself |

### Direction Options

The `direction` prop gives you complete control over position and animation direction:

| Direction | Position | Animation |
|-----------|----------|-----------|
| `top-to-right` | Top of page | Left to right |
| `top-to-left` | Top of page | Right to left |
| `bottom-to-right` | Bottom of page | Left to right |
| `bottom-to-left` | Bottom of page | Right to left |
| `left-to-bottom` | Left side | Top to bottom |
| `left-to-top` | Left side | Bottom to top |
| `right-to-bottom` | Right side | Top to bottom |
| `right-to-top` | Right side | Bottom to top |

### Examples

**Custom color:**
```tsx
<NavigationProgress color="#ec4899" />
```

**Bottom positioned, right to left:**
```tsx
<NavigationProgress 
  direction="bottom-to-left" 
  color="#10b981" 
/>
```

**Left side vertical bar with custom height:**
```tsx
<NavigationProgress 
  direction="left-to-bottom" 
  color="#f59e0b"
  containerClassName="w-2"
/>
```

**Gradient effect with Tailwind:**
```tsx
<NavigationProgress 
  direction="top-to-right"
  containerClassName="h-1"
  progressClassName="bg-gradient-to-r from-purple-500 to-pink-500"
  color="transparent" // Use transparent when using Tailwind gradients
/>
```

**Custom styling with shadow:**
```tsx
<NavigationProgress 
  color="#6366f1"
  containerClassName="h-2"
  progressClassName="shadow-xl"
/>
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

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/MoemenAdam/next-progressbar-link).