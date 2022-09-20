import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import About from './pages/About/index'
// import Home from './pages/Home/index'
import Header from "./components/Header/index";
// import Footer from "@/components/Footer/index";
import Loading from "./components/Loading/Loading";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import "@/App.less";

const style: React.CSSProperties = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#1088e9",
  color: "#fff",
  textAlign: "center",
  fontSize: 14,
};
const Home = lazy(() => import("@/pages/Home/index"));
const About = lazy(() => import("@/pages/About/index"));
const Article = lazy(() => import("@/pages/Article/index"));
const Detail = lazy(() => import("@/pages/Article/detail"));
// const Markdown = lazy(()=> import("@/pages/Markdown/Markdown"));
// const Build = lazy(()=>import('@/pages/Build/index'));

export default function App() {
  return (
    <div className="site">
      <Header />
      <div className="main">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/acticle" element={<Article />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/acticle/:id" element={<Detail />}></Route>
            {/* <Route path="/imgs" element={<Home />}></Route>
          <Route path="/talk" element={<Home />}></Route>
          <Route path="/comment" element={<Home />}></Route>
          <Route path="/works" element={<Home />}></Route>
          <Route path="/experienced" element={<Build />}></Route> */}
            <Route path="*" element={<Navigate to="/home" />}></Route>
          </Routes>
        </Suspense>
      </div>
      {/* <Footer /> */}
      <BackTop>
        <div style={style}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
    </div>
  );
}
