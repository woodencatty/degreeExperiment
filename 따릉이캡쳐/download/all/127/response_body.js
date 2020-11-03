var nMap = {
	map : null,
	mapZoom : null, 
	eventFlg : false,
	infoWindowData : [],
	defaultSize : null,
	targetViewData : [],
	defaultLatitude : 37.5675451,
	defaultLongitude : 126.9773356,
	stationImgFilePath : '',
	defaultLevel : 15,
	popType : '',
	infoWindowType : '',
	windowHeight : 0,
	oInfoWnd : null,
	locationMarker : null,
	sigugun : '',
};

var realStationList = null;
var typeStationList = null;

var markers = []; 
var oldMarkersLen = 0;

//파랑
nMap.markerImages = ["/images/inc/icon_b0.png","/images/inc/icon_b1.png","/images/inc/icon_b2.png","/images/inc/icon_b3.png","/images/inc/icon_b4.png"];
nMap.markerSmallImages = ["/images/inc/icon_s0.png","/images/inc/icon_s1.png","/images/inc/icon_s2.png","/images/inc/icon_s3.png","/images/inc/icon_s4.png"];
//빨강
nMap.markerErrImages = ["/images/inc/staErr_0p.png","/images/inc/staErr_25p.png","/images/inc/staErr_50p.png","/images/staErr_75p.png","/images/inc/staErr_100p.png"];
nMap.markerSmallErrImages = ["/images/inc/staOn_s0p.png","/images/inc/staErr_s25p.png","/images/inc/staOn_s50p.png","/images/inc/staErr_s75p.png","/images/inc/staErr_s100p.png"];
//검정
nMap.markerStopImages = ["/images/inc/staStop_0p.png","/images/inc/staStop_25p.png","/images/inc/staStop_50p.png","/images/inc/staStop_75p.png","/images/inc/staStop_100p.png"];
nMap.markerSmallStopImages = ["/images/inc/staOn_s0p.png","/images/inc/staStop_s25p.png","/images/inc/staOn_s50p.png","/images/inc/staStop_s75p.png","/images/inc/staStop_s100p.png"];

nMap.markerSmallTypeImages = ["/img/icon_s0.png","/img/icon_s1.png","/img/icon_s2.png","/img/icon_s3.png","/img/icon_s4.png"];
nMap.markerTypeImages = ["/img/icon_b0.png","/img/icon_b1.png","/img/icon_b2.png","/img/icon_b3.png","/img/icon_b4.png"];
nMap.markerBigTypeImages = ["/img/icon_big0.png","/img/icon_big1.png","/img/icon_big2.png","/img/icon_big3.png"];

nMap.setMap = function() {
	nMap.map = new naver.maps.Map("mapDiv", {
		useStyleMap: true,
		center: new naver.maps.LatLng(nMap.defaultLatitude, nMap.defaultLongitude), //지도의 초기 중심 좌표
		zoom: 17, //지도의 초기 줌 레벨
		minZoom: 13, //지도의 최소 줌 레벨
	});	
};

nMap.initMap  = function() {
	$("#mapDiv").empty();
	nMap.map = null;
	nMap.setMap();
	nMap.detectCoveredMarker = true;
};

// 확대할 때
nMap.changeMarker = function() {
	var _this = nMap;
	    
	if(typeof _this.targetViewData !== 'object') {
		return;
	}

	_this.infoWindowType = _this.infoWindowType === "" ?'station' : _this.infoWindowType;
	var lSize = _this.targetViewData.length;
	var w = 9, h=10;
		
	if(nMap.map.zoom >= 8){
		w = 20, h = 23;
	}
	nMap.updateMarkers();
};

//대여소 검색시 대여소별로 중심 좌표를 변경.
nMap.setMapCenterPosi = function(pCenterX, pCenterY) {
	nMap.map.setCenter(new naver.maps.LatLng(pCenterX,pCenterY));
};

