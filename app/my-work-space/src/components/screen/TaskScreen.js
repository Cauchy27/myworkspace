import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import TaskDetail from "../TastDetail";
import Images from "../getImagePath";

const TaskScreen = (props) => {

  let [tasks, setTasks] = useState([]);
  let [edit, setEdit] = useState([]);

  // 読み込み時の動作
  useEffect(() => {
    fetch('/taskQueryTest')
    .then(res => res.json())
    .then(data => {
      setTasks(data);
      console.log(data)
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const taskPost = (data) => {
    if(!data){
      let tasks_position_index = tasks.map((value)=>{
        return value.position_index;
      });
      data = {
        task_id:null,
        team_id:null,
        user_id:1,
        task_name:"（ここにタスク名が入ります）",
        position_index:Math.max.apply(null, tasks_position_index),
        task_detail:"（ここに本文を入ります）"
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

  const taskDelete = (index) => {
    // console.log(tasks[index]);
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

  const [dragIndex, setDragIndex] = useState(null);

  // ドラッグ開始の検知
  useEffect(()=>{
    console.log(dragIndex);
  },[dragIndex]);


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
    // 
  }

  // タスク保存
  const taskEditSave = (index) => {
    // 
  }
 
  const searchBar={
    "display":"flex",
    "flex-direction": "row"
  }
  const subContents = {
    "width":"20%",
    // "border": "2px solid #000000",
    // "padding":"3%",
    "justifyContent":"center",
  }
  const mainContents = {
    "width":"80%",
    "flex-grow":"1"
  }

  return (
    <div style={{"margin":"3%"}}>

      <div style={searchBar}>
        <p style={mainContents}>
          検索欄を置く予定
        </p>
        <Button 
          style={subContents} 
          variant="contained" 
          color="primary"
          onClick = {()=>{taskPost()}}
        >
          新規タスク作成
        </Button>
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
              index = {task.task_id}
              title = {task.task_name}
              text = {task.task_detail}
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
              key = {index}
            />
          ) 
        }
      </div>
    </div>
  );
}

export default TaskScreen;
