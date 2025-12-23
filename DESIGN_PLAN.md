# 1Sat Ordinals Website Redesign Plan

## Project Overview
Migrate the 1Sat Ordinals website from Webflow to Next.js 16, deploying on Vercel. The site explains the 1Sat Ordinals protocol - a simple, powerful token protocol on Bitcoin SV (BSV) that enables fast, affordable, and fully scriptable tokens.

## Current Site Analysis (from https://1satordinals.com/)

### Existing Structure
1. **Header/Navigation**
   - Logo (1Sat branding)
   - Primary nav: Protocol, Developers, Projects
   - Secondary links: Documentation, Discord

2. **Hero Section**
   - Headline: "A Simple, Powerful Token Protocol"
   - Subheading: Emphasizes speed, affordability, scriptability on BSV
   - CTAs: "Learn More" + "Join Discord"

3. **Community Showcase ("The cool kids")**
   - Highlights open-protocol ecosystem
   - Grid of project images
   - CTAs: Browse projects, Build new ones

4. **Feature Comparison**
   - Three-column grid comparing 1Sat to BTC Ordinals
   - Focus areas: Adaptation, Flexibility, Efficiency

5. **Key Differentiators**
   - Tagline: "Called 'One Satoshi' because it doesn't require dust"
   - Feature highlights:
     - Payload size (50MB+)
     - Ordinal locking mechanisms
     - Transaction cost efficiency
     - Single-transaction minting

6. **Footer**
   - Location: Bitcoin SV
   - Social: Discord, X/Twitter
   - Ecosystem partners: 1Sat.Market, WhatsOnChain, sCrypt.io
   - Legal pages

### Token Types (from research)
- **Ordinals (NFTs)**: Unique tokens for art and collectibles
- **BSV20**: Fungible tokens
- **BSV21**: Enhanced fungible tokens

## Design System

