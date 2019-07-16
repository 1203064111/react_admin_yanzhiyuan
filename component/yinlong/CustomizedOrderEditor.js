/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CustomizedOrderEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.params.order_id,
            order_state:"",
            orderMerchantsBean:{},
            page:1,
            total:0,

        };
    }

    componentDidMount() {
        this.getOrderMerchantsDetail();


    }

    updateCustomizedOrderDetail(){

        if(isNaN(this.state.orderMerchantsBean.order_deposit_price)){
            this.showTip("定金含有非法数字");
            return;
        }
        if(isNaN(this.state.orderMerchantsBean.order_end_price)){
            this.showTip("尾款含有非法数字");
            return;
        }
        if(isNaN(this.state.orderMerchantsBean.order_price)){
            this.showTip("订单总价含有非法数字");
            return;
        }
        var params={};
        params["order_deposit_price"]=this.state.orderMerchantsBean.order_deposit_price;

        params["order_end_price"]=this.state.orderMerchantsBean.order_end_price;
        params["order_price"]=this.state.orderMerchantsBean.order_price;

        params["order_id"]=this.state.order_id;
        this.getDataByPost(2,maintail_homeurl+"/maintailOrderController/v1.0/updateCustomizedOrderDetail",params)
    }


    getOrderMerchantsDetail(){
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getCustomizedOrderDetail",{order_id:this.state.order_id})
    }
    sendCustomizedOrder(){
        this.getDataByPost(4,maintail_homeurl+"/maintailOrderController/v1.0/sendCustomizedOrder",{order_id:this.state.order_id})
    }

    doSuccess(index,data,total){
        switch(index){
            case 1:
                this.setState({
                    orderMerchantsBean:data,
                    order_state:data.order_state,
                })
                break;
            case 2:
                this.showTip("保存成功");
                this.getOrderMerchantsDetail();
                break;
            case 3:
                this.setState({
                    orderMerchantsBean:data,
                })
                break;
            case 4:
                this.getOrderMerchantsDetail()
                break;
        }
    }




    render(){
        return(
            <div>
                <Widget.Toolbar title={"订单详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Button
                        value="保存"
                        onClick={()=>{
                            this.updateCustomizedOrderDetail();
                        }}/>
                    <Widget.Button
                        style={{display:this.state.order_state === "1"?"flex":"none",marginRight:20,marginLeft:20}}
                        value="确认订单"
                        onClick={()=>{
                            this.sendCustomizedOrder();
                            this.updateCustomizedOrderDetail();
                        }}/>
                </Widget.View>
                <Widget.Detail
                    title="订单信息"
                    baseData={[
                        {name:"订单号",flex:1,key:'order_no',type:'text'},
                        {name:"订单总价",flex:1,key:'order_price'},
                        {name:"订单状态",flex:1,key:'order_state_show',type:'text'},
                        {name:"项目名称",flex:1,key:'customized_name',type:'text'},
                        {name:"户型名称",flex:1,key:'huxing_name',type:'text'},
                        {name:"方案名称",flex:1,key:'programme_name',type:'text'},
                        {name:"方案报价",flex:1,key:'programme_price',type:'text'},
                        {name:"订单状态",flex:1,key:'order_state_show',type:'text'},
                    ]}
                    data={this.state.orderMerchantsBean}
                    onChange={(key,value)=>{
                        this.state.orderMerchantsBean[key]=value;
                        this.refresh();
                    }}/>
                {this.renderSend()}
            </div>
        )
    }

    renderSend(){
        return(
            <div style={{display:'flex'}}>

                <Widget.Detail
                    width={300}
                    title="地址信息"
                    baseData={[{name:"收货人姓名",flex:1,key:'contact_name',type:'text'},
                        {name:"收货人手机号",flex:1,key:'contact_mobile',type:'text'},
                        {name:"省",flex:1,key:'address_provider',type:'text'},
                        {name:"市",flex:1,key:'address_city',type:'text'},
                        {name:"区",flex:1,key:'address_country',type:'text'},
                        {name:"详情地址",flex:1,key:'address_detail',type:'text'},
                    ]}
                    data={this.state.orderMerchantsBean}/>
                <Widget.Detail
                    width={300}
                    title="订单进度付款详情"
                    baseData={[{name:"定金",flex:1,key:'order_deposit_price',type:'text'},
                        {name:"定金支付订单号",flex:1,key:'out_trade_no1',type:'text'},
                        {name:"定金支付时间",flex:1,key:'pay_time1',type:'text'},
                        {name:"尾款",flex:1,key:'order_end_price',type:'text'},
                        {name:"尾款支付订单号",flex:1,key:'out_trade_no2',type:'text'},
                        {name:"尾款支付时间",flex:1,key:'pay_time2',type:'text'},
                    ]}
                    data={this.state.orderMerchantsBean}
                    onChange={(key,value)=>{
                        this.state.orderMerchantsBean[key]=value;
                        this.refresh();
                    }}/>

            </div>

        )
    }

}



module.exports=CustomizedOrderEditor;
