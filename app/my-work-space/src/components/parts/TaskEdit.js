import { useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import {TextField, Select, MenuItem} from "@material-ui/core";

import Images from "./getImagePath";

// Googleログイン
import {UseDbToken} from "./LoginCheck";

const TaskEdit = (props) => {

  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  const closeWithClickOutSideMethod = (e) => {
    // console.log("e.target", e.target);
    // console.log("e.currentTarget", e.currentTarget);
    if (e.target === e.currentTarget) {
      //メニューの外側をクリックしたときだけモーダルを閉じる
      props.taskEditClose();
    } else {
    }
  };

  const [name ,setName] = useState(props.task.task_name);
  const [detail, setDetail] = useState(props.task.task_detail);
  const [taskDate, setTaskDate] = useState(props.task.task_date);
  const [point, setPoint] = useState(props.task.task_point);
  const [tag, setTag] = useState(props.task.task_tag_id);
  const [priority, setPriority] = useState(props.task.task_priority);

  const priorityArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  // フォームの内容を更新するメソッドをここに
  const taskEditPost = async(data) => {
    if(!data){
      if(tag == 0){setTag(null)}
      const token = await UseDbToken();
      console.log("priority",priority);
      data = {
        token:token,
        task_id:props.task.task_id,
        team_id:props.task.team_id,
        task_name:name,
        position_index:props.task.position_index,
        task_date:taskDate,
        task_detail:detail,
        task_point:point,
        task_tag_id:tag,
        task_priority:priority,
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
    "left":`${props.taskBarWidth}%`,
    "height":"90%",
    "width":`${100 - props.taskBarWidth}%`,
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
    <div 
      style={overflowScreen}
      onClick = {
        (event)=>{closeWithClickOutSideMethod(event)}
      }
    >
      <div style={taskDetailStyle}>
        <div style={mainContents}>
          <h3><TextField
              fullWidth
              type="text"
              defaultValue={props.task.task_name}
              margin="normal"
              label="タスク名"
              onBlur = {
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
              onBlur = {
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tag != null ? tag : 0}
            label="タグ"
            onChange={(event)=>{setTag(event.target.value)}}
          >
            <MenuItem 
              value={0}
            >
              タグなし
            </MenuItem>
            {
              props.taskTags.map((tag, index) =>
                <MenuItem 
                  value={tag.task_tag_id}
                  key={index}
                >
                  {tag.task_tag_name}
                </MenuItem>
              )
            }
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority != null ? priority : 100}
            label="優先度"
            onChange={(event)=>{setPriority(event.target.value)}}
          >
            {
              priorityArray.map((priority, index) =>
                <MenuItem 
                  value={priority}
                  key={index}
                >
                  {priority}
                </MenuItem>
              )
            }
            <MenuItem 
                  value={100}
                  key={100}
                >
                  100
            </MenuItem>
          </Select>
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
          <Button 
            variant="contained" 
            color="inherit"
            onClick = {()=>{
              props.taskEditClose();
            }}
          >
            保存せずに閉じる
          </Button>
        </div>
      </div>
    </div>
  );

}
export default TaskEdit;