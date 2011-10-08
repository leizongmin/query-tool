/**
 * 网站首页
 */
 
exports.paths = '/';

exports.get = function (server, request, response) {
	response.sendFile('index.html');
}