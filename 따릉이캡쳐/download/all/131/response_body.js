/**
 *         [공통 스크립트]
 * 
 * 작성자:김병기
 * 작성일자:2014.04.08
 * 작성내용: HMS 프로젝트에 사용되는 자바스크립트 공통함수(임시) 
 */
function getAesKey() {
	var key = "skidopepekfg123411sograwcvkaiusp";
	return key;
}


// 팝업
function windowOpen(sURL, sName, sWidth, sHeight, sTop, sLeft, sScrollbars,
		sResizable) {
	var sStatus = 'toolbar=no,location=no,status=yes,menubar=no,scrollbars='
			+ sScrollbars + ',resizable=' + sResizable + ',width=' + sWidthnumbersonly
			+ ',height=' + sHeight + ',top=' + sTop + ',left=' + sLeft;
	window.open(sURL, sName, sStatus, false);

}

// 팝업창 닫기
function windowClose() {
	window.open('about:blank', '_self').close(); // 닫기
}

/* 폼: 생성 */
function formCreate(nm, mt, at, tg) {
	var f = document.createElement("form");
	f.name = nm;
	f.method = mt;
	f.action = at;
	f.target = tg ? tg : "_self";
	return f;
}

/* 폼: 인풋 생성 */
function formInput(f, n, v) {
	var i = document.createElement("input");  
	i.type = "hidden";
	i.name = n;
	i.value = v;
	// f.appendChild(i);
	f.insertBefore(i, null);
	// f.insertBefore(i);
	return f;
}

/* 폼: 전송 */
/*function formSubmit(f) {
	document.body.appendChild(f);
	f.submit();
	
}*/

/*
 *     <동적 폼 사용예제>
 * 
 *      // 먼저, selector를 통해 폼으로 전송할 값을 변수로 선언합니다. 
 *		var userId = $('#userId').val();   
 *		// 동적을 폼을 생성합니다.
 *		var form = createAsyncForm("modifyFrm", "modifyFrm", '<c:url value="/adm/mem/mem_modify.do"/>') ;
 *		// 생성한 폼에 변수를 저장합니다.
 *		form = inputAsyncForm(form, "userId", userId);
 *		form = inputAsyncForm(form, "registerYn", 'N');
 *		// 폼을 전송합니다.
 *		submitAsyncForm(form);
 * 
 */

// 동적으로 폼을 생성합니다.
function createAsyncForm(formName, formId, action) {
	var form = $('<form />', {id:formName, name:formId, action: action, method: 'post'});
	return form.clone();	
}

// 동적으로 만들어진 폼에 변수를 hidden 형태로 삽입한 뒤 해당 폼을 리턴합니다.
function inputAsyncForm(form, name, val) {
	var input = $('<input />', {type: 'hidden', name: name, id: name, value: val});
	$(form).append($(input).clone());
	return form;
}

// 폼을 submit 하고, body 태그에서 흔적을 삭제합니다.
function submitAsyncForm(form) {
	$(form).prependTo('body');
	$(form).submit().remove();
}


// 금액 천단위마다 콤마찍기
function FormatNumber(price, num) {
	var str = new Array();
	price = String(price);
	for (var i = 1; i <= price.length; i++) {
		if (i % num)
			str[price.length - i] = price.charAt(price.length - i);
		else
			str[price.length - i] = ',' + price.charAt(price.length - i);
	}
	return str.join('').replace(/^,/, '');
}

/*
 * checkbox 의 체크된 값들을 하나의 스트링에 구분자로 나누어 저장 
 * 
 * 작성자 : 김병기 작성일자 : 2011.04.20
 * ------------------------------------------------------------- 
 * desciption :
 * 
 * input : - chName 체크박스의 name 속성값, 
 *         - sp 구분자 : ex ',', '#', '*', ... 
 * return : 구분자로 나뉘어진 스트링 Value
 * 
 * ex) var str = checkedToString('key', ',');
 */
function checkedToString(chName, sp) {
	var rtn = "";
	$("input[name=" + chName + "]:checkbox").each(function() {
		if ($(this).is(":checked")) {
			rtn += $(this).val() + sp;
		}
	});
	var lastIndex = rtn.lastIndexOf(sp);
	rtn = rtn.substring(0, lastIndex);
	return rtn;
}

// 공백 제거 trim() 메소드
function fncTrim(value) {
	value = value.replace(/^\s*/, '');
	value = value.replace(/\s*$/, '');

	return value;
}
// 공백제거후 값의 length 반환
function fncValuLength(value) {

	return fncTrim(value).length;
}
// form id 를 넘겨주면 해당 input:text 앞뒤 trim 처리
$.trimAllText = function(target) {
	$("input:text", "#" + target).each(function() {
		$(this).val($.trim($(this).val()));
		console.log("> input name : " + $(this).attr("name"));
	});
};
// jscript 태그가 있으면 로딩 완료 후 eval을 이용하여 스크립트를 실행한다.
$.doJscript = function() {
	$("[name=jscript]").each(function($idx, $data) {
		eval($($data).text());
		console.log("jscript excute :: " + $($data).text());
		$($data).remove();
	});
};

// 숫자만 입력받는 텍스트
// <input type="text" style="ime-mode:disabled;" onKeyPress="return
// numbersonly(event, false)">
function numbersonly(e, decimal) {
	var key;
	if (window.event) {
		key = window.event.keyCode;
	} else if (e) {
		key = e.which;
	} else {
		return true;
	}
	keychar = String.fromCharCode(key);
	/*if(key < 48 || key > 57){
		return false;
    } else {
    	return true;
    }*/
	if (!(key == 8 || key == 9 || key == 13 || (key >= 35 && key <= 40)
			|| key == 45 || key == 46 || key == 116 || key == 144
			|| (key >= 48 && key <= 57) || (key >= 96 && key <= 105)
			|| key == 110 || key == 190)) {
		return false;
	} else {
		return true;
	}
}

jQuery.fn.extend({
    /**
     * 숫자만 입력 가능하도록 처리
     */
    numberOnly : function() {
        return this.each(function() {
            try {
                var $this = $(this);

                // FF patch : 한글입력 상태에서 keydown 입력 제한이 안걸리는 문제가 있어 한글 입력 불가능하도록 설정
               $this.css('ime-mode', 'disabled');
                
                
        		//숫자, del, backspace 키만 입력가능 설정
                $this.keypress(function(p_event) {
                	var keyCode = window.event ? window.event.keyCode : e.which;
            		if (window.event) {
            			keyCode = window.event.keyCode;
            		} else if (e) {
            			keyCode = e.which;
            		} else {
            			return true;
            		}

                    if((48<=keyCode && keyCode<=57) || keyCode==0 || keyCode==45 || keyCode==8){
                    	return;
                    }else{
                        if(window.event)    window.event.returnValue = false;
                        else e.preventDefault();
                    }
                    
                });
                
                //한글 입력 불가로 설정(크롬)
                $this.keyup(function(e){
                	var keyCode = window.event ? window.event.keyCode : e.which;
            		if (window.event) {
            			keyCode = window.event.keyCode;
            		} else if (e) {
            			keyCode = e.which;
            		}
                	
                    if (!(keyCode >=37 && keyCode<=40)) {
                        var inputVal = $(this).val();
                        if(window.event)    window.event.returnValue = false;
                        else e.preventDefault();
                        $(this).val(inputVal.replace(/[^0-9]/gi,''));

                    }

                });
                

                // 포커스를 얻어을 때 처리 - number format을 위한 콤마를 모두 제거한다.
                $this.focus(function() {
                    $this.val($this.val().replace(/,/g, ''));
                });
            } catch(e) {
                alert("[common.js's numberOnly] " + e.description);
            }
        });
    }    
});

/*
 * StringUtil
 */
