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
- 🖱️ **onClick Support** - Execute custom onClick handlers alongside navigation progress

## Installation

```bash
npm install next-progressbar-link
```

## Requirements

- Next.js with App Router (required)
- React 18+ (required)

## Usage

### 1. Add NavigationProgress to your root layout

Add the `NavigationProvider` wrapper and `NavigationProgress` component inside the `<body>` tag of your root layout:

```tsx
// app/layout.tsx
import { NavigationProvider, NavigationProgress } from 'next-progressbar-link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <NavigationProgress />
          {children}
        </NavigationProvider>
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

### 3. Using onClick handlers

The Link component supports custom onClick handlers that execute alongside the progress indicator:

```tsx
import Link from 'next-progressbar-link';

export default function MyComponent() {
  const handleClick = (e) => {
    console.log('Link clicked!');
    // Your custom logic here
  };

  return (
    <Link href="/dashboard" onClick={handleClick}>
      Dashboard
    </Link>
  );
}
```

**Note:** The Link component accepts all standard `next/link` props including `href`, `target`, `className`, `prefetch`, `replace`, `scroll`, `onClick`, etc.

That's it! Your navigation links now show a progress bar during navigation.

## Customization

The `NavigationProgress` component accepts props for full customization:

```tsx
<NavigationProgress
  direction="top-to-right"
  color="#3b82f6"
  height="4px"
  width="4px"
/>
```

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `ProgressDirection` | `"top-to-right"` | Direction and position of progress bar (see below) |
| `color` | `string` | `"#00b207"` | Color of the progress bar (any valid CSS color) |
| `height` | `string` | `"4px"` | Height for horizontal bars (top/bottom positions) |
| `width` | `string` | `"4px"` | Width for vertical bars (left/right positions) |
| `containerStyle` | `CSSProperties` | `{}` | Custom CSS styles for the container element |
| `progressStyle` | `CSSProperties` | `{}` | Custom CSS styles for the progress bar itself |

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

**Left side vertical bar with custom width:**
```tsx
<NavigationProgress 
  direction="left-to-bottom" 
  color="#f59e0b"
  width="6px"
/>
```

**Thicker progress bar:**
```tsx
<NavigationProgress 
  direction="top-to-right"
  color="#6366f1"
  height="8px"
/>
```

**Custom styling with inline styles:**
```tsx
<NavigationProgress 
  color="#3b82f6"
  height="3px"
  containerStyle={{ zIndex: 9999 }}
  progressStyle={{ 
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
    borderRadius: '0 2px 2px 0'
  }}
/>
```

**Gradient effect:**
```tsx
<NavigationProgress 
  direction="top-to-right"
  height="5px"
  progressStyle={{
    background: 'linear-gradient(to right, #a855f7, #ec4899)',
    boxShadow: '0 2px 10px rgba(168, 85, 247, 0.5)'
  }}
  color="transparent" // Use transparent when using custom backgrounds
/>
```

## API Reference

### NavigationProvider

The context provider that manages navigation state. Must wrap your application.

```tsx
import { NavigationProvider } from 'next-progressbar-link';

export default function RootLayout({ children }) {
  return (
    <NavigationProvider>
      {children}
    </NavigationProvider>
  );
}
```

### NavigationProgress

The progress bar component that displays during navigation.

**Props:**
- `direction?: ProgressDirection` - Position and animation direction
- `color?: string` - Progress bar color (default: `"#00b207"`)
- `height?: string` - Height for horizontal bars
- `width?: string` - Width for vertical bars
- `containerStyle?: CSSProperties` - Custom container styles
- `progressStyle?: CSSProperties` - Custom progress bar styles

### Link

A wrapper around Next.js's `next/link` that triggers the progress indicator.

**Props:** All `next/link` props plus:
- `onClick?: (e: MouseEvent) => void` - Custom click handler

### useNavigationContext

Hook to access navigation state programmatically.

```tsx
import { useNavigationContext } from 'next-progressbar-link';

function MyComponent() {
  const { isNavigating, setIsNavigating } = useNavigationContext();
  
  return (
    <div>
      {isNavigating ? 'Navigating...' : 'Ready'}
    </div>
  );
}
```

## How It Works

This package is a simple wrapper around Next.js's native `next/link` component. It:

1. Preserves all `next/link` functionality and props
2. Adds a progress indicator during navigation
3. Supports custom onClick handlers
4. Works seamlessly with Next.js App Router and Server Components
5. Uses React Context to manage global navigation state
6. Renders the progress bar using React portals for proper layering

**Important:** This is not a new Link component - it's the actual `next/link` with progress feedback added. All Next.js link features work exactly as documented.

## Advanced Usage

### Programmatic Navigation

You can trigger the progress bar programmatically:

```tsx
'use client';
import { useNavigationContext } from 'next-progressbar-link';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const { setIsNavigating } = useNavigationContext();
  const router = useRouter();

  const handleNavigate = () => {
    setIsNavigating(true);
    router.push('/some-page');
  };

  return (
    <button onClick={handleNavigate}>
      Navigate Programmatically
    </button>
  );
}
```

### Conditional Progress Display

You can conditionally show the progress bar:

```tsx
const [showProgress, setShowProgress] = useState(true);

return (
  <NavigationProvider>
    {showProgress && <NavigationProgress />}
    {children}
  </NavigationProvider>
);
```

## TypeScript Support

This package is written in TypeScript and includes full type definitions. All props are fully typed for the best development experience.

## Browser Support

Works in all modern browsers that support:
- ES6+
- React 18+
- Next.js App Router

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/MoemenAdam/next-progressbar-link).

## Credits

Created and maintained by [Moemen Adam](https://github.com/MoemenAdam)