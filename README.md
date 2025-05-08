# 2025-group-3
2025 COMSM0166 group 3

## Your Game


<div align="center">
  <a href="https://uob-comsm0166.github.io/2025-group-3/game/">🎮 Capoo Game Demo 😻</a>
</div>
<br>
<img src="./images/theme.jpg" alt="picture of game theme" />

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Your Group

<img src="./images/group.jpg" alt="photo of group members" />

| Name | Email | Github | Role |
| -- | -- | -- | -- |
| Shuyin Deng | ta24493@bristol.ac.uk | @Ruby-sy | Project Manager |
| Jiaxin Fan | sg24148@bristol.ac.uk | @paidaxin760 | Technical Writer |
| Peixuan Li | ra24381@bristol.ac.uk | @pluvo070 | Developer |
| Yibu Ma | sd24536@bristol.ac.uk | @Grooveofmimosa | Developer |
| Yu Qiu | kp24679@bristol.ac.uk | @PekkaLnx | Developer |
| Jiahao Liu | qi24477@bristol.ac.uk | @TYHD759 | Test Engineer |


## Your Kanban

[Kanban board](https://github.com/orgs/UoB-COMSM0166/projects/76)


# Project Report

## Table of Contents

1. [Introduction](#1-introduction)  
2. [Requirements](#2-requirements)  
3. [Design](#3-design)  
4. [Implementation](#4-implementation)  
5. [Evaluation](#5-evaluation)  
6. [Process](#6-process)  
7. [Sustainability, Ethics and Accessibility](#7-sustainability-ethics-and-accessibility)  
8. [Conclusion](#8-conclusion)  
9. [Individual Contributions](#9-individual-contributions)  

---

## 1. Introduction

*Capoo* is a 2D puzzle-platformer game that blends casual accessibility with strategically designed challenges. Developed by a six-member student team, the game features Capoo, a quirky blue cat-bug hybrid, as the main character. Players must navigate through levels filled with interactive objects, environmental puzzles, and platforming elements.

The core inspiration for *Capoo* stems from two sources: the relaxing yet open-ended mechanics of *Stardew Valley*, and the physics-driven, meme-based absurdity of *Cato*. From these references, the team set out to create a humorous but polished experience, emphasizing both ease of play and cognitive stimulation.

Capoo stands out through its charming art style, whimsical animations, and novel mechanics—particularly the dynamic interactions with environmental objects and adjustable difficulty levels. Furthermore, the development process applied agile practices and user-centered design principles, integrating feedback from playtesting and usability evaluation throughout the project.

The goal of this report is to detail the development journey of *Capoo*, covering requirements engineering, system design, implementation, evaluation, team process, and sustainability considerations. It aims to document the technical and creative decisions made, the challenges encountered, and the lessons learned during development.

---

## 2. Requirements

### 2.1 Ideation Process

The initial ideation phase involved a collaborative exploration of successful indie games across various genres. Through group discussion and voting, the team shortlisted two influential titles: *Stardew Valley* and *Cato*. *Stardew Valley* inspired the idea of open-ended exploration and a charming aesthetic, while *Cato* introduced an absurd physics-driven puzzle mechanic with humor. After evaluating each idea’s feasibility, originality, and potential technical complexity, the team chose to develop a 2D puzzle-platformer based on Capoo, a cat-bug mascot popular for its humorous expressions and meme status. The choice allowed for creative level design, whimsical animation, and the use of Unity's physics engine to support challenging gameplay.

### 2.2 Stakeholder Identification

The main stakeholders for *Capoo* were:

- **Players**: End-users who play the game and provide feedback.
- **Developers**: Team members implementing game logic and features.
- **Designers**: Responsible for crafting puzzles, UI, and character behaviors.
- **Artists**: Create visual assets, animations, and icons.
- **Test Engineers**: Validate usability, performance, and stability.
- **Publishers**: Potential distributors or promoters of the final game.

Each stakeholder’s expectations were captured using epics and user stories.

### 2.3 Epics and User Stories

The following epics were developed, each with sample user stories and acceptance criteria:

#### **Epic: Core Gameplay (Player)**

- *As a player, I want to control my character so I can explore the game world.*
   **Acceptance Criteria**: Character responds to input with walking, jumping, and interacting.
- *As a player, I want to be presented with clear objectives.*
   **Acceptance Criteria**: Tasks are displayed in a quest menu and update as the player progresses.

#### **Epic: Exploration and World Interaction (Player)**

- *As a player, I want each level to contain unique visuals and interactive elements.*
   **Acceptance Criteria**: Levels contain switchable items, dialogue triggers, and exploration rewards.

#### **Epic: UI and UX (Developer)**

- *As a developer, I want the UI to be intuitive so that players can understand controls quickly.*
   **Acceptance Criteria**: A responsive HUD displays player status and goals; tutorial popups guide new players.
- *As a developer, I want to include an interactive tutorial.*
   **Acceptance Criteria**: Tutorial teaches movement, jumping, and puzzle interaction through guided actions.

#### **Epic: Game Mechanics (Developer)**

- *As a developer, I want modular code so that gameplay systems can be easily updated.*
   **Acceptance Criteria**: Movement, physics, and interaction logic are isolated in separate scripts or classes.

#### **Epic: Accessibility and Time Management (Player)**

- *As a player, I want to receive a reminder after playing for 30 minutes.*
   **Acceptance Criteria**: Notification appears at the 30-minute mark, encouraging breaks.
- *As a player, I want to set a daily playtime limit.*
   **Acceptance Criteria**: Game allows players to configure a daily session cap in settings.

### 2.4 Detailed Task Breakdown

The team broke down user stories into implementable tasks. For example, the "core movement" story led to:

1. **Movement System**: Implement character locomotion with keyboard/controller.
2. **Jumping Mechanic**: Design jump arc, gravity, and mid-air control.
3. **Interaction System**: Detect interactable objects (e.g., switches, NPCs).
4. **Animation Integration**: Connect animations to movement states.
5. **Playtesting and Feedback**: Gather usability feedback to adjust control responsiveness.

### 2.5 Use Case Diagram and Specification

> 📌 *Use Case Diagram:*  
> ![Use Case Diagram](./assets/use-case-diagram.png)  
> *(Insert diagram showing major player and developer interactions.)*

### 2.6 Cross-Team Comparison & Reflection

The team engaged in cross-team discussions to compare stakeholder analysis, epics, and story quality. This provided valuable insight into how other teams defined player needs and structured tasks. It highlighted the need to include accessibility considerations and encouraged clearer, more measurable acceptance criteria.

### 2.7 Summary

The requirement phase helped the team define a development roadmap rooted in real player needs. Agile methods, including task breakdown and iterative reviews, supported prioritization and flexible response to feedback. The stories and use cases ensured the game’s functionality aligned with user expectations while accounting for sustainability, accessibility, and replayability.

---

## 3. Design

### 3.1 System Architecture

The architecture of *Capoo* is modular and layered, following separation of concerns to support scalability and maintainability. The game was developed using the Unity engine, leveraging its built-in physics and animation systems. The architecture is divided into four primary layers:

- **Input Layer**: Manages player input from keyboard, mouse, or controller.
- **Logic Layer**: Handles core gameplay logic, including movement, interaction, puzzles, and physics triggers.
- **UI Layer**: Manages HUD, dialogue boxes, menus, and tutorial overlays.
- **Rendering Layer**: Coordinates animation, transitions, and sprite display.

This structure enables parallel development and unit testing. Game logic and UI code were decoupled using events and observers, enabling modular feature updates without introducing side effects.

### 3.2 Class Diagram

> 📌 *Class Diagram:*  
> ![Class Diagram](./assets/class-diagram.png)  
> *(Uploaded image: f9e1970c-8789-4314-be3c-bcbe713d75e8.png)*

### 3.3 Sequence Diagram

> 📌 *Sequence Diagram:*  
> ![Sequence Diagram](./assets/sequence-diagram.png)  
> *(Insert diagram showing player input and game object interactions.)*

### 3.4 Behavior Design and Game Flow

The behavior model of *Capoo* focuses on reactive gameplay: players act, and the world responds. Puzzle elements are designed around spatial reasoning and trigger-based logic. A typical level flow includes:

1. **Start**: Player spawns at a checkpoint.
2. **Exploration**: Player investigates the environment, collecting hints.
3. **Interaction**: Player activates mechanisms, moves platforms, or talks to NPCs.
4. **Completion**: Upon solving the puzzle or reaching the goal, the next level is unlocked.

Special attention was given to how puzzles scale with difficulty. Levels at difficulty L2 introduce timing constraints and more complex dependencies between puzzle elements, as reflected in the Evaluation chapter.

### 3.5 UI & UX Design

Capoo’s user interface was designed for clarity and minimalism. It includes:

- **Status Area**: Displays current objective, remaining lives (if any), and tips.
- **Dialogue Box**: Positioned at the bottom, triggered by proximity to NPCs.
- **Menu System**: Allows pause, settings adjustment, and tutorial replay.

UI behavior was modeled as a finite state machine (FSM), transitioning between states like `Idle`, `Dialog`, `Paused`, and `ActivePlay`. This simplified state handling and minimized unexpected UI bugs.

### 3.6 Visual & Audio Assets

Although not the focus of this report, the visual style follows a hand-drawn, cartoon aesthetic inspired by the original Capoo character. Audio cues were added for jumping, puzzle completion, and menu transitions. All assets were optimized to maintain low loading times and mobile performance.

### 3.7 Design Reflection

The design phase enabled the team to formalize implementation plans and reduce risks early on. UML models made internal communication more efficient and ensured consistent implementation. By separating rendering from logic, and structuring puzzle elements around abstract interfaces, the game remained flexible for feature additions.

---

## 4. Implementation

The implementation of *Capoo* was carried out using Unity and C#, focusing on delivering a playable, polished 2D puzzle-platformer experience. The team adopted an iterative development cycle, using GitHub Projects and weekly Kanban boards to manage sprints. Implementation centered around several core modules: player movement, puzzle mechanics, and interaction systems. Three major technical challenges arose during development: physics handling for platforming, scalable puzzle architecture, and input system generalization.

------

### 4.1 Core Systems and Modules

#### A. **Player Movement and Physics**

The `PlayerController` script manages character movement, jump mechanics, and collision with terrain. Unity's Rigidbody2D and BoxCollider2D components were used to simulate realistic motion and platforming interactions. Jump buffering and coyote time were implemented to improve responsiveness:

- **Jump Buffering**: Allows jump input to be temporarily stored when pressing the jump button just before landing.
- **Coyote Time**: Lets the player jump a few milliseconds after stepping off a platform, improving playability.

To reduce jitter and ensure smooth transitions between idle, walk, and jump states, an Animator Controller was integrated with conditions mapped to movement state variables.

#### B. **Puzzle Interaction System**

The puzzle system was built around a modular `PuzzleObject` superclass, extended by concrete implementations such as `Switch`, `Door`, and `PlatformTrigger`. All objects implement a shared `IInteractable` interface with an `Activate()` method. Puzzle chains were managed via Unity Events or direct references.

For example:

- A switch triggers a door if `isLinked` is true.
- Some puzzles require simultaneous activation of multiple levers.
- States are stored using a `PuzzleStateManager` to allow resets and save points.

This design allowed flexibility in puzzle design and encouraged experimentation during level creation.

#### C. **UI and Tutorial System**

Unity UI (uGUI) was used to build the in-game interface. The `UIManager` dynamically updates objectives and tutorial messages. An interactive tutorial was built into the first level and designed to teach the player through experience rather than text. Context-sensitive tips appear when the player encounters new mechanics.

------

### 4.2 Major Development Challenges

#### 1. **Physics and Collision Bugs**

A major challenge was ensuring stable physics-based interactions. Unity's built-in 2D physics system occasionally caused the character to stick to walls or clip through platforms. The team addressed this by:

- Refining collider shapes and edge colliders for platforms.
- Applying drag and velocity capping to limit out-of-control motion.
- Using raycasting for grounded checks instead of relying solely on physics events.

#### 2. **Scalable Puzzle Logic**

Initially, puzzle logic was hardcoded for specific levels. This approach quickly became unsustainable. To resolve this, the team introduced:

- An event-based linking system where puzzle components broadcast actions (`OnActivate`, `OnDeactivate`) that can be listened to by any number of other objects.
- ScriptableObjects to define reusable puzzle configurations.
- Visual indicators to debug link status during development.

This modular architecture improved level editor productivity and reduced bugs.

#### 3. **Cross-Platform Input Abstraction**

Capoo was designed to be compatible with keyboard, controller, and (optionally) mobile input. To unify input handling:

- Unity’s new Input System was adopted over the legacy system.
- A centralized `InputManager` class mapped actions (`Move`, `Jump`, `Interact`) to physical inputs across devices.
- UI elements were responsive to input device changes (e.g., icons switching from keyboard to gamepad).

This enhanced accessibility and made future device support easier.

------

### 4.3 Asset Integration and Optimization

To maintain performance, all visual assets were compressed and sprites were packed using Unity's Sprite Atlas system. Audio was compressed using Vorbis and normalized to avoid distortion. Background assets were layered using parallax scrolling to enhance depth without impacting frame rate.

Object pooling was used for repeated elements such as particle effects, preventing excessive instantiation and memory churn during runtime.

------

### 4.4 Testing and Debugging Tools

In-editor debug tools included:

- **Hitbox Visualizer**: Overlays hitboxes and interaction zones.
- **Puzzle State Viewer**: Displays active/inactive states for all puzzle components.
- **Performance Monitor**: Tracks frame rate and memory usage on test devices.

Unit tests were written for critical scripts like `PlayerController` and `PuzzleObject`. Manual QA was conducted throughout development, with playtest feedback incorporated into the puzzle refinement loop.

------

### 4.5 Summary

Capoo’s implementation required thoughtful design and refactoring to address performance, flexibility, and stability. By modularizing game systems and investing early in reusable architecture, the team reduced long-term technical debt and supported feature expansion. Challenges in physics, puzzle logic, and input abstraction were overcome through a mix of Unity tooling and custom code solutions.

---

## 5. Evaluation

### 5.1 Quantitative Evaluation: NASA TLX & SUS  
#### Objectives

This study aimed to assess:

- How difficulty levels (L1 vs L2) affect player workload using **NASA TLX**.
- How players perceive the usability of the game using **System Usability Scale (SUS)**.
- Whether differences in difficulty meaningfully impact experience.

#### Methodology

- **Participants**: 10 university students with varying gaming experience.
- **Design**: A within-subjects design. Half the participants played L1 first, the other half started with L2 to control for learning effects.
- **Tools**: NASA TLX form (6 dimensions), SUS questionnaire (10 items).
- **Analysis**: Wilcoxon signed-rank test for statistical significance.

#### Results

- **NASA TLX Scores** (Average):
  - L1: 24.58
  - L2: 28.75
     → Slight increase in workload for L2, not statistically significant (W = 36, p > 0.05)
- **SUS Scores** (Average):
  - L1: 45.5
  - L2: 43.5
     → Minor decrease in usability at higher difficulty, also not significant (W = 24, p > 0.05)

#### Interpretation

While L2 presented slightly more physical and mental demands, the differences were not large enough to be statistically significant. The SUS results showed a similar trend, indicating slightly lower satisfaction with L2’s controls, likely due to its increased complexity.

#### Design Insights

- Feedback indicated that L2 puzzles could be made more difficult to better differentiate from L1.
- Some users noted inconsistencies in jump responsiveness at L2, affecting their perception of control.
- The team implemented smoother jump arcs and clearer visual cues in response.
### 5.2 Qualitative Evaluation: Heuristic Evaluation  
#### Method

The team conducted a heuristic evaluation using Nielsen’s 10 usability principles. Team members and test players identified potential issues while observing gameplay.

#### Findings & Fixes

| Heuristic                               | Issue Identified                             | Improvement Implemented                          |
| --------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| **Visibility of system status**         | Lack of feedback when switches are activated | Added audio and particle feedback                |
| **Match between system and real world** | Some puzzle interactions unclear             | Added contextual tooltips and icons              |
| **User control and freedom**            | No way to skip or pause tutorials            | Introduced skip button and pause menu            |
| **Consistency and standards**           | Inconsistent dialogue layout across NPCs     | Unified text box design and alignment            |
| **Recognition vs recall**               | Objective reminders missing during gameplay  | Objectives are now pinned in the top-left corner |
| **Help and documentation**              | Tutorial too text-heavy for beginners        | Replaced with interactive in-game guidance       |
### 5.3 Code Testing and Debugging  
The codebase underwent multiple rounds of testing, including:

- **Unit Tests**: Written for player controls, puzzle activation, and UI visibility logic.
- **Integration Tests**: Verified smooth transitions between levels and puzzle dependencies.
- **Manual Testing**: Developers performed end-to-end playthroughs on both Windows and Android devices.
- **Performance Profiling**: Used Unity Profiler to monitor memory usage, frame rates, and GC allocations. Issues with memory leaks from pooled particles were identified and resolved.

A comprehensive bug tracker was maintained using GitHub Issues. Over 30 bugs were logged and resolved throughout the testing phase.
### 5.4 Summary  
The evaluation process confirmed that *Capoo* is easy to use and cognitively manageable for casual players, even as difficulty increases. While workload and usability metrics did not show significant shifts, qualitative feedback provided actionable insights for polishing level design and improving onboarding. Heuristic evaluation revealed critical UI flaws that were successfully addressed. Ongoing testing ensured stability, performance, and a better user experience across devices.

---

## 6. Process

The development of *Capoo* followed an agile, team-based approach over the course of several weeks. As a six-member team, we divided roles clearly and used regular communication and planning tools to ensure steady progress. This section outlines our team structure, workflow, collaboration tools, and reflections on what worked well—and what could have been improved.

------

### 6.1 Team Roles and Responsibilities

Each member took on a primary role while contributing flexibly across areas:

| Name        | Role             | Responsibilities                                       |
| ----------- | ---------------- | ------------------------------------------------------ |
| Shuyin Deng | Project Manager  | Planning, sprint leadership, requirement modeling      |
| Jiaxin Fan  | Technical Writer | Documentation, evaluations (NASA TLX & SUS), reporting |
| Peixuan Li  | Developer        | Puzzle system implementation, player interaction       |
| Yibu Ma     | Developer        | UI systems, animation integration                      |
| Yu Qiu      | Developer        | Game logic, input handling, Unity build                |
| Jiahao Liu  | Test Engineer    | Manual testing, bug tracking, heuristic evaluation     |



We operated as a cross-functional team, where developers often paired up or reviewed each other’s code, and testers provided early usability feedback.

------

### 6.2 Workflow and Agile Planning

We structured development into **weekly sprints**, starting with requirement elaboration and ending with feature completion and testing. Our agile process included:

- **Sprint Planning**: Weekly meetings to review goals and assign tasks
- **Daily Stand-ups**: Conducted asynchronously via Microsoft Teams
- **Sprint Reviews**: Shared demo builds with the group for feedback
- **Retrospectives**: Reflected on issues and improvements each Friday

Tasks were managed via a shared [GitHub Kanban board](https://github.com/orgs/UoB-COMSM0166/projects/76), with labeled columns for “To Do”, “In Progress”, “In Review”, and “Done”. Issues and pull requests were linked to stories from the requirements phase to maintain traceability.

------

### 6.3 Tools and Platforms

We used a combination of development, communication, and collaboration tools:

- **Unity**: Core game engine (C#), physics simulation, and UI design
- **Git & GitHub**: Version control, issue tracking, Kanban board
- **Visual Studio Code**: Primary IDE for all scripting
- **Miro**: Brainstorming and wireframe sketching during ideation
- **Microsoft Teams**: Daily communication, file sharing, announcements
- **Google Forms & Excel**: Data collection and analysis for evaluations

All members were onboarded with Git early on, and we established branch naming conventions and code review practices to ensure stability.

------

### 6.4 Collaboration Highlights

- **Shared Ownership**: Even though individual roles existed, everyone participated in at least one other area (e.g., writing, testing, or asset design).
- **Asynchronous Work**: With varying schedules, we relied on documentation and GitHub updates to maintain visibility across tasks.
- **Fast Feedback Loops**: By using in-editor playtests and quick builds, we validated ideas within hours, not days.
- **Cross-Team Comparison**: Midway through development, we discussed stakeholder modeling and epic design with another group, helping us refine our approach to user stories and acceptance criteria.

------

### 6.5 Challenges and Improvements

#### ❌ Communication Delays

- Some confusion arose when Git commits overlapped or features conflicted due to asynchronous workflows. We resolved this by increasing pull request discipline and documenting merge decisions.

#### ❌ Task Estimation

- Certain tasks (like implementing modular puzzle logic) took longer than expected. Future projects would benefit from assigning buffer time in sprints.

#### ✅ Effective Debugging

- The creation of custom Unity editor tools (e.g., puzzle link viewer) dramatically improved debugging efficiency and made collaboration more effective.

#### ✅ Test-Driven Fixes

- Having a dedicated test engineer meant bugs were often caught within hours, keeping build quality high.

------

### 6.6 Reflection

The team grew significantly in terms of both technical and collaborative maturity. We learned that agile methods are only effective when paired with accountability and openness. Our structured communication and shared commitment allowed us to respond quickly to issues and polish our game beyond initial expectations.

While there were occasional coordination issues, we ultimately built a stable game that was fun, visually engaging, and user-centered. The project offered valuable experience in translating user stories into code and in working as a professional team within a real-world development cycle.

## 7. Sustainability, Ethics and Accessibility

As digital games become increasingly embedded in daily life, game developers have a responsibility to design experiences that are not only entertaining but also sustainable, inclusive, and ethically sound. To evaluate *Capoo* from these perspectives, we applied the **Sustainability Awareness Framework (SusAF)**, which considers the impact of software systems across five key dimensions: **Individual, Social, Environmental, Economic, and Technical**. Additionally, we reflected on issues of **accessibility** and **ethical design** throughout development.

------

### 7.1 Individual Sustainability

*Capoo* is designed as a casual puzzle-platformer, promoting problem-solving and spatial reasoning. While the game supports cognitive development, it also presents risks of overuse.

- ✅ *Benefit*: Encourages logical thinking and attention through non-violent puzzles.
- ⚠️ *Risk*: Excessive gameplay could disrupt real-world responsibilities.

**Actions Taken**:

- Implemented a **gameplay reminder** after 30 minutes.
- Planned a **time-limit setting** allowing players to manage their screen time.

**User Story Example**:
 *As a player, I want to receive a reminder after 30 minutes of gameplay so I can manage my leisure time responsibly.*

------

### 7.2 Social Sustainability and Accessibility

Initially, *Capoo* was a single-player experience without social features. However, we recognized opportunities to build community and improve accessibility.

- ✅ *Opportunity*: Foster community via achievement sharing or co-op levels.
- ⚠️ *Risk*: Without inclusive design, the game may exclude players with visual impairments or language barriers.

**Actions Taken**:

- Proposed adding **colorblind modes** and **high-contrast UI settings**.
- Began integrating **multi-language support** for future builds.
- Designed **visual prompts** for all interactions (not relying solely on color).

**User Story Example**:
 *As a colorblind user, I want to switch to high-contrast mode so I can clearly identify puzzle elements.*

------

### 7.3 Environmental Sustainability

While *Capoo* is relatively lightweight, resource efficiency on mobile platforms remains important for reducing energy consumption and device strain.

- ✅ *Opportunity*: Lowering energy use prolongs battery life and reduces carbon footprint.
- ⚠️ *Risk*: Unoptimized rendering and idle processes can increase power usage unnecessarily.

**Actions Taken**:

- Introduced a **power-saving mode** with reduced frame rates and particle effects.
- Paused all background logic when the game is minimized or inactive.
- Compressed textures and used **on-demand asset loading** to minimize memory load.

**User Story Example**:
 *As an environmentally conscious user, I want the game to enter power-saving mode to extend battery life.*

------

### 7.4 Economic Sustainability

The game follows a **free-to-play model**, supported by optional cosmetic purchases and reward-based video ads.

- ✅ *Benefit*: Accessible to all users without upfront payment.
- ⚠️ *Risk*: Excessive ads or “pay-to-win” models may alienate players or feel exploitative.

**Actions Taken**:

- Restricted in-app purchases to **cosmetic items** only (e.g., skins).
- Included **optional reward ads**, such as extra hints or bonus currency.
- Added a **“Support the Developer”** donation button to promote ethical monetization.

**User Story Example**:
 *As a non-paying player, I want in-game rewards to be unlocked through skill or effort, not purchases.*

------

### 7.5 Technical Sustainability

Technical decisions affect the game's long-term maintainability, portability, and ability to evolve.

- ✅ *Benefit*: Modular architecture supports updates and device compatibility.
- ⚠️ *Risk*: Poor code practices may increase future maintenance costs.

**Actions Taken**:

- Employed **modular code structure** for game logic and puzzle systems.
- Ensured the game runs on **low-end Android devices** by limiting memory use and draw calls.
- Used open-source libraries with permissive licenses to reduce technical debt.

**User Story Example**:
 *As a user with a low-end phone, I want the game to run smoothly without lag or overheating.*

------

### 7.6 Ethical Considerations

Ethical design was a consistent theme during development:

- **No loot boxes** or gambling-like mechanics.
- **Data Privacy**: No user tracking, personal data collection, or analytics services.
- **Inclusive Themes**: Avoided violent content; focused on humor and exploration.
- **Transparent Monetization**: Users are never forced to watch ads or make purchases to progress.

------

### 7.7 Summary

Our analysis using SusAF revealed both strengths and areas for improvement in *Capoo*’s sustainability profile. We implemented meaningful changes to support responsible use, enhance accessibility, and minimize energy consumption. Economic and ethical concerns were addressed through non-intrusive monetization. Going forward, we plan to integrate feedback-based difficulty adjustments, enhance localization, and further reduce runtime footprint to make *Capoo* an inclusive, sustainable, and enjoyable experience for a broad audience.

------

## 8. Conclusion

The development of *Capoo* has been a rewarding and enlightening experience, both technically and creatively. Over the course of the project, our team successfully designed and implemented a functional 2D puzzle-platformer that combines intuitive controls, charming aesthetics, and moderately challenging gameplay. Through structured planning, collaborative problem-solving, and iterative feedback, we transformed a simple concept into a complete and playable game.

From a technical standpoint, we learned to architect a modular system in Unity, design scalable puzzle mechanics, and manage cross-platform input in a clean, reusable manner. Our implementation of player movement, interactive environments, and real-time feedback systems improved significantly through user testing. We encountered and overcame complex issues such as physics stability, performance optimization, and UI inconsistencies.

Equally important was the experience of working as a collaborative software development team. Using agile methodologies like sprint planning and Kanban tracking, we developed not only the game but also professional project management skills. Team members communicated effectively across disciplines, respecting diverse perspectives and supporting each other in challenging phases.

Evaluation efforts, including quantitative (NASA TLX and SUS) and qualitative (heuristic) methods, provided valuable insights into the user experience. These findings guided improvements in puzzle design, level difficulty, and accessibility—reinforcing our commitment to player-centered development.

While we are proud of the final result, some limitations remain. Time constraints limited the implementation of multiplayer or community features. Additionally, localization support is still in its early stages, and monetization systems are basic. In future iterations, we hope to expand the game with cooperative modes, additional levels, a level editor, and deeper accessibility options.

Ultimately, *Capoo* reflects our collective growth as developers and designers. It stands as a playful, sustainable, and inclusive game prototype—one that we believe delivers both fun and meaningful value to its players. The project has not only strengthened our technical abilities but also deepened our understanding of responsible, user-focused game design.

## 9. Individual Contributions

The following table outlines the key contributions made by each team member throughout the development of *Capoo*. While each member had a primary role, all team members collaborated across disciplines when needed. Tasks were shared fairly, and final contributions were approximately balanced across the group.

| Name            | Role             | Key Contributions                                            |
| --------------- | ---------------- | ------------------------------------------------------------ |
| **Shuyin Deng** | Project Manager  |  |
| **Jiaxin Fan**  | Technical Writer |  |
| **Peixuan Li**  | Developer        |  |
| **Yibu Ma**     | Developer        | |
| **Yu Qiu**      | Developer        |  |
| **Jiahao Liu**  | Test Engineer    |  |



All team members participated in sprint reviews, design discussions, and Git-based version control. Collaboration was smooth and respectful, and each member contributed significantly to the project’s success.
---





























**🌾 Rebuild, Connect, and Live Your Dream Farm Life!**  
<p align="center"><b>Paper Prototype of Stardew Valley</b></p>
<div style="text-align: center;">
  <video src="https://github.com/user-attachments/assets/58f3f51d-4996-4ae9-9c22-3bd4396f7b38" controls width="600"></video>
</div>


**🐱 Spin, Solve, and Defy Gravity in a Buttered Chaos!**  
<p align="center"><b>Paper Prototype of Cato</b></p>
<div style="text-align: center;">
  <video src="https://github.com/user-attachments/assets/e05b9fda-6a7e-4d59-81bc-7519a4a13db8" controls width="600"></video>
</div>



## 4. Class Diagram
![Class Diagram](weekly%20updates/Week%205%20-%20Class%20Diagram.png) 

<p align="center"><b>Class Diagram</b></p>

![Sequence Diagram](weekly%20updates/Week%205%20-%20Sequence%20Diagram.png)

<p align="center"><b>Sequence Diagram</b></p>

---

## 5. Heuristic Evaluation
![Heuristic Evaluation](weekly%20updates/Week%207%20-%20Heuristic%20Evaluation.png)

---






##### Graphical Representation
- **Figure 1: NASA TLX Dimension Comparison**  
  ![NASA TLX Dimension Comparison](images/NASA_TLX_Dimension_Comparison.png)
- **Figure 2: SUS Score Trends**  
  ![SUS Score Trends](images/SUS_Score_Trends.png)
- **Figure 3: Correlation Between SUS and NASA TLX**  
  ![Correlation Between SUS and NASA TLX](images/Correlation_Between_SUS_and_NASA_TLX.png)




### Introduction

- Describe your game, what is based on, what makes it novel? 

### Requirements 

- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop? 

### Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams. 

### Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game. 

### Evaluation

- 15% ~750 words

- One qualitative evaluation (your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

### Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

### Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work. 

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
