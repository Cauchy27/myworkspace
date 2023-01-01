import { useEffect, useState } from 'react';

const MainScreen = (props) => {
  
  const mainStyle ={
    "backgroundColor": "antiquewhite",
    "position": "absolute",
  }

  return (
    <div class="main" style={mainStyle}>
      <p>※メインスクリーン</p>
    </div>
  );
}

export default MainScreen;
