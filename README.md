# 🛠️ School Vaccination Portal - Backend

This is the backend service for the School Vaccination Portal. 
It manages student records, vaccination drives, and vaccination reports.

## 🚀 Tech Stack

- Node.js & Express.js
- PostgreSQL
- REST APIs

## 📂 Folder Structure

```
backend/
├── controllers/
├── models/
├── routes/
├── .env
├── db.js
├── index.js
└── README.md
```

## 🔧 Setup Instructions

1. Clone the backend branch:

   ```bash
   git clone -b backend https://github.com/your-username/school-vaccination-portal.git
   cd school-vaccination-portal
   ```

2. Install dependencies:

   ```bash
    npm install express pg sequelize cors dotenv body-parser
   ```

3. Create a `.env` file in the root and configure it:

   ```env
    PORT=5000
    DB_USER=postgres
    DB_PASSWORD=123qwe
    DB_NAME=SchoolVaccinationDB
    DB_PORT=5432
    DB_HOST=localhost
    ADMIN_USER = admin
    ADMIN_PASS = password123
    UPCOMING_DRIVES_LIMIT = 30
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. The backend will run at:

   ```
   http://localhost:5000
   ```

## 🧪 API Endpoints

- `POST /api/login`
- `GET /api/students`
- `POST /api/students`
- `PUT /api/students/:student_id`
- `DELETE /api/students/:student_id`
- `GET /api/drives`
- `POST /api/drives`
- `PUT /api/drives/:id`
- `DELETE /api/drives/:id`
- `GET /api/dashboard`
- `GET /api/reports`
