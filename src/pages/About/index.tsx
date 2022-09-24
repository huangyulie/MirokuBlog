import React, { useEffect, useState } from "react";
import MdEditor from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { Card } from "antd";
import { http } from "@/utils";

export default function Index() {
  const [aboutMe, setAboutMe] = useState<any>();
  const [aboutBuild, setAboutBuild] = useState<any>();
  const [loading , setLoading] = useState(true);

  useEffect(() => {
    data();
  }, []);
  const data = async () => {
    let { data } = await http.get("/api/about/about");
    setAboutMe(data[0].text);
    setAboutBuild(data[1].text);
    setLoading(false);

  };
  return (
    <div>
      <Card title="关于我" loading={loading}>
        <MdEditor modelValue={aboutMe} previewOnly previewTheme={"cyanosis"} />
      </Card>
      <Card title="关于本站" loading={loading}>
        <MdEditor
          modelValue={aboutBuild}
          previewOnly
          previewTheme={"cyanosis"}
        />
      </Card>
    </div>
  );
}
