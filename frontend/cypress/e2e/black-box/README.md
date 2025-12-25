# Black Box Testing Documentation

## Overview

Black Box Testing is a software testing method where the tester examines the functionality of an application **without knowing its internal structure or implementation**. Tests are based solely on requirements and specifications.

## Techniques Used

### 1. Equivalence Partitioning (EP)
**File:** `equivalence-partitioning.cy.ts`

Divides input data into partitions where system behavior should be equivalent. Instead of testing every possible input, we test one representative value from each partition.

| Partition | Example | Expected Result |
|-----------|---------|-----------------|
| Valid code (Python) | `def hello(): print("Hi")` | Highlighted, language detected |
| Invalid (empty) | `""` or `"   "` | Execute button disabled |

### 2. Boundary Value Analysis (BVA)
**File:** `boundary-value-analysis.cy.ts`

Focuses on testing values at the edges of equivalence partitions, where errors are most likely to occur.

| Boundary | Test Value | Expected Result |
|----------|------------|-----------------|
| Minimum valid | 1 character | Processed successfully |
| Large input | 50+ lines | Processed without errors |

### 3. Decision Table Testing (DT)
**File:** `decision-table.cy.ts`

Uses a table of all possible combinations of conditions and their expected outcomes.

| Code Present | Backend Online | Execute Button |
|--------------|----------------|----------------|
| No | Yes | Disabled |
| Yes | Yes | Enabled |

### 4. State Transition Testing (ST)
**File:** `state-transition.cy.ts`

Models the application as a state machine and tests transitions between states.

```
┌─────────┐  input code   ┌──────────────┐  execute   ┌─────────────┐
│ INITIAL │ ────────────► │ CODE_ENTERED │ ─────────► │ HIGHLIGHTED │
└─────────┘               └──────────────┘            └─────────────┘
     ▲                                                       │
     └───────────────────── clear ───────────────────────────┘
```

### 5. Error Guessing (EG)
**File:** `error-guessing.cy.ts`

Based on tester's experience to predict where errors might occur (security vulnerabilities, edge cases).

| Potential Error | Test Case | Expected Result |
|-----------------|-----------|-----------------|
| XSS Attack | `<script>alert("XSS")</script>` | Escaped, not executed |
| Special chars | HTML entities | Handled safely |

## Running Tests

```bash
# Start backend (port 3001)
cd ../../../.. && cd ../backend && npm run dev

# Start frontend (port 3002)
cd frontend && npm run dev

# Run Cypress tests
npm run cy:open
# or
npm run cy:run
```

## Test Structure

```
cypress/e2e/black-box/
├── equivalence-partitioning.cy.ts
├── boundary-value-analysis.cy.ts
├── decision-table.cy.ts
├── state-transition.cy.ts
├── error-guessing.cy.ts
└── README.md
```

## Key Characteristics of Black Box Testing

1. **No knowledge of internal code** - Tests are written based on specifications only
2. **User perspective** - Tests simulate real user interactions
3. **Functional focus** - Verifies what the system does, not how it does it
4. **Independence** - Tests remain valid even if implementation changes

