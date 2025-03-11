# SE_Project

## 📌 Project Overview
This project consists of a **React.js frontend** and a **Django backend**, designed to work seamlessly together. Follow the setup instructions below to install dependencies and run the project.

---

## 🚀 Frontend Setup (React.js)

### 📥 Install Dependencies (Run Once)
```sh
cd Frontend
npm install 
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

### ▶️ Run the Frontend
```sh
npm start
```

---

## 🛠 Backend Setup (Django)

### 📥 Install Dependencies (Run Once)
```sh
python -m venv myenv
myenv\Scripts\activate
pip install django
cd project
pip install djangorestframework
dpip install django-cors-headers
python -m pip install Pillow
python manage.py migrate
```

### ▶️ Run the Backend
```sh
myenv\Scripts\activate
python manage.py runserver
```

---

## 📂 Project Structure
```
SE_Project/
│-- Frontend/  # React.js frontend
│-- project/   # Django backend
│-- myenv/     # Python virtual environment
│-- README.md  # Documentation
```

---

## 🌟 Features
- **Frontend**: Built with React.js and Material-UI
- **Backend**: Django REST Framework with CORS support
- **Image Handling**: Pillow library integrated
- **Cross-Origin Requests**: Handled using `django-cors-headers`

---

## 📌 Notes
- Ensure that you activate the virtual environment before running backend commands.
- The frontend should be run separately from the backend.
- If any dependencies are missing, install them as needed.

---

## 📧 Contact
For any issues or contributions, feel free to submit a pull request or open an issue in the repository.

Happy coding! 🚀
