/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="order";
class OrderMerchants extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.getNull(systemAccountBean.merchants_id,""),
            orderMerchantsBeans:[],

            total:0,
            stateBeans:[{name:"全部",value:''},
                        {name:"待付款",value:'wait_pay'},
                        {name:"待发货",value:'wait_send'},
                        {name:"待收货",value:'wait_receive'},
                        {name:"待评价",value:'wait_assessment'},
                        {name:"已完成",value:'end'},
                        {name:"已全部退款",value:'refund'},
                        {name:"已取消发货",value:'pay_cancel'},
                        {name:"已结算",value:'close'},
                        {name:"已取消",value:'cancel'}],

            page:this.getNull(this.getSessionStorage(type+"page"),1),
            order_state:this.getNull(this.getSessionStorage(type+"order_state"),""),
            member_id:this.getNull(this.getSessionStorage(type+"member_id"),""),
            merchants_name:this.getNull(this.getSessionStorage(type+"merchants_name"),""),
            start_time:this.getNull(this.getSessionStorage(type+"start_time"),""),
            end_time:this.getNull(this.getSessionStorage(type+"end_time"),""),
            order_merchants_no:this.getNull(this.getSessionStorage(type+"order_merchants_no"),""),
        };
    }
    componentDidMount() {
        this.getOrderMerchants();
    }
    getOrderMerchants(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"order_state",this.state.order_state);
        this.setSessionStorage(type+"member_id",this.state.member_id);
        this.setSessionStorage(type+"order_merchants_no",this.state.order_merchants_no);
        this.setSessionStorage(type+"merchants_name",this.state.merchants_name);
        this.setSessionStorage(type+"start_time",this.state.start_time);
        this.setSessionStorage(type+"end_time",this.state.end_time);

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderMerchants",
            {page:this.state.page,
                merchants_id:this.state.merchants_id
                ,order_state:this.state.order_state
                ,member_id:this.state.member_id
                ,order_merchants_no:this.state.order_merchants_no,
                merchants_name:this.state.merchants_name,
                start_time:this.state.start_time,
                end_time:this.state.end_time})
    }

    exportOrders(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/exportOrders"
            ,{merchants_id:this.state.merchants_id
                ,order_state:this.state.order_state
                ,member_id:this.state.member_id
                ,order_merchants_no:this.state.order_merchants_no,
                merchants_name:this.state.merchants_name,
                start_time:this.state.start_time,
                end_time:this.state.end_time})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderMerchantsBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("导出成功");
                window.location.href=imgurl+data;
                break;

        }
    }



    render(){


        return(
            <div>
                <Widget.Toolbar title={"订单列表"} history={this.props.history}></Widget.Toolbar>
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
                        value={this.state.order_merchants_no}
                        onChange={(value)=>{
                            this.setState({
                                order_merchants_no:value
                            })
                    }}/>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="商家名称"
                        value={this.state.merchants_name}
                        onChange={(value)=>{
                            this.setState({
                                merchants_name:value
                            })
                        }}/>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="用户ID"
                        value={this.state.member_id}
                        onChange={(value)=>{
                            this.setState({
                                member_id:value
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
                                this.getOrderMerchants()
                            })
                            this.getOrderMerchants()
                            this.setState({
                                page:1
                            },()=>{
                                this.getOrderMerchants()
                            })

                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="导出"
                        onClick={()=>{
                            this.exportOrders()
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'order_merchants_id'},
                        {name:"订单号",flex:1,key:'order_merchants_no'},
                        {name:"商家名称",flex:1,key:'merchants_name'},
                        {name:"订单总价",flex:1,key:'order_total_price'},
                        {name:"实际支付价",flex:1,key:'order_actual_price'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"订单状态",flex:1,key:"order_state_show"},
                        {name:"订单类型",flex:1,key:'order_type_show'},
                        {name:"备注",flex:1,key:'order_remark'},
                        {name:"下单时间",flex:1,key:'create_time'},
                        {name:"商品名称/品牌/规格/数量/零售价/供货价",flex:5,key:'goods',type:'widget'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderMerchantsBeans}
                    operationData={[{title:"详情"}]}
                    renderWidget={(key,i)=>{
                        return(
                            <Widget.List
                                is_header="0"
                                data={[
                                    {name:"商品名称",flex:2,key:'goods_name'},
                                    {name:"品牌",flex:2,key:'brand_name'},
                                    {name:"规格",flex:2,key:'specification_names'},
                                    {name:"数量",flex:1,key:'goods_num'},
                                    {name:"零售价",flex:1,key:'specification_price'},
                                    {name:"供货价",flex:1,key:'specification_wholesale_price'}]}
                                dataSource={this.state.orderMerchantsBeans[i].orderGoodsBeans}>
                            </Widget.List>
                        )
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_merchants_editor/"+this.state.orderMerchantsBeans[rowID].order_id+"/"+this.state.orderMerchantsBeans[rowID].order_merchants_id);
                                break;

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getOrderMerchants()
                        })
                    }}>
                </Widget.List>
        </div>
        )
    }
}

module.exports=OrderMerchants;


