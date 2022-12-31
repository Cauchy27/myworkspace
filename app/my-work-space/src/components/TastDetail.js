import { useEffect, useState } from 'react';

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
  }

  return (
    <div style={taskDetailStyle}>
      <h3>{props.index}：{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}

export default TaskDetail;
