# Syntax Highlighter - Testing Project

## Project Structure

- **Frontend** (React + TypeScript) — http://localhost:3002/
- **Backend** (Express + TypeScript) — http://localhost:3001/

## Running the Application

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

---

## Black Box Testing (Cypress E2E)

### Cypress Installation

```bash
# Install Cypress as dev dependency
npm install -D cypress

# Install Cypress binary (if needed)
npx cypress install
```

## Cypress E2E Tests (in third terminal)

```bash
# Open Cypress GUI (interactive mode)
npm run cy:open

# Run tests in headless mode
npm run cy:run

# Run E2E tests
npm run test:e2e
```

**Note:** Make sure both frontend (`npm run dev`) and backend are running before running Cypress tests.

---

## White Box Testing (Jest Unit Tests)

### Jest Installation

```bash
# Navigate to backend folder
cd backend

# Install Jest and dependencies
npm install
```

### Running White Box Tests

```bash
# Run all Jest tests
npm test

# Run tests with coverage report
npm run test:coverage
```

**Note:** Jest tests are located in `backend/src/__tests__/white-box/`