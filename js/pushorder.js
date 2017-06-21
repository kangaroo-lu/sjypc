var list = document.getElementsByClassName('list')[0];//获取订单列表
var li = list.getElementsByTagName('li');//获取所有订单
var phoneTest = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
var orderparam = sessionStorage.getItem("orderparam");



console.log(orderparam);
province();
loadorder();
//removecar();




function loadorder(){
	$.ajax({
	type:"post",
	url:host+"api/order/generate",
	async:true,
	data:orderparam,
	dataType:"json",
	headers: {
		'Content-Type': 'application/json',
		accessToken: acc.accessToken || ''
	},
	success:function(str){
		sessionStorage.setItem("pushdata",JSON.stringify(str));
		console.log(str);
		console.log(orderparam);
		var orderDetail = '';
		var order = str.datas.orderDetail;
		for(var k = 0;k<order.length;k++){
			orderDetail+='<li id="'+order[k].goodsInformationId+'" class="goodLi"><div class="goodCar_img"><img src="'+filehost+order[k].logo+'" alt="" /></div><div class="goodCar_info"><span class="goodCar_goodName">'+order[k].name+'</span><span class="goodCar_goodInfo">'+order[k].standard+'</span></div><div class="goodCar_goodPrice"><div class="pricebox"><span class="sybom">￥</span><span class="goodprice">'+order[k].price+'</span></div></div><div class="goodCar_numberchioce" ><div class="numberSelect" style="text-align: center;border: none;line-height: 34px;"><span class="numberor">'+order[k].quantity+'</span></div></div><div class="goodCar_countPrice" ><div class="pricebox"><span class="sybom">￥</span><span class="countprice"></span></div></div><div class="goodCar_realpay"><div class="pricebox"><span class="sybom">￥</span><span class="realpayPrice"></span></div></div></li>';
		}
		$('#list').html(orderDetail);
		$(".heji").html(str.datas.totalPrice);
		$(".zhonge").html(str.datas.payablePrice);
		$(".yunfei").html(str.datas.freightPayable);
		if(str.datas.memberDiscount == 1){
			$('.dengji').css("display","none");
			$('.dengjishu').css("display","none");
			$('.zhekou').css("display","none");
		}else{
			$('.dengji').css("display","inline-block");
			$('.dengjishu').css("display","inline");
			$('.zhekou').css("display","block");
		}
		$('.dengjishu').html(str.datas.memberAccountLevel);
		$('.zhekounum').html(str.datas.memberDiscount);
		
		
		/*******************单行小计***************************/
for(var k =0;k<li.length;k++){
	var dj = li[k].getElementsByClassName("goodprice")[0];
	var cp = li[k].getElementsByClassName('countprice')[0];
	var danjia = parseFloat(dj.innerHTML);
	var shuliang = li[k].getElementsByClassName('numberor')[0].innerHTML;
	var orderRealpay = li[k].getElementsByClassName('realpayPrice')[0];//订单实付价格
	var OrderPrice = parseFloat(danjia * shuliang);
	cp.innerHTML = OrderPrice.toFixed(2);
	orderRealpay.innerHTML  = OrderPrice.toFixed(2);
}
	}

	
	});
	
}
	



//var orderPrice = document.getElementsByClassName('countprice');//订单单条总价


//var heji = document.getElementsByClassName('heji')[0];//获取合计价格
//var vouCut = document.getElementsByClassName('youhuiquan')[0];//获取优惠券减免价格
//var yunfei = document.getElementsByClassName('yunfei')[0];//获取运费
//var canUsepoint = document.getElementsByClassName('yiyoujifen');//获取已有积分
//var jifenPrice = document.getElementsByClassName('jifenrmb');//积分抵扣价钱
//var jifen = document.getElementsByClassName('jifen');//可获得积分

