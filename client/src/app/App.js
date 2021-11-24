import './App.sass';
import { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

export default class App extends Component {
  render = () => <Router>
    {/* <Header /> */}
    {/* <Route exact path="/" component={Home} /> */}
    {/* <Route path="/find-account" component={FindAccount} /> */}
  </Router>
}