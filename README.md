# 🚀 Angular URL Shortener

A full-stack application built with Angular that shortens long URLs, built with a futuristic, cyberpunk aesthetic. Shorten your links, jack into the matrix.

---

## Live URL: (https://surluu.vercel.app/)

---

| Link Shortener | Admin Page (History of Shortened URLs) |
| :---: | :---: |
| <img width="400" alt="Link Shortener" src="https://github.com/user-attachments/assets/b6cb2f0e-f496-434f-9b47-b9e0e91e6490" /> | <img width="400" alt="Admin Page" src="https://github.com/user-attachments/assets/57254af4-60a7-4850-bfb4-939bc1dfa77d" /> |
---

## 📝 Features

* **Shorten URLs:** Convert long, unwieldy URLs into compact, easy-to-share links.
* **Seamless Redirection:** Visiting a short link immediately redirects to the original URL.
* **Admin Dashboard:** A private admin page to view all generated links.
* **Instant Click Updates:** The admin page tracks click counts for each link, updating instantly without needing a refresh.
* **Futuristic UI:** A responsive, cyberpunk-themed interface with neon glow effects and a custom font.

---

## 💻 Tech Stack

This project is built with the ME**A**N stack (substituting React for Angular) and deployed on Vercel.

![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🛠️ Local Development Setup

To run this project on your local machine, follow these steps.

### **Prerequisites**

* Node.js and Angular CLI (`npm install -g @angular/cli`) installed
* A free MongoDB Atlas account for the database

### **1. Clone the Repository**
```bash
git clone [https://github.com/Arnesh-pal/Angular-URL-Shortener.git](https://github.com/Arnesh-pal/Angular-URL-Shortener.git)
cd Angular-URL-Shortener
````

### **2. Backend Setup**

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend folder and add your connection string
touch .env
```

### Your `backend/.env` file should look like this:

```bash
MONGODB_URI=your_mongodb_connection_string
```

```bash
# Start the backend server (uses nodemon for auto-restarts)
npm start
# The server will be running on http://localhost:5001
```

### **3. Frontend Setup**

Open a new terminal window for this step.

```bash
# Navigate to the frontend directory from the root
cd angular-shortener

# Install dependencies
npm install

# Start the Angular development server
ng serve -o
# The app will open at http://localhost:4200
```

### 🌐 Deployment

This application is deployed on Vercel using a monorepo structure with two separate projects.

  * The **backend** is deployed as a Node.js service from the `/backend` root directory.
  * The **frontend** is deployed as an Angular static site from the `/angular-shortener` root directory, with rewrite rules in `vercel.json` to handle client-side routing.

### 📜 License

Distributed under the MIT License. See LICENSE for more information.
