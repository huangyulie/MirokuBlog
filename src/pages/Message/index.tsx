import { Card } from "antd";

import React from "react";
import "./index.less";

export default function Index() {
  return (
    <Card title={"留言"}>
      <div>这是我的留言</div>
      <div className="message-main">
        <div className="left">
          <div className="img">
            <img src="http://localhost:3001/imgs/react.webp" alt="logo" />
          </div>
        </div>
        <div className="right">
          <div className="title">
            <div className="name">Miroku</div>
            <div className="date">2012年达到</div>
            <div className="ip">来自dasd</div>
          </div>
          <div className="content">
            哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达
            哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达
          </div>
          <div className="children">
            <div className="c-left">
              <div className="c-img">
                <img src="http://localhost:3001/imgs/logo.jpg" alt="logo" />
              </div>
            </div>
            <div className="c-right">
              <div className="c-title">
                <div className="name">Miroku</div>
                <div className="date">2012年达到</div>
                <div className="ip">来自dasd</div>
              </div>
              <div className="c-content">
                哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达
                哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
