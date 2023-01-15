const express = require('express');
const app = express();

const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'DB',
  user: 'root',
  password: '',
  database: 'mws'
});

const user_id = 1;

const port = 3000;

// api用

// test
app.get('/taskQueryTest', (req, res) => {
  db.connect(function(err) {
    // if (err) throw err;
    if(err){
      console.log("error");
    }
    console.log('Connected');
  
    const sql = `select * from task left join task_detail using(task_id) where user_id = ${user_id};`;
    db.query(sql, function (err, result, fields) {  
      // if (err) throw err;  
      if(result.length % 2 != 0){
        result.push(
          {
            id: "",
            task_name:"（タイトル）",
            task_detail: "(内容)"
          }
        )
      }
      console.log(result);
      res.json(result);
    });
  
  });
});


app.get('/taskTest', (req, res) => {
  res.json([
    {
      id: 1,
      title:"タイトルテスト1",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 2,
      title:"タイトルテスト2",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 3,
      title:"タイトルテスト3",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 4,
      title:"タイトルテスト4",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 5,
      title:"タイトルテスト5",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 6,
      title:"タイトルテスト6",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 7,
      title:"タイトルテスト7",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 8,
      title:"タイトルテスト8",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 9,
      title:"タイトルテスト9",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 10,
      title:"タイトルテスト10",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 11,
      title:"タイトルテスト11",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 12,
      title:"タイトルテスト12",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 13,
      title:"タイトルテスト13",
      text: "今日は楽しい1日でした。"
    }, 
    {
      id: 14,
      title:"タイトルテスト14",
      text: "今日は楽しい1日でした。"
    }
  ]);
});

app.get('/menuTest', (req, res) => {
  res.json([
    {
      id: 1,
      title:"業務日誌",
      url: "test1"
    }, 
    {
      id: 2,
      title:"タスク管理",
      url: "test2"
    }, 
    {
      id: 3,
      title:"集計・分析",
      url: "test3"
    }, 
    {
      id: 4,
      title:"設定",
      url: "test4"
    }, 
    {
      id: 5,
      title:"アカウント",
      url: "test5"
    }, 
  ]);
});

app.listen(port, () => console.log(`Server running on port ${port}`));