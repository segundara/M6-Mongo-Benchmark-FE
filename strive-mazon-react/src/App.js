import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/TopNav';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Homepage from './components/MainPage';

function App() {
  return (
      <Router>
        <Navbar />
        <Route path="/" exact component={Homepage} />
        <Footer />
      </Router>
  );
}

export default App;
