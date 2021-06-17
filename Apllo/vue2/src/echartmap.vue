<template>

    <div class="wrap">
        
        <div class="export">
            <span title="下载" class="el-icon-download" @click="exportExcle"></span>
        </div>
        <el-table id="table1" :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" width="180"> </el-table-column>
            <el-table-column prop="content" label="内容"> </el-table-column>
        </el-table>
        <el-button type="primary" @click="changeTheme">切换主题</el-button>
        <div class="section chartOfbar" ref="chartOfbar"></div>
    </div>
</template>

<script>
export default {
    props: {},

    data() {
        return {
            tableData: [],
            barOption: {
                color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                xAxis: [{
                    type: "category",
                    data: ["2021-04-15", "2021-04-16", "2021-04-17", "2021-04-18"],
                }],
                yAxis: [{
                        type: 'value',
                        name: '蒸发量',
                        min: 0,
                        max: 250,
                        position: 'left',
                        axisLine: {
                            show: true,
                            // lineStyle: {
                            //     color: colors[0]
                            // }
                        },
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                    {
                        type: 'value',
                        name: '降水量',
                        min: 0,
                        max: 250,
                        position: 'right',
                        offset: 0,
                        axisLine: {
                            show: true,
                            // lineStyle: {
                            //     color: colors[1]
                            // }
                        },
                        axisLabel: {
                            formatter: '{value} ml'
                        }
                    },
                ],
                legend: {
                    data: ['上海', '北京', "广州", "深圳"]
                },
                series: [{
                        data: [120, 200, 150, 80],
                        name: "上海",
                        type: "bar",
                        label: {
                            show: true,
                            position: "top"
                        }
                    },
                    {
                        data: [10, 290, 180, 90],
                        name: "北京",
                        type: "bar",
                        label: {
                            show: true,
                            position: "top"
                        }
                    },
                    {
                        data: [190, 30, 15, 67],
                        name: "广州",
                        type: "bar",
                        label: {
                            show: true,
                            position: "top"
                        }
                    },
                    {
                        data: [12, 233, 156, 98],
                        name: "深圳",
                        type: "bar",
                        label: {
                            show: true,
                            position: "top"
                        }
                    },
                ],
            },
        };
    },
    methods: {
        init() {
            barChart && barChart.dispose();
            let barChartDom = this.$refs.chartOfbar;
            let barChart = this.$echart.init(barChartDom);
            this.barOption && barChart.setOption(this.barOption);
        },
        exportExcle() {
            let table1 = document.querySelector("#table1");
            let sheet = XLSX.utils.table_to_sheet(table1); //将一个table对象转换成一个sheet对象
            openDownloadDialog(sheet2blob(sheet), "下载.xlsx");
        },
        fetch() {
            this.$http.get("articles").then(res => {
                if(200 === res.status){
                    this.tableData = res.data;
                }
            });
        },
        changeTheme(){
            let color2 = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'];
            this.barOption.color = color2;
            this.init();
        }
    },
    computed: {},
    watch: {},
    created() {
        this.fetch();
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped lang='scss'>
.wrap {
    width: 900px;
    margin: 24px auto;
    background: #f2f3f4;
    border-radius: 4px;
    .export {
        padding: 8px 24px;
        span {
            float: right;
        }
        [class^="el-icon"] {
            font-size: 24px;
            cursor: pointer;
            &:hover {
                color: #2e73ff;
            }
        }
        &::after {
            content: " ";
            display: block;
            clear: both;
        }
    }
    .chartOfbar {
        width: 100%;
        height: 300px;
    }
    .section {
        margin-top: 24px;
    }
}
</style>
