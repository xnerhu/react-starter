import './app.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

// Wait for styles to load.
setInterval(() => {
  ReactDOM.render(<App />, document.getElementById('app'))
}, 1)