function getClickHandler(  timehtml, stationName, parkingBikeTotCnt, latitude,longitude, stationId, parkingQRBikeCnt, parkingELECBikeCnt, stationSeCd, bkmk, stationBkmkSeq) {
	return function(e) {	
		if(nMap.map.zoom < 17){
			nMap.map.setZoom(17);
			nMap.setMapCenterPosi(latitude,longitude);
			nMap.updateMarkers();
		}
		
		if(parkingQRBikeCnt == null || parkingQRBikeCnt == ""){
			parkingQRBikeCnt = 0;
		}
		if(parkingELECBikeCnt == null || parkingELECBikeCnt == ""){
			parkingELECBikeCnt = 0;
		}
		$("#bike_rent").off('click');
		$("#favoriteBtn_off").off("click");
		$("#favoriteBtn").off("click");
		$("#closeBtn").off("click");
		$("#reLoadBike").off("click");
		
		// 2019.02.20
		$("#guide_box").css('display', "none");
		$(".location_info").css('display', "none");
		if(stationSeCd == "RAK_001"){
			$("#location_01").show();
			$("#location_03").hide();
			$("#location_id").html(stationName+" (구)");
			$("#noticeLocation").hide();
		}else if(stationSeCd == "RAK_002"){
			$("#location_01").hide();
			$("#location_03").hide();
			$("#location_id").html(stationName+" (신)");
			$("#noticeLocation").show();
		}else if(stationSeCd == "RAK_003"){
			$("#location_01").show();
			$("#location_03").show();
			$("#location_id").html(stationName+" (구)");
			$("#noticeLocation").hide();
		}else if(stationSeCd == "RAK_004"){
			$("#location_01").hide();
			$("#location_03").show();
			$("#location_id").html(stationName+" (신)");
			$("#noticeLocation").show();
		}
		//parkingQRBikeCnt = 0; //qr 제거 테스트
		$("#parkingBikeTotCnt").html(parkingBikeTotCnt);
		$("#parkingQRBikeCnt").html(parkingQRBikeCnt);
		$("#parkingELECBikeCnt").html(parkingELECBikeCnt);
		var totalCount = Number(parkingBikeTotCnt) + Number(parkingQRBikeCnt) + Number(parkingELECBikeCnt);
		if( totalCount == 0){
			$("#reLoadBike").show();
			$("#favoriteBtn").hide();
			$("#favoriteBtn_off").hide()
		}else{
			$("#reLoadBike").hide();
			if(bkmk == "Y"){
				$("#favoriteBtn").show();
				$("#favoriteBtn_off").hide();
			}else{
				$("#favoriteBtn_off").show();
				$("#favoriteBtn").hide();
			}
		}
		
		// 기존따릉이 대여가능 자전거수 0일때
		if(parkingBikeTotCnt == 0){
			$("#bike_rent").removeClass('rent');
			$("#bike_rent").addClass('rent_off');
		}else{
			$("#bike_rent").removeClass('rent_off');
			$("#bike_rent").addClass('rent');
		}
		// 뉴따릉이 대여가능 자전거수 0일때
		if(parkingQRBikeCnt == 0){
			$("#new_rent").removeAttr("href");
			$("#new_rent").removeClass('rent');
			$("#new_rent").addClass('rent_off');
		}else{
			$("#new_rent").attr("href","javascript:goQrRent();");
			$("#new_rent").removeClass('rent_off');
			$("#new_rent").addClass('rent');
		}
		// 전기따릉이 대여가능 자전거수 0일때
		if(parkingELECBikeCnt == 0){
			$("#elec_rent").removeAttr("href");
			$("#elec_rent").removeClass('rent');
			$("#elec_rent").addClass('rent_off');
		}else{
			$("#elec_rent").attr("href","javascript:goQrRent();");
			$("#elec_rent").removeClass('rent_off');
			$("#elec_rent").addClass('rent');
		}
		
		$(".location_info").show();
		
    /*
		var newCont = '<div class="station_pop">';
		newCont += '<div class="top">';
		newCont += '<h3>';
		newCont += '<p>'+stationName+'</p>';
		newCont += '</h3>';
		newCont += '<button class="close" id="closeBtn"></button>';
		newCont += '<a href="http://map.kakao.com/link/to/' + stationName + ',' + latitude +',' + longitude + '" style="background-color: rgba(0, 127, 255, 1); color: white; padding:3px; position: relative; text-decoration: none; text-transform: uppercase;" target="_blank">카카오지도로 길찾기</a>';
		newCont += '<button class="favorite" id="favoriteBtn" alt="즐겨찾기 추가" style="cursor: pointer"></button>';
		newCont += '</div>';
		newCont += '<div class="bike_num">';
		newCont += '<span>'+ ( langClsCd == 'en' ? 'Bikes' : '대여가능 거치대' ) + '</span>';
		newCont += '<p class="num">'+bikeInfo+'</p>';
		newCont += '<p class="time">'+timehtml+'</p>';
		newCont += '</div>';
		newCont += '<div class="foot" id="infoBox">';
    */

		//2019.03.02
//		if ( bikeInfo == 0 ) {
//			newCont += '<button id="reLoadBike" style="background-color:#5b6dcd;color:#FFF; cursor: pointer">자전거 재배치 요청</button>';
//			newCont += '<button id="reLoadBike" class="btn" style="background-color:#5b6dcd;color:#FFF; cursor: pointer">자전거 재배치 요청</button>';
//    	
//		} else {
//			newCont += '<a href="" class="btn">' + ( langClsCd == 'en' ? 'Rent' : '대여' ) + '</a>';
//		}
	/*
		if(nMap.infoWindowType == 'reco') {
			newCont += '<a href="" class="btn">' + ( langClsCd == 'en' ? 'Confirm' : '확인' ) + '</a>';
		} else {
			newCont += '<a href="" class="btn">' + ( langClsCd == 'en' ? 'Rent' : '대여' ) + '</a>';
		}
	*/
//		newCont += '<p class="arrow"></p>';
//		newCont += '</div>';
//		newCont += '</div>';
	
//		var infoWindow = new naver.maps.InfoWindow({
//			content: newCont
//		});

//		var center = new naver.maps.LatLng(latitude,longitude);

//		infoWindow.open(nMap.map,center);
		// 따릉이 대여하기 클릭 이벤트
		$("#bike_rent").on("click", function(e){
			if($("#bike_rent").hasClass("rent_off")){
				return;
			}
			e.preventDefault();
			if(nMap.infoWindowType == 'reco') {
				infoWindow.close(nMap.map,center);
			} else {
				var infoData = {
					 stationId   : stationId
					,stationName : stationName
				}
				goBikeRent( infoData );
			}
		});

		$("#favoriteBtn_off").on("click", function(e){
			e.preventDefault();
			var infoData = {
				 stationId   : stationId
				,stationName : stationName
			}
		
			goFavoriteStation(infoData);
			//	infoWindow.close(nMap.map,center);
		});
		
		$("#favoriteBtn").on("click", function(e){
			delFavoriteFnc(stationBkmkSeq);
		});
		
		$("#closeBtn").on("click", function(e){
			e.preventDefault();
			infoWindow.close(nMap.map,center);
			//20190220
			$("#guide_box").css('display', "inline");
		});
		
		// 2019.03.02
		$("#reLoadBike").on("click", function(e){
			e.preventDefault();
			  
			fn_reLoadBike(stationId);
		});
		
		
	}
	
}
 
