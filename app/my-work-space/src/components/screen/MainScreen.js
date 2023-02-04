import { useEffect, useState } from 'react';

const MainScreen = (props) => {
  
  const mainStyle ={
    "backgroundColor": "antiquewhite",
    "position": "absolute",
    "top":"10%",
    "width":"100%",
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
