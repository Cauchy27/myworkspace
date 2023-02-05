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

const port = 3000;

// api用

// ユーザー情報更新
app.post('/userPost',(req, res) => {

  // 日付の設定
  const today = new Date();
  // 日付をYYYY-MM-DDの書式で返すメソッド
  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  }
  try{
    // 認証を通っている場合にユーザー情報を更新
    if(req.body.email_verified){
      //email, 名前からユーザーを検索
      const user_search_data=[req.body.email,req.body.name];
      console.log("userPost",user_search_data);
      const user_search_sql="select user_id from user where login_id = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {  
        // if (err) throw err;  
        console.log("user_id",search_user_id);
        try{
          search_user_id = search_user_id[0]["user_id"];
        }
        catch{
          search_user_id = null;
        }
        
        // ユーザーを更新
        const user_data =[search_user_id, req.body.email, req.body.name, req.body.access_token, formatDate(today)];
        console.log("data",user_data);
        const user_update_sql = "INSERT INTO user ( user_id, login_id, user_name, token,  last_login_date) values (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), user_name = VALUES(user_name), login_id = VALUES(login_id),token = VALUES(token), last_login_date = VALUES(last_login_date);";
        db.query(user_update_sql ,user_data, (err, result, fields) => {  
          // if (err) throw err;  
          console.log("user_data",result);
          res.json(result);
        });
      });
    }
  }
  catch(error){
    console.log(error);
    res.json({
      message:"failure",
      detail:err
    });
  }
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

      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;

        // タスクの更新・Insert
        data = [req.body.task_id, req.body.team_id, user_id_test, req.body.task_name, req.body.position_index,req.body.task_date,req.body.task_tag_id];
        const update_sql = "INSERT INTO task ( task_id, team_id, user_id, task_name, position_index,task_date,task_tag_id) values (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE team_id = VALUES(team_id), task_name = VALUES(task_name), position_index = VALUES(position_index), task_date = VALUES(task_date), task_tag_id = VALUES(task_tag_id);";
  
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
  
            // タスク検索
            if(req.body.search_task_date){
              // タグの条件を整理
              let tag_sql = "";
              if(!req.body.search_task_tag_id){
                data = [user_id_test,req.body.search_task_date];
              }
              else{
                data = [user_id_test,req.body.search_task_date,req.body.search_task_tag_id];
                tag_sql = " and tg.task_tag_id = ?";
              }
              const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ? and t.task_date = ?` + tag_sql + " order by tg.task_tag_id";
              db.query(search_sql, data,(err, response) => {
                if(err) console.log(err);
                console.log(response);
                res.json(response);
              });
            }
            else{
              // タグの条件を整理
              let tag_sql = "";
              if(!req.body.search_task_tag_id){
                data = [user_id_test];
              }
              else{
                data = [user_id_test,req.body.search_task_tag_id];
                tag_sql = " and tg.task_tag_id = ?";
              }
              const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ?` + tag_sql + " order by tg.task_tag_id";
              db.query(search_sql,data,(err, response) => {
                if(err) console.log(err);
                console.log(response);
                res.json(response);
              });
            }
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message:"failure",
      detail:err
    });
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
      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;

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
    
            // タスク検索
            if(req.body.search_task_date){
              // タグの条件を整理
              let tag_sql = "";
              if(!req.body.search_task_tag_id){
                data = [user_id_test,req.body.search_task_date];
              }
              else{
                data = [user_id_test,req.body.search_task_date,req.body.search_task_tag_id];
                tag_sql = " and tg.task_tag_id = ?";
              }
              const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ? and t.task_date = ?` + tag_sql + " order by tg.task_tag_id";
              db.query(search_sql, data,(err, response) => {
                if(err) console.log(err);
                console.log(response);
                res.json(response);
              });
            }
            else{
              // タグの条件を整理
              let tag_sql = "";
              if(!req.body.search_task_tag_id){
                data = [user_id_test];
              }
              else{
                data = [user_id_test,req.body.search_task_tag_id];
                tag_sql = " and tg.task_tag_id = ?";
              }
              const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ?` + tag_sql + " order by tg.task_tag_id";
              db.query(search_sql,data,(err, response) => {
                if(err) console.log(err);
                console.log(response);
                res.json(response);
              });
            }
          });
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message:"failure",
      detail:err
    });
  }
});

