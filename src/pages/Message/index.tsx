import { Button, Card, Col, Input, List, message, Row } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  MailOutlined,
  CrownOutlined,
  HomeOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./index.less";
import { http } from "@/utils";
import moment from "moment";

const { TextArea } = Input;

type Messageprops = {
  _id?: number;
  name?: string;
  date?: number;
  content?: string;
  email?: string;
  link?: string;
  ip?: string;
  children?: Array<any>;
  imgUrl?: string;
  parents?: number;
  parentName?: number;
};

export default function Index() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [textarea, setTextarea] = useState<string>("");
  const [message1, setMessage] = useState<Messageprops[]>([]);
  const [id, setId] = useState<number>();
  const [imgUrl, setImgUrl] = useState<string>(
    "http://localhost:3001/imgs/react.webp"
  );
  const [loading, setLoading] = useState<boolean>(true);

  const [cname, setCname] = useState<string>("");
  const [cemail, setCemail] = useState<string>("");
  const [clink, setClink] = useState<string>("");
  const [ctextarea, setCtextarea] = useState<string>("");

  const [count, setCount] = useState<number[]>([]);
  const [hidden, setHidden] = useState<boolean[]>([]);

  useEffect(() => {
    data1();
  }, []);

  const data1 = async () => {
    let { data } = await http.get("/api/message/index");
    setMessage(data);
    let arr = [];
    let brr = [];
    for (let i = 0; i < data.length; ++i) {
      arr.push(2);
      brr.push(false)
    }
    setCount(arr);
    setHidden(brr);
    setLoading(false);
  };

  const ClickHandle = (props?: number) => {
    setId(props);
  };

  const useDebounce = (fn: Function, delay: number) => {
    let timer = useRef<number | NodeJS.Timeout>();
    return function (...args: []) {
      let arr = args.shift();
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        fn(arr);
      }, delay);
    };
  };

  const changeHandle = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
    setImgUrl(`https://q1.qlogo.cn/g?b=qq&nk=${e.target.value}&s=100`);
  }, 1000);


  const changeHandleemail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changeHandleLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const changeHandleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextarea(e.target.value);
  };

  const commitHandle = async () => {
    if (name.trim() === "") {
      message.error("请输入昵称");
      return;
    }
    if (email.trim() === "") {
      message.error("请输入邮箱");
      return;
    }
    if (textarea.trim() === "") {
      message.error("请输入留言");
      return;
    }
    await http.post("/api/message/add", {
      name,
      email,
      link,
      content: textarea,
      date: +new Date(),
      ip: "12331",
      imgUrl,
      children: [],
    });
    message.success("留言成功");
    data1();
    setName("");
    setEmail("");
    setTextarea("");
    setLink("");
    setId(0);
  };

  // 留言
  const changeCHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setCname(e.target.value);
    setImgUrl(`https://q1.qlogo.cn/g?b=qq&nk=${e.target.value}&s=100`);
  };

  const changeCHandleemail = (e: ChangeEvent<HTMLInputElement>) => {
    setCemail(e.target.value);
  };

  const changeCHandleLink = (e: ChangeEvent<HTMLInputElement>) => {
    setClink(e.target.value);
  };

  const changeCHandleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCtextarea(e.target.value);
  };

  const commitcHandle = async (props?: string) => {
    if (cname.trim() === "") {
      message.error("请输入昵称");
      return;
    }
    if (cemail.trim() === "") {
      message.error("请输入邮箱");
      return;
    }
    if (ctextarea.trim() === "") {
      message.error("请输入留言");
      return;
    }
    if (props === "p") {
      await http.post("/api/message/commit", {
        parent: id,
        name: cname,
        email: cemail,
        link: clink,
        content: ctextarea,
        date: +new Date(),
        ip: "陕西西安",
        imgUrl,
      });
    } else {
      await http.post("/api/message/third", {
        parent: id,
        name: cname,
        email: cemail,
        link: clink,
        content: ctextarea,
        date: +new Date(),
        ip: "陕西西安",
        imgUrl,
      });
    }

    message.success("留言成功");
    data1();
    setCname("");
    setCemail("");
    setCtextarea("");
    setClink("");
    setId(0);
  };

  const ListLoad = (props: number, len: number) => {
    let arr = count;
    let brr = hidden;
    arr[props] = len;
    brr[props] = true;
    setCount([...arr]);
    setHidden([...brr]);
  };

  const ListNode = (props: number)=>{
    let arr = count;
    let brr = hidden;
    arr[props] = 2;
    brr[props] = false;
    setCount([...arr]);
    setHidden([...brr]);
  }

  return (
    <Card title={"留言"}>
      <div className="message-content">
        <div className="message-img">
          <img src={imgUrl} alt="logo" />
        </div>
        <div className="message-input">
          <Row>
            <Col xs={24} md={8} lg={8} xl={8} className="content-input">
              <div className="input-item">
                <Input
                  prefix={<UserOutlined />}
                  placeholder="昵称(必填)"
                  onChange={changeHandle}
                ></Input>
              </div>
            </Col>
            <Col xs={24} md={8} lg={8} xl={8} className="content-input">
              <div className="input-item">
                <Input
                  prefix={<MailOutlined />}
                  placeholder="邮箱(必填)"
                  onChange={changeHandleemail}
                  value={email}
                ></Input>
              </div>
            </Col>
            <Col xs={24} md={8} lg={8} xl={8} className="content-input">
              <div className="input-item">
                <Input
                  prefix={<CrownOutlined />}
                  placeholder="地址(选填)"
                  onChange={changeHandleLink}
                  value={link}
                ></Input>
              </div>
            </Col>
          </Row>
          <div className="content-textarea">
            <TextArea
              className="texxxxxxx"
              showCount
              maxLength={500}
              placeholder="请发一条友善的留言吧,可以在昵称处填写QQ号,自动获取qq头像和邮箱,否则生成随机头像"
              onChange={changeHandleText}
              value={textarea}
            />
          </div>
          <div className="content-commit">
            <Button className="contene-button" onClick={commitHandle}>
              发送
            </Button>
          </div>
        </div>
      </div>
      <div className="message-count">总共{message1.length}条留言</div>
      <List
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 5,
          showQuickJumper: true,
          total: message1.length,
          onChange: () => {
            window.document.documentElement.scrollTop = 0;
          },
        }}
        dataSource={message1}
        renderItem={(item, ParentIndex) => {
          return (
            <List.Item>
              <div className="message-main" key={item._id}>
                <div className="left">
                  <div className="img">
                    <img src={item.imgUrl} alt="logo" />
                  </div>
                </div>
                <div className="right">
                  <div className="title">
                    <div className="name">{item.name}</div>
                    <div
                      className="ico"
                      onClick={() => {
                        ClickHandle(item._id);
                      }}
                    >
                      回复：
                      <MessageOutlined />
                    </div>
                  </div>
                  <div className="content">{item.content}</div>
                  <div className="ip">
                    <HomeOutlined /> 来自dasd <FlagOutlined />{" "}
                    {moment(item.date).format("YYYY-MM-DD")}
                  </div>
                  {item.children?.map((item, index, arr) => {
                    let len = arr.length;
                    if (index < count[ParentIndex]) {
                      return (
                        <div className="children" key={item._id}>
                          <div className="c-left">
                            <div className="c-img">
                              <img src={item.imgUrl} alt="logo" />
                            </div>
                          </div>
                          <div className="c-right">
                            <div className="c-title">
                              <div className="name">
                                {item.parentName ? (
                                  <div>
                                    {item.name} 回复{" "}
                                    <span id="itemitemitem">
                                      @{item.parentName}
                                    </span>
                                  </div>
                                ) : (
                                  item.name
                                )}
                              </div>
                              <div
                                className="ico"
                                onClick={() => {
                                  ClickHandle(item._id);
                                }}
                              >
                                回复：
                                <MessageOutlined />
                              </div>
                            </div>
                            <div className="c-content">{item.content}</div>
                            <div className="ip">
                              <HomeOutlined /> 来自{item.ip} <FlagOutlined />{" "}
                              {moment(item.date).format("YYYY-MM-DD")}
                            </div>
                          </div>

                          {item._id === id ? (
                            <div className={"hidden"}>
                              <div className="message-content">
                                <div className="message-img">
                                  <img
                                    src="http://localhost:3001/imgs/react.webp"
                                    alt="logo"
                                  />
                                </div>
                                <div className="message-input">
                                  <Row>
                                    <Col
                                      xs={24}
                                      md={8}
                                      lg={8}
                                      xl={8}
                                      className="content-input"
                                    >
                                      <div className="input-item">
                                        <Input
                                          prefix={<UserOutlined />}
                                          placeholder="昵称(必填)"
                                          onChange={changeCHandle}
                                          value={cname}
                                        ></Input>
                                      </div>
                                    </Col>
                                    <Col
                                      xs={24}
                                      md={8}
                                      lg={8}
                                      xl={8}
                                      className="content-input"
                                    >
                                      <div className="input-item">
                                        <Input
                                          prefix={<MailOutlined />}
                                          placeholder="邮箱(必填)"
                                          onChange={changeCHandleemail}
                                          value={cemail}
                                        ></Input>
                                      </div>
                                    </Col>
                                    <Col
                                      xs={24}
                                      md={8}
                                      lg={8}
                                      xl={8}
                                      className="content-input"
                                    >
                                      <div className="input-item">
                                        <Input
                                          prefix={<CrownOutlined />}
                                          placeholder="地址(选填)"
                                          onChange={changeCHandleLink}
                                          value={clink}
                                        ></Input>
                                      </div>
                                    </Col>
                                  </Row>
                                  <div className="content-textarea">
                                    <TextArea
                                      showCount
                                      maxLength={500}
                                      placeholder={`回复${item.name}:`}
                                      onChange={changeCHandleText}
                                      value={ctextarea}
                                    />
                                  </div>
                                  <div className="content-commit">
                                    <Button
                                      onClick={() => {
                                        commitcHandle("c");
                                      }}
                                      className="contene-button"
                                    >
                                      发送
                                    </Button>
                                    <Button
                                      className="contene-cancer"
                                      onClick={() => {
                                        setId(0);
                                      }}
                                    >
                                      取消
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    }

                    if (index < count[ParentIndex] + 1) {
                      return (
                        <div
                          key={index}
                          id="List-loading"
                          onClick={() => {
                            ListLoad(ParentIndex, len);
                          }}
                        >
                          加载全部{len}条
                        </div>
                      );
                    }
                    return null;
                  })}
                  {
                    hidden[ParentIndex]?<div id="List-indexitem" onClick={()=>ListNode(ParentIndex)}>收起</div>:<></>
                  }
                </div>
                {item._id === id ? (
                  <div className={"hidden"}>
                    <div className="message-content">
                      <div className="message-img">
                        <img
                          src="http://localhost:3001/imgs/react.webp"
                          alt="logo"
                        />
                      </div>
                      <div className="message-input">
                        <Row>
                          <Col
                            xs={24}
                            md={8}
                            lg={8}
                            xl={8}
                            className="content-input"
                          >
                            <div className="input-item">
                              <Input
                                prefix={<UserOutlined />}
                                placeholder="昵称(必填)"
                                onChange={changeCHandle}
                                value={cname}
                              ></Input>
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            md={8}
                            lg={8}
                            xl={8}
                            className="content-input"
                          >
                            <div className="input-item">
                              <Input
                                prefix={<MailOutlined />}
                                placeholder="邮箱(必填)"
                                onChange={changeCHandleemail}
                                value={cemail}
                              ></Input>
                            </div>
                          </Col>
                          <Col
                            xs={24}
                            md={8}
                            lg={8}
                            xl={8}
                            className="content-input"
                          >
                            <div className="input-item">
                              <Input
                                prefix={<CrownOutlined />}
                                placeholder="地址(选填)"
                                onChange={changeCHandleLink}
                                value={clink}
                              ></Input>
                            </div>
                          </Col>
                        </Row>
                        <div className="content-textarea">
                          <TextArea
                            showCount
                            maxLength={500}
                            placeholder={`回复${item.name}:`}
                            onChange={changeCHandleText}
                            value={ctextarea}
                          />
                        </div>
                        <div className="content-commit">
                          <Button
                            onClick={() => {
                              commitcHandle("p");
                            }}
                            className="contene-button"
                          >
                            发送
                          </Button>
                          <Button
                            className="contene-cancer"
                            onClick={() => {
                              setId(0);
                            }}
                          >
                            取消
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </List.Item>
          );
        }}
      ></List>
    </Card>
  );
}
