# RapL Genie — WordPress Implementation Guide

This guide explains how to implement the responsive **RapL Genie** product page on the corporate WordPress website (`getrapl.com`), addressing the WordPress Challenge from the RapL Fresher Web Developer Problem Statement.

---

## 1. Approach Overview

To implement the RapL Genie page smoothly without disturbing existing pages or theme styles, three modular implementation paths are provided:

| Method | Best For | Technical Effort |
| :--- | :--- | :--- |
| **Gutenberg Block Pattern / Custom HTML** | Standard WordPress Block Editor | Minimal (Native WordPress) |
| **Elementor Template** | Visual drag-and-drop workflow | Low |
| **Custom Page Template (`page-rapl-genie.php`)** | Version-controlled developer workflow | Recommended for CI/CD |

---

## 2. Option A: WordPress Gutenberg Implementation (Recommended)

1. **Create the Page**:
   - Navigate to `WordPress Admin > Pages > Add New Page`.
   - Title: `RapL Genie`.
   - Permalink slug: `rapl-genie` (`getrapl.com/rapl-genie`).
   - Template selection: Choose "Full Width / Canvas" (or default page container without sidebar).

2. **Add Custom CSS (Scoped)**:
   - Paste the contents of `rapl-genie-styles.css` into `Appearance > Customize > Additional CSS`, or enqueue it specifically on this page via `functions.php`:
     ```php
     function rapl_enqueue_genie_assets() {
         if (is_page('rapl-genie')) {
             wp_enqueue_style(
                 'rapl-genie-style',
                 get_stylesheet_directory_uri() . '/css/rapl-genie-styles.css',
                 array(),
                 '1.0.0'
             );
         }
     }
     add_action('wp_enqueue_scripts', 'rapl_enqueue_genie_assets');
     ```
   - **Why this is safe:** The stylesheet is only loaded when `is_page('rapl-genie')` is true, and every selector is scoped under `.rapl-genie-wp-page`. Other pages are completely unaffected.

3. **Insert the HTML Content**:
   - Add a **Custom HTML** block in Gutenberg.
   - Paste the contents of `rapl-genie-page.html`.
   - Alternatively, build native Gutenberg blocks using Columns, Heading, Paragraph, and Button blocks matching the exact structure.

---

## 3. Option B: Elementor Implementation

1. Create a new page and click **Edit with Elementor**.
2. Set Page Layout to **Elementor Full Width**.
3. Insert an **HTML Widget** and paste `rapl-genie-page.html`.
4. Under the widget's **Advanced > Custom CSS** tab, paste `rapl-genie-styles.css`.
5. Save as a template (`RapL Genie Landing Page`) for reuse across staging and production.

---

## 4. Option C: Child Theme Page Template (`page-rapl-genie.php`)

For teams using Git and child themes:

1. Create `wp-content/themes/rapl-child/page-rapl-genie.php`.
2. Structure the template with WordPress standard headers:
   ```php
   <?php
   /**
    * Template Name: RapL Genie Landing Page
    */
   get_header();
   ?>

   <?php include get_stylesheet_directory() . '/templates/rapl-genie-page.html'; ?>

   <?php
   get_footer();
   ?>
   ```

---

## 5. Responsive Design Across Breakpoints

The layout uses mobile-first CSS Grid and Flexbox:

- **Desktop (1440px / 1280px)**:
  - 2-column hero (1.15fr / 0.85fr) with live interface preview.
  - 4-column feature grid (`grid-template-columns: repeat(2, 1fr)` or 4 across wider screens).
  - 3-step horizontal workflow with directional dividers (`Ask → Discover → Learn`).
  - 2-column learner experience breakdown.
- **Tablet (1024px / 768px)**:
  - Steps gracefully shift or scale.
  - Subnav remains horizontal with proportional padding.
  - Grids collapse into 2-column layouts.
- **Mobile (430px / 390px / 375px)**:
  - Hero stacks vertically with the text above the interface preview.
  - Workflow steps transition from horizontal to vertical stack (`flex-direction: column`).
  - Navigation links and footer links wrap cleanly without horizontal scrollbars.
  - Touch targets for all buttons and links exceed the minimum 44px accessible touch guideline.

---

## 6. Image Handling and Asset Optimization

1. **File Formats**:
   - Use **WebP** for interface graphics and hero illustrations (with PNG fallback where needed).
   - Filenames follow descriptive conventions:
     - `rapl-genie-hero.webp`
     - `rapl-genie-learning.webp`
     - `rapl-genie-interface.webp`
2. **Dimensions & Compression**:
   - Hero graphics: Max 1200px width, saved under 90KB.
   - Interface thumbnails: Max 600px width, saved under 45KB.
3. **WordPress Media Library & Responsive Images**:
   - Let WordPress generate `srcset` attributes automatically so mobile devices download appropriately sized images (`thumbnail`, `medium`, `large`).
   - Always supply explicit `alt` text (e.g., `alt="RapL Genie learning assistant querying course recommendations"`).
   - Set `loading="lazy"` on all images below the fold to protect initial page load performance and Core Web Vitals (LCP).

---

## 7. How to Avoid Breaking Existing Pages

1. **Strict CSS Scoping**:
   - Every CSS rule starts with `.rapl-genie-wp-page`.
   - Never override generic tags (`body`, `p`, `h1`, `a`, `button`) globally in WordPress themes.
2. **Conditional Asset Loading**:
   - Styles and scripts are registered with `is_page('rapl-genie')` so no unused CSS/JS is loaded on the homepage, blog, or existing product pages.
3. **Template Isolation**:
   - Use a separate page template rather than modifying `header.php`, `footer.php`, or global theme templates.
4. **Use Child Themes**:
   - Never edit the parent theme directly; all template files reside in `rapl-child`.

---

## 8. Pre-Publishing Testing Checklist

Before publishing to production on `getrapl.com`:

- [ ] **Staging Environment**: Deploy first to a staging server or draft preview.
- [ ] **Multi-Device Responsive Audit**:
  - Test at 375px (iPhone SE)
  - Test at 390px (iPhone 13/14/15)
  - Test at 430px (iPhone Pro Max)
  - Test at 768px (iPad Mini)
  - Test at 1024px (iPad Pro)
  - Test at 1280px / 1440px (Desktop)
- [ ] **Viewport & Overflow Check**: Verify `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scrollbar).
- [ ] **Navigation & Anchor Links**: Ensure all anchor links (`#about`, `#features`, `#contact`) scroll smoothly to target sections.
- [ ] **Accessibility (a11y)**:
  - Heading hierarchy follows logical order (`h1` → `h2` → `h3`).
  - Color contrast ratio for text on backgrounds exceeds WCAG 2.1 AA (4.5:1).
  - All interactive elements are focusable via keyboard (`Tab` navigation).
- [ ] **Browser Compatibility**: Test on Chrome, Safari, Firefox, Edge, and iOS Safari.
- [ ] **Cache Purging**: Clear Cloudflare / WP Rocket / server page cache after publishing.
