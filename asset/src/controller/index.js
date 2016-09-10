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
					url : 'user/teacherServlet.do?flag=getRecommendTeachers',
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
				alert('ok');
			}
		});
		
		return View;
	})