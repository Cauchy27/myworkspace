import { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";

import TaskDetail from "../parts/TastDetail";
import Images from "../parts/getImagePath";
import TaskEdit from "../parts/TaskEdit";

const TaskScreen = (props) => {

  const today = new Date();
  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState();
  const [date , setDate] = useState(formatDate(today));

  const [deleteLock, setDeleteLock] = useState("無効");
  const [deleteButtonColor, setDeleteButtonColor] = useState("inherit");

  const [dragIndex, setDragIndex] = useState(null);

  // 削除ロック切り替え
  const changeDeleteLock = () => {
    if(deleteLock === "無効"){
          setDeleteLock("有効");
          setDeleteButtonColor("secondary");
    }
    else{
      setDeleteLock("無効");
      setDeleteButtonColor("inherit");
    }
    console.log(deleteLock);
  }

  const taskPost = (data) => {
    if(!data){
      // ここの改善は後で
      let tasks_position_index = tasks.map((value)=>{
        return value.position_index;
      });
      console.log(tasks_position_index);
      data = {
        task_id:null,
        team_id:null,
        task_name:"",
        position_index:Math.max.apply(null, tasks_position_index),
        task_date:null,
        task_detail:"",
        task_point:10,
      };
    }
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('/taskQueryPostTest',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      setTasks(res_data);
      console.log(res_data)
      return res_data;
    })
  }

  // フォームの内容を更新するメソッドをここに
  const taskCompletePost = async(index) => {
    const data = {
      task_id:tasks[index].task_id,
      team_id:tasks[index].team_id,
      user_id:tasks[index].user_id,
      task_name:tasks[index].task_name,
      position_index:tasks[index].position_index,
      task_date:tasks[index].task_date,
      task_detail:tasks[index].task_detail,
      task_point:100
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
      setTasks(res_data);
      console.log(res_data)
      return res_data;
    })
  }

  const taskDelete = (index) => {
    if(deleteLock === "有効"){
      const data = tasks[index];
      console.log(JSON.stringify(data));
      fetch('/taskQueryDeletePostTest',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then((res_data)=>{
        setTasks(res_data);
        console.log(res_data)
        return res_data;
      })
    }
  }

  const taskSearch = (search_date) => {
    const data = {
      task_date:search_date
    };
    console.log(JSON.stringify(data));
    fetch('/taskQuerySearch',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      setTasks(res_data);
      console.log(res_data)
      return res_data;
    })
  }

  // ドラッグでのposition_indexの更新は後で実装

  // ドラッグ開始時
  const dragStart = (index) => {
    setDragIndex(index);
  }

  // ドラッグ移動先
  const dragEnter = (index) => {
    // console.log('index', index);
    // console.log('dragIndex', dragIndex);
    if (index === dragIndex) return;
    setTasks((prevState) => {
      // 前の状況
      let newTasks = JSON.parse(JSON.stringify(prevState));
      // 移動元のコンポーネントを削除
      const deleteElement = newTasks.splice(dragIndex, 1)[0];
      // 移動先のindexでコンポーネントを追加
      newTasks.splice(index, 0, deleteElement);
      return newTasks;
    });
    setDragIndex(index);
  }

  // タスク編集画面
  const taskEditOn = (index) => {
    setEdit(index);
    console.log(edit);
  }

  // タスク保存
  const taskEditClose = (index) => {
    setEdit();
    taskSearch(date);
  }

  // 日付変更時にタスクを検索
  useEffect(() => {
    console.log("date",date);
    taskSearch(date);
  }, [date]);

  // ドラッグ開始の検知
  useEffect(()=>{
    console.log(dragIndex);
  },[dragIndex]);
 
  const searchBar={
    "display":"flex",
    "flexDirection": "row",
  }
  const subContents = {
    "width":"40%",
    // "border": "2px solid #000000",
    // "padding":"3%",
    "display":"flex",
    "flexDirection": "row",
  }
  const mainContents = {
    "width":"60%",
    "flexGrow":"1",
    "display":"flex",
    "flexDirection": "row",
  }
  const searchButton = {
    "margin":"3%",
    "flexGrow":"1",
  }
  const searchDateForm = {
    "margin":"3%",
    "flexGrow":"1",
    "height":"100%"
  }

  return (
    <div style={{"margin":"3%"}}>

      <div style={searchBar}>
        <div style={mainContents}>
          <TextField
            style = {searchDateForm}
            type="date"
            // defaultValue={date}
            value = {date}
            // margin="normal"
            id="searchDate"
            // label="表示する日付"
            name="searchDate"
            onChange = {
              (event) => {
                setDate(event.target.value)
              }
            }
          />
          <Button 
            style={searchButton} 
            variant="contained" 
            color="primary"
            onClick = {()=>{setDate(formatDate(today))}}
          >当日表示</Button>
          <Button 
            style={searchButton} 
            variant="contained" 
            color="primary"
            onClick = {()=>{setDate("")}}
          >全件表示</Button>
        </div>
        <div style={subContents} >
        <Button 
            style={searchButton}
            variant="contained" 
            color={deleteButtonColor}
            onClick = {()=>{changeDeleteLock()}}
          >
            削除：{deleteLock}
          </Button>
          <Button 
            style={searchButton}
            variant="contained" 
            color="primary"
            onClick = {()=>{taskPost()}}
          >
            新規タスク作成
          </Button>
        </div>
      </div>
      <div 
        style={{
                "display":"flex",
                "justifyContent":"center",
                "alignItems":"center",
                "flexWrap":"wrap",
                "overflow":"scroll",
                "top":"10%"
        }}
      >
        {
          tasks.map((task, index) =>
            <TaskDetail 
              task = {task}
              deleteButtonColor={deleteButtonColor}
              dragStart = {
                ()=>{
                  dragStart(index);
                }
              }
              dragEnter = {
                ()=>{
                  dragEnter(index);
                }
              }
              taskDelete = {
                ()=>{
                  taskDelete(index);
                }
              }
              taskEditOn = {
                ()=>{
                  taskEditOn(index);
                }
              }
              taskEditSave = {
                ()=>{
                  taskEditSave(index);
                }
              }
              taskCompletePost = {
                ()=>{
                  taskCompletePost(index)
                }
              }
              key = {index}
            />
          ) 
        }
      </div>
      { Number.isInteger(edit) &&
        <TaskEdit
         index={edit}
         task={tasks[edit]}
         taskEditClose={
           ()=>{
            taskEditClose(edit)
           }
         }
        />
      }
    </div>
  );
}

export default TaskScreen;
