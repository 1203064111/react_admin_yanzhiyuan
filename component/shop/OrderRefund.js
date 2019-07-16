/**
 * Created by Administrator on 2018/6/27.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="refund";
class OrderRefund extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderRefundBeans:[],
            total:0,
            stateBeans:[{name:"全部",value:''},
                {name:"已取消",value:'cancel'},
                {name:"待审核",value:'wait_review'},
                {name:"已接受",value:'accept'},
                {name:"已拒绝",value:'refuse'},
                {name:"退款中",value:'refund_ing'},
                {name:"退款失败",value:'refund_fail'},
                {name:"已退款",value:'end'}],

            page:this.getNull(this.getSessionStorage(type+"page"),1),
            refund_state:this.getNull(this.getSessionStorage(type+"refund_state"),""),
            order_merchants_no:this.getNull(this.getSessionStorage(type+"order_merchants_no"),""),
            refund_no:this.getNull(this.getSessionStorage(type+"refund_no"),""),
            start_time:this.getNull(this.getSessionStorage(type+"start_time"),""),
            end_time:this.getNull(this.getSessionStorage(type+"end_time"),""),
        };
    }
    componentDidMount() {
        this.getOrderRefunds();
    }
    getOrderRefunds(){

        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"refund_state",this.state.refund_state);
        this.setSessionStorage(type+"order_merchants_no",this.state.order_merchants_no);
        this.setSessionStorage(type+"refund_no",this.state.refund_no);
        this.setSessionStorage(type+"start_time",this.state.start_time);
        this.setSessionStorage(type+"end_time",this.state.end_time);

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderRefunds",
            {page:this.state.page,refund_state:this.state.refund_state,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id,
                order_merchants_no:this.state.order_merchants_no,
                refund_no:this.state.refund_no,
                start_time:this.state.start_time,
                end_time:this.state.end_time})

    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderRefundBeans:data,
                    total:total
                });
                break;

        }
    }



    render(){


        return(
            <div>
                <Widget.Toolbar title={"退款申请"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="订单状态"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.stateBeans}
                        onChange={(index)=>{
                            this.setState({
                                refund_state:this.state.stateBeans[index].value
                            })
                        }}/>
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
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="退款单号"
                        value={this.state.refund_no}
                        onChange={(value)=>{
                            this.setState({
                                refund_no:value
                            })
                        }}/>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="订单号"
                        value={this.state.order_merchants_no}
                        onChange={(value)=>{
                            this.setState({
                                order_merchants_no:value
                            })
                        }}/>
                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getOrderRefunds()
                            })
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'refund_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"退款单号",flex:1,key:'refund_no'},
                        {name:"订单号",flex:1,key:'order_merchants_no'},
                        {name:"退款类型",flex:1,key:'refund_type_show'},
                        {name:"退货数量",flex:1,key:'refund_count'},
                        {name:"商品名称",flex:1,keys:["orderGoodsBean","goods_name"]},
                        {name:"规格",flex:2,keys:["orderGoodsBean","specification_names"]},
                        {name:"购买数量",flex:1,keys:["orderGoodsBean","goods_num"]},
                        {name:"零售价",flex:1,keys:["orderGoodsBean","specification_price"]},
                        {name:"供货价",flex:1,keys:["orderGoodsBean","specification_wholesale_price"]},
                        {name:"退款金额",flex:1,key:'refund_price'},
                        {name:"退货原因",flex:1,key:'reason_name'},
                        {name:"退货理由",flex:1,key:'refund_desc'},
                        {name:"退款状态",flex:1,key:'refund_state_show'},
                        {name:"申请时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderRefundBeans}
                    operationData={[{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_refund_editor/"+this.state.orderRefundBeans[rowID].refund_id);
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getOrderRefunds()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderRefund;



