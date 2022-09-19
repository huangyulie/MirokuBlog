import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import About from './pages/About/index'
// import Home from './pages/Home/index'
import Header from "./components/Header/index";
import Footer from "@/components/Footer/index";
import Loading from "./components/Loading/Loading";
import "@/App.less";
const Home = lazy(() => import("@/pages/Home/index"));
const About = lazy(() => import("@/pages/About/index"));
const Article = lazy(() => import("@/pages/Article/index"));
// const Markdown = lazy(()=> import("@/pages/Markdown/Markdown"));
// const Build = lazy(()=>import('@/pages/Build/index'));

export default function App() {
  return (
    <div className="site">
      <Header/>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/acticle" element={<Article />}></Route>
          <Route path="/home" element={<Home />}></Route>
          {/* <Route path="/article" element={<Article />}></Route>
          <Route path="/article/:id" element={<Markdown />}></Route>
          <Route path="/imgs" element={<Home />}></Route>
          <Route path="/talk" element={<Home />}></Route>
          <Route path="/comment" element={<Home />}></Route>
          <Route path="/works" element={<Home />}></Route>
          <Route path="/experienced" element={<Build />}></Route> */}
          <Route path="*" element={<Navigate to="/home" />}></Route>
        </Routes>
      </Suspense>
      <div className="main"></div>
      <Footer/>
    </div>
  );
}
