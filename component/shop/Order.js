/**
 * Created by Administrator on 2018/6/27.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="order";
class Order extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderBeans:[],
            total:0,
            coupon_price:0,
            stateBeans:[{name:"全部",value:''},
                {name:"待支付",value:'wait_pay'},
                {name:"未使用",value:'wait_use'},
                {name:"退款中",value:'wait_refund'},
                {name:"退款失败",value:'fail_refund'},
                {name:"退款成功",value:'have_refunded'},
                {name:"已使用",value:'have_used'},
                {name:"已评价",value:'have_commented'},
                {name:"已取消",value:'cancel'}],

            page:this.getNull(this.getSessionStorage(type+"page"),1),
            order_state:this.getNull(this.getSessionStorage(type+"order_state"),""),
            order_no:this.getNull(this.getSessionStorage(type+"order_no"),""),
            start_time:this.getNull(this.getSessionStorage(type+"start_time"),""),
            end_time:this.getNull(this.getSessionStorage(type+"end_time"),""),
        };
    }
    componentDidMount() {
        this.getOrders();
    }
    getOrders(){

        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"order_state",this.state.order_state);
        this.setSessionStorage(type+"order_no",this.state.order_no);
        this.setSessionStorage(type+"start_time",this.state.start_time);
        this.setSessionStorage(type+"end_time",this.state.end_time);

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrders",
            {page:this.state.page,order_state:this.state.order_state,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id,
                order_no:this.state.order_no,
                start_time:this.state.start_time,
                end_time:this.state.end_time});
        this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/getOrdersTotalPrice",
            {order_state:this.state.order_state,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id,
                order_no:this.state.order_no,
                start_time:this.state.start_time,
                end_time:this.state.end_time});



    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderBeans:data,
                    total:total,

                });
                break;

            case 2:
                this.showTip("导出成功");
                window.location.href=texturl+data;
                break;
            case 3:
                this.setState({
                    coupon_price:data.coupon_price,

                });
                break;
        }
    }

    exportOrders(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/exportOrders"
            ,{order_type:this.state.order_type,
                order_state:this.state.order_state,
                order_no:this.state.order_no,
                pay_type:this.state.pay_type})
    }

    render(){


        return(
            <div>
                <Widget.Toolbar title={"医疗订单列表"} history={this.props.history}></Widget.Toolbar>
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
                                order_state:this.state.stateBeans[index].value
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
                        placeholder="订单号"
                        value={this.state.order_no}
                        onChange={(value)=>{
                            this.setState({
                                order_no:value
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
                                this.getOrders()
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="导出"
                        onClick={()=>{
                            this.exportOrders()
                        }}/>
                </Widget.View>
                <Widget.View>


                    <Widget.Text
                        titleWidth={60}
                        title={"订单总价"}
                        width={200}
                        value={this.state.coupon_price}/>
                    <Widget.Text
                        titleWidth={60}
                        title={"订单数量"}
                        width={200}
                        value={this.state.total}/>


                </Widget.View>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'order_id'},
                        {name:"用户",flex:1,key:'member_name'},
                        {name:"供应商",flex:1,key:'merchants_name'},
                        {name:"订单号",flex:1,key:'order_no'},
                        {name:"订单价格",flex:1,key:'order_price'},
                        {name:"订单状态",flex:1,key:'order_state_show'},
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"商品数量",flex:1,key:'goods_num'},
                        {name:"商品单价",flex:1,key:'goods_price'},
                        {name:"手机号",flex:1,key:'order_mobile'},
                        {name:"支付方式",flex:1,key:'pay_way_show'},
                        {name:"申请时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderBeans}
                    operationDatas={(index)=>{
                        return this.state.orderBeans[index].order_state!=="wait_refund"?[{title:"详情"}]:
                            this.state.orderBeans[index].order_state==="wait_refund"?[{title:"详情"},{title:"上线"},{title:"下线"}]:[];
                    }}

                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_editor/"+this.state.orderBeans[rowID].order_id);
                                break;
                            case 1:
                                this.getDataByPost(2,shop_homeUrl+"/orderController/v1.0/updateOrder",
                                    {order_id:this.state.orderBeans[rowID].order_id,
                                        order_state:'have_refunded'});
                                break;
                            case 2:
                                this.openPrompt("填写拒绝理由","",(value)=>{
                                    this.getDataByPost(3,shop_homeUrl+"/orderController/v1.0/updateOrder",
                                        {order_id:this.state.orderBeans[rowID].order_id,order_state:'fail_refund',refund_fail_reason:value})
                                },3)
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getOrders()
                        })
                    }}>
                </Widget.List>

            </div>
        )
    }
}

module.exports=Order;



