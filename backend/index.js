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
  database: 'mws',
  timezone: 'jst'
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

// タスク追加・更新
// task, detail への実装のみで、tagへの実装はまだ
app.post('/taskQueryPostTest',(req, res) => {
  // 日付の設定
  const today = new Date();
  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }

  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{
      if(!req.body.task_date){
        req.body.task_date = formatDate(today);
        console.log("insert:",req.body.task_date)
      }

      // タスクの更新・Insert
      data = [req.body.task_id, req.body.team_id, user_id, req.body.task_name, req.body.position_index,req.body.task_date];
      const update_sql = "INSERT INTO task ( task_id, team_id, user_id, task_name, position_index,task_date) values (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE team_id = VALUES(team_id), task_name = VALUES(task_name), position_index = VALUES(position_index), task_date = VALUES(task_date);";

      console.log(data);

      db.query(update_sql, data,(err, results) => {
        // if(err) throw err;
        if(err) console.log(err);

        // タスク詳細の更新・Insert
        detail_data =[req.body.task_id, req.body.task_detail,req.body.task_point];
        const update_detail_sql = "INSERT INTO task_detail ( task_id, task_detail, task_point) values (?, ?, ?) ON DUPLICATE KEY UPDATE task_id = VALUES(task_id), task_detail = VALUES(task_detail), task_point = VALUES(task_point);";
        db.query(update_detail_sql,detail_data,(error, response) => {
          // if(err) throw err;
          if(error) console.log(error);

          // リストを返す
          const list_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name, tg.task_tag_point from task t left join task_detail td using(task_id) left join task_tag tg using(task_id) where t.user_id = ? ;`;
            db.query(list_sql,user_id,(error, response) => {
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
          const list_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name, tg.task_tag_point from task t left join task_detail td using(task_id) left join task_tag tg using(task_id) where t.user_id = ? ;`;
          db.query(list_sql,user_id,(error, response) => {
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

// タスク検索・未完了タスクの日付を今日に伸ばす
app.post('/taskQuerySearch',(req, res) => {
  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{

      const today = new Date();
      // 日付をYYYY-MM-DDの書式で返すメソッド
      const formatDate = (dt) => {
        var y = dt.getFullYear();
        var m = ('00' + (dt.getMonth()+1)).slice(-2);
        var d = ('00' + dt.getDate()).slice(-2);
        return (y + '-' + m + '-' + d);
      }
      console.log(formatDate(today))

      // 未完了タスクの日付を今日に伸ばす
      date_data=[formatDate(today),formatDate(today)];
      const task_date_update = `update task left join task_detail using(task_id) set task_date = ? where task_date < ? and ( task_point < 100 or task_point is null);`;
      db.query(task_date_update, date_data,(error, update_task) => {
        if(error) console.log(error);
        console.log(update_task);
      });

      // タスク検索
      if(req.body.task_date){
        data = [user_id,req.body.task_date];
        const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name, tg.task_tag_point from task t left join task_detail td using(task_id) left join task_tag tg using(task_id) where t.user_id = ? and t.task_date = ?;`;
        db.query(search_sql, data,(err, response) => {
          if(err) console.log(err);
          console.log(response);
          res.json(response);
        });
      }
      else{
        const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name, tg.task_tag_point from task t left join task_detail td using(task_id) left join task_tag tg using(task_id) where t.user_id = ?;`;
        db.query(search_sql,user_id,(err, response) => {
          if(err) console.log(err);
          console.log(response);
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