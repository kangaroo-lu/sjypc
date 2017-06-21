

loadswipe();
loadvoucher();
loadnav();
loadhot();
loadimg();


/*********************轮播*****************/
function loadswipe(){
	$.get(host+'/api/carousel/carouselList/1',function(str){
//	console.log(str);
	var imghtml= '';
	var trihtml = '';
	for(var k in str.datas){
		var carouse = str.datas[k].carouselImg;
		
		
		if(k==0){
			imghtml+='<li class="main-item cur"><img src="'+filehost+carouse+'"/></li>';
			trihtml+='<i class="trigger-item active"></i>';
		}else{
			imghtml+='<li class="main-item"><img src="'+filehost+carouse+'"/></li>';
			trihtml+='<i class="trigger-item"></i>';
		}
		
	}
	
	$('.main-carousel').html(imghtml);
	$('.main-trigger').html(trihtml);
	var _a = window.Ajuan || window.jQuery || window.Zepto;
        _a('#rightswipe').AjuanCarousel({
            mode:'custom',
            custom:{
                active:'cur'
            },
            trigger:{
                triEleName:'.main-trigger'
            },
            btn:{
                prevEleName:'.prev-btn',
                nextEleName:'.next-btn'
            }
        });
})
}

/*×××××××××××××××××××××××××优惠券×××××××××××××××××××××××××××××××*/
function loadvoucher(){
	$.get(host+"api/voucher/list",function(str){
	console.log(str);
	var data = str.datas;
	var quanhtml = '';
	for(var k = 0;k<data.length;k++){
		quanhtml+='<div  class="quan" style="text-align: center;position: relative; float: left;background: #ef885a;"><div style="position: absolute;right: 0; width: 0; height: 0; border-top: 35px solid #fbe8df; border-left: 35px solid transparent;color: #f66525;text-align: center;"><span style="position:absolute;top: -35px;right: 0;">券</span></div><span style="width: 100%;margin-top: 16px; color: #fff;font-size: 20px;display: block;">满'+data[k].faceValue+'元使用</span><div style="width: 100%;height: 80px;line-height: 80px; text-align: center;"><span style="font-size: 20px;color: #fff;">￥</span><span style="font-size: 80px;color: #fff;">'+data[k].minPrice+'</span></div><div id="'+data[k].voucherId+'" onclick="getmyvou($(this))"  class="lquan" style="width: 160px;text-align: center;border-radius:15px;height: 30px;line-height: 30px; background: #FFFFFF;margin: 0 auto; color: #ef885a;cursor: pointer;font-size: 20px;">点击领取</div></div>';
	}
	$('#kongquan').append(quanhtml);
})
}

//http://192.168.3.250:8090/sjy-open-web/shopping/category/-1
/******************************轮播左侧导航*******************************/


function loadnav(){
		$.get(host+'/shopping/category/-1',function(str){
	//	console.log(str);
		var namehtml = '';
	
		
		for(var k in str.datas){
			var childhtml = '';
			var data = str.datas[k];
			var dname = data.name;
			namehtml+='<li  class="banner_menu_wrap_li" style="position: relative;line-height: 60px !important;"><img  src="img/虫草.png" style="position: absolute;margin: auto;top: 0;left: 10px;right: 170px;bottom: 0;"/><a id="'+data.id+'" class="dalei" style="margin-left: 60px;">'+dname+'</a><a class="banner_menu_i">></a><div class="banner_menu_content" style="width: 600px;"><ul class="banner_menu_content_ul">';
	
	/********************子类同步请求*****************************/
				$.ajax({
					type:"get",
					url:host+'/shopping/category/'+data.id,
					async:false,
					success:function(res){
						for(var m in res.datas){
	//				
							var resdata = res.datas[m];
							var xname = resdata.name;
							childhtml+='<li><a href="" id="'+resdata.id+'" >'+xname+'</a></li>';
						}
					}
				});
			
	//		alert(childhtml);
			namehtml+=childhtml+'</ul></div></li>';
			
		}
		$('.banner_menu_wrap').html(namehtml);
	
		var cId = document.getElementsByClassName('dalei');
		var shtml = '';
		var xshtml = '';
		
		for(var k = 0;k<cId.length;k++){
	//		console.log(cId[k].innerHTML);
			shtml+='<div class="hf_five"><div class="hfo_title"><span class="hfot_span">'+cId[k].innerHTML+'</span><div class="checkMore"><span class="morespan"><a href="html/fenlei.html">查看更多</a></span><img src="img/更多.png"/></div></div><div class="hfo_body"><div class="hfob_left"><img data-imgurl="img/虫草左.png" src="" alt="" /></div><div class="hfob_right">';
			$.ajax({
					type:"get",
					url:host+"shopping/goods/listByCategory/"+cId[k].id+"/1/8",
					async:false,
					success:function(res){
	//					console.log(res);
						for(var i = 0;i<res.datas.data.length;i++){
	//						console.log(res.datas.data[i]);
							var data =res.datas.data[i];
							var name = data.name;
							var price = data.price;
							var picturea = data.picturea;
							var salename = data.salesName;
							var sale = data.salesNum;
							var grade = data.allGrade;
							var eva = data.evaluateNum;
							var id = data.id;
							xshtml+='<a href="html/detail.html?id='+id+'" id="'+id+'" class="hfobr_div"><div class="hfo_good_img"><img  data-imgurl="'+filehost+picturea+'" src=""/></div><span class="hfo_good_name">'+name+'</span><span class="hfo_good_secondname">'+salename+'</span><span class="hfo_goods_price"><span>￥</span><span class="pricenum">'+price+'</span></span><div class="hfo_sale_com"><div class="hfo_starDiv" data-score="'+grade+'"><span style="font-size: 12px; color: #333333;display: inline-block;float: right;" class="pinlunnum">('+eva+')</span></div><div class="sales">销量：<span>('+sale+')</span></div></div></a>';
						}
								
					}
				
			});
			shtml+=xshtml+'</div></div></div>';
			
	}
				
		$('.home_five').html(shtml);
		$('.hfo_starDiv').raty({
				readOnly:true,
				score: function() {
	        return $(this).attr('data-score');
	      }
		})
	})
}



/*×××××××××××××××××××××××××××热卖品×××××××××××××××××××××××××××××××××××*/

function loadhot(){
	$.get(host+'shopping/goods/list?start=1&size=10&order='+filter_sales+'&type='+up,function(str){
//	console.log(str);
	var html ='';
	for(var k in str.datas.data){
		var data = str.datas.data[k];
//		console.log(data);
		var name = data.name;
		var price = data.price;
		var picturea = data.picturea;
		var salename = data.salesName;
		var sale = data.salesNum;
		var grade = data.allGrade;
		var eva = data.evaluateNum;
		var id =data.id;
		html+='<li><a href="html/detail.html?id='+id+'" id="'+id+'"><div class="hhgc_img"><img src="" data-imgurl="'+filehost+picturea+'" /></div><span class="hhgc_goods_name">'+name+'</span><span class="hhgc_goods_secondName">'+salename+'</span><span class="hhgc_goods_price"><span>￥</span><span class="pricenum">'+price+'</span></span><div class="hhgc_sale_com"><div class="startDiv" data-score="'+grade+'"><span style="font-size: 12px; color: #333333;display: inline-block;float: right;" class="pinlunnum">('+eva+')</span></div><div class="sales">销量：<span>('+sale+')</span></div></div></a></li>';


	}
	$('.rexiao').html(html);
	$('.startDiv').raty({
			readOnly:true,
			score: function() {
        return $(this).attr('data-score');
      }
		})
})
}






