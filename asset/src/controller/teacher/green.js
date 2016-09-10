define([
	'pageView',
	'text!teacherGreenHtml'
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
		
			onShow: function (data) {
				
			},
			alertAction: function () {
				alert('ok');
			}
		});
		
		return View;
	})