<template>
    <div ref="olMap" class="custom-map h-full w-full" id="map"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { XYZ, OSM, Vector as VectorSource } from "ol/source";
import { fromLonLat } from 'ol/proj';
import { defaults, FullScreen, Zoom } from 'ol/control';
import { Style, Icon } from 'ol/style';
import { Draw ,Modify} from 'ol/interaction'
import { createRegularPolygon, createBox } from 'ol/interaction/Draw'

/**
 * 地图构成要件
 * map-view(视图区)-layer(地图图源图层)-其他图层(其他图层在图源图层之上)
 */
const olMap = ref('');

function initMap() {
    // 使用高德
    const tileLayer = new TileLayer({
        // source: new OSM()
        source: new XYZ({
            url: 'https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
        })
    });

    olMap.value = new Map({
        view: new View({
            // projection: "EPSG:4326",
            center: fromLonLat([113.81,30.91]),//地图中心点
            zoom: 15,// 缩放级别
            minZoom: 0,// 最小缩放级别
            maxZoom: 18,// 最大缩放级别
            constrainResolution: true// 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
        }),
        layers: [tileLayer],
        controls: [
            new Zoom(),
            new FullScreen(),
        ],
        target: olMap.value// DOM容器
    });

    const mapRange = olMap.value.getView();
    console.log('mapRange', mapRange);
    // 初始化事件
    ininMapEvent();
    // 初始化手势
    initInteraction();
}
const ininMapEvent = ()=>{
    olMap.value.on('click', (e) => {
        console.log('click event');
    });
}
function initInteraction(drawType = 'Circle') {
    // 矢量图源
    let source = new VectorSource();
    // 由矢量图源形成的矢量图层
    let vector = new VectorLayer({
        source: source
    })
  
    olMap.value.addLayer(vector)
    let draw = new Draw({
        source: source,
        type: drawType,
        geometryFunction: createBox()
    })
    let modify = new Modify({
        source
    });
    olMap.value.addInteraction(draw);
    olMap.value.addInteraction(modify);
}


onMounted(() => {
    initMap();
})

</script>

<style>
.ol-control{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 30px;
}
.ol-control button{
    width: 30px;
    height: 30px;
    margin-bottom: 2px;
    background: #dcdcdc;
    font-size: 30px;
    line-height: 30px;
}

</style>