# Plan: Coptic Religious App "إيفنوتي 99"

## Context

Build a Coptic Orthodox Christian religious app interface replicating designs from 4 provided reference images. The app (named "إيفنوتي 99" / Eifnoty 99) provides access to Coptic hymns, prayers, and liturgical resources with Arabic text and audio playback. The existing codebase is a blank-slate React + Vite + Tailwind CSS v4 project.

## Design Summary (from images)

**Palette**
- Background: deep navy `#080d28` → `#0e1645`
- Card surface: `#131c52` with subtle gradient, ~10% lighter than bg
- Gold accent: `#c9a227` (borders, icons, active tabs, ornaments)
- Text: `#ffffff` primary, `rgba(255,255,255,0.6)` muted
- Progress/slider: gold fill on dark rail

**Typography**
- Font: Cairo (Google Fonts — Arabic + Latin support, weights 400/600/700/800)
- Large display text: 800 weight Arabic
- Body/labels: 400–600 weight

**Layout**
- Mobile-first, responsive
- RTL Arabic layout throughout
- Bottom tab navigation
- Rounded cards (12–16px radius)

## Screens (3 state-based views, no router needed)

### 1. Home Screen (default)
- **Top bar**: Gold Coptic cross icon + "إيفنوتي 99" title (gold, large) + search + info icon buttons
- **Hero banner**: Virgin Mary background image (`src/imports/ChatGPT_Image_Sep_25__2026__01_47_55_AM.png`) with welcome text overlay "مرحباً بك في إيفنوتي 99" and tagline "كنز الكنيسة القبطية .. في متناول يدك"
- **Category grid**: 2-column, 3-row grid of 6 category cards:
  1. التسبحة السنوية – book icon
  2. التسبحة الكيهكية – church dome icon
  3. تسبحة الأعياد – star icon
  4. تسبحة الأصوام – cross/bowl icon
  5. الإبصلمودية – book icon
  6. الألحان – music note icon
  Each card: dark navy with subtle gradient, gold icon (SVG inline), title bold white, subtitle muted, chevron arrow in gold
- **Daily verse footer**: dark card with cross ornaments and verse text "«ليكن تسبيحك دائماً في فمي» (مزمور ١:٣٤)"
- **BottomNav**: Home | Library | Favorites | Settings — gold fill for active icon

### 2. Category Screen (Annual Tasbeha list)
- **Top bar**: Back arrow (white) + title "التسبحة السنوية" centered + heart + search
- **Selected hymn card**: book icon (dark circle bg) + "تسبحة العذراء" title + subtitle "القطعة الأولى" + gold pill badge "1 / 12"
- **Language tabs**: 3 pills — العربي (gold/active), قبطي معرب, اللحن بالهزات
- **Text panel**: large Arabic hymn text, white, on dark card background
- **Bottom toolbar**: A− A+ (font size) | Bookmark | Copy | Share icons with Arabic labels
- **Progress**: "1 / 12" label + gold-filled progress bar
- **Audio row**: track icon + "قبطي معرب" + chevron (navigates to audio detail)
- **Audio player bar**: music icon + "الحن بالهزات" track name + prev/play/next controls

### 3. Reader Screen (full-screen immersive)
- **Background**: full-screen blurred hero image with dark overlay
- **Top bar overlay**: back arrow + title "تسبحة العذراء" + subtitle "القطعة الأولى" + gold Coptic cross ornament (centered) + "1 / 12" badge + three-dot menu
- **Language badge**: gold border pill "العربي" with translate icon
- **Hymn text**: center-aligned, large white Arabic text, scrollable
- **Bottom toolbar**: Bookmark | Copy | Share | A− A+
- **Progress bar**: "1 / 12" + gold slider
- **Audio bar**: gold music icon + "قبطي معرب" + chevron

## File Structure

```
src/
  index.css           — Cairo @import (first), CSS variables, body dir=rtl
  App.tsx             — Top-level state: currentScreen, selectedCategory, fontSize, currentPage
  components/
    BottomNav.tsx     — 4-tab bottom navigation
    HomeScreen.tsx    — Home view (hero, grid, verse)
    CategoryScreen.tsx — Hymn list / detail view
    ReaderScreen.tsx  — Immersive reader
    icons.tsx         — Inline SVG icon set (cross, book, dome, star, note, chevron, etc.)
```

## Key Implementation Details

### `src/index.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap');
@import 'tailwindcss';

:root {
  --color-bg: #080d28;
  --color-surface: #0e1645;
  --color-card: #131c52;
  --color-gold: #c9a227;
  --color-gold-light: #e0b84a;
  --color-text: #ffffff;
  --color-muted: rgba(255,255,255,0.55);
}

body {
  font-family: 'Cairo', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  min-height: 100dvh;
}
```

### `src/App.tsx`
- State: `screen: 'home' | 'category' | 'reader'`, `fontSize`, `currentPage`, `activeTab`
- Pass navigation callbacks down to child screens
- Render the correct screen component based on `screen` state
- Wrap everything in `dir="rtl"` container

### Mock data (defined in App.tsx or a data file)
```ts
const categories = [
  { id: 'annual', title: 'التسبحة السنوية', subtitle: 'ترانيم وصلوات السنة', icon: 'book' },
  { id: 'kiahk', title: 'التسبحة الكيهكية', subtitle: 'صلوات وطقوس الكيهك', icon: 'dome' },
  { id: 'feasts', title: 'تسبحة الأعياد', subtitle: 'ترانيم وألحان الأعياد', icon: 'star' },
  { id: 'fasting', title: 'تسبحة الأصوام', subtitle: 'صلوات وألحان الصوم', icon: 'cross' },
  { id: 'psalmodia', title: 'الإبصلمودية', subtitle: 'تسبحة الإبصلمودية', icon: 'book2' },
  { id: 'hymns', title: 'الألحان', subtitle: 'ألحان قبطية متنوعة', icon: 'music' },
]

const hymnText = [
  'يا مريم',
  'يا ستّ الآبكار',
  'قد نلت تعظيم',
  'من نور الأنوار',
  'وهبت تعظيم',
  'من عنده قد صار',
  'وحملت الخالق',
  'من ذا لا يختار',
]
```

### Asset Usage
- Hero image: `import heroImg from '../imports/ChatGPT_Image_Sep_25__2026__01_47_55_AM.png'`
- Used as `<img>` or CSS `background-image` for the home hero banner and reader background

### Responsive behavior
- Mobile: single column bottom nav, full-width cards
- Desktop: content max-width ~480px centered (mobile-app feel), or expand to show side panel layout matching img3 tablet view

## Verification
1. Dev server is already running — preview in the preview panel
2. Check Home Screen renders with hero image, 6 category cards, bottom nav, daily verse
3. Tap a category card → transitions to Category Screen with hymn list, language tabs, audio bar
4. Tap on selected hymn → transitions to Reader Screen with full-screen background, text, controls
5. Font size A+/A− buttons change text size
6. Back buttons navigate to previous screen
7. Bottom nav tabs switch between Home/Library/Favorites/Settings states
8. Text is properly right-aligned (RTL)
