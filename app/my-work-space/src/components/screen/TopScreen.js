import { useEffect, useState } from 'react';

const MainScreen = (props) => {
  
  const mainStyle ={
    "backgroundColor": props.subColor,
    "position": "absolute",
    "top":"10%",
    "left":`${props.taskBarWidth}%`,
    "width":`${100 - props.taskBarWidth}%`,
    "height":"90%",
    "fontSize":"auto",
  }
  const mainContents = {
    "margin":"10%",
  }

  return (
    <div class="main" style={mainStyle}>
      <div style={mainContents}>
        <p>ようこそ、{props.name}さん</p>
        <div><img src={props.picture}/></div>
      </div>
    </div>
  );
}

export default MainScreen;