var provinceId = '';
var cityId = '';
var countryId = '';
var dizhiId='';
var openfrom;
var isdefault;
var dizhiid = '';
$.get(host+"api/deliveryAddress/listDeliveryAddress/"+acc.memberId,function(res){
	console.log(res);
	var data = res.datas;
	var dizhihtml = '';
	var lihtml = '';
	if(data.length == 0){
		$('.isinfo').css("display","none");
		$('.addnewinfo').css("display","block");	
		openfrom = 1;//无地址
	}
	for(var k=0;k<data.length;k++){
//		console.log(data.length);
		console.log(data[k].isDefault);
		if(data[k].isDefault == 1){
//			console.log(data[k]);
			dizhihtml='<span style="display: inline-block;font-size: 14px;color: #333333;margin-top: 32px;">默认地址</span><span class="pbbl_changebtn" onclick="changeDefault(this)" id = "'+data[k].id+'">修改</span><p style="margin-top: 32px;font-size: 14px;"><span>收&nbsp;&nbsp;货&nbsp;&nbsp;&nbsp;人:</span><span class="username">'+data[k].name+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系方式：</span><span class="phonenumber">'+data[k].mobile+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系地址：</span><span class="contactAdress">'+data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address+'</span></p>';
			$('.reinfo').html('<span class="name" style="margin-right: 30px;">'+data[k].name+'</span><span class="shoujihaoma">'+data[k].mobile+'</span>');
			$('.readre').html(data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address);
		}
			lihtml += '<li onclick="choiceLi(this)" id = "'+data[k].id+'" style="width: 91%;border-radius: 2px;position: relative;margin-bottom: 10px; border: 1px solid #DFDFDF;padding: 24px; height: 110px;"><p style="margin-bottom: 12px;font-size: 12px;"><span style="letter-spacing: 0.34em;color: #666;">收货人：</span><span class = "na">'+data[k].name+'</span></p><p style="margin-bottom: 12px;font-size: 12px;"><span style="color: #666;">联系方式：</span><span class="mo">'+data[k].mobile+'</span></p><p style="font-size: 12px;"><span style="color: #666;display: inline-block;float: left;">收货地址：</span><span style="display: inline-block;float: right;width: 88%;" class="det">'+data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address+'</span></p></li>';
		
		$('.pbb_Lwrap').html(dizhihtml);
		$('.Addlist').html(lihtml);
	}
})



//省份级联城市
    function provinceToCity(cityId) {
        var province = document.getElementById("province");
        var index = province.selectedIndex;
        var pid = province.options[index].id;
        $.get(host+'api/deliveryAddress/toAddOrUpdateDeliveryAddress/' + pid,  function (ret) {
//      	console.log(ret);
            var city = ret.datas;
            var cityHtml = '';
            for (var i = 0; i < city.length; i++) {
                var id = city[i].id;
                var name = city[i].name;
                if (cityId != '' && id == cityId) {
                    cityHtml += '<option selected="selected" id=' + id + '>' + name + '</option>';
                } else {
                    cityHtml += '<option id=' + id + '>' + name + '</option>';
                }
            }
            $("#city").html(cityHtml);
            cityToDistrict(countryId);
        })
    }

	//城市级联区县
    function cityToDistrict(countryId) {
        var city = document.getElementById("city");
        var index = city.selectedIndex;
        var id = city.options[index].id;
        $.get(host+'api/deliveryAddress/toAddOrUpdateDeliveryAddress/' + id,function (ret) {
            var district = ret.datas;
            var districtHtml = '';
            for (var i = 0; i < district.length; i++) {
                var id = district[i].id;
                var name = district[i].name;
                if (countryId != '' && id == countryId) {
                    districtHtml += '<option selected="selected" id=' + id + '>' + name + '</option>';
                } else {
                    districtHtml += '<option id=' + id + '>' + name + '</option>';
                }
            }
            $("#district").html(districtHtml);
        })
    }
    //查询所有直辖市、省份
    function province(provinceId) {
        $.get(host+'api/deliveryAddress/toAddOrUpdateDeliveryAddress/1', function (ret) {
            var province = ret.datas;
            var provinceHtml = '';
            for (var i = 0; i < province.length; i++) {
                var id = province[i].id;
                var name = province[i].name;
                if (provinceId != '' && id == provinceId) {
                    provinceHtml += '<option selected="selected" id=' + id + '>' + name + '</option>';
                } else {
                    provinceHtml += '<option id=' + id + '>' + name + '</option>';
                }
            }
            $("#province").html(provinceHtml);
            provinceToCity(cityId);
        });
    }
    
