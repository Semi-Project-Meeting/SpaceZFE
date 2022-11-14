<template>
    <div id="kakaoMap"></div>
  </template>
  
  <script>
  export default {
    props: ["options"],
    name: "app",
    data() {
      return {
        map: null,
      };
    },
    mounted() {
      this.initMap();
      this.searchSubmit();
    },
    methods: {
      initMap() {
        let container = document.getElementById("kakaoMap");
        let options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
  
        let map = new kakao.maps.Map(container, options);
  
        this.map = map;
  
        this.geocoder = new kakao.maps.services.Geocoder();

        this.overlay = new kakao.maps.CustomOverlay();
      },
      searchSubmit() {
        const { vos } = this.options;
        console.log(vos);

        for(var i = 0; i < vos.length; i++) {
            let spaceId = vos[i].spaceId;
            let spaceName = vos[i].spaceName;
            let typeName = vos[i].type;
            let priceNum = vos[i].price;
            let imgName = vos[i].imgName;
            var bounds = new kakao.maps.LatLngBounds();
            this.geocoder.addressSearch(vos[i].location, (result, status) => {
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                    var imageSize = new kakao.maps.Size(24, 35);
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                    var marker = new kakao.maps.Marker({
                        map: this.map,
                        position: coords,
                        title: spaceName,
                        image: markerImage,
                        clickable: true
		                });

                    var type = document.createElement('div');
                    type.className = 'type';
                    var typeValue = null;
                    if(typeName == 'office') {
                        typeValue = document.createTextNode('오피스');
                    } else if(typeName == 'desk') {
                        typeValue = document.createTextNode('데스크');
                    } else {
                        typeValue = document.createTextNode('회의실');
                    }
                    type.appendChild(typeValue);
                    
                    var price = document.createElement('div');
                    price.className = 'price';
                    var priceValue = null;
                    if(typeName == 'office') {
                        priceValue = document.createTextNode(priceNum + '원 / 시간');
                    } else {
                        priceValue = document.createTextNode(priceNum + '원 / 일');
                    }
                    price.appendChild(priceValue);
                    
                    var linkDiv = document.createElement('div');
                    var linkA = document.createElement('a');
                    linkA.href = '../detail/' + spaceId;
                    linkA.target = '_self';
                    linkA.className = 'link';
                    linkA.appendChild(document.createTextNode('장소 상세보기'));
                    linkDiv.appendChild(linkA);

                    var desc = document.createElement('div');
                    desc.className = 'desc';
                    desc.appendChild(type);
                    desc.appendChild(price);
                    desc.appendChild(linkDiv);
                    
                    var img = document.createElement('div');
                    img.className = 'img';
                    var imgTag = document.createElement('img');
                    imgTag.src = "http://localhost:8090/spaceZBE/resources/upload/" + imgName;
                    imgTag.style.width = '73px';
                    imgTag.style.height = '70px';
                    img.appendChild(imgTag);

                    var body = document.createElement('div');
                    body.className = 'body';
                    body.appendChild(img);
                    body.appendChild(desc);
                    
                    var title = document.createElement('div');
                    title.className = 'title';
                    var titleValue = document.createTextNode(spaceName);
                    title.appendChild(titleValue);
                    
                    var closeBtn = document.createElement('div');
                    closeBtn.className = 'close';
                    title.appendChild(closeBtn);

                    var info = document.createElement('div');
                    info.className = 'info';
                    info.appendChild(title);
                    info.appendChild(body);
                    
                    var overlayContent = document.createElement('div');
                    overlayContent.className = 'wrap';
                    overlayContent.appendChild(info);
                    
                    img.appendChild(imgTag);
                    body.appendChild(img);
                    
                    info.appendChild(body);
                    overlayContent.appendChild(info);
                    
                    // this.overlay.setMap(this.map);
                    // this.overlay.setPosition(marker.getPosition());
                    // this.overlay(() => {
                    //     map: this.map,
                    //     position: marker.getPosition()
                    // });
                    // var overlay = new kakao.maps.CustomOverlay({    
                    // });
                    var overlay = new kakao.maps.CustomOverlay({
                        map: this.map,
                        position: marker.getPosition(),
                        content: null,
                    });
                    overlay.setContent(overlayContent);
                  
                    overlay.setMap(this.map);
                    
                    // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
                    kakao.maps.event.addListener(marker, 'click', () => {
                      overlayContent.style.display="block";
                    });
                    
                    closeBtn.onclick = function() {
                      overlayContent.style.display="none";
                        // overlay.setMap(null);
                    }

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    let infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;font-size:13px;">' + spaceName +'</div>'
                    });

                    infowindow.open(this.map, marker);
                    bounds.extend(coords);
                }
                this.map.setBounds(bounds);
            });
        }

        },
    },
};
</script>

  <style>
  #kakaoMap {
  width: 100%;
  height: 100%;
}
.wrap {display:none;position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;}
    .wrap * {padding: 0;margin: 0;}
    .wrap .info {width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;}
    .wrap .info:nth-child(1) {border: 0;box-shadow: 0px 1px 2px #888;}
    .info .title {padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;}
    .info .close {position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');}
    .info .close:hover {cursor: pointer;}
    .info .body {position: relative;overflow: hidden;}
    .info .desc {position: relative;margin: 13px 0 0 90px;height: 75px;}
    .desc .type {overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .desc .price {font-size: 11px;color: #888;margin-top: -2px;}
    .info .img {position: absolute;top: 6px;left: 5px;width: 73px;height: 71px;border: 1px solid #ddd;color: #888;overflow: hidden;}
    .info:after {content: '';position: absolute;margin-left: -12px;left: 50%;bottom: 0;width: 22px;height: 12px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')}
    .info .link {color: #5085BB;}
  </style>
  