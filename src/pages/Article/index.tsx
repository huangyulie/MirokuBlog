import React from "react";
import { Row, Col, Card, Tag, Input, Pagination } from "antd";
import {
  MailOutlined,
  WechatOutlined,
  GithubOutlined,
  QqOutlined,
  BookOutlined,
} from "@ant-design/icons";
import "./index.less";
const { Search } = Input;
const { Meta } = Card;

export default function Index() {
  const onSearch = (value: string) => console.log(value);
  return (
    <div className="Article">
      <Row>
        <Col xs={24} md={8} lg={8} xl={6}>
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
              <div className="github-item">
                <GithubOutlined className="h" />
              </div>
              <div className="github-item">
                <QqOutlined className="h" />
              </div>
              <div className="github-item">
                <WechatOutlined className="h" />
              </div>
              <div className="github-item">
                <MailOutlined className="h" />
              </div>
            </div>
          </div>
          <div className="Art-left-bottom">
            <div className="title">最近文章</div>
            <div className="act">
              <div className="act-item">
                <div className="time">2012年十月四日</div>
                <div className="topic">
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                </div>
              </div>
              <div className="act-item">
                <div className="time">2012年十月四日</div>
                <div className="topic">
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                </div>
                <Tag color={"red"} className="tag">
                  哈哈
                </Tag>
                <Tag color={"red"} className="tag">
                  哈哈
                </Tag>
              </div>
              <div className="act-item">
                <div className="time">2012年十月四日</div>
                <div className="topic">
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                </div>
              </div>
              <div className="act-item">
                <div className="time">2012年十月四日</div>
                <div className="topic">
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                </div>
              </div>
              <div className="act-item">
                <div className="time">2012年十月四日</div>
                <div className="topic">
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                  我是一个阿诗丹顿多多多多多多多 我是一个阿诗丹顿多多多多多多多
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={16} lg={16} xl={12}>
          <div className="acticli-item">
            <div className="item-left">
              <img src="http://127.0.0.1:3001/imgs/css.webp" alt="" />
            </div>
            <div className="item-right">
              <div className="time">📆创建于2021324232 | 🔨修改于20123</div>
              <div className="title">jsDe1uysuady</div>
              <div className="classify1">
                <div className="left">分类:jaca</div>
                <div className="right">
                  <Tag>jaca</Tag>
                  <Tag>jaca</Tag>
                  <Tag>jaca</Tag>
                </div>
              </div>
            </div>
          </div>
          <div className="acticli-item">
            <div className="item-left">
              <img src="http://127.0.0.1:3001/imgs/css.webp" alt="" />
            </div>
            <div className="item-right">
              <div className="time">📆创建于2021324232 | 🔨修改于20123</div>
              <div className="title">jsDe1uysuady</div>
              <div className="classify1">
                <div className="left">分类:jaca</div>
                <div className="right">
                  <Tag>jaca</Tag>
                  <Tag>jaca</Tag>
                  <Tag>jaca</Tag>
                </div>
              </div>
            </div>
          </div>
          <Pagination defaultCurrent={1} total={500} showQuickJumper showSizeChanger={false}/>
        </Col>
        <Col xs={24} md={12} lg={12} xl={6}>
          <div className="input">
            <Search
              placeholder="输入关键字搜索文章"
              onSearch={onSearch}
              prefix={<BookOutlined />}
            />
          </div>
          <div className="classify">
            <div className="title">🎁 相见恨晚</div>
            <div className="name">您的ip:</div>
            <div className="name">您的ip:</div>
            <div className="name">您的ip:</div>
            <div className="name">
              您好，您在: 2022/09/20 14:49:58登录本站。
              下午好呀，午休过后，开始工作啦～～
            </div>
          </div>
          <div className="classify">
            <div className="title">📎 分类</div>
            <Tag className="classify-item">js </Tag>
            <Tag className="classify-item">js</Tag>
            <Tag className="classify-item">jsqweqw</Tag>
            <Tag className="classify-item">jsasdasd</Tag>
            <Tag className="classify-item">jsasdas</Tag>
            <Tag className="classify-item">jsqwe</Tag>
            <Tag className="classify-item">jsqwe</Tag>
            <Tag className="classify-item">jsqwe</Tag>
            <Tag className="classify-item">js</Tag>
          </div>
          <div className="classify">
            <div className="title">🔖 标签</div>
            <Tag className="classify-item">js</Tag>
            <Tag className="classify-item">js</Tag>
            <Tag className="classify-item">jsqweqw</Tag>
            <Tag className="classify-item">jsasdasd</Tag>
            <Tag className="classify-item">jsasdas</Tag>
            <Tag className="classify-item">jsqwe</Tag>
            <Tag className="classify-item">jsqwe</Tag>
            <Tag className="classify-item">jsqwe</Tag>
            <Tag className="classify-item">js</Tag>
          </div>
          <div className="classify">
            <div className="title">📅 归档</div>
            <div className="title-time">
              <div className="titile-left">2020年十月</div>
              <div className="titile-right">1篇</div>
            </div>
            <div className="title-time">
              <div className="titile-left">123</div>
              <div className="titile-right">123</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
