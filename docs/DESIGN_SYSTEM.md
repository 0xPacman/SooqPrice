# SooqPrice Design System

## 🎨 Color Palette

### Primary Colors
- **White**: `#FFFFFF` - Main background, cards
- **Light Yellow**: `#FFF9E6` - Accent backgrounds, highlights
- **Green**: `#4A9B3B` - Primary actions, success states
- **Dark Green**: `#2D5E1F` - Hover states, emphasis

### Secondary Colors
- **Gray**: `#F7F7F7` - Secondary backgrounds
- **Light Gray**: `#E2E8F0` - Borders, dividers
- **Dark Gray**: `#4A5568` - Text, icons
- **Red**: `#E53E3E` - Error states, warnings

## 📱 Typography

### Font Family
- **Primary**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Arabic**: `'Noto Sans Arabic', sans-serif`

### Font Sizes
- **Heading 1**: 2.5rem (40px)
- **Heading 2**: 2rem (32px)
- **Heading 3**: 1.5rem (24px)
- **Body Large**: 1.125rem (18px)
- **Body**: 1rem (16px)
- **Small**: 0.875rem (14px)
- **Extra Small**: 0.75rem (12px)

## 🔲 Spacing Scale

Based on 8px grid system:
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px

## 🎯 Component Guidelines

### Buttons
- **Primary**: Green background, white text
- **Secondary**: White background, green border
- **Outline**: Transparent background, green border
- **Minimum touch target**: 44px height

### Cards
- **Background**: White
- **Border**: Light gray
- **Shadow**: Subtle elevation
- **Radius**: 8px

### Forms
- **Input height**: 44px minimum
- **Label**: Above input, bold
- **Error**: Red text below input
- **Focus**: Green border

### Navigation
- **Mobile-first**: Bottom navigation bar
- **Desktop**: Side navigation
- **Active state**: Green background

## 📐 Layout Principles

### Mobile First
- Start with mobile design (320px)
- Progressive enhancement for larger screens
- Touch-friendly interactions

### Grid System
- **Mobile**: Single column
- **Tablet**: 2-3 columns
- **Desktop**: 4+ columns
- **Max width**: 1200px

### Breakpoints
- **Mobile**: 0px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## ♿ Accessibility

### Color Contrast
- **AA compliance**: 4.5:1 ratio minimum
- **AAA preferred**: 7:1 ratio
- Never rely on color alone

### Focus States
- Visible focus indicators
- Keyboard navigation support
- Screen reader compatibility

### Touch Targets
- Minimum 44px x 44px
- Adequate spacing between targets
- Clear visual feedback

## 🌍 Internationalization

### RTL Support
- Arabic text direction
- Mirrored layouts for RTL
- Icon orientation adjustments

### Text Expansion
- Allow 30% text expansion
- Flexible layouts
- No hardcoded widths

## 📱 Mobile Considerations

### Performance
- Optimized images
- Lazy loading
- Minimal bundle size

### Gestures
- Swipe navigation
- Pull to refresh
- Touch-friendly controls

### Offline Support
- Cached data display
- Offline indicators
- Progressive enhancement
