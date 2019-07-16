/**
 * Created by Administrator on 2018/6/27.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_id:this.props.params.order_id,
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderBean:[],
            order_remark:'',
            new_remark:''
        };
    }

    componentDidMount() {
        this.getOrderDetail();

    }



    getOrderDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderDetail",{order_id:this.state.order_id})
    }
    updateOrderDetail(){
        if(this.isNull(this.state.new_remark)){
            this.showTip("请先添加备注");
            return;
        }
        var today = new Date();
        var todayString = today.getFullYear() + "/" + (today.getMonth()+1)+ "/" + today.getDate();
        var account = this.state.systemAccountBean.system_name;
        var remarkReplace ="";
        if(this.isNull(this.state.order_remark)){
            remarkReplace = today.toLocaleDateString()+"    "+account+"    "+this.state.new_remark;
        }else{
            remarkReplace = this.state.order_remark.toString()+","+todayString+"    "+account+"    "+this.state.new_remark;
        }
        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/updateOrder",{order_id:this.state.order_id,order_remark:remarkReplace})
    }


    doSuccess(index,data){
        switch(index){
            case 1:
                var remark=data.order_remark;
                var remarks=[];
                remarks=remark.split(",");
                this.setState({
                    orderBean:data,
                    remarkBeans:remarks,
                    order_remark:data.order_remark,
                })
                break;
            case 2:
                this.showTip("操作成功");
                this.getOrderDetail();
                break;
            case 3:
                this.showTip("操作成功");
                this.getOrderDetail();
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"订单详情"} history={this.props.history}></Widget.Toolbar>


                {this.renderDetail()}
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:100}}
                        input_style={{width:600}}
                        title_style={{display:'none'}}
                        placeholder="备注"
                        value={this.state.new_remark}
                        onChange={(value)=>{
                            this.setState({
                                new_remark:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="保存"
                        onClick={()=>{
                            this.updateOrderDetail()
                        }}/>

                </Widget.View>
            </div>
        )
    }

    renderDetail(){
        let baseData = [{name:"订单ID",flex:1,key:'order_id',type:'text'},
            {name:"订单号",flex:1,key:'order_no',type:'text'},
            {name:"订单价格",flex:1,key:'order_price',type:'text'},
            {name:"优惠劵抵扣",flex:1,key:'coupon_price',type:'text'},
            {name:"实际支付价格",flex:1,key:'order_actual_price',type:'text'},
            {name:"手机号",flex:1,key:'order_mobile',type:'text'},
            {name:"用户ID",flex:1,key:'member_id',type:'text'},
            {name:"供应商ID",flex:1,key:'merchants_id',type:'text'},
            {name:"供应商",flex:1,key:'merchants_name',type:'text'},
            {name:"商品ID",flex:1,key:'goods_id',type:'text'},
            {name:"商品名称",flex:1,key:'goods_name',type:'text'},
            {name:"商品单价",flex:1,key:'goods_price',type:'text'},
            {name:"商品数量",flex:1,key:'goods_num',type:'text'},
            {name:"商品图片",flex:1,key:'goods_img',type:'imgs'},
            {name:"支付方式",flex:1,key:'pay_way',type:'text'},

            {name:"订单状态",flex:1,key:'order_state_show',type:'text'},]
        if(this.state.orderBean.order_state+""==="fail_refund"){
            baseData=baseData.concat([
                {name:"退款失败原因",flex:1,key:'refund_fail_reason',type:'text'},
            ]);
        }
        else if(this.state.orderBean.order_state+""==="wait_refund"){
            baseData=baseData.concat([
                {name:"退款原因",flex:1,key:'refund_reason',type:'text'},
            ]);
        }

        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="订单详情"
                    baseData={
                        baseData
                    }
                        data={this.state.orderBean}
                        onChange={(key,value,index)=>{
                            this.state.orderBean[key]=value;
                            this.refresh();
                        }}
                        renderButton={()=>{
                            return(
                                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                    <Widget.Button
                                        style={{display:this.state.orderBean.order_state=='wait_use'?"flex":"none",marginRight:20}}
                                        value="已使用"
                                        onClick={()=>{
                                            this.openTip("确认用户已经使用?",()=>{
                                                this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/updateOrder",
                                                    {order_id:this.state.order_id
                                                        ,order_state:"have_used"})
                                            })
                                        }}/>
                                    <Widget.Button
                                        style={{display:this.state.orderBean.order_state=='wait_refund'?"flex":"none",marginRight:20}}
                                        value="拒绝退款"
                                        onClick={()=>{

                                            this.openPrompt("填写拒绝理由","",(value)=>{
                                                this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/updateOrder",
                                                    {order_id:this.state.order_id,order_state:"fail_refund",refund_fail_reason:value})
                                            },"")
                                        }}/>
                                    <Widget.Button
                                        style={{display:this.state.orderBean.order_state=='wait_refund'?"flex":"none",marginRight:20}}
                                        value="同意退款"
                                        onClick={()=>{
                                            this.openTip("确认同意退款?",()=> {
                                                this.getDataByPost(2, shop_homeurl + "/orderController/v1.0/updateOrder",
                                                    {
                                                        order_id: this.state.order_id
                                                        , order_state: "have_refunded"
                                                    })
                                            })
                                        }}
                                        />
                                </div>
                            )
                        }}
                />
                <Widget.Detail
                    title="备注"
                    baseData={[]}
                    data={{}}>
                <Widget.Foreach
                    style={{display:'flex',overflow:'auto',flexDirection:'column',marginLeft:100}}
                    dataSource={this.state.remarkBeans}
                    renderRow={(rowID)=>{
                        return(
                            <div style={{display:'flex'}}>
                                <Widget.Text
                                    titleWidth={60}
                                    title={"备注"+(rowID+1)}
                                    width={600}
                                    value={this.state.remarkBeans[rowID]}/>
                            </div>
                        )
                    }}/>
                </Widget.Detail>


                </div>




        )
    }
}



module.exports=OrderEditor;

