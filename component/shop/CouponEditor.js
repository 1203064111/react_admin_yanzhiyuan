/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CouponEditor extends Widget.Base{

    constructor(props) {
        super(props);
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            couponBean:{},
            coupon_id:this.props.params.coupon_id,
            couponWayBeans:[{name:"请选择",value:"0"},{name:"满额立减",value:"1"},{name:"满额折扣",value:"2"}],

            index:1,
            activityGiveGoodsBean:[],
            page:1,
            total:0,

        };
    }

    componentDidMount() {
        if(this.props.params.coupon_id!=="-1"){
            this.getShopCouponDetail();
        }
    }

    getShopCouponDetail(){
        this.getDataByPost(1,shop_homeurl+"/shopCouponContrllor/v1.0/getShopCouponDetail",{coupon_id:this.state.coupon_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    couponBean:data,
                })
                break;
            case 2:
                this.showTip("保存成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("保存成功");
                this.props.history.goBack();
                break;

        }
    }

    insertShopCoupon(){
        if(this.isNull(this.state.couponBean.coupon_name)){
            this.showTip("请先添加名称");
            return;
        }
        if(this.isNull(this.state.couponBean.coupon_full_price)){
            this.showTip("请先添加满足条件的金额");
            return;
        }
        if(this.isNull(this.state.couponBean.coupon_way)){
            this.showTip("请先添加优惠方式");
            return;
        }
        if(this.isNull(this.state.couponBean.people_limit)){
            this.showTip("请先添加领取上限");
            return;
        }
        if(this.isNull(this.state.couponBean.issue_num)){
            this.showTip("请先添加发行数量");
            return;
        }

        var params={};
        params["coupon_name"]=this.state.couponBean.coupon_name;
        params["coupon_desc"]=this.state.couponBean.coupon_desc;
        params["coupon_full_price"]=this.state.couponBean.coupon_full_price;
        params["coupon_price"]=this.state.couponBean.coupon_price;
        params["start_time"]=this.state.couponBean.start_time;
        params["end_time"]=this.state.couponBean.end_time;
        params["coupon_way"]=this.state.couponBean.coupon_way;
        params["percent"]=this.state.couponBean.percent;
        params["coupon_state"]=this.state.couponBean.coupon_state;
        params["people_limit"]=this.state.couponBean.people_limit;
        params["issue_num"]=this.state.couponBean.issue_num;



        if(this.state.coupon_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/shopCouponContrllor/v1.0/insertShopCoupon",params);
        }else{
            params["coupon_id"]=this.state.coupon_id;
            this.getDataByPost(3,shop_homeurl+"/shopCouponContrllor/v1.0/updateShopCoupon",params);
        }
    }




    render(){
        return(
            <div>
                <Widget.Toolbar title={"优惠券详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderBase()}
            </div>
        )
    }

    renderBase(){

        let baseData = [];
        baseData = [{name:"优惠劵名称",flex:1,key:'coupon_name'},
            {name:"优惠劵描述",flex:1,key:'coupon_desc'},
            {name:"满足条件的金额",flex:1,key:'coupon_full_price'},

        ];

        baseData = baseData.concat([{name:"优惠方式",flex:1,key:'coupon_way',type:'select',data:this.state.couponWayBeans,show_value:'name',select_value:'value'},]);
        if(this.state.couponBean.coupon_way === "2"){
            baseData = baseData.concat([{name:"优惠折扣",flex:1,key:'percent'},]);
        }else if(this.state.couponBean.coupon_way === "1"){
            baseData = baseData.concat([{name:"优惠金额",flex:1,key:'coupon_price'},]);
        }
        baseData = baseData.concat([
            {name:"使用时间",flex:1,key:'start_time',key2:'end_time',type:'dates',dateType:'datetime'},
            {name:"领取上限",flex:1,key:'people_limit'},
            {name:"发行数量",flex:1,key:'issue_num'},]);
        return(
            <div style={{display:this.state.index==1?'flex':"none",flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.couponBean}
                    onChange={(key,value,index)=>{
                        this.state.couponBean[key]=value;

                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertShopCoupon();
                    }}/>
            </div>
        )
    }


}

module.exports=CouponEditor;