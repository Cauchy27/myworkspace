import { useEffect, useState } from 'react';

import TaskDetail from "../TastDetail";
import Images from "../getImagePath";

const TaskScreen = (props) => {

  let [tasks, setTasks] = useState([]);

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

  return (
    <div style={{"margin":"3%"}}>

      <div>
        検索欄を置く予定
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
              index = {index}
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
              key = {index}
            />
          ) 
        }
      </div>
    </div>
  );
}

export default TaskScreen;
