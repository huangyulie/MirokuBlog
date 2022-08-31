import React from "react";
import { NavLink } from "react-router-dom";
import "./index.less";

export default function index(props: any) {
  const changeTitle = (name: string) => {
    document.title = name;
  };

  return (
    <div className="Header">
      <div className="Header-logo">
        <NavLink to="home" onClick={() => changeTitle("首页|MirokuBlog")}>
          home
        </NavLink>
      </div>
      <div className="Header-nav">
        <NavLink to="home" onClick={() => changeTitle("首页|MirokuBlog")}>
          home
        </NavLink>
        <NavLink to="about" onClick={() => changeTitle("首页|MirokuBlog")}>
          home
        </NavLink>
        <NavLink to="haha" onClick={() => changeTitle("首页|MirokuBlog")}>
          home
        </NavLink>
      </div>
    </div>
  );
}
