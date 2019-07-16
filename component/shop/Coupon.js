/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Coupon extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            shopCouponBanners:[],
            merchants_id:this.getNull(systemAccountBean.merchants_id,"-1"),
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getShopCoupons();
    }
    getShopCoupons(){
        this.getDataByPost(1,shop_homeurl+"/shopCouponContrllor/v1.0/getShopCoupons"
            ,{page:this.state.page},{type:2})
    }

    deleteShopCoupon(){
        this.getDataByPost(2,shop_homeurl+"/shopCouponContrllor/v1.0/deleteShopCoupon",{coupon_id:this.state.coupon_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    shopCouponBanners:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getShopCoupons();
                break;
            case 3:
                this.showTip("操作成功");
                this.getShopCoupons();
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
                                this.deleteShopCoupon();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"优惠券列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_coupon_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'coupon_id'},
                        {name:"优惠券名称",flex:2,key:'coupon_name'},
                        {name:"优惠劵描述",flex:1,key:'coupon_desc'},
                        {name:"优惠方式",flex:1,key:'coupon_way_show'},
                        {name:"优惠满足金额",flex:1,key:'coupon_full_price'},
                        {name:"优惠金额",flex:1,key:'coupon_price'},
                        {name:"优惠折扣",flex:1,key:'percent'},
                        {name:"状态",flex:1,key:'coupon_state',type:'radio_select'},
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.shopCouponBanners}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){

                            case 0:
                                this.setState({
                                    visible:true,
                                    coupon_id:this.state.shopCouponBanners[rowID].coupon_id
                                })
                                break;
                        }
                    }}

                    onChange={(rowID,key,value)=>{
                        if(key==="coupon_state"){
                            this.getDataByPost(3,shop_homeurl+"/shopCouponContrllor/v1.0/updateShopCoupon"
                                ,{coupon_id:this.state.shopCouponBanners[rowID].coupon_id,
                                    coupon_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getShopCoupons()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Coupon;