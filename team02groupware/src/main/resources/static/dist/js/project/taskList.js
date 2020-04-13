/*
 * 업무리스트 관련 제이쿼리
 * 김연지
 * */

$(function() {

	var projectCode = $('input[name="projectCode"]').val();
	
	
	// 업무 추가 - 엔터 키 복제 이벤트
	$(document).on('keydown','.tasklistTitle',function(key) {
				if (key.keyCode == 13) {
					console.log('새 업무만들기 클릭');
					// 업무 li 태그 복제
					var taskClone = $('.task-clone:first').clone(true);
					// 업무제목 선택
					var taskTitleInput = $(this);
					var nearDdlist = $(this).parent().siblings('.task-dd-list');
					var taskTitle = $(this).val();
					var tasklistCode = $(this).closest('.task-card-body').siblings('.task-card-header').find('.tasklist-code-input').val();
						console.log(taskTitle);
						console.log(projectCode);
						console.log(tasklistCode);
					if (taskTitleInput.val() != null
							&& taskTitleInput.val() != '') {
						
						var request = $.ajax({
							url: "/taskInsert",
							method: "POST",
							data: { 'projectCode' : projectCode
								,'tasklistCode': tasklistCode
								,'taskTitle' : taskTitle
							},
							dataType: "json"
						});
						
						request.done(function( data ) {
							taskClone.appendTo(nearDdlist);
							taskClone.css("display", "block");
							taskClone.find(".tasktitleClone").text(
									taskTitleInput.val());
							taskTitleInput.val('');
						});
						
						request.fail(function( jqXHR, textStatus ) {
							alert( "Request failed: " + textStatus );
						});
					}
				}
			})

	

	// 업무 추가 - 추가 버튼 클릭시 복제 이벤트
	$(document).on('click',	'.task-add-btn',function() {
				console.log('새 업무만들기 클릭');
				// 업무 li 태그 복제
				var taskClone = $(this).siblings('.task-dd-list').find("li:last")
						.clone();
				// 업무제목 선택
				var taskTitle = $(this).siblings('.task-form-group').find(
						'input[name="taskTitle"]:last');

				var nearDdlist = $(this).siblings('.task-dd-list');
				console.log(taskTitle.val());

				if (taskTitle.val() != null && taskTitle.val() != '') {
					taskClone.appendTo(nearDdlist);
					taskClone.css("display", "block");
					taskClone.find(".tasktitleClone").text(taskTitle.val());
					taskTitle.val('');
				}
			})

	// 업무 추가 input 취소 버튼 클릭시 value 공백
	$(".task-cancel-btn").click(function() {
				var taskTitle = $(this).siblings('.task-form-group').find(
						'input[name="taskTitle"]');
				taskTitle.val('');
			})

	// 업무리스트추가 버튼 클릭이벤트
	$(document).on('keydown','.tasklistName',function(key) {
				if (key.keyCode == 13) {
					var tasklistInput = $(this);
					var tasklistName = $(this).val();
					if (tasklistName != null
							&& tasklistName != '') {
						
						var request = $.ajax({
							url: "/tasklistInsert",
							method: "POST",
							data: { 'projectCode' : projectCode
								, 'tasklistName': tasklistName
							},
							dataType: "json"
						});
						
						request.done(function( data ) {
							var tasklistClone = $(".tasklist-clone:first").clone(true);
							
							tasklistClone.find('.tasklist-code-input').val(data.tasklistCode);

							
							tasklistClone.appendTo(".task-row");
							tasklistClone.css("display", "block");
							tasklistClone.find(".tasklistnameClone").text(
									tasklistName);
							tasklistInput.val('');
							$('.scroller-layout').animate({
								scrollLeft : $('.tasklistName').offset().left}, 1);
							
							
							console.log(projectCode);
							console.log(tasklistName);
							console.log(data);
							console.log(data.tasklistCode);
						});
						
						request.fail(function( jqXHR, textStatus ) {
							alert( "Request failed: " + textStatus );
						});
					}
				}
			})
	// 업무리스트이름 취소버튼 클릭시 input value 공백 처리
	$("#tasklist-cancel-btn").click(function() {
		var tasklistName = $('input[name="tasklistName"]:last');
		tasklistName.val('');
	})

	$(".back-btn").click(function() {
		location.href = "/projectList";
	})
});