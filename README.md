# Expense Tracker

Academic full-stack project combining a React/Next.js interface with an Express API and a MySQL database.

## Implemented features
- Enter a monthly budget and see spending totals and threshold warnings.
- Add expenses with a category, amount, and date; retrieve saved expenses from MySQL.
- Use React Context to share budget and expense state.
- Express endpoints for listing, creating, updating, and deleting expenses.
- Form validation, loading/error states, typed context, and configurable API/database settings.

## Run locally
Requirements: Node.js 20.9+, npm, MySQL, and two terminals.

1. Create the demo database with the backend `schema.sql` file:
```bash
mysql -u root -p < "backend-examen - I Parcial/backend-examen - I Parcial/schema.sql"
```
2. Start the backend:
```bash
cd "backend-examen - I Parcial/backend-examen - I Parcial"
npm ci
cp .env.example .env
# Edit .env with your local MySQL connection details.
npm start
```
3. In a second terminal, from the repository root:
```bash
npm ci
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000. The default API URL is http://localhost:5000.

## Demo walkthrough
Enter with the displayed demo credentials, set a positive budget, add a dated expense, and compare the total against the budget. Reload the expense page to retrieve records from the database.

## Checks
From the frontend root: `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
From the backend directory: `npm test`.

## API
| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/gasto` | List expenses |
| POST | `/gasto` | Create an expense |
| PUT | `/gasto/:idgasto` | Replace an expense's category, amount, and date |
| DELETE | `/gasto/:idgasto` | Delete an expense |

POST and PUT accept JSON such as `{"categoria":"Comida","monto":"120.50","fecha":"2026-11-05"}`.

## Scope and limitations
This is a learning project, not a production finance service. The login screen is a browser-side demonstration, not secure authentication. The API has no authentication or user isolation. Run it locally with synthetic data only. Budget and demo login state remain in memory; expense records persist in MySQL. The interface currently exposes listing and creation; update/delete are API capabilities.
