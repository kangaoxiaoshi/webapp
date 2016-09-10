define([
	'pageView',
	'text!teacherIndexHtml'
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
				'click .js-go': 'goAction'
			},
		
			onShow: function (data) {
				
			},
			goAction: function () {
				debugger;
				app.goTo('teacher/index');
			}
		});
		
		return View;
	})