this.fn_reLoadBike = function(stationId ){
	commonAjax.postAjax("/app/station/setReLoadBike.do", "json", 'stationId=' + stationId, function(data){
		if(data){		
			// guide_box 숨김
			// $("#guide_box").css('display', "none");		
			console.log("data : " + data );
			if( data.checkResult) {
					this.alert("정상적으로 신청되었습니다. 해당 내용은 자전거 재배치시 참고자료로 사용됩니다.");
			}
					
		}
	});
}


nMap.makeMarker = function(pMarkerOpt) {
	var sIcon = null;
	if(typeof pMarkerOpt.imgSrc === 'string') {
		sIcon = {
			icon: {
				url: pMarkerOpt.imgSrc,
				size: new naver.maps.Size(pMarkerOpt.imgWidth, pMarkerOpt.imgHeight)
			}
		};	
	} else {
		sIcon = pMarkerOpt.imgSrc;
	}
	
	var sURL= sIcon.icon.url;
	
	var markerOptions = {
		position: new naver.maps.LatLng(pMarkerOpt.latitude,  pMarkerOpt.longitude),
		map:nMap.map,
		icon: {
			url: sURL,
			//content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:red;text-align:center;font-weight:bold;background:url(/images/inc/staOn_0p.png);background-size:contain;"><span>1</span></div>2',
			//size: new naver.maps.Size(22, 35),
			//anchor: new naver.maps.Point(pMarkerOpt.anchorX, pMarkerOpt.anchorY),
			title :  pMarkerOpt.title        				
		}
	};	
			    
	var marker = new naver.maps.Marker(markerOptions);
                     
	return marker;
};

nMap.makeMarkerLoc = function(pMarkerOpt) {
	var sIcon = null;
	if(typeof pMarkerOpt.imgSrc === 'string') {
		sIcon = {
			icon: {
				url: pMarkerOpt.imgSrc,
				size: new naver.maps.Size(pMarkerOpt.imgWidth, pMarkerOpt.imgHeight)
			}
		};			
	} else {
		sIcon = pMarkerOpt.imgSrc;
	}
	
	var sURL= sIcon.icon.url;
	
	var markerOptions = {
		position: new naver.maps.LatLng(pMarkerOpt.latitude,  pMarkerOpt.longitude),
		map:nMap.map,
		title :  pMarkerOpt.title, 
		icon: {
			url: sURL,
			//content: '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:red;text-align:center;font-weight:bold;background:url(/images/inc/staOn_0p.png);background-size:contain;"><span>1</span></div>2',
			//size: new naver.maps.Size(22, 35),
			anchor: new naver.maps.Point(pMarkerOpt.anchorX, pMarkerOpt.anchorY),
		}
	};	
			    
	var marker = new naver.maps.Marker(markerOptions);
	                      
	return marker;
};

