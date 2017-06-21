var getUrlParam = function (name) {
         var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if (r != null) return decodeURI(r[2]); return null;
     }

var id=getUrlParam('id');
var pinjiaStart = 1;
var pinjiaSize = 5;
var code = '';
var sta = '';
var myModer1_1_obj = artModal({element:document.getElementById("myModal_1")});
window.onload= function(){
	askinfo();
	
	goodParam();
	pinjia();
	loadvou();
}

	

function loadvou(){
	
	$.get(host+"api/voucher/list",function(str){
		console.log(str);
		var data = str.datas;
		var quanhtml = '';
		for(var k =0;k<data.length;k++){
			
			quanhtml+='<p><span  onclick="getmyvou($(this))" id="'+data[k].voucherId+'" class="receive">领取</span>'+data[k].faceValue+'元优惠券，订单满'+data[k].minPrice+'元使用</p>';
		}
		$('.saleCoupon').html(quanhtml);
		
	})
}
function askinfo(){
	var infohtml = '';
	var imgsuolue = '';
	$.ajax({
		type:"get",
		url:host+"shopping/goods/detail/"+id,
		async:false,
		success:function(str){
					console.log(str);
		var data = str.datas;
		var eva = data.allEvaluateTime;//评论
		var gra = data.allGrade;//星级
		var goodimg = data.logo;
		var name = data.name;
		var price = data.price;
		var salename = data.salesName;
		var saleprice = data.salesPrice;
		var standard = data.standard;
		sta = data.standard;
		var salenum = data.salesNum;
		var detailimg = data.productStyleId;
		code = data.code;
		infohtml+='<strong class="mpname">'+name+'</strong><p class="ad">'+salename+'</p><div class="rate"><div class="starRate" data-score = "'+gra+'"></div><div class="sale"><a >（评价：'+eva+'）</a><span >销量</span><span >'+salenum+'</span></div></div><div class="activity"><p><span class="headline">原价格</span><span class="linethrough">￥'+price+'</span></p><p><span class="headline">促销价</span><span class="currentPrice">￥'+price+'</span></p><div class="coupon"><span class="headline pull-left">优惠活动</span><div class="pull-left saleCoupon"></div></div></div><div class="purchase"><p><span class="headline">商品规格</span><span class="norms">'+standard+'</span></p><div><span class="headline pull-left">选择数量</span><div class="pull-left operate"><div class="numCount"><div class="count minus"><img id="minusImg" src="../img/减号浅.png"></div><span class="num">1</span><div class="count plus"><img src="../img/加号.png"></div><div style="clear:both";></div></div><div style="clear:both";></div><div class="opeBtn"><div class="addCart" onclick="pushshopcar()" style="cursor: pointer;">加入购物车</div><div class="buy" style="cursor: pointer;"><a  style="color: #FFFFFF;">立即购买</a></div><div class="collect" onclick="collit()"><img id="collectimg" style="margin-right: 5px;" src="../img/sckh.png"/><span class="cohtml">收藏</span></div></div></div><p style="clear:both"><span class="headline">支付方式</span><a  class="aliPay"><img src="../img/支付宝.png"></a><a  class="weChatPay"><img src="../img/微信.png"></a></p><p class="package"><span class="headline">净重</span><span class="norms">200g</span></p><p><span class="headline">毛重</span><span class=norms">600g</span></p><p><span class="headline">包装尺寸</span><span class="norms">100cm × 100cm × 50cm</span></p></div>';
		$('.commentNav').html('<span>评价&nbsp;('+eva+')</span>');
		$('.comNum').html(''+eva+'');
		$('.graphicDetail').html(detailimg);
/**********************缩略图*********************/
		var logos = data.logos;
		for(var i =0;i<logos.length;i++){
//			console.log(logos[i]);
			imgsuolue+='<li><img src="'+filehost+logos[i]+'" /></li>';
		}
		$("#gallerySlide").html(imgsuolue);
		$("#gallerySmall").html('<span class="gallery_move" id="galleryMove"></span><img src="'+filehost+logos[0]+'" />');
		forgoodimg();
	

		$('.choice').html(infohtml);
		$('.starRate').raty({
			readOnly:true,
			starHalf:'../img/star-half.png',
			starOff:'../img/star-off.png',
			starOn: '../img/star-on.png',
			score: function() {
        return $(this).attr('data-score');
      }
		})
		}
		
		
		
	});

/*数量加减   ???*/
		var $minus=$('.minus');
		var $plus=$('.plus');
		var score=parseFloat($('.score').html());
//		addStar(score);
		
		//$minus.attr('disabled',true);
		
		$minus.click(function(){
			var $num=$('.num');
			var nm=parseInt($num.html());
			if(nm==1){
				$(this).attr('disabled',true);
				$('#minusImg').src='../img/减号浅.png';
			}
			else{
				nm--;
				$num.html(nm);
				var addparam = {
							uid:acc.memberId,
							goodsInformationId:id,
							quantity:nm,
							standard:sta,
							goodCode:code
						}
//				console.log(addparam);
				$.ajax({
					type:"post",
					url:host+"api/goods/cart/add",
					async:true,
					data:JSON.stringify(addparam),
								dataType:"json",
								headers: {
									'Content-Type': 'application/json',
									accessToken: acc.accessToken || ''
								},
								success:function(str){
									console.log(str);
									console.log(addparam);
								}
				});
			}
		})
		
		$plus.click(function(){
			var $num=$('.num');
			var nm=parseInt($num.html());
			nm++;
			if(nm>=2){
				$minus.removeAttr('disabled');
				$('#minusImg').src='../img/减号深.png';
			}
			$num.html(nm);
			var addparam = {
							uid:acc.memberId,
							goodsInformationId:id,
							quantity:nm,
							standard:sta,
							goodCode:code
						}
				console.log(addparam);
				$.ajax({
					type:"post",
					url:host+"api/goods/cart/add",
					async:true,
					data:JSON.stringify(addparam),
								dataType:"json",
								headers: {
									'Content-Type': 'application/json',
									accessToken: acc.accessToken || ''
								},
								success:function(str){
									console.log(str);
									console.log(addparam);
								}
				});
		})
		/*****************xiadan******************/
		
		$(".buy").on('click',function(){
			if(acc.memberId){
				var orderparam = '';
				var ids = [];
				ids.push(id);
				var param = {
					goodsInformationId:id,
					uid:acc.memberId,
					quantity:$('.num').html(),
					standard:$('.norms').html(),
					goodCode:code
				}


	$.ajax({
		type:"post",
		url:host+"api/goods/cart/add",
		async:true,
		data:JSON.stringify(param),
			dataType:"json",
			headers: {
							'Content-Type': 'application/json'
						},
			success:function(res){
					orderparam = {
											memberId:acc.memberId,
											productIds:ids,

										}
										console.log(orderparam);
					//					sessionStorage.removeItem("orderparam");
										var fromdetail = 1;
										sessionStorage.setItem("fromdetail",fromdetail);
										sessionStorage.setItem("orderparam",JSON.stringify(orderparam));
										window.location.href = "pushorder.html";
					}
	})
					

			}else{
				myModer1_1_obj.open();
			}
			
		})



}
function goodParam(){
	var paramhtml = '';
	$.get(host+"/api/productParam/get/"+id,function(str){
//		console.log(str);
		var data = str.datas;
		paramhtml = '<li>产品标准号：《中国药典》2015年版一部</li><li>厂名：'+data.factoryName+'</li><li>厂址：'+data.factoryAdd+'</li><li>联系方式: '+data.factoryPhone+'</li><li>配料表：'+data.material+'</li><li>储藏方法:'+data.storage+'</li><li>保质期：'+data.shelfLife+'</li><li>食品添加剂：'+data.additive+'</li><li>冬虫夏草产地：'+data.origin+'</li><li>净含量：'+data.netContent+'</li><li>包装方式：'+data.packing+'</li><li>滋补品大小：'+data.size+'</li><li>品牌：'+data.brand+'</li><li>系列：'+data.series+'</li><li>规格：'+data.standard+'</li><li>产地：中国大陆</li><li>省份：青海省</li><li>城市：玉树藏族自治州</li><li>特产品类：'+data.category+'</li><li>适用对象：全部适用</li>';
		$('.parameter').html(paramhtml);
		$('.produceDate').html('生产日期&nbsp;:&nbsp;'+data.productionDate+'');
	})
}
function pinjia(){
	var comli = '';
	var comlii= '';
	$.get(host+"shopping/record/"+id+"/product/page/"+pinjiaStart+"/"+pinjiaSize,function(str){
//		console.log(str);
		var data = str.datas.data;		
		for(var k = 0;k<data.length;k++){
//			console.log(data[k].priductImg);
			var gra = data[k].allGrade;
			var proimg = data[k].priductImg; //评价图片
			var evatime = data[k].evaluateDate; //评价日期
			var evaFace = data[k].evaluatePerFace; //用户头像
			var pSpec = data[k].productSpec; //产品规格
			var evatext = data[k].evaluateDesc;  //评价描述
			var username = data[k].evaluatePer; //用户名
			if(!username){
				username = 'sjy';
			}
			username = username.replace(/^(.).*(.)$/,"$1***$2");
			
			comli+='<li class="commentDetail"><div class="cd_body"><div class="user"><div class="userimg"><img src="'+filehost+evaFace+'" alt="" /></div><span class="username">'+username+'</span></div><div class="comdetail"><span class="comText">'+evatext+'</span><div class="comimgList">';
			for(var i =0;i<proimg.length;i++){
				comlii +='<div class="comimg"><img src="'+filehost+proimg[i]+'"/></div></div><span style="display: inline-block; font-size: 12px;margin-top: 30px; color: #666666;">规格：</span><span class="guige" style="font-size: 12px;margin-top: 30px; color: #666666;">'+pSpec+'</span><div class="comtime"><span class="comdetailTime">'+evatime+'</span></div></div></div><div style="clear: both;"></div>';
			}
			comli +=comlii + '</li>';
		}
		$('.pinjialiebiao').html(comli);
	})
		
	
}