/******关闭地址编辑*******/
function closeinfo(){
	if(openfrom == 1){
		$(".addnewinfo").css("display","none");
		$('.addinfofir').css("display","block");
	}else if(openfrom == 2){
		$(".addnewinfo").css("display","none");
		$(".isinfo").css("display","block");
	}
}
/******************设置默认*************************/
function setdea(el){
	if($(el).is(":checked")){
		isdefault = 1;
	}else{
		isdefault = 0;
	}
}
/****************************新建地址*****************************/
function addnew(){
	openfrom = 1;
	$(".isinfo").css("display","none");
	$(".addinfofir").css("display","none");
	$(".addnewinfo").css("display","block");
}
/***************************切换地址选中*****************************/
function choiceLi(el){
//	console.log($(el));
	$(el).addClass("selectADD").siblings().removeClass("selectADD");
}
/******************************切换地址确认******************************/
function listsubmit(){
	var li =$('.Addlist li');
	openfrom = 2;
	if(li.hasClass("selectADD")){
//		console.log($(".selectADD"));
//		var name = $("li.selectADD").find("span.na").html();
		var id = $("li.selectADD").attr("id");
		$.get(host+"api/deliveryAddress/find/"+id,function(res){
		var param = res.datas;
		param.idDefault = 1;
//		console.log(param);
		$.ajax({
		type:"post",
		url:host+"api/deliveryAddress/saveDeliveryAddress",
		async:true,
		data : JSON.stringify(param),
		contentType : "application/json",
		success : function(res){

			$.get(host+"api/deliveryAddress/listDeliveryAddress/"+acc.memberId,function(str){
				console.log(str);
				var data = str.datas;
				for(var k=0;k<data.length;k++){
				
						console.log(data[k].isDefault);
						if(data[k].isDefault == 1){
							$('.pbb_Lwrap').html('<span style="display: inline-block;font-size: 14px;color: #333333;margin-top: 32px;">默认地址</span><span class="pbbl_changebtn" onclick="changeDefault(this)" id = "'+data[k].id+'">修改</span><p style="margin-top: 32px;font-size: 14px;"><span>收&nbsp;&nbsp;货&nbsp;&nbsp;&nbsp;人:</span><span class="username">'+data[k].name+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系方式：</span><span class="phonenumber">'+data[k].mobile+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系地址：</span><span class="contactAdress">'+data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address+'</span></p>');
							$('.reinfo').html('<span class="name" style="margin-right: 30px;">'+data[k].name+'</span><span class="shoujihaoma">'+data[k].mobile+'</span>');
			$('.readre').html(data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address);
		}
	}
})

		var mod1 = artModal({
			element:document.getElementById('myModal_1')
		})
		mod1.close();
			
		}
	});
	})
//		var mobile = $("li.selectADD").find("span.mo").html();
//		var address = $("li.selectADD").find("span.det").html();
//		$('.pbb_Lwrap').html('<span style="display: inline-block;font-size: 14px;color: #333333;margin-top: 32px;">默认地址</span><span class="pbbl_changebtn" onclick="changeDefault(this)" id = "'+id+'">修改</span><p style="margin-top: 32px;font-size: 14px;"><span>收&nbsp;&nbsp;货&nbsp;&nbsp;&nbsp;人:</span><span class="username">'+name+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系方式：</span><span class="phonenumber">'+mobile+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系地址：</span><span class="contactAdress">'+address+'</span></p>');
//		var mod1 = artModal({
//			element:document.getElementById('myModal_1')
//		})
//		mod1.close();
	}
}
/**********************修改当前默认地址*********************/
function changeDefault(el){
	dizhiid = $(el).attr("id");
	openfrom =2;
	console.log(openfrom);
	$.get(host+"api/deliveryAddress/find/"+dizhiid,function(res){
		var param = res.datas;
		console.log(param);
		provinceId = param.provinceId;
		cityId = param.cityId;
		countryId = param.countryId;
		province(provinceId);
		$('.isinfo').css("display","none");
		$(".addnewinfo").css("display","block");
		$(".address").val(param.address);
		$(".shoujihao").val(param.mobile);
		$(".shouhuoren").val(param.name);
	})
}
/***************确认地址编辑****************/