nMap.showInfoWindow = function(oCustomEvent) {

};
//maker  Icon 생성.
//TODO://반납추천 대여소의 경우 거치율 표시 필요없음.
nMap.getSharedImgSrc = function(pShared, pDeviceBFlg) {
	var _this = nMap;
	var imgSrc = "", w = 23, h=29;
	var height = nMap.map.getSize().height;
	if(_this.infoWindowType ==='return') {
		//if(nMap.map.getSize().height < 600) {
		if(height < 600) {
			//w = 17,h=21;
			if(pDeviceBFlg === 'good' || pDeviceBFlg === 'less'){
				imgSrc = nMap.markerSmallImages[4];
			}else if(pDeviceBFlg === 'over') {
				imgSrc = nMap.markerSmallStopImages[4];
			}
		} else {
			if(pDeviceBFlg === 'good' || pDeviceBFlg === 'less'){
				imgSrc = nMap.markerImages[4];
			}else if(pDeviceBFlg === 'over') {
					imgSrc = nMap.markerStopImages[4];
			}
		}
	} else {
		//0%,25%,50%,75%,100%
		var iidx = nMap.getSharedIdx(parseInt(pShared));
		//if(nMap.map.getSize().height < 700){
		if(height < 700){
			//w = 17,h=21;
			if(pDeviceBFlg){
				imgSrc = _this.markerSmallStopImages[iidx];
			} else {
				imgSrc = _this.markerSmallTypeImages[iidx];
			}
		} else {
			if(pDeviceBFlg){
				imgSrc = _this.markerStopImages[iidx];
			} else {
				imgSrc = _this.markerTypeImages[iidx];
			}
		}
	}
	var img = {
		icon: {
			url: imgSrc,
			size: new naver.maps.Size(w,h)
		}
	};	
		
	return img;
}; 

nMap.getSharedIdx  = function(s){
	var iidx = 0;
	if(s <= 25 ) {
		iidx=1;
	} else if( s <= 50) {
		iidx=2;
	}	else if( s <= 75) {
		iidx=3;
	} else if(75 < s ) {
		iidx=4;
	} 
	if( s === 0) {
		iidx=0;
	} 
	
	return iidx;
};

//maker  Icon 생성.
nMap.getBikeInfoImgSrc = function(stationSeCd, pDeviceBFlg, tabId) {
	var _this = nMap;
	var imgSrc = "", w = 9, h=10;
	if(nMap.map.zoom >= 12){
		w = 20, h = 23;
	}
	if(_this.infoWindowType ==='return') {
		if(nMap.map.zoom < 12) {
			if(pDeviceBFlg === 'good' || pDeviceBFlg === 'less'){
				imgSrc = nMap.markerSmallImages[4];
			}else if(pDeviceBFlg === 'over') {
				imgSrc = nMap.markerSmallStopImages[4];
			}
		} else {
			if(pDeviceBFlg === 'good' || pDeviceBFlg === 'less'){
				imgSrc = nMap.markerImages[4];
			}else if(pDeviceBFlg === 'over') {
				imgSrc = nMap.markerStopImages[4];
			}
		}
	} else {
		var iidx = "";
		//0%,25%,50%,75%,100%
		if(stationSeCd == "RAK_002" || stationSeCd == "RAK_004"){
			iidx = 2;
		}else{
			iidx = 1;
		}
		
		if(nMap.map.zoom > 14){
			imgSrc = _this.markerBigTypeImages[iidx];
		}else if(nMap.map.zoom < 14){
			if(pDeviceBFlg){
				imgSrc = _this.markerSmallStopImages[iidx];
			} else {
				imgSrc = _this.markerSmallTypeImages[iidx];
			}
		} else {
			if(pDeviceBFlg){
				imgSrc = _this.markerStopImages[iidx];
			} else {
				imgSrc = _this.markerTypeImages[iidx];
			}
		}
	}
	var img = {
		icon: {
			url: imgSrc,
			size: new naver.maps.Size(w,h)
		}
	};	
		
	return img;
}; 

nMap.getBikeInfoIdx  = function(s){
	var iidx = 0;
	if(s < 1 ) {
		iidx=4;
	} else if( s <= 3) {
		iidx=1;
	}	else if( s <= 6) {
		iidx=2;
	} else if(6 < s ) {
		iidx=3;
	} 
	if( s === 0) {
		iidx=4;
	} 
	
	return iidx;
};

//marker label
nMap.setGPSLoc = function(pLat,pLog){
	if (nMap != null) {
		var w=40,h=40;
		var src = "/img/my_location_bp.gif";
		if(nMap.map.getSize().height < 600) {
			w=80,h=80;
		}
		nMap.setMapCenterPosi(pLat,pLog);
		 
		var opt = {imgSrc :src, imgWidth : w,  imgHeight : h, latitude :pLat , longitude : pLog, title :  "현재위치", smallImg : "/img/my_location_bp.gif", anchorX : 40, anchorY : 52};
		
		if (nMap.locationMarker === null) {
			nMap.locationMarker = nMap.makeMarkerLoc(opt);
			//nMap.map.addOverlay(nMap.makeMarker(opt));
		} else {
			nMap.locationMarker.setPosition(new naver.maps.LatLng(pLat , pLog));
		}
		
		nMap.searchCoordinateToAddress(new naver.maps.LatLng(pLat , pLog), $("#tabId").val());
	}
	
};

