import React from "react";
import { Row, Col, Card } from "antd";
import {
  MailOutlined,
  WechatOutlined,
  GithubOutlined,
  QqOutlined
} from "@ant-design/icons";
import "./index.less";

const { Meta } = Card;

export default function Index() {
  return (
    <div className="Article">
      <Row>
        <Col xs={24} md={12} lg={12} xl={6}>
          <div className="Art-left-top">
            <div className="img">
              <div className="img-1">
                <img src="http://127.0.0.1:3001/imgs/logo.jpg" alt="" />
              </div>
            </div>
            <div className="name">MirokuBlog</div>
            <div className="build">🔰Xi'an,China</div>
            <div className="all">
              <div className="all-item">
                <div className="all-item-div">
                  <div className="title">文章</div>
                  <div className="title-1">95篇</div>
                </div>
              </div>
              <div className="all-item">
                <div className="all-item-div">
                  <div className="title">分类</div>
                  <div className="title-1">95篇</div>
                </div>
              </div>{" "}
              <div className="all-item">
                <div className="all-item-div">
                  <div className="title">标签</div>
                  <div className="title-1">95篇</div>
                </div>
              </div>
            </div>
            <div className="BiliBili">
              <div className="link">哔哩哔哩 Bilibili</div>
            </div>
            <div className="github">
                <div className="github-item"><GithubOutlined className="h"/></div>
                <div className="github-item"><QqOutlined className="h"/></div>
                <div className="github-item"><WechatOutlined className="h"/></div>
                <div className="github-item"><MailOutlined className="h"/></div>
            </div>
          </div>
          <div className="Art-left-bottom">
            23123
          </div>
        </Col>
        <Col xs={24} md={12} lg={12} xl={12}>
          2
        </Col>
        <Col xs={24} md={12} lg={12} xl={6}>
          3
        </Col>
      </Row>
    </div>
  );
}