//문자열 byte 체크 알파벳&숫자 (1byte), 한글(3byte)
function getStringByte (str) {
	var strLength = 0;

	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		var ch = str.substr(i,1).toUpperCase();

		code = parseInt(code);

		if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0)))
			strLength = strLength + 3;
		else
			strLength = strLength + 1;
	}
	return strLength;
}
/* 
obj  			: this
limitByte 	: 제한 size  ex) 10 -> 10byte까지만
초과된 글자 삭제
*/
function cutString(obj, limitByte) {

    var  byteLength = 0;
    var tempStr = "";
    var tempStr2 = "";

    for(var i = 0; i < (obj.value).length; i++) {
        tempStr = (obj.value).charAt(i);

        if(escape(tempStr).length > 4) {
            byteLength += 3;
        }else {
            byteLength += 1;
        }

        if (byteLength > limitByte) { //초과된 글자수가 위치하는 지점
        
            if(escape(tempStr).length > 4) { //한글
                byteLength -= 3;
            }
            else {                           //기타
                byteLength -= 1;
            }

            break;
        }
        else {
        
            tempStr2 += tempStr;
        }
    }
    //제한길이를 초과한 문자는 초과부분까지만 표시
    obj.value = tempStr2;
    
}
/* 
obj  			: this
limitByte 	: 제한 size  ex) 10 -> 10byte까지만
ex onkeyup="javascript:cutString(this, 300 );"
제한문자길이 체크하고, 초과된 글자 삭제
*/
function checkStrByte(obj, limitByte) {
	var strByte = getStringByte (obj.value);
	if (strByte > limitByte) {
        alert("최대 " + limitByte + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
        cutString(obj, limitByte);
    }
}
//한글 포함 여부 확인	
function isKorean(str) {
	var pattern = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;
	return (pattern.test(str)) ? true : false; 
}
//숫자만 이루어졌는지 확인
function isNumeric(str) {
	var re = /^[0-9]+$/;
    return !re.test(str) ? false : true;
}

//숫자 입력 체크
function onlyNum(value) {
	
 if(Number(value) == 'NaN') {
	 return false;
 } else {
	 return true;
 }
 
 //var pattern = /\D/g;

 //if (pattern.test(value)) {
 //    return false;
 //}

 //return true;
}

//특수문자 제한
function checkSpecialChar(obj)
{
	var _etcValue3   = '<>+;:|\'\"';
	for(var i=0; i<obj.value.length; i++)
	{
		for(var j=0;j<_etcValue3.length;j++){ 
			if(obj.value.charAt(i) == _etcValue3.charAt(j))
			{
				alert("특수문자는 입력할 수 없습니다!\n[<>+;:|\'\"]");
				return false;
			}
		}
	}
	return true;
}

/*
 * 이메일 형식인지 확인
 * false : 이메일 형식, true : 이메일 형식 아님
 */
function isEmail(str) {	
	var re = /^[0-9a-zA-Z][_0-9a-zA-Z\-]*@[_0-9a-zA-Z\-]+[.][._0-9a-zA-Z\-]+$/; 
    return !re.test(str) ? true : false;
}

//콤마제거
function removeComma(val) {
	if(val === 0){
		return val;
	}
    return val.replace(/,/g, '');
}


// 올바른 URL 패턴인지 체크
function collectURL(text) {
	var rUrlRegex = /(?:(?:(https?|ftp|telnet):\/\/|[\s\t\r\n\[\]\`\<\>\"\'])((?:[\w$\-_\.+!*\'\(\),]|%[0-9a-f][0-9a-f])*\:(?:[\w$\-_\.+!*\'\(\),;\?&=]|%[0-9a-f][0-9a-f])+\@)?(?:((?:(?:[a-z0-9\-가-힣]+\.)+[a-z0-9\-]{2,})|(?:[\d]{1,3}\.){3}[\d]{1,3})|localhost)(?:\:([0-9]+))?((?:\/(?:[\w$\-_\.+!*\'\(\),;:@&=ㄱ-ㅎㅏ-ㅣ가-힣]|%[0-9a-f][0-9a-f])+)*)(?:\/([^\s\/\?\.:<>|#]*(?:\.[^\s\/\?:<>|#]+)*))?(\/?[\?;](?:[a-z0-9\-]+(?:=[^\s:&<>]*)?\&)*[a-z0-9\-]+(?:=[^\s:&<>]*)?)?(#[\w\-]+)?)/gmi;
  return rUrlRegex.test(text);
}

//소수점 1자리 형식 확인
function isDecimal(obj) {
	var str = obj.value;
	var pattern = /^([0-9]{1,3})(\.[0-9]?)?$/;
	var result = true;
	if(pattern.test(str)) {
		result = true;
	}else {
		obj.focus();
		obj.value = '';
		result = false;
	}
	return result;
}

/*input값에 char안의 문자가 있는지 체크*/
function containsChars(input,chars) {
    for (var inx = 0; inx < input.length; inx++) {
       if (chars.indexOf(input.charAt(inx)) != -1)
           return true; 
    }
    return false;
}

 /*** 파일명, 확장자 추출
 // 결과예시 : fname = '/abc/def/ghi/filename.ext';
 // getFileName(fname)    -----> filename.ext
 // getFileName(fname, 1) -----> filename
 // getFileName(fname, 2) -----> ext
 **/
function getFileName(str, num){
	 var pos = str.lastIndexOf("/");
	 var ln = str.lastIndexOf("\.");
	 var filename = str.substring(pos + 1, ln);
	 var fullname = str.substring(pos + 1, str.length); 
	 var ext = str.substring(ln + 1, str.length); 
	 if(num==null || num=="") return fullname;
	 if(num==1) return filename;
	 if(num==2) return ext;
}


var DateUtil = {
	 dateGubun : '-',
	 dateFmt: function(date) {
	     var rDate = date;
		 if (typeof(rDate) == 'string') {
		     if(this.dateGubun) {
				 var sDate = rDate.split(this.dateGubun);
				 if(sDate.length == 3) {
				     rDate = new Date(sDate[0], parseInt(sDate[1], 10)-1, sDate[2]);
				 }
			 } else {
			     rDate = new Date(rDate.substr(0,4), parseInt(rDate.substr(4,2), 10)-1, rDate.substr(6,2));
			 }
		 } else {
			 var year = date.getFullYear();
			 var month = date.getMonth()+1;
			 var day = date.getDate();
			 if(month < 10){month = '0'+month;}
			 if(day < 10){day = '0'+day;}
			  rDate = year+this.dateGubun+ month+this.dateGubun+day;
		 }
		 return rDate;
	  },
     diffDays: function(d1, d2, dateGubun) {
    	 this.dateGubun = dateGubun;
         var t2 = this.dateFmt(d2).getTime();
         var t1 = this.dateFmt(d1).getTime();
         
         return Math.floor((t2-t1)/(24*3600*1000));
//		          return parseInt((t2-t1)/(24*3600*1000), 10);
     },   
     diffWeeks: function(d1, d2, dateGubun) {
      this.dateGubun = dateGubun;
         var t2 = this.dateFmt(d2).getTime();
         var t1 = this.dateFmt(d1).getTime();
  
         return parseInt((t2-t1)/(24*3600*1000*7), 10);
     },
     diffMonths: function(d1, d2, dateGubun) {
    	 this.dateGubun = dateGubun;
         var d1Y = this.dateFmt(d1).getFullYear();
         var d2Y = this.dateFmt(d2).getFullYear();
         var d1M = this.dateFmt(d1).getMonth();
         var d2M = this.dateFmt(d2).getMonth();
  
         return (d2M+12*d2Y)-(d1M+12*d1Y);
     },
     diffYears: function(d1, d2, dateGubun) {
      this.dateGubun = dateGubun;
         return this.dateFmt(d2).getFullYear()-this.dateFmt(d1).getFullYear();
     }, 
     /*
      * 두 날짜 스트링을 입력받아 두 날짜 사이의 차이를 체크한다.
      * (DateUtil 함수를 사용)
      */
     checkDateTerm: function (date1, date2) {
    		var type1 = 'yyyymmdd';
    		var type2 = 'yyyymmdd';
    		var term = 0;
    		var result = 'ok';
    		// 문자열에 '-' 문자 포함여부' : yyyy-mm-dd 형식
    		if (date1.indexOf('-') > -1) type1 = 'yyyy-mm-dd';
    		if (date2.indexOf('-') > -1) type2 = 'yyyy-mm-dd';
    		if (type1 != type2) result = "typeDisMatch";
    		// 차이(term)를 구한다.
    		if (type1 == 'yyyymmdd') {
    			term = DateUtil.diffDays(date1, date2);
    		} else {
    			term = DateUtil.diffDays(date1, date2, '-');
    		}
    		if (term < 0) result = "upsidedown";
    		// 날짜의 차이에 따른 alert()
    		return result;
     },
     getCurrentTime : function() {
    	 //현재 시간을 리턴(시분초.)
    	 var myDate = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    	 return myDate;
     },
     getBeforeAnyWeekDate : function(pWeek){
         var today = new Date();
         var myDate = new Date(Date.parse(today) - 7 * 1000 * 60 * 60 * 24);
         var year  = myDate.getFullYear();
         var month =(myDate.getMonth() +1);
         var day   = myDate.getDate();
         if(month < 10){month = '0'+month;}
         if(day < 10){day = '0'+day;}
    	 
         return year+this.dateGubun+ month+this.dateGubun+day;
     },
     getBeforeAnyMonthDate : function(pMonth){
         var today = new Date();
         
         var todayMonth = today.getMonth() +1;
         var todayMonthMaxDay = 0;
         var todayMonthMaxDayTatal = 0;
         var myDate = new Date();
         
         for(var i = 0; i < pMonth; i++){
        	 if(todayMonth == 2){ 
        		 todayMonthMaxDay = 28;
        	 } else if(todayMonth == 4 || todayMonth == 6 || todayMonth == 9 || todayMonth == 11){ 
        		 todayMonthMaxDay = 30; 
        	 } else { 
        		 todayMonthMaxDay = 31; 
        	 }
        	 var myDateMonth = new Date(Date.parse(today) - todayMonthMaxDay * 1000 * 60 * 60 * 24);
        	 todayMonth = myDateMonth.getMonth()+1
        	 todayMonthMaxDayTatal = todayMonthMaxDayTatal + todayMonthMaxDay;
         }
         
         var myDate = new Date(Date.parse(today) - todayMonthMaxDayTatal * 1000 * 60 * 60 * 24);
    	 var year  = myDate.getFullYear();
		 var month =myDate.getMonth() +1;
		 var day   = myDate.getDate();
		 if(month < 10){month = '0'+month;}
		 if(day < 10){day = '0'+day;}
		 
    	 return year+this.dateGubun+ month+this.dateGubun+day;
     },
     getCurrentDttm : function() {
    	 var current = '';
         if(arguments[0] !== null) {
        	 current = this.dateFmt(new Date()).replace(/-/g, "")+this.getCurrentTime().replace(/:/g, "");
         } else {
        	 current = this.dateFmt(new Date())+" "+this.getCurrentTime();
         }
         return  current;
     },
     getCurrentYear : function() {
         return  new Date().getFullYear();
     }
};

function setCookie( name, value, expiredays ) {
    var todayDate = new Date();
    todayDate.setDate( todayDate.getDate() + expiredays );
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}
function SetCookie(name, value, expires) { 
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + expires.toGMTString() + ";"
}
function getCookie( name ) { 
    var nameOfCookie = name + "="; 
    var x = 0; 
    
    while ( x <= document.cookie.length ) 
    { 
        var y = (x+nameOfCookie.length); 
        if ( document.cookie.substring( x, y ) == nameOfCookie ) 
        { 
            if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) 
                endOfCookie = document.cookie.length;
            return unescape( document.cookie.substring( y, endOfCookie ) ); 
        } 
        x = document.cookie.indexOf( " ", x ) + 1; 
        if ( x == 0 ) 
            break; 
    } 
    return ""; 
}
function cookieVal(cookieName){
	thisCookie = document.cookie.split("; ");
	for(i=0;i<thisCookie.length;i++){
		if(cookieName == thisCookie[i].split("=")[0]){
			return thisCookie[i].split("=")[1];
		}
	}
	return "";
}
/*
 * 비밀번호 확인
 * 특이사항 : 영문 시작
 * 범위 : 숫자 영문 기호
 * 길이 : 8자리 이상 20자리 이하
 */
function isPassword(text){
	//var regexp = /^[a-zA-Z]{1}[\w\W]{7,19}$/;
	var regexp = /^.*(?=^.{8,20}$)(?=^.[a-zA-Z])(?=.*?\d)(?=.*?[a-zA-Z])(?=.*?[!@#$%^&+=]).*$/;
	return regexp.test(text);
}

/*
 * 코드 확인
 * 특이사항 : 영문 시작
 * 범위 : 영문 숫자
 * 길이 : 2자리 이상 20자리 이하
 */
function isCode(text){
	var regexp = /^[a-zA-Z]{1}[\w]{1,19}$/;
	return regexp.test(text);
}

/*
 * 아이디 확인
 * 특이사항 : 영문 시작
 * 범위 : 영문 숫자
 * 길이 : 5자리 이상20자리 이하
 */
function isId(text){
	var regexp = /^[a-zA-Z]{1}[\w]{4,19}$/;
	return regexp.test(text);
}

/*
 * 이름 확인
 * 특이사항 : 한글 영문 시작
 * 범위 : 한글 영문 숫자
 * 길이 : 2자리 이상 20자리 이하
 */
function isUsrName(text){
	var regexp = /^[a-zA-z가-힣]{1}[\w가-힣]{1,19}$/;
	return regexp.test(text);
}

/*
 * 전화번호 확인
 * 특이사항 : 0으로 시작, 첫자리 가운데 혹은 끝자리 0불가, 중간자리 첫번 째 0 불가 , 끝자리 첫번 째 0 불가
 * 범위 : 숫자
 * 길이 : 9 ~ 11
 */
function isTel(text){
	var regexp = /^0[1-9]{1}[0-9]{0,1}[1-9]{1}[0-9]{2,3}[0-9]{4}$/;
	return regexp.test(text);
}

/*
 * 휴대폰 번호 확인
 * 특이사항 : 0으로 시작 국번 가운데 혹은 끝자리 0불가, 중간자리 첫번 째 0 불가 
 * 범위 : 한글 영문 숫자
 * 길이 : 2자리 이상 20자리 이하
 */
function isMpn(text){
	var regexp = /^0[1-9]{1}[0-9]{1}[1-9]{1}[0-9]{2,3}[0-9]{4}$/;
	return regexp.test(text);
}

/*
 * 이름 확인
 * 특이사항 : 한글, 영어, 숫자, _,-,() 공백
 * 범위 : 한글 영문 숫자 _ space
 * 길이 : 1자리 이상 20자리 이하
 */
function isName(text){
	var regexp = /^[\w가-힣_\-() ]{1,20}$/;
	return regexp.test(text);
}

function isAlNumber(text) {
	var regexp = /^[A-Za-z0-9]*$/;
	return regexp.test(text);
}

function isAlHanNumber(text) {
	var regexp = /^[\w가-힣_/ ]*$/;
	return regexp.test(text);
}

function isUrl(text){
	var regexp = /^[/]{1}[/.\-_\w]{1,99}$/;
	return regexp.test(text);
}

function onlyBigEng(text, length){
	if(text.length > length){
		return false;
	}
	var regexp = /^[A-Z]*$/;
	return regexp.test(text);
}
/**
 * jquery Ajax 
 * @since 2015.04.10
 * @author  ymshin
 * 
 * */
var commonAjax = {};
commonAjax.ajax = function(pType, pUrl, pDataType, pData, pCb) {
	$.ajax({
		type		: pType,
		url			: pUrl,
		dataType	: pDataType,
		data		: pData,
		success		: function( data ) {
			pCb(data);
		},
		error : function(jqXHR, textStatus,errorThrown){
			if(jqXHR.status === 500){
				alert("에러가 발생했습니다.");
			} 
			//console.log(textStatus);
		}
	});			
	
};
commonAjax.postAjax = function(pUrl, pDataType, pData, pCb) {
	this.ajax('POST', pUrl,  pDataType, pData, pCb);
};
commonAjax.getAjax = function(pUrl, pDataType, pData, pCb) {
	this.ajax('GET', pUrl, pDataType, pData, pCb);
};
/**공통코드*/
commonAjax.getCommonCode = function(comUpCd , pCb) {
	var pdata = {};
	if(comUpCd.length > 3) {
		pdata = {"comCd" : comUpCd };
	} else {
		pdata = {"comUpCd" : comUpCd };
	}
	this.ajax("post", "/commonCode/getCommonCode.do", "json", pdata , pCb);
};

commonAjax.getCommonCode2 = function(comUpCd , pCb) {
	var pdata = {};
	
		pdata = {"comUpCd" : comUpCd };
		
	this.ajax("post", "/commonCode/getCommonCode.do", "json", pdata , pCb);
};
/** 추가 : 정기권 이용권 요금 가져오기_2016.07.11_by_JHN*/
commonAjax.getCommonPayment = function(comUpCd , pCb) {
	var pdata = {};
	if(comUpCd.length > 3) {
		pdata = {"comCd" : comUpCd };
	} else {
		pdata = {"comUpCd" : comUpCd };
	}
	this.ajax("post", "/commonCode/getPayment.do", "json", pdata , pCb);
};
/** 2018.04
commonAjax.getCommonPayment2 = function(comUpCd , pCb) {
	var pdata = {};
	if(comUpCd.length > 3) {
		pdata = {"comCd" : comUpCd };
	} else {
		pdata = {"comUpCd" : comUpCd };
	}
	this.ajax("post", "/commonCode/getPayment2.do", "json", pdata , pCb);
};
**/
/**스테이션*/
commonAjax.getStationCode = function( pCb) {
	this.ajax("post", "/commonCode/getStation.do", "json", {}, pCb);
};
/**센터*/
commonAjax.getCenterCode = function( pCb) {
	this.ajax("post", "/commonCode/getCenterInfo.do", "json", {}, pCb);
};
/**운영자 데이터*/
commonAjax.getAdminInfo = function(pGrpCd, pCb) {
	this.ajax("post", "/commonCode/getUserGrpInfo.do", "json", {"usrGrpCd" : pGrpCd}, pCb);
};
/**운영자 데이터*/
commonAjax.getAdminList = function(pGrpCd, pName, pCb) {
	this.ajax("post", "/commonCode/getUserGrpInfo.do", "json", {"usrGrpCd" : pGrpCd, "usrName" : pName}, pCb);
};
/**벌점 데이터*/
commonAjax.getPenaltyCode = function(pCb) {
	this.ajax("post", "/commonCode/getPenaltyCode.do", "json", {}, pCb);
};
/**장애신고코드 데이터*/
commonAjax.getFaultList = function(pSeq, pCb) {
	this.ajax("post", "/commonCode/getFaultList.do", "json", {"faultSeq" : pSeq}, pCb);
};

var commCdBox = {};
commCdBox.makeComboBox = function( cType,cVal,comboData, comboParent) {
	var $pDisplay = null;
	if(typeof comboParent === "string") {
		$pDisplay = $("#"+comboParent);
	} else {
		$pDisplay = comboParent;
	}
	var cSize = comboData.length;
	
	if(cType === 'S') {
		var sub = [];
		for(var i=0; i < cSize; i +=1 ) {
			//빅텍 시험용은 빼기
			if(comboData[i].stationId !== '2') {
				var $op = $("<option>", {value : comboData[i].stationId}).text(comboData[i].stationName);
				if(cVal !== '' && cVal === comboData[i].stationId ) {
					$op.attr('selected', true);
				}
				if(comboData[i].stationList !== null ) {
					sub.push(comboData[i].stationList);
				}
				if($pDisplay.children().length === 0) {
					$pDisplay.append($op);
				} else {
					$pDisplay.children().last().after($op);
				}
			}
		}
		$pDisplay.data("sub_data", sub);
	} else if(cType === 'C') {
		for(var i=0; i < cSize; i +=1 ) {
			var $op = $("<option>", {id :'center_'+comboData[i].centerId , value : comboData[i].centerId}).text(comboData[i].centerName);
			if(cVal !== '' && cVal === comboData[i].centerId) {
				$op.attr('selected', true);
			}
			if($pDisplay.children().length === 0) {
				$pDisplay.append($op);
			} else {
				$pDisplay.children().last().after($op);
			}
		}
	} else if(cType === 'D') {//추가 : JHN //라벨 추가
		for(var i=0; i < cSize; i +=1 ) {
			var $op = $("<option>", {id : comboData[i].comCd, value : comboData[i].rentFee, title : comboData[i].mileageUseYn, etc1 : comboData[i].discountFee, etc2 : comboData[i].zeroPayDiscountFee}).text(comboData[i].comCdName);
			if(cVal !== '' && cVal === comboData[i].comCd) {
				$op.attr('selected', true);
			}
			if($pDisplay.children().length === 0) {
				$pDisplay.append($op);
			} else {
				$pDisplay.children().last().after($op);
			}
		}
	} else {
		for(var i=0; i < cSize; i +=1 ) {
			var $op = $('<option>',{ id : 'comm_'+comboData[i].comCd, value : comboData[i].comCd }).text(comboData[i].comCdName);
			if(cVal !== '' && cVal === comboData[i].comCd) {
				$op.attr('selected', true);
			}
			if($pDisplay.children().length === 0) {
				$pDisplay.append($op);
			} else {
				$pDisplay.children().last().after($op);
			}
		}
	}
};

//서울자전거 서비스 시작일자 상수 추가
var SPB_SVC_START_DATE = "2015-01-01";

//정수.실수 체크함수.
function chkNumber(pChk) {
	var regexp =/^[+-]?\d*(\.?\d*)$/;
	
	return regexp.test(pChk);
}
/*
 * 대여비밀번호
 * 특이사항 : 숫자 1-4까지 4자리로
 * 범위 : 숫자 1-4
 * 길이 : 4자리
 */
function isRentPw(pChk) {
    var regexp = /^[1-4]*$/;
	return regexp.test(pChk);
	
}
//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
	//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
};

//숫자만 입력(콤마 처리)
$(".onlyCommaNumber").keypress(function (event) {
    if (event.which && (event.which < 48 || event.which > 57)) {   //숫자만 받기
        event.preventDefault();
    }
}).keyup(function () {
    if ($(this).val() != null && $(this).val() != '') {
        var text = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(comma(text));
    }
});

//숫자만 입력
$(".onlyNumber").keypress(function (event) {
    if (event.which && (event.which < 48 || event.which > 57)) {   //숫자만 받기
        event.preventDefault();
    }
});


////////////////////////////////////////////////////////////////사용자 app용 공통 스크립트////////////////////////////////////////////////////////////
//app 용 QRsacn
var app = {
	deviceType : ''
   ,deviceName : ''
   ,couponTime : 60
   ,rentType : ''
   ,unLockType : ''
   ,isTest : false
   ,targetUrl : ''
   ,errQr : ''   
   ,voucherSeq : '' //web test용.
   ,lat : 0
   ,log : 0
   ,snsType : 0
   ,checkDevice : function() {
		//디바이스 체크 fnc
		var mobileKeyWords = new Array('iPhone','iPad', 'BlackBerry', 'Android', 'Windows CE', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson');
		var deviceName = "";
		for (var word in mobileKeyWords){
			if (navigator.userAgent.match(mobileKeyWords[word]) != null){
				deviceName = mobileKeyWords[word];
				break;
			}
		}
		return deviceName;
	}
    ,QRscanStart : function(){
		if(this.deviceType === 'android' || this.deviceType === "Android") {
		    window.android.scanQR();
		} 
		if(this.deviceType === 'iPhone' || this.deviceType === 'iPad' || this.deviceType === 'ios') {
			webkit.messageHandlers.ioscall.postMessage('{"call":"scanQR"}');
		}
	}
	,getUsrGpsInfo : function() {
		
		if(this.deviceType === 'android' || this.deviceType === "Android") {
            window.android.gpsStart();
        } 
        if(this.deviceType === 'iPhone' || this.deviceType === 'iPad'|| this.deviceType === 'ios') {
        	webkit.messageHandlers.ioscall.postMessage('{"call":"gpsStart"}');
        }
    }
	,unLock : function() {
		if (this.isTest) {
			alert('unLock');
			alert(this.deviceName);
		}
		if (this.unLockType === '') {
			this.unLockType = getCookie("unLockType");
		}
		if (this.couponTime === 0) {
			this.couponTime = getCookie("couponTime");
		}
		if(this.deviceType === 'android' || this.deviceType === "Android") {
            window.android.unLock(this.deviceName, this.couponTime);
        } 
        if(this.deviceType === 'iPhone' || this.deviceType === 'iPad'|| this.deviceType === 'ios') {
        	webkit.messageHandlers.ioscall.postMessage('{"call":"unLock", "deviceId": "'+this.deviceName+ '", "couponTime": "'+this.couponTime+'"}');
        }
    }
	,returnCheck : function() {
		if (this.isTest) {
			alert('returnCheck');
		}
		if(this.deviceType === 'android' || this.deviceType === "Android") {
            window.android.returnCheck(this.deviceName);
        } 
        if(this.deviceType === 'iPhone' || this.deviceType === 'iPad'|| this.deviceType === 'ios') {
        	webkit.messageHandlers.ioscall.postMessage('{"call":"returnCheck", "deviceId": "'+this.deviceName+ '"}');
        }
    }
	,noReturnDataReset : function() {
		if (this.isTest) {
			alert('dataReset : '+this.deviceName);
		}
		if(this.deviceType === 'android' || this.deviceType === "Android") {
            window.android.noReturnDataReset(this.deviceName);
        } 
        if(this.deviceType === 'iPhone' || this.deviceType === 'iPad'|| this.deviceType === 'ios') {
        	webkit.messageHandlers.ioscall.postMessage('{"call":"noReturnDataReset", "deviceId": "'+this.deviceName+ '"}');
        }
    }
	,invokeSnsLogin : function() {
		if (this.isTest) {
			alert('snsLogin : '+ this.snsType);
		}
		if(this.deviceType === 'android' || this.deviceType === "Android") {
            window.android.invokeSnsLogin(this.snsType);
        } 
        if(this.deviceType === 'iPhone' || this.deviceType === 'iPad'|| this.deviceType === 'ios') {
        	webkit.messageHandlers.ioscall.postMessage('{"call":"invokeSnsLogin", "type": "'+this.snsType+ '"}');
        }
    }
	,popTutorial : function() {
		if (this.isTest) {
			alert('popTutorial');
		}
		if(this.deviceType === 'android' || this.deviceType === "Android") {
            window.android.popTutorial();
        } 
        if(this.deviceType === 'iPhone' || this.deviceType === 'iPad'|| this.deviceType === 'ios') {
        	webkit.messageHandlers.ioscall.postMessage('{"call":"popTutorial"}');
        }
    }
	
};
/**
 * 빅텍 QRcode 복호
 * */
var keyStr = "Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9KkLlMmNnOoPpQqRrSsTtUuVvWwXx+Yy/Zz"; 
//var keyStr = "Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jh9KkLlMmNnOoPpQqRrSsTtUuVvWwXx+Yy/Zz" ;
function decode64(input){
    var output = "", chr1, chr2, chr3,enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		
		output = output + String.fromCharCode(chr1);
		
		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	} while (i < input.length);
	return output;
}

function scanInfo(sInfo){
	//scan result callback fnc
    //대여소 정보로 해당 대여소에 대한 정보 
    //QRcode 정보에 대해서는 미정.
    var infoObj = JSON.parse(sInfo);
    //빅텍용 디코드
    //var rId = unescape(decode64(infoObj.scanInfo));
    
    if(rId !== '' && Number(infoObj.success) === 0){
    	var rId = escape(decode64(infoObj.scanInfo)).substring(0, 14);
    	if(app.errQr !== ''){
			if(rId.indexOf("SPB-") != -1){
				$("#bikeNo").val(rId.substring(7,14));
				inBikeNumber();
			}else{
				alert('신고가 불가능한 자전거 입니다.');
				return;
			}
    	}else{
    	// QR 자전거 인 경우 메인에서 바로 처리
    	if ((rId.indexOf("SSBK-") != -1) || (rId.indexOf("SPB-") != -1)) {
    		//progressShow
    		//$('#progress').show();
    		$('#progress').css('display',''); 
    		
    		/*if (app.rentType == 'RCC_004') {
				// 단체권 qr 대여 막음
				$('#progress').css('display','none'); 
        		doubleSubmitFlag = false;
        		alert("단체권 사용은 준비중입니다.");
                return false;
			} else {*/
				// QR 단말기
	    		commonAjax.postAjax('/app/rent/'+app.rentType+'/getQRBikeCodeDataInfo.do', "json", {rackId:rId, rentType:app.rentType, voucherSeq:app.voucherSeq} ,function(data){
	    			if(data.result) {
	    				if (data.qrData != null && data.qrData.bikeId != '') {
	    					$("#voucherSeq").val(app.voucherSeq);
	        				$("#rentType").val(app.rentType);
	        				$("#deviceId").val(data.qrData.deviceId);
	        				$("#bikeId").val(data.qrData.bikeId);
	        				$("#rackId").val(data.qrData.rackId);
	        				$("#stationId").val(data.qrData.stationId);
	        				$("#deviceName").val(data.qrData.deviceName);
	        				
        					commonAjax.getAjax("/app/rent/isChkRentStatus.do","json",{rentType : app.rentType, rentYn : "Y"}
	                        , function(chkData){
	                        	
	                        	if(!chkData.isRent){
	                        		if (data.qrData.deviceName != '') {
	                					app.deviceName = data.qrData.deviceName;
	                					if (app.isTest) {
	                						alert(app.deviceName);
	                					}
	                					app.unLockType = "rent";
	                					app.couponTime = 60;
	                	        		
	                					if(data.qrData.rentClsCd =='RCC_005' || data.qrData.rentClsCd =='RCC_006'){
	                						app.couponTime = 120;
	                					}
	                					
	                					setCookie("couponTime", app.couponTime);
	                	        		setCookie("unLockType", "rent");
	                	        		
	                					$('#rentBikeText').text("단말기 연결중");
	                					app.unLock();
	                				}
	                        	}  else {
	                        		$('#progress').css('display','none'); 
	                        		doubleSubmitFlag = false;
	                                alert('대여가 불가능 합니다.');
	                                return false;
	                            }
		                        });
	        				} else {
	        					$('#progress').css('display','none'); 
		    					doubleSubmitFlag = false;
	        					alert("죄송합니다. 해당 자전거는 관리가 필요하여 현재 대여가 어렵습니다. ("+bikeStusCd+")");
	        					return;
	        				}
	    				
	    				return;
	    			} else {
	    				var resultCode = data.resultCode;
	    				var bikeStusCd = data.bikeStusCd;
        				if (bikeStusCd != '' && bikeStusCd != '03') {
        					$('#progress').css('display','none'); 
	    					doubleSubmitFlag = false;
        					alert("죄송합니다. 해당 자전거는 관리가 필요하여 현재 대여가 어렵습니다. ("+bikeStusCd+")");
        					return;
        				} else if (resultCode == -5) {
        					$('#progress').css('display','none');
    	    				doubleSubmitFlag = false;
    	    				alert('죄송합니다. 해당자전거는 배터리가 부족하여 대여가 어렵습니다.');
    	    				return;
        				} else if (resultCode == -6) {
        					$('#progress').css('display','none');
    	    				doubleSubmitFlag = false;
    	    				alert('죄송합니다. 해당 자전거는 e따릉가 아닙니다. e따릉이를 인식해 주십시오.');
    	    				return;
        				} else {
        					$('#progress').css('display','none');
    	    				doubleSubmitFlag = false;
    	    				alert('죄송합니다. 해당자전거는 이미 대여중인 상태이거나 대여소 정보가 없어 대여가 어렵습니다.');
    	    				return;
        				}
	    				
	    			}
	            }); 
			//}
    	} else {
    		// 거치대
    		var form = createAsyncForm("QRForm", "QRForm", app.targetUrl);
        	form = inputAsyncForm(form, "rentType", app.rentType);
        	form = inputAsyncForm(form, "voucherSeq", app.voucherSeq);
        	form = inputAsyncForm(form, "rackId",rId);
        	submitAsyncForm(form);
    	}
    	}
    	//location.href = app.targetUrl+"?rackId="+rId+"&rentType=&voucherSeq=";
    } else {
    	$('#progress').css('display','none'); 
    	doubleSubmitFlag = false;
        return false;
    }
}

function scanInfoDirect(sInfo){
	//scan result callback fnc
    var infoObj = JSON.parse(sInfo);
    //var rId = unescape(decode64(infoObj.scanInfo));
    //var rId = 'SPB-' + infoObj.scanInfo;
    var rId = infoObj.scanInfo;
    if(rId !== '' && Number(infoObj.success) === 0){
    	
    	if(app.errQr !== ''){
			if(rId.indexOf("SPB-") != -1){
				$("#bikeNo").val(rId.substring(7,14));
				inBikeNumber();
			}else{
				alert('신고가 불가능한 자전거 입니다.');
				return;
			}
    	}else{
    		$('#progress').css('display',''); 
    		// QR 단말기
    		commonAjax.postAjax('/app/rent/'+app.rentType+'/getQRBikeCodeDataInfo.do', "json", {rackId:rId, rentType:app.rentType, voucherSeq:app.voucherSeq} ,function(data){
    			if(data.result) {
    				if(data.qrData != null) {
    					// QR 단말기
    					if (data.qrData.bikeSeCd === 'BIK_002' && data.qrData.bikeId != '') {
    						$("#voucherSeq").val(app.voucherSeq);
    						$("#rentType").val(app.rentType);
    						$("#deviceId").val(data.qrData.deviceId);
    						$("#bikeId").val(data.qrData.bikeId);
    						$("#rackId").val(data.qrData.rackId);
    						$("#stationId").val(data.qrData.stationId);
    						$("#deviceName").val(data.qrData.deviceName);
    						/*if (app.rentType == 'RCC_004') {
    							// 단체권 qr 대여 막음
    							$('#progress').css('display','none'); 
    	                		doubleSubmitFlag = false;
    	                		alert("단체권 사용은 준비중입니다.");
    	                        return false;
    						} else {*/
    							commonAjax.getAjax("/app/rent/isChkRentStatus.do","json",{rentType : app.rentType, rentYn : "Y"}
    			                , function(chkData){
    			                	
    			                	if(!chkData.isRent){
    			                		if (data.qrData.deviceName != '') {
    			        					app.deviceName = data.qrData.deviceName;
    			        					if (app.isTest) {
    			        						alert(app.deviceName);
    			        					}
    			        					app.unLockType = "rent";
    			        					app.couponTime = 60;
    			        					
    			        					if(data.qrData.rentClsCd =='RCC_005' || data.qrData.rentClsCd =='RCC_006'){
    			        						app.couponTime = 120;
    			        					}
    			        					
    			        					setCookie("couponTime", app.couponTime);
    	                	        		setCookie("unLockType", "rent");
    	                	        		
    			        					$('#rentBikeText').text("단말기 연결중");
    			        					app.unLock();
    			        				}
    			                	}  else {
    			                		$('#progress').css('display','none'); 
    			                		doubleSubmitFlag = false;
    			                        alert('대여가 불가능 합니다.');
    			                        return false;
    			                    }
    			                });
    						/*}*/
    					} else {
    						// LCD 단말기
    						$('#progress').css('display','none'); 
                    		doubleSubmitFlag = false;
    						var form = createAsyncForm("QRForm", "QRForm", app.targetUrl);
    			        	form = inputAsyncForm(form, "rentType", app.rentType);
    			        	form = inputAsyncForm(form, "voucherSeq", app.voucherSeq);
    			        	form = inputAsyncForm(form, "rackId",data.qrData.rackId);
    			        	submitAsyncForm(form);
    					}
    					return;
    				} else {
    					$('#progress').css('display','none'); 
    					doubleSubmitFlag = false;
    					alert('죄송합니다. 해당자전거는 이미 대여중인 상태이거나 대여소 정보가 없어 대여가 어렵습니다.');
    					return;
    				}	
    			} else {
    				var bikeStusCd = data.bikeStusCd;
    				$('#progress').css('display','none');
    				if (bikeStusCd != '' && bikeStusCd != '03') {
    					doubleSubmitFlag = false;
    					alert("죄송합니다. 해당 자전거는 관리가 필요하여 현재 대여가 어렵습니다. ("+bikeStusCd+")");
    					return;
    				} else {
        				doubleSubmitFlag = false;
        				alert('죄송합니다. 해당자전거는 이미 대여중인 상태이거나 대여소 정보가 없어 대여가 어렵습니다.');
        				return;
    				}
    			}
    	    });
    	}
    } else {
    	doubleSubmitFlag = false;
    	return;
    }
}
//단말기에서 gps정보 return callback function
function chkGpsInfo(info){
	//alert(info);
    var jInfo = JSON.parse(info);
    if(typeof jInfo !== 'undefined'){
        if(Number(jInfo.gpsStatus) === 0){
            var loc = jInfo.gpsLoc;
            if(loc){
            	app.lat = loc.lat;
            	app.log = loc.log;
            	if (typeof nMap !== 'undefined' && nMap.map !== null) {
            		nMap.setGPSLoc(loc.lat,loc.log);
            		nMap.defaultLatitude = loc.lat;
                	nMap.defaultLongitude = loc.log;
            	}
            	setCookie("locLat", loc.lat);
            	setCookie("locLog", loc.log);
            }
        
        } /*else {
            alert("GPS정보를 가져오는데 실패했습니다.");
        }*/
    }
}

//단말기에서 resopnse callback function
function lockerResponse(info){
    var jInfo = JSON.parse(info);
    if(typeof jInfo !== 'undefined'){
    	var command = jInfo.command;
    	if (command == 'LOCK_OPEN') {
    		// 락 오픈
    		// result.userSeq
    		// result.lockStatus : OPEN
    		if (app.isTest) {
    			alert('lock 상태 : '+jInfo.result.lockStatus);
			}
    		
    		/*alert('lock 상태 : '+jInfo.result.lockStatus);*/
    		if (app.unLockType == '') {
    			app.unLockType = getCookie("unLockType");
    		}
    		
    		if (app.unLockType == 'rent') {
    			if (jInfo.result.lockStatus == 'OPEN') {
        			// 대여 실행
        			//alert('대여 완료');
        			$('#progress').css('display','none');
        			setCookie("returnFlag", "N");
        			if (app.rentType == '') {
        				app.rentType = getCookie("rentType");
        			}
        			if (app.couponTime == 0) {
        				app.rentType = getCookie("couponTime");
        			}
        			if (app.rentType != '' && app.couponTime != 0) {
        				$("#QRfrm").attr({action:'/app/rent/'+app.rentType+'/exeQrRentSuccess.do', method : 'post'}).submit();
        			}
        		} else if (jInfo.result.lockStatus == 'ERROR') {
        			$('#progress').css('display','none');
        			alert('자전거 잠금장치 오류상태를 감지하였습니다.\n다른자전거를 대여해주시기 바랍니다.');
        			doubleSubmitFlag = false;
        			return;
        		} else {
        			$('#progress').css('display','none');
        			alert('대여 실패\n다시 시도해 주세요.');
        			doubleSubmitFlag = false;
        			return;
        		}
    		} else if (app.unLockType == 'force') {
    			$('#progress').css('display','none');
    			doubleSubmitFlag = false;
    			return;
    		} else {
    			if (jInfo.result.lockStatus == 'OPEN') {
    				$('#progress').css('display','none');
    				alert('임시 잠금 해제');
    				doubleSubmitFlag = false;
    				return;
    			} else if (jInfo.result.lockStatus == 'ERROR') {
    				$('#progress').css('display','none');
    				alert('임시 잠금 상태가 아닙니다.');
    				doubleSubmitFlag = false;
    				return;
    			} else {
    				$('#progress').css('display','none');
        			//alert('잠금 해제 실패\n다시 시도해 주세요.');
    				alert('임시 잠금 상태가 아닙니다.');
        			doubleSubmitFlag = false;
        			return;
        		}
    				
    		}
    	} else if (command == 'LOCK_RETURN_STATUS') {
    		// 미반납 데이터 확인
    		/*alert(jInfo.command);
            alert(jInfo.result);
            alert(jInfo.result.userSeq);
            alert(jInfo.result.useTime);
    		alert(jInfo.result.beaconId);*/
    		var userSeq = jInfo.result.userSeq;
    		var useTime = jInfo.result.useTime;
    		var beaconId = jInfo.result.beaconId;
    		
    		if (userSeq > 0 && useTime >= 0) {
    			//alert('return exec');
    			// 반납 처리
				$("#useTime").val(useTime);
				$("#beaconId").val(beaconId);
				$("#lat").val(app.lat);
				$("#log").val(app.log);
				
				//$('#progress').css('display',''); 
				
				if (app.rentType != '') {
					// QR 단말기
		    		commonAjax.postAjax('/app/rent/'+app.rentType+'/exeQrReturnSuccess.do', "json", $("#QRfrm").serialize() ,function(data){
		    			if(data.result) {
		    				if (data.rentalVo.deviceName != '') {
		    					/*var serialNo = data.rentalVo.serialNo;
		    					
		    					var tempDeviceName = '';
		    					for (var i = serialNo.length; i < 7; i++) {
		    						tempDeviceName += '0';
		    					}*/
		    					
		    					app.deviceName = data.rentalVo.deviceName;
		    					
		        				$("#deviceName").val(deviceName);
		        				$('#progress').css('display','none');
		        				alert('반납되었습니다.');
		        				$('#progress').css('display','');
		        				if (deviceName != '') {
		        					app.noReturnDataReset();
		        				}
		    				} else {
		    					$('#progress').css('display','none'); 
		    					alert('반납이 불가능한 장소 입니다.\n\n반납은 대여소에서 반납요청을 하셔야 합니다.');
		    					doubleSubmitFlag = false;
		    					return;
		    				}
		    				//progressHide
		    	    		//$('#progress').hide();  	
		    				return;
		    			} else {
		    				$('#progress').css('display','none');
		    				alert('반납이 불가능한 장소 입니다.\n\n반납은 대여소에서 반납요청을 하셔야 합니다.');
		    				doubleSubmitFlag = false;
		    				//progressHide
		    	    		//$('#progress').hide();
		    				return;
		    			}
		            }); 
				} else {
					$('#progress').css('display','none');
	    			doubleSubmitFlag = false;
	    			alert('반납이 불가능한 상태 입니다.\n\n다시 시도해 주십시오.');
	    			return;
				}
    		} else {
    			$('#progress').css('display','none');
    			doubleSubmitFlag = false;
    			alert('반납이 불가능한 상태 입니다.\n\n다시 시도해 주십시오.');
    			return;
    		}
    		
    	}  else if (command == 'LOCK_NOT_RETURNED_DATA_DEL') {
    		// 미반납 데이터 삭제
    		$('#progress').css('display','none');
    		doubleSubmitFlag = false;
    		//alert('반납되었습니다.');
    		goHome();
    		return;
    	} else if (command == 'LOCK_STATUS') {
    		
    		if (app.isTest) {
    			alert('lock 상태 : '+jInfo.result.lockStatus);
			}
    		$('#progress').css('display','none');
    		doubleSubmitFlag = false;
    		
    		if (app.unLockType == '') {
    			app.unLockType = getCookie("unLockType");
    		}
    		
    		if (app.unLockType == 'self') {
    			alert('임시잠금 중이 아닙니다.');
    		} else if (app.unLockType == 'selfReturn') {
    			alert('잠금장치 결합 후 재 시도 부탁드립니다.');
    		} else {
    			alert('락이 열려 있습니다.');
    		}
    		
    		return;
    	}
        
    }
}

function rentStatusUpdate(info) {
	var jInfo = JSON.parse(info);
	/*alert(jInfo.command);
    alert(jInfo.result);
    alert(jInfo.result.bikeStatus);
    alert(jInfo.result.userType);
	alert(jInfo.result.lockStatus);
	alert(jInfo.result.returnDataStatus);
	alert(jInfo.result.userSeq);*/
	
	return;
}

function preScanInfo(info) {
	var jInfo = JSON.parse(info);
	if (jInfo.isGpsEnabled == false) {
		doubleSubmitFlag = false;
	}
	return;
}

function bleScanFinish(info) {
	var jInfo = JSON.parse(info);
	if (jInfo.isConnected == false) {
		// 대여 진행 중인지 확인하여 예약 인 경우 예약 취소 진행
		commonAjax.getAjax("/app/rent/isChkRentStatus.do","json",{rentType : app.rentType, rentYn : "N"}
        , function(chkData){
        	if(chkData.isRent){
        		// 예약 해제
        		commonAjax.getAjax("/app/rent/exeQRBikeBookingCancelProc.do","",""
                , function(cancleData){                	
                	if(cancleData.isRent){
                		// 예약 해제
                	}
                });
        	}
        });
		
		$('#progress').css('display','none');
		//alert('연결에 실패하였습니다.\n\n다시 시도해 주십시오.');
		alert('자전거 잠금장치 무선연결(페어링)에 실패하였습니다.\n잠시 후 QR코드를 다시 스캔하여 주세요\n(지속 반복될시, 스마트폰 블루투스 연결 종료후 재실행 또는 다른자전거를 대여하여 주시기 바랍니다.)');
		
		doubleSubmitFlag = false;
		
	} else {
		$('#rentBikeText').text("연결 되었습니다.");
	}
	/*alert(jInfo.command);
    alert(jInfo.result);
    alert(jInfo.result.bikeStatus);
    alert(jInfo.result.userType);
	alert(jInfo.result.lockStatus);
	alert(jInfo.result.returnDataStatus);
	alert(jInfo.result.userSeq);*/
	
	return;
}
//snsLogin Info return callback function
function loginSnsUser(info){
	//alert(info);
    var jInfo = JSON.parse(info);
    var code = Number(jInfo.code);
    if(typeof jInfo !== 'undefined'){
        if(code === 200){
            var userId = jInfo.userId;
            var snsType = jInfo.snsType;
            if(userId){
            	
            	jsonData = {"id" : "", "pw" : "", "auto" : "Y", "snsType" : snsType, "call" : "setLogin"};
    			loginInfo = JSON.stringify(jsonData);
    			
    			if(app.deviceType === 'android' || app.deviceType === "Android") {
    				window.android.setLogin(loginInfo);
    	        } 
    	        if(app.deviceType === 'ios' || app.deviceType === 'Ios'|| app.deviceType === 'IOS') {
    	        	webkit.messageHandlers.ioscall.postMessage(loginInfo);
    	        }
    			
            	var form = createAsyncForm("SnsForm", "SnsForm", "/oauth/appCallback.do");
            	form = inputAsyncForm(form, "code", code);
            	form = inputAsyncForm(form, "userId", userId);
            	form = inputAsyncForm(form, "snsType", snsType);
            	submitAsyncForm(form);
            }
        } else {
        	jsonData = {"id" : "", "pw" : "", "auto" : "", "snsType" : "", "call" : "setLogin"};
			loginInfo = JSON.stringify(jsonData);
			
			if(app.deviceType === 'android' || app.deviceType === "Android") {
				window.android.setLogin(loginInfo);
				alert("sns login error");
	        } 
	        if(app.deviceType === 'ios' || app.deviceType === 'Ios'|| app.deviceType === 'IOS') {
	        	webkit.messageHandlers.ioscall.postMessage(loginInfo);
	        	if (code === 400 && app.snsType == 2) {
	        		window.location.href = "/naverLogin.do?type=login";
	        	}
	        }
        }
    }
    
    return true;
}

///////////////////////////////////////////end//////////////////////////////////////////////////
//브라우저 체크
function checkWebBrowser(){
	var agent = navigator.userAgent.toLowerCase();
	var browserKeyWords = new Array('chrome', 'safari', 'firefox', 'msie', 'trident', 'opera');
	var browserName = "";
	for (var word in browserKeyWords){
		if (agent.indexOf(browserKeyWords[word]) != -1){
			browserName = browserKeyWords[word];
			break;
		}
	}
	return browserName;
};

//URL 파라메터 추출
function getUrlParams() {
	// 파라미터가 담길 배열
    var param = new Array();
 
    // 현재 페이지의 url
    var url = decodeURIComponent(location.href);
    // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
    url = decodeURIComponent(url);
 
    var params;
    // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
    params = url.substring( url.indexOf('?')+1, url.length );
    // 파라미터 구분자("&") 로 분리
    params = params.split("&");

    // params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
    var size = params.length;
    var key, value;
    for(var i=0 ; i < size ; i++) {
        key = params[i].split("=")[0];
        value = params[i].split("=")[1];

        param[key] = value;
    }

    return param;
};

//AES 암호화
function AES_Encode(plain_text) {
	GibberishAES.size(256);	
	return GibberishAES.aesEncrypt(plain_text, getAesKey());
};

//AES 복호화
function AES_Decode(base64_text) {
	GibberishAES.size(256);	
	return GibberishAES.aesDecrypt(base64_text, getAesKey());
};

//layer Popup 화면 가운데 위치
$.fn.center = function (corTop, corLeft) {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop() + corTop) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft() + corLeft) + "px");
    return this;
};
/*$(function(){
	if($("body").attr("id") === 'app'){
		$("footer").css('display', 'none');
	}
});*/


//이메일 발송

function sendEmail(parameter){
	M_NM = "";	/* 이름    */
	
	if(parameter.email == undefined){
		alert("이메일 발송에 실패하였습니다.");
		return;
	}
	M_EMAIL = parameter.email;/* 이메일 */
	M_MEMO1 = parameter.val1 == undefined ? "" : parameter.val1;/* 메모1 (50byte미만) */
	M_MEMO2 = parameter.val2 == undefined ? "" : parameter.val2;/* 메모2 (50byte미만) */
	M_MEMO3 = parameter.val3 == undefined ? "" : parameter.val3;/* 메모3 (50byte미만) */
	M_MEMO4 = parameter.val4 == undefined ? "" : parameter.val4;/* 메모4 (50byte미만) */
	M_MEMO5 = parameter.val5 == undefined ? "" : parameter.val5;/* 메모5 (50byte미만) */
	
	function _biz_trk_escape(_str) {
		var str, ch;
		var bEncURI = "N";
		eval("try{bEncURI=encodeURI('Y');}catch(_e){ }" );
		if( bEncURI == "Y" ) str=encodeURIComponent(_str);
		else str = escape(_str);
		while((ch=str.indexOf("+"))>0) str=str.substr(0,ch)+"%2B"+str.substr(ch+1,str.length);
		while((ch=str.indexOf("/"))>0) str=str.substr(0,ch)+"%2F"+str.substr(ch+1,str.length);
		while((ch=str.indexOf("&"))>0) str=str.substr(0,ch)+"%26"+str.substr(ch+1,str.length);
		while((ch=str.indexOf("?"))>0) str=str.substr(0,ch)+"%3F"+str.substr(ch+1,str.length);
		while((ch=str.indexOf(":"))>0) str=str.substr(0,ch)+"%3A"+str.substr(ch+1,str.length);
		while((ch=str.indexOf("#"))>0) str=str.substr(0,ch)+"%23"+str.substr(ch+1,str.length);
		return str;
	}
	
	function _biz_makeSrc(trk_server){
		var tc = "";
		var temp;
		var prtcl=document.location.protocol.indexOf("https")!=-1?"https://":"http://";
		tc=prtcl+trk_server;
		tc=tc+"?biz_id="+parameter.biz_id+"&auth_key="+parameter.templateNo+"";	//계정명 + 템플릿 번호
		if((typeof M_NM)!="undefined" && M_NM!="") tc+="&m_nm="+ encodeURIComponent(M_NM);
		if((typeof M_EMAIL)!="undefined" && M_EMAIL!="") tc+="&m_email="+_biz_trk_escape(M_EMAIL);
		if((typeof M_MOBILE)!="undefined" && M_MOBILE!="") tc+="&m_mobile="+_biz_trk_escape(M_MOBILE);
		if((typeof M_MEMO1)!="undefined" && M_MEMO1!="") tc+="&m_memo1="+_biz_trk_escape(M_MEMO1);
		if((typeof M_MEMO2)!="undefined" && M_MEMO2!="") tc+="&m_memo2="+_biz_trk_escape(M_MEMO2);
		if((typeof M_MEMO3)!="undefined" && M_MEMO3!="") tc+="&m_memo3="+_biz_trk_escape(M_MEMO3);
		if((typeof M_MEMO4)!="undefined" && M_MEMO4!="") tc+="&m_memo4="+_biz_trk_escape(M_MEMO4);
		if((typeof M_MEMO5)!="undefined" && M_MEMO5!="") tc+="&m_memo5="+_biz_trk_escape(M_MEMO5);
		return tc;
	}
	
	var _biz_trk_bMSIE = (document.all)?true:false;
	var _biz_trk_bJS12 = (window.screen)?true:false;
	var _biz_trk_code_base = _biz_makeSrc("www.bizmailer.co.kr/bizsmart/action/auto.do");
	var _biz_trk_img_base = new Image();
	
	if(_biz_trk_bJS12==true) {
		if(_biz_trk_bMSIE) {
			_biz_trk_img_base.src=_biz_trk_code_base;
		} 
		else {
			setTimeout(_biz_trk_img_base.src = _biz_trk_code_base ,1);
		}
	} else {
		if(_biz_trk_bMSIE) document.write('<div style=\"display: none\">');
		document.write('<img src=\"'+_biz_trk_code_base+'\" height=\"0\" width=\"0\">');
		if(_biz_trk_bMSIE) document.write('</div>');
	}
}
/**
 * 카드번호 포맷
 *@Param
 * cNum :카드번호(4자리씩 '-' 포함 19자리)
 * strLen: 시작자리수
 * fStr : 포맷 구분자
 * */
function convertCardFormat(cNum,strLen,fStr){
	var fResult = "";
	if(cNum === "" || cNum === null){
		return "";
	}
	var cardNumver = cNum.replace(/-/g,"").trim();
	fResult =cardNumver.substr(0,strLen);
	fResult = RPAD(fResult,fStr,cardNumver.length);
	var cArray = [];
	for(var i=0; i<cardNumver.length ; i+=4) {
		cArray.push(fResult.substr(i,4));
	}
	return cArray.join("-");
	
}


//오른쪽에서부터 채운다는 의미
function RPAD(s, c, n) {  
 if (! s || ! c || s.length >= n) {
     return s;
 }

 var max = (n - s.length)/c.length;
 for (var i = 0; i < max; i++) {
     s += c;
 }

 return s;
}
/*
 * tmoney 결제.
 * TODO : cp_id -->테스트 후 변경.
*/

var tmy = {
    initOrderId : function(){
    	var today = new Date();
    	var year  = today.getFullYear();
    	var month = this.toDate((today.getMonth() + 1),2);
    	var date  = this.toDate(today.getDate(),2);
    	var time = today.getHours()+""+today.getMinutes()+""+today.getSeconds();
    	var temp = (Math.random() * 500).toString();
    	var tm_shop_order_no = "ORDER" + year + "" + month + "" + date + time+""+ temp.substr(7,4);
    	return tm_shop_order_no;
    }	
	,exePaymentProc: function (tParam) {
		var paydate = DateUtil.getCurrentDttm("yyyymmdd");
	    var retUrl= "https://www.bikeseoul.com:446/app/ticket/resultTmoneyProc.do";
	    //**************real*******************************
	    //
		//MK110034
	    //cp_id=MK110269 ,MK110268
	    //**************real*******************************
	    var param = 'amount='+tParam.amount
	         + '&cp_id=MK110269'
	         + '&cp_nm='+tParam.cpNm
	         + '&user_nm=dki'
	         + '&prod_cd='+tParam.prodCd
	         + '&prod_nm='+tParam.prodNm
	         + '&order_id='+tParam.oId
	         + '&req_dh='+paydate
	         + '&ret_url_type=0'
	         + '&ret_url_en=UTF-8'
	         + '&ret_url='+encodeURIComponent(retUrl);
    
        location.href = "intmoney://tmonet?"+param; 	
	}		
	,toDate : function(value, digits){
		// 날짜 1자리 -> 2자리
		var temp = '';
		value = value.toString();
		if(value.length < digits){
			for(var i = 0; i < digits -value.length; i++)
				temp += '0';
		}
		return temp + value; 
	}
};


/**
 * xss 방어
 * 추가 : 2016.07.08_by_JHN
 **/
function replaceXss(str){
    if(str == null) {
            str = "";
    } else {
            str = str.replace(/&/gi, "&amp;")
                         .replace(/</gi, "&lt;")           
                         .replace(/>/gi, "&gt;")
                         .replace(/\"/gi, "&quot;");
    }
    return str;
}
function noSpaceForm(obj) { // 공백사용못하게
    var str_space = /\s/;  // 공백체크
    if(str_space.exec(obj.value)) { //공백 체크
//         alert("해당 항목에는 공백을 사용할수 없습니다.\n\n공백은 자동적으로 제거 됩니다.");
        obj.focus();
        obj.value = obj.value.replace(' ',''); // 공백제거
        return false;
    }
}
