# Sustainability Impact Analysis Report for *Capoo*

## 1. Introduction

*Capoo* is a platform-based puzzle game designed for casual players. It combines easy-to-learn controls with challenging puzzles, aiming to deliver both entertainment and moderate cognitive stimulation. This report applies the **Sustainability Awareness Framework (SusAF)** to systematically assess *Capoo*'s sustainability impact across five dimensions: **Individual, Social, Environmental, Economic, and Technical**. The goal is to identify potential risks and opportunities, and to propose actionable improvements that can be translated into project requirements, supporting the game's long-term development and user well-being.

------

## 2. Overview of Methodology

This analysis employs the **Sustainability Awareness Framework (SusAF)**, which guides development teams in identifying a software system’s sustainability impact across the five dimensions through structured reflection questions. It also fosters informed decision-making for sustainability-oriented development.

The analysis includes:

- Identifying the current impact of the game across each dimension
- Evaluating potential sustainability risks and opportunities
- Proposing improvements and translating them into **user stories**

------

## 3. Sustainability Impact Analysis (by Dimension)

### 3.1 Individual Dimension

**Impact Overview**
 *Capoo* promotes logical thinking and problem-solving through puzzles while offering relaxation and entertainment, which may support mental well-being. However, excessive gameplay could lead to addiction or poor time management.

**Risks and Opportunities**

- ✅ Enhances logical thinking and puzzle-solving skills
- ⚠️ Extended playtime may lead users to neglect real-life responsibilities (e.g., study or work)

**Recommendations**

- Add **gameplay duration reminders** and **healthy gaming tips**
- Implement **daily challenges** or **time-limit settings** to encourage responsible play

**User Stories**

- *As a player, I want to receive a reminder after 30 minutes of gameplay so that I can better manage my leisure time.*
- *As a player, I want to set a daily gameplay time limit to help me manage my time effectively.*

------

### 3.2 Social Dimension

**Impact Overview**
 Currently, *Capoo* lacks social features, limiting player interaction and community development. However, its puzzle nature and light-hearted style have the potential to attract a diverse player base.

**Risks and Opportunities**

- ✅ Can foster community and interaction via leaderboards, co-op modes, or sharing features
- ⚠️ Without accessibility features, it may alienate players with disabilities or non-English speakers

**Recommendations**

- Introduce **community forums**, **cooperative level modes**, or **achievement sharing**
- Support **colorblind mode**, **high-contrast mode**, and **multi-language options** to enhance accessibility

**User Stories**

- *As a colorblind user, I want to switch to high-contrast mode so I can clearly identify puzzle elements.*
- *As a player, I want to share my progress and achievements with friends to enhance the social experience.*

------

### 3.3 Environmental Dimension

**Impact Overview**
 Running *Capoo* on mobile devices involves high CPU and GPU usage, which can lead to overheating and fast battery drain. If cloud storage or online features are used, data transmission and storage could further increase energy consumption.

**Risks and Opportunities**

- ✅ Optimize asset loading and rendering to reduce energy usage
- ⚠️ Poor resource management may increase device power consumption and carbon footprint

**Recommendations**

- Implement **image compression**, **on-demand asset loading**, and an efficient **rendering pipeline**
- Add a **power-saving mode** to let users adjust frame rate and visual quality
- Optimize background behavior to **pause resource usage** when inactive

**User Stories**

- *As an environmentally conscious user, I want to enable power-saving mode to reduce energy use and extend battery life.*
- *As a mobile user, I want the game to automatically pause in the background to save power.*

------

### 3.4 Economic Dimension

**Impact Overview**
 *Capoo* follows a free-to-play model with monetization via in-app purchases and video ads between levels. Purchasable content includes cosmetics and additional levels.

**Risks and Opportunities**

- ✅ In-app purchases and ads can fund ongoing development and maintenance
- ⚠️ Poorly designed monetization (e.g., excessive ads or pay-to-win) may drive users away and threaten long-term viability

**Recommendations**

- Restrict in-app purchases to non-essential cosmetic items
- Offer **reward-based ads** so users can opt in
- Include a **“Support the Developer”** donation feature

**User Stories**

- *As a non-paying player, I want to unlock rewards by completing levels rather than making purchases.*
- *As a player, I want in-app purchases to be optional and non-intrusive to ensure fair gameplay for all.*

------

### 3.5 Technical Dimension

**Impact Overview**
 *Capoo* is developed using the Unity engine and supports both iOS and Android platforms. The game’s architecture directly affects long-term maintainability, platform compatibility, and scalability.

**Risks and Opportunities**

- ✅ A well-structured architecture supports future feature development and minimizes technical debt
- ⚠️ Poor design may hinder platform support or feature upgrades, increasing maintenance costs

**Recommendations**

- Use **modular architecture** for better scalability and maintenance
- Optimize performance to ensure smooth gameplay on **low-end devices**
- Leverage **open-source libraries** to reduce development cost and improve code quality

**User Stories**

- *As a user with a low-end Android phone, I want the game to run smoothly without lag or overheating.*
- *As a player, I want the game to remain compatible and stable after updates.*

------

## 4. Conclusion and Future Work

This analysis highlights the sustainability challenges and opportunities for *Capoo* across five dimensions:

- **Individual**: Supports cognitive development but poses risks of overuse
- **Social**: Lacks social features, limiting interaction and community growth
- **Environmental**: High resource usage; optimization needed for lower energy impact
- **Economic**: Monetization must balance user experience and financial sustainability
- **Technical**: Architecture must support long-term scalability and maintainability

To implement a greener software strategy, it is recommended to **prioritize the user stories above** and gradually incorporate them into the **product backlog**. Additionally, the team should reference patterns from the **Green Software Foundation** to further optimize the game’s energy efficiency and resource usage.