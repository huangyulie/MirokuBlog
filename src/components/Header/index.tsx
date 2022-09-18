import React from "react";
import { Row, Col } from "antd";
import { http } from "../../utils/index";
import "./index.less";
import { NavLink } from "react-router-dom";
import { AlignRightOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";

export default function index() {
  return (
    <div className="Header">
      <div className="logo">
        <img src="http://localhost:3001/imgs/logo.png" alt="" />
      </div>
      <div className="nav">
        <NavLink to={"/home"}>首页</NavLink>
        <NavLink to={"/about"}>文章</NavLink>
        <NavLink to={"/about"}>友链</NavLink>
        <NavLink to={"/about"}>留言</NavLink>
        <NavLink to={"/about"}>动态</NavLink>
        <NavLink to={"/about"}>关于</NavLink>
      </div>
      <div className="hidden">
        <div className="hidden-1">
          <AlignRightOutlined />
        </div>
      </div>
    </div>
  );
}
