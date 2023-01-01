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
      // 前の状況
      let newMemos = JSON.parse(JSON.stringify(prevState));
      // 移動元のコンポーネントを削除
      const deleteElement = newMemos.splice(dragIndex, 1)[0];
      // 移動先のindexでコンポーネントを追加
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
          "position": "absolute",
          "top":"0",
          "left":"0",
          "height":"10%",
          "width":"50%",
        }}
      >
        <p>※前日からのメッセージ欄</p>
      </div>
      <div
        style={{
          "backgroundColor": "#FF9900",
          "position": "absolute",
          "top":"0%",
          "left":"50%",
          "height":"10%",
          "width":"50%",
        }}
      >
        <p>※メニュー欄</p>
      </div>

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
            "height":"90%",
            "width":"95%",
            "marginLeft":"auto",
            "marginRight":"auto",
            "marginTop":"5%",
            "marginBottom":"5%",
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
