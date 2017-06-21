
var acc = sessionStorage.getItem("acc");
acc = JSON.parse(acc);
$.ajax({
	type:"get",
	url:host+"api/getMemberMessage/getBizMemberData/"+acc.memberId,
	async:true,
	success:function(res){
		console.log(res);
	$('#userId').html(res.datas.memberId);
	$('#userAccount').html(res.datas.username);
	$('#userNameinput').attr("value",res.datas.nickName);
	$('#handsitnum').html(res.datas.mobile);
	var sexinp = $(".checkbox input");
	for(var k = 0;k<sexinp.length;k++){
		var f = sexinp[k];
		if(f.value == res.datas.sex){
			f.checked = true;
		}
	}
	var bridate = res.datas.birthDate;
	console.log(bridate);
	bridate = bridate.split("-");
	console.log(bridate);
	var year = bridate[0];
	var month = bridate[1];
	var bday = bridate[2];

	$("#year").val(year);
	$("#month").val(month);
	$("#day").val(bday);

	}
});



var briyear = '';
var brimonth = '';
var briday = '';
var save = document.getElementById('save');
var savesu = document.getElementById('savesuc');

var schoice = '';
$('.int').click(function(){
		if($(this).attr("checked")){

			$(this).parents(".checkbox").parents(".sexchoice").siblings(".sexchoice").find(".checkbox input").removeAttr('checked');
			schoice = $(this).attr("value");
		}
			console.log(schoice);
		})


window.onload = function(){
		YearMonthDay();
	}
function YearMonthDay(){
   fo=document.form1;
   foday=fo.day;
   MonHead=[31,28,31,30,31,30,31,31,30,31,30,31];
 
   //设置年
   y=new Date().getFullYear();
   for(i=(y-90);i<=y;i++)
   fo.year.options.add(new Option(i,i));
   fo.year.options.value=y;//current year
 
    //设置月
   m=new Date().getMonth();
   for(i=1;i<=12;i++)
   fo.month.options.add(new Option(i,i));
   fo.month.options.value=m+1;//current month
 
   //设置日
   d=new Date().getDay();
   n=MonHead[m];
   if(m==1&&IsRunYear(yearValue))
   n++;
   day(n);
   fo.day.options.value=d+1;//curren day
}
   //onchange of year
function yy(str){
	briyear = str;
   monthValue=fo.month.options[fo.month.selectedIndex].value;
   if(monthValue==""){
      var foday=document.form1.day;
   optionClear(foday);
   return;
    }
   var n=MonHead[monthValue-1];
   if(monthValue==2&&IsRunYear(str)) n++;
   day(n);
}
   //onchange of month
function mm(str){
	brimonth = str;
	console.log(str)
  yearValue=fo.year.options[fo.year.selectedIndex].value;
 if(yearValue==""){
  optionClear(foday);
  return;
 }
 var n=MonHead[str-1];
 if(str==2&&IsRunYear(yearValue)) n++;
 day(n);
}
 
function day(str){	
   optionClear(foday);
   for(var i=1;i<=str;i++)
   foday.options.add(new Option(i,i));
 }
 
function optionClear(str){
   for(var i=str.options.length;i>0;i--)
   str.remove(i);
}
function  IsRunYear(year){
   return(0==year%4&&(year!==0 || year==0));
}

//保存成功提示

function showsuc(){
			console.log(schoice);
			savesu.style.display="none";
			setTimeout(function(){
				savesu.style.display="inline-block";
			},500)	
			var param={
				nickName:$('#userNameinput').val(),
				memberId:$("#userId").html(),
				name:$('#userAccount').html(),
				sex:schoice,
				birthDate:briyear+"-"+brimonth+"-"+$("#day").val()
				
			}
			$.ajax({
				type:"post",
				url:host+"api/getMemberMessage/updateBizMemberData",
				async:true,
				data:JSON.stringify(param),
				dataType:"json",
				headers:{
					'Content-Type': 'application/json'
				},
				success:function(res){
					console.log(param);
				}
			});
		}