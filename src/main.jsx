import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
window.onerror = function(message, source, lineno, colno, error) {
  alert('Ошибка: ' + message + '\n' + source + ':' + lineno);
};
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
