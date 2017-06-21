function getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

if(getUrlParam('code')){
//	console.log(getUrlParam('a'));
	var code = getUrlParam('code');
	var m = getUrlParam('a');
	$(".orderNumber").html(code);
	$(".money").html(m);
	$(".moneyy").html("￥"+m);
	var qrcode = new QRCode(document.getElementsByClassName("erweima")[0], {
				width : 180,
				height : 180
			});
			$('.gopay').on("click",function(){
	
		var val=$('input:radio[name="pay"]:checked').val();
	
	if(val == 1){
	}else if(val ==2 ){
		$.get(host+"/api/pay/wxAppPay?orderCode="+code+"&tradeType=NATIVE",function(res){
			console.log(res);
			qrcode.clear();
			qrcode.makeCode(res.datas.code_url);
		})
	
	}
	})
}else{
	var code = sessionStorage.getItem("orderCod");
	var dispay = sessionStorage.getItem("dispay");
	console.log(code);
	$(".orderNumber").html(code);
	$(".money").html(dispay);
	$(".moneyy").html("￥"+dispay);
		var qrcode = new QRCode(document.getElementsByClassName("erweima")[0], {
				width : 180,
				height : 180
			});
	$('.gopay').on("click",function(){
	
		var val=$('input:radio[name="pay"]:checked').val();
	
	if(val == 1){
	}else if(val ==2 ){
		$.get(host+"/api/pay/wxAppPay?orderCode="+code+"&tradeType=NATIVE",function(res){
			console.log(res);
			qrcode.clear();
			qrcode.makeCode(res.datas.code_url);
		})
	
	}
	})
}



