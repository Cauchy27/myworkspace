import { useEffect, useState } from 'react';

import TaskDetail from "./components/TastDetail";
import TaskDetailSideBar from"./components/TaskDetailSideBar";
import TaskDetailSideBarTitle from"./components/TaskDetailSideBarTitle";
import LoginForm from "./components/LoginForm";
import MainScreen from "./components/MainScreen";

const App = () => {
  const [memos, setMemos] = useState([]);

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

  return (
    <div
      style={{
        "backgroundColor": "#EEEEEE",
        "position": "absolute",
        "height":"100%",
        "width":"100%",
      }}
    >
      <div
      style={{
        "backgroundColor": "#00FF00",
        "position": "relative",
        "height":"10%",
        "width":"75%",
      }}
      ></div>
      <div
      style={{
        "backgroundColor": "#FF0000",
        "position": "absolute",
        "top":"10%",
        "height":"90%",
        "width":"75%",
        "display":"flex",
        "justifyContent":"center",
      }}
      >
        <div
          style={{
            "backgroundColor": "#FFFF00",
            "position": "relative",
            "height":"95%",
            "width":"95%",
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
              "flexWrap":"wrap-reverse",
              "overflow":"scroll"
            }}
          >
            {memos.map((memo, index) =>
              <TaskDetail 
                index = {index}
                title = {memo.title}
                text = {memo.text}
              >
              </TaskDetail>
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          "backgroundColor": "#808080",
          "position": "absolute",
          "left":"75%",
          "top":"10%",
          "height":"90%",
          "width":"25%",
          "display":"flex",
          "justifyContent":"center",
        }}
      >
        <div
        style={{
          "backgroundColor": "#CCFFFF",
          "position": "relative",
          "height":"95%",
          "width":"90%",
          "marginLeft":"auto",
          "marginRight":"auto",
          "marginTop":"auto",
          "marginBottom":"auto",
        }}
        >
          <div
          style={{
            "backgroundColor": "#FFFF00",
            "position": "relative",
            "height":"95%",
            "width":"95%",
            "top":"3%",
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
            }}
          >
            <TaskDetailSideBarTitle
              title = "タスク一覧"
            >
            </TaskDetailSideBarTitle>
            {memos.map((memo, index) =>
              <TaskDetailSideBar 
                index = {index}
                title = {memo.title}
                text = {memo.text}
              >
              </TaskDetailSideBar>
            )}
          </div>
        </div>

        </div>

      </div>
    </div>
  );
}

export default App;
