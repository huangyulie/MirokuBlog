import React, { useState } from "react";
import { Card } from "antd";
import MyMessage from "@/components/MyMessage/Index";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import "./index.less";

export default function Index() {
  window.document.title = "建站|MirokuBlog";
  const [loading, setLoading] = useState(false);
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
          <Timeline mode="alternate" className="Timelone">
            <Timeline.Item>
                <div className="Timelone-item">
                    <div className="top">2012年12月11日</div>
                    <div className="bottom">今天完成了巴拉巴拉</div>
                </div>
            </Timeline.Item>
            <Timeline.Item>
                <div className="Timelone-item">
                    <div className="top">2012年12月11日</div>
                    <div className="bottom">今天完成了巴拉巴拉</div>
                </div>
            </Timeline.Item>
            <Timeline.Item color="green">
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo.
            </Timeline.Item>
            <Timeline.Item color="red">
              Network problems being solved 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: "16px" }} />}
            >
              Technical testing 2015-09-01
            </Timeline.Item>
          </Timeline>
        </Card>
      </div>
    </div>
  );
}
