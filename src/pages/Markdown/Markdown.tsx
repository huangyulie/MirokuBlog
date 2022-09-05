import React, { useEffect, useState } from "react";
import MyMessage from "@/components/MyMessage/Index";
import { Button, Card } from "antd";
import MdEditor from "md-editor-rt";
import { useParams  } from "react-router-dom";
import "md-editor-rt/lib/style.css";

import "./index.less";
import { http } from "@/utils";

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


export default function Markdown() {
  const params = useParams();
  const [theme] = useState("cyanosis");
  const [state,setState] = useState({
    text: "",
    scrollElement: document.documentElement,
  });
  const [data , setData] = useState<ActiclePorps>();
  const editorId = "my-editor";


  const onClick = () => {
    window.history.back();
  };

  useEffect(()=>{
    window.document.documentElement.scrollTop = 0;
    let {id} = params;    
    const data = async()=>{
      let {data} = await http.get('/acticle/oneActicle',{
        params:{
          id
        }
      })
      setData(data);
      setState({
        text:data.text,
        scrollElement: document.documentElement,
      })
      console.log(data);
    }
    data();
  },[params])

  return (
    <div className="Markdown">
      <div className="Markdown-top">
        <MyMessage img={data?.img}/>
        <Card
          className="Markdown-card"
          title={<strong style={{fontSize:'20px'}}>{data?.name}</strong>}
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
