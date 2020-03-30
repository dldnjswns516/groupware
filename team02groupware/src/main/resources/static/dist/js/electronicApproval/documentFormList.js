/*
 * @file documentFormList.js
 * @brief 양식함 관리 페이지 관련 js
 * @author 김건훈
 */


$(function(){

	 /*
	  * @brief 사내전자결재규정 물음표 아이콘 Modal Event
	  * @author 김건훈
	  */	
	$('.ik-help-circle').on('mouseover',function(e){
 
			var divLeft = e.pageX - 150
			var divTop = e.pageY - 50
			
			$('.ruletip').css({display:"block", "top": divTop, "left": divLeft});
		
		$(this).css("color","black");
	});
	
	$('.ik').on('mouseleave',function(){
		
		$('.ruletip').css("display","none");
		$(this).css("color","#bcc8d8");
	});
	
	
	/*
	  * @brief 검색창 드롭다운 검색키워드 변경 이벤트
	  * @author 김건훈
	  */	
	$('.dropdown-item').on('click',function(){
		//console.log('드롭다운버튼클릭');
		var searchType = $(this).text();
		var tag = "<i class=\"ik ik-chevron-down mr-0 align-middle\"></i>";
		//console.log(searchType);
		$(this).parent().siblings('.dropdown-toggle').text(searchType);
		$(this).parent().siblings('.dropdown-toggle').append(tag);
	});
	
	 /*
	  * @brief icheck plug-in 사용
	  * @author 김건훈
	  */

	$(".ea-icheck").iCheck({

		checkboxClass: 'icheckbox_square-blue'

	});
	 
	 //페이지 로딩 시 체크박스 체크 초기화
	$('#all-ea-checkbox,.ea-checkbox').iCheck('uncheck');
	
	 /*
	  * @brief 각각 체크박스 체크 이벤트
	  * @author 김건훈
	  */

	  $('.ea-checkbox').on('ifChecked', function(event){
		  //console.log('체크박스클릭');
		  var checkCount  = $('.ea-checkbox:checked').length;
		  //console.log(checkCount);
			  if(checkCount == 3){							
				 	 $('#all-ea-checkbox').iCheck('check');
			  }else{
				  	 $('#all-ea-checkbox').iCheck('uncheck');
			  }
			  
			  if(checkCount>0){
					$('.table-row-delete-nav').css('visibility','visible')
				}else{
					$('.table-row-delete-nav').css('visibility','hidden')
				}
		  });
	
	  $('.ea-checkbox').on('ifUnchecked', function(event){
		  //console.log('체크박스클릭');
		  var checkCount  = $('.ea-checkbox:checked').length;
		  //console.log(checkCount);
			  if(checkCount == 3){							
				 	 $('#all-ea-checkbox').iCheck('check');
			  }else{
				  	 $('#all-ea-checkbox').iCheck('uncheck');
			  }
			  
			  if(checkCount>0){
					$('.table-row-delete-nav').css('visibility','visible')
				}else{
					$('.table-row-delete-nav').css('visibility','hidden')
				}
		  });
	  
	 
	
	
	 /*
	  * @brief 전체 체크박스 체크 이벤트
	  * @author 김건훈
	  */
	  
	  $('#all-ea-checkbox').on('ifChecked', function(event){
		  
		  var checkCount  = $('.ea-checkbox:checked').length;
		  	 	
		  $('.ea-checkbox').iCheck('check');

	  });
	
		
	  $('#all-ea-checkbox').on('ifUnchecked', function(event){
		 
		  var checkCount  = $('.ea-checkbox:checked').length;
		  
		  if(checkCount == 3){
		 		
			  $('.ea-checkbox').iCheck('uncheck');
		  }
	  });
	  
	  
	  /*
	   * @brief 사내 전자결재 수정 form 전환 Event
	   * @author 김건훈
	   */
	   $('.ea-rule-update-btn').on('click',function(){
		   //console.log('사내전자 결재 수정 버튼 클릭')
		   $('.ea-rule-update-after').css('display','block');
		   $('.ea-rule-update-btn-after').css('display','block');
		   
		   $('.ea-rule-update-before').css('display','none');
		   $('.ea-rule-update-btn-before').css('display','none');
		   
		   var eaRuleContents = $('#ea-rule-contents').html();
		   //console.log(eaRuleContents);
		   $('#ea-rule-update-summernote').summernote('code',eaRuleContents);
	   });
	  
	   $('.ea-rule-cancel-btn').on('click',function(){
		   //console.log('사내전자 결재 수정 취소 버튼 클릭')
		   $('.ea-rule-update-after').css('display','none');
		   $('.ea-rule-update-btn-after').css('display','none');
		   
		   $('.ea-rule-update-before').css('display','block');
		   $('.ea-rule-update-btn-before').css('display','block');
		   
		   $('#ea-rule-update-summernote').summernote('reset');
		   
	   });
	   
	   
	   /*
	    * @brief 사내 전자결재 수정 완료 Event
	    * @author 김건훈
	    */
	    $('#ea-rule-update-submit-btn').on('click',function(){
	    	//console.log('수정완료 버튼 클릭')
	    	var eaRuleVal=$('#ea-rule-update-summernote').val();
	    	//console.log(eaRuleVal);
	    	
	    	      var request = $.ajax({
				    url: "/ajaxUpdateEaRule",
				    method: "POST",
				    data: {eaRuleVal : eaRuleVal},
				    dataType: "json"
				  });
				   
				  request.done(function(data) {
				  	//console.log(data.result);
					 $('.ea-rule-update-before').css('display','block');
					 $('.ea-rule-update-btn-before').css('display','block');
					 $('.ea-rule-update-after').css('display','none');
					 $('.ea-rule-update-btn-after').css('display','none');
					 $('#ea-rule-contents').html(eaRuleVal);
					 $('#ea-rule-update-summernote').summernote('reset');
					 
					 swal({
						 title: "수정되었습니다.",
						 text: "규정이 수정되었습니다.",
						 icon: "success"
						});
				  });
				   
				  
				  request.fail(function( jqXHR, textStatus ) {
				    alert( "Request failed: " + textStatus );
				  });  
	    });   
		   
		   
	   /*
	   * @brief 사내 전자결재 수정 화면 summernote plug-in 사용
	   * @author 김건훈
	   */
	   $('#ea-rule-update-summernote').summernote({   
             height: 300,                 
             minHeight: null,             
             maxHeight: null,             
             focus: true,      
             lang: "ko-KR",
             popover: {
                 image: [],
                 link: [],
                 air: []
               },
             toolbar: [
                    ['style', ['bold', 'italic', 'underline']],
                    ['font', ['strikethrough']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['paragraph']],
                    ['height', ['height']],
                    ['Insert', ['picture']],
                    ['Insert', ['link']],
                    ['table', ['table']]
                	   ]   
     });
	   
	   
	    /*
		 * @brief 문서 분류 삭제 Event
		 * @author 김건훈
		 */
	    
		var deleteDocumentFormTypeFn = function(){
			//console.log('분류삭제');	
			swal({
                title: "선택한 분류를 삭제하시겠습니까?",
                text: "해당 분류를 삭제하시면 기존 분류의 해당하는 문서 양식은 \"공통\" 분류로 지정됩니다. 계속하시겠습니까?",
                icon: "warning",
                buttons: ["취소", "삭제"],
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                	//console.log('삭제처리')
                	var deleteFormTypeCode=$(this).parents('span').siblings('.document-form-type-name').attr('value');
                	//console.log(deleteFormTypeCode);
                	//$(this).parents('.document-form-type-li').remove();
                	var documentFormTypeLi=$(this).parents('.document-form-type-li');
                	var request = $.ajax({
        			    url: "/ajaxDeleteDocumentFormType",
        			    method: "POST",
        			    data: {deleteFormTypeCode : deleteFormTypeCode},
        			    dataType: "json"
        			  	});
        			   
        			   request.done(function(data) {	
        				   //console.log('문서양식 분류 삭제완료');
        				   //console.log(data.result);
        				   documentFormTypeLi.remove();
        				   swal({
                               title: "삭제되었습니다.",
                               text: "선택한 분류가 삭제되었습니다.",
                               icon: "success",
                           });
        			   });
        			   
        			  
        			   request.fail(function( jqXHR, textStatus ) {
        			    alert( "Request failed: " + textStatus );
        			   }); 

                   
                } else {
                    swal("삭제가 취소되었습니다.");
                }
            });
		}
		$('.document-form-type-li').find('.ik-trash-2').on('click', deleteDocumentFormTypeFn);
		/*
		 * @brief 문서 분류 수정 Event
		 * @author 김건훈
		 */
		var updateDocumentFormLi=null;
		var updateDocumentFormName=null;
		var updateDocumentFormCode=null;
		var updateDocumentFormBtn=null;
		
		var updateDocumentFormTypeFn = function(){
			//console.log('분류수정');
			if($('.update-document-form-input').length>0){
				var updateDocumentFormInputVal = $('.update-document-form-input').val();
				$('.update-document-form-input').replaceWith('<span class="document-form-type-name" value="'+updateDocumentFormCode+'">'+updateDocumentFormInputVal+'</span>');
				updateDocumentFormBtn.css('display','block');
				
				
				if(updateDocumentFormName!=updateDocumentFormInputVal&&updateDocumentFormInputVal!=''){
					var request = $.ajax({
						url: "/ajaxUpdateDocumentFormType",
						method: "POST",
						data: {	updateDocumentFormCode : updateDocumentFormCode,
							updateDocumentFormInputVal : updateDocumentFormInputVal
							  },
						dataType: "json"
					});
					
					request.done(function(data) {
						console.log(data.result);
						  swal({
							   title: "수정되었습니다.",
							   text: "문서 분류가 수정 되었습니다.",
							   icon: "success"
						   });
					});
					
					
					request.fail(function( jqXHR, textStatus ) {
						alert( "Request failed: " + textStatus );
					}); 
				}
				
				
			}
			
			updateDocumentFormLi=$(this).closest('.document-form-type-li').find('.document-form-type-name')
			updateDocumentFormName=updateDocumentFormLi.text();
			updateDocumentFormCode=updateDocumentFormLi.attr('value');
			updateDocumentFormBtn=$(this).closest('.document-form-type-li').find('.document-form-type-update-delete-btn');
			updateDocumentFormDoneBtn=$(this).closest('.document-form-type-li').find('.document-form-type-update-done-btn');
			if($('.update-document-form-input').length==0){
				updateDocumentFormLi.replaceWith('<input type="text" id="'+updateDocumentFormCode+'" class="update-document-form-input" style="width:70%" value="'+updateDocumentFormName+'">');
				updateDocumentFormBtn.css('display','none');
				
			}
		}
		$('.document-form-type-li').find('.ik-edit').on('click', updateDocumentFormTypeFn);
		/*
		 * @brief 문서 분류 추가 Event
		 * @author 김건훈
		 */
	   	var insertDocumentFormTypeFn=function(){
	   	   
		   	var inputDocumentFormTypeVal=$('#add-document-form-type-input').val();
		   
			   var request = $.ajax({
			    url: "/ajaxInsertDocumentFormType",
			    method: "POST",
			    data: {inputDocumentFormTypeVal : inputDocumentFormTypeVal},
			    dataType: "json"
			  	});
			   
			   request.done(function(data) {
			   //console.log(data.result);
			   if(data.result==0){
				   //console.log(inputDocumentFormTypeVal);
				   swal({
					   title: "중복된 분류명입니다.",
					   text: "["+inputDocumentFormTypeVal+"]"+" 은(는) 중복된 분류명입니다.",
					   icon: "error"
				   });
				   
			   }else{
				   //console.log(data.formTypeCode);
				   var documentFormTypeLi = $('.document-form-type-clone:last').clone();
				   //console.log(documentFormTypeLi)
				   
				   documentFormTypeLi.find('.document-form-type-name').text(inputDocumentFormTypeVal);
				   documentFormTypeLi.find('.document-form-type-name').attr('value',data.formTypeCode);
				   documentFormTypeLi.css('display','block');
				   documentFormTypeLi.appendTo('.document-form-type-ul');
				   
				   documentFormTypeLi.find('.ik-edit').click(updateDocumentFormTypeFn);				   
				   documentFormTypeLi.find('.ik-trash-2').click(deleteDocumentFormTypeFn);
				   
				   swal({
					   title: "추가되었습니다.",
					   text: "문서 분류가 추가되었습니다.",
					   icon: "success"
				   });
				   
				   $('#add-document-form-type-input').val('');
			   }
			   
			   });
			   
			  
			   request.fail(function( jqXHR, textStatus ) {
			    alert( "Request failed: " + textStatus );
			   });   
	   } 

	   
	    $('#add-document-form-type-btn').on('click',function(){
	    	//console.log('분류 추가버튼')
	    	var inputDocumentFormTypeVal=$('#add-document-form-type-input').val();
		   	if(inputDocumentFormTypeVal!=''){
		   		insertDocumentFormTypeFn();
		   }
	    });
	 
	   
	    $('#add-document-form-type-input').keyup(function(key) {
	    	if (key.keyCode == 13 && $(this).val()!='') {
	    		insertDocumentFormTypeFn();
	    	}
	    });

});