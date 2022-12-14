import React, { useState } from "react";
import { Row, Col, Drawer } from "antd";
import "./index.less";
import { NavLink } from "react-router-dom";
import { AlignRightOutlined, SettingOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";

export default function Index() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="Header">
      <div className="logo">
        <img src="http://localhost:3001/imgs/logo.png" alt="" />
        <div>MirokuBlog</div>
      </div>
      <div className="nav">
        <NavLink to={"/home"} className="navA" onClick={()=>{window.document.title = "ι¦ι‘΅|MirokuBlog"; window.document.documentElement.scrollTop = 0;}}>
          <div>π‘ι¦ι‘΅</div>
        </NavLink>
        <NavLink to={"/acticle"} className="navA" onClick={()=>{window.document.title = "ζη« |MirokuBlog"; window.document.documentElement.scrollTop = 0;}}>
          <div>πζη« </div>
        </NavLink>
        <NavLink to={"/friend"} className="navA" onClick={()=>{window.document.title = "ειΎ|MirokuBlog"; window.document.documentElement.scrollTop = 0;}}>
          <div>β€οΈειΎ</div>
        </NavLink>
        <NavLink to={"/message"} className="navA" onClick={()=>{window.document.title = "ηθ¨|MirokuBlog"; window.document.documentElement.scrollTop = 0;}}>
          <div>πηθ¨</div>
        </NavLink>
        <NavLink to={"/about"} className="navA" onClick={()=>{window.document.title = "ε¨ζ|MirokuBlog"; window.document.documentElement.scrollTop = 0;}}>
          <div>πε¨ζ</div>
        </NavLink>
        <NavLink to={"/about"} className="navA" onClick={()=>{window.document.title = "ε³δΊ|MirokuBlog"; window.document.documentElement.scrollTop = 0;}}>
          <div>πΌε³δΊ</div>
        </NavLink>
      </div>
      <div className="hidden">
        <div className="hidden-1">
          <AlignRightOutlined onClick={showDrawer} />
        </div>
        <div className="hidden-2">
          <SettingOutlined />
        </div>
      </div>
      <Drawer placement="right" onClose={onClose} open={open} closable={false}>
        <NavLink to={"/home"} className="navA">
          <div>π‘ι¦ι‘΅</div>
        </NavLink>
        <NavLink to={"/acticle"} className="navA">
          <div>πζη« </div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>β€οΈειΎ</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>πηθ¨</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>πε¨ζ</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>πΌε³δΊ</div>
        </NavLink>
      </Drawer>
    </div>
  );
}
