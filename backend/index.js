const express = require('express');
const app = express();

const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'DB',
  user: 'root',
  password: '',
  database: 'mws'
});

const user_id = 1;

const port = 3000;

// api用

// fetch_test
app.get('/taskQueryTest', (req, res) => {
  db.connect(function(err) {
    // if (err) throw err;
    if(err){
      console.log("error");
    }
    console.log('Connected');
  
    const sql = `select * from task left join task_detail using(task_id) where user_id = ? ;`;
    db.query(sql ,user_id, (err, result, fields) => {  
      // if (err) throw err;  
      console.log(result);
      res.json(result);
    });
  
  });
});

// タスク追加
app.post('/taskQueryPostTest',(req, res) => {
  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{
      // タスクの更新・Insert
      data = [req.body.task_id, req.body.team_id, req.body.user_id, req.body.task_name, req.body.position_index];
      const update_sql = "INSERT INTO task ( task_id, team_id, user_id, task_name, position_index) values (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE team_id = VALUES(team_id), task_name = VALUES(task_name), position_index = VALUES(position_index);";

      console.log(data);

      db.query(update_sql, data,(err, results) => {
        // if(err) throw err;
        if(err) console.log(err);

        // タスク詳細の更新・Insert
        detail_data =[req.body.task_id, req.body.task_detail];
        const update_detail_sql = "INSERT INTO task_detail ( task_id, task_detail) values (?, ?) ON DUPLICATE KEY UPDATE task_id = VALUES(task_id), task_detail = VALUES(task_detail);";
        db.query(update_detail_sql,detail_data,(error, response) => {
          // if(err) throw err;
          if(error) console.log(error);

          // リストを返す
          const list_sql = `select * from task left join task_detail using(task_id) where user_id = ? ;`;
            db.query(list_sql,req.body.user_id,(error, response) => {
              // if(err) throw err;
              if(error) console.log(error);
              res.json(response);
            });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// タスク削除
app.post('/taskQueryDeletePostTest',(req, res) => {
  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{
      // タスクの削除
      data = [req.body.task_id];
      const delete_sql = "delete from task where task_id = ?";
      db.query(delete_sql, data,(err, results) => {
        // if(err) throw err;
        if(err) console.log(err);

        // タスク詳細の削除
        const delete_detail_sql = "delete from task_detail where task_id = ?";
        db.query(delete_detail_sql, data,(err, results) => {
          // if(err) throw err;
          if(err) console.log(err);
  
          // リストを返す
          const list_sql = `select * from task left join task_detail using(task_id) where user_id = ? ;`;
          db.query(list_sql,req.body.user_id,(error, response) => {
            // if(err) throw err;
            if(error) console.log(error);
            res.json(response);
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// タスク検索
app.post('/taskQuerySearch',(req, res) => {
  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{
      // タスクの削除
      data = [req.body.task_date];
      if(req.body.task_date){
        const search_sql = "select * from task left join task_detail using(task_id) left join task_tag using(task_id) where task_date = ?";
        db.query(search_sql, data,(err, response) => {
          if(err) console.log(err);
          res.json(response);
        });
      }
      else{
        const search_sql = "select * from task left join task_detail using(task_id) left join task_tag using(task_id)";
        db.query(search_sql,(err, response) => {
          if(err) console.log(err);
          res.json(response);
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
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