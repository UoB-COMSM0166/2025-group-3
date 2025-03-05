# Capoo Quantitative Evaluation Report: Workload and Usability Analysis of Difficulty Levels L1 and L2

**Author**: Shuyin Deng, Jiaxin Fan

**Team Members**: Yibu Ma, Yu Qiu. Peixuan Li, Jiahao Liu, 

**Date**: March 4, 2025

------

## Abstract

This report evaluates the workload and usability of the platformer puzzle game "Capoo" at two difficulty levels (L1 and L2) using NASA TLX and SUS. Ten classmates participated in the test, and data were analyzed using the Wilcoxon signed-rank test. Results indicate that L2 had a slightly higher workload than L1 (28.75 vs 24.58), but the difference was not significant (W = 36, p > 0.05). Similarly, L2 had a lower SUS score than L1 (43.5 vs 45.5), but the difference was also not significant (W = 24, p > 0.05). This suggests that the difficulty variation in Capoo has a limited impact on user experience.

------

## Introduction

### Objective

This report aims to evaluate the user experience of the platformer puzzle game "Capoo" at low difficulty (L1) and high difficulty (L2) using quantitative methods, comparing workload and usability differences.

### Background

NASA TLX is a tool for measuring subjective workload across six dimensions (Hart & Staveland, 1988). SUS is a reliable usability assessment tool (Brooke, 1986). This study combines both methods to analyze the impact of Capoo’s difficulty on player experience.

### Goals

- Quantify the workload (NASA TLX) and usability (SUS) of Capoo at L1 and L2.
- Use statistical tests to determine the significance of differences.

------

## Methodology

### Participants

- **Number**: 10 volunteers.
- **Characteristics**: Classmates with no specific gaming experience requirements.
- **Selection Method**: Random recruitment.

### Experimental Design

- **Difficulty Levels**: Capoo includes L1 (low difficulty) and L2 (high difficulty).
- **Testing Order**:
  - 5 users played L1 first, then L2.
  - 5 users played L2 first, then L1.
  - This minimizes learning effects.

### Data Collection

- **Tools**:
  - NASA TLX: 6 dimensions (raw scores).
  - SUS: 10-question survey.
- **Procedure**: Each user played one difficulty level and then filled out the NASA TLX and SUS forms, resulting in four scores per participant.

### Scoring Method

- **NASA TLX**: Dimension score = (Rating - 1) × 25, Total score = (∑ Dimension scores) / 6.
- **SUS**: Odd-numbered questions = Rating - 1, Even-numbered questions = 5 - Rating, Total score = (∑ Score contributions) × 2.5.

### Data Analysis

