import './App.sass'
import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Loader from './components/others/Loader'

const Home = lazy(() => import('./components/home/Home'))

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  componentDidMount = () => {
    var request = new XMLHttpRequest()
    request.open('GET', process.env.REACT_APP_API, true)
    request.onreadystatechange = () => this.setState({ ready: request.readyState === 4 && request.status === 200 })
    request.send()
  }

  render = () => <BrowserRouter>
    <Header />
    <Suspense fallback={<Loader />}>
      {this.state.ready ?
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        : <Loader />}
    </Suspense>
  </BrowserRouter>
}
