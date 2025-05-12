---
title: "Appx5. Map"
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

The game’s map data is created using the **Tiled** map editor. Tiled exports maps in `.json` format, which can be opened directly for inspection or debugging purposes. These exported `.json` files reference `.tsx` files—XML documents that define the tileset used in the map. In turn, each `.tsx` file links to a `.png` spritesheet that contains the actual tile graphics. Additionally, background images used in the map can be directly referenced within the `.json` file itself.

We implemented a dedicated `MapLoader` class to handle the parsing of Tiled-generated `.json` files. This class is responsible for extracting all relevant map data and storing it into the central `GameModel`, ensuring the game logic has access to complete and structured level information during runtime.
