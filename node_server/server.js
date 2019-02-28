var mysql = require('mysql');
var http = require('http');
var urlz = require('url');
var util = require('util');
var qs = require('querystring');
var fs = require('fs');

//连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',  //用户名
    password:'',   //密码
    database:'damo',//数据库名
    port:'3306'     //端口号
});
connection.connect(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('连接succeed');
});




http.createServer(function(req, res){
//	console.log('有人访问'+req.url);
	
	var heard = {
//    	'Accept':'*/*',
//    	'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
//    	'Accept-Language':'zh-CN,zh;q=0.8',
//    	'Access-Control-Allow-Origin':'http://172.16.4.83:8020',
//    	'Access-Control-Allow-Origin':'http://127.0.0.1::8888',
//    	'Connection':'keep-alive',
//    	'Host': 'localhost:8020',
//		'Referer': 'http://localhost:8020'
   	}
	// 设置请求头跨域的请求头
	res.writeHead(200, heard)// {'Content-Type': 'application/json'});	
	var urll = urlz.parse(req.url).pathname;
	console.log('有人访问'+urll);
	var mo = req.method;
	
    
	if(mo=='GET'){
		switch (urll){
			case '/add_joke':
			    var arg=urlz.parse(req.url).query;
			    var obj = qs.parse(arg).b;
			    var b = JSON.parse(obj);
			    for (let i = 0; i < b.length; i++) {
			    	var desc = '';
					var sql = 'INSERT INTO `joke` (`content`, `unixtime`, `url`, `hashId`) VALUES(?,?,?,?)';// sql  //  'insert into student (id,name,password) values(?,?,?)
					var param = [b[i].content, b[i].unixtime, b[i].url, b[i].hashId]// 值;
					connection.query(sql,param,function(err,rs){
					    if(err){
					    	desc = '插入数据失败';
					        console.log(err.message);
							res.write(err);
							res.end();
					    }else{
					    }
					});
			   	}
				res.write(desc);
				res.end();
			break;
			case '/add_img':
				var arg=urlz.parse(req.url).query;
			    var obj = qs.parse(arg).b;
			    var b = JSON.parse(obj);
			    for (let i = 0; i < b.length; i++) {
			    	var desc = '插入数据失败';
					var sql = 'INSERT INTO `img` (`url`, `startdate`, `copyright`) VALUES(?,?,?)';// sql  //  'insert into student (id,name,password) values(?,?,?)
					var param = [b[i].url, b[i].startdate, b[i].copyright]// 值;
					connection.query(sql,param,function(err,rs){
					    if(err){
					        console.log(err.message);
					        return;
					    }
					    desc = 'img添加成功';
					});
			   	}
				res.write('img添加成功');
				res.end();
			break;
			case '/get_joke':
				var arg=urlz.parse(req.url).query;
			    var obj = qs.parse(arg);
				var startNumber = obj.startNumber||'0';// 分页起始条数	
				var pageSize = obj.pageSize||'10';// 每页条数
				var sql = 'SELECT * FROM `joke` ORDER BY `joke`.`id` ASC LIMIT '+startNumber+','+pageSize;
				connection.query(sql,param,function(err,data){
					var ob = {};
					if(err){
						ob.code = '0';
					}else{
						ob.code = '1';
						ob.data = data;
					}
					res.write(JSON.stringify(ob));
					res.end();
				});
			break;
			case '/get_user':
				var arg=urlz.parse(req.url).query;
			    var obj = qs.parse(arg);
				var username = obj.username||'11';// 账号	
				var password = obj.password1||'000';// 密码
				var sql = 'SELECT *FROM `user` WHERE `phone` = '+ username +' AND `password` = '+ password;
				connection.query(sql,function(err,data){
					var ob = {};
					if(err){
						console.log(err)
						ob.code = '0';
						ob.desc = '账号或密码错误';
					}else{
						ob.code = '0';
						ob.desc = '账号或密码错误';
						for (var i = 0; i < data.length; i++) {
							if(data[i].phone==username&&data[i].password==password){
								ob.code = '1';
								ob.desc = '验证成功';								
							}
						}
					}
					res.write(JSON.stringify(ob));
					res.end();
				});
			break;
			case '/set_user':
				var arg=urlz.parse(req.url).query;
			    var obj = qs.parse(arg);
				var username = obj.username||'11';// 账号	
				var password = obj.password1||'000';// 密码
				var pass1 = obj.pass1||'000';// 密码
				var sql = 'SELECT *FROM `user` WHERE `phone` = '+ username +' AND `password` = '+ pass1;
				var id = '0';
				console.log(username,pass1)
				connection.query(sql,function(err,data){
					var ob = {};
					if(err){
						console.log(err)
						ob.code = '0';
						ob.desc = '账号或密码错误';
						res.write(JSON.stringify(ob));
						res.end();
					}else{
						ob.code = '0';
						ob.desc = '账号或密码错误';
						for (var i = 0; i < data.length; i++) {
							if(data[i].phone==username&&data[i].password==pass1){
								ob.code = '1';
								ob.desc = '验证成功';
								id = data[i].id
							}
						}
					}
					if(id==0){
						res.write(JSON.stringify(ob));
						res.end();
					}else{
						var sql_set = 'UPDATE `user` SET `password` = '+password+' WHERE `user`.`id` = '+id;
						connection.query(sql_set,function(err,data){
							if(err){
								console.log(err+'----')
								ob.code = '0';
								ob.desc = '修改失败';
							}else{
								ob.code = '1';
								ob.desc = '修改成功';
							}
							res.write(JSON.stringify(ob));
							res.end();
						})
					}
				});
			break;
			case '/add_user':
				var arg=urlz.parse(req.url).query;
			    var obj = qs.parse(arg);
				var username = obj.username||'';// 账号	
				var password1 = obj.password1||'';// 密码
				var sql = 'INSERT INTO `user` (`id`, `phone`, `name`, `password`) VALUES (NULL, '+username+', name, '+password1+')';
				connection.query(sql,function(err,data){
					var ob = {};
				    if(err){
				    	console.log(err)
						ob.code = '0';
						ob.desc = '添加失败';
					}else{
//				    	console.log(data);
						ob.code = '1';
						ob.desc = '添加成功';
					}
					res.write(JSON.stringify(ob));
					res.end();
				});
			break;
			default:
				fs.readFile('index.html',function(err,data){
					if(err){
						res.write('404');
						res.end();
					}else{
						res.write(data);
						res.end();
					}
				});
			break;
		}
	}else{
		// post 的操作;
	}
    //res.end(util.inspect(url.parse(req.url, true)));
}).listen(8887);

