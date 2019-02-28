var mysql = require('mysql');
//连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',  //用户名
    password:'',   //密码
    database:'vue_demo',
    port:'3306'     //端口号
});
connection.connect(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('连接succeed');
});
// 插入一条数据
var sql = 'INSERT INTO `joke` (`content`, `unixtime`, `url`, `hashId`) VALUES(?,?,?,?)';// sql  //  'insert into student (id,name,password) values(?,?,?)
var param = ['content123', 'unixtime123', 'url123', 'hashid123']// 值;

connection.query(sql,param,function(err,rs){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('插入数据success');
});
// 插入数据的sql
// 单行
// INSERT INTO `joke` (`id`, `content`, `unixtime`, `url`, `hashId`) VALUES (NULL, 'content', 'unixtime', 'url', 'hashid');
// 多行
// INSERT INTO `joke` (`id`, `content`, `unixtime`, `url`, `hashId`) VALUES (NULL, 'cont1111', '1111', '1111', '1111'), (NULL, '2222', '2222', '2222', '2222');



//执行查询 查询study数据库中的student表的数据
//connection.query('select * from student',function(err,rs){
//  if(err){
//      console.log(err);
//      return;
//  }
//  for(var i=0;i<rs.length;i++){
//      console.log('id:'+rs[i].id+'name:'+rs[i].name+'password:'+rs[i].password);
//  }
//});
//关闭数据库
//connection.end(function(err){
//  if(err){
//    console.log('---:'+err);
//    return;
//  }
//  console.log('关闭succeed');
//});