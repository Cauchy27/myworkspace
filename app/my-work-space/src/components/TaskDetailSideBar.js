import { useEffect, useState } from 'react';

import Images from "./getImagePath";

const TaskDetailSideBar = (props) => {
  
  const taskDetailSideStyle = {
    "backgroundColor": "#FFFFFF",
    // "paddingTop":"3%",
    // "paddingBottom":"3%",
    // "paddingLeft":"2%",
    // "paddingRight":"2%",
    "border":"solid 2px #555555",
    "width":"99%",
    // "height":"20%",
    // "marginBottom":"2px",
    "marginLeft":"auto",
    "marginRight":"auto",
    "justifyContent": "center",
    "textAlign":"center"
  }

  const iconStyle = {
    "height":"20px",
    "marginLeft":"5px",
  }

  let displayStatus = props.displayStatus;

  const clickAction = () =>{
    // ピン状態の切り替え
    if(pin == "pin1"){
      setPin("pin2");
    }
    else{
      setPin("pin1");
    }
  }

  // ピンの解除
  const [pin, setPin] = useState(["pin1"]);

  return (
    <div 
      style={taskDetailSideStyle}
      id={props.index} 
    >
      <h3>
        {props.index}：{props.title}
        <img src={Images[pin]}
          style={iconStyle}
          onClick ={
            ()=>{
              clickAction();
            }
          }
        ></img>
      </h3>
      {((!displayStatus && pin == "pin2") || displayStatus ) &&
        <p>{props.text}</p>
      }
    </div>
  );
}

export default TaskDetailSideBar;
