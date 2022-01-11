import './App.sass'
import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Loader from './components/others/Loader'
import indexService from './services/index'

const Home = lazy(() => import('./components/home/Home'))

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  componentDidMount = () =>
    indexService
      .index()
      .then(res => this.setState({ ready: res.status === 200 }))

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
