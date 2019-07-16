/**
 * Created by sjb on 18/8/29.
 * 可结算订单
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="order_settlement";
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
                {name:"未结算",value:'0'},
                {name:"已结算",value:'1'}],

            order_arr:[],
            settlementBean:{},
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            member_id:this.getNull(this.getSessionStorage(type+"member_id"),""),
            commission_merchants_name:this.getNull(this.getSessionStorage(type+"commission_merchants_name"),""),
            start_time:this.getNull(this.getSessionStorage(type+"start_time"),""),
            end_time:this.getNull(this.getSessionStorage(type+"end_time"),""),
            order_merchants_no:this.getNull(this.getSessionStorage(type+"order_merchants_no"),""),
        };
    }
    componentDidMount() {
        this.getCommissionOrders();
    }


    getCommissionOrders(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"member_id",this.state.member_id);
        this.setSessionStorage(type+"order_merchants_no",this.state.order_merchants_no);
        this.setSessionStorage(type+"commission_merchants_name",this.state.commission_merchants_name);
        this.setSessionStorage(type+"start_time",this.state.start_time);
        this.setSessionStorage(type+"end_time",this.state.end_time);

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getCommissionOrders",
            {page:this.state.page,
                commission_merchants_id:this.state.merchants_id
                ,order_state:"close"
                ,member_id:this.state.member_id
                ,order_merchants_no:this.state.order_merchants_no,
                commission_merchants_name:this.state.commission_merchants_name,
                start_time:this.state.start_time,
                end_time:this.state.end_time,
                is_commission:this.state.is_commission,
            })

        this.getDataByPost(4,shop_homeurl+"/orderController/v1.0/getCommissionPrices",
            {page:this.state.page,
                commission_merchants_id:this.state.merchants_id
                ,order_state:"close"
                ,member_id:this.state.member_id
                ,order_merchants_no:this.state.order_merchants_no,
                commission_merchants_name:this.state.commission_merchants_name,
                start_time:this.state.start_time,
                end_time:this.state.end_time,
                is_commission:this.state.is_commission})
    }



    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderMerchantsBeans:data,
                    total:total,
                    order_arr:[]
                });
                break;
            case 3:
                this.showTip("结算成功");
                this.setState({
                    page:1
                },()=>{
                    this.getCommissionOrders();
                })
                break;
            case 4:
                this.setState({
                    settlementBean:data
                })
                break;
        }
    }



    render(){


        return(
            <div>
                <Widget.Toolbar title={"佣金"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="结算状态"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.stateBeans}
                        value={this.state.is_commission}
                        onChange={(index)=>{
                            this.setState({
                                is_commission:this.state.stateBeans[index].value
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
                        value={this.state.commission_merchants_name}
                        onChange={(value)=>{
                            this.setState({
                                commission_merchants_name:value
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
                            this.getCommissionOrders()
                        }}/>
                    <Widget.Button
                        style={{display:this.state.merchants_id===""?"flex":"none",marginLeft:20}}
                        value="结算"
                        onClick={()=>{
                            if(this.state.order_arr.length<=0) {
                                this.showTip("请先选择订单");
                                return;
                            }

                            this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/commissionOrder",{order_id:this.state.order_arr.toString()});
                        }}/>
                </Widget.View>
                <Widget.View background="#ffffff">
                    <Widget.Text
                        style={{display:"flex",marginLeft:20}}
                        title="总结算金额"
                        value={this.state.settlementBean.settlement_price}/>
                    <Widget.Text
                        style={{display:"flex",marginLeft:20}}
                        title="总佣金金额"
                        value={this.state.settlementBean.commission_price}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'-2'},
                        {name:"ID",flex:1,key:'order_merchants_id'},
                        {name:"订单号",flex:1,key:'order_merchants_no'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"所属商家",flex:1,key:'commission_merchants_name'},
                        {name:"实际支付价",flex:1,key:'order_actual_price'},
                        {name:"结算金额",flex:1,key:'settlement_price'},
                        {name:"佣金金额",flex:1,key:'commission_price'},
                        {name:"结算状态",flex:1,key:"is_commission_show"},
                        {name:"完成时间",flex:1,key:'close_time'},
                        {name:"结算时间",flex:1,key:'commission_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderMerchantsBeans}
                    operationData={[{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_merchants_editor/"+this.state.orderMerchantsBeans[rowID].order_id+"/"+this.state.orderMerchantsBeans[rowID].order_merchants_id);
                                break;

                        }
                    }}
                    checkArr={this.state.order_arr}
                    checkKey="order_merchants_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.order_arr.push(key);
                        }else{
                            this.removeArray(this.state.order_arr,key)
                        }
                        this.refresh();
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getCommissionOrders()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderMerchants;


