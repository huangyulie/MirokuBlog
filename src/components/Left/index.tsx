import React, { useEffect, useState } from "react";
import { Col } from "antd";
import {
  MailOutlined,
  WechatOutlined,
  GithubOutlined,
  QqOutlined,
} from "@ant-design/icons";
import "./index.less";
import { http } from "@/utils";
import moment from "moment";

type labelIprops = {
  _id: number;
  color: string;
  name: string;
};

type classifyIprops = {
  _id: number;
  name: string;
  imgUrl: string;
};

type articleIprops = {
  _id?: number;
  startDate?: any;
  name?: string;
  label?: labelIprops[];
  classify?: classifyIprops;
  text?: string;
  refershDate?: any;
};

export default function Index() {
  const [article, setArticle] = useState<articleIprops[]>([]);
  const [label, setLable] = useState<labelIprops[]>([]);
  const [classify, setClassify] = useState<classifyIprops[]>([]);

  useEffect(() => {
    Article();
    Label();
    Classify();
  }, []);

  // 获取文章
  const Article = async () => {
    let { data } = await http.get<any, any>("/api/acticle/all");
    setArticle(data);
    console.log(data);
  };
  // 获取标签
  const Label = async () => {
    let { data } = await http.get<any, any>("/api/label/index");
    setLable(data);
  };

  // 获取分类
  const Classify = async () => {
    let { data } = await http.get<any, any>("/api/classify/index");
    setClassify(data);
  };

  return (
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
              <div className="title-1">{article?.length}篇</div>
            </div>
          </div>
          <div className="all-item">
            <div className="all-item-div">
              <div className="title">分类</div>
              <div className="title-1">{classify?.length}种</div>
            </div>
          </div>{" "}
          <div className="all-item">
            <div className="all-item-div">
              <div className="title">标签</div>
              <div className="title-1">{label?.length}个</div>
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
          {article.map((item, index) => {
            if (index < 5) {
              return (
                <div className="act-item" key={item._id}>
                  <div className="time">
                    {moment(parseInt(item.startDate)).format(
                      "YYYY年MM月DD日 HH:mm:ss"
                    )}
                  </div>
                  <div className="topic">{item.name}</div>
                </div>
              );
            } else {
              return undefined;
            }
          })}
        </div>
      </div>
    </Col>
  );
}
