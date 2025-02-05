---
title: "Week 4 - Game Requirement"
description: ""
summary: ""
date: 2025-02-04T17:25:00+00:00
lastmod: 2025-02-04T17:25:00+00:00
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

# Capoo Game Requirements

## 1. Identify Stakeholders 
Stakeholders are people who have an interest in the game. Possible stakeholders for **Capoo**:

 - **Players** – People who play the game.
 - **Developers** – Team members coding and designing the game.
 - **Game Designers** – Those responsible for the game mechanics and experience.
 - **Artists** – Create visual assets like characters, UI, and animations.
 - **Testers** – Ensure the game is functional and bug-free.
 - **Publishers/Marketing Team** – Promote and distribute the game.

---

## 2. Assign Stakeholder Roles & Write Epics & User Stories 
Each stakeholder has different needs, represented as **epics** and **user stories**.

### Epic: Core Gameplay (Player)

#### User Story 1:
**As a player, I want to control my character to move and interact so that I can experience the game world.**

##### Acceptance Criteria:
- **Given** the game is running,
- **When** I use the keyboard, mouse, or controller,
- **Then** the character should be able to walk, run, jump, and interact with the environment.

#### User Story 2:
**As a player, I want clear objectives or tasks in the game so that I can progress.**

##### Acceptance Criteria:
- **Given** I open the quest menu,
- **When** I check my current task,
- **Then** I should see a clear list of tasks, goals, and potential rewards.

---

### Epic: Exploration & World Interaction (Player)

#### User Story 1:
**As a player, I want the game world to be filled with exploration elements so that I can enjoy discovering new content.**

##### Acceptance Criteria:
- **Given** I explore different areas,
- **When** I enter a new location,
- **Then** the area should have unique environmental features, NPCs, and hidden content, including dialogues and interactions with NPCs.

#### User Story 2:
**As a player, I want interactive environments so that my exploration experience feels dynamic.**

##### Acceptance Criteria:
- **Given** I find interactive objects,
- **When** I interact with them,
- **Then** they should trigger corresponding effects (e.g., opening doors, activating switches, destroying objects).

---

### Epic: Economy System (Player)

#### User Story 1:
**As a player, I want to earn in-game currency so that I can purchase items or equipment.**

##### Acceptance Criteria:
- **Given** I complete tasks or defeat enemies,
- **When** I collect rewards,
- **Then** I should receive currency or valuable items.

#### User Story 2:
**As a player, I want to trade items with other players so that I can exchange resources efficiently.**

##### Acceptance Criteria:
- **Given** the trading system is enabled,
- **When** I initiate a trade with other players,
- **Then** I should be able to securely offer and exchange items.

---

### Epic: UI & User Experience (Developer)

#### User Story 1:
**As a developer, I want the game UI to be clear and intuitive so that players have a better experience.**

##### Acceptance Criteria:
- **Given** the game is running,
- **When** the player accesses the UI or navigates,
- **Then** essential information (e.g., tasks, inventory) should be clearly visible, and the UI should be responsive and user-friendly.

#### User Story 2:
**As a developer, I want to provide a proper tutorial to help new players get started quickly.**

##### Acceptance Criteria:
- **Given** a new player starts the game,
- **When** they begin playing,
- **Then** an interactive tutorial should introduce core mechanics step by step.

---

### Epic: Game Mechanics (Developer)

#### User Story 1:
**As a developer, I want the code structure to be modular so that I can easily update game mechanics.**

##### Acceptance Criteria:
- **Given** the game codebase,
- **When** I work on a new game mechanic,
- **Then** the core mechanics should be encapsulated in independent classes/modules.

#### User Story 2:
**As a developer, I want a logging system so that I can track errors in the game process.**

##### Acceptance Criteria:
- **Given** the game is running,
- **When** an error occurs,
- **Then** the error should be logged in a log file.


---

## 3. Choose One User Story and Break It Down into Tasks 

### **User Story 1:**
**As a player, I want to control my character to move and interact so that I can experience the game world.**

#### **Acceptance Criteria:**
- **Given** the game is running,
- **When** I use the keyboard, mouse, or controller,
- **Then** the character should be able to walk, run, jump, and interact with the environment.

---

### **Tasks Breakdown:**

#### 1. **Character Movement System (Walking & Running)**  
   - **Task 1.1:** Implement character movement controls for the keyboard (WASD keys).
   - **Task 1.2:** Implement character movement controls for the mouse (click-to-move or directional movement).
   - **Task 1.3:** Implement character movement controls for the controller (analog stick movement).
   - **Task 1.4:** Set up sprint functionality for running (e.g., holding down a shift key or button).
   
#### 2. **Character Jumping Mechanics**  
   - **Task 2.1:** Implement a jump mechanic when a player presses the jump button (space bar, controller button).
   - **Task 2.2:** Set jump physics (gravity, height, and duration).
   - **Task 2.3:** Integrate jump with movement so that jumping while running or walking works smoothly.

#### 3. **Interaction System**  
   - **Task 3.1:** Set up interaction key/button for objects or NPCs (e.g., E key or controller button).
   - **Task 3.2:** Define interactable objects in the game world (e.g., doors, NPCs, items).
   - **Task 3.3:** Develop interaction behavior for objects, such as opening doors or talking to NPCs.
   - **Task 3.4:** Create visual feedback (highlight or prompt) to indicate when an object or NPC is interactable.
   
#### 4. **Character Animation Integration**  
   - **Task 4.1:** Integrate animations for walking, running, and jumping.
   - **Task 4.2:** Implement animation blending for smooth transitions between actions (e.g., from walking to running).
   - **Task 4.3:** Link animations with control inputs to ensure seamless character movement.

#### 5. **Testing & Refinement**  
   - **Task 5.1:** Test the character movement system across all input devices (keyboard, mouse, controller).
   - **Task 5.2:** Ensure that character movement, jumping, and interaction work without issues.
   - **Task 5.3:** Conduct player feedback sessions to refine controls and interaction mechanics.
   - **Task 5.4:** Optimize performance for smooth gameplay, especially for low-end devices.

---

## 4. Discuss with Another Team 
Compare stakeholders, epics, user stories, and acceptance criteria with another team. Questions to discuss:

 - Are we missing any stakeholders?
 - Do our user stories cover the full gameplay experience?
 - Are our acceptance criteria detailed enough?
 - What did the other team do differently that we can learn from?

### **Utility of This Exercise:**
 - Ensures every aspect of the game is considered.
 - Helps in planning development efficiently.
 - Makes it easier to track progress.
 - Improves communication within the team.

---

## 5. Brief reflection

In this project, we gained a deep understanding of how to use Epics, User Stories, and Acceptance Criteria to build requirements. Breaking down the app's features into Epics helped us address player needs while enabling us to quickly adjust to issues in the game.

We realized that User Stories should be written from the perspective of the end-user, such as players who desire a good gaming experience. Writing clear and concise User Stories not only improved internal communication within the team but also helped us prioritize features effectively.

Acceptance Criteria played a crucial role in defining the completion standards for features. By establishing specific and testable standards, we ensured that developers, testers, and stakeholders had a shared understanding of the expected behavior. This reduced uncertainty in the requirements and kept us focused on the user.

In our application scenarios, we recognized the importance of designing core gameplay to ensure smooth operation and a good experience for players. The app must support players' exploration and adventures while encouraging social interactions. Additionally, the app needs to ensure fun and usability, designing different game environments based on user preferences.

This structured requirement analysis approach helped us create a game that is clearly defined and centered around user experience.

