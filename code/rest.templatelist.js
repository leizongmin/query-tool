/**
 * 用户的模板列表
 */
 
exports.paths = '/u/:token';

var paramsEncode = require('./lib/util').paramsEncode; 
var md5 = require('./lib/md5');
// 模板集合
var db_template = global.db.collection('template');

/** 模板列表 */
exports.get = function (server, request, response) {
	// 查询数据库
	db_template.find({token: request.path.token}).toArray(function (err, data) {
		if (err)
			data = [];
		// 整理模板
		var ret = [];
		data.forEach(function (v) {
			var i = ret.push(v.data);
			ret[i - 1].id = v._id;
		});
		// 返回JSON数据
		response.sendJSON(ret);
	});
}

/** 新建模板 */
exports.post = function (server, request, response) {
	var t = {
		_id:	md5('' + new Date().getTime() + request.path.token + request.post.title),
		token:	request.path.token,
		data:	{
			title:	request.post.title,
			url:	request.post.url,
			auto:	request.post.auto,
			window:	request.post.window == 'on' ? true : false,
			get:	paramsEncode(request.post.get),
			post:	paramsEncode(request.post.post)
		}
	}
	if (t.data.get == false)
		t.data.get = {}
	if (t.data.post == false)
		delete t.data.post;
	
	db_template.insert(t, function (err) {
		response.sendJSON(err ? false : true);
	});
}