import { useEffect, useState } from 'react';

import TaskDetail from "../TastDetail";
import Images from "../getImagePath";

const TaskScreen = (props) => {

  let [memos, setMemos] = useState([]);

  // 読み込み時の動作
  useEffect(() => {
    fetch('/memoTest')
    .then(res => res.json())
    .then(data => {
      setMemos(data);
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
    setMemos((prevState) => {
      // 前の状況
      let newMemos = JSON.parse(JSON.stringify(prevState));
      // 移動元のコンポーネントを削除
      const deleteElement = newMemos.splice(dragIndex, 1)[0];
      // 移動先のindexでコンポーネントを追加
      newMemos.splice(index, 0, deleteElement);
      return newMemos;
    });
    setDragIndex(index);
  }

  return (
    <div 
      style={{
              "display":"flex",
              "justifyContent":"center",
              "alignItems":"center",
              "flexWrap":"wrap",
              "overflow":"scroll"
      }}
    >
      {memos.map((memo, index) =>
        <TaskDetail 
          index = {index}
          title = {memo.title}
          text = {memo.text}
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
      )}
    </div>
  );
}

export default TaskScreen;
