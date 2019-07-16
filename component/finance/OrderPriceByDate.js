/**
 * Created by sjb on 18/7/9.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var Widget=require('./../widget/widget');

import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import  'echarts/lib/chart/line';

class OrderPriceByDate extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean"));
        var date = new Date()
        this.state = {
            systemAccountBean:systemAccountBean,

        };
    }

    componentDidMount() {
        this.getData();
    }

    getData(){

        this.getOrderPriceByDate();
    }




    // getOrderCountByDate(start_time,end_time){
    //     this.getDataByPost(4,shop_homeurl+"/orderController/v1.0/getOrderCountByDate",
    //         {start_time:start_time,end_time:end_time})
    // }

    getOrderPriceByDate(start_time,end_time){
        this.getDataByPost(5,shop_homeurl+"/orderController/v1.0/getOrderTotalAmounts",
            {start_time:start_time,end_time:end_time,merchants_id:this.state.systemAccountBean.merchants_id})
    }
    doSuccess(index,data){
        switch (index){
            case 5:
                let timeData2=[];
                let countData2=[];
                for(let i=0;i<data.length;i++){
                    timeData2.push(data[i]["time"])
                    countData2.push(data[i]["price"])
                }

                var myChart = echarts.init(document.getElementById("price"));
                var option = {
                    // 标题
                    title: {
                        text: '销售统计',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    //图例名
                    legend: {
                        data:['销售统计']
                    },
                    grid: {
                        left: '3%',   //图表距边框的距离
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    //工具框，可以选择
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    //x轴信息样式
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: timeData2,
                        //坐标轴颜色
                        axisLine:{
                            lineStyle:{
                                color:'#000000'
                            }
                        },

                    },

                    yAxis : [
                        {
                            type : 'value',
                            axisLabel : {
                                formatter: '¥{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'销售金额',
                            type:'line',
                            smooth: true,
                            areaStyle: {},
                            itemStyle:{
                                normal:{
                                    color:'RGB(93,177,237)',
                                }
                            },
                            data:countData2
                        }
                    ]
                };

                myChart.setOption(option);
                break;
        }
    }
    render() {
        return (
            <div>
                <Widget.Toolbar title="系统首页" history={this.props.history}></Widget.Toolbar>





                {/*<div style={{display:'flex',flexDirection:'column',flex:1,marginRight:20,marginLeft:20,marginTop:20}}>*/}
                    {/*<div style={{display:'flex',minHeight:30,alignItems:'center',background:'RGB(243,243,243)'}}>*/}
                        {/*<p1 style={{fontSize:10,color:'RGB(102,102,102)',marginLeft:10}}>{"订单统计"}</p1>*/}
                    {/*</div>*/}
                    {/*<div style={{display:'flex',minHeight:30,alignItems:'center',justifyContent:'center'}}>*/}
                        {/*<Widget.Date*/}
                            {/*title_style={{width:80}}*/}
                            {/*title_p_style={{display:"none"}}*/}
                            {/*date_style={{width:150}}*/}
                            {/*type={"date"}*/}
                            {/*value={this.state.start_time?this.state.start_time+" - "+this.state.end_time:""}*/}
                            {/*range={true}*/}
                            {/*onChange={(value)=>{*/}
                                {/*let a=value.split(" - ");*/}
                                {/*this.getOrderCountByDate(a[0],a[1])*/}
                            {/*}}/>*/}
                    {/*</div>*/}

                    {/**/}

                {/*</div>*/}

                <div style={{display:'flex',flexDirection:'column',flex:1,marginRight:20,marginLeft:20,marginTop:20}}>
                    <div style={{display:'flex',minHeight:30,alignItems:'center',background:'RGB(243,243,243)'}}>
                        <p1 style={{fontSize:10,color:'RGB(102,102,102)',marginLeft:10}}>{"销售统计"}</p1>
                    </div>
                    <div style={{display:'flex',minHeight:30,alignItems:'center',justifyContent:'center'}}>
                        <Widget.Date
                            title_style={{width:80}}
                            title_p_style={{display:"none"}}
                            date_style={{width:150}}
                            type={"date"}
                            value={this.state.start_time?this.state.start_time+" - "+this.state.end_time:""}
                            range={true}
                            onChange={(value)=>{
                                let a=value.split(" - ");
                                this.getOrderPriceByDate(a[0],a[1])
                            }}/>
                    </div>

                </div>
            </div>
        );
    }
}
module.exports=OrderPriceByDate;