// タスク検索・未完了タスクの日付を今日に伸ばす
app.post('/taskQuerySearch',(req, res) => {
  console.log("query_input", req.body.token);
  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{

      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;

        const today = new Date();
        // 日付をYYYY-MM-DDの書式で返すメソッド
        const formatDate = (dt) => {
          var y = dt.getFullYear();
          var m = ('00' + (dt.getMonth()+1)).slice(-2);
          var d = ('00' + dt.getDate()).slice(-2);
          return (y + '-' + m + '-' + d);
        }
        console.log(formatDate(today));

        // 次回タスクの検索
        if(req.body.request == "next_tasks"){
          // タスク検索
          if(req.body.task_date_to){
            // タグの条件を整理
            let tag_sql = "";
            if(!req.body.task_tag_id){
              data = [user_id_test,formatDate(today),req.body.task_date_to];
            }
            else{
              data = [user_id_test,formatDate(today),req.body.task_date_to,req.body.task_tag_id];
              tag_sql = " and tg.task_tag_id = ?";
            }
            const search_sql = `select t.task_name,  tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ? and t.task_date >= ? and t.task_date <= ? and ( td.task_point < 100 or td.task_point is null ) ` + tag_sql + " order by tg.task_tag_id";
            db.query(search_sql, data,(err, response) => {
              if(err) console.log(err);
              res.json(response);
            });
          }
        }
        // 通常検索
        else{
          // 未完了タスクの日付を今日に伸ばす
          date_data=[formatDate(today),formatDate(today),user_id_test];
          const task_date_update = `update task left join task_detail using(task_id) set task_date = ? where task_date < ? and ( task_point < 100 or task_point is null) and user_id = ?;`;
          db.query(task_date_update, date_data,(error, update_task) => {
            if(error) console.log(error);
            console.log(update_task);
          });
    
          // タスク検索
          if(req.body.task_date){
            // タグの条件を整理
            let tag_sql = "";
            if(!req.body.task_tag_id){
              data = [user_id_test,req.body.task_date];
            }
            else{
              data = [user_id_test,req.body.task_date,req.body.task_tag_id];
              tag_sql = " and tg.task_tag_id = ?";
            }
            const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ? and t.task_date = ?` + tag_sql + " order by tg.task_tag_id";
            db.query(search_sql, data,(err, response) => {
              if(err) console.log(err);
              console.log(response);
              res.json(response);
            });
          }
          else{
            // タグの条件を整理
            let tag_sql = "";
            if(!req.body.task_tag_id){
              data = [user_id_test];
            }
            else{
              data = [user_id_test,req.body.task_tag_id];
              tag_sql = " and tg.task_tag_id = ?";
            }
            const search_sql = `select t.task_id, t.team_id, t.task_name, t.position_index, CAST(t.task_date AS DATE) as task_date, td.task_detail, td.task_point, tg.task_tag_id, tg.task_tag_name from task t left join task_detail td using(task_id) left join task_tag tg using(task_tag_id) where t.user_id = ?` + tag_sql + " order by tg.task_tag_id";
            db.query(search_sql,data,(err, response) => {
              if(err) console.log(err);
              console.log(response);
              res.json(response);
            });
          }
        }
      });
  
    }
  } catch (err) {
    console.log(err);
    res.json({
      message:"failure",
      detail:err
    });
  }
});

// タグ登録・編集・検索
app.post('/tagPost',(req, res) => {
  try{

    // 登録・編集
    if(req.body.request === "update"){
      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;
  
        // とりあえず１つ１つ登録する方向で
        req.body.dataArray.map((tag,index) => {
          data = [tag.task_tag_id, user_id_test, tag.task_tag_name];
          const task_tag_sql = "INSERT INTO task_tag ( task_tag_id, user_id, task_tag_name) values (?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), task_tag_name = VALUES(task_tag_name);";
          db.query(task_tag_sql, data,(err, response) => {
            if(err) console.log(err);
            console.log(response);
        
            // 最後のデータで
            if(index >= req.body.dataArray.length -1){
              // タグのリストを返す
              const task_tag_list = "select task_tag_id, task_tag_name from task_tag where user_id = ?";
              db.query(task_tag_list, user_id_test,(error, list_response) => {
                if(error) console.log(error);
                console.log("test",list_response); 
                res.json(list_response);
              });
            }
          });
        });
      });
    }
    else if(req.body.request === "insert"){
      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;
        
        data = [req.body.dataArray.task_tag_id,user_id_test, req.body.dataArray.task_tag_name];
        const task_tag_sql = "INSERT INTO task_tag ( task_tag_id, user_id, task_tag_name) values (?, ?, ?) ON DUPLICATE KEY UPDATE user_id = VALUES(user_id), task_tag_name = VALUES(task_tag_name);";
        db.query(task_tag_sql, data,(err, response) => {
          if(err) console.log(err);
          console.log(response);
          // タグのリストを返す
          const task_tag_list = "select task_tag_id, task_tag_name from task_tag where user_id = ?";
          db.query(task_tag_list, user_id_test,(error, list_response) => {
            if(error) console.log(error);
            console.log("test",list_response); 
            res.json(list_response);
          });
        });
      });
    }
    // 検索
    else if(req.body.request === "search"){
      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;
  
        // タグのリストを返す
        const task_tag_list = "select task_tag_id, task_tag_name from task_tag where user_id = ?";
        db.query(task_tag_list, user_id_test,(error, list_response) => {
          if(error) console.log(error);
          console.log(list_response); 
          res.json(list_response);
        });
      });
    }
  }
  catch(error){
    console.log(error);
    res.json({
      message:"failure",
      detail:err
    });
  }
});

// 報告書出力設定の保存・検索
app.post('/outputConfigPost',(req, res) => {
  console.log("query_input", req.body.token);
  try {
    if(!req.body){
      console.log("req.body.error");
      // throw err;
    }
    else{

      // ユーザーIDの認証
      const user_search_data=[req.body.token];
      const user_search_sql="select user_id from user where token = ? order by user_id;";
      db.query(user_search_sql ,user_search_data, (err, search_user_id, fields) => {
        console.log("user",search_user_id);
        const user_id_test = search_user_id[0].user_id;

        if(req.body.request == "get"){
          const output_config_sql = "select * from output_config where user_id = ?;";
          db.query(output_config_sql, user_id_test,(err, response) => {
            if(err) console.log(err);
            console.log("res:",response);
            res.json(response);
          });
        }
        else if(req.body.request == "update"){
          const data = [req.body.dataArray.output_config_id,user_id_test, req.body.dataArray.outer_tag_start,req.body.dataArray.outer_tag_end,req.body.dataArray.title,req.body.dataArray.header_today,req.body.dataArray.header_tomorrow,req.body.dataArray.indent,req.body.dataArray.delimiter,req.body.dataArray.date_checked,req.body.dataArray.progress_checked];
          const output_config_sql = "INSERT INTO output_config ( output_config_id, user_id, outer_tag_start, outer_tag_end, title, header_today, header_tomorrow, indent, delimiter, date_checked, progress_checked) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE output_config_id = VALUES(output_config_id), user_id = VALUES(user_id), outer_tag_start = VALUES(outer_tag_start), outer_tag_end = VALUES(outer_tag_end), title = VALUES(title), header_today = VALUES(header_today), header_tomorrow = VALUES(header_tomorrow), indent = VALUES(indent), delimiter = VALUES(delimiter), date_checked = VALUES(date_checked), progress_checked = VALUES(progress_checked);";
          db.query(output_config_sql, data,(err, response) => {
            if(err) console.log(err);
            res.json(response);
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message:"failure",
      detail:err
    });
  }
});

app.get('/menuTest', (req, res) => {
  try{
    res.json([
      {
        id: 1,
        title:"業務日誌",
        url: "test1",
        menu_active:2
      }, 
      {
        id: 2,
        title:"タスク管理",
        url: "test2",
        menu_active:1
      }, 
      {
        id: 3,
        title:"集計・分析",
        url: "test3",
        menu_active:2
      }, 
      {
        id: 4,
        title:"設定",
        url: "test4",
        menu_active:2
      }, 
      {
        id: 5,
        title:"アカウント",
        url: "test5",
        menu_active:2
      }, 
    ]);
  }
  catch(error){
    console.log(error);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));