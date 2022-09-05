import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { http } from "@/utils";
import "./index.less";
import "../../../public/node.webp";

interface label {
  imgUrl: string;
  name: string;
  _id: number;
}

const Home: React.FC = (): React.ReactElement => {
  let [data, setData] = useState<string>(moment().format("YYYY-MM-DD HH:mm"));
  let [label, setLabel] = useState<label[]>([]);

  const navigate = useNavigate();

  // 显示标签
  useEffect(() => {
    window.document.title = "首页|MirokuBlog"

    const data = async()=>{
      let { data } = await http.get("/acticle/classify");
      setLabel(data);
    }
    data();
  }, []);
  // 显示时期
  useEffect(() => {
    const timer = setInterval(() => {
      setData(moment().format("YYYY-MM-DD HH:mm"));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [data]);

  const onclickHandle = (props: string)=>{
    console.log(props);
    navigate(`/article`,{state:{name: props}});
  } 

  return (
    <div className="Home">
      <div className="Home-topic">
        <div className="Home-topic-top">{data}</div>
        <div className="Home-topic-bottom">暂行前十莫问前程</div>
      </div>
      <div className="Home-title">
        <div className="Home-title-top">
          {label.map((item) => {
            return (
              <div className="Home-title-top-sign" key={item._id} onClick={()=>onclickHandle(item.name)}>
                <div className="Home-title-top-sign-label">
                  <img src={item.imgUrl} alt="图片" />
                </div>
                <div className="Home-title-top-sign-section">{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
