import React from 'react'
import ReactDOM from 'react-dom'
import actionCable from 'actioncable'
import './index.sass'
import App from './app/App'
import reportWebVitals from './reportWebVitals'

const CableApp = {}

CableApp.cable = actionCable.createConsumer(process.env.REACT_APP_CABLE)

ReactDOM.render(
  <React.StrictMode>
    <App cableApp={CableApp} />
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
