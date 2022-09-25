import { Card, Col, Input, Row } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "./index.less";

const { TextArea } = Input;

export default function Index() {
  const [hidden, setHidden] = useState<boolean>(true);
  const ClickHandle = () => {
    setHidden(!hidden);
  };
  return (
    <Card title={"留言"}>
      <div className="message-content">
        <div className="message-img">
          <img src="http://localhost:3001/imgs/react.webp" />
        </div>
        <div className="message-input">
          <Row>
            <Col xs={24} md={8} lg={8} xl={8} className="content-input">
              <div className="input-item">
                <Input></Input>
              </div>
            </Col>
            <Col xs={24} md={8} lg={8} xl={8} className="content-input">
              <div className="input-item">
                <Input></Input>
              </div>
            </Col>
            <Col xs={24} md={8} lg={8} xl={8} className="content-input">
              <div className="input-item">
                <Input></Input>
              </div>
            </Col>
          </Row>
          <div className="content-textarea">
            <TextArea showCount maxLength={500} />
          </div>
        </div>
      </div>
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
            <div className="ico">
              回复：
              <MessageOutlined onClick={ClickHandle} />
            </div>
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
        <div className={hidden ? "hidden" : "hidden block"}>132</div>
      </div>
    </Card>
  );
}
