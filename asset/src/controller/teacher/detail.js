define([
	'pageView',
	'text!teacherDetailHtml',
	'text!moreCommentHtml',
	'text!moreProjectHtml',
	'ImageUpload'
	], function (
		pageView,
		template,
		comTemplage,
		proTemplate,
		ImageUpload
	) {
		
		var View = pageView.extend({
			onCreate: function () {
				this.pageNum = 1;
				this.pageSize = 10;
				//项目经历页面参数
				this.proPageNum =1;
				this.ProPageSize =5;
				this.prolastSize = void 0;
				//学生留言页面参数
				this.comPageNum =1;
				this.comPageSize =2;
				this.comlastSize = void 0;
				// 是否已经收藏
				this.isCollected = void 0;
			},

			events: {
				'click .js-more': 'moreAction',
				'click .js-close': 'closeAction',
				'click .js-moreComment': 'moreCommentAction',
				'click .js-mroeProjects': 'mroeProAction',
				'click .js-proDetail': 'detailAction',
				'change .js-upload': 'uploadAction',
				'click .js-mark': 'markAction',
				'click .js-login': 'loginAction'
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
						pageNum: this.comPageNum,
						pageSize: this.comPageSize 
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
				
				this.isCollected = data.isCollected;
				var html = this.template(template, {
					info: data,
					comments: data1.evaluations,
					projects: data2.projects
				});

				this.$el.html(html);
				this.prolastSize = data2.projects.length;
				this.comlastSize = data1.evaluations.length;
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
				var self = this;
				if (this.comlastSize < this.comPageSize) {
					app.hint('已经没有更多学生留言');
					return;
				}
				this.comPageNum++ ;
				app.ajax({
					url: 'user/teacherServlet.do?flag=getEvaluationList2_2_1',
					data: {
						teacherId: this.query.id,
						pageNum: this.comPageNum,
						pageSize: this.comPageSize 
					},
					success: function (data) {
						self.comlastSize = data.evaluations.length;

						var html = self.template(comTemplage, {
							comments: data.evaluations
						});
						self.$('.js-comments-wrap').append(html);
					}
				});
			},
			mroeProAction: function () {
				var self= this;
				if (this.prolastSize < this.ProPageSize) {
					app.hint('已经没有更多项目');
					return;
				}
				this.proPageNum++;
				app.ajax({
					url: 'user/teacherServlet.do?flag=getExperienceProjects2_2_1',
					data: {
						teacherId: this.query.id,
						pageNum: this.proPageNum,
						pageSize: this.ProPageSize 
					}, 
					success: function (data) {
						self.prolastSize = data.projects.length;

						var html = self.template(proTemplate, {
							projects: data.projects
						});

						self.$('.js-projects-wrap').append(html);
					}
				});
			},
			detailAction: function (e) {
				var target = $(e.currentTarget)
				var id = target.data('id');
				if (id) {
					//链接到时候给了直接配置
					//app.goTo()
				}
			},
			uploadAction: function (e) {
				if (!this.query.teacher) {
					return;
				}
				var self = this,
						target =e.currentTarget,
						file = target.files[0];

				if (file) {
					var options = {
			  //url: config.gateway +'student/projectServlet.do?flag=uploadPicture',
			  url: config.gateway +'teacher/teacherServlet.do?flag=uploadTeacherBg2_2_1',
			  quality: 0.8, //图片质量限制
			  data: {},
			  onUpload: function (result) {            
			   if (result && result.picUrl) {
				
					self.$('.js-background').css('background-image', 'url(' + result.picUrl + ')' );
			   }
			  },
				onError:onError 
			};
			//出错处理       
			function onError() {
			};
			new ImageUpload (file, options);
				}
			},
			markAction: function () {
				var self =this;
				app.ajax({
					url: 'student/studentServlet.do?flag=collectTeacher',
					data: {
						teacherId: this.query.id,
						type: this.isCollected ? 2 : 1
					},
					success: function (data) {
						if (data.stateCode) {
							if (self.isCollected) {
								// 前收藏点击取消收藏
								self.$('.js-love').removeClass('active');
							} else {
								self.$('.js-love').addClass('active');
							}
						}
					}
				});
				// app.ajax({
				// 	url: 'student/seekEluationServlet.do?flag=deleteProject2_2_1&projectId=1',
				// 	data: {},
				// 	success: function (data) {

				// 	}
				// })
			},
			loginAction: function () {
				app.ajax({
					url: 'student/loginRegisterServlet.do?flag=login',
					data: {
						'UserName': '18318300811',
						'Password': '12345678' 
					},
					success: function (data, status, xhr) {
						debugger;
					}
				})
			}
			
		});
		
		return View;
	})