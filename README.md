# 🚀 Aivora – AI SaaS Application

Aivora is a **modern full-stack AI SaaS platform** built using the **MERN stack** that provides AI-powered features with secure authentication, file handling, and scalable architecture.
It is designed for **real-world SaaS deployment**, clean UI, and robust backend performance.

---

## 🌟 Key Highlights

✨ Full-Stack PERN Architecture
🤖 AI-powered content generation
🔐 Secure authentication & authorization
☁️ Cloudinary-based file storage
📁 Image & file uploads using Multer
⚡ Fast Vite + React frontend
📦 Modular & scalable backend structure

---

## 🧠 Project Features

### 🤖 AI Features

* AI-powered response generation
* Centralized AI controller for easy extension
* API-based AI service integration
* Ready for SaaS monetization & feature expansion

### 🔐 Authentication & Security

* JWT-based authentication
* Protected routes using middleware
* Secure environment variable handling
* Role-based access support (extendable)

### 📤 File Upload & Media Handling

* Image/file upload using **Multer**
* Cloud storage using **Cloudinary**
* Optimized media handling for SaaS apps

### 🎨 Frontend (Client)

* Modern UI built with **React + Vite**
* Component-based architecture
* Clean routing using React Router
* Responsive & scalable design
* Environment-based API configuration

### ⚙️ Backend (Server)

* RESTful API using **Express.js**
* MongoDB database integration
* Clean MVC architecture
* Centralized error handling
* Production-ready server setup

---

## 🗂️ Folder Structure

### 📦 Server Structure

```
server/
├── configs/
│   ├── cloudinary.js     # Cloudinary configuration
│   ├── db.js             # MongoDB connection
│   └── multer.js         # File upload config
├── controllers/
│   ├── aiController.js   # AI logic
│   └── userController.js # Auth & user logic
├── middlewares/
│   └── auth.js           # JWT auth middleware
├── routes/
│   ├── AiRoutes.js       # AI routes
│   └── userRoutes.js     # User routes
├── uploads/              # Uploaded files
├── .env                  # Environment variables
├── package.json
└── server.js             # App entry point
```

---

### 🎨 Client Structure

```
client/
├── public/
│   ├── favicon.png
│   ├── gradientBackground.png
│   └── vite.svg
├── src/
│   ├── assets/           # Images & icons
│   ├── components/       # Reusable components
│   ├── config/           # API & env config
│   ├── pages/            # App pages
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React JS
* ⚡ Vite
* 🎨 CSS / Tailwind (if added)
* 🌐 Axios

### Backend

* 🟢 Node.js
* 🚀 Express.js
* 🍃 MongoDB
* 🔐 JWT Authentication
* 📤 Multer
* ☁️ Cloudinary

---

## ⚡ Advantages

✅ Scalable SaaS-ready architecture
✅ Clean separation of frontend & backend
✅ Easy to add new AI tools/features
✅ Secure authentication system
✅ Cloud-based media storage
✅ Production-ready project structure

---

## 🔭 Feature Scope (Future Enhancements)

🚀 Subscription & payment integration
📊 User dashboards & analytics
🧠 Multiple AI tools (image, text, code)
🌙 Dark / Light mode
📱 Mobile responsive improvements
🔔 Notifications & usage limits

---

## 🧪 Environment Variables

### Server `.env`

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
AI_API_KEY=your_ai_key
```

### Client `.env`

```
VITE_API_BASE_URL=http://localhost:5000
```

---

## ▶️ How to Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/Aivora-AI-SaaS-App.git
```

### 2️⃣ Start Backend

```bash
cd server
npm install
npm run dev
```

### 3️⃣ Start Frontend

```bash
cd client
npm install
npm run dev
```

---

## 👨‍💻 Developer

**Niladri Banik**
💡 MCA Student | MERN Stack Developer | AI Enthusiast

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🧑‍💻 Contribute new features

Just tell me 👍
