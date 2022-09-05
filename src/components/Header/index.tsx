import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import { Button } from "antd";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import "./index.less";
// import 'antd/dist/antd.less'

export default function Index(props: any) {
  // 控制显示
  let [title, setTitle] = useState<boolean>(false);
  let [color, setColor] = useState<string>("active");

  window.onscroll = () => {
    let height = document.documentElement.scrollTop;
    if (height > 64) {
      setTitle(true);
      setColor("active1");
    } else {
      setTitle(false);
      setColor("active");
    }
  };

  const changeTitle = (name: string) => {
    document.title = name;
  };

  return (
    <div className={title ? "Header" : "Header Header-extra"}>
      <div className="Header-logo">
        <NavLink
          className={({ isActive }) => (isActive ? color : "")}
          to="home"
          onClick={() => changeTitle("首页|MirokuBlog")}
        >
          <HomeOutlined />
        </NavLink>
      </div>
      <div className="Header-nav">
        <div className="Header-nav-a">
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="article"
            onClick={() => changeTitle("文章|MirokuBlog")}
          >
            文章
          </NavLink>
        </div>
        <div className="Header-nav-a">
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="imgs"
            onClick={() => changeTitle("图库|MirokuBlog")}
          >
            图库
          </NavLink>
        </div>
        <div className="Header-nav-a">
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="talk"
            onClick={() => changeTitle("说说|MirokuBlog")}
          >
            说说
          </NavLink>
        </div>
        <div className="Header-nav-a">
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="comment"
            onClick={() => changeTitle("留言|MirokuBlog")}
          >
            留言
          </NavLink>
        </div>
        <div className="Header-nav-a">
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="works"
            onClick={() => changeTitle("作品|MirokuBlog")}
          >
            作品
          </NavLink>
        </div>
        <div className="Header-nav-a">
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="experienced"
            onClick={() => changeTitle("建站|MirokuBlog")}
          >
            建站
          </NavLink>
        </div>
        <div className="Header-nav-a">
          {" "}
          <NavLink
            className={({ isActive }) => (isActive ? color : "")}
            to="about"
            onClick={() => changeTitle("关于|MirokuBlog")}
          >
            关于
          </NavLink>
        </div>
      </div>
      <div className="Header-setting">
        <NavLink
          className={({ isActive }) => (isActive ? color : "")}
          to=""
          onClick={() => changeTitle("设置|MirokuBlog")}
        >
          <SettingOutlined />
        </NavLink>
      </div>
    </div>
  );
}
