/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SheepCoupon extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            sheepCoupons:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getSheepCoupons();
    }
    getSheepCoupons(){
        this.getDataByPost(1,sheep_homeurl+"/sheepCouponController/v1.0/getSheepCoupons"
            ,{page:this.state.page,},{type:2})
    }

    deleteSheepCoupon(){
        this.getDataByPost(2,sheep_homeurl+"/sheepCouponController/v1.0/deleteSheepCoupon",{coupon_id:this.state.coupon_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    sheepCoupons:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSheepCoupons();
                break;
                case 3:
                this.getSheepCoupons();
                break;
            
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteSheepCoupon();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"认养券列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/sheepCoupon_detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'coupon_id'},
                        {name:"优惠券名称",flex:2,key:'coupon_name'},
                        {name:'类型',flex:1,key:'coupon_class_show'},
                        {name:"优惠金额",flex:1,key:'coupon_price'},
                        {name:'获取方式',flex:1,key:'coupon_type_show'},
                        {name:'兑换所需金币',flex:1,key:'coupon_need_coin'},
                        {name:'状态',flex:1,key:'coupon_state',type:'radio_select'},
                        {name:"领取量",flex:1,key:'take_num'},
                        {name:"使用量",flex:1,key:'used_num'},
                        {name:'时间类型',flex:1,key:'time_type_show'},
                        {name:"有效天数",flex:1,key:'effective_day'},
                        {name:"开始时间",flex:2,key:'start_use_time'},
                        {name:"结束时间",flex:2,key:'end_use_time'},
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.sheepCoupons}
                    onChange={
                        (rowID,key,value)=>{
                            if(key==="coupon_state"){
                                this.getDataByPost(3,sheep_homeurl+"/sheepCouponController/v1.0/updateSheepCoupon",
                                {coupon_id:this.state.sheepCoupons[rowID].coupon_id,
                                    coupon_state:value});
                            }
                            this.state.sheepCoupons[rowID][key]=value;
                            this.refresh();
                        }
                    }
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/sheepCoupon_detail/"+this.state.sheepCoupons[rowID].coupon_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    coupon_id:this.state.sheepCoupons[rowID].coupon_id
                                })
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getSheepCoupons()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=SheepCoupon;