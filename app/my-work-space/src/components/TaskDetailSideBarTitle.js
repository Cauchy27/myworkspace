import { useEffect, useState } from 'react';

import Images from "./getImagePath";

const TaskDetailSideBarTitle = (props) => {

  const taskDetailSideBarTitleStyle = {
    "backgroundColor": "#FF99FF",
    // "paddingTop":"3%",
    // "paddingBottom":"3%",
    // "paddingLeft":"2%",
    // "paddingRight":"2%",
    "border":"solid 5px #555555",
    "width":"100%",
    // "height":"30px",
    "marginLeft":"auto",
    "marginRight":"auto",
    "marginTop":props.marginTop,
    "marginBottom":"0%",
    "textAlign": "center",
    // "justifyContent": "center",
  }

  // サイドバーの折りたたみボタン
  const [arrow, setArrow] = useState(["under_arrow1"]);
  
  const iconStyle = {
    "height":"20px",
    "marginLeft":"5px",
  }

  const clickAction = () =>{
    // 矢印の向きを切り替え
    if(arrow == "under_arrow1"){
      setArrow("upper_arrow1");
    }
    else{
      setArrow("under_arrow1");
    }

    // 折りたたみ状態の切り替え
  }

  return (
    <div style={taskDetailSideBarTitleStyle}>
      <h2>
        {props.title}
        <img src={Images[arrow]}
          style={iconStyle}
          onClick ={
            ()=>{
              clickAction();
            }
          }
        ></img>
      </h2>
    </div>
  );
}

export default TaskDetailSideBarTitle;
