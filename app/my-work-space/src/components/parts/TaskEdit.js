import { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

import Images from "./getImagePath";

const TaskEdit = (props) => {

  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  const [name ,setName] = useState([props.task.task_name]);
  const [detail, setDetail] = useState([props.task.task_detail]);
  const [taskDate, setTaskDate] = useState([props.task.task_date]);
  const [point, setPoint] = useState([props.task.task_point]);

  // フォームの内容を更新するメソッドをここに
  const taskEditPost = async(data) => {
    if(!data){
      data = {
        task_id:props.task.task_id,
        team_id:props.task.team_id,
        user_id:props.task.user_id,
        task_name:name,
        position_index:props.task.position_index,
        task_date:taskDate,
        task_detail:detail,
        task_point:point
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

  const overflowScreen = {
    "position":"fixed",
    "top":"10%",
    "left":"0",
    "height":"90%",
    "width":"75%",
    "backgroundColor":"rgba(0,0,0,0.5)",
    "display":"flex",
    "alignItems":"center",
    "justifyContent":"center",
  }
  const taskDetailStyle = {
    "backgroundColor": "#FFFFFF",
    "paddingTop":"1%",
    "paddingBottom":"1%",
    "paddingLeft":"2%",
    "paddingRight":"2%",
    "border":"solid 3px #555555",
    "margin":"1%",
    "width":"80%",
    "height":"60%",
    "display":"flex",
    "flexDirection": "row"
  }
  const mainContents = {
    "width":"75%",
    "flexGrow":"1"
  }
  const subContents = {
    "width":"40%",
    // "border": "2px solid #000000",
    "padding":"3%",
    "display":"flex",
    "flexDirection": "column",
  }

  return (
    <div style={overflowScreen}>
      <div style={taskDetailStyle}>
        <div style={mainContents}>
          <h3><TextField
              // style = {searchDateForm}
              type="text"
              defaultValue={props.task.task_name}
              // value = {props.task.task_point}
              margin="normal"
              // id="task_tag_point"
              label="タスク名"
              // name="task_tag_point"
              onChange = {
                (event) => {
                  setName(event.target.value)
                }
              }
          /></h3>
          <TextField
              label="タスク内容"
              fullWidth
              margin="normal"
              minRows={10}
              multiline
              variant="outlined"
              defaultValue={props.task.task_detail}
              placeholder="タスクの詳細を記載してください。"
              onChange = {
                (event) => {
                  setDetail(event.target.value)
                }
              }
          />
        </div>
        <div style={subContents}>
          <Button 
            variant="contained" 
            color="primary"
            onClick = {()=>{
              taskEditPost()
              .then(
                ()=>{
                  props.taskEditClose();
                }
              );
            }}
          >
            保存
          </Button>
          <TextField
              type="date"
              // defaultValue={taskDate}
              value = {taskDate}
              margin="normal"
              label="タスク日付"
              onChange = {
                (event) => {
                  setTaskDate(event.target.value);
                  console.log(taskDate)
                }
              }
          />
          <TextField
              type="number"
              // defaultValue={props.task.task_point}
              value = {point}
              margin="normal"
              // id="task_tag_point"
              label="進捗 [％]"
              // name="task_tag_point"
              onChange = {
                (event) => {
                  setPoint(event.target.value)
                }
              }
          />
        </div>
      </div>
    </div>
  );

}
export default TaskEdit;