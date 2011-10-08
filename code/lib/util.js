
exports.paramsEncode = function (str) {
	if (typeof str != 'string' || str.trim() == '')
		return false;
	var ret = {}
	var lines = str.split(/\r?\n/);
	if (lines.length < 1)
		return false;
	for (var i = 0, line; line_str = lines[i]; i++) {
		line_str = line_str.trim();
		var ki = line_str.indexOf(' ');
		if (ki < 0) {
			var k = line_str;
			var v = [line_str];
		}
		else {
			var k = line_str.substr(0, ki);
			var vi = line_str.indexOf(' ', ki + 1);
			if (vi < 0) {
				var v = [line_str.substr(ki + 1).trim()];
			}
			else {
				var v = [line_str.substr(ki + 1, vi - ki).trim(), line_str.substr(vi + 1).trim()];
			}
		}
		ret[k] = v;
	}
	return ret;
}

exports.paramsDecode = function (obj) {
	var ret = '';
	for (var i in obj) {
		var line = i;
		for (var j = 0, p; p = obj[i][j]; j++) {
			line += ' ' + p;
		}
		ret += line + '\n';
	}
	return ret;
}