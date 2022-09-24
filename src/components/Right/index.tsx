import React, { useEffect, useState } from "react";
import { Col, Tag, Input } from "antd";
import { BookOutlined } from "@ant-design/icons";
import "./index.less";
import { http } from "@/utils";
import moment from "moment";
const { Search } = Input;

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
  const [ip, setIp] = useState<string>("");
  const [label, setLable] = useState<labelIprops[]>([]);
  const [classify, setClassify] = useState<classifyIprops[]>([]);
  const [city, setCity] = useState<string>();
  const [article, setArticle] = useState<articleIprops[]>([]);
  const [arr, setArr] = useState<any[]>([]);

  useEffect(() => {
    Label();
    Classify();
    Article();
    City();
  }, []);
  // 获取标签
  const Label = async () => {
    let { data, ip } = await http.get<any, any>("/api/label/index");
    ip = ip.split('"');
    setIp(ip[3]);
    setLable(data);
  };

  // 获取分类
  const Classify = async () => {
    let { data } = await http.get<any, any>("/api/classify/index");
    setClassify(data);
  };

  // 获取城市
  const City = async () => {
    let { city, province } = await http.get<any, any>(
      "https://restapi.amap.com/v3/ip?key=2455323248886ea80cad6e21e75dd20a"
    );
    setCity(province + city);
  };
  // 获取文章
  const Article = async () => {
    let { data } = await http.get<any, any>("/api/acticle/all");
    setArticle(data);
    let map = new Map();
    data.forEach((item: any) => {
      let time = moment(parseInt(item.startDate)).format("YYYY年MM月");
      if (!map.get(time)) {
        map.set(time, 1);
      } else {
        map.set(time, map.get(time) + 1);
      }
    });
    let arr = [];
    for (let [k, v] of map) {
      arr.push({
        date: k,
        count: v,
      });
    }
    // for(  item of)
    setArr(arr);
    console.log(arr);
  };

  const onSearch = (value: string) => console.log(value);

  const clickHandle = (props: number | undefined) => {
    console.log(props);
  };

  return (
    <Col xs={24} md={12} lg={12} xl={6} id="Col">
      <div className="flex">
        <div className="fixed">
          <div className="input">
            <Search
              placeholder="输入关键字搜索文章"
              onSearch={onSearch}
              prefix={<BookOutlined />}
            />
          </div>
          <div className="classify">
            <div className="title">🎁 相见恨晚</div>
            <div className="name">您的ip: {ip}</div>
            <div className="name">您的城市: {city}</div>
            <div className="name">您在2022/09/20 14:49:58登录本站</div>
            <div className="name">下午好呀，午休过后，开始工作啦！</div>
          </div>
          <div className="classify">
            <div className="title">📎 分类{classify.length}种</div>
            {classify.map((item) => {
              return (
                <Tag key={item._id} className="classify-item">
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <div className="classify">
            <div className="title">🔖 标签{label.length}个</div>
            {label.map((item) => {
              return (
                <Tag
                  key={item._id}
                  color={item.color}
                  className="classify-item"
                >
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <div className="classify">
            <div className="title">📅 归档</div>
            {arr.map((item, index) => {
              return (
                <div className="title-time" key={index}>
                  <div className="titile-left">{item.date}</div>
                  <div className="titile-right">{item.count}篇</div>
                </div>
              );
            })}
          </div>
          <div className="classify">
            <div className="title">💻 网站信息</div>
          </div>
        </div>
      </div>
    </Col>
  );
}
