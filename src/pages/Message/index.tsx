import { Button, Card, Col, Input, message, Row } from "antd";
import {
  MessageOutlined,
  UserOutlined,
  MailOutlined,
  CrownOutlined,
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
  parents?:number;
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

  const [cname , setCname] = useState<string>("");
  const [cemail, setCemail] = useState<string>("");
  const [clink, setClink] = useState<string>("");
  const [ctextarea, setCtextarea] = useState<string>("");

  useEffect(() => {
    data1();
  }, []);
  const data1 = async () => {
    let { data } = await http.get("/api/message/index");
    setMessage(data);
  };

  const ClickHandle = (props?: number) => {
    setId(props);
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

      setImgUrl(`https://q1.qlogo.cn/g?b=qq&nk=${e.target.value}&s=100`);

  };

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
    message.success('留言成功');
    data1();
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

  const commitcHandle = async () => {
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
    await http.post("/api/message/commit", {
      parents:id,
      cname,
      cemail,
      clink,
      content: ctextarea,
      date: +new Date(),
      ip: "12331",
      imgUrl,
      children: [],
    });
    message.success('留言成功');
    data1();
  };

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
                  value={name}
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
      {message1.map((item) => {
        return (
          <div className="message-main" key={item._id}>
            <div className="left">
              <div className="img">
                <img src={item.imgUrl} alt="logo" />
              </div>
            </div>
            <div className="right">
              <div className="title">
                <div className="name">{item.name}</div>
                <div className="date">
                  {moment(item.date).format("YYYY-MM-DD")}
                </div>
                <div className="ip">来自dasd</div>
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
              {item.children?.map((item) => {
                return (
                  <div className="children">
                    <div className="c-left">
                      <div className="c-img">
                        <img
                          src="http://localhost:3001/imgs/logo.jpg"
                          alt="logo"
                        />
                      </div>
                    </div>
                    <div className="c-right">
                      <div className="c-title">
                        <div className="name">Miroku</div>
                        <div className="date">2012年达到</div>
                        <div className="ip">来自dasd</div>
                      </div>
                      <div className="c-content">
                        哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达
                        哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达 哈哈,阿达
                        哈哈,阿达
                      </div>
                    </div>
                  </div>
                );
              })}
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
                      <Button onClick={commitcHandle} className="contene-button">发送</Button>
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
      })}
    </Card>
  );
}
