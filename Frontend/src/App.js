import "./App.css"
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import HomePage from './home/HomePage.jsx';
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import API from './components/API';
function App() {
  return (
    <>
      <Router>
      <Header/>
          <Switch >
            <Route exact path='/' component={HomePage} />
            <Route path="/api" component={API} /> 
          </Switch >
       <Footer/>   
    </Router>
    </>
  )
}

export default App
