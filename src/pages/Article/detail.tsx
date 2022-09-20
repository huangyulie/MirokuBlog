import React, { useEffect, useState } from "react";
import { Row, Col, Tag, Pagination, List, Card, Button } from "antd";
import "./index.less";
import { http } from "@/utils";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import Left from "@/components/Left/index";
import Right from "@/components/Right/index";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";

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
  const [article, setArticle] = useState<articleIprops[]>([]);
  const [text , setText] = useState<string>('');
  const [ name , setName] = useState<string>('');
  const param = useParams();
  const nav = useNavigate();

  useEffect(() => {
    window.document.documentElement.scrollTop = 0
    Article();
    IdFind();
  }, []);
  // 获取文章
  const Article = async () => {
    let { data } = await http.get<any, any>("/api/acticle/all");
    setArticle(data);
  };
  const IdFind = async () => {
    const {id} = param;
    let { data } = await http.post<any, any>("/api/acticle/changeOne", {
      id: id,
    });
    setText(data.text);
    setName(data.name);
  };

  const clickHandle = (props: number | undefined) => {
    console.log(props);
  };

  return (
    <div className="Article">
      <Row>
        <Left />
        <Col xs={24} md={16} lg={16} xl={12}>
          <Card
            title={name}
            extra={<Button onClick={()=>nav("/acticle")}>返回</Button>}
          >
            <MdEditor
              modelValue={text}
              previewOnly
              previewTheme={"cyanosis"}
            />
          </Card>
        </Col>
        <Right />
      </Row>
      <div className="footer">12312</div>
    </div>
  );
}
