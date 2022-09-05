import React, { useEffect, useState, ChangeEvent } from "react";
import { Card, Tag, Input, message, Pagination, Modal,List  } from "antd";
import MyMessage from "@/components/MyMessage/Index";
import  moment  from "moment";
import {
  CalendarOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  BookOutlined,
  BranchesOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import "./index.less";
import { useNavigate, useLocation } from "react-router-dom";
import { http } from "@/utils/index";

const { Search } = Input;

interface labelProps {
  _id:number;
  color: string;
  name: string;
}

interface ActiclePorps {
  _id: number;
  name: string;
  label: Array<labelProps>;
  img: string;
  startDate: string;
  refershDate: string;
}

interface StateIprops {
  name: string;
}

interface httpIprops {
  status: number;
  data: Array<ActiclePorps>;
  articleLength: number;
}

interface classifyIprops {
  imgUrl: string;
  _id: number;
  name: string;
}

export default function Inedx() {
  const [acticles, setActicle] = useState<ActiclePorps[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [condition, setCondition] = useState<string>("全部文章");
  const [articleLength, setLength] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current , setCurrent] = useState(1);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  // 获取分类
  const [classify, setClassify] = useState<classifyIprops[]>([]);
  // 获取所有文章数量
  const [length, setTextLength] = useState<number>(0);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  // 获取所有标签
  const [label , setLabel] = useState<labelProps[]>([]);
  // 单个标签
  const [oneLabel , setOneLabel] = useState<string>();
  // 获取日期标签
  const [date , setDate] = useState([]);
  // 相关时间
  const [aboutDate,setAboutDate] = useState('');
  const navigate = useNavigate();
  const Location = useLocation();
  const pagesize = 5;

  useEffect(() => {
    window.document.documentElement.scrollTop = 0;    
    const data = async () => {
      try {
        let name;
        if (Location.state !== null) {
          name = (Location.state as StateIprops).name;
          let { data, articleLength } = await http.get<httpIprops, httpIprops>(
            `/acticle/one?pagesize=${pagesize}&page=1&label=${name}`
          );
          setCondition(name);
          setLength(articleLength);
          setActicle(data);
          message.success(name + "共" + articleLength + "篇");
        } else {
          name = "全部文章";
          let { data, articleLength } = await http.get<httpIprops, httpIprops>(
            `/acticle/all?pagesize=${pagesize}&page=1`
          );
          setLength(articleLength);
          setActicle(data);
          setCondition("全部文章");
          message.success("全部文章共" + articleLength + "篇");
        }

        let { data } = await http.get("/acticle/classify");
        setClassify(data);
        let { articleLength } = await http.get<httpIprops, httpIprops>(
          `/acticle/all?pagesize=${pagesize}&page=1`
        );
        let  res  = await http.get('/acticle/label');
        setLabel(res.data);

        setTextLength(articleLength);
        setCurrent(1);
        let resp = await http.get('/acticle/date');
        setDate(resp.data);        
      } catch (err) {
        message.error("请求失败");
      }
    };
    data();
  }, [Location.state]);// eslint-disable-line react-hooks/exhaustive-deps

  const onSearch = async (value: string) => {
    setSearch(true);
    // setText("");
    let { data , articleLength } = await http.get<httpIprops, httpIprops>("/acticle/check", {
      params: {
        name: value,
        pagesize: 5,
        page: 1,
      },
    });
    setCurrent(1);
    setCondition("相关文章");
    setLength(articleLength);
    setActicle(data);
    message.success("搜索成功");
    setSearch(false);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // 点击文章跳转功能
  const OnClickHandle = (props: number) => {
    navigate(`/article/${props}`);
    console.log(props);
  };
  // 分页
  const onChangePagination = async (page: number, pagesize: number) => {
    if (condition === "全部文章") {
      let { data, articleLength } = await http.get<httpIprops, httpIprops>(
        `/acticle/all?pagesize=${pagesize}&page=${page}`
      );
      setLength(articleLength);
      setActicle(data);
    }
    else if(condition === '相关文章'){
      let { data , articleLength } = await http.get<httpIprops, httpIprops>("/acticle/check", {
        params: {
          name: text,
          pagesize: 5,
          page: page,
        },
      });
      setCondition("相关文章");
      setLength(articleLength);
      setActicle(data);
      setSearch(false);
    }
    else if(condition === '相关标签'){
      let {articleLength , data } = await http.get<httpIprops, httpIprops>('/acticle/oneLabel',{
        params:{
          pagesize:pagesize,
          page:page,
          name:oneLabel
        }
      })
      setIsModalVisible1(false);
      setLength(articleLength);
      setActicle(data);
      setCondition("相关标签");
      setCurrent(1);
    }
    else if(condition === '相关时间'){
      let {data,articleLength} = await http.get<httpIprops,httpIprops>('/acticle/dateone',{
        params:{
          pagesize,
          page,
          name:aboutDate
        }
      })
      setIsModalOpen2(false);
      setLength(articleLength);
      setActicle(data);
      setCondition("相关时间");
      setCurrent(1);
    }
     else {
      let { data, articleLength } = await http.get<httpIprops, httpIprops>(
        `/acticle/one?pagesize=${pagesize}&page=${page}&label=${condition}`
      );
      setLength(articleLength);
      setActicle(data);
    }
    setCurrent(page);
  };
  // 分类以及标签
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // 标签
  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  // 获取分类
  const classifyHandle = async (props: string) => {
    let { data, articleLength } = await http.get<httpIprops, httpIprops>(
      `/acticle/one?pagesize=${pagesize}&page=1&label=${props}`
    );
    setCondition(props);
    setLength(articleLength);
    setActicle(data);
    message.success(props + "共" + articleLength + "篇");
    setIsModalVisible(false);
  };
  // 获取所有时间
  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  //获取所有文章
  const AllHandle = async () => {
    let { data, articleLength } = await http.get<httpIprops, httpIprops>(
      `/acticle/all?pagesize=${pagesize}&page=1`
    );
    setLength(articleLength);
    setActicle(data);
    setCondition("全部文章");
    setCurrent(1);
    message.success("全部文章共" + articleLength + "篇");
  };

  // 标签
  const TagHandle = async(props: string)=>{
    let {articleLength , data } = await http.get<httpIprops, httpIprops>('/acticle/oneLabel',{
      params:{
        pagesize:5,
        page:1,
        name:props
      }
    })
    setOneLabel(props);
    setIsModalVisible1(false);
    setLength(articleLength);
    setActicle(data);
    setCondition("相关标签");
    setCurrent(1);
  }

  // 获取所有时间的文章
  const dateHandle = async(props: string)=>{
    let {data,articleLength} = await http.get<httpIprops,httpIprops>('/acticle/dateone',{
      params:{
        pagesize:5,
        page:1,
        name:props
      }
    })
    setAboutDate(props)
    setIsModalOpen2(false);
    setLength(articleLength);
    setActicle(data);
    setCondition("相关时间");
    setCurrent(1);
  }

  return (
    <div className="Acticle">
      <div className="Acticle-top">
        <MyMessage />
        <Card
          title={`${condition} ${articleLength}篇`}
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
                    onClick={() => OnClickHandle(item._id)}
                    key={item._id}
                    className="Acticle-section-left-acticle"
                  >
                    {index % 2 === 0 ? (
                      <div className="Acticle-section-left-acticle-left">
                        <div className="name">{item.name}</div>
                        <div className="data">
                          <CalendarOutlined />
                          發表於{moment(parseInt(item.startDate)).format("YYYY年MM月DD日 HH:mm:ss")} | <ReloadOutlined />
                          更新於{moment(parseInt(item.refershDate)).format("YYYY年MM月DD日 HH:mm:ss")}
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
                          發表於{moment(parseInt(item.startDate)).format("YYYY年MM月DD日 HH:mm:ss")} | <ReloadOutlined />
                          更新於{moment(parseInt(item.refershDate)).format("YYYY年MM月DD日 HH:mm:ss")}
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
                current={current}
                defaultPageSize={5}
                total={articleLength}
                showSizeChanger={false}
                onChange={(page, pagesize) =>
                  onChangePagination(page, pagesize)
                }
              />
            </div>
            <div className="Acticle-section-right">
              <div className="Acticle-section-right-all">
                <div className="all-1">
                  <div>
                    <div className="all-1-1" onClick={AllHandle}>
                      <BookOutlined />
                      文章
                    </div>
                    <div className="all-1-2">{length}篇</div>
                  </div>
                  <div className="all-1-2">
                    <div className="all-1-1" onClick={() => showModal()}>
                      <BranchesOutlined />
                      分类
                    </div>
                    <div className="all-1-2">{classify.length}种</div>
                  </div>
                  <div className="all-1-3" onClick={showModal1}>
                    <div className="all-1-1">
                      <TagsOutlined />
                      标签
                    </div>
                    <div className="all-1-2">{label.length}种</div>
                  </div>
                </div>
                <div className="all-2">
                  <div className="all-2-top">
                    <div className="all-2-1" onClick={showModal2}>
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
                    {
                      date.map((item: any ,index)=>{
                        if(index<10){
                          return(
                            <div key={index} onClick={()=>dateHandle(item.date)}>
                            {item.date}<p>{item.length}篇</p>
                          </div>
                          )
                        }else{
                          return null;
                        }
                      })
                    }
                    </div>
                  </div>
                </div>
                <div className="all-3"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Modal
        title="所有分类"
        visible={isModalVisible}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="Model">
          {classify.map((item) => {
            return (
              <div
                className="Model-item"
                key={item._id}
                onClick={() => classifyHandle(item.name)}
              >
                <div className="Model-item-top">
                  <img src={item.imgUrl} alt="" />
                </div>
                <div className="Model-item-bottom">{item.name}</div>
              </div>
            );
          })}
        </div>
      </Modal>
      <Modal title="全部标签" footer={null} visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel1}>
        <div className="ModelLabel">
          {
            label.map((item)=>{
              return(
                <Tag key={item._id} color={item.color} className="Tag" onClick={()=>TagHandle(item.name)}>{item.name}</Tag>
              )
            })
          }
        </div>
      </Modal>
      <Modal title="所有时间" visible={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2}>
      <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
      xxl: 3,
    }}
    dataSource={date}
    renderItem={(item: any) => (
      <List.Item>
        <Card title={item.date} className="ListCard" onClick={()=>dateHandle(item.date)}>
          <div className="ListCardDiv">{item.length}篇</div>
        </Card>
      </List.Item>
    )}
  />
      </Modal>
    </div>
  );
}