//marker label
nMap.setGPSLoc_1 = function(pLat,pLog){
	if (nMap != null) {
		var w=40,h=40;
		var src = "/img/my_location_bp.gif";
		if(nMap.map.getSize().height < 600) {
			w=80,h=80;
		}
		nMap.setMapCenterPosi(pLat,pLog);
		 
		var opt = {imgSrc :src, imgWidth : w,  imgHeight : h, latitude :pLat , longitude : pLog, title :  "현재위치", smallImg : "/img/my_location_bp.gif", anchorX : 40, anchorY : 52};
		
		if (nMap.locationMarker === null) {
			nMap.locationMarker = nMap.makeMarkerLoc(opt);
			//nMap.map.addOverlay(nMap.makeMarker(opt));
		} else {
			nMap.locationMarker.setPosition(new naver.maps.LatLng(pLat , pLog));
		}
		//nMap.searchCoordinateToAddress(new naver.maps.LatLng(pLat , pLog), $("#tabId").val());
	}
 
};
nMap.getCalcMapSize = function(pId){
	var mWidht = 0;
	var mHeight =0 ;  
	if(nMap.popType === 'single') {
		mHeight = $("#"+pId).innerHeight() -60;
		mWidht =  $("#"+pId).innerWidth();
		if(nMap.infoWindowType === 'mall') {
			var tHeight = $(".popcntbox").height();
			mHeight = mHeight/2;
			if(mHeight > 700) {
				mHeight += tHeight;
			}
			mWidht =  $(".popcntbox").innerWidth() - (parseInt($(".popcntbox").css('padding'))*2);
		}
	} else {
		var leftOff = 0;
		if($("#container").offset() !== undefined) {
			leftOff = (2+$("#container").offset().left);
		}
		if($("#container").innerWidth() < leftOff) {
			leftOff =0;
		}
		var viewHeight = screen.height - ($("header#gnbhead").height()+$(".pwTM").innerHeight()+ $("footer").height());
		var topOff = 0;
		if($(".newmapsta").length > 0) {
			topOff = $(".newmapsta").offset().top -($(".pwPC").height()+$(".pwheader").height());
			if(screen.height <= 500){
				topOff = 30; 
			} else if(screen.height <= 700){
				topOff = 50; 
			} else if(screen.height <= 800) {
				topOff = topOff- 150; 
			}
			if(viewHeight < topOff) {
				topOff = 0;
			}
		}
		if(nMap.infoWindowType === 'return') {
			topOff = topOff + 450;
		}
		mWidht = $("#container").innerWidth() -3;
		mHeight =viewHeight - topOff;
		if(mHeight < 100) {
			mHeight = viewHeight;
		}
		if((nMap.infoWindowType !== 'return' && nMap.infoWindowType !== 'app') && screen.height >1000) {
			mHeight = 500;
		}
	}
	return {w : mWidht, h :mHeight};
};

window.onresize = function(e){
	nMap.resize();
};

nMap.resize = function(){
	var mSizeOp = nMap.getCalcMapSize($("body").attr("id"));
	var mSize = new naver.maps.Size(mSizeOp.w,nMap.windowHeight);
};

nMap.updateMarkers = function () {
	for (var i = 0; i < markers.length; i++) {
		nMarker = markers[i];
		sPosition = nMarker.getPosition();
		nMap.hideMarker(nMap.map, nMarker);
	}	
	setList( "infoBox" );
};

nMap.showMarker = function (map, marker) {
	if (marker.getMap()){
		return;
	}
	marker.setMap(map);
};

nMap.hideMarker = function (map, marker) {
	if (!marker.getMap()){
		return;
	}
	marker.setMap(null);
};

/**
 *  2015-06 대여소 조회 공통 js
 *  @Author ymshin 
 */
var station = {};
station.makeStationCombo = function() {
	var arg = arguments;
	commonAjax.getStationCode(function(data){
		if(data != null && data.stationList != null){
			arg[0].find('option').not(':eq(0)').remove();
			var c = "";
			if(arg.length > 1) {
				c = arg[1];
			}
			commCdBox.makeComboBox('S', c , data.stationList, arg[0]);
		}
	});
};

