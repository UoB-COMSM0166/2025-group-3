---
title: "Appx3. Classes"
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

The overall structure of the project follows the Model-View-Controller (MVC) design pattern introduced in our Java course. We took significant inspiration from the structure of the *OXOGame* project—so much so that the main `OXOGame` class closely resembles our `sketch.js` file in both purpose and structure. The project is built with a strong object-oriented mindset, with each class designed to handle a specific and independent responsibility, promoting maintainability and clarity in the codebase.

We also adopted ES6 module syntax for our scripts. Originally, the codebase used CommonJS modules, but it has since been refactored to fully support modern ES6 module conventions, ensuring better compatibility and cleaner module management.

