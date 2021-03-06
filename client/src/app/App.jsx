import './App.sass'
import { Component, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layouts/header/Header'
import Loader from './components/others/Loader'

const Home = lazy(() => import('./components/home/Home'))
const Profile = lazy(() => import('./components/user/Profile'))

export default class App extends Component {
  render = () => <BrowserRouter>
    <Header />
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route exact path="/" element={<Home cableApp={this.props.cableApp} />} />
        <Route path="/:id" element={<Profile />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
}