### Brand Colors
- **Primary**: Bitcoin yellow/gold (#F7931A or similar)
- **Secondary**: Deep purple/indigo for contrast
- **Accent**: Bright cyan/blue for CTAs
- **Neutrals**: Clean whites, subtle grays, deep blacks

### Typography
- **Headings**: Modern sans-serif (Inter, Poppins, or similar)
- **Body**: Readable sans-serif with excellent legibility
- **Code**: Monospace for technical content

### Design Principles
1. **Clean & Modern**: Minimal, spacious layouts
2. **Technical but Accessible**: Balance developer focus with general audience
3. **Speed-focused**: Fast loading, optimized images
4. **Mobile-first**: Responsive across all devices

## Page Structure

### Homepage (`/`)

#### 1. Hero Section
```
┌─────────────────────────────────────────┐
│ [Logo]              [Nav: Protocol |    │
│                      Developers |       │
│                      Projects]          │
│                      [Docs] [Discord]   │
├─────────────────────────────────────────┤
│                                         │
│     A Simple, Powerful Token Protocol   │
│                                         │
│  Fast, affordable, and fully scriptable │
│        tokens on Bitcoin SV             │
│                                         │
│  [Learn More]  [Join Discord]          │
│                                         │
└─────────────────────────────────────────┘
```

**Components needed**:
- `<Header />` - Sticky navigation
- `<Hero />` - Full-screen intro with CTAs
- Animations: Fade-in text, subtle floating elements

#### 2. Protocol Overview
```
┌─────────────────────────────────────────┐
│         What are 1Sat Ordinals?         │
│                                         │
│  [Icon] Chain of single satoshi outputs │
│  [Icon] 100% backward compatible        │
│  [Icon] Native Bitcoin Script          │
│                                         │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ NFTs    │ │ BSV20   │ │ BSV21   │  │
│  │ Unique  │ │ Fungible│ │ Enhanced│  │
│  └─────────┘ └─────────┘ └─────────┘  │
└─────────────────────────────────────────┘
```

**Components needed**:
- `<ProtocolOverview />` - Three-column grid
- `<TokenTypeCard />` - Reusable card component
- Icons for each token type

#### 3. Feature Comparison
```
┌─────────────────────────────────────────┐
│      1Sat vs BTC Ordinals               │
│                                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │Adaptation│ │Flexibility│ │Efficiency││
│  │          │ │           │ │          ││
│  │✓ Feature │ │✓ Feature  │ │✓ Feature ││
│  │✓ Feature │ │✓ Feature  │ │✓ Feature ││
│  └──────────┘ └──────────┘ └──────────┘│
└─────────────────────────────────────────┘
```

**Components needed**:
- `<ComparisonGrid />` - Three-column comparison
- `<FeatureList />` - Checkmark items

#### 4. Key Differentiators
```
┌─────────────────────────────────────────┐
│  Why "One Satoshi"?                     │
│  No dust required                       │
│                                         │
│  • Payload: 50MB+ inscriptions         │
│  • Single-transaction minting          │
│  • Low cost: ~$0.0001 per tx          │
│  • Ordinal locking mechanisms          │
└─────────────────────────────────────────┘
```

**Components needed**:
- `<DifferentiatorSection />` - Feature highlights
- `<StatCard />` - Visual stat displays

#### 5. Community Showcase
```
┌─────────────────────────────────────────┐
│         The cool kids                   │
│  Rapid development, emergent            │
│  interoperability                       │
│                                         │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│  │prj│ │prj│ │prj│ │prj│ │prj│       │
│  └───┘ └───┘ └───┘ └───┘ └───┘       │
│                                         │
│  [Browse Projects]  [Build Something]   │
└─────────────────────────────────────────┘
```

**Components needed**:
- `<ProjectShowcase />` - Grid of project cards
- `<ProjectCard />` - Image, title, link
- Load from API or static data

#### 6. Footer
```
┌─────────────────────────────────────────┐
│  Bitcoin SV                             │
│                                         │
│  Connect: [Discord] [X/Twitter]        │
│                                         │
│  Ecosystem:                             │
│  • 1Sat.Market                         │
│  • WhatsOnChain                        │
│  • sCrypt.io                           │
│                                         │
│  [Terms] [Privacy]                     │
└─────────────────────────────────────────┘
```

**Components needed**:
- `<Footer />` - Multi-column layout
- `<SocialLinks />` - Icon links
- `<EcosystemLinks />` - Partner links

### Additional Pages

#### `/protocol`
- Deep dive into protocol specification
- Technical details
- How it works diagrams
- Link to docs.1satordinals.com

#### `/developers`
- Getting started guide
- SDK/API documentation
- Code examples
- Developer resources

#### `/projects`
- Full project directory
- Filterable/searchable
- Categories: NFT Platforms, Tokens, Tools, etc.

## Technical Implementation

### Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Linting**: Biome
- **Animations**: Framer Motion
- **Icons**: Lucide React or Heroicons
- **Package Manager**: Bun

### Key Features
1. **Static Generation**: Pre-render all pages for speed
2. **Image Optimization**: Next.js Image component
3. **SEO**: Metadata API, sitemap, robots.txt
4. **Analytics**: Optional Vercel Analytics
5. **Performance**: Lighthouse score 95+

### File Structure
```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Homepage
├── protocol/
│   └── page.tsx        # Protocol page
├── developers/
│   └── page.tsx        # Developers page
└── projects/
    └── page.tsx        # Projects directory

components/
├── Header.tsx
├── Footer.tsx
├── Hero.tsx
├── ProtocolOverview.tsx
├── ComparisonGrid.tsx
├── DifferentiatorSection.tsx
├── ProjectShowcase.tsx
├── ProjectCard.tsx
├── TokenTypeCard.tsx
├── FeatureList.tsx
└── SocialLinks.tsx

lib/
├── projects.ts         # Project data
└── constants.ts        # Site constants

public/
├── images/
├── icons/
└── favicon.ico
```

## Content Requirements

### Copy to Migrate
- [ ] Hero headline and subheading
- [ ] Protocol description
- [ ] Feature comparison details
- [ ] Key differentiator bullets
- [ ] Community section text
- [ ] Footer links and legal text

### Assets Needed
- [ ] 1Sat logo (SVG preferred)
- [ ] Project screenshots/logos
- [ ] Token type icons
- [ ] Feature icons
- [ ] Social media icons
- [ ] Background patterns/textures

### External Links
- Documentation: https://docs.1satordinals.com
- Discord: (get from current site)
- X/Twitter: https://x.com/1satordinals
- 1Sat.Market: (verify URL)
- WhatsOnChain: (verify URL)
- sCrypt.io: https://scrypt.io

## Implementation Phases

### Phase 1: Core Pages (MVP)
1. Homepage with all sections
2. Header with navigation
3. Footer with links
4. Basic responsive design
5. Deploy to Vercel

### Phase 2: Content Pages
1. Protocol page
2. Developers page
3. Projects directory page
4. Content migration from current site

### Phase 3: Enhancement
1. Animations and interactions
2. Project showcase CMS/API
3. Newsletter signup (if needed)
4. Blog integration (if needed)
5. Performance optimization
6. SEO optimization

## Success Metrics
- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse Best Practices: 100
- [ ] Lighthouse SEO: 100
- [ ] Mobile responsive on all devices
- [ ] Fast page loads (<2s)
- [ ] Clear CTAs with high click-through
- [ ] Easy navigation to docs and Discord

## Notes
- Maintain clean, minimal aesthetic
- Emphasize speed and efficiency (matches protocol values)
- Technical but approachable tone
- Developer-focused but accessible to general crypto audience
- Highlight BSV advantages over BTC Ordinals

## Resources
- [Protocol Specification](https://docs.1satordinals.com)
- [1Sat Ordinals Main Site](https://1satordinals.com/)
- [GitHub Repository](https://github.com/bitcoinschema/1sat-ordinals)
- [CoinGeek Article](https://coingeek.com/1sat-ordinals-on-bsv-so-much-more-than-just-nft-trading/)
