# SPEC.md - RossoTono Market Polla Website

## 1. Project Overview
- **Project Name**: RossoTono Market Polla
- **Type**: Single-page responsive website
- **Core Functionality**: promotional website for RossoTono Market (affiliated store in Polla, SA) with interactive flyer, AI chatbot, social links, and contact features
- **Target Users**: Local customers looking for supermarket information, deals, and directions

## 2. UI/UX Specification

### Layout Structure
- **Header**: Sticky navigation with logo, nav links, and CTA button
- **Hero Section**: Full-width hero with animated text and floating food imagery
- **Volantino Section**: Interactive flipbook-style flyer showcase
- **Social Section**: Social media showcase with hover animations
- **Chatbot Section**: Always-accessible floating chat widget
- **Map Section**: Embedded Google Maps with directions
- **Contatti Section**: Contact cards with phone/mail actions
- **Footer**: Minimal footer with copyright

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Visual Design

#### Color Palette
- **Primary**: #821f05 (Burgundy/Rosso - Rossotono brand)
- **Primary Dark**: #5a1503
- **Secondary**: #f5f0e8 (Warm cream background)
- **Accent**: #e8a849 (Golden amber for highlights)
- **Text Primary**: #1a1a1a
- **Text Secondary**: #5a5a5a
- **White**: #ffffff
- **Success**: #28a745

#### Typography
- **Headings**: "Playfair Display", serif - elegant, premium feel
- **Body**: "DM Sans", sans-serif - modern, readable
- **Accent Text**: "Cinzel", serif - for special callouts

#### Font Sizes
- Hero Title: 4rem (mobile: 2.5rem)
- Section Titles: 2.5rem (mobile: 1.8rem)
- Subheadings: 1.5rem
- Body: 1rem
- Small: 0.875rem

#### Spacing System
- Section padding: 100px vertical (mobile: 60px)
- Container max-width: 1200px
- Card padding: 30px
- Element gaps: 20px

#### Visual Effects
- **Scroll animations**: Fade-in-up on scroll
- **Hover effects**: Scale transforms, color transitions
- **Box shadows**: Soft elevated shadows (0 10px 40px rgba(0,0,0,0.1))
- **Border radius**: 16px for cards, 50px for buttons
- **Gradient overlays**: Subtle warm gradients on sections

### Components

#### Header
- Logo (text-based with icon)
- Navigation links: Home, Volantino, Social, Contatti
- "Sfoglia il Volantino" CTA button
- Mobile hamburger menu

#### Hero Section
- Large headline: "RossoTono Market Polla"
- Subheadline: "Il colore della spesa italiana a Polla"
- Floating food images with parallax-like animation
- Scroll indicator

#### Volantino Section
- Section title with decorative elements
- Flyer preview cards (3 current offers)
- "Sfoglia tutto il volantino" button
- Flip animation on hover

#### Social Section
- Three cards for Instagram, TikTok, Facebook
- Each with icon, follower count preview
- Hover: scale up, show "Segui" button

#### Chatbot Widget
- Floating button (bottom-right) with chat icon
- Expandable chat window
- Message bubbles (user vs bot)
- Quick reply buttons for common questions
- Typing indicator animation

#### Map Section
- Embedded Google Maps iframe
- "Indicazioni" button that opens Google Maps
- Address card overlay

#### Contatti Section
- Two cards: Telefono and Email
- Phone: click-to-call functionality
- Email: click-to-mail functionality
- Store hours display

## 3. Functionality Specification

### Core Features

#### 1. Volantino Interattivo
- Display current promotional offers as cards
- Each card shows: product image placeholder, title, price, validity
- "Sfoglia il volantino completo" button opens modal or scrolls
- Visual flip effect on hover

#### 2. Social Media Links
- Instagram: https://instagram.com/rossotono
- TikTok: https://tiktok.com/@rossotonosupermercati
- Facebook: https://facebook.com/RossotonoSupermercati
- Each link opens in new tab

#### 3. Chatbot Intelligente
- **Quick Reply Buttons**:
  - "Volantino" → Shows current flyer highlights
  - "Orari" → Shows opening hours
  - "Dove siete" → Shows address and map
  - "Contatti" → Shows phone/email
  - "Promozioni" → Lists current deals
- **Keyword Matching**:
  - "volantino", "offerte", "sconti" → Flyer info
  - "orari", "apert", "chiuso" → Hours info
  - "dove", "indirizzo", "mappa", "polla" → Location info
  - "telefono", "contatti", "mail", "email" → Contact info
  - "ciao", "buongiorno", "salve" → Greeting + offer help
  - "grazie", "ok", "perfetto" → Positive acknowledgment
  - Default fallback with helpful suggestions

#### 4. Google Maps Integration
- Embed map centered on Polla, SA (approximate coordinates)
- "Indicazioni" button opens Google Maps in new tab
- Address display: Polla, SA (specific address to be provided)

#### 5. Contatti Funzionali
- **Telefono**: tel:+39-XXX-XXXXXX (placeholder number)
- **Email**: mailto:info@rossotono.it (placeholder)
- Both open native device functions

### User Interactions
- Smooth scroll to sections via nav links
- Chatbot opens/closes with animation
- Cards have hover states
- Mobile menu toggles smoothly

### Edge Cases
- Chatbot: Handle unknown queries gracefully
- Map: Fallback if iframe fails to load
- Links: All external links open in new tabs

## 4. Acceptance Criteria

### Visual Checkpoints
- [x] Header is sticky and visible on scroll
- [x] Hero section has animated floating elements
- [x] Volantino cards display with flip hover effect
- [x] Social cards scale on hover
- [x] Chatbot button is always visible (fixed position)
- [x] Map is embedded and interactive
- [x] Contact buttons trigger native actions (call/mail)
- [x] All sections have proper spacing and visual hierarchy
- [x] Mobile layout is fully responsive

### Functional Checkpoints
- [x] Navigation links scroll to correct sections
- [x] Chatbot opens/closes properly
- [x] Chatbot responds to quick reply buttons
- [x] Chatbot responds to keyword matches
- [x] Social links open correct URLs in new tabs
- [x] "Indicazioni" opens Google Maps
- [x] Phone link triggers call dialog
- [x] Email link triggers mail client

### Deployment
- [ ] All assets work as static files
- [ ] No server-side code required
- [ ] Netlify deploy ready (index.html + assets)