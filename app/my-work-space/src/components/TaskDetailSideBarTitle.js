import { useEffect, useState } from 'react';

import TaskDetailSideBar from"./TaskDetailSideBar";
import Images from "./getImagePath";

const TaskDetailSideBarTitle = (props) => {

  let [memos, setMemos] = useState([]);

  // 読み込み時の動作
  useEffect(() => {
    fetch('/memoTest')
    .then(res => res.json())
    .then(data => {
      setMemos(data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const taskDetailSideBarTitleStyle = {
    "backgroundColor": "#FF99FF",
    // "paddingTop":"3%",
    // "paddingBottom":"3%",
    // "paddingLeft":"2%",
    // "paddingRight":"2%",
    "border":"solid 2px #555555",
    "width":"99%",
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

  const changeDisplayStatus = () => {
    {
      memos.map((memo, index) => {
        if(arrow == "under_arrow1"){
          memo.displayStatus = true;
        }
        else{
          memo.displayStatus = false;
        }
      }
    )}
  }

  // 折りたたみ状態の切り替え
  changeDisplayStatus();

  const clickAction = () =>{
    // 折りたたみ状態の切り替え
    changeDisplayStatus();
    // 矢印の向きを切り替え
    if(arrow == "under_arrow1"){
      setArrow("upper_arrow1");
    }
    else{
      setArrow("under_arrow1");
    }
  }

  return (
    <div style={{"width":"100%"}}>
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
      <div style={{"overflow":"scroll",}}>
        {memos.map((memo, index) =>
        
          <TaskDetailSideBar 
            index = {index}
            title = {memo.title}
            text = {memo.text}
            displayStatus = {memo.displayStatus}
            key = {index}
          />
        )}
      </div>
    </div>
  );
}

export default TaskDetailSideBarTitle;
