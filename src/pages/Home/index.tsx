import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./index.less";
import "../../../public/node.webp";

interface label {
  imgUrl: string;
  labelName: string;
  id: number;
}

const Home: React.FC = (): React.ReactElement => {
  let [data, setData] = useState<string>(moment().format("YYYY-MM-DD HH:mm"));
  let [label, setLabel] = useState<label[]>([]);

  const navigate = useNavigate();

  // 显示标签
  useEffect(() => {
    setLabel([
      { imgUrl: "/html.webp", labelName: "HTML",id:1 },
      { imgUrl: "/css.webp", labelName: "CSS" ,id:2},
      { imgUrl: "/js.webp", labelName: "Javascript" ,id:3},
      { imgUrl: "/react.webp", labelName: "React" ,id:4},
      { imgUrl: "/http.webp", labelName: "Http" ,id:5},
      { imgUrl: "/node.webp", labelName: "NodeJS" ,id:6},
      { imgUrl: "/ts.webp", labelName: "Typescript" ,id:7},
      { imgUrl: "/随笔.webp", labelName: "随笔" ,id:8},
      
    ]);
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
              <div className="Home-title-top-sign" key={item.id} onClick={()=>onclickHandle(item.labelName)}>
                <div className="Home-title-top-sign-label">
                  <img src={item.imgUrl} alt="图片" />
                </div>
                <div className="Home-title-top-sign-section">{item.labelName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