//대여소 조회.
station.getListData = function(pGrpSeq, pTblObj) {
	commonAjax.postAjax("/app/station/getStationGroupList.do", "json", pGrpSeq, function(data){
		if(data){
			if(data.checkResult){
				$(".nodata").css("display","none");
				pTblObj.empty();
				if(data.stationList.length > 0){
					$("#noData").css("display", "none"); 
					$("#totStationCnt").text(data.stationList.length );
					var sSize = data.stationList.length;
					for(var i=0; i< sSize; i +=1) {
						var $tr = $("#clone tbody tr").clone();
						var item = data.stationList[i];
						$tr.children().eq(0).find('a').on("click", {title : item.stationName , stationLongitude : item.stationLongitude , stationLatitude : item.stationLatitude}, openMapPopup).text(item.stationName);
						var status = "운영중";
						if(item.stationUseYn === 'N'){
							status = "사용정지";
						}
						if(item.currnetStatus === 'Y') {
							status = "운휴";
						}
						$tr.children().eq(1).text(status);
						$tr.children().eq(2).text(item.rackTotCnt);
						$tr.children().eq(3).text(item.parkingBike);
						$tr.children().eq(4).find('span').text(item.stationAddr);
						//웹뷰. 웹브라우저 구분해서 처리
						//웹뷰에서 window.open() function 호출이 비정상적 -> android : 화면 이동, ios : 작동안함.
						pTblObj.append($tr);
					}
				} else {
					$(".nodata").css("display","block");
				}
			}
		}
	});
};