function queren(){
	console.log(openfrom);
//	var check = $("inp").is(":checked");
//	var isDefault = 0;
//	if(check){
//		isDefault = 1;
//	}
	var mobile = $('.shoujihao').val();
	var address = $('.address').val();
	var reciman = $('.shouhuoren').val();
	var province = document.getElementById('province');
	var provinceIndex = province.selectedIndex;
	var provinceId = province.options[provinceIndex].id;
	
	var city = document.getElementById("city");
	var cityIndex = city.selectedIndex;
	var cityId =city.options[cityIndex].id;
	
	var district = document.getElementById("district");
	var districtIndex = district.selectedIndex;
	var districtId = district.options[districtIndex].id;
	
	if(!mobile || !address || !reciman){
		$('.pas').css("display","block");
		return;
	}
	if(mobile&&address&&reciman){
		if(address.length<5){
			$('.pas').css("display",'block');
			$('.alert').html("详细地址至少输入五个字");
			return;
		}else{
			$('.pas').css("display",'none');
		}
		if(!phoneTest.test(mobile)){
			$('.pas').css("display","block");
			$('.alert').html("请输入正确手机号码");
			return;
		}else{
			$('.pas').css("display","none");
		}
	}

	var param = '';
	if(openfrom == 1){  //属于新建
		param = {
			"memberId":acc.memberId,
			"provinceId":provinceId,
			"cityId":cityId,
			"countryId":districtId,
			"name":reciman,
			"address":address,
			"mobile":mobile,
			"idDefault": isdefault
		}
	}
	if(openfrom == 2 ){
		param = {
			"id":dizhiid,
			"memberId":acc.memberId,
			"provinceId":provinceId,
			"cityId":cityId,
			"countryId":districtId,
			"name":reciman,
			"address":address,
			"mobile":mobile,
			"idDefault": isdefault
		}
	}
	
	$.ajax({
		type:"post",
		url:host+"api/deliveryAddress/saveDeliveryAddress",
		async:true,
		data:JSON.stringify(param),
		contentType:"application/json",
		success:function(res){
//			console.log(param);
			console.log(param);
			console.log(res);
		$('.addnewinfo').css("display","none");
		$('.isinfo').css("display","block");
/*		var data = res.datas;
		var dizhihtml = '';

		for(var k=0;k<data.length;k++){
			console.log(data.length);
			console.log(data[k].isDefault);
			if(data[k].isDefault == 1){
	//			console.log(data[k]);
				dizhihtml='<span style="display: inline-block;font-size: 14px;color: #333333;margin-top: 32px;">默认地址</span><span class="pbbl_changebtn" onclick="changeDefault(this)" id = "'+data[k].id+'">修改</span><p style="margin-top: 32px;font-size: 14px;"><span>收&nbsp;&nbsp;货&nbsp;&nbsp;&nbsp;人:</span><span class="username">'+data[k].name+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系方式：</span><span class="phonenumber">'+data[k].mobile+'</span></p><p style="margin-top: 20px;font-size: 14px;"><span>联系地址：</span><span class="contactAdress">'+data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address+'</span></p>';
				$('.reinfo').html('<span class="name" style="margin-right: 30px;">'+data[k].name+'</span><span class="shoujihaoma">'+data[k].mobile+'</span>');
				$('.readre').html(data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address);
			}
			$('.pbb_Lwrap').html(dizhihtml);
			
		}*/
		window.location.reload();
				
		}
	});
}
/*******************积分计算**********************/
var jifen = parseInt($('.zhonge').html()/10);
$('.jifen').html(jifen);


