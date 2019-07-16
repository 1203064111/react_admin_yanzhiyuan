/**
 * Created by sjb on 18/7/9.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'

var Widget=require('./../widget/widget');

var PieEcharts=require('./echarts/PieEcharts');

class Welcome extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(this.getStorage("systemAccountBean"));
        var date = new Date()
        this.state = {
            systemAccountBean:systemAccountBean,
            coulorBeans:[{color1:'RGB(207,233,209)',color2:'RGB(235,246,236)',color3:'RGB(19,125,192)'},
                {color1:'RGB(222,237,246)',color2:'RGB(244,249,252)',color3:'RGB(19,125,192)'},
                {color1:'RGB(255,234,224)',color2:'RGB(255,248,245)',color3:'RGB(19,125,192)'}],
            orderBean:{},
            memberBean:{},
            memberBuyBean:{},
            refundBean:{},
            refundBean2:{},
            carBean:{},
            couponBean:{},
            couponBean2:{},
            merchantsBean:{},
            goodsBean:{},
            sceneBean:{},
            start_time:this.getNowFormatDate()+" 00:00:01",
            end_time:this.getNowFormatDate()+" 23:59:59",
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        this.getMemberStatistics();
        this.getTotalOrderPrice();
        this.getMemberBuyStatistics();
        this.getRefundStatistics();
        this.getRefundStatisticsV2();
        this.getShopCarStatistics();
        this.getCouponStatistics();
        this.getCouponStatisticsV2();
        this.getMerchantsStatistics();
        this.getGoodsStatistics();
        this.getSceneStatistics();
    }

    getSceneStatistics(){
        this.getDataByPost(11,koubei_homeurl+"/sceneController/v1.0/getSceneStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
            end_time:this.state.end_time});
    }
    getGoodsStatistics(){
        this.getDataByPost(10,shop_homeurl+"/goodsController/v1.0/getGoodsStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    getMerchantsStatistics(){
        this.getDataByPost(9,shop_homeurl+"/merchantsController/v1.0/getMerchantsStatistics",
            {start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    getCouponStatistics(){
        this.getDataByPost(7,shop_homeurl+"/shopCouponContrllor/v1.0/getCouponStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    getCouponStatisticsV2(){
        this.getDataByPost(8,shop_homeurl+"/shopCouponContrllor/v1.0/getCouponStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
            member_coupon_state:'1',
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    getShopCarStatistics(){
        this.getDataByPost(6,shop_homeurl+"/orderController/v1.0/getShopCarStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    getTotalOrderPrice(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/getTotalOrderPrice",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    getMemberStatistics(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getMemberStatistics",
            {fill_invitation_code:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }

    getMemberBuyStatistics(){
        this.getDataByPost(3,member_homeurl+"/memberController/v1.0/getMemberBuyStatistics",
            {fill_invitation_code:this.state.systemAccountBean.merchants_id,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }

    getRefundStatistics(){
        this.getDataByPost(4,shop_homeurl+"/orderController/v1.0/getRefundStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
            refund_type:'1',
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }

    getRefundStatisticsV2(){
        this.getDataByPost(5,shop_homeurl+"/orderController/v1.0/getRefundStatistics",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                refund_type:'2',
                start_time:this.state.start_time,
                end_time:this.state.end_time});
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    memberBean:data
                })
                break;
            case 2:
                this.setState({
                    orderBean:data
                })
                break;
            case 3:
                this.setState({
                    memberBuyBean:data
                })
                break;
            case 4:
                this.setState({
                    refundBean:data
                })
                break;
            case 5:
                this.setState({
                    refundBean2:data
                })
                break;
            case 6:
                this.setState({
                    carBean:data
                })
                break;
            case 7:
                this.setState({
                    couponBean:data
                })
                break;
            case 8:
                this.setState({
                    couponBean2:data
                })
                break;
            case 9:
                this.setState({
                    merchantsBean:data
                })
                break;
            case 10:
                this.setState({
                    goodsBean:data
                })
                break;
            case 11:
                this.setState({
                    sceneBean:data
                })
                break;
        }
    }
    render() {
        return (
            <div>
                <Widget.Toolbar title="统计" history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Date
                        title="开始时间"
                        title_style={{width:60}}
                        title_p_style={{display:"none"}}
                        date_style={{width:150}}
                        type={"datetime"}
                        value={this.state.start_time}
                        onChange={(value)=>{
                            this.state.start_time=value;
                            this.refresh();
                        }}/>
                    <Widget.Date
                        title="结束时间"
                        title_style={{width:60}}
                        title_p_style={{display:"none"}}
                        date_style={{width:150}}
                        type={"datetime"}
                        value={this.state.end_time}
                        onChange={(value)=>{
                            this.state.end_time=value;
                            this.refresh();
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getData();
                        }}/>
                </Widget.View>
                <div style={{display:'flex',marginTop:20}}>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>销售额</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.orderBean.order_actual_price}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[1].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[1].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>订单量</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[1].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[1].color3,fontSize:15,fontWeight:"bold"}}>{this.state.orderBean.order_count}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>客单价</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.orderBean.order_average_price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',marginTop:20}}>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>新增粉丝</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>{this.state.memberBean.member_count}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[1].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[1].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>新增购买用户</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[1].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[1].color3,fontSize:15,fontWeight:"bold"}}>{this.state.memberBuyBean.member_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',marginTop:20}}>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>订单转化率</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>{this.toFixed(this.state.orderBean.order_count/this.state.memberBean.member_count,2)}%</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>毛利率</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>{this.state.orderBean.rate_price}%</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:this.isNull(this.state.systemAccountBean.merchants_id)?'flex':"none",marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[1].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[1].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>平台收益</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[1].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[1].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.orderBean.profit_price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',marginTop:20}}>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>退款金额</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.refundBean.refund_price}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>退款订单数</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>{this.state.refundBean.refund_count}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>换货订单数</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>{this.state.refundBean2.refund_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',marginTop:20}}>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>购物车金额</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.carBean.specification_price}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:this.isNull(this.state.systemAccountBean.merchants_id)?'flex':"none",marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>新增商家数</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.merchantsBean.merchants_count}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>新增商品数</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.goodsBean.goods_count}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>新增场景数</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.sceneBean.scene_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:this.isNull(this.state.systemAccountBean.merchants_id)?'flex':"none",marginTop:20}}>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>领取的优惠券金额</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.couponBean.coupon_price}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>领取的优惠券数量</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>{this.state.couponBean.coupon_count}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[2].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[2].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>使用的优惠券金额</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[2].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[2].color3,fontSize:15,fontWeight:"bold"}}>¥{this.state.couponBean2.coupon_price}</p>
                            </div>
                        </div>
                    </div>
                    <div style={{display:'flex',marginLeft:10,justifyContent:'center',alignItems:"center"}}>
                        <div style={{width:150,height:80,borderStyle:'solid',
                            borderWidth:1,borderColor:this.state.coulorBeans[0].color1,borderRadius:5}}>
                            <div style={{background:this.state.coulorBeans[0].color1,height:30,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <p1 style={{color:'#000000',fontSize:16,fontWeight:"bold"}}>使用的优惠券数量</p1>
                            </div>
                            <div style={{background:this.state.coulorBeans[0].color2,height:50,display:'flex',
                                alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <p style={{color:this.state.coulorBeans[0].color3,fontSize:15,fontWeight:"bold"}}>{this.state.couponBean2.coupon_count}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
module.exports=Welcome;