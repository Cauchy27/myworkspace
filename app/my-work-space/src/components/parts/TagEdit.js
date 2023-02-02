import { useEffect, useState} from 'react';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

import Images from "./getImagePath";

const TagEdit = (props) => {

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
      props.taskTagEditClose();
    } else {
    }
  };

  const [taskTags, setTaskTags] = useState([]);

  // タスクタグの作成・編集
  const taskTagPost = async(data) => {
    if(!data){
      data = {
        dataArray:{
          task_tag_id:null,
          task_tag_name:"タグ",
        },
        request:"insert",
      };
    }
    else if(data.request != "search") {
      data = {
        dataArray:data,
        request:"update"
      }
    }
    console.log(data);
    console.log(JSON.stringify(data));
    await fetch('/tagPost',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      setTaskTags(res_data);
      console.log("res",res_data)
      return res_data;
    })
  }

  // タグ更新
  useEffect(() => {
    taskTagPost({
      request:"search"
    });
    taskTags.map((tag, index) =>{
      console.log(index,tag);
    });
  }, []);

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
    <div 
      style={overflowScreen}
      onClick = {
        (event)=>{closeWithClickOutSideMethod(event)}
      }
    >
      <div style={taskDetailStyle}>
        <div style={mainContents}>
          <h3>タスクタグ編集</h3>
          {
            taskTags.map((tag, index) =>
              <TextField
                  label={"タグ名"+(index+1)}
                  fullWidth
                  margin="normal"
                  // multiline
                  variant="outlined"
                  // value={tag.task_tag_name}
                  defaultValue={tag.task_tag_name}
                  placeholder="タグ名"
                  onBlur = {
                    (event) => {
                      taskTags[index].task_tag_name = event.target.value;
                      setTaskTags(taskTags);
                      console.log(taskTags);
                    }
                  }
                  key={index}
              />
            )
          }
        </div>
        <div style={subContents}>
          <Button 
            variant="contained" 
            color="primary"
            onClick = {()=>{
              taskTagPost(taskTags)
              .then(
                ()=>{
                  props.taskTagEditClose();
                }
              );
            }}
          >
            保存
          </Button>
          <Button 
            variant="contained" 
            color="inherit"
            onClick = {()=>{
              if(taskTags.length < 3){
                taskTagPost();
              }
              else{
                // console.log(taskTags.length)
              }
            }}
          >
            タグ新規作成
          </Button>
          <Button 
            variant="contained" 
            color="inherit"
            onClick = {()=>{
              props.taskTagEditClose();
            }}
          >
            保存せずに閉じる
          </Button>
        </div>
      </div>
    </div>
  );

}
export default TagEdit;