import React, { Suspense, lazy } from 'react'
import { Routes, Route , Navigate } from 'react-router-dom'
// import About from './pages/About/index'
// import Home from './pages/Home/index'
import Header from '@/components/Header/index'
import Footer from '@/components/Footer/index'
import '@/App.less';

const Home = lazy(() => import('@/pages/Home/index'))
const About = lazy(() => import('@/pages/About/index'))
const Article = lazy(()=>import('@/pages/Article/inedx'))


export default function App() {
  return (
    <div>
      <Header>213</Header>
      <Suspense fallback={<div>loading....</div>}>
        <Routes>
          <Route path="/about" element={<About />} ></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/article" element={<Article />}></Route>
          <Route path="/imgs" element={<Home />}></Route>
          <Route path="/talk" element={<Home />}></Route>
          <Route path="/comment" element={<Home />}></Route>
          <Route path="/works" element={<Home />}></Route>
          <Route path="/experienced" element={<Home />}></Route>
          <Route path="*" element={<Navigate to="/home"/>}></Route>
        </Routes>
      </Suspense>
      <Footer>132</Footer>
    </div>
  )
}
