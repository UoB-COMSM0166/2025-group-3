---
title: "Appx4. Spine Model Integration and ES6 Module"
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

The integration of Spine character models is handled entirely within the `SpineLayer.js` module, which is implemented using **Three.js**. As the name suggests, this module creates an additional rendering layer—a separate `<canvas>`—stacked above the main game canvas. This layer is used exclusively for rendering Spine animations and is visually and functionally decoupled from the core game canvas.

To enable this layered setup, the HTML file must include both `main.js` and `SpineLayer.js`, ensuring that the latter is imported as an ES6 module (`type="module"`). The Spine canvas is styled with `canvas.style.position = "absolute"` so it can overlay the game canvas, and `canvas.style.pointerEvents = "none"` to allow mouse events to pass through to underlying layers.

Each Spine model consists of three essential files: a `.json` file (defining the skeleton and animations), an `.atlas` file (describing how textures are packed), and a `.png` file (containing the image assets). When previewing models in the official **Spine Viewer**, loading just the `.json` file is sufficient.

The main Spine character in our game—the "cat worm"—is composed of **four separate parts**: the body, facial expression, hat (with cat ears), and back accessories. To correctly combine these parts, we align their skeletons based on specific bone names defined in the body’s `.json` file. The body skeleton includes three key bones: `body_face_root`, `hat`, and `back`, which correspond to the root bones of the face, hat, and back models respectively.

To move the entire character, we simply update the coordinates of the body part. The other parts are automatically repositioned relative to the body, thanks to the bone linkage, ensuring a cohesive and synchronized animation.
