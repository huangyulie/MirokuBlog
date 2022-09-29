import React, { useEffect, useState } from "react";
import { Row, Col, Tag, List } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { http } from "@/utils";
import moment from "moment";
import Left from "@/components/Left/index";
import Right from "@/components/Right/index";

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
  const nav = useNavigate();
  const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    Article();
  }, []);
  // 获取文章
  const Article = async () => {
    let { data } = await http.get<any, any>("/api/acticle/all");
    setArticle(data);
    setLoading(false);
  };

  const clickHandle = (props: number | undefined) => {
    nav(`/acticle/${props}`);
  };

  return (
    <>
      <List
        loading={Loading}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
          total: article.length,
          onChange: () => {
            window.document.documentElement.scrollTop = 0;
          },
        }}
        className="List"
        dataSource={article}
        renderItem={(item) => (
          <List.Item>
            <div
              className="acticli-item"
              key={item._id}
              onClick={() => clickHandle(item._id)}
            >
              <div className="item-left">
                <img src={item.classify?.imgUrl} alt="" />
              </div>
              <div className="item-right">
                <div className="time">
                  📆创建于
                  {moment(parseInt(item.startDate)).format(
                    "YYYY年MM月DD日 HH:mm:ss"
                  )}
                  &nbsp;| 🔨
                  {item.refershDate
                    ? `修改于${moment(parseInt(item.refershDate)).format(
                        "YYYY年MM月DD日 HH:mm:ss"
                      )}`
                    : "未修改"}
                </div>
                <div className="title">{item.name}</div>
                <div className="classify1">
                  <div className="left">分类:{item.classify?.name}</div>
                  <div className="right">
                    {item.label?.map((item) => {
                      return (
                        <Tag key={item._id} color={item.color}>
                          {item.name}
                        </Tag>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      ></List>
      <div className="footer">12312</div>
    </>
  );
}
