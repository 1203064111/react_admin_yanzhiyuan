/**
 * Created by sjb on 18/7/9.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var Widget=require('./../../widget/widget');

var PieEcharts=require('./../echarts/PieEcharts');

class OrderReport extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean"));
        this.state = {
            systemAccountBean:systemAccountBean,
            orderCountBeans:[],
            orderPirceBeans:[],
        };
    }

    componentDidMount() {
        this.getOrderCounts();
        this.getOrderPrices();
    }

    getOrderPrices(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/getOrderPrices",{merchants_id:this.state.systemAccountBean.merchants_id});
    }
    getOrderCounts(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderCounts",{merchants_id:this.state.systemAccountBean.merchants_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    orderCountBeans:data
                })
                break;
            case 2:
                this.setState({
                    orderPirceBeans:data
                })
                break;
        }
    }
    render() {
        return (
            <div>
                <Widget.Toolbar title="首页" history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',marginTop:20}}>
                    <PieEcharts
                        id="order_count"
                        title="订单数"
                        data={this.state.orderCountBeans}>
                    </PieEcharts>
                    <PieEcharts
                        id="order_price"
                        title="订单销售金额(¥)"
                        data={this.state.orderPirceBeans}>
                    </PieEcharts>
                </div>
            </div>
        );
    }
}
module.exports=OrderReport;