/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderMerchantsEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.params.order_id,
            order_merchants_id:this.props.params.order_merchants_id,
            order_state:"",
            orderMerchantsBean:{},
            orderAddressBean:{},
            orderGoodsBeans:[],
            orderActivityBeans:[],
            orderLogisticsBean:{},
            orderLogisticsCompanyBeans:[],
        };
    }

    componentDidMount() {
        this.getOrderMerchantsDetail();
        this.getOrderLogisticsCompanys();
        this.getCitys();
    }
    getCitys(){
        this.getDataByPost(5,member_homeurl+"/settingController/v1.0/getCitys",{});
    }

    getOrderLogisticsCompanys(){
        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/getOrderLogisticsCompanys"
            ,{})
    }


    getOrderMerchantsDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderMerchantsDetail",{order_merchants_id:this.state.order_merchants_id})
    }

    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    orderMerchantsBean:data,
                    order_state:data.order_state,
                    orderAddressBean:data.orderAddressBean,
                    orderLogisticsBean:data.orderLogisticsBean,
                    orderGoodsBeans:data.orderGoodsBeans,
                    orderActivityBeans:data.orderActivityBeans
                })
                break;
            case 2:
                this.showTip("保存成功");
                this.getOrderMerchantsDetail();
                break;
            case 3:
                this.setState({
                    orderLogisticsCompanyBeans:data,
                })
                break;
            case 4:
                this.showTip("发货成功");
                this.getOrderMerchantsDetail()
                break;
            case 5:
                this.setState({
                    cityBeans:data
                })
                break;
        }
    }


    sendOrder(){
        var params={};
        params["order_merchants_id"]=this.state.order_merchants_id;
        params["logistics_no"] = this.state.orderLogisticsBean.logistics_no;
        params["logistics_name"] = this.getNull(this.state.orderLogisticsBean.logistics_name,this.state.orderLogisticsCompanyBeans[0].logistics_name);
        params["logistics_pinyin"] = this.getNull(this.state.orderLogisticsBean.logistics_pinyin,this.state.orderLogisticsCompanyBeans[0].logistics_pinyin);
        params["send_company"] = this.state.orderLogisticsBean.send_company;
        params["send_name"] = this.state.orderLogisticsBean.send_name;
        params["send_mobile"] = this.state.orderLogisticsBean.send_mobile;
        params["send_privince"] = this.state.orderLogisticsBean.send_privince;
        params["send_city"] = this.state.orderLogisticsBean.send_city;
        params["send_country"] = this.state.orderLogisticsBean.send_country;
        params["send_address"] = this.state.orderLogisticsBean.send_address;
        params["send_zip_code"] = this.state.orderLogisticsBean.send_zip_code;
        this.getDataByPost(4,shop_homeurl + "/orderController/v1.0/sendOrder", params)
    }

    updateOrderLogistics(){
        var params={};
        params["logistics_order_id"]=this.state.orderLogisticsBean.logistics_order_id;
        params["order_merchants_id"]=this.state.order_merchants_id;
        params["logistics_no"] = this.state.orderLogisticsBean.logistics_no;
        params["logistics_name"] = this.state.orderLogisticsBean.logistics_name;
        params["logistics_pinyin"] = this.state.orderLogisticsBean.logistics_pinyin;
        params["send_company"] = this.state.orderLogisticsBean.send_company;
        params["send_name"] = this.state.orderLogisticsBean.send_name;
        params["send_mobile"] = this.state.orderLogisticsBean.send_mobile;
        params["send_privince"] = this.state.orderLogisticsBean.send_privince;
        params["send_city"] = this.state.orderLogisticsBean.send_city;
        params["send_country"] = this.state.orderLogisticsBean.send_country;
        params["send_address"] = this.state.orderLogisticsBean.send_address;
        params["send_zip_code"] = this.state.orderLogisticsBean.send_zip_code;
        this.getDataByPost(2,shop_homeurl + "/orderController/v1.0/updateOrderLogistics", params)
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
                <Widget.Detail
                    title="订单信息"
                    baseData={[
                        {name:"订单号",flex:1,key:'order_merchants_no',type:'text'},
                        {name:"订单总金额",flex:1,key:'order_total_price',type:'text'},
                        {name:"支付金额",flex:1,key:'order_actual_price',type:'text'},
                        {name:"优惠券金额",flex:1,key:'coupon_price',type:'text'},
                        {name:"活动优惠金额",flex:1,key:'reduce_price',type:'text'},
                        {name:"邮费",flex:1,key:'freight_price',type:'text'},
                        {name:"订单状态",flex:1,key:'order_state_show',type:'text'},
                        {name:"订单类型",flex:1,key:'order_type_show',type:'text'},
                        {name:"备注",flex:1,key:'order_remark'}]}
                    data={this.state.orderMerchantsBean}
                    onChange={(key,value)=>{
                        this.state.orderMerchantsBean[key]=value;
                        this.refresh();
                    }}/>
                {this.renderGoods()}
                {this.renderActivity()}
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
                    baseData={[{name:"地址id",flex:1,key:'address_id',type:'text'},
                        {name:"收货人姓名",flex:1,key:'address_name',type:'text'},
                        {name:"收货人手机号",flex:1,key:'address_mobile',type:'text'},
                        {name:"省",flex:1,key:'address_province',type:'text'},
                        {name:"市",flex:1,key:'address_city',type:'text'},
                        {name:"区",flex:1,key:'address_country',type:'text'},
                        {name:"详情地址",flex:1,key:'assress_detailed_road',type:'text'},
                        {name:"邮编",flex:1,key:'address_zip_code',type:'text'},
                    ]}
                    data={this.state.orderAddressBean}/>
                <Widget.Detail
                    width={300}
                    title="发货信息"
                    baseData={[{name:"快递单号",flex:1,key:'logistics_no'},
                        {name:"快递公司",flex:1,key:'logistics_pinyin',type:'select',data:this.state.orderLogisticsCompanyBeans,show_value:"logistics_name",select_value:"logistics_pinyin"},
                        {name:"发件人公司名称",flex:1,key:'send_company'},
                        {name:"发件人姓名",flex:1,key:'send_name'},
                        {name:"发件人手机号",flex:1,key:'send_mobile'},
                        {name:"发件人省市区",flex:1,key1:'send_privince',key2:'send_city',key3:'send_country',type:'city',addressBeans:this.state.cityBeans},
                        {name:"发件人地址",flex:1,key:'send_address'},
                        {name:"发件人邮编",flex:1,key:'send_zip_code'},
                    ]}
                    data={this.state.orderLogisticsBean}
                    onChange={(key,value,index)=>{
                        this.state.orderLogisticsBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:this.state.order_state === "wait_receive"?"flex":"none",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        if(this.isNull(this.state.orderLogisticsBean.logistics_no)){
                                            this.showTip("请先填写快递单号");
                                            return;
                                        }
                                        this.openTip("确认保存?",()=>{
                                            this.updateOrderLogistics()
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{display:this.state.order_state === "wait_send"?"flex":"none",marginRight:20}}
                                    value="发货"
                                    onClick={()=>{
                                        if(this.isNull(this.state.orderLogisticsBean.logistics_no)){
                                            this.showTip("请先填写快递单号");
                                            return;
                                        }
                                        this.openTip("确认发货?",()=>{
                                            this.sendOrder()
                                        })
                                    }}/>
                            </div>
                        )
                    }}/>
            </div>
        )
    }

    renderActivity() {
        return (
            <div style={{display:this.state.orderActivityBeans.length>0?"flex":"none"}}>
                <Widget.Detail
                    title="活动信息"
                    baseData={[]}
                    data={{}}>
                    <Widget.List
                        data={[
                            {name:"活动ID",flex:1,key:'activity_id',type:'text'},
                            {name:"活动名称",flex:1,key:'activity_name',type:'text'},
                            {name:"活动类型",flex:1,key:'activity_type_show',type:'text'},

                            {name:"满减满足金额",flex:1,key:'reduce_full_price',type:'text'},

                            {name:"满减金额",flex:1,key:'reduce_price',type:'text'},
                            {name:"活动价",flex:1,key:'activity_price',type:'text'},

                        ]}
                        dataSource={this.state.orderActivityBeans}/>
                </Widget.Detail>
            </div>
        )
    }

    renderGoods(){
        return(
            <Widget.Detail
                title="商品信息"
                baseData={[]}
                data={{}}>
                <Widget.List
                    data={[
                        {name:"商品ID",flex:1,key:'goods_id',type:'text'},
                        {name:"品牌",flex:1,key:'brand_name',type:'text'},
                        {name:"商品名称",flex:1,key:'goods_name',type:'text'},
                        {name:"购买数量",flex:1,key:'goods_num',type:'text'},

                        {name:"商品零售价",flex:1,key:'specification_price',type:'text'},

                        {name:"商品供货价",flex:1,key:'specification_wholesale_price',type:'text'},

                        {name:"商品实际支付价格",flex:1,key:'refund_price',type:'text'},

                        {name:"活动价",flex:1,key:'activity_price',type:'text'},

                        {name:"商品可退金额",flex:1,key:'refund_price',type:'text'},

                        {name:"商品已退金额",flex:1,key:'refund_end_price',type:'text'},
                        {name:"退款数量",flex:1,key:'refund_count',type:'text'},
                        {name:"退款状态",flex:1,key:'refund_state_show',type:'text'},
                        {name:"参加活动",flex:1,key:'is_descending_show',type:'text'},


                        {name:"商品规格",flex:1,key:'specification_names',type:'text'},
                        {name:"规格库存",flex:1,key:'specification_stock',type:'text'},
                        {name:"规格图片",flex:1,key:'specification_img',type:'img'},
                    ]}
                    dataSource={this.state.orderGoodsBeans}/>
            </Widget.Detail>
        )
    }
}



module.exports=OrderMerchantsEditor;