/********************登录框关闭后清除input**********************/




$('.loginBtn').click(function(){
//	console.log($('#ac').val());
	
var param = {
			type:"1",
			signNo:$('.loginUser').val(),
			password:$('.loginPass').val(),
			grant_type:"PC"
		}

		if($('.loginPass').val()){
			$.ajax({
					type:"post",
					url:host+"api/member/login",
					async:false,
					data:JSON.stringify(param),
					dataType:"json",
					cache: false,
					timeout: 30000, //超时时间设置为10秒；
					headers: {
						'Content-Type': 'application/json'
					},
				
					success:function(res){
						
						console.log(res);
						if(res.stateCode == 200){
							console.log(res);
							sessionStorage.setItem("acc",JSON.stringify(res.datas));
							if(sessionStorage.getItem("acc")){
								var acc = sessionStorage.getItem("acc");
								acc = JSON.parse(acc);
								console.log(acc);
								$('.topbar-info').css("display","inline");
								$('.lbox').css("display","none");
								shopcarnum();
								if(!acc.nickName){
									$('.myUserid').html(acc.name);
								}else{
									$('.myUserid').html(acc.nickName);
								}
							}

//							pushshopcar();
							myModer1_1_obj.close();
							
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
			
//			$('.loginUser').attr("value","");
			$('.loginPass').attr("value","");
})

function pushshopcar(){
	var acc= '';
	if(sessionStorage.getItem("acc")){
		acc= sessionStorage.getItem("acc");
		acc= JSON.parse(acc);
		var param = {
			goodsInformationId:id,
			uid:acc.memberId,
			quantity:$('.num').html(),
			standard:$('.norms').html(),
			goodCode:code
		}

//	console.log(param);
	$.ajax({
		type:"post",
		url:host+"api/goods/cart/add",
		async:true,
		data:JSON.stringify(param),
			dataType:"json",
			headers: {
							'Content-Type': 'application/json'
						},
			success:function(res){
//				console.log(res);
				artMessage({
					message:'加入购物车成功',
					type:'success',
					duration:1.5,
					mask:true
				})
				$.get(host+"api/goods/cart/list?uid="+acc.memberId,function(res){
//					console.log(res);
//					console.log(acc.memberId);
					$('.car_mini_num').html('('+res.datas.data.length+')');
				})
			}
	});
	}else{
		
		myModer1_1_obj.open();
		
	}
	
}
function collit(){
	var src = document.getElementById('collectimg').src;
	var srcImgs = src.split("/");
	var srcImg = '';
	for(var i = 0;i<srcImgs.length;i++){
		if(i == srcImgs.length - 1){
			srcImg = srcImgs[i];
		}
	}
	var acc= '';
	if(sessionStorage.getItem("acc")){
		if(srcImg == "sckh.png"){
			document.getElementById('collectimg').src='../img/scsh.png';
			$('.cohtml').html("已收藏");
			acc= sessionStorage.getItem("acc");
			acc= JSON.parse(acc);
			var param = {
			mpId:id,
			memberId:acc.memberId,
			mpName:$('.mpname').html(),
			goodCode:code
		}

		console.log(param);
		$.ajax({
			type:"post",
			url:host+"api/biz/lememberCcolt/saveCollect",
			async:true,
			data:JSON.stringify(param),
				dataType:"json",
				headers: {
								'Content-Type': 'application/json'
							},
				success:function(res){
	//				console.log(res);
					artMessage({
						message:'收藏成功',
						type:'success',
						duration:1.5,
						mask:true
					})
					
					
				}
			});
		}
	}else{
		
		myModer1_1_obj.open();
		
	}
}



		