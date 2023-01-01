import { useEffect, useState } from 'react';

import TaskDetail from "./components/TastDetail";
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

  const [dragIndex, setDragIndex] = useState(null);

  // ドラッグ開始の検知
  useEffect(()=>{
    console.log(dragIndex);
  },[dragIndex]);


  // ドラッグ開始時
  const dragStart = (index) => {
    setDragIndex(index);
  }

  // ドラッグ移動先
  const dragEnter = (index) => {
    // console.log('index', index);
    // console.log('dragIndex', dragIndex);
    if (index === dragIndex) return;
    setMemos((prevState) => {
      let newMemos = JSON.parse(JSON.stringify(prevState));
      const deleteElement = newMemos.splice(dragIndex, 1)[0];
      newMemos.splice(index, 0, deleteElement);
      return newMemos;
    });
    setDragIndex(index);
  }

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
                dragStart = {
                  ()=>{
                    dragStart(index);
                  }
                }
                dragEnter = {
                  ()=>{
                    dragEnter(index);
                  }
                }
                key = {index}
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
          "top":"0%",
          "height":"100%",
          "width":"25%",
          "display":"flex",
          "justifyContent":"center",
        }}
      >
        <div
        style={{
          "backgroundColor": "#CCFFFF",
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
            "backgroundColor": "#FFFF00",
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
            }}
          >
            <TaskDetailSideBarTitle
              title = "タスク一覧"
              memos = {memos}
            />
          </div>
        </div>

        </div>

      </div>
    </div>
  );
}

export default App;
