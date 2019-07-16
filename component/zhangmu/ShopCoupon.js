/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ShopCoupon extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            shopCouponBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getShopCoupons();
    }
    getShopCoupons(){
        this.getDataByPost(1,shop_homeurl+"/shopCouponContrllor/v1.0/getShopCoupons"
            ,{page:this.state.page,coupon_type:"1"},{type:2})
    }

    deleteShopCoupon(){
        this.getDataByPost(2,shop_homeurl+"/shopCouponContrllor/v1.0/deleteShopCoupon",{coupon_id:this.state.coupon_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    shopCouponBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getShopCoupons();
                break;
            case 3:
                this.showTip("赠送成功");
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
                            this.props.history.push("/shop_coupon_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'coupon_id'},
                        {name:"优惠方式",flex:1,key:'coupon_way_show'},
                        {name:"优惠满足金额",flex:1,key:'coupon_full_price'},
                        {name:"优惠金额",flex:1,key:'coupon_price'},
                        {name:"有效期类型",flex:1,key:'time_type_show'},
                        {name:"领取开始时间",flex:2,key:'receive_start_time'},
                        {name:"领取结束时间",flex:2,key:'receive_end_time'},
                        {name:"发行类型",flex:1,key:'issue_type_show'},
                        {name:"发行量",flex:1,key:'issue_num'},
                        {name:"领取量",flex:1,key:'take_num'},
                        {name:"使用量",flex:1,key:'used_num'},
                        {name:"领取方式",flex:2,key:'display_type_show'},
                        {name:"使用范围",flex:2,key:'coupon_range_show'},
                        {name:"创建时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.shopCouponBeans}
                    operationData={[{title:"编辑"},{title:"赠送"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/shop_coupon_editor/"+this.state.shopCouponBeans[rowID].coupon_id);
                                break;
                            case 1:
                                this.openPrompt("填写赠送人手机号(逗号相隔)","",(value)=>{
                                    this.getDataByPost(3,shop_homeurl+"/shopCouponContrllor/v1.0/giveShopMemberCoupon",
                                        {coupon_id:this.state.shopCouponBeans[rowID].coupon_id,send_mobile:value})
                                },2)
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    coupon_id:this.state.shopCouponBeans[rowID].coupon_id
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
                            this.getShopCoupons()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=ShopCoupon;