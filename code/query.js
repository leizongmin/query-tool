/**
 * 查询页面
 */
 
exports.paths = '/q/:id';

// 模板集合
var db_template = global.db.collection('template');

exports.get = function (server, request, response) {
	if (request.get.v)
		request.get.v = unescape(request.get.v);
	// 查询数据库
	db_template.findOne({_id: request.path.id}, function (err, data) {
		if (err || !data) {
			response.end('模板不存在!');
		}
		else {
			var view ={
				title:	data.data.title,
				url:	data.data.url,
				method: 	data.data.post ? 'POST' : 'GET',
				auto:	data.data.auto,
				window:	data.data.window ? '_blank' : '_self',
				field:	[]
			}
			// 参数项目
			for (var i in data.data.get) {
				var v = {
					name:	i,
					text:	data.data.get[i][0],
					value:	data.data.get[i][1] ? data.data.get[i][1] : ''
				}
				if (i == data.data.auto)
					v.value = request.get.v;
				view.field.push(v);
			}
			for (var i in data.data.post) {
				var v = {
					name:	i,
					text:	data.data.post[i][0],
					value:	data.data.post[i][1] ? data.data.post[i][1] : ''
				}
				if (i == data.data.auto)
					v.value = request.get.v;
				view.field.push(v);
			}
			// 初始化代码
			if (view.field.length ==1 && request.get.v != '')
				view.init = '$("form").submit();';
			else
				view.init = '';
			
			response.renderFile('query.html', view, 'text/html');
		}
	});
}