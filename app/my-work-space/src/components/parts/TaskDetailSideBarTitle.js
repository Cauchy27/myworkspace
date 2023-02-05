import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import TaskDetailSideBar from"./TaskDetailSideBar";

import Images from "../parts/getImagePath";

// Googleログイン
import {UseDbToken} from "../parts/LoginCheck";

const TaskDetailSideBarTitle = (props) => {

  const today = new Date();
  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  let [memos, setMemos] = useState([]);

  // 読み込み時の動作
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async() => {
    const token = await UseDbToken();
    const data = {
      token:token,
      task_date:formatDate(today),
    };
    console.log(JSON.stringify(data));
    fetch('/taskQuerySearch',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      setMemos(res_data);
      console.log(res_data)
      return res_data;
    })
  }

  const taskDetailSideBarTitleStyle = {
    "backgroundColor": "#FFDAB9",
    "top":"0",
    // "color":"#fefffe",
    // "paddingTop":"3%",
    // "paddingBottom":"3%",
    // "paddingLeft":"2%",
    // "paddingRight":"2%",
    "border": "2px solid #545454",
    "width":"96%",
    "height":"15%",
    "marginLeft":"auto",
    "marginRight":"auto",
    "marginTop":"0",
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
  const subButton = {
    "marginTop":"3%",
    "marginBottom":"3%",
    "marginLeft":"5%",
    "marginRight":"5%",
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
    <div
        style={{
          "backgroundColor": "#545454",
          "position": "relative",
          "height":"100%",
          "width":"100%",
          "marginLeft":"auto",
          "marginRight":"auto",
          "marginTop":"auto",
          "marginBottom":"auto",
        }}
    >

      <div
            style={{
              "backgroundColor": "#545454",
              "position": "relative",
              "height":"100%",
              "width":"100%",
              // "top":"3%",
              "marginLeft":"auto",
              "marginRight":"auto",
              "marginTop":"auto",
              "marginBottom":"auto",
              "alignItems":"center",
              "overflow":"scroll",
            }}
      >

        <div 
          style={{
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "flexWrap":"wrap",
            "overflow":"scroll",
            "marginLeft":"auto",
            "marginRight":"auto",
            "marginTop":"auto",
            "marginBottom":"auto",
            "backgroundColor": "#545454",
          }}
        >
          <div style={{"width":"100%"}}>
            <div style={taskDetailSideBarTitleStyle}>
              <h2 style={{"margin":"0",}}>
                {props.title}
                <img src={Images[arrow]}
                  style={iconStyle}
                  onClick ={
                    ()=>{
                      clickAction();
                    }
                  }
                />
                <Button 
                style={subButton} 
                variant="contained" 
                color="primary"
                onClick = {()=>{fetchData()}}
                >
                  更新
                </Button>
              </h2>
            </div>
            <div style={{"overflow":"scroll",}}>
              {memos.map((memo, index) =>
              
                <TaskDetailSideBar 
                  memo = {memo}
                  displayStatus = {memo.displayStatus}
                  key = {index}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailSideBarTitle;
