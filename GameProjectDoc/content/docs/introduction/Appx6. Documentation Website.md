---
title: "Appx6. Documentation Website"
description: ""
summary: ""
date: 2025-02-18T11:39:50+00:00
lastmod: 2025-02-18T11:39:50+00:00
draft: false
weight: 810
toc: true
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  robots: "" # custom robot tags (optional)
---

The documentation site for this project is built using **Thulite**, a framework powered by the **Doks** theme. Thulite itself is based on **Hugo**, a fast static site generator, and uses **npm** for dependency management and build tooling.

The Doks theme appears to incorporate the **Bootstrap** framework, which was briefly introduced in the *Software Tools* course during CSS exercises. This provides a responsive and well-structured layout with minimal setup.

To preview the site locally, use the following commands:

```bash
cd GameProjectDoc
npm install
npm run dev
# Then open localhost:1313 in your browser
```

For continuous deployment, we configured a **GitHub Actions workflow**. The site is automatically rebuilt and redeployed whenever changes are made to the `GameProjectDoc` folder in the `main` branch. This ensures the documentation remains up to date with the latest project developments.
