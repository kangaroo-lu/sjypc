var host = "http://192.168.3.250:8090/sjy-open-web/";
var filehost = "http://192.168.3.251/";
var orderType = '';//筛选类型,价格，销量
var up = 'Asc';
var down = 'Desc';
var filter_sales = 'sales_num';//销量
var filter_price = 'price';//价格


shopcarnum();

idhover();
/*****************************注销***********************************/
$('.signout').on('click',function(){
	sessionStorage.removeItem('acc');
	window.location.reload();
})
$('.signout a').on('click',function(){
	sessionStorage.removeItem('acc');
	window.location.reload();
})
/****************************上传头像***********************************/


$(".headimg").on('click',function(){
	var imgmod = artModal({
		element:document.getElementById("imgupMod"),
		close:function(){
			$("#ipt").css("display","block");
			$('.canvas-box').css("display","none");
		}
	})
	imgmod.open();
})
$("#ipt").on('click',function(){
	$(".bbox").css("height","auto");
	$(".bbox").css("width","500px");
	$("#upload").css("display","none");
	$('.canvas-box').css("display","block");
})

/*************************获取登录信息******************************/
//function getmyinfo(){
	if(sessionStorage.getItem("acc")){
		var acc = sessionStorage.getItem("acc");
		acc = JSON.parse(acc);
		console.log(acc);
		$('.lbox').css("display","none");

		if(!acc.nickName){
			$('.usernickname').html(acc.name);
			$('.myUserid').html(acc.name);
		}else{
			$('.usernickname').html(acc.nickName);
			$('.myUserid').html(acc.nickName);
		}
	}
	if(!sessionStorage.getItem("acc")){
		$('.topbar-info').css("display","none");
		$('.lbox').css("display","inline-block !important");

	}
//}


/**********************图片懒加载***********************/


function loadimg(){
	var aImages = document.getElementsByClassName('mainbox')[0].getElementsByTagName('img'); //获取文档内所有的图片
			loadImg(aImages);
			window.onscroll = function() {  //滚动条滚动触发
				loadImg(aImages);
			};
			//getBoundingClientRect  懒加载的核心
			function loadImg(arr) {
				for(var i = 0, len = arr.length; i < len; i++) {
					if(arr[i].getBoundingClientRect().top < document.documentElement.clientHeight && !arr[i].isLoad) {
						arr[i].isLoad = true; //图片显示标志位
						//arr[i].style.cssText = "opacity: 0;";  
						(function(i) {
							setTimeout(function() {
								if(arr[i].dataset) { //兼容不支持data的浏览器
									aftLoadImg(arr[i], arr[i].dataset.imgurl);
								} else {
									aftLoadImg(arr[i], arr[i].getAttribute("data-imgurl"));
								}
								arr[i].style.cssText = "transition: 1s; opacity: 1;" //相当于fadein
							}, 500)
						})(i);
					}
				}
			}

			function aftLoadImg(obj, url) {
				var oImg = new Image();
				oImg.onload = function() {
					obj.src = oImg.src; //下载完成后将该图片赋给目标obj目标对象
				}
				oImg.src = url; //oImg对象先下载该图像
			}
}

function idhover(){
	var plist = $('.userdrow');
	var product = $('.myUserid');
	var conter = function(name){
	//	console.log(this)
		this.fun = function(){
			name.each(function(index,domele){
				var $domele = $(domele);
				$domele.mouseover(function(){
	//				console.log($domele);
					if(($domele.attr("id"))=="muid"){

						product.css("background","url(../img/个人中心下.png)86% center no-repeat");
						product.css("background-size","15px"); 
						
						plist.css("display","block");
					}
					$1 = $(plist[index]);
	//				console.log($1);
					$1.show();
				})
				$(plist[index]).mouseout(function(){
	//				console.log($domele);
	//				$1.hide();
					$('.myUserid').css("background","url(../img/个人中心上.png)86% center no-repeat");
					$('.myUserid').css("background-size","15px"); 
					$(plist[index]).hide();
					
				})
			})
		}
	}
	var ms = new conter(plist);
	var ls = new conter(product);
	ms.fun();
	ls.fun();
}
/**************************获取购物车数量************************/
function shopcarnum(){
	var acc = sessionStorage.getItem('acc');
	acc= JSON.parse(acc)
	$.get(host+"api/goods/cart/list?uid="+acc.memberId,function(res){
//		console.log(res);
		if(res.datas.count == 0){
			$('.car_mini_num').html("(0)");
		}else{
			$('.car_mini_num').html('('+res.datas.data.length+')');
		}
		
	})
}
/***********************************领券************************************/
function getmyvou(el){
//	console.log(el.attr('id'));
	if(acc){
		var vouId = el.attr('id');
		var param ={
			memberId:acc.memberId,
			voucherId:vouId
		}
		$.ajax({
			type:"post",
			url:host+"api/voucher/receive",
			async:true,
			data:JSON.stringify(param),
			dataType:"json",
			headers: {
							'Content-Type': 'application/json'
						},
			success:function(res){
//				console.log(res);
				if(res.datas == true){
					artMessage({
						message:res.stateDesc+",优惠券可在个人中心——我的优惠券查看",
						type:'success',
						duration:2,
						mask:true
					})
				}else if(res.datas == false){
					artMessage({
						message:res.stateDesc,
						type:'warn',
						duration:1.5,
						mask:true
					})
				}
				
			}
		});
	}else{
		artMessage({
			message:'请登录再领券',
			type:'warn',
			duration:1.5,
			mask:true
		})
	}
	
}
/********************获取优惠券数量******************/
$.get(host+"api/memberVoucher/count/"+acc.memberId,function(res){

	$('#youhuiquan').html("优惠券("+res.datas.notUsed+")");
})


