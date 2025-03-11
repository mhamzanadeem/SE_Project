# SE_Project

## Overview
SE_Project is a full-stack web application consisting of a **React** frontend and a **Django** backend. Follow the instructions below to set up and run the project on your local machine.

---

## Frontend Setup (React)

### Install Dependencies (One-time Setup)
```sh
cd Frontend
npm install 
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm install react-router-dom
```

### Run the Frontend
```sh
npm start
```

For additional Material-UI components, visit the official documentation: [Material-UI Components](https://mui.com/material-ui/all-components/)

---

## Backend Setup (Django)

### Install Dependencies (One-time Setup)
```sh
python -m venv myenv
myenv\Scripts\activate
pip install django
cd project
pip install djangorestframework
pip install django-cors-headers
python -m pip install Pillow
python manage.py migrate
```

### Run the Backend
```sh
myenv\Scripts\activate
python manage.py runserver
```

---

## Project Structure
```
SE_Project/
│── Frontend/   # React frontend
│── project/    # Django backend
│── README.md   # Project documentation
```

---

## Contributions
Feel free to fork this repository and submit pull requests. Suggestions and improvements are always welcome!

---

## License
This project is open-source and available under the [MIT License](LICENSE).
