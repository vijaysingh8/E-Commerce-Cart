# E-Commerce Cart Web Application

A fully functional **E-Commerce Cart Web Application** built using the **MERN stack**. It allows users to browse products, manage cart items, update quantities, remove items, and proceed to a mock checkout. The project replicates real-world e-commerce workflows with clean UI, secure APIs, and persistent storage.

---

## 🚀 Features

* **Product Listing** – view available products.
* **Add to Cart** – Add products with a single click.
* **Cart Management** – Update quantities, remove items, and view totals.
* **Real-Time Calculations** – Auto-updated cart total and item count.
* **Mock Checkout Flow** – Simulated checkout experience.
* **Responsive UI** – Smooth and user-friendly interface.
* **Secure Backend APIs** – Clean REST API architecture.

---

## 🛠️ Tech Stack

### **Frontend**

* React.js / Vite
* Axios
* Tailwind CSS / CSS

### **Backend**

* Node.js
* Express.js

### **Database**

* MongoDB 

---

## 📁 Folder Structure

```
project-folder/
├──frontend/        # React frontend
├── backend/        # Node/Express backend
└── README.md
```

---

## ⚙️ Installation & Setup

### **1. Clone the repository**

```
git clone <repo-url>
cd project-folder
```

### **2. Install dependencies**

#### Frontend

```
cd frontend
npm install
```

#### Backend

```
cd backend
npm install
```

### **3. Environment Variables**

Create a `.env` file inside the server folder:

```
MONGO_URI=your_mongo_uri
PORT=5000
```

### **4. Start the application**

#### Frontend

```
cd frontend
npm run dev
```

#### Backend

```
cd backend
npm run dev
```

---

## 📡 API Endpoints

### **Product Routes**

* `GET /api/products` – Fetch all products

### **Cart Routes**

* `GET /api/cart/get` 
* `POST /api/cart/add`
* `DELETE /api/cart/delete/:productId`
  
### **Checkout Routes**
* `POST /api/checkout`
---

## ✅ How It Works

* The frontend sends requests to the backend using Axios.
* Backend handles cart logic and interacts with the database.
* MongoDB stores products and cart data.
* UI updates in real time based on server responses.

---

## 📌 Future Enhancements

* User authentication (JWT)
* Product search & filtering
* Payment gateway integration
* Order history page

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to modify.

---

## 📜 License

This project is open-source. You are free to use, modify, and enhance it.

---

## 📧 Contact

If you have any questions or need help setting it up, feel free to reach out!
