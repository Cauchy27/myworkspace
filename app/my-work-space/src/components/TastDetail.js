import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

const TaskDetail = (props) => {
  
  const taskDetailStyle = {
    "backgroundColor": "#FFFFFF",
    "paddingTop":"1%",
    "paddingBottom":"1%",
    "paddingLeft":"2%",
    "paddingRight":"2%",
    "border":"solid 3px #555555",
    "margin":"1%",
    "width":"40%",
    "height":"30%",
    "display":"flex",
    "flex-direction": "row"
  }
  const subButton = {
    "marginTop":"3%",
    "marginBottom":"3%"
  }
  const statusContents = {
    "width":"25%",
    // "border": "2px solid #000000",
    // "padding":"3%",
    "justifyContent":"center",
  }
  const mainContents = {
    "width":"75%",
    "flex-grow":"1"
  }

  return (
    <div 
      style={taskDetailStyle}
      id={props.index}
      draggable={true}
      onDragStart={() => props.dragStart()}
      onDragEnter={()=>props.dragEnter()}
      onDragOver={(event) => event.preventDefault()}
    >
      <div style={mainContents}>
        <h3>{props.index}：{props.title} </h3>
        <p>{props.text}</p>
      </div>
      <div style={statusContents}>
        <Button style={subButton} variant="contained" color="primary">
          編集
        </Button>
        <Button style={subButton}  variant="contained" color="primary">
          完了
        </Button>
        <div style={subButton} >
          [達成率]
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
