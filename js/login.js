



$('.loginBtn').click(function(){
//	console.log($('#ac').val());
	
var param = {
			type:"1",
			signNo:$('#ac').val(),
			password:$('#pa').val(),
			grant_type:"PC"
		}
//alert(JSON.stringify(param));
		if($('#pa').val()){
			$.ajax({
					type:"post",
					url:host+"api/member/login",
					async:true,
					data:JSON.stringify(param),
					dataType:"json",
					cache: true,
					timeout: 30000, //超时时间设置为10秒；
					headers: {
						'Content-Type': 'application/json'
					},
				
					success:function(res){
						
						console.log(res);
						if(res.stateCode == 200){
							console.log(res);
							sessionStorage.setItem("acc",JSON.stringify(res.datas));
							if(history.length>1){
								window.history.go(-1);
							}else{
								window.location.href = "../index.html";
							}
						}else{
							$('.pas').css("display","block");
						}
						
					},error:function(err){
						console.log(err);
					}
				
			});
		}else{
			$('.pas').html("请输入密码").css("display","block");
		}
		
		
})

