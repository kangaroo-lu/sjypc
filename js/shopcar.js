$.get(host+"api/goods/cart/list/?uid="+acc.memberId,function(res){
	console.log(res);
	var data = res.datas.data;
	var goodli = '';
	for(var k=0;k<data.length;k++){
		goodli+='<li data-standard = "'+data[k].standard+'" data-goodcode ="'+data[k].goodCode+'" id="'+data[k].goodsInformationId+'" class="goodLi"><input type="checkbox" name="" id="" value="" class="checkbox selectLi" /><div onclick="de(this)" class="goodCar_img"><img src="'+filehost+data[k].logo+'" alt="" /></div><div class="goodCar_info"><span class="goodCar_goodName">'+data[k].name+'</span><span class="goodCar_goodInfo">'+data[k].standard+'</span></div><div class="goodCar_goodPrice"><div class="pricebox"><span class="sybom">￥</span><span class="goodprice">'+data[k].price+'</span></div></div><div class="goodCar_numberchioce"><div class="numberSelect"><button id="reduce" class="reduce"></button><input type="" name="" id="" value="1" class="number"/><button id="add" class="add"></button></div></div><div class="goodCar_countPrice"><div class="pricebox"><span class="sybom">￥</span><span class="countprice">'+data[k].price+'</span></div></div><div class="goodCar_del"><a class="del" style="display: inline-block;width:16px;height:16px;background: url(../img/删除按钮.png);"></a></div></li>';
	}
	$('#list').html(goodli);
	var list = document.getElementById('list');
		var li = list.getElementsByTagName('li');//获取所有li

//		console.log(li.length);//8
		var checkall = document.getElementsByClassName('select');//获取全选框
		var checkBox = document.getElementsByClassName('checkbox');//获取所有选框
		var selectTotal  = document.getElementById('selectTotal');//获取商品总数
		var total = document.getElementById('total');//所有商品的总价格
		var payprice = document.getElementById('payprice');//应付款
		var cutoff = document.getElementById('cutoff');//优惠券
		var deleteAll = document.getElementsByClassName('delectAll')[0];//全部删除
		var pushOrder = document.getElementsByClassName('orderSubmit')[0];//生成订单
		
		//计算函数
		var getTotal=function(){
			var selectd = 0;//数量
			var price = 0;//价格
			for(var i=0;i<li.length;i++){  //循环所有li
				if(li[i].getElementsByTagName('input')[0].checked){
					selectd+=parseInt(li[i].getElementsByTagName('input')[1].value);//商品数量input
					price+=parseFloat(li[i].getElementsByClassName('countprice')[0].innerHTML);//商品价格
//					console.log(price);
				}else{
					li[i].classname='';
				}
				
				var html = '已选';
				var html2 = '全选';
				selectTotal.innerHTML = selectd;
				if(selectd==0){
					$('.goodCarF_select').html(html2);
					$('#selectTotal').css('display','none');
					
				}else{
					$('.goodCarF_select').html(html);
					$('#selectTotal').css('display','inline-block');
				}
				
				
				total.innerHTML = price.toFixed(2);
				payprice.innerHTML = total.innerHTML;
				
			}
		}
		//单行小计
		var getSubTotal=function(li){
			var pr =li.getElementsByClassName('goodprice')[0];
			var sub = li.getElementsByClassName('countprice')[0];
			var price = parseFloat(pr.innerHTML);//单价
			var count =li.getElementsByTagName('input')[1].value;//数量
			var subTotal = parseFloat(price * count);
			sub.innerHTML = subTotal.toFixed(2);
		}
//		getSubTotal();
		//选中事件
		for(var i =0;i<checkBox.length;i++){
			checkBox[i].onclick = function(){
				if(this.className === 'checkbox select'||this.className === 'checkbox select footselect'){//如果是全选框被勾选，则循环所有的单选框把状态改为checked
					for(var j=0;j<checkBox.length;j++){
						checkBox[j].checked=this.checked;
					}
				}
				if(!this.checked){ //如果有一个选框是未勾选状态，则全选框的状态为false;
                for(var k = 0; k < checkall.length; k++){
                    checkall[k].checked = false;
                }
            }
				getTotal();
			}
		}
		//商品数量加减事件
		for(var i =0;i<li.length;i++){
			//加减click
			li[i].onclick = function(e){

				e= e||window.event;
				var el = e.srcElement;
				var cls = el.className;
				var input = this.getElementsByTagName('input')[1];//获取当前点击li的商品数量input
				var val = parseInt(input.value);//商品数量
				var reduce = this.getElementsByTagName('button')[0];//获取减号
				switch(cls){
					
					case 'add'://加号事件
						input.value = val + 1;//更新当前li商品数量
						var addparam = {
							uid:acc.memberId,
							goodsInformationId:this.id,
							quantity:input.value,
							standard:$(this).data("standard"),
							goodCode:$(this).data("goodcode")
						}
						
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
							
						
						getSubTotal(this);
						
						break;
						
					case 'reduce':
						if(val>1){
							input.value = val - 1;
							var addparam = {
							uid:acc.memberId,
							goodsInformationId:this.id,
							quantity:input.value,
							standard:$(this).data("standard"),
							goodCode:$(this).data("goodcode")
						}
						
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
						}else{
							input.value = 1;
						}
//						if(input.value<=1){
							
//						}
						getSubTotal(this);
						break;
					case 'del':
						var conf = confirm("确定删除吗？");
						if(conf){
							this.parentNode.removeChild(this);
							var goodid = this.id;
							console.log(goodid);
							var param = {
								goodsInformationId:goodid,
								uid:acc.memberId
							}
							$.ajax({
								type:"post",
								url:host+"api/goods/cart/remove",
								async:true,
								data:JSON.stringify(param),
								dataType:"json",
								headers: {
									'Content-Type': 'application/json'
								},
								success:function(str){
									console.log(str);
								}
							});
							
						}
						break;
				}
				getTotal();
			}
			//输入
		li[i].getElementsByTagName('input')[1].onkeyup = function(){
			var val = parseInt(this.value);//当前值
			var lithis = this.parentNode.parentNode;//获取当前input所在行
			var reduce =lithis.getElementsByTagName('button')[0];
			if(isNaN(val)||val<1){  //当前值判断确保输入值合法
				val=1;
			}
			this.value = val;
			if(val <=1){
				val =1;
			}
			getSubTotal(li);
			getTotal();
		}
		//多个删除
		deleteAll.onclick = function(){
			if(selectTotal.innerHTML !=0){
				var conf=confirm("确认删除吗？");
				if(conf){
					for(var k =0;k<li.length;k++){
						var inp =li[k].getElementsByTagName('input')[0];
						if(inp.checked){
							
							var param = {
								goodsInformationId:li[k].id,
								uid:acc.memberId
							}
							$.ajax({
								type:"post",
								url:host+"api/goods/cart/remove",
								async:true,
								data:JSON.stringify(param),
								dataType:"json",
								headers: {
									'Content-Type': 'application/json'
								},
								success:function(str){
									console.log(str);
								}
							});
							li[k].parentNode.removeChild(li[k]);
							k--;
//							console.log(li[k].id);
							selectTotal.innerHTML = 0;
						}
					}
				}
			}
		}
		pushOrder.onclick = function(){
			var goodnum = [];
			var orderparam = '';
			for(let k = 0;k<li.length;k++){
				let inp = li[k].getElementsByTagName('input')[0];
				
//				goodnum = goodnum.join(",");
				if(inp.checked){
					goodnum.push(li[k].id);
					orderparam = {
						memberId:acc.memberId,
						productIds:goodnum,
						
//						orderType: "goods",
//						token:acc.accessToken
					}
					console.log(orderparam);
					sessionStorage.removeItem("orderparam");
					sessionStorage.setItem("orderparam",JSON.stringify(orderparam));
					window.location.href = "pushorder.html";
				}
			}
//					$.ajax({
//								type:"post",
//								url:host+"api/order/generate",
//								async:true,
//								data:JSON.stringify(orderparam),
//								dataType:"json",
//								headers: {
//									'Content-Type': 'application/json',
//									accessToken: acc.accessToken || ''
//								},
//								success:function(str){
//									console.log(str);
//									console.log(orderparam);
//								}
//							});
//				
			
		}
		
		//初始全选状态
//		checkall[0].checked=true;
//		checkall[0].onclick();
		}
		$("#up").click(function(){
				$('body,html').animate({scrollTop:0},500);

			});
})


function de(el){
	console.log($(el).parent().attr('id'));
	var id = $(el).parent().attr('id');
//	console.log(id);
	window.location.href = "detail.html?id="+id;
}
