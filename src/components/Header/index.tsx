import React, { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { http } from "../../utils/index";
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
        <NavLink to={"/home"} className="navA">
          <div>🏡首页</div>
        </NavLink>
        <NavLink to={"/acticle"} className="navA">
          <div>📘文章</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>❤️友链</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>📄留言</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>🔔动态</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>😼关于</div>
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
          <div>🏡首页</div>
        </NavLink>
        <NavLink to={"/acticle"} className="navA">
          <div>📘文章</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>❤️友链</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>📄留言</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>🔔动态</div>
        </NavLink>
        <NavLink to={"/about"} className="navA">
          <div>😼关于</div>
        </NavLink>
      </Drawer>
    </div>
  );
}
