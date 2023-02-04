import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

const RightTopBarScreen = (props) => {
  
  const mainStyle ={
    // "backgroundColor": "antiquewhite",
    "position": "absolute",
    // "top":"10%",
    "width":"100%",
    "height":"100%",
    "fontSize":"auto",
    // "display":"flex",
    // "flexDirection": 'colmun',
  }
  const mainContents = {
    // "marginLeft":"3%",
    "display":"flex",
    "justifyContent":"center",
    // "verticalAlign":"middle",
    "alignItems":"center",
    // "flexGrow":"1",
    "height":"100%"
    
  }
  const innerContents = {
    "marginLeft":"3%",
    "marginRight":"3%",
    "flexGrow":"1",
    // "width":"30%",
    "height":"100%",
    "alignItems":"center",
  }
  const whitwColorFont = {
    "color":"#fefffe",
  }

  return (
    <div class="main" style={mainStyle}>
      <div style={mainContents}>
        <div style={innerContents}>
          <p style={whitwColorFont}>アカウント：</p>
          <p style={whitwColorFont}>{props.email}</p>
        </div>

        <div 
          style={{
            "marginRight":"3%",
            "height":"100%",
            "alignItems":"center",
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
          }}
          onClick={()=>{props.Logout()}}
        >
          <img 
            style={{
              "height":"90%",
              "borderRadius": "50%",
              "border": "3px solid #fefffe"
            }} 
            src={props.picture}
          />
        </div>
      </div>
    </div>
  );
}

export default RightTopBarScreen;
