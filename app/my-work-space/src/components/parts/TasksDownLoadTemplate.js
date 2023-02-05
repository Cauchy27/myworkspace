import { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Images from "./getImagePath";

// Googleログイン
import {UseDbToken} from "./LoginCheck";

const TasksDownLoadTemplate = (props) => {

  const today = new Date();
  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt,add_d = 0) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + (dt.getDate()+ add_d)).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  const [output, setOutput] = useState();
  const [outerTagStart, setOuterTagStart] = useState(props.outputConfig.outer_tag_start);
  const [outerTagEnd, setOuterTagEnd] = useState(props.outputConfig.outer_tag_end);
  const [title, setTitle] = useState(props.outputConfig.title);
  const [headerToday, setHeaderToday] = useState(props.outputConfig.header_today);
  const [headerTomorrow, setHeaderTomorrow] = useState(props.outputConfig.header_tomorrow);
  const [indent, setIndent] = useState(props.outputConfig.indent);
  const [delimiter, setDelimiter] = useState(props.outputConfig.delimiter);
  const [dateChecked, setDateChecked] = useState(false);
  const [progressChecked, setProgressChecked] = useState(false);


  const closeWithClickOutSideMethod = (e) => {
    // console.log("e.target", e.target);
    // console.log("e.currentTarget", e.currentTarget);
    if (e.target === e.currentTarget) {
      //メニューの外側をクリックしたときだけモーダルを閉じる
      props.close();
    } else {
    }
  }

  const outputConfigPost = async(request) => {
    const token = await UseDbToken();
    let data = {
      token:token,
      request:request,
    };
    if(request == "update"){
      data = Object.assign(
        data,
        {
          dataArray:{
            output_config_id:props.outputConfig.output_config_id,
            outer_tag_start:outerTagStart,
            outer_tag_end:outerTagEnd,
            title:title,
            header_today:headerToday,
            header_tomorrow:headerTomorrow,
            indent:indent,
            delimiter:delimiter,
            date_checked:dateChecked,
            progress_checked:progressChecked,
          }
        }
      )
    }
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('/outputConfigPost',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      console.log("test",res_data)
    })
  }

  // 読み込み時
  useEffect(() => {
    if(props.outputConfig.date_checked == 1){
      setDateChecked(true);
    }
    else{
      setDateChecked(false);
    }

    if(props.outputConfig.progress_checked == 1){
      setProgressChecked(true);
    }
    else{
      setProgressChecked(false);
    }
    console.log(props.outputConfig);
  },[]);

  // 出力更新
  useEffect(() => {
    let template = "";
    if(outerTagStart != ""){
      template += outerTagStart + "\n";
    }
    if(title != ""){
      template += title + "\n";
    }
    if(headerToday != "" || dateChecked != ""){
      template += "【";
      template += headerToday ;
      if(dateChecked == true){
        template += "：" + formatDate(today);
      }
      template += "】\n";
    }

    template += indent + "[タスク名１]";
    if(progressChecked == true){
      template += "：" + "30" + "%";
    }
    template += "\n";

    template += indent + "[タスク名２]";
    if(progressChecked == true){
      template += "：" + "60" + "%";
    }
    template += "\n";

    template += indent + "[タスク名３]";
    if(progressChecked == true){
      template += "：" + "100" + "%";
    }
    template += "\n";

    if(delimiter != ""){
      template += delimiter;
    }
    template += "\n";

    if(headerTomorrow != "" || dateChecked != ""){
      template += "【";
      template += headerTomorrow ;
      if(dateChecked == true){
        template += "：" + formatDate(today,1);
      }
      template += "】\n";
    }

    template += indent + "[タスク名１]\n";
    template += indent + "[タスク名２]\n";
    template += indent + "[タスク名４]\n";
    template += indent + "[タスク名５]\n";

    if(outerTagEnd != ""){
      template += outerTagEnd;
    }

    setOutput(template);
  }, [outerTagStart,title,headerToday,dateChecked,indent,progressChecked,delimiter,headerTomorrow,outerTagEnd]);

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
    "marginBottom":"3%",
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
          <h3>報告書 出力設定</h3>
          <TextField
              label="外部タグ：start"
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="[info] など"
              // value = {outerTagStart}
              defaultValue={outerTagStart}
              onBlur = {
                (event) => {
                  setOuterTagStart(event.target.value)
                }
              }
          />
          <TextField
              label="外部タグ：end"
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="[/info] など"
              defaultValue={outerTagEnd}
              onBlur = {
                (event) => {
                  setOuterTagEnd(event.target.value)
                }
              }
          />
          <TextField
              label="タイトル"
              // fullWidth
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="[title]スクラム共有[/title] など"
              defaultValue={title}
              onBlur = {
                (event) => {
                  setTitle(event.target.value)
                }
              }
          />
          <TextField
              label="中央区切り"
              // fullWidth
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="[hr] など"
              defaultValue={delimiter}
              onBlur = {
                (event) => {
                  setDelimiter(event.target.value)
                }
              }
          />
          <TextField
              label="今回"
              // fullWidth
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="今回 など"
              defaultValue={headerToday}
              onBlur = {
                (event) => {
                  setHeaderToday(event.target.value)
                }
              }
          />
          <TextField
              label="次回"
              // fullWidth
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="次回 など"
              defaultValue={headerTomorrow}
              onBlur = {
                (event) => {
                  setHeaderTomorrow(event.target.value)
                }
              }
          />
          <TextField
              label="インデント"
              margin="normal"
              minRows={1}
              multiline
              variant="outlined"
              placeholder="・ など"
              defaultValue={indent}
              onBlur = {
                (event) => {
                  setIndent(event.target.value)
                }
              }
          />
          <div
            style = {{
              "display":"flex",
              "flexDirection": "column",
              "alignItems":"center",
              "justifyContent":"center",
            }}
          >
            <FormControlLabel
              label="日付を表示"
              control={
                <Checkbox
                  checked = {dateChecked}
                  onChange = {
                    (event) => {
                      setDateChecked(event.target.checked);
                    }
                  }
                />
              }
            />
            <FormControlLabel
              label="進捗を表示"
              control={
                <Checkbox
                  checked = {progressChecked}
                  onChange = {
                    (event) => {
                      setProgressChecked(event.target.checked);
                    }
                  }
                />
              }
            />
          </div>
        </div>
        <div style={subContents}>
          <Button 
            style={innerContents}
            variant="contained" 
            color="primary"
            onClick = {()=>{
              outputConfigPost("update");
              props.close();
            }}
          >
            保存
          </Button>
          <Button 
            style={innerContents}
            variant="contained" 
            color="inherit"
            onClick = {()=>{
              props.close();
            }}
          >
            保存せずに閉じる
          </Button>
          <TextField
              label="出力例"
              fullWidth
              margin="normal"
              minRows={15}
              multiline
              variant="outlined"
              value={output}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksDownLoadTemplate ;