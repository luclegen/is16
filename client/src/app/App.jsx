import './App.sass'
import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Loader from './components/others/Loader'
// import Home from './components/home/Home'
// import FindAccount from './components/others/FindAccount'

const Home = lazy(() => import('./components/home/Home'))
// const FindAccount = lazy(() => import('./components/others/FindAccount'))

export default class App extends Component {
  render = () => <BrowserRouter>
    <Header />
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
}
