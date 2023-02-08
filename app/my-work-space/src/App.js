import { useEffect, useState } from 'react';

import TaskScreen from "./components/screen/TaskScreen";
// import MenuBar from "./components/MenuBar"
import TaskDetailSideBarTitle from"./components/parts/TaskDetailSideBarTitle";
import TopScreen from "./components/screen/TopScreen";
import DiaryScreen from "./components/screen/DiaryScreen";
import CompileScreen from "./components/screen/CompileScreen";
import ConfigScreen from "./components/screen/ConfigScreen";
import AccountScreen from "./components/screen/AccountScreen";
import RightTopBarScreen from "./components/screen/RightTopBarScreen";
import MainTopBarScreen from "./components/screen/MainTopBarScreen";
import { useWindowDimensions } from './components/parts/useWindowDimensions';

// Googleログイン
import {LoginCheck,RegistToken,Logout,useDbToken} from "./components/parts/LoginCheck";

import Button from '@material-ui/core/Button';
import {DarkTheme,SetDarkTheme} from "./components/parts/Theme";

const App = () => {

  const [menus, setMenus] = useState([]);
  const [pageStatus, setPageStatus] = useState(["top"]);
  const [taskBarWidth, setTaskBarWidth] = useState(20);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState([]);
  const [picture, setPicture] = useState("");

  const [mainColor,setMainColor] = useState(DarkTheme.mainColor);
  const [baseColor,setBaseColor] = useState(DarkTheme.baseColor);
  const [accentColor,setAccentColor] = useState(DarkTheme.accentColor);

  // 読み込み時の動作
  useEffect(() => {

    setTimeout(()=>{
      // リダイレクトの場合
      if (window.location.pathname === "/auth_code") {
        RegistToken();
      }
      else{
        // ログイン
        LoginCheck()
        .then((res)=>{
          console.log("res",res);
          setUser(res.name);
          setEmail(res.email);
          setPicture(res.picture);
        });
      }
    },500)
  }, [user]);

  // メニュー読み込み
  useEffect(() => {
    // メニュー読み込み
    getMenus();
  }, [menus]);

  const { width, height } = useWindowDimensions();

  // 画面リサイズ時に表示モード切り替え
  useEffect(() => {
    console.log(width);
    if(width>900){
      setTaskBarWidth(25);
    }
    else{
      setTaskBarWidth(0);
    }
  }, [width]);

  // メニュー取得
  const getMenus = () => {
    fetch('/menuTest')
    .then(res => res.json())
    .then(data => {
      setMenus(data);
    }).catch(err => {
      console.log(err);
    });
  }
  
  // メニュー選択時のコンテンツ切り替え
  useEffect(()=>{
    console.log("pageStatus:" + pageStatus);
  },[pageStatus]);

  const menuBarStyle = {
    "backgroundColor": "#FFFFFF",
    "border":"2px solid #acacac",
    // "paddingTop":"1px",
    // "paddingBottom":"1px",
    // "marginTop":"1px",
    // "marginBottom":"1px",
    "marginLeft":"3%",
    "marginRight":"3%",
    "textAlign":"center",
    "flexGrow":"1",
  }

  return (
    <div
      style={{
        "backgroundColor": mainColor,
        "position": "absolute",
        "height":"100%",
        "width":"100%",
      }}
    >
      <div
        style={{
          "backgroundColor": mainColor,
          "position": "absolute",
          "top":"0",
          "left":"75%",
          "height":"10%",
          "width":"25%",
        }}
      >
        <RightTopBarScreen
          email={email}
          picture={picture}
          Logout={()=>{Logout()}}  
          mainColor={mainColor}
          baseColor={baseColor}
          accentColor={accentColor}   
        />
      </div>
      <div
        style={{
          "backgroundColor": mainColor,
          "position": "absolute",
          "top":"0",
          "left":"25%",
          "height":"10%",
          "width":"50%",
        }}
      >
        <MainTopBarScreen
          toTop={()=>{setPageStatus(["top"])}}  
          mainColor={mainColor}
          baseColor={baseColor}
          accentColor={accentColor}  
        />
      </div>

      {/* メニューバー */}
      <div
        style={{
          "backgroundColor": mainColor,
          "position": "absolute",
          "top":"0%",
          "left":"0%",
          "height":"10%",
          "width":"25%",
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
              "width":"100%",
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
            menu.menu_active == 1 &&
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
          "backgroundColor": baseColor,
          "position": "absolute",
          "top":"10%",
          "left":`${taskBarWidth}%`,
          "height":"90%",
          "width":`${100 - taskBarWidth}%`,
          "display":"flex",
          "justifyContent":"center",
          "alignItems":"center",
        }}
      >
        <div
          style={{
            "backgroundColor": baseColor,
            // "border": `2px solid ${accentColor}`,
            "position": "relative",
            "height":"100%",
            "width":"100%",
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
            <TaskScreen
              taskBarWidth={taskBarWidth}
              mainColor={mainColor}
              baseColor={baseColor}
              accentColor={accentColor}
            />
          } 
          { pageStatus == "業務日誌" &&
            <DiaryScreen
              taskBarWidth={taskBarWidth}
              mainColor={mainColor}
              baseColor={baseColor}
              accentColor={accentColor}
            />
          }
          { pageStatus == "集計・分析" &&
            <CompileScreen
              taskBarWidth={taskBarWidth}
              mainColor={mainColor}
              baseColor={baseColor}
              accentColor={accentColor}
            />
          }
          { pageStatus == "設定" &&
            <ConfigScreen
              taskBarWidth={taskBarWidth}
              mainColor={mainColor}
              baseColor={baseColor}
              accentColor={accentColor}
            />
          }
          { pageStatus == "アカウント" &&
            <AccountScreen
              taskBarWidth={taskBarWidth}
              mainColor={mainColor}
              baseColor={baseColor}
              accentColor={accentColor}
            />
          }
        </div>
      </div>

      {/* サイドバー */}
      <div
        style={{
          "backgroundColor": mainColor,
          "position": "absolute",
          "left":`0%`,
          "top":"10%",
          "height":"90%",
          "width":`${taskBarWidth}%`,
          "display":"flex",
          "flexDirection": "column",
        }}
      >
        <div
        style={{
          "backgroundColor": mainColor,
          "position": "relative",
          "height":"100%",//一旦メモを非表示にするので100
          "width":"100%",
          "marginLeft":"auto",
          "marginRight":"auto",
          "marginTop":"auto",
          "marginBottom":"auto",
          "flexGrow":"1",
        }}
        >
          {
            pageStatus != "top" &&
              <TaskDetailSideBarTitle
                title = "タスク一覧"
                mainColor={mainColor}
                baseColor={baseColor}
                accentColor={accentColor}
              />
          }
        </div>
        {/* <div
          style={{
            "backgroundColor": "#808080",
            "position": "relative",
            // "left":"75%",
            // "top":"55%",
            "height":"50%",
            "width":"100%",
            "display":"flex",
            "flexGrow":"1",
          }}
        >
          <TaskDetailSideBarTitle
            title = "メモ一覧"
          />
        </div> */}
      </div>
      { pageStatus == "top" &&
            <TopScreen
              name={user}
              picture={picture}
              mainColor={mainColor}
              baseColor={baseColor}
              accentColor={accentColor}
              taskBarWidth={taskBarWidth}
            />
          }
    </div>
  );
}

export default App;