/********************选择优惠券***************************/

$.get(host+"api/memberVoucher/listMemberVoucher/"+acc.memberId+"/1",function(res){
//	console.log(res);
	var quhtml= '';
	if(res.datas.length == 0){
		$('.vouinfo').html("暂无优惠券");
	}else{
		var data=res.datas;
		for(var k =0;k<data.length;k++){
			console.log(data[k]);
			quhtml+='<div style="height: 40px; margin-bottom: 10px;"><div id="'+data[k].id+'" style="display: inline-block;float: left; width: 60px; height: 32px; font-size: 14px; color: #F94530; border: 1px solid #f94530; text-align: center; line-height: 32px; border-radius: 2px; margin-left: 10px;cursor:pointer;"onclick = "selectvou(this)">选择</div><span style="float: left;line-height: 32px;margin-left: 10px;color: #666666;">满<span class="minp" style="color: #333333;">'+data[k].minPrice+'</span>元减<span class="facp" style="color: #F94530;">'+data[k].faceValue+'</span>元</span><div style="clear: both;"></div></div>';
			$('.vouinfo').html(quhtml);
		}
	}
})

var totalMony = 13456;
var disPrice = 0;
function selectvou(el){

//	console.log($(el).parent().find("span.facp").html());
	var reduceValue = $(el).parent().find("span.facp").html();
	disPrice = totalMony- reduceValue;
	$('.zhonge').html(disPrice);
	
}


/***************去付款*****************/
function gopay(){
	var ds;
//	window.location.href ="payWays.html";
	var data = sessionStorage.getItem("pushdata");
	data = JSON.parse(data);
	dss = data;
	ds = dss.datas;
	console.log(data);
	var pro = [];
	var goodid = [];
	console.log(ds);
	for(var k =0;k<ds.orderDetail.length;k++){
		goodid.push(ds.orderDetail[k].goodsInformationId);
	}
	var param = {
		addressid:ds.addressId,
		productIds:goodid.join(","),
		vouvher:countryId,
		disbackPrice:ds.payablePrice,
		memberId:acc.memberId,
		orderSource:"PC"
	}
	$.ajax({
		type:"post",
		url:host+"api/order/submit",
		async:true,
		data : JSON.stringify(param),
		contentType : "application/json",
		headers: {
			'Content-Type': 'application/json',
			accessToken: acc.accessToken || ''
		},
		success:function(res){
			console.log(res);
			var ordercode = res.datas.code;
			var dispay = res.datas.disbackPrice;
			sessionStorage.setItem("dispay",dispay);
			sessionStorage.setItem("orderCod",ordercode);
			window.location.href = 'payWays.html';
		}
	});
}
/***************清除购物车****************/
function removecar(){
	var fromdetail = sessionStorage.getItem("fromdetail");
	if(fromdetail = 1){
		var pid=[];
		var gli = document.getElementsByClassName("goodLi");
	//	console.log(JSON.parse(orderparam));
		var op = JSON.parse(orderparam);
	//	console.log(op.productIds);
		var param = {
			uid:acc.memberId,
			goodsInformationId:op.productIds
		}
		$.ajax({
			type:"post",
			url:host+"api/goods/cart/remove",
			async:false,
			data:JSON.stringify(param),
			dataType:"json",
			headers: {
				'Content-Type': 'application/json'
			},
			success:function(str){
				console.log(str);
				console.log(param);
			}
		});
	}else{
		
	}
	
}
