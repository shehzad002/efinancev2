import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Cards from './components/cards';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
    <Header />
    <Cards />
    <Footer />
    </div>
  );
}

export default App;
