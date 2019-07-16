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

class Home extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean"));
        var date = new Date()
        this.state = {
            systemAccountBean:systemAccountBean,
            orderCountBean:{},
            refundBean:{},
            refundBean2:{}
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        this.getOrderCount();
        this.getRefundOrderCount();
        this.getRefundOrderCount2();
        this.getOrderCountByDate();
        this.getOrderPriceByDate();
    }

    getOrderCount(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderCount",{})
    }

    getRefundOrderCount(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/getRefundOrderCount",
            {refund_type:"1"})
    }
    getRefundOrderCount2(){
        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/getRefundOrderCount",
            {refund_type:"2"})
    }

    getOrderCountByDate(start_time,end_time){
        this.getDataByPost(4,shop_homeurl+"/orderController/v1.0/getOrderCountByDate",
            {start_time:start_time,end_time:end_time})
    }

    getOrderPriceByDate(start_time,end_time){
        this.getDataByPost(5,shop_homeurl+"/orderController/v1.0/getOrderPriceByDate",
            {start_time:start_time,end_time:end_time})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    orderCountBean:data
                })
                break;
            case 2:
                this.setState({
                    refundBean:data
                })
                break;
            case 3:
                this.setState({
                    refundBean2:data
                })
                break;
            case 4:
                let timeData=[];
                let countData=[];
                for(let i=0;i<data.length;i++){
                    timeData.push(data[i]["time"])
                    countData.push(data[i]["count"])
                }

                var myChart = echarts.init(document.getElementById("count"));
                var option = {
                    // 标题
                    title: {
                        text: '订单统计',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    //图例名
                    legend: {
                        data:['订单统计']
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
                        data: timeData,
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
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'订单数量',
                            type:'line',
                            smooth: true,
                            areaStyle: {},
                            itemStyle:{
                                normal:{
                                    color:'RGB(93,177,237)',
                                }
                            },
                            data:countData
                        }
                    ]
                };

                myChart.setOption(option);
                break;
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
                <div style={{display:'flex',height:70,marginTop:20,marginLeft:20,merginRight:20}}>
                    <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <div style={{display:'flex',width:170,background:'#ffffff',alignItems:'center'}}>
                            <img src="./images/icon1.png" style={{width:40,height:40,marginLeft:10}}/>
                            <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
                                <p1 style={{fontSize:13}}>今日订单总数</p1>
                                <p1 style={{fontSize:13}}>{this.state.orderCountBean.today_order_count}</p1>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <div style={{display:'flex',width:170,background:'#ffffff',alignItems:'center'}}>
                            <img src="./images/icon3.png" style={{width:40,height:40}}/>
                            <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
                                <p1 style={{fontSize:13}}>今日销售总额</p1>
                                <p1 style={{fontSize:13}}>¥{this.state.orderCountBean.today_order_price}</p1>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <div style={{display:'flex',width:170,background:'#ffffff',alignItems:'center'}}>
                            <img src="./images/icon2.png" style={{width:40,height:40}}/>
                            <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
                                <p1 style={{fontSize:13}}>昨日销售总额</p1>
                                <p1 style={{fontSize:13}}>¥{this.state.orderCountBean.yesterday_order_price}</p1>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',flex:1,justifyContent:'center'}}>
                        <div style={{display:'flex',width:170,background:'#ffffff',alignItems:'center'}}>
                            <img src="./images/icon4.png" style={{width:40,height:40}}/>
                            <div style={{display:'flex',flexDirection:'column',marginLeft:10}}>
                                <p1 style={{fontSize:13}}>近7天销售总额</p1>
                                <p1 style={{fontSize:13}}>¥{this.state.orderCountBean.week_order_price}</p1>
                            </div>
                        </div>
                    </div>
                </div>


                <div style={{display:'flex',flexDirection:'column',flex:1,marginRight:20,marginLeft:20,marginTop:20}}>
                    <div style={{display:'flex',minHeight:30,alignItems:'center',background:'RGB(243,243,243)'}}>
                        <p1 style={{fontSize:10,color:'RGB(102,102,102)',marginLeft:10}}>{"待处理事务"}</p1>
                    </div>
                    <div style={{display:'flex',background:'#ffffff'}}>
                        <div style={{display:'flex',width:2120,height:160,flexDirection:'column',alignItems:'center'
                            ,justifyContent:"center"}}>
                            <Widget.Text
                                titleWidth={120}
                                title={"待付款订单"}
                                width={200}
                                value={this.state.orderCountBean.wait_pay_count}/>
                            <Widget.Text
                                titleWidth={120}
                                title={"待发货订单"}
                                width={200}
                                value={this.state.orderCountBean.wait_send_count}/>
                            <Widget.Text
                                titleWidth={120}
                                title={"已发货订单"}
                                width={200}
                                value={this.state.orderCountBean.wait_receive_count}/>
                        </div>
                        <div style={{display:'flex',width:2120,height:160,flexDirection:'column',alignItems:'center'
                            ,justifyContent:"center"}}>
                            <Widget.Text
                                titleWidth={120}
                                title={"已完成订单"}
                                width={200}
                                value={this.state.orderCountBean.end_count}/>
                            <Widget.Text
                                titleWidth={120}
                                title={"待处理退货订单"}
                                width={200}
                                value={this.state.refundBean2.wait_review_count}/>
                            <Widget.Text
                                titleWidth={120}
                                title={"~"}
                                width={200}
                                value={""}/>
                        </div>
                        <div style={{display:'flex',width:2120,height:160,flexDirection:'column',alignItems:'center'
                            ,justifyContent:"center"}}>
                            <Widget.Text
                                titleWidth={120}
                                title={"待确认退货订单"}
                                width={200}
                                value={this.state.refundBean2.wait_review_count}/>
                            <Widget.Text
                                titleWidth={120}
                                title={"待处理退款申请"}
                                width={200}
                                value={this.state.refundBean.wait_review_count}/>
                            <Widget.Text
                                titleWidth={120}
                                title={"~"}
                                width={200}
                                value={""}/>
                        </div>
                    </div>
                </div>

                <div style={{display:'flex',flexDirection:'column',flex:1,marginRight:20,marginLeft:20,marginTop:20}}>
                    <div style={{display:'flex',minHeight:30,alignItems:'center',background:'RGB(243,243,243)'}}>
                        <p1 style={{fontSize:10,color:'RGB(102,102,102)',marginLeft:10}}>{"订单统计"}</p1>
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
                                this.getOrderCountByDate(a[0],a[1])
                            }}/>
                    </div>

                    <div style={{display:'flex'}}>
                        <div style={{display:'flex',flexDirection:'column',width:100}}>
                            <p1 style={{marginTop:10,color:'RGB(152,152,152)'}}>本月订单数量：</p1>
                            <p1 style={{marginTop:1}}>{this.state.orderCountBean.cur_month_count}</p1>
                            <div style={{display:'flex'}}>
                                <p1 style={{marginTop:1,color:"RGB(31,170,89)"}}>{this.toFixed((this.state.orderCountBean.cur_month_count-this.state.orderCountBean.pre_month_count)/this.state.orderCountBean.pre_month_count,2)}%</p1>
                                <p1 style={{marginTop:1,color:'RGB(152,152,152)',fontSize:13}}>同比上月</p1>
                            </div>
                            <p1 style={{marginTop:1,color:'RGB(152,152,152)'}}>本周订单数量：</p1>
                            <p1 style={{marginTop:1}}>{this.state.orderCountBean.cur_week_count}</p1>
                            <div style={{display:'flex'}}>
                                <p1 style={{marginTop:1,color:"red"}}>{this.toFixed((this.state.orderCountBean.cur_week_count-this.state.orderCountBean.pre_week_count)/this.state.orderCountBean.pre_week_count,2)}%</p1>
                                <p1 style={{marginTop:1,color:'RGB(152,152,152)',fontSize:13}}>同比上周</p1>
                            </div>
                        </div>
                        <div id={"count"} style={{width: 600, height: 220 }}></div>
                    </div>

                </div>

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
                    <div style={{display:'flex'}}>
                        <div style={{display:'flex',flexDirection:'column',width:100}}>
                            <p1 style={{marginTop:10,color:'RGB(152,152,152)'}}>本月销售总额：</p1>
                            <p1 style={{marginTop:1}}>{this.state.orderCountBean.cur_month_price}</p1>
                            <div style={{display:'flex'}}>
                                <p1 style={{marginTop:1,color:"RGB(31,170,89)"}}>{this.toFixed((this.state.orderCountBean.cur_month_price-this.state.orderCountBean.pre_month_price)/this.state.orderCountBean.pre_month_price,2)}%</p1>
                                <p1 style={{marginTop:1,color:'RGB(152,152,152)',fontSize:13}}>同比上月</p1>
                            </div>
                            <p1 style={{marginTop:1,color:'RGB(152,152,152)'}}>本周销售总额：</p1>
                            <p1 style={{marginTop:1}}>{this.state.orderCountBean.cur_week_price}</p1>
                            <div style={{display:'flex'}}>
                                <p1 style={{marginTop:1,color:"red"}}>{this.toFixed((this.state.orderCountBean.cur_week_price-this.state.orderCountBean.pre_week_price)/this.state.orderCountBean.pre_week_price,2)}%</p1>
                                <p1 style={{marginTop:1,color:'RGB(152,152,152)',fontSize:13}}>同比上周</p1>
                            </div>
                        </div>
                        <div id={"price"} style={{width: 600, height: 220 }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports=Home;