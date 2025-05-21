/* === README.md === */

# 🏆 Customer Rewards Program (React JS)

This React application simulates a rewards program for a retailer. Customers earn reward points based on purchase amounts.

## 🎯 Features
- Reward calculation: 
  - 2 points for every dollar over $100
  - 1 point for every dollar between $50 and $100
- View all customers and their monthly + total rewards
- Filter by month/year (default to last 3 months)
- View individual transactions per month
- Pagination support for transactions
- Mock data simulates API with async fetch
- Logging using `logger` and structure inspired by Pino[Parseable Logging]
- Unit tests for business logic and edge cases
- Styled with `styled-components`

---

## 🛠️ Project Structure
```
src/
├── api/               # Simulated async API
├── components/        # UI Components
├── constants/         # Month & Year filters
├── utils/             # Reward logic
├── App.js             # Main app logic
public/
└── transactions.json  # Mock dataset (15 customers)
```

## 🚀 Getting Started

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd rewards-app
npm install
```

### 2. Start the App
```bash
npm start
```
App runs on: [http://localhost:3000](http://localhost:3000)

### 3. Run Tests
```bash
npm test
```


### 4. Node Version
```bash
Node v22.15.1 (LTS)
```
---

## 📸 Screenshots
### 🧾 Rewards Dashboard
![Rewards Screenshot]
![image](https://github.com/user-attachments/assets/9528fed2-4724-4a7f-9215-ab4616d50e65)
![image](https://github.com/user-attachments/assets/e3aeba29-10b3-4207-a9ae-31fabc355dae)
![image](https://github.com/user-attachments/assets/019d6655-532e-4e85-9e3b-3bd78edfa735)




### ✅ Test Passed
![Tests Screenshot]
![image](https://github.com/user-attachments/assets/2caafff0-5824-4352-aa0f-fb1d17bdf028)


---

## 📌 Tech Stack
- React JS 
- Styled Components
- Jest for Unit Testing
- Local Mock JSON for API Simulation

---

## 🔍 Filters
- Month: Dropdown from Jan–Dec (default: last 3 months)
- Year: 2021–2025

---

## ✅ Code Quality Guidelines
- Functional components only
- No static data in components
- Constants, props, and reusable code organized
- `PropTypes` validation on all components
- Proper file naming (`camelCase.js`)

---

## 📄 License
MIT
