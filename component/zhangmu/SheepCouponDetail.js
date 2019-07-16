/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SheepCouponEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            coupon_id:this.props.params.coupon_id,
            couponClassBeans:[{name:'认养券',value:'0'},{name:'合养券',value:'1'}],
            timeTypeBeans:[{name:"绝对时间",value:"0"},{name:"相对时间",value:"1"}],
            couponTypeBeans:[{name:'兑换券',value:'exchange'},{name:'领取券',value:'get'}],
            sheepCouponBean:{},
        };
    }

    componentDidMount() {
        if(this.props.params.coupon_id+""==="-1"){
           
            this.setState(
                {
                    sheepCouponBean:{
                        coupon_state:'1',
                        coupon_type:this.state.couponTypeBeans[0].value,
                        time_type:this.state.timeTypeBeans[0].value,
                        coupon_class:this.state.couponClassBeans[0].value,
                    }
                }
            )
        }else{
            this.getSheepCouponDetail();
        }
       

    }

    getSheepCouponDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepCouponController/v1.0/getSheepCouponDetail",{coupon_id:this.state.coupon_id});
    }
    ///sheepCouponController/v1.0/getSheepCouponDetail

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    sheepCouponBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    insertSheepCoupon(){
        if(this.isNull(this.state.sheepCouponBean.coupon_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["coupon_name"]=this.state.sheepCouponBean.coupon_name;
        params["coupon_price"]=this.state.sheepCouponBean.coupon_price;
        params['coupon_state']=this.state.sheepCouponBean.coupon_state;
        params['coupon_img']=this.state.sheepCouponBean.coupon_img;
        params['coupon_desc']=this.state.sheepCouponBean.coupon_desc;

       

        if(this.state.coupon_id==="-1"){

            params['coupon_class']=this.state.sheepCouponBean.coupon_class
            params['coupon_need_coin']=this.state.sheepCouponBean.coupon_need_coin
            params['coupon_type']=this.state.sheepCouponBean.coupon_type;
            params["time_type"]=this.state.sheepCouponBean.time_type;
            params["start_use_time"]=this.state.sheepCouponBean.start_use_time;
            params["end_use_time"]=this.state.sheepCouponBean.end_use_time;
            params["effective_day"]=this.state.sheepCouponBean.effective_day;
            this.getDataByPost(2,sheep_homeurl+"/sheepCouponController/v1.0/insertSheepCoupon",params);
        }else{
            params["coupon_id"]=this.state.coupon_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepCouponController/v1.0/updateSheepCoupon",params);
        }
    }


    render(){
        let baseData=[];
        if(this.state.coupon_id+""==="-1"){//添加

            baseData=
            [
                {name:'优惠券名',flex:1,key:'coupon_name'},
                {name:'券类型',flex:1,key:'coupon_class',type:'select',data:this.state.couponClassBeans,select_value:'value',show_value:'name'},
                {name:'优惠价格',flex:1,key:'coupon_price'},
                {name:'状态',flex:1,key:'coupon_state',type:'radio_select'},
                {name:'图片',flex:1,key:'coupon_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'获取方式',flex:1,key:'coupon_type',type:'select',data:this.state.couponTypeBeans,select_value:'value',show_value:'name'},
                {name:'时间类型',flex:1,key:'time_type',type:'select',data:this.state.timeTypeBeans,select_value:'value',show_value:'name'},
                {name:'描述',flex:1,key:'coupon_desc',type:'textarea'}
            ]
            if(this.state.sheepCouponBean.coupon_type+""==="exchange"){
                baseData.splice(6,0,{name:'金币要求',flex:1,key:'coupon_need_coin'})

            }
            if(this.state.sheepCouponBean.time_type==="0"){
                baseData.splice(-1,0,{name:"开始时间",flex:1,key:'start_use_time',type:'date',dateType:'datetime'},
                {name:"结束时间",flex:1,key:'end_use_time',type:'date',dateType:'datetime'})
            }else{
                baseData.splice(-1,0,{name:"有效天数",flex:1,key:'effective_day'})
            }
                   

        }
        else{

            baseData=
            [
                {name:'优惠券名',flex:1,key:'coupon_name'},
                {name:'券类型',flex:1,key:'coupon_class_show',type:'text'},
                {name:'优惠价格',flex:1,key:'coupon_price'},
                {name:'状态',flex:1,key:'coupon_state',type:'radio_select'},
                {name:'图片',flex:1,key:'coupon_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'获取方式',flex:1,key:'coupon_type_show',type:'text',},
                {name:'时间类型',flex:1,key:'time_type_show',type:'text',},
                {name:'描述',flex:1,key:'coupon_desc',type:'textarea'}
            ]
            if(this.state.sheepCouponBean.coupon_type+""==="exchange"){
                baseData.splice(6,0,{name:'金币要求',flex:1,key:'coupon_need_coin',type:'text'})

            }
            if(this.state.sheepCouponBean.time_type==="0"){
                baseData.splice(-1,0,{name:"开始时间",flex:1,key:'start_use_time',type:'text',},
                {name:"结束时间",flex:1,key:'end_use_time',type:'text'})
            }else{
                baseData.splice(-1,0,{name:"有效天数",flex:1,key:'effective_day',type:'text'})
            }
                   


        }

           
       
        

        return(
            <div>
                <Widget.Toolbar title={"优惠券详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.sheepCouponBean}
                    onChange={(key,value,index)=>{
                        this.state.sheepCouponBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSheepCoupon();
                    }}/>
            </div>
        )
    }
}

module.exports=SheepCouponEditor;