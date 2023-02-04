import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Images from "../parts/getImagePath";

const RightSideBarScreen = (props) => {
  
  const mainStyle ={
    // "backgroundColor": "antiquewhite",
    "position": "absolute",
    // "top":"10%",
    "width":"100%",
    "height":"100%",
    "fontSize":"auto",
    "display":"flex",
    // "flexDirection": 'colmun',
  }
  const mainContents = {
    // "marginLeft":"3%",
    "display":"flex",
    "justifyContent":"center",
    "verticalAlign":"middle",
    "alignItems":"center",
    "flexGrow":"1",
    // "width":"100%"
    
  }

  return (
    <div class="main" style={mainStyle}>
      <div 
        style={mainContents}
        onClick={()=>{props.toTop()}}
      >
        <img src={Images["logo_center"]} style={{"height":"100%","flexGrow":"0",}}/>
      </div>
    </div>
  );
}

export default RightSideBarScreen;
