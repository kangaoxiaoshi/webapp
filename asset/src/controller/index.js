define([
	'pageView',
	'text!teacherIndexHtml'
	], function (
		pageView,
		template
	) {
		
		var View = pageView.extend({
			onCreate: function () {
				this.pageSize = 10;
				this.pageNum =1;
			},

			events: {
				'click .js-alert': 'alertAction'
			},
			ajax: function  () {
				// 最新导师
				var obj = {
					url: 'user/teacherServlet.do?flag=getTeacherList2_2_1',
					data: {
						"pageNum": this.pageNum,
						"pageSize": this.pageSize
					}
				};
				//和我相关
				var obj1 =  {
					url: 'user/teacherServlet.do?flag=getRelatedTeachers2_2_1',
					data: {
						"pageNum": this.pageNum,
						"pageSize": this.pageSize
					}
				}
				//为您推荐
				var obj2 = {
					url: 'student/teacherServlet.do?flag=getRecommendTeachers',
					data: {
						"pageNum": this.pageNum,
						"pageSize": this.pageSize
					}
				}
				return [obj, obj1, obj2];
			},
			onShow: function (defaults, relative, recommended) {
				var html = this.template(template, {
					defaults: defaults.teacherList,
					relative: relative.teacherList,
					recommended: recommended.teacherList
				});
				this.$el.html(html);
			},
			alertAction: function () {
				app.goTo('teacher/index');
			}
		});
		
		return View;
	})