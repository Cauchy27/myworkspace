import { useEffect, useState } from 'react';

import TaskScreen from "./components/screen/TaskScreen";
import TaskDetailSideBarTitle from"./components/TaskDetailSideBarTitle";
import LoginForm from "./components/LoginForm";
import MainScreen from "./components/screen/MainScreen";

const App = () => {

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
          <TaskScreen/>
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
            />
          </div>
        </div>

        </div>

      </div>
    </div>
  );
}

export default App;
