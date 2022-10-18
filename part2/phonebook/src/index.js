import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios'

axios
  .get('http://localhost:3001/persons')
  .then(response => {
    const persons = response.data
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
    console.log(persons)
  })
