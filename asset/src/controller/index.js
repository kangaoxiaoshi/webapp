define([
	'pageView',
	'text!indexHtml'
	], function (
		pageView,
		template
	) {
		
		var View = pageView.extend({
			onCreate: function () {
				var html = this.template(template, {});
				this.$el.html(html);
			},

			events: {
				'click .js-alert': 'alertAction'
			},
			ajax: function  () {
				var obj = {
					//http://120.24.1.97/shibufangcao/student/projectServlet.do?flag=u
					url : 'user/teacherServlet.do?flag=getTeacherList',
					//url: 'shibufangcao/student/projectServlet.do?flag=uploadPicture',
					data: {
						pageNum: 1,
						pageSize: 10
					}
				}
				return obj;
			},
			onShow: function (data) {
				
			},
			alertAction: function () {
				app.goTo('teacher/index');
			}
		});
		
		return View;
	})