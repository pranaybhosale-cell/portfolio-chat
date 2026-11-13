# Pranay Bhosale — Premium Portfolio Redesign

A redesigned, accessible, recruiter-friendly one-page portfolio built from the original project.

## Design approach
- Minimal, editorial look with ivory backgrounds, charcoal sections and a soft mint accent.
- Projects are featured before biographical details, with clear progress labels.
- Original project information and five certificate images are retained. No invented metrics, experience or project outputs.
- Simplified interactions: mobile navigation, certificate previews, copy-email button.
- No Three.js, Lenis, cursor effects, scroll hijacking or other animation dependencies.
- Responsive for mobile, tablet and desktop, with keyboard focus and reduced-motion support.

## Run locally
Open `index.html` in a browser, or from this folder run:

```sh
python -m http.server 8000
```

Then visit `http://localhost:8000`. No build step required.

## Publish
Upload all files inside this folder together to GitHub Pages, Netlify, or another static hosting service. Keep the certificate JPEGs, `resume.pdf`, `style.css`, `script.js`, `favicon.svg` and `og-cover.png` at the same relative locations.

## Before publishing
- Check that `resume.pdf` is your latest résumé.
- Replace the GitHub profile link with individual repository links **only after each repository is ready to share**.
- Add actual dataset screenshots or charts after validating their values, axes and source notes.
- Review the certificate images for private personal identifiers before sharing publicly.
- Test email and social links, browser layout, and accessibility on your own devices.
- The Open Graph image is linked relatively. If you deploy to a fixed domain, consider setting an absolute `og:image` URL for broader social preview compatibility.

## Files
- `index.html` — content and structure
- `style.css` — visual design and responsive behavior
- `script.js` — mobile navigation, certificate dialog, copy interaction
- `og-cover.png` / `favicon.svg` — sharing image and favicon
- `resume.pdf` / `*-certificate.jpg` — original supplied assets
