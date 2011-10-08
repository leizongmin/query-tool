/**
 * 查询模板
 *
 * @author 老雷<leizongmin@gmail.com>
 * @version 0.1
 */
 
var web = require('QuickWeb');

web.set('home_path', './html');
web.set('code_path', './code');
web.set('template_path', './html');

// 定义模板渲染函数
var mustache = require('mustache');
web.set('render_to_html', function (str, view) {
	return mustache.to_html(str, view);
});

// 设置MongoDB连接
var mongo = require("mongoskin");
var db_url = exports.db_url = "127.0.0.1:27017/query-tool";
global.db = mongo.db(db_url);

web.create();
