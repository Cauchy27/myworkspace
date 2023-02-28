import { useEffect, useState } from 'react';

import {Button,TextField,Checkbox,FormControlLabel,Select,MenuItem,Alert,Snackbar} from "@material-ui/core";

import Images from "../parts/getImagePath";

// Googleログイン
import {UseDbToken} from "./LoginCheck";

const TasksDownLoad = (props) => {

  const today = new Date();
  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt,add_d = 0) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + (dt.getDate()+ add_d)).slice(-2);

    if(add_d > 0){

      // 次月へ
      if(m == "02"){
        if(leapDayChecker(y)){
          d = Number(d) - 29;
          if(d < 10){
            d = "0"+d;
          }
          m = Number(m) + 1 ;
          if(m < 10){
            m = "0"+m;
          }
        }
        else{
          d = Number(d) - 28;
          if(d < 10){
            d = "0"+d;
          }
          m = Number(m) + 1 ;
          if(m < 10){
            m = "0"+m;
          }
        }
      }
      else{
        d = Number(d) - 30;
        if(m == "01" || m == "03" || m == "05" || m == "07" || m == "08" || m == "10" || m == "12" ){
          d = d -1;
        }
        if(d < 10){
          d = "0"+d;
        }
        m = Number(m) + 1 ;
        if(m < 10){
          m = "0"+m;
        }
      }
  
      // 次年へ
      if(m == "13"){
        y = Number(y) + 1;
        y = y.toFixed();
      }
    }

    return (y + '-' + m + '-' + d);
  }

  // 閏年判定
  const leapDayChecker = (year) => {
    if(year % 100 === 0 && year % 400 !== 0){
      return false;
    }
    if(year % 4 === 0){
      return true;
    }
    return false;
  }

  const [output, setOutput] = useState("");
  const [nextDay, setNextDay] = useState(formatDate(today,1));
  const [nextTasks, setNextTasks] = useState([]);
  const [tagChecked, setTagChecked] = useState(true);
  const [message, setMessage] = useState("");

  const closeWithClickOutSideMethod = (e) => {
    // console.log("e.target", e.target);
    // console.log("e.currentTarget", e.currentTarget);
    if (e.target === e.currentTarget) {
      //メニューの外側をクリックしたときだけモーダルを閉じる
      props.close();
    } 
    else {
      // 
    }
  };

  const afterDays = [1,2,3,4,5,6,7,8,9,10];

  const taskSearch = async(search_date_to) => {
    const token = await UseDbToken();
    console.log("token",token);
    const data = {
      task_date_to:search_date_to,
      task_tag_id:props.searchTag,
      token:token,
      request:"next_tasks",
    };
    console.log(JSON.stringify(data));
    let response = [];
    await fetch('/taskQuerySearch',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      // setNextTasks(res_data)
      console.log(res_data)
      response = res_data;
    });
    return response;
  }

  const todayTaskSearch = async() => {
    const token = await UseDbToken();
    const data = {
      task_date:formatDate(today),
      task_tag_id:props.searchTag,
      token:token,
      request:"today_tasks",
    };
    let response = [];
    await fetch('/taskQuerySearch',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      console.log("today",res_data)
      response = res_data;
    });
    return response;
  }

  // 出力更新
  useEffect(() => {
    setOutput("test");
    taskSearch(nextDay)
    .then((next) => {
      todayTaskSearch()
      .then((today_tasks) => {
        // console.log("tasks",props.tasks);
        let template = "";
        if(props.outputConfig.outer_tag_start != ""){
          template += props.outputConfig.outer_tag_start + "\n";
        }
        if(props.outputConfig.title != ""){
          template += props.outputConfig.title + "\n";
        }
        if(props.outputConfig.header_today != "" || props.outputConfig.date_checked != ""){
          template += "【";
          template += props.outputConfig.header_today ;
          if(props.outputConfig.date_checked == 1){
            template += "：" + formatDate(today);
          }
          template += "】\n";
        }
        let tag_name = "undefined_init";
        today_tasks.map((task, index) =>{
          if(tagChecked){
            if(tag_name != task.task_tag_name){
              if(tag_name != "undefined_init"){
                template += "\n";
              }
              if(task.task_tag_name){
                template += "< " + task.task_tag_name + " >\n";
                tag_name = task.task_tag_name;
              }
              else{
                tag_name = task.task_tag_name;
              }
            }
          }
          template += props.outputConfig.indent + task.task_name;
          if(props.outputConfig.progress_checked == 1){
            if(task.task_point != null){
              template += "：" + task.task_point + "%";
            }
            else{
              template += "：0%";
            }
          }
          template += "\n";
        });
    
        if(props.outputConfig.delimiter != ""){
          template += props.outputConfig.delimiter;
        }
        template += "\n";
    
        if(props.outputConfig.header_tomorrow != "" || props.outputConfig.date_checked != ""){
          template += "【";
          template += props.outputConfig.header_tomorrow ;
          if(props.outputConfig.date_checked == 1){
            template += "：" + nextDay;
          }
          template += "】\n";
        }
    
        tag_name = "undefined_init";
        next.map((task, index) =>{
          if(tagChecked){
            if(tag_name != task.task_tag_name){
              if(tag_name != "undefined_init"){
                template += "\n";
              }
              if(task.task_tag_name){
                template += "< " + task.task_tag_name + " >\n";
                tag_name = task.task_tag_name;
              }
              else{
                tag_name = task.task_tag_name;
              }
            }
          }
          switch(task.task_priority){
            case 1 :
              template += props.outputConfig.indent + " ◎ " +task.task_name + "\n";
              break;
            
            case 2 :
              template += props.outputConfig.indent + " ○ " + task.task_name + "\n";
              break;
  
            case 3 :
              template += props.outputConfig.indent + " △ " + task.task_name + "\n";
              break;
          
            default:
              template += props.outputConfig.indent + task.task_name + "\n";
              break;
          }
        });
    
        if(props.outputConfig.outer_tag_end != ""){
          template += props.outputConfig.outer_tag_end;
        }
    
        setOutput(template);

      });
    });
  }, [nextDay,tagChecked]);

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
    "flexGrow":"1",
    "overflow":"scroll",
  }
  const subContents = {
    "width":"40%",
    // "border": "2px solid #000000",
    "padding":"3%",
    "display":"flex",
    "flexDirection": "column",
  }
  const innerContents = {
    "marginBottom":"10%",
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
          <h3>報告書 出力</h3>
          <TextField
              label="出力内容"
              fullWidth
              margin="normal"
              minRows={15}
              multiline
              variant="outlined"
              defaultValue={output}
              onBlur = {
                (event) => {
                  setOutput(event.target.value)
                }
              }
          />
        </div>
        <div style={subContents}>
          <Button 
            style={innerContents}
            variant="contained" 
            color="inherit"
            onClick = {()=>{
              props.close();
            }}
          >
            閉じる
          </Button>
          <Select
            style={innerContents}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={1}
            label="次回出勤日"
            onChange={
              (event)=>{
                setNextDay(formatDate(today,event.target.value));
              }
            }
          >
            {
              afterDays.map((afterDay,index)=>
                <MenuItem 
                  value={afterDay}
                  key={index}
                >
                  次回出勤：{afterDay}日後 </MenuItem>
              )
            }
          </Select>
          <FormControlLabel
              label="タグでタスクを整理"
              style={innerContents}
              control={
                <Checkbox
                  checked = {tagChecked}
                  onChange = {
                    (event) => {
                      setTagChecked(event.target.checked);
                    }
                  }
                />
              }
            />
          <Button 
            style={innerContents}
            variant="contained" 
            color="primary"
            onClick = {()=>{
              global.navigator.clipboard.writeText(output);
              setMessage("クリップボードにコピーされました！本日もお疲れ様です！")
              setTimeout(()=>{setMessage("")},10000)
            }}
          >
            内容をクリップボードにコピー
          </Button>
          <p style={innerContents}><strong>{message}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default TasksDownLoad;