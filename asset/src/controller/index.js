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
				debugger;
				this.$el.html(html);
			},

			events: {
				'click .js-alert': 'alertAction'
			},
			alertAction: function () {
				alert('ok');
			}
		});
		
		return View;
	})