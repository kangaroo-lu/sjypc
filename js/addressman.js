$(function(){
	province(countryId);
})
var provinceId = '';
var cityId = '';
var countryId = '';
var dizhiId='';

var label = document.getElementsByTagName('label');
var inp = document.getElementsByClassName('inp');
var flag ;
var model1 = document.getElementById("myModal_1");



$('#addnew').click(function(){
	flag = 1;/*新加地址*/
	$('#modtitle').html("新建地址");
})
function editadr(el){
	flag = 0;/*修改地址*/
	$('#modtitle').html("修改地址");
	dizhiId = $(el).parent().parent().attr("id");	
	console.log(dizhiId);
	$.get(host+"api/deliveryAddress/find/"+dizhiId,function(res){
		var param = res.datas;
//		param.idDefault = 1;
		console.log(param);
		provinceId = param.provinceId;
		cityId = param.cityId;
		countryId = param.countryId;
		province(provinceId);
	})
}
//设为默认
function clicklab(id) {
//	console.log(123);
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
//			console.log(res);
			
		}
	});
	})
}
//  删除
function delit(id){
	var con = confirm("确定删除这条地址吗？")
	if(con){
		$.get(host+"api/deliveryAddress/deleteDeliveryAddress/"+id,function(res){
			if(res.stateCode == 200){
				window.location.reload();
			}
		})
	}else{
		return;
	}
	
}
$.get(host+"api/deliveryAddress/listDeliveryAddress/"+acc.memberId,function(res){
	console.log(res);
	var addhtml = '';
	var data = res.datas;
	for(var k=0;k<data.length;k++){
		console.log(data[k].isDefault)
		if(data[k].isDefault == 1){
			
			addhtml+='<tr  id = "'+data[k].id+'" style="height: 140px;" class="tabdetail"><td>'+data[k].name+'</td><td style="text-align: left !important;">'+data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address+'</td><td>'+data[k].mobile+'</td><td class=""><a data-toggle="artModal" data-target="myModal_1" class="changeAdr" onclick="editadr(this)" style="cursor:pointer;color: #489DF3;">修改</a>&nbsp;|&nbsp;<a onclick="delit(&#39;'+data[k].id+'&#39;)" class="del" style="color: #FF4500;cursor: pointer;">删除</a></td><td><label  class="moren-radio" ><input onclick="clicklab(&#39;'+data[k].id+'&#39;)" type="radio" name="addre" checked="checked" class="inp" id="" value="" /><i></i><span style="color: #333333;margin-left:10px;font-size: 14px;">设为默认</span><label></td></tr>';
		}else{
			addhtml+='<tr  id = "'+data[k].id+'" style="height: 140px;" class="tabdetail"><td>'+data[k].name+'</td><td style="text-align: left !important;">'+data[k].provinceName+'&nbsp;'+data[k].cityName+'&nbsp;'+data[k].countryName+'&nbsp;'+data[k].address+'</td><td>'+data[k].mobile+'</td><td class=""><a data-toggle="artModal" data-target="myModal_1" class="changeAdr" onclick="editadr(this)" style="cursor:pointer;color: #489DF3;">修改</a>&nbsp;|&nbsp;<a onclick="delit(&#39;'+data[k].id+'&#39;)" class="del" style="color: #FF4500;cursor: pointer;">删除</a></td><td><label  class="moren-radio" ><input onclick="clicklab(&#39;'+data[k].id+'&#39;)" type="radio" name="addre"  class="inp" id="" value="" /><i></i><span style="color: #333333;margin-left:10px;font-size: 14px;">设为默认</span><label></td></tr>';
		}
		
	}
	$('.tab_main').html('<colbody><col class="col-man"/><col class="col-area"/><col class="col-phone"/><col class="col-action"/><col class="col-state"/></colbody><tr class="rc_top"><th style="">收货人</th><th style="">地址</th><th style="">联系方式</th><th style="">操作</th><th style=""></th></tr>'+addhtml);

})



 //省份级联城市
    function provinceToCity(cityId) {
        var province = document.getElementById("province");
        var index = province.selectedIndex;
        var pid = province.options[index].id;
        $.get(host+'api/deliveryAddress/toAddOrUpdateDeliveryAddress/' + pid,  function (ret) {
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
    



/**********保存或新增地址***********/
function addoredit(){
	var check = $("inp").is(":checked");
	var isDefault = 0;
        if (check) {
            isDefault = 1;
        }
	var mobile = $('#shoujihao').val();
	var detailAdd = $('#detailAdd').val();
	var reciman = $('#shouhuoren').val();
	var province = document.getElementById("province");
	var provinceIndex = province.selectedIndex;
	var provinceId = province.options[provinceIndex].id;
	
	
	var city = document.getElementById("city");
	var cityIndex = city.selectedIndex;
	var cityId = city.options[cityIndex].id;
	
	var district = document.getElementById("district");
	var districtIndex = district.selectedIndex;
	var districtId = district.options[districtIndex].id;
	
	if(!mobile||!detailAdd||!reciman){
		$('.pas').css("display","block");
		$(".alert").html("请填写完整收货信息");
		return;
	}
	if(mobile&&detailAdd&&reciman){
		if(detailAdd.length<5){
			$(".pas").css("display","block");
			$('.alert').html("详细地址至少输入五个字");
			return;
		}
	}
	var param = '';
	if(flag == 0){   //保存
		param = {
			"id":dizhiId,
			"memberId":acc.memberId,
			"provinceId":provinceId,
			"cityId":cityId,
			"countryId":districtId,
			"name":reciman,
			"address":detailAdd,
			"mobile":mobile,
			"idDefault": isDefault
		}
	}
	if(flag == 1){    // 新增
			param = {

			"memberId":acc.memberId,
			"provinceId":provinceId,
			"cityId":cityId,
			"countryId":districtId,
			"name":reciman,
			"address":detailAdd,
			"mobile":mobile,
			"idDefault": 0
		}
	}
//	console.log(param);
	$.ajax({
		type:"post",
		url:host+"api/deliveryAddress/saveDeliveryAddress",
		async:true,
		data : JSON.stringify(param),
		contentType : "application/json",
		success : function(res){
			if(res.stateCode == 200){
				var mod1 = artModal({
					element: document.getElementById('myModal_1')
					
				})
				mod1.close();
				window.location.reload();
			}
			
		}
	});
		
}
