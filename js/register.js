var phoneTest = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
var passTest = /^.*(?=.{6,16})(?=.*\d).*$/;
$('#phone').blur(function(){
	if(!phoneTest.test($('#phone').val())){
		$('.aboutph').css("display","inline").html("格式错误");
	}else{
		$('.aboutph').css("display","inline");
		$('.aboutph').html("<img src='../img/绿色勾.png'/>");
	}
})
$('.passfir').blur(function(){
	if(!passTest.test($('.passfir').val())){
		console.log(1234);
		$('.aboutpa').css("display","inline").html("格式错误");
	}else{
		$('.aboutpa').css("display","inline");
		$('.aboutpa').html("<img src='../img/绿色勾.png'/>");
	}
	if($('.passfir').val() !== $('.passaga').val()){
		$('.aboutpat').css("display","inline").html("密码不一致");
		$('.aboutpa').html("<img src='../img/叹号.png'/>");
	}else{
		$('.aboutpat').css("display","inline");
		$('.aboutpat').html("<img src='../img/绿色勾.png'/>");
	}
})
$('.passaga').focus(function(){
	if($('.passfir').val() !== $('.passaga').val()){
		$('.aboutpat').css("display","inline").html("密码不一致");
		$('.aboutpa').html("<img src='../img/叹号.png'/>");
	}else if(!(!$('.passaga').val())){
		$('.aboutpat').css("display","inline");
		$('.aboutpat').html("<img src='../img/绿色勾.png'/>");
	}
})
$('.passaga').blur(function(){
	if($('.passfir').val() !== $('.passaga').val()){
		$('.aboutpat').css("display","inline").html("密码不一致");
		$('.aboutpa').html("<img src='../img/叹号.png'/>");
	}else if(!(!$('.passaga').val())){
		$('.aboutpat').css("display","inline");
		$('.aboutpat').html("<img src='../img/绿色勾.png'/>");
	}
})
/***************验证码时间****************/
$(function() {
	$(".verifyBtn").click(function(){
		var param= {
			type:"zc",
			mobile:$('#phone').val()
		}
//		param = JSON.stringify(param);
		$.ajax({
			type:"post",
			url:host+"api/member/token",
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
				if(res.stateCode!==200){
					$('.aboutph').css("display","inline").html(res.stateDesc);
				}
			},
			error:function(err){
				console.log(err);
			}
		});
		$(".hidden_button span").text(120);
					$(this).hide();
					$(".hidden_button").show();
					var icount = 119;
					var time = setInterval(auto, 1000);

					function auto() {
						$(".hidden_button span").text(icount);
						icount--;
						if(icount == 0) {
							clearTimeout(time);
							$(".verifyBtn").show();
							$(".hidden_button").hide();
						}
					}
	})
})
/********************开始注册*************************/
$('.registerBtn').click(function(){
	if($('.verify').val()){
		var param = {
			verify:$('.verify').val(),
			mobile:$('#phone').val(),
			password:$('.passaga').val(),
			grant_type:"PC"
		}
		$.ajax({
			type:"post",
			url:host+"api/member/regedit",
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
			},error:function(err){
				console.log(err);
			}
		});
	}
})
