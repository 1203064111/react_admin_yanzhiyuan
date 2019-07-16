/**
 * Created by liyong on 2018/9/15.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class ActivityOneYuanOrderDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.params.order_id,
            order_state:"",
            ZMAyOrderBean:{},
            activityAddressBean:{},
            OneyuanLogisticsBean:{},
            logisticsBean:{},
            orderLogisticsCompanyBeans:[],
        };
    }

    componentDidMount() {
        this.getActivityOrderDetail();
        this.getOrderLogisticsCompanys();
        this.getCitys();
    }

    getActivityOrderDetail(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getActivityOrderDetail",{order_id:this.state.order_id})
    }

    getOrderLogisticsCompanys(){
        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/getOrderLogisticsCompanys" ,{})
    }

    getCitys(){
        this.getDataByPost(5,member_homeurl+"/settingController/v1.0/getCitys",{});
    }

    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    ZMAyOrderBean:data,
                    fright_order_state:data.fright_order_state,
                    activityAddressBean:data.activityAddressBean,
                    logisticsBean:data.logisticsBean,
                })
                break;
            case 2:
                this.showTip("保存成功");
                this.getActivityOrderDetail();
                break;
            case 3:
                this.setState({
                    orderLogisticsCompanyBeans:data,
                })
                break;
            case 4:
                this.showTip("发货成功");
                this.getActivityOrderDetail()
                break;
            case 5:
                this.setState({
                    cityBeans:data
                })
                break;
        }
    }

    DeliverGoods(){
        var params={};
        params["order_id"]=this.state.order_id;
        params["logistics_no"] = this.state.logisticsBean.logistics_no;
        params["logistics_name"] = this.getNull(this.state.logisticsBean.logistics_name,this.state.orderLogisticsCompanyBeans[0].logistics_name);
        params["logistics_code"] = this.getNull(this.state.logisticsBean.logistics_code,this.state.orderLogisticsCompanyBeans[0].logistics_pinyin);
        params["send_company"] = this.state.logisticsBean.send_company;
        params["send_name"] = this.state.logisticsBean.send_name;
        params["send_mobile"] = this.state.logisticsBean.send_mobile;
        params["send_privince"] = this.state.logisticsBean.send_privince;
        params["send_city"] = this.state.logisticsBean.send_city;
        params["send_country"] = this.state.logisticsBean.send_country;
        params["send_address"] = this.state.logisticsBean.send_address;
        params["send_zip_code"] = this.state.logisticsBean.send_zip_code;
        this.getDataByPost(4,sheep_homeurl + "/activityController/v1.0/DeliverGoods", params)
    }

    updateLogisticsInformation(){
        var params={};
        params["logistics_order_id"]=this.state.logisticsBean.logistics_order_id;
        params["order_id"]=this.state.order_id;
        params["logistics_no"] = this.state.logisticsBean.logistics_no;
        params["logistics_name"] = this.state.logisticsBean.logistics_name;
        params["logistics_code"] = this.state.logisticsBean.logistics_code;
        params["send_company"] = this.state.logisticsBean.send_company;
        params["send_name"] = this.state.logisticsBean.send_name;
        params["send_mobile"] = this.state.logisticsBean.send_mobile;
        params["send_privince"] = this.state.logisticsBean.send_privince;
        params["send_city"] = this.state.logisticsBean.send_city;
        params["send_country"] = this.state.logisticsBean.send_country;
        params["send_address"] = this.state.logisticsBean.send_address;
        params["send_zip_code"] = this.state.logisticsBean.send_zip_code;
        this.getDataByPost(2,sheep_homeurl + "/activityController/v1.0/updateLogisticsInformation", params)
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
                        {name:"订单号",flex:1,key:'order_no',type:'text'},
                        {name:"商品名称",flex:1,key:'goods_name',type:'text'},
                        {name:"订单金额",flex:1,key:'order_price',type:'text'},
                        {name:"邮费",flex:1,key:'freight_price',type:'text'},
                        {name:"订单状态",flex:1,key:'order_state',type:'text'} ]}
                    data={this.state.ZMAyOrderBean}
                    onChange={(key,value)=>{
                        this.state.ZMAyOrderBean[key]=value;
                        this.refresh();
                    }}/>
                {this.renderDeliver()}
            </div>
        )
    }

    renderDeliver(){
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
                        {name:"详情地址",flex:1,key:'address_detailed',type:'text'},
                        {name:"邮编",flex:1,key:'address_zip_code',type:'text'},
                    ]}
                    data={this.state.activityAddressBean}/>
                <Widget.Detail
                    width={300}
                    title="发货信息"
                    baseData={[{name:"快递单号",flex:1,key:'logistics_no'},
                        {name:"快递公司",flex:1,key:'logistics_code',type:'select',data:this.state.orderLogisticsCompanyBeans,show_value:"logistics_name",select_value:"logistics_pinyin"},
                        {name:"发件人公司名称",flex:1,key:'send_company'},
                        {name:"发件人姓名",flex:1,key:'send_name'},
                        {name:"发件人手机号",flex:1,key:'send_mobile'},
                        {name:"发件人省市区",flex:1,key1:'send_privince',key2:'send_city',key3:'send_country',type:'city',addressBeans:this.state.cityBeans},
                        {name:"发件人地址",flex:1,key:'send_address'},
                        {name:"发件人邮编",flex:1,key:'send_zip_code'},
                    ]}
                    data={this.state.logisticsBean}
                    onChange={(key,value,index)=>{
                        this.state.logisticsBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:this.state.fright_order_state === "wait_receive"?"flex":"none",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.openTip("确认保存?",()=>{
                                            this.updateLogisticsInformation()
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{display:this.state.fright_order_state === "wait_send"?"flex":"none",marginRight:20}}
                                    value="发货"
                                    onClick={()=>{
                                        this.openTip("确认发货?",()=>{
                                            this.DeliverGoods()
                                        })
                                    }}/>
                            </div>
                        )
                    }}/>
            </div>
        )
    }

}

module.exports=ActivityOneYuanOrderDetail;


