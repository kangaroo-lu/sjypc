var orderstart = 1;
var ordersize = 10;
var InterValObj;
var gli = $(".order");
var gliarr = [];
$.get(host + "api/memberOrder/listMemberOrder?memberId=" + acc.memberId + "&start=" + orderstart + "&size=" + ordersize, function(ret) {
	console.log(ret.datas);
	var data = ret.datas.content;
	var lihtml = '';

	for(var k = 0; k < data.length; k++) {

		//		setInterval(function(){getdistancetime(data[k].createDate,'showInterval');},0);
		var minite = "";
		var hour = "";
		if(data[k].status == 0) {
			var newTime = new Date();
			var startTime = new Date(Date.parse(data[k].createDate.replace(/-/g, "/"))).getTime();
			var endTime = newTime.getTime();
			var dates = Math.abs((startTime - endTime)) / (1000);
			var dateTime = (3 * 60 * 60 * 24) - dates;
			if(dateTime > 0 && data[k].status==0) {
				 minite = Math.floor((dateTime / 60) % 60);
				 hour = Math.floor((dateTime / 3600) % 72);
				$(".daojishi").html(hour + "" + minite);

				SetRemainTime(dateTime);
			} else if(dateTime <= 0 && state == 0) {
				quXiaoOrder(code);
			}
		}
		lihtml += '<li class="order" data-code = "'+data[k].code+'" data-state = "' + data[k].status + '" ><div class="orderhead"><span class="orderTime">' + data[k].createDate + '</span><span style="font-size: 14px;color: #666666;">订单编号：</span><span class="orderNumber">' + data[k].code + '</span></div><div class="orderbody"><div class="orderGoodimg"><img src="' + filehost + data[k].orderDetail[0].logo + '"/><div style="position: absolute;display: inline-block;left: -6px;top: 8px;width: 56px;height: 25px;"><img src="../img/绿色底.png"/><span class="goodnumber">共' + data[k].orderDetail.length + '件</span></div></div><div class="goodname"><span class="goodCar_goodName">' + data[k].orderDetail[0].name + '</span><span class="goodCar_goodInfo">' + data[k].orderDetail[0].standard + '</span></div><div class="totalPrice"><p style="margin-top: 64px;font-size: 14px;color: #333333; margin-bottom: 8px;"><span>￥</span><span class="tPrice">' + data[k].disbackPrice + '</span></p></div><div class="zhuangtai">
		<p class="wancheng" style="margin-top: 64px;margin-bottom: 8px;"><span style="font-size: 14px;color: #333333;">已完成</span></p><p style="margin-top: 38px;margin-bottom: 8px;"><span style="font-size: 14px;color: #333333;">等待付款</span></p>
		<p class="daoji" style="font-size: 12px;color: #fd9f3a;margin-bottom: 8px;">剩余付款时间：</p><p class="daojishi" style="font-size: 12px;color: #fd9f3a;">'+hour+'小时'+minite+'分钟</p>
		<p class="dengdaishouhuo" style="margin-top: 64px;margin-bottom: 8px;"><span style="font-size: 14px;color: #333333;">等待收货</span></p>
		<p class="daifahuo" style="margin-top: 64px;margin-bottom: 8px;"><span style="font-size: 14px;color: #333333;">待发货</span></p>
		</div>
		<div class="choice">
		<a class="dindanxq" href="" style="color: #489df3;margin-top: 38px;display: inline-block;margin-bottom: 10px;">订单详情</a>
		<a onclick="gopa(this)" class="gopay" style="width: 100px;cursor:pointer;height: 32px;line-height: 32px;border-radius: 2px; display: block;margin: 0 auto;background: #F9442F;color: #FFFFFF;">去支付</a>
		<a class="needSA" href="" style="color: #489df3;display: block;margin-bottom: 10px;">申请售后</a>
		<span class="qupinjia" style="border: 1px solid #4fc374; width: 100px;height: 32px;line-height: 32px;border-radius: 2px; display: block;margin: 0 auto;background: #Fff;color: #4fc374;">评价</span>
		<p class="hasCancel" style="margin-top: 64px;margin-bottom: 8px;"><span style="font-size: 14px;color: #333333;">已取消</span></p>
		</div></div></li>';
		
	}

	$(".allOrder").html(lihtml);

})
/*****************去付款*******************/
function gopa(el){
//	console.log($(el).parents().parents().parents().data("code"));
	var ordercode = $(el).parents().parents().parents().data("code");
	var m = $(el).parents().prev().prev().find("span.tPrice").html();
	window.location.href = "payWays.html?code="+ordercode+"&a="+m;
}
function choicetype(el) {
	$(el).addClass("greenit").siblings().removeClass("greenit");
	//	console.log($(el).data("state"));
	if($(el).data("state") == "10") {
		$(".allOrder li").css("display", "block");
	} else {
		$('.allOrder li').each(function() {

			if($(this).data("state") == $(el).data("state")) {
				$(this).css("display", "block");
			} else {
				$(this).css("display", "none");
			}
		})
	}
}
//VHNFBVJHPDRNLZRZTTTPFBBXVDDTTBTP
function getdistancetime(time, showInterval) {
	var endTime = new Date(Date.parse(time.replace(/-/g, "/")));
	var nowTime = new Date();
	var distance = endTime.getTime() - nowTime.getTime();

	var day = 0;
	var hour = 0;
	var minute = 0;
	var second = 0;

	if(distance >= 0) {
		day = Math.floor(distance / 1000 / 60 / 60 / 24) + 3;
		//		console.log(day);
		hour = Math.floor(distance / 1000 / 60 / 60 % 24);
		minute = Math.floor(distance / 1000 / 60 % 60);
		second = Math.floor(distance / 1000 % 60);
	} else {
		alert(123);
	}
	document.getElementsByClassName('daojishi').innerHTML = day + "天" + hour + "时" + minute + "分" + second + "秒";
}
//setInterval(function(){getdistancetime("2017-06-20 20:32:52",'showInterval');},0);
//将时间减去1秒，计算天、时、分、秒
function SetRemainTime(SysSecond, id, state) {
	InterValObj = window.setInterval(function() {
		if(SysSecond > 0) {
			SysSecond = SysSecond - 60;
			var minite = Math.floor((SysSecond / 60) % 60); //计算分
			var hour = Math.floor((SysSecond / 3600) % 72); //计算小时
			$(".daojishi").html(hour + "小时" + minite + "分");
		} else { //剩余时间小于或等于0的时候，就停止间隔函数
			window.clearInterval(InterValObj);
			//这里可以添加倒计时时间为0后需要执行的事件
		}
	}, 60000);
}