jQuery(function(){
	window.osType = 'web';
	/*if(window.android !== undefined) {
		window.osType = 'android';
	}*/
	var winwidth = jQuery(window).innerWidth();
	var winheight = jQuery(window).innerHeight();
	
	if(navigator.userAgent.indexOf("Chrome") != -1 ) {
		jQuery("link[title='ie8chn']").attr("href","/css/chrome.css");
    } else if(navigator.userAgent.indexOf("Firefox") != -1 ) {
    	jQuery("link[title='ie8chn']").attr("href","/css/fox.css");
    }
	/*
	 ******************************************************************
	 * #스킵네비
	 * ----------------------------------------------------------------
	 * 해당 영역으로 포커스 이동시키기
	 * ID는 상황에 맞게 변경
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	jQuery(document.body).on("click","#skip_navi a",function(){
		var target = jQuery(this).attr("href");
		jQuery(target).attr("tabindex","0").focus();
		jQuery(target).on("focusout",function(){
			jQuery(target).removeAttr("tabindex");
		}); 
	});
	/*
	 ******************************************************************
	 * #GNB PC
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	var gnbh1 = jQuery(".gn2s1").innerHeight();
	var gnbh2 = jQuery(".gn2s2").innerHeight();
	var gnbh3 = jQuery(".gn2s3").innerHeight();
	var gnbh4 = jQuery(".gn2s4").innerHeight();
	var gnbh5 = jQuery(".gn2s5").innerHeight();
	var gnbh6 = jQuery(".gn2s6").innerHeight();
	var gnhmax = Math.max(gnbh1, gnbh2, gnbh3, gnbh4, gnbh5, gnbh6);
	jQuery(".gnbwrap nav > ul ul").css({"height":(gnhmax-45)+"px"});
	jQuery(".gnbclose").css({"bottom":"-"+(gnhmax+5)+"px"});
	jQuery(".gnbmask").css({"height":gnhmax+"px"});
	jQuery(".gnbmask,.gnbwrap nav > ul ul,.gnbclose").hide();
	jQuery(document.body).on("click",".gnbwrap nav > ul h2 a",function(){
		jQuery(".gnbmask,.gnbwrap nav > ul ul,.gnbclose").show();
	});
	jQuery(document.body).on("click",".gnbclose",function(){
		jQuery(".gnbmask,.gnbwrap nav > ul ul,.gnbclose").hide();
	});
	/*
	 ******************************************************************
	 * #GNB DEVICE
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	jQuery(".slidmenu").css({"margin-left":"-"+winwidth+"px"});
	jQuery(".slidmenu .on").next().show();
	jQuery(".dvmenuclose").hide();
	jQuery("html,body").attr("scroll","yes");
	jQuery(document.body).on("click",".menuopen",function(){
		jQuery(".slidmenu").animate({
			"margin-left":"0px"
		},1000,"easeOutQuint");
		jQuery("html,body").attr("scroll","no");
		jQuery("html,body").css({"height":"100%","overflow":"hidden"});
		jQuery(".dvmenuclose").fadeTo(1000,1);
	});
	jQuery(document.body).on("click",".dvmenuclose",function(){
		var reswinwidth = jQuery(window).innerWidth();
		jQuery(".slidmenu").animate({
			"margin-left":"-"+reswinwidth+"px"
		},1000,"easeOutQuint");
		jQuery("html,body").attr("scroll","yes");
		jQuery("html,body").css({"height":"100%","overflow":"auto"});
		jQuery(".dvmenuclose").hide();
	});
	jQuery(document.body).on("click",".slidmenu h3 a",function(){
		if(jQuery(this).parent().hasClass("on")==false){
			jQuery(".slidmenu h3").removeClass("on");
			jQuery(".slidmenu h3").next().hide();
			jQuery(this).parent().addClass("on");
			jQuery(this).parent().next().show();
		}else{
			jQuery(".slidmenu h3").removeClass("on");
			jQuery(".slidmenu h3").next().hide();	
		}
	});
	/*
	 ******************************************************************
	 * #PW resize IE ver
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	if(winwidth > 960){
		jQuery("body").removeClass("ie8m");
		jQuery("body").removeClass("ie8t");
		jQuery("body").removeClass("ie8iso");
		jQuery("link[title='ie8chn']").attr("href","/css/pw.css");
		var wrapWh = jQuery(window).innerHeight();
		var wraphead = jQuery("#gnbhead").innerHeight();
		var wropcopy = jQuery("footer").innerHeight();
		var wrapCtn = wrapWh - (wraphead+wropcopy+51);
		jQuery("#subctn").css({"min-height":wrapCtn+"px"});
	}
	if(winwidth < 960 && winwidth > 700 ){
		jQuery("body").removeClass("ie8m");
		jQuery("body").addClass("ie8t");
		jQuery("body").removeClass("ie8iso");
		jQuery("link[title='ie8chn']").attr("href","/css/tdvcss.css")
	}
	if(winwidth < 700 && winwidth > 600 ){
		jQuery("body").addClass("ie8m");
		jQuery("body").removeClass("ie8t");
		jQuery("body").removeClass("ie8iso");
		jQuery("link[title='ie8chn']").attr("href","/css/mdvcss.css")
	}
	if( winwidth < 600 && winwidth > 400){
		jQuery("body").removeClass("ie8t");
		jQuery("body").addClass("ie8m");
		jQuery("body").removeClass("ie8iso");
		jQuery("link[title='ie8chn']").attr("href","/css/mdvcss.css")
	}
	if(winwidth < 400){
		jQuery("body").removeClass("ie8t");
		jQuery("body").addClass("ie8m");
		jQuery("body").addClass("ie8iso");
		jQuery("link[title='ie8chn']").attr("href","/css/mdvcss.css")
	}
	jQuery(window).resize(function() {
		var winwidth = jQuery(this).innerWidth();
		jQuery(".slidmenu").css({"margin-left":"-"+winwidth+"px"});
		if(winwidth > 960){
			jQuery("body").removeClass("ie8m");
			jQuery("body").removeClass("ie8t");
			jQuery("body").removeClass("ie8iso");
			jQuery("link[title='ie8chn']").attr("href","/css/pw.css");
			var wrapWh = jQuery(window).innerHeight();
			var wraphead = jQuery("#gnbhead").innerHeight();
			var wropcopy = jQuery("footer").innerHeight();
			var wrapCtn = wrapWh - (wraphead+wropcopy+51);
			jQuery("#subctn").css({"min-height":wrapCtn+"px"});
		}
		if(winwidth < 960 && winwidth > 700 ){
			jQuery("body").removeClass("ie8m");
			jQuery("body").addClass("ie8t");
			jQuery("body").removeClass("ie8iso");
			jQuery("link[title='ie8chn']").attr("href","/css/tdvcss.css");
			jQuery("#subctn").css({"min-height":"0"});
		}
		if(winwidth < 700 && winwidth > 600 ){
			jQuery("body").addClass("ie8m");
			jQuery("body").removeClass("ie8t");
			jQuery("body").removeClass("ie8iso");
			jQuery("link[title='ie8chn']").attr("href","/css/mdvcss.css")
		}
		if( winwidth < 600 && winwidth > 400){
			jQuery("body").removeClass("ie8t");
			jQuery("body").addClass("ie8m");
			jQuery("body").removeClass("ie8iso");
			jQuery("link[title='ie8chn']").attr("href","/css/mdvcss.css")
		}
		if(winwidth < 400){
			jQuery("body").addClass("ie8iso");
			jQuery("link[title='ie8chn']").attr("href","/css/mdvcss.css")
		}
	});
	/*
	 ******************************************************************
	 * Window Popup
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	
	jQuery(document.body).on("click",".winNewPop",function(){
		//e.preventDefault();
		jQuery("body").append("<div class='popmask'></div>");
		var purl = jQuery(this).attr("href");
		var ptt = escape(jQuery(this).attr("data-title"));
		var pwidth = jQuery(this).attr("data-width");
		var pheight = jQuery(this).attr("data-height");
		var paramt = jQuery(this).attr("data-pmt");
		var scrn = jQuery(this).attr("data-screen");
		var srcurl = jQuery(this).attr("data-src");
		if(srcurl) purl = srcurl;
		var winL = (screen.width-pwidth)/2;
		var winT = (screen.height-pheight)/2;
		
		if(jQuery(this).hasClass("modal")==true){
			winspop("model");
			jQuery(".popmask").show();
			jQuery(".popmask").css({"width":"99999px","height":"99999px"});
			jQuery(".popmask").on("click", function(){
				alert('정보창이 닫은 후 사용이 가능하십니다.');
			})
		}else{
			winspop("winpop");	
		}
		function winspop(wid){
			if(scrn) window.open(purl+"?outptt="+ptt+paramt,""+wid+"","height="+ screen.height + ",width=" + screen.width + ", scrollbars=yes");
			else window.open(purl+"?outptt="+ptt+paramt,""+wid+"","width="+pwidth+", height="+pheight+",top="+winT+",left="+winL+",scrollbars=yes");
		}
		
		return false
	});
	jQuery(".popclose").on("click", function(e){
		e.preventDefault();
		switch(window.osType){
        case "web" :
        	if(typeof opener.location !== 'undefined') {
    			opener.location.href = "javascript:maskhide()";
    		}
    		window.close();
            break;
        case "android" :
            window.android.closePopWebView();
            break;
        case "ios" : 
            var iosUrl = 'toApp://?{"call":"closePopWebView"}';
            window.location = iosUrl;
            break;
		}
	});
	jQuery(".popcloseit").on("click", function(){
		opener.location.href = "javascript:maskhide()";
		self.close();
	});
	jQuery.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}else{
		   return results[1] || 0;
		}
	};
	var inPtt = unescape(jQuery.urlParam('outptt')) === 'null' ? "" : unescape(jQuery.urlParam('outptt'));
	jQuery(".popTt").text(inPtt);
	/*
	 ******************************************************************
	 * Map Position infomation
	 * 2015.06.10 주석 처리 
	 * dki
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	/*jQuery(".mappos").on("click", function(){
		jQuery(".stamapinfo").hide();
		jQuery(this).next().show();
		return false
	});
	jQuery(".mpclose").on("click", function(){
		jQuery(".stamapinfo").hide();
		return false
	});
	
	 ******************************************************************
	 * Plaxeholder Script
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	jQuery(".placeh").each(function(){
		var placett = jQuery(this).attr("data-title");
		var thvalue = jQuery(this).val();
		if(!thvalue) jQuery(this).val(placett);
	});
	jQuery(".placeh").on("blur", function(){
		var placett = jQuery(this).attr("data-title");
		var thvalue = jQuery(this).val();
		if(placett == thvalue || !thvalue) jQuery(this).val(placett);
	});
	jQuery(".placeh").on("focus", function(){
		var placett = jQuery(this).attr("data-title");
		var thvalue = jQuery(this).val();
		if(placett == thvalue) jQuery(this).val("");
	});
	/*
	******************************************************************
	LOGIN Check
	******************************************************************
	*/
	jQuery(".memchk input").change(function(){
		var datack = jQuery(this).attr("data-ck");
		jQuery(".memhidid,.memhidphon").css({"display":"none"});
		jQuery(".logininfo").find("."+datack).css({"display":"block"});
	})
	/*
	 ******************************************************************
	 * DATA PICKER
	 ******************************************************************
	*/

	jQuery(".datepicker").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		dayNamesMin: ["일","월","화","수","목","금","토"],
		monthNames: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		monthNamesShort : ["1","2","3","4","5","6","7","8","9","10","11","12"],
		nextText: "<button>다음 달</button>",
		prevText: "<button>이전 달</button>",
		showOn: "button",
		buttonImage: "/images/btn_cal.png",
		buttonText: "달력보기 및 선택"
		//isRTL : "before"
	});


	jQuery(document.body).on("focusout",".ui-date-table table tbody td a:last",function(){
		jQuery(".datepicker").datepicker("hide");
		date_btn.focus();
		jQuery("#ui-datepicker-div").removeAttr("tabindex");
	}).on("click",".allwrap",function(){		
		if(jQuery("#ui-datepicker-div").css("display") != "none"){
			jQuery(".datepicker").datepicker("hide");
			jQuery("#ui-datepicker-div").removeAttr("tabindex");
			//date_btn.focus();
		};
	});
	
	var day = new Date();
	var dayYear = day.getFullYear(); // 현재
	var maxYear = dayYear-15; // 7살
	var minYear = dayYear-100; // 7살
	
	$(".memdatepicker").datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: "yy-mm-dd",
		dayNamesMin: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
		monthNames: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		monthNamesShort : ["1","2","3","4","5","6","7","8","9","10","11","12"],
		nextText: "<button>Next month</button>",
		prevText: "<button>Prev month</button>",
		showOn: "button",
		buttonImage: "/images/btn_cal.png",
		buttonText: "달력보기 및 선택",
		yearRange:minYear+':'+maxYear
		//isRTL : "before"
	});
	
	jQuery(document.body).on("focusout",".ui-date-table table tbody td a:last",function(){
		jQuery(".memdatepicker").datepicker("hide");
		date_btn.focus();
		jQuery("#ui-datepicker-div").removeAttr("tabindex");
	}).on("click",".allwrap",function(){		
		if(jQuery("#ui-datepicker-div").css("display") != "none"){
			jQuery(".memdatepicker").datepicker("hide");
			jQuery("#ui-datepicker-div").removeAttr("tabindex");
			//date_btn.focus();
		};
	});
	
	/*
	 ******************************************************************
	 * #TAB
	 * ----------------------------------------------------------------
	 * Type별 탭메뉴
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	jQuery(document.body).on("click",".tabWrap.type1 .tab button",function(){
		jQuery(".tabWrap.type1 .tab").removeClass("on");
		jQuery(this).parent().addClass("on");
	}).on("click",".tabWrap.type2 .tab button",function(){
		jQuery(".tabWrap.type2 .tab").removeClass("on");
		jQuery(this).parent().addClass("on");
	}).on("click",".tabWrap.type3 .tab button",function(){
		var idx = jQuery(".tabWrap.type3 .tab button").index(this);
		jQuery(".tabWrap.type3 .tab").removeClass("on");
		jQuery(".tabWrap.type3 .tabCon").removeClass("on").eq(idx).addClass("on");
		jQuery(this).parent().addClass("on");
	}).on("click",".tabWrap.type4 .tab button",function(){
		var idx = jQuery(".tabWrap.type4 .tab button").index(this);
		jQuery(".tabWrap.type4 .tab").removeClass("on");
		jQuery(".tabWrap.type4 .tabCon").removeClass("on").eq(idx).addClass("on");
		jQuery(this).parent().addClass("on");
	});
	/*
	 ******************************************************************
	 * App
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	var Hdheight = jQuery("header").innerHeight();
	var limtper = winheight*(0.01/Hdheight)-2;
	var limtper2 = winheight*0.025;
	var limtper3 = (Hdheight/winheight)*100;
	var limtper4 = ((Hdheight/winheight)*100)+50;
	var ctnerheight = (winheight-(Hdheight))-limtper;
	var ctnerheight2 = (winheight-(Hdheight))-limtper2;
	var ctnerheight3 = (winheight-(Hdheight+7))-limtper3;	
	var ctnerheight4 = (winheight-(Hdheight+7))-limtper4;	
	
	if(jQuery("#app #container").hasClass("mainctn")==true){
		jQuery("#app #container.mainctn").css({"height":ctnerheight2+"px"});
	}else if(jQuery("#app #container").hasClass("noinheight")==true){
		jQuery("#app #container.noinheight").css({"height":ctnerheight4+"px"});
	}else{
		jQuery("#app #container").css({"height":ctnerheight4+"px"});
		
	};
	jQuery(".pageup").on("click", function(){
		jQuery('html, body').animate({
            scrollTop: 0
        }, 0);
	});
	/*
	 ******************************************************************
	 * #APP 버튼 체크
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	jQuery(".errarbtngr").on("click","button",function(){
		jQuery(this).toggleClass("btnchk");
		return false;
	})
	// 체크박스 및 라디오버튼 checked 확인
	jQuery("input:checked").parent().addClass("on");
	jQuery(document.body).on("click",".checkbox input",function(){
		jQuery(this).parent().toggleClass("on");
		if(jQuery(this).parent().hasClass("on")){
			jQuery(this).next().text("선택");
		}else{
			jQuery(this).next().text("미선택");
		};
	}).on("change",".radiobox input",function(){		
		var r_name = jQuery(this).attr("name");
		var parentBox = jQuery("input[name="+r_name+"]").parent();		
		parentBox.removeClass("on");
		jQuery(this).parent().addClass("on");
	});
	
	/*
	 ******************************************************************
	 * break point
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	var wNum = jQuery(window).innerWidth();
	if(wNum > 1000){
		jQuery("#pagingMobile").css("display","none");
		jQuery("#pagingWeb").css("display","inline");
		jQuery("#pagingMobile1").css("display","none");//추가 : 마일리지 추천반납 탭의 하단 페이지 2중 으로 보여주는 부분 해결_2016.05.17_by_JHN
		jQuery("#pagingWeb1").css("display","inline");//추가 : 마일리지 추천반납 탭의 하단 페이지 2중 으로 보여주는 부분 해결_2016.05.17_by_JHN
		
	}
	if(wNum < 1000 && wNum > 700 ){
		jQuery("#pagingMobile").css("display","none");
		jQuery("#pagingWeb").css("display","inline");
		jQuery("#pagingMobile1").css("display","none");
		jQuery("#pagingWeb1").css("display","inline");
		
	}
	if(wNum < 700){
		jQuery("#pagingWeb").css("display","none");
		jQuery("#pagingMobile").css("display","inline");
		jQuery("#pagingWeb1").css("display","none");
		jQuery("#pagingMobile1").css("display","inline");
		
	}
	
	jQuery(window).resize(function() {
		wNum = jQuery(window).innerWidth();
		if(wNum > 1000){
			jQuery("#pagingMobile").css("display","none");
			jQuery("#pagingWeb").css("display","inline");
			jQuery("#pagingMobile1").css("display","none");
			jQuery("#pagingWeb1").css("display","inline");
			
		}
		if(wNum < 1000 && wNum > 700 ){
			jQuery("#pagingMobile").css("display","none");
			jQuery("#pagingWeb").css("display","inline");
			jQuery("#pagingMobile1").css("display","none");
			jQuery("#pagingWeb1").css("display","inline");
			
		}
		if(wNum < 700){
			jQuery("#pagingWeb").css("display","none");
			jQuery("#pagingMobile").css("display","inline");
			jQuery("#pagingWeb1").css("display","none");
			jQuery("#pagingMobile1").css("display","inline");
			
		}
	});
	/*
	 ******************************************************************
	 *layer pop
	 * ----------------------------------------------------------------
	 * ----------------------------------------------------------------
	 ******************************************************************
	*/
	jQuery(document.body).on("click",".openlayer",function(){
		var title = jQuery(this).attr("data-title")
		var url = jQuery(this).attr("data-src")
		jQuery("body").css({position:"fixed"})
		
		$.ajax ({
			type: 'post', // POST 로 전송
			url: url, // 호출 URL
			dataType: "xml",
			success:function(html){
				var cont;
				var laybox =  '<div class="dim"></div>';  
				     laybox +=  '<div class="layerBox"><div class="laycont"></div>';
				var layH = jQuery(window).height() *0.8
				jQuery("body").append(laybox);
				cont = jQuery(html).find("body").html()
				jQuery(".layerBox").prepend(cont)
				jQuery(".popmaparea, .popcntbox, .popclose").remove()
				jQuery(".layerBox .laycont").append(cont)
				jQuery(".laycont .popTt").remove()
				jQuery(".popTt").text(title)
				jQuery(".popclose").addClass("layerpopclose")
				//jQuery(".layerpopclose").removeClass("popclose")
				jQuery(".layerBox").css({height:layH})
				jQuery(".laycont").css({height:layH -59})
			}
	  });
	}).on("click",".layerpopclose",function(){
		layerClose();
	});
	/***************** 완료 후 삭제 예정 코드 *****************/
//	jQuery("script[src='/js/comm.js']").after("<link href='/css/kjy.css' rel='stylesheet' type='text/css' /><link href='/css/mdvkjy.css' rel='stylesheet' type='text/css' media='only screen and (max-width:700px)' /><link href='/css/tdvkjy.css' rel='stylesheet' type='text/css' media='only screen and (min-width:700px) and (max-width:1000px)' />");
//	jQuery(".pwback").on("click", function(){
//		location.reload();
//	})
	
});
function layerClose(){
	jQuery(".layerBox").remove();
	jQuery(".dim").remove();
}
/*IE-excluding conditional comment*/
if(document.documentMode===10){
	document.documentElement.className+='ie10';
}else if(document.documentMode===11){
	document.documentElement.className+='ie11';
};

/* Popup Block */
function maskhide(){
	jQuery(document.body).find(".popmask").remove();
};

function setCookie(num){
	var expDate = new Date();
	expDate = new Date(parseInt(expDate.getTime() / 86400000) * 86400000 + 54000000);
	if(expDate<new Date()){ expDate.setDate(expDate.getDate()-1); }
	var expires = "expires="+expDate.toUTCString();
	document.cookie = "SPBcookie" + num + "=hide; " + expires;
}