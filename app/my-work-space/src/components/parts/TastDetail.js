import { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import { Box, CircularProgress } from '@material-ui/core';

import Images from "../parts/getImagePath";

const TaskDetail = (props) => {

  const [point, setPoint] = useState(props.task.task_point);

  // フォームの内容を更新するメソッドをここに
  const taskCompletePost = async(data) => {
    if(!data){
      data = {
        task_id:props.task.task_id,
        team_id:props.task.team_id,
        user_id:props.task.user_id,
        task_name:props.task.task_name,
        position_index:props.task.position_index,
        task_date:props.task.task_date,
        task_detail:props.task.task_detail,
        task_point:100
      }
    }
    console.log(data);
    console.log(JSON.stringify(data));
    await fetch('/taskQueryPostTest',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      // setTasks(res_data);
      console.log(res_data)
      return res_data;
    })
  }
  
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
    "flexDirection": "row"
  }
  const subButton = {
    "marginTop":"3%",
    "marginBottom":"3%"
  }
  const statusContents = {
    "width":"25%",
    "display": "flex",
    "flexDirection":"column",
    "justifyContent":"center",
  }
  const mainContents = {
    "width":"75%",
    "flexGrow":"1",
    "whiteSpace": 'pre-line'
  }
  const subGraph = {
    "height":"80px"
  }
  const CircularInternalContent = {
    "position": "relative",
    "textAlign":"center",
    "justifyContent":"center",
    "width":"100%",
    "height":"100%"
  }
  const ProbabilitySuffix = {
    "marginBottom": "4px",
  }
  const CircularBackground = {
    "color": "#bfbfbf",
    // "width":"90%",
    "marginTop":"1%",
    "marginLeft":"auto",
    // "margin": "auto",
    "position": "absolute",
  }
  const CircularBar = {
    "position": "absolute",
    // "top":"-100",
    // "width":"90%",
    "marginTop":"1%",
  }
  const value = 80;

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
        <h3>{props.task.task_name} </h3>
        <p>{props.task.task_detail}</p>
      </div>
      <div style={statusContents}>
        <Button 
          style={subButton} 
          variant="contained" 
          color="primary"
          onClick = {()=>{props.taskEditOn()}}
        >
          編集
        </Button>
        <Button 
          style={subButton}  
          variant="contained" 
          color={props.deleteButtonColor}
          onClick = {()=>{props.taskDelete()}}
        >
          削除
        </Button>
        <Button 
          style={subButton} 
          variant="contained" 
          color="primary"
          onClick = {()=>{props.taskCompletePost()}}
        >
          完了
        </Button>

        {/* 後でここはうまいことする */}
        <div style={subGraph} >
          {/* 背景用のCircularProgress */}
          <CircularProgress 
            variant="determinate" 
            size={70} 
            value={100} 
            style={CircularBackground}
          />
          {/* バロメーター用のCircularProgress */}
          <CircularProgress
            variant="determinate" 
            size={70} 
            value={props.task.task_point} 
            style={CircularBar}
          />
          {/* ここは後で */}
          <div style={CircularInternalContent}>
            {/* <Typography 
              variant="h5">{value}
            </Typography>
            <Typography 
              variant="caption"
              style={ProbabilitySuffix}
            >
              %
             </Typography> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;