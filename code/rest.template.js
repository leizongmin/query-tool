/**
 * 用户的模板列表
 */
 
exports.paths = '/t/:id';

var paramsEncode = require('./lib/util').paramsEncode; 
// 模板集合
var db_template = global.db.collection('template');

/** 获取模板信息 */
exports.get = function (server, request, response) {
	// 查询数据库
	db_template.findOne({_id: request.path.id}, function (err, data) {
		if (err || !data)
			var ret = false;
		else {
			var ret = data.data;
			ret.id = data._id;
		}
		// 返回JSON数据
		response.sendJSON(ret);
	});
}

/** 更新模板信息 */
exports.post = function (server, request, response) {
	var t = {
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
	// 更新数据
	db_template.update({_id: request.path.id}, {$set: t}, function (err) {
		// 返回JSON数据
		response.sendJSON(err ? false : true);
	});
}

/** 删除模板 */
exports.delete = function (server, request, response) {
	// 删除
	db_template.remove({_id: request.path.id}, function (err) {
		// 返回JSON数据
		response.sendJSON(err ? false : true);
	});
}