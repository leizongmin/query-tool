window.bmtool = {
	main: function () {
		var value = document.getSelection().toString();
		var url = '{{query_page}}?v=' + escape(value);
		// 如果是框架网页，则弹出新窗口
		if ($('frameset').length > 0) {
			window.open(url,'__bmt_win_','toolbar=0,resizable=1,scrollbars=1,status=1,width=500,height=400');
		}
		else {
			bmtool.innerOpen(url);
		}
	},
	//-----------------------------------------------
	/* 加载jQuery库 */
	loadJquery: function () {
		var s=document.createElement("script");
		s.src="http://lib.sinaapp.com/js/jquery/1.5.2/jquery.min.js";
		document.body.appendChild(s);
		s.onload = bmtool.main;
	},
	/* 创建内嵌的iframe来打开网页 */
	innerOpen: function (url) {
		var $__bmt_ifrm_ = $('#__bmt_ifrm_');
		var $window = $(window);
		
		// 如果首次创建窗口，则注册事件
		if ($__bmt_ifrm_.length < 1) {
			// 主窗口
			var html = '<div id="__bmt_ifrm_" style="position:fixed; background-color:#FFFFF8; border:1px solid #002184; box-shadow:3px 3px 12px 0px #002184; width:450px; text-align:center; z-index:99999; opacity:1;">' +
						'<div id="__bmt_ifrm_title" style="height:20px; background-color:#002184; color:#FFFFF8; cursor:move;">' +
						'<div style="float:left;">快捷查询</div><div style="float:right;"><button onclick="$(\'#__bmt_ifrm_\').hide();">X</button></div></div>' +
						'<iframe src="about:blank" width="440" height="400"></iframe></div>';
			$(document.body).append(html);
			var $__bmt_ifrm_ = $('#__bmt_ifrm_');
			
			// 注册事件
			var isMouseDown = false;		// 是否在标题栏上按下鼠标
			var mouseCenterPointer = {};	// 按下鼠标时的鼠标位置
			$('#__bmt_ifrm_title').mousedown(function (e) {
				isMouseDown = true;
				mouseCenterPointer = { x: e.clientX,	y: e.clientY }
			});
			$(document).mouseup(function () {
				isMouseDown = false;
				$__bmt_ifrm_.css({ opacity: 1 });
			})
			// 开始移动
			.mousemove(function (e) {
				if (isMouseDown) {
					var offset = {
						x: e.clientX - mouseCenterPointer.x,
						y: e.clientY - mouseCenterPointer.y
					}
					var pos = $__bmt_ifrm_.offset();
					$__bmt_ifrm_.css({
						top: 		pos.top + offset.y,
						left:		pos.left + offset.x,
						opacity:	0.6
					});
						
					isMouseDown = true;
					mouseCenterPointer = { x: e.clientX,	y: e.clientY }
				}
			});
		}
		
		// 打开页面并居中显示
		$('iframe', $__bmt_ifrm_).attr('src', url);
		var winpos = {
			top:	($window.height() - 500) / 2,
			left:	($window.width() - 450) / 2
			}
		if (winpos.top < 1)	winpos.top = 1;
		$__bmt_ifrm_.css(winpos).show();
	}
}

bmtool.loadJquery();