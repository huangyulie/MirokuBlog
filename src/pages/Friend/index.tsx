import { http } from "@/utils";
import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./index.less";

type friendIprops = {
  _id: number;
  username: string;
  desc: string;
  imgUrl: string;
  link: string;
};

export default function Index() {
  const [frined, setFriend] = useState<friendIprops[]>([]);

  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    let { data } = await http.get("/api/friend/index");
    setFriend(data);
  };

  return (
    <Row>
      {frined?.map((item) => {
        return (
          <Col xs={12} md={12} lg={12} xl={8}>
            <a key={item._id} href={item.link} className="Friend">
              <div className="img">
                <img src={item.imgUrl} alt="" />
              </div>
              <div className="title">
                <div className="name">{item.username}</div>
                <div className="desc">{item.desc}123123123123123</div>
              </div>
            </a>
          </Col>
        );
      })}
    </Row>
  );
}
