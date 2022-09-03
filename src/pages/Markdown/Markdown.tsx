import React, { useEffect, useState } from "react";
import MyMessage from "@/components/MyMessage/Index";
import { Button, Card } from "antd";
import MdEditor from "md-editor-rt";
import { useNavigate } from "react-router-dom";
import { AlignRightOutlined } from "@ant-design/icons";
import "md-editor-rt/lib/style.css";

import "./index.less";

export default function Markdown() {
  const [theme] = useState("cyanosis");
  const [state] = useState({
    text: "# 标题\n ## dsadas\n ## dadasd\n ### dasdsad\n #### dasdsa\n ##### dsad\n ###### fsdf\n#### dsda\n> 13123\n> 2424fsd",
    scrollElement: document.documentElement,
  });
  const editorId = "my-editor";

  let navigate = useNavigate();

  const onClick = () => {
    navigate("/article");
  };

  useEffect(()=>{
    window.document.documentElement.scrollTop = 0;
  },[])

  return (
    <div className="Markdown">
      <div className="Markdown-top">
        <MyMessage />
        <Card
          className="Markdown-card"
          title="231"
          extra={<Button onClick={onClick}>返回</Button>}
        >
          <div className="Mdd">
            <div className="Markdown-card-left">
              <MdEditor
                previewTheme={theme}
                previewOnly
                className="markdown"
                modelValue={state.text}
                editorId={editorId}
              />
            </div>
            <div className="Markdown-card-right">
              <MdEditor.MdCatalog
                editorId={editorId}
                scrollElement={state.scrollElement}
                className="md-1"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
