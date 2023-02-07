// Googleログイン
import {UseDbToken} from "./LoginCheck";

// メニュー取得
const getMenu = (calFunc) => {
  fetch('/menuTest')
    .then(res => res.json())
    .then(data => {
      // ここにset系の関数が入る想定
      if(calFunc){
        calFunc(res_data);
      }
    }).catch(err => {
      console.log(err);
    });
}

// タスク作成・更新 -> タスク表示
const taskPost = async(data,calFunc) => {
  const token = await UseDbToken();
  if(!data){
    data = {
      token:token,
      task_id:null,
      team_id:null,
      task_name:"",
      position_index:null,
      task_date:null,
      task_detail:"",
      task_point:0,
      task_tag_id:null,
      task_priority:100,
      search_task_tag_id:tag,
      search_task_date:date,
    };
  }
  fetch('/taskQueryPostTest',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((res_data)=>{
    if(calFunc){
      calFunc(res_data);
    }
  })
}

// タスクを完了に変更・taskPostにそのうち統合 -> タスク表示
const taskCompletePost = async(task,tag,date,calFunc) => {
  const token = await UseDbToken();
  const data = {
    token:token,
    task_id:task.task_id,
    team_id:task.team_id,
    user_id:task.user_id,
    task_name:task.task_name,
    position_index:task.position_index,
    task_date:task.task_date,
    task_detail:task.task_detail,
    task_point:100,
    search_task_tag_id:tag,
    search_task_date:date,
  }
  await fetch('/taskQueryPostTest',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((res_data)=>{
    if(calFunc){
      calFunc(res_data);
    }
  })
}

// タスク削除 -> タスク表示
const taskDelete = async(task,tag,date,calFunc) => {
  const token = await UseDbToken();
  if(deleteLock === "有効"){
    const data = Object.assign(
      task,
      {token:token},
      {
        search_task_tag_id:tag,
        search_task_date:date
      }
    );
    fetch('/taskQueryDeletePostTest',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res_data)=>{
      if(calFunc){
        calFunc(res_data);
      }
    })
  }
}

// タスク検索（タスク表示）
const taskSearch = async(search_date,search_tag_id,calFunc,search_date_to) => {
  const token = await UseDbToken();
  // 次の日以降のタスクを取得する場合（報告書出力用）
  if(search_date_to && search_task_tag_id){
    const data = {
      task_date_to:search_date_to,
      task_tag_id:props.searchTag,
      token:token,
      request:"next_tasks",
    };
  }
  // 通常のタスク検索
  else{
    const data = {
      task_date:search_date,
      task_tag_id:search_tag_id,
      token:token
    };
  }
  let response = [];
  fetch('/taskQuerySearch',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((res_data)=>{
    if(calFunc){
      calFunc(res_data);
    }
    response = res_data;
  })

  return response;
}

// タスクタグ更新 -> 表示
const taskTagPost = async(data,calFunc) => {
  const token = await UseDbToken();
  if(!data){
    data = {
      token:token,
      dataArray:{
        task_tag_id:null,
        task_tag_name:"タグ",
      },
      request:"insert",
    };
  }
  else if(data.request != "search") {
    data = {
      token:token,
      dataArray:data,
      request:"update"
    }
  }
  else{
    data = Object.assign(data,{token:token,})
  }

  await fetch('/tagPost',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((res_data)=>{
    if(calFunc){
      calFunc(res_data);
    }
  })
}

// タスクタグ検索（表示）
const taskTagSearch = async(calFunc) => {
  const token = await UseDbToken();
  const data = {
    request:"search",
    token:token
  }
  fetch('/tagPost',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((res_data)=>{
    if(calFunc){
      calFunc(res_data);
    }
  })
}

// 報告書出力設定の更新 -> 表示
const outputConfigPost = async(request,calFunc,output_config) => {
  const token = await UseDbToken();
  // get・update
  let data = {
    token:token,
    request:request,
  };
  if(request == "update"){
    data = Object.assign(
      data,
      {
        dataArray:{
          output_config_id:output_config.output_config_id,
          outer_tag_start:output_config.outer_tag_start,
          outer_tag_end:output_config.outer_tag_end,
          title:output_config.title,
          header_today:output_config.header_today,
          header_tomorrow:output_config.header_tomorrow,
          indent:output_config.indent,
          delimiter:output_config.delimiter,
          date_checked:output_config.date_checked,
          progress_checked:output_config.progress_checked,
        }
      }
    )
  }
  fetch('/outputConfigPost',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then((res_data)=>{
    if(calFunc){
      calFunc(res_data[0]);
    }
  })
}

export {
  getMenu,
  taskPost,
  taskCompletePost,
  taskDelete,
  taskSearch,
  taskTagPost,
  taskTagSearch,
  outputConfigPost,
  
}