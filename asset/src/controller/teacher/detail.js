define([
	'pageView',
	'text!teacherDetailHtml'
	], function (
		pageView,
		template
	) {
		
		var View = pageView.extend({
			onCreate: function () {
				this.pageNum = 1;
				this.pageSize = 10;
				this.proPageNum =1;
				this.ProPageSize =5;
			},

			events: {
				'click .js-more': 'moreAction',
				'click .js-close': 'closeAction',
				'click .js-moreComment': 'moreCommentAction',
				'click .js-mroeProjects': 'mroeProAction',
				'click .js-proDetail': 'detailAction'
			},
			ajax: function () {
				var tecInfo = {
					url: 'user/teacherServlet.do?flag=getTeacherDetail2_2_1',
					data: {
						teacherId: this.query.id
					}
				};
				var stuMsg = {
					url: 'user/teacherServlet.do?flag=getEvaluationList2_2_1',
					data: {
						teacherId: this.query.id,
						pageNum: this.pageNum,
						pageSize: this.pageSize 
					}
				};
				var tecProjects = {
					url: 'user/teacherServlet.do?flag=getExperienceProjects2_2_1',
					data: {
						teacherId: this.query.id,
						pageNum: this.proPageNum,
						pageSize: this.ProPageSize 
					}
				}
				return [tecInfo, stuMsg, tecProjects];	
			},
			onShow: function (data, data1, data2) {
				var html = this.template(template, {
					info: data,
					comments: data1.evaluations,
					projects: data2.projects
				});
				this.$el.html(html);
			},
			moreAction: function (e) {
				var target = $(e.currentTarget);
				target.hide();
				this.$('.js-myinfo').show();
			},
			closeAction: function (e) {
				var target = $(e.currentTarget);
				target.hide();
				this.$('.js-myinfo').hide();
				this.$('.js-more').show();
			},
			moreCommentAction: function () {

			},
			mroeProAction: function () {

			},
			detailAction: function () {
				var target = $(e.currentTarget)
				var id = target.data('id');
				if (id) {
					
				}
			}
			
		});
		
		return View;
	})