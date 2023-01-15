import { useEffect, useState } from 'react';

import TaskScreen from "./components/screen/TaskScreen";
// import MenuBar from "./components/MenuBar"
import TaskDetailSideBarTitle from"./components/TaskDetailSideBarTitle";
import LoginForm from "./components/LoginForm";
import MainScreen from "./components/screen/MainScreen";
import DiaryScreen from "./components/screen/DiaryScreen";
import CompileScreen from "./components/screen/CompileScreen";
import ConfigScreen from "./components/screen/ConfigScreen";
import AccountScreen from "./components/screen/AccountScreen";

const App = () => {

  const [menus, setMenus] = useState([]);
  const [pageStatus, setPageStatus] = useState(["タスク管理"]);

  // 読み込み時の動作
  useEffect(() => {
    fetch('/menuTest')
    .then(res => res.json())
    .then(data => {
      setMenus(data);
    }).catch(err => {
      console.log(err);
    });
  }, [menus]);

  // メニュー選択時のコンテンツ切り替え
  useEffect(()=>{
    console.log("pageStatus:" + pageStatus);
  },[pageStatus]);

  const menuBarStyle = {
    "backgroundColor": "#FFFFFF",
    "border":"solid 2px #555555",
    "width":"100%",
    "height":"100%",
    "paddingTop":"1px",
    "paddingBottom":"1px",
    "marginTop":"1px",
    "marginBottom":"1px",
    "marginLeft":"1px",
    "marginRight":"1px",
    "textAlign":"center",
    "justifyContent":"center",
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
        {/* <p>※前日からのメッセージ欄</p> */}
        <p>千羽さんテスト版</p>
      </div>

      {/* メニューバー */}
      <div
        style={{
          "backgroundColor": "#FF9900",
          "position": "absolute",
          "top":"0%",
          "left":"50%",
          "height":"10%",
          "width":"50%",
          "display":"flex",
          "justifyContent":"center",
          "verticalAlign":"middle",
        }}
      >
        <div 
          style={
            {
              "display":"flex",
              "flexDirection": 'row',
              "width":"99%",
              "height":"auto",
              "justifyContent":"center",
              "marginTop":"auto",
              "marginBottom":"auto",
              "marginLeft":"auto",
              "marginRight":"auto",
              "verticalAlign":"middle",
            }
          }
        >
          {menus.map((menu, index) =>
            <div
              style={menuBarStyle}
              onClick={()=>setPageStatus(menu.title)}
              key = {index}
            >
              <h3>{menu.title}</h3>
            </div>
          )}
        </div>
      </div>

      {/* メイン領域 */}
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
          {/* pageStatusで表示するコンテンツを切り替え。オプションでのカスタムリンクは要相談 */}
          { pageStatus == "タスク管理" &&
            <TaskScreen/>
          } 
          { pageStatus == "top" &&
            <MainScreen/>
          }
          { pageStatus == "業務日誌" &&
            <DiaryScreen/>
          }
          { pageStatus == "集計・分析" &&
            <CompileScreen/>
          }
          { pageStatus == "設定" &&
            <ConfigScreen/>
          }
          { pageStatus == "アカウント" &&
            <AccountScreen/>
          }
        </div>
      </div>

      {/* サイドバー */}
      <div
        style={{
          "backgroundColor": "#808080",
          "position": "absolute",
          "left":"75%",
          "top":"10%",
          "height":"45%",
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
      <div
        style={{
          "backgroundColor": "#808080",
          "position": "absolute",
          "left":"75%",
          "top":"55%",
          "height":"45%",
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
                title = "メモ一覧"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
