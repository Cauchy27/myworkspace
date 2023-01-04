import { useEffect, useState } from 'react';

const ConfigScreen = (props) => {
  
  const configStyle ={
    "backgroundColor": "antiquewhite",
    "position": "relative",
    "width":"100%",
    "height":"100%",
    "fontSize":"auto",
  }

  return (
    <div class="config" style={configStyle}>
      <p>※設定 管理画面（ただいま開発中）</p>
    </div>
  );
}

export default ConfigScreen;
