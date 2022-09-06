import React, { useEffect, useState } from "react";
import { Card } from "antd";
import MyMessage from "@/components/MyMessage/Index";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import "./index.less";
import { http } from "@/utils";
import moment from "moment";

interface BuildIprops{
    _id:number;
    date:number;
    content:string;
}

export default function Index() {
  window.document.title = "建站|MirokuBlog";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<BuildIprops[]>([]);

  useEffect(() => {
    const data = async () => {
      let { data } = await http.get("/build/build");
      setData(data);
      setLoading(false);
    };
    data();
  }, []);
  return (
    <div className="Acticle">
      <div className="Acticle-top">
        <MyMessage img={""} />
        <Card
          title={<strong style={{ fontSize: "20px" }}>建站</strong>}
          // {<strong style={{fontSize:'20px'}}>{data?.name}</strong>}
          className="Acticle-card"
          loading={loading}
        >
          <Timeline mode="alternate" className="Timelone" pending="未完待续...">
            {data.map((item) => {
              return (
                <Timeline.Item key={item._id} color="green">
                  <div className="Timelone-item">
                    <div className="top">{moment(item.date).format("YYYY年MM月DD日 HH:mm:ss")}</div>
                    <div className="bottom">{item.content}</div>
                  </div>
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Card>
      </div>
    </div>
  );
}