- **Tool**: Wilcoxon signed-rank test.
- **Online Calculator**: [Statology Wilcoxon Test Calculator](https://www.statology.org/wilcoxon-signed-rank-test-calculator/)
- **Significance Level**: α = 0.05.

------

## Results

### Data Overview

| User ID | L1 NASA TLX | L2 NASA TLX | L1 SUS | L2 SUS |
| ------- | ----------- | ----------- | ------ | ------ |
| V1      | 12.5        | 16.67       | 55     | 50     |
| V2      | 20.83       | 20.83       | 45     | 35     |
| V3      | 29.17       | 33.33       | 55     | 55     |
| V4      | 20.83       | 25          | 45     | 42.5   |
| V5      | 29.17       | 29.17       | 52.5   | 50     |
| V6      | 37.5        | 41.67       | 37.5   | 40     |
| V7      | 33.33       | 37.5        | 42.5   | 45     |
| V8      | 8.33        | 16.67       | 37.5   | 40     |
| V9      | 37.5        | 45.83       | 35     | 35     |
| V10     | 16.67       | 20.83       | 55     | 42.5   |

- **Averages**: 
  - L1 NASA TLX: 24.58, L2 NASA TLX: 28.75.
  - L1 SUS: 45.5, L2 SUS: 43.5.

#### Graphical Representation

- **Figure 1: NASA TLX Dimension Comparison (Radar Chart)**

 [ ![](C:\Users\moden\Desktop\capoo_tlx_radar_optimized.png)](https://github.com/UoB-COMSM0166/2025-group-3/blob/main/images/NASA%20TLX%20Dimension%20Comparison.png?raw=true)

- **Figure 2: SUS Score Trends (Line Chart)**![](C:\Users\moden\Desktop\capoo_sus_trends_optimized.png)

- **Figure 3: Correlation Between SUS and NASA TLX (Scatter Plot)**![](C:\Users\moden\Desktop\capoo_sus_tlx_scatter_enhanced.png)

### Statistical Analysis

- **NASA TLX**:
  - Wilcoxon test result: W = 36 (n=8, excluding zero values).
  - Critical value (n=8, α=0.05): 3.
  - Conclusion: W > 3, no significant difference.
- **SUS**:
  - Wilcoxon test result: W = 24 (n=8, excluding zero values).
  - Critical value (n=8, α=0.05): 3.
  - Conclusion: W > 3, no significant difference.

------

## Discussion

### Interpretation of Results

- **Workload**: L2 NASA TLX (28.75) is slightly higher than L1 (24.58), mainly due to increased physical demands (e.g., jumping) and mental effort (e.g., puzzle complexity), but the difference is not significant.
- **Usability**: L1 SUS (45.5) is slightly higher than L2 (43.5), suggesting that the increased difficulty of L2 slightly reduced perceived usability, but not significantly.

### Comparison with Expectations

- It was expected that L2 would have a higher workload and lower usability. The observed trend aligns with expectations but does not reach statistical significance, possibly due to insufficient difficulty differences.

### Design Insights

- Increase the difficulty of L2 by making jumps and puzzles more challenging to amplify workload differences.
- Optimize L2’s control smoothness (SUS Q1 and Q6 had lower scores) to reduce inconsistencies.

### Limitations

- Small sample size (10 participants) limits statistical power.
- The difficulty difference between L1 and L2 may not be significant enough to fully reflect puzzle and platforming challenges.

------

## Conclusion

Capoo’s L2 workload is slightly higher than L1 (28.75 vs 24.58), and its SUS score is lower than L1 (43.5 vs 45.5), but neither difference is statistically significant (NASA TLX W = 36, SUS W = 24, p > 0.05). It is recommended to enhance L2’s difficulty and optimize control experience to improve player immersion.

------

## Appendix

### Game Design Updates

1. **Enhance L2 Jumping Difficulty**: Increase platform height and introduce moving obstacles to heighten physical demand.
2. **Optimize Puzzle Consistency**: Standardize puzzle hint styles to improve SUS Q4 (consistency) scores.
3. **Implement Dynamic Difficulty Adjustment**: Adjust jumping and puzzle complexity based on player performance.

### Raw Data

#### L1 NASA TLX

| Dimension       | V1   | V2   | V3   | V4   | V5   | V6   | V7   | V8   | V9   | V10  |
| --------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Mental Demand   | 2    | 3    | 2    | 2    | 1    | 2    | 3    | 3    | 3    | 1    |
| Physical Demand | 2    | 1    | 3    | 3    | 2    | 3    | 3    | 1    | 3    | 3    |
| Temporal Demand | 1    | 1    | 3    | 2    | 3    | 1    | 2    | 1    | 3    | 2    |
| Performance     | 1    | 1    | 1    | 1    | 3    | 3    | 1    | 1    | 1    | 2    |
| Effort          | 1    | 3    | 1    | 2    | 2    | 3    | 3    | 1    | 3    | 1    |
| Frustration     | 2    | 2    | 3    | 1    | 2    | 3    | 2    | 1    | 2    | 1    |

#### L2 NASA TLX

| Dimension       | V1   | V2   | V3   | V4   | V5   | V6   | V7   | V8   | V9   | V10  |
| --------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| Mental Demand   | 2    | 3    | 2    | 2    | 1    | 2    | 3    | 3    | 3    | 1    |
| Physical Demand | 2    | 1    | 3    | 4    | 2    | 4    | 3    | 2    | 4    | 4    |
| Temporal Demand | 1    | 1    | 3    | 2    | 3    | 1    | 2    | 1    | 3    | 2    |
| Performance     | 1    | 1    | 1    | 1    | 3    | 3    | 1    | 1    | 1    | 2    |
| Effort          | 2    | 3    | 2    | 2    | 2    | 3    | 4    | 2    | 4    | 1    |
| Frustration     | 2    | 2    | 3    | 1    | 2    | 3    | 2    | 1    | 2    | 1    |

#### L1 SUS

| Questions                                                | V1   | V2   | V3   | V4   | V5   | V6   | V7   | V8   | V9   | V10  |
| -------------------------------------------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1. The system is easy to use.                            | 3    | 3    | 3    | 4    | 2    | 3    | 3    | 3    | 3    | 2    |
| 2. The system components are well-coordinated.           | 3    | 2    | 2    | 4    | 3    | 4    | 3    | 3    | 3    | 3    |
| 3.Most people can quickly learn to use the system.       | 3    | 2    | 2    | 2    | 4    | 3    | 3    | 4    | 2    | 3    |
| 4. The system has too many inconsistencies.              | 3    | 2    | 2    | 2    | 2    | 2    | 3    | 4    | 3    | 4    |
| 5. Does not require much assistance.                     | 3    | 2    | 4    | 2    | 3    | 3    | 4    | 2    | 3    | 3    |
| 6. Encountered many difficulties while using the system. | 3    | 3    | 2    | 4    | 2    | 4    | 3    | 3    | 4    | 2    |
| 7. Felt confident while using the system.                | 4    | 2    | 3    | 3    | 2    | 2    | 4    | 3    | 2    | 4    |
| 8. Requires learning many things before starting.        | 3    | 3    | 2    | 2    | 2    | 3    | 4    | 4    | 4    | 2    |

#### L2 SUS

| Questions                                                | V1   | V2   | V3   | V4   | V5   | V6   | V7   | V8   | V9   | V10  |
| -------------------------------------------------------- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1.The system is easy to use.                             | 2    | 2    | 2    | 3    | 1    | 2    | 2    | 2    | 2    | 1    |
| 2. The system components are well-coordinated.           | 2    | 1    | 1    | 3    | 2    | 3    | 2    | 2    | 2    | 2    |
| 3. Most people can quickly learn to use the system.      | 2    | 1    | 1    | 1    | 3    | 2    | 2    | 3    | 1    | 2    |
| 4. The system has too many inconsistencies.              | 2    | 1    | 1    | 1    | 1    | 1    | 2    | 3    | 2    | 3    |
| 5. Does not require much assistance.                     | 2    | 1    | 3    | 1    | 2    | 2    | 3    | 1    | 2    | 2    |
| 6. Encountered many difficulties while using the system. | 2    | 2    | 1    | 3    | 1    | 3    | 2    | 2    | 3    | 1    |
| 7. Felt confident while using the system.                | 3    | 1    | 2    | 2    | 1    | 1    | 3    | 2    | 1    | 3    |
| 8. Requires learning many things before starting.        | 2    | 2    | 1    | 1    | 1    | 2    | 3    | 3    | 3    | 1    |

