import React, { useEffect, useState, ChangeEvent } from "react";
import { Card, Tag, Input, message, Pagination } from "antd";
import MyMessage from "@/components/MyMessage/Index";
import {
  CalendarOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  BookOutlined,
  BranchesOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import "./index.less";
import { useNavigate ,useLocation} from "react-router-dom";
import { http } from "@/utils/index";

const { Search } = Input;

interface labelProps {
  color: string;
  name: string;
}

interface ActiclePorps {
  id: number;
  name: string;
  label: Array<labelProps>;
  img: string;
  startDate: string;
  refershDate: string;
}

interface StateIprops{
  name: string;
}

export default function Inedx() {
  const [acticles, setActicle] = useState<ActiclePorps[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [condition,setCondition] = useState<string>('全部文章');
  const navigate = useNavigate();
  const Location = useLocation();
  
  useEffect(() => {
    const data = async()=>{
      try{
        let {status , data} = await http.get('/acticle/all?pagesize=1');
        console.log(data);
      }catch(err){
        message.error('请求失败');
      }
    }
    data();
    
    let name;
    if(Location.state !== null){
      name = (Location.state as StateIprops).name;
    }else{
      name = "全部文章"
    }
    setCondition(name);
    
    setActicle([
      {
        id: 1312413,
        name: "haha",
        label: [
          { name: "java", color: "red" },
          { name: "react", color: "blue" },
        ],
        img: "/css.webp",
        startDate: "123123",
        refershDate: "123123",
      },
      {
        id: 2342352,
        name: "haha",
        label: [{ name: "java", color: "red" }],
        img: "/html.webp",
        startDate: "123123",
        refershDate: "123123",
      },
      {
        id: 3123214,
        name: "haha",
        label: [{ name: "java", color: "red" }],

        img: "/react.webp",
        startDate: "123123",
        refershDate: "123123",
      },
      {
        id: 125123,
        name: "haha",
        label: [{ name: "java", color: "red" }],

        img: "/随笔.webp",
        startDate: "123123",
        refershDate: "123123",
      },
      {
        id: 1241244,
        name: "haha",
        label: [{ name: "java", color: "red" }],

        img: "/随笔.webp",
        startDate: "123123",
        refershDate: "123123",
      },
    ]);
  }, []);

  const onSearch = (value: string) => {
    setSearch(true);
    setText("");
    setTimeout(() => {
      message.success("搜搜");
      setSearch(false);
    }, 1000);
    console.log(value);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 点击文章跳转功能
  const OnClickHandle = (props: number) => {
    navigate(`/article/${props}`);
    console.log(props);
  };
  return (
    <div className="Acticle">
      <div className="Acticle-top">
        <MyMessage />
        <Card
          title={`${condition} 6篇`}
          className="Acticle-card"
          extra={
            <Search
              placeholder="输入关键字搜索文章"
              onSearch={onSearch}
              style={{ width: 300 }}
              loading={search}
              onChange={onChangeHandle}
              value={text}
            />
          }
        >
          <div className="Acticle-section">
            <div className="Acticle-section-left">
              {acticles.map((item, index) => {
                return (
                  <div
                    onClick={() => OnClickHandle(item.id)}
                    key={item.id}
                    className="Acticle-section-left-acticle"
                  >
                    {index % 2 === 0 ? (
                      <div className="Acticle-section-left-acticle-left">
                        <div className="name">{item.name}</div>
                        <div className="data">
                          <CalendarOutlined />
                          發表於{item.startDate} | <ReloadOutlined />
                          更新於{item.refershDate}
                        </div>
                        <div className="label">
                          {item.label.map((item, index) => {
                            return (
                              <div key={index}>
                                <Tag color={item.color}>{item.name}</Tag>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="Acticle-section-left-acticle-right">
                        <img src={item.img} alt="" />
                      </div>
                    )}
                    {index % 2 === 0 ? (
                      <div className="Acticle-section-left-acticle-right">
                        <img src={item.img} alt="" />
                      </div>
                    ) : (
                      <div className="Acticle-section-left-acticle-left">
                        <div className="name">{item.name}</div>
                        <div className="data">
                          <CalendarOutlined />
                          發表於{item.startDate} | <ReloadOutlined />
                          更新於{item.refershDate}
                        </div>
                        <div className="label">
                          {item.label.map((item, index) => {
                            return (
                              <div key={index}>
                                <Tag color={item.color}>{item.name}</Tag>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <Pagination
                className="pagination"
                showQuickJumper
                defaultCurrent={1}
                defaultPageSize={5}
                total={100}
                showSizeChanger={false}
              />
            </div>
            <div className="Acticle-section-right">
              <div className="Acticle-section-right-all">
                <div className="all-1">
                  <div>
                    <div className="all-1-1">
                      <BookOutlined />
                      文章
                    </div>
                    <div className="all-1-2">2篇</div>
                  </div>
                  <div className="all-1-2">
                    <div className="all-1-1">
                      <BranchesOutlined />
                      分类
                    </div>
                    <div className="all-1-2">2篇</div>
                  </div>
                  <div className="all-1-3">
                    <div className="all-1-1">
                      <TagsOutlined />
                      标签
                    </div>
                    <div className="all-1-2">2篇</div>
                  </div>
                </div>
                <div className="all-2">
                  <div className="all-2-top">
                    <div className="all-2-1">
                      <FullscreenOutlined />
                      展开
                    </div>
                    <div className="all-2-2">
                      <CalendarOutlined />
                      归档
                    </div>
                  </div>
                  <div className="all-2-bottom">
                    <div className="all-2-bottom-1">
                      <div>
                        2022年十月<p>2篇</p>
                      </div>
                      <div>2</div>
                      <div>3</div>
                      <div>4</div>
                      <div>5</div>
                      <div>6</div>
                      <div>7</div>
                      <div>8</div>
                      <div>9</div>
                      <div>10</div>
                    </div>
                  </div>
                </div>
                <div className="all-3"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
