/**
 * Created by Administrator on 2018/6/27.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderRefundEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            refund_id:this.props.params.refund_id,
            orderRefundBean:[],
            orderAddressBean:[],
            orderGoodsBean:[],
            imgBeans:[]
        };
    }

    componentDidMount() {
        this.getOrderRefundDetail();
    }



    getOrderRefundDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderRefundDetail",{refund_id:this.state.refund_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                var refund_imgs=data.refund_imgs;
                var imgs=[];
                if(!this.isNull(refund_imgs)){
                    imgs=refund_imgs.split(",");
                }
                this.setState({
                    orderRefundBean:data,
                    orderAddressBean:data.orderAddressBean,
                    orderGoodsBean:data.orderGoodsBean,
                    imgBeans:imgs
                })
                break;
            case 2:
                this.showTip("操作成功");
                this.getOrderRefundDetail();
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"退款申请详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="退款申请"
                    baseData={[
                        {name:"退款ID",flex:1,key:'refund_id',type:'text'},
                        {name:"用户ID",flex:1,key:'member_id',type:'text'},
                        {name:"退货单号",flex:1,key:'refund_no',type:'text'},
                        {name:"订单ID",flex:1,key:'order_merchants_id',type:'text'},
                        {name:"订单编号",flex:1,key:'order_merchants_no',type:'text'},
                        {name:"订单商品ID",flex:1,key:'order_goods_id',type:'text'},
                        {name:"退款状态",flex:1,key:'refund_state_show',type:'text'},
                        {name:"退款类型",flex:1,key:'refund_type_show',type:'text'},
                        {name:"物流公司",flex:1,key:'logistics_name',type:'text'},
                        {name:"物流单号",flex:1,key:'logistics_no',type:'text'},
                        {name:"图片",flex:1,key:'refund_imgs',type:'imgs'},
                    ]}
                        data={this.state.orderRefundBean}
                        onChange={(key,value,index)=>{
                            this.state.orderRefundBean[key]=value;
                            this.refresh();
                        }}
                        renderButton={()=>{
                            return(
                                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                    <Widget.Button
                                        style={{display:this.state.orderRefundBean.refund_state=='wait_review'?"flex":"none",marginRight:20}}
                                        value="同意"
                                        onClick={()=>{
                                            this.openTip("确认同意?",()=>{
                                                this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/refundOrder",
                                                    {refund_id:this.state.refund_id,order_merchants_id:this.state.orderRefundBean.order_merchants_id
                                                        ,refund_state:"accept"})
                                            })
                                        }}/>
                                    <Widget.Button
                                        style={{display:this.state.orderRefundBean.refund_state=='wait_review'?"flex":"none",marginRight:20}}
                                        value="拒绝"
                                        onClick={()=>{
                                            this.openTip("确认拒绝?",()=>{
                                                this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/refundOrder",
                                                    {refund_id:this.state.refund_id,order_merchants_id:this.state.orderRefundBean.order_merchants_id
                                                        ,refund_state:"refuse"})
                                            })
                                        }}/>
                                    <Widget.Button
                                        style={{display:this.state.orderRefundBean.refund_state=='accept'?"flex":"none",marginRight:20}}
                                        value="退款"
                                        onClick={()=>{
                                            this.openTip("确认退款?",()=>{
                                                this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/refundOrder",
                                                    {refund_id:this.state.refund_id,order_merchants_id:this.state.orderRefundBean.order_merchants_id
                                                    ,refund_state:"end"})
                                            })
                                        }}/>
                                </div>
                            )
                        }}/>
                    <div style={{display:'flex',flex:1,flexDirection:"column"}}>
                        <Widget.Detail
                            width={300}
                            title="商品信息"
                            baseData={[
                                {name:"商品名称",flex:1,key:'goods_name',type:'text'},
                                {name:"规格",flex:2,key:'specification_names',type:'text'},
                                {name:"购买数量",flex:1,key:'goods_num',type:'text'},
                                {name:"零售价",flex:1,key:'specification_price',type:'text'},
                                {name:"供货价",flex:1,key:'specification_wholesale_price',type:'text'},
                                {name:"退货数量",flex:1,key:'refund_count',type:'text'},
                            ]}
                            data={this.state.orderGoodsBean}
                        />
                        <Widget.Detail
                            width={300}
                            title="图片凭证"
                            baseData={[]}
                            data={{}}>
                            <Widget.Foreach
                                count={3}
                                style={{display:'flex',cursor: "pointer",wordWrap:"break-word",wordBreak:"break-all",}}
                                dataSource={this.state.imgBeans}
                                renderRow={(index)=>{
                                    return(
                                        <img src={this.state.imgBeans[index]?this.state.imgBeans[index].indexOf("http")>=0?this.state.imgBeans[index]:imgurl+this.state.imgBeans[index]:""}
                                             style={{marginLeft:10,width:80,height:80}}
                                             onClick={()=>{
                                                 this.openSrc(this.state.imgBeans[index]?this.state.imgBeans[index].indexOf("http")>=0?this.state.imgBeans[index]:imgurl+this.state.imgBeans[index]:"");
                                             }}/>
                                    )
                                }}/>
                        </Widget.Detail>
                    </div>

                </div>




        )
    }
}



module.exports=OrderRefundEditor;

