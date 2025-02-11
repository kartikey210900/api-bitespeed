# Bitespeed Identity Reconciliation API

## 📌 Project Overview
This project provides an API endpoint (`/identify`) to reconcile user identities based on email and phone numbers. The system links duplicate contacts and maintains a primary contact for reference.

## 🚀 Features
- Identifies and links duplicate contacts.
- Stores contact information in a **PostgreSQL** database.
- Implements Sequelize ORM for database operations.
- Uses **Express.js** to build a RESTful API.
- Hosted on **Render.com**.

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Hosting:** Render

## 📥 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/bitespeed-assignment.git
cd bitespeed-assignment
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file and add the following:
```env
DB_URL=postgresql://your_db_user:your_db_password@your_db_host/your_db_name
PORT=3000
```

### **4️⃣ Run Migrations**
```sh
npx sequelize-cli db:migrate
```

### **5️⃣ Start the Server**
```sh
node server.js
```
🚀 Server will start on `http://localhost:3000`

## 📌 API Usage
### **POST /identify**
- **Endpoint:** `https://api-bitespeed.onrender.com/identify`
- **Request Body (JSON):**
  ```json
  {
    "email": "hello@example.com",
    "phoneNumber": "13444"
  }
  ```
- **Response Example:**
  ```json
  {
    "contact": {
      "primaryContactId": 4,
      "emails": ["hello@example.com"],
      "phoneNumbers": ["13", "13444"],
      "secondaryContactIds": [4, 5]
    }
  }
  ```

## 📡 Deployment
This project is deployed on **Render**.
To deploy:
1. Push code to GitHub.
2. Connect Render with your repo.
3. Set up environment variables on Render.
4. Deploy & monitor logs.

## 🤝 Contributing
Feel free to fork the repo and submit PRs.

## 📜 License
This project is licensed under the MIT License.
