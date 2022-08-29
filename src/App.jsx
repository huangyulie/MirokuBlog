import React, { Suspense, lazy } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
// import About from './pages/About/index'
// import Home from './pages/Home/index'
const Home = lazy(() => import('./pages/Home/index'))
const About = lazy(() => import('./pages/About/index'))

export default function App() {
  return (
    <div>
      欢迎使用
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Suspense fallback={<div>loading....</div>}>
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}
