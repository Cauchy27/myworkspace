import { useEffect, useState } from 'react';

import Images from "../getImagePath";

const MenuBar = (props) => {

  let [menus, setMenus] = useState([]);

  const [page, setPage] = useState([props.pageStatus]);

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

  // ページ選択
  useEffect(() => {
    props.setPageStatus(page);
    console.log(page)
  }, [page]);

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
    "justifyContent": "center",
    "textAlign":"center",
    "justifyContent":"center",
  }

  const iconStyle = {
    "height":"20px",
    "marginLeft":"5px",
  }

  const clickAction = (title) => {
    // 
  }

  return (
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
          onClick={()=>setPage(menu.title)}
          key = {index}
        >
          <h3>{menu.title}</h3>
        </div>
      )}
    </div>
  );
}

export default MenuBar;
