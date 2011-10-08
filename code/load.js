/**
 * 加载页面
 */
 
exports.paths = '/load/:id';

exports.get = function (server, request, response) {
	var view = {
		query_page:	'http://' + request.headers.host + '/q/' + request.path.id,
	}
	response.renderFile('load.js', view, 'text/javascript');
}