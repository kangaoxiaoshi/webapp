define([
	'pageView',
	'text!teacherIndexHtml',
	'text!teachermoreHtml'
	], function (
		pageView,
		template,
		mtemplate
	) {
		
		var View = pageView.extend({
			onCreate: function () {
				this.pageSize = 10;
				this.pageNum =1;
				this.pageTecNum = 1;
				this.pageTecSize = 4;
				this.latstSize = void 0;
			},

			events: {
				'click .js-more': 'moreAction',
				'click .js-teacher': 'teacherAction'
			},
			ajax: function  () {
				// 最新导师
				var obj = {
					url: 'user/teacherServlet.do?flag=getTeacherList2_2_1',
					data: {
						"pageNum": this.pageTecNum,
						"pageSize": this.pageTecSize
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
				//var  pageTemplage = this.query.teacher == 1 ? template1 : template;
				var html = this.template(template, {
					defaults: defaults.teacherList,
					relative: relative.teacherList,
					recommended: recommended.teacherList,
					isteacher: this.query.teacher
				});
				this.$el.html(html);
				this.latstSize = defaults.teacherList.length;
			},
			moreAction: function () {
				if (this.latstSize !== this.pageTecSize) {
					app.hint('已经没有更多导师');
					return;
				}
				var self = this;
				this.pageTecNum ++ ;
				app.ajax({
					url: 'user/teacherServlet.do?flag=getTeacherList2_2_1',
					data: {
						"pageNum": this.pageTecNum,
						"pageSize": this.pageTecSize
					},
					success: function (data) {
						//加载更多显示
						self.latstSize =  data.teacherList.length;
						if (data.teacherList.length) {
							var html = self.template(mtemplate, {
								defaults: data.teacherList
							});
							self.$('.js-more-wrap').append(html);

						} else {
							app.hint('已经没有更多导师');
							return;
						}
					}
				});
			},
			teacherAction: function (e) {
				var target = $(e.currentTarget);
				var id = target.data("id");
				if (id) {
					var url = 'teacher/detail?id=' + id;
					if (this.query.teacher) {
						url += '&teacher=1';
					}
					app.goTo(url);
				}
			}
		});
		
		return View;
	})