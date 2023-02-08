import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Images from "../parts/getImagePath";

const MainTopBarScreen = (props) => {
  
  const mainStyle ={
    "position": "absolute",
    "width":"100%",
    "height":"100%",
    "fontSize":"auto",
    "display":"flex",
    "backgroundColor":props.mainColor,
  }
  const mainContents = {
    "display":"flex",
    "justifyContent":"center",
    "verticalAlign":"middle",
    "alignItems":"center",
    "flexGrow":"1",
  }

  return (
    <div class="main" style={mainStyle}>
      <div 
        style={mainContents}
        onClick={()=>{props.toTop()}}
      >
        <img src={Images["logo_center_dark"]} style={{"height":"100%","flexGrow":"0",}}/>
      </div>
    </div>
  );
}

export default MainTopBarScreen;
