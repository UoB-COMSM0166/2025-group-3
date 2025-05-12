---
title: "18 March"
description: ""
summary: ""
date: 2025-03-18T15:28:00+00:00
lastmod: 2025-03-18T15:28:00+00:00
draft: false
weight: 50
categories: []
tags: []
contributors: []
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  robots: "" # custom robot tags (optional)
---
## Meeting Minutes

**Course**: Software Engineering Discipline and Practice COMSM0166
 **Date**: March 18, 2025
 **Topic**: Sustainability Analysis and Green Design Integration
 **Participants**: All team members

------

### 1. Meeting Objectives

1. Apply the **Sustainability Awareness Framework (SusAF)** to assess the sustainability impact of the Capoo game.
2. Structure the identified impacts into **Chains of Effects**.
3. Translate the analysis results into user stories and epics, and add them to the project repository.
4. Select and plan the implementation of at least three **Green Software Foundation Implementation Patterns** in the game code.

------

### 2. Key Workshop Activities

####  1. Review of the AWS Sustainability Case (10 minutes)

------

####  2. Applying the Sustainability Awareness Framework (80 minutes)

A systematic analysis of the Capoo game was conducted based on the five SusAF dimensions:

| Sustainability Dimension | Guiding Questions & Analysis Focus                           |
| ------------------------ | ------------------------------------------------------------ |
| **Individual**           | Does the game encourage positive or negative personal behaviors? Is it addictive? |
| **Social**               | Does it promote collaboration, education, or fairness?       |
| **Environmental**        | What are the impacts on natural resources and energy usage?  |
| **Economic**             | Does it help with skill development, economic opportunities, or cost control? |
| **Technical**            | Is the software maintainable and extensible?                 |

------

####  3. Building Chains of Effects (20 minutes)

- Structured analysis of Capoo's short- and long-term impacts from design to deployment and use.
- Example chain: **Poor jump mechanism design → Excessive user retries → User frustration → Reduced experience → Lower project ratings**

------

####  4. Designing User Stories and Epics (20 minutes)

| User Story ID | Description                                                  | Sustainability Goal        |
| ------------- | ------------------------------------------------------------ | -------------------------- |
| US-SUS-01     | As a player, I want the game to prompt rest after extended play to prevent addiction | Individual well-being      |
| US-SUS-02     | As a developer, I want the game to use fewer resources to reduce energy consumption | Environmental friendliness |
| EPIC-SUS-01   | Improve overall code maintainability, including comments and modular design | Technical sustainability   |

- All stories should be added to the GitHub project backlog with defined acceptance criteria.

------

####  5. Green Software Foundation Patterns (20 minutes)

- Read from the Green Software Pattern Catalog:
   <https://patterns.greensoftware.foundation/catalog/>
- The group selected the following three patterns for implementation:

| Pattern Name          | Application Description                                      |
| --------------------- | ------------------------------------------------------------ |
| **Demand Shaping**    | Optimize loading screens to balance server load during player peak times |
| **Carbon Efficiency** | Reduce loading of unnecessary assets (e.g., large sound or image files) |
| **Energy Efficiency** | Optimize game loops to lower CPU usage, e.g., pause updates when idle |

------

### 3. Follow-up Tasks and Documentation

1. **Complete and submit the SusAF analysis worksheet** to the project repository.
2. **Add documentation for user stories and selected green patterns** to the repository.
3. **Integrate the selected Green Software Patterns into the project code**, to be used for future evaluations.
4. **Continue Capoo game development**, prioritizing sustainability-related features.