function setList(  pNodeId , tabId){
	if(tabId == null || tabId == ""){
		tabId = $("#tabId").val();
	}
	if (nMap != null && nMap.map != null) {
		var bounds = nMap.map.getBounds();
		var infoW = "226px";
		var today = new Date();
		var year  = today.getFullYear();
		var month = today.getMonth() + 1;
		var date  = today.getDate();
		var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
		// langClsCd 값 호출페이지에서 설정 필요
		var timehtml = ( langClsCd == 'en' ? 'Check time' : '조회시간' ) + '<em style="color:#f1424f">'+year+'.'+month+'.'+date+' '+time+'</em>';
		var flg = false;

		var j = markers.length;;

		for( var i in realStationList ) {
			if ( bounds.hasLatLng( new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude) ) ) {
				if(pNodeId === 'infoBox' && realStationList[i].stationUseYn === 'N'){
					flg = true;
				} else {
					flg = false;
				}
				var bFlg =  ( nMap.infoWindowType === 'app' ? flg : realStationList[i].deviceBroken );
				var sURL =  nMap.getBikeInfoImgSrc( realStationList[i].stationSeCd, bFlg, tabId).icon.url;
				//realStationList[i].parkingQRBikeCnt = 0; //qr 제거 테스트
				if(nMap.map.zoom > 14){
					var totalCnt = 0;
					if(tabId == "lcd"){ 
						if(realStationList[i].stationSeCd == "RAK_001"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt)+ Number(realStationList[i].parkingQRBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_003"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt) + Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else{
							totalCnt = 0;
						}
					}else if(tabId == "qr"){
						if(realStationList[i].stationSeCd == "RAK_001"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt)+ Number(realStationList[i].parkingQRBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_002"){
							totalCnt = Number(realStationList[i].parkingQRBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_003"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt) + Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_004"){
							totalCnt = Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else{
							totalCnt = 0;
						}
					}else if(tabId == "elec"){
						if(realStationList[i].stationSeCd == "RAK_003"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt) + Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_004"){
							totalCnt = Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else{
							totalCnt = 0;
						}
					}else{
						if(realStationList[i].stationSeCd == "RAK_001"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt)+ Number(realStationList[i].parkingQRBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_002"){
							totalCnt = Number(realStationList[i].parkingQRBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_003"){
							totalCnt = Number(realStationList[i].parkingBikeTotCnt) + Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else if(realStationList[i].stationSeCd == "RAK_004"){
							totalCnt = Number(realStationList[i].parkingQRBikeCnt) + Number(realStationList[i].parkingELECBikeCnt);
						}else{
							totalCnt = 0;
						}
					}
					
					if(tabId == "lcd"){
						if(realStationList[i].stationSeCd == "RAK_001" || realStationList[i].stationSeCd == "RAK_003"){
							var markerOptions = {
								position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
								map:nMap.map,
								icon: {
									//url		: sURL,
				    				// title 	:  data.realtimeList[i].stationName    				
									content : '<div class="jb-wrap"><div class="jb-image"><img src="'+sURL+'"><div class="jb-text"><p>'+totalCnt+'</p></div></div></div>'
								}
							};
						}
					}else if(tabId == "qr"){
						var markerOptions = {
							position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
							map:nMap.map,
							icon: {
								//url		: sURL,
			    				// title 	:  data.realtimeList[i].stationName    				
								content : '<div class="jb-wrap"><div class="jb-image"><img src="'+sURL+'"><div class="jb-text"><p>'+totalCnt+'</p></div></div></div>'
							}
						};
					}else if(tabId == "elec"){
						if(realStationList[i].stationSeCd == "RAK_003" || realStationList[i].stationSeCd == "RAK_004"){
							var markerOptions = {
								position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
								map:nMap.map,
								icon: {
									//url		: sURL,
				    				// title 	:  data.realtimeList[i].stationName    				
									content : '<div class="jb-wrap"><div class="jb-image"><img src="'+sURL+'"><div class="jb-text"><p>'+totalCnt+'</p></div></div></div>'
								}
							};
						}
					}else{
						var markerOptions = {
							position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
							map:nMap.map,
							icon: {
								//url		: sURL,
			    				// title 	:  data.realtimeList[i].stationName    				
								content : '<div class="jb-wrap"><div class="jb-image"><img src="'+sURL+'"><div class="jb-text"><p>'+totalCnt+'</p></div></div></div>'
							}
						};
					}
				}else{
					if(tabId == "lcd"){
						if(realStationList[i].stationSeCd == "RAK_001"){
							var markerOptions = {
								position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
								map:nMap.map,
								icon: {
									url		: sURL
									// title 	:  data.realtimeList[i].stationName
								}
							};
						}else if(realStationList[i].stationSeCd == "RAK_003"){
							var markerOptions = {
								position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
								map:nMap.map,
								icon: {
									url		: sURL
									// title 	:  data.realtimeList[i].stationName
								}
							};
						}
					}else if(tabId == "qr"){
						var markerOptions = {
							position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
							map:nMap.map,
							icon: {
								url		: sURL
								// title 	:  data.realtimeList[i].stationName
							}
						};
					}else if(tabId == "elec"){
						if(realStationList[i].stationSeCd == "RAK_003" || realStationList[i].stationSeCd == "RAK_004"){
							var markerOptions = {
								position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
								map:nMap.map,
								icon: {
									url		: sURL
									// title 	:  data.realtimeList[i].stationName
								}
							};
						}
					}else{
						var markerOptions = {
							position: new naver.maps.LatLng( realStationList[i].stationLatitude,  realStationList[i].stationLongitude),
							map:nMap.map,
							icon: {
								url		: sURL
								// title 	:  data.realtimeList[i].stationName
							}
						};
					}
				}
				if(tabId == "lcd"){
					if(realStationList[i].stationSeCd == "RAK_001"){
						var marker = new naver.maps.Marker(markerOptions);
						markers.push(marker);
						naver.maps.Event.addListener(markers[j], 'click', getClickHandler(
							  timehtml
							, realStationList[i].stationName
							, realStationList[i].parkingBikeTotCnt
							, realStationList[i].stationLatitude
							, realStationList[i].stationLongitude
							, realStationList[i].stationId
							, realStationList[i].parkingQRBikeCnt 
							, realStationList[i].parkingELECBikeCnt 
							, realStationList[i].stationSeCd
							, realStationList[i].bkmk
							, realStationList[i].stationBkmkSeq
						));
						
						j++;
					}else if(realStationList[i].stationSeCd == "RAK_003"){
						var marker = new naver.maps.Marker(markerOptions);
						markers.push(marker);
						naver.maps.Event.addListener(markers[j], 'click', getClickHandler(
							  timehtml
							, realStationList[i].stationName
							, realStationList[i].parkingBikeTotCnt
							, realStationList[i].stationLatitude
							, realStationList[i].stationLongitude
							, realStationList[i].stationId
							, realStationList[i].parkingQRBikeCnt 
							, realStationList[i].parkingELECBikeCnt 
							, realStationList[i].stationSeCd
							, realStationList[i].bkmk
							, realStationList[i].stationBkmkSeq
						));
						
						j++;
					}
					
				}else if(tabId == "qr"){
					var marker = new naver.maps.Marker(markerOptions);
					markers.push(marker);
					naver.maps.Event.addListener(markers[j], 'click', getClickHandler(
						  timehtml
						, realStationList[i].stationName
						, realStationList[i].parkingBikeTotCnt
						, realStationList[i].stationLatitude
						, realStationList[i].stationLongitude
						, realStationList[i].stationId
						, realStationList[i].parkingQRBikeCnt 
						, realStationList[i].parkingELECBikeCnt 
						, realStationList[i].stationSeCd
						, realStationList[i].bkmk
						, realStationList[i].stationBkmkSeq
					));
					
					j++;
				}else if(tabId == "elec"){
					if(realStationList[i].stationSeCd == "RAK_003" || realStationList[i].stationSeCd == "RAK_004"){
						var marker = new naver.maps.Marker(markerOptions);
						markers.push(marker);
						naver.maps.Event.addListener(markers[j], 'click', getClickHandler(
							  timehtml
							, realStationList[i].stationName
							, realStationList[i].parkingBikeTotCnt
							, realStationList[i].stationLatitude
							, realStationList[i].stationLongitude
							, realStationList[i].stationId
							, realStationList[i].parkingQRBikeCnt 
							, realStationList[i].parkingELECBikeCnt 
							, realStationList[i].stationSeCd
							, realStationList[i].bkmk
							, realStationList[i].stationBkmkSeq
						));
						
						j++;
					}
				}else{
					var marker = new naver.maps.Marker(markerOptions);
					markers.push(marker);
					naver.maps.Event.addListener(markers[j], 'click', getClickHandler(
						  timehtml
						, realStationList[i].stationName
						, realStationList[i].parkingBikeTotCnt
						, realStationList[i].stationLatitude
						, realStationList[i].stationLongitude
						, realStationList[i].stationId
						, realStationList[i].parkingQRBikeCnt 
						, realStationList[i].parkingELECBikeCnt 
						, realStationList[i].stationSeCd
						, realStationList[i].bkmk
						, realStationList[i].stationBkmkSeq
					));
					
					j++;
				}
			}
		}
	}
	
//	var markerClustering = new MarkerClustering({
//	    minClusterSize: 2,
//	    maxZoom: 14,
//	    map: nMap.map,
//	    markers: markers,
//	    disableClickZoom: false,
//	    gridSize: 120,
//	    icons: [htmlMarker1],
//	    indexGenerator: [10],
//	    stylingFunction: function(clusterMarker, count) {
//	        $(clusterMarker.getElement()).find('div:first-child').text(count);
//	    }
//	});
}

function delFavoriteFnc(bkmkSeq) {
	$.ajax({
		type : "POST",
		url : "/app/mybike/deleteFavoriteStation.do?bkmkSeq="+bkmkSeq,
		success : function(data){
			if(data.checkResult > 0) {
				alert(data.resultMessage);
				location.reload();
				return false;
			} else {
				alert(data.resultMessage);
				return false;
			}
		},
		error : function(e){ alert("즐겨찾기 삭제 내용을 가져오는데 실패 하였습니다."); }
	});
};

//실시간현황.
//조회 조건, window info용 노드 아이디.
station.getMapData = function(pGrpSeq, pNodeId, tabId){
	var currentDate = new Date();
	var currentHour = currentDate.getHours();
	var currentMin  = currentDate.getMinutes();
/*
 * TODO WebView
	if( window.localStorage.getItem('mapData' ) != null ) {
		alert("222");	
		realStationList = JSON.parse(localStorage.getItem('mapData'));
		
		alert("db 조회 하지 않음" + realStationList.size );
		
		console.log( realStationList )
		
		// 조회영역 설정
    	setList( pNodeId );
		// 2019.02.20 TODO 운영 적용 필요
    	if ( autocompleteStationName.length == 0 ){
			for( var i in realStationList ) {
				autocompleteStationName.push(
						{
							label : realStationList[i].stationName,
							stationLatitude : realStationList[i].stationLatitude,
							stationLongitude : realStationList[i].stationLongitude
						}
				);
			}
    	}
		
		return;
	}
*/	
	commonAjax.postAjax("/app/station/getStationRealtimeStatus.do", "json", 'stationGrpSeq=ALL&tabId='+tabId, function(data){
		if(data){		
			// guide_box 숨김
			// $("#guide_box").css('display', "none");			
					
			if(data.checkResult){
				if(data.realtimeList.length > 0){
					realStationList = data.realtimeList;
/* 
 * WebView
				    	window.localStorage.setItem('mapData', JSON.stringify(realStationList));
 */				    	
					// 조회영역 설정
					setList( pNodeId ,tabId);
					// 2019.02.20 TODO 운영 적용 필요
					var j = 0;
					for( var i in realStationList ) {
						autocompleteStationName.push({
							label : realStationList[i].stationName,
							stationLatitude : realStationList[i].stationLatitude,
							stationLongitude : realStationList[i].stationLongitude
						});
					}
					nMap.updateMarkers();
				} else {
					alert('검색결과에 일치하는 대여소가 없습니다.');
				}
		    } else {
		    	alert('검색결과에 일치하는 대여소가 없습니다.');
		    }
		}
	});
};

nMap.searchCoordinateToAddress = function (latlng, id) {
	if(id == undefined || id == null || id == "" || id == "all"){
		id = "";
	}
	nMap.clearMarkers();
	if(autocompleteStationName.length > 0){
		setList( "infoBox" ,id);
	}else{
		station.getMapData({stationGrpSeq : nMap.centerGuNo}, "infoBox", id);
	}
	
};

nMap.reloadData = function (latlng, id) {
	station.getMapData({stationGrpSeq : nMap.centerGuNo}, "infoBox");
};

nMap.clearMarkers = function () {
	for (var i = 0; i < markers.length; i++) {
		nMarker = markers[i];
		nMarker.setMap(null);
	}   
	markers = [];
};