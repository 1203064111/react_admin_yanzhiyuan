/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class CustomizedOrder extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderMerchantsBeans:[],
            order_state:"",
            page:1,
            total:0,
            stateBeans:[{name:"全部",value:''},
                {name:"已预约",value:'1'},
                {name:"已确认",value:'2'},
                {name:"已支付定金",value:'3'},
                {name:"已支付尾款",value:'4'},
                {name:"已完成",value:'5'},
                {name:"已取消",value:'6'},]
        };
    }
    componentDidMount() {
        this.getOrderMerchants();
    }
    getOrderMerchants(){
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getCustomizedOrders",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id
                ,order_state:this.state.order_state
                ,order_no:this.state.order_no
                ,order_type:this.state.order_type})
    }
    sendCustomizedOrder(){
        this.getDataByPost(2,maintail_homeurl+"/maintailOrderController/v1.0/sendCustomizedOrder",{order_id:this.state.order_id})
    }
    cancelCustomizedOrder(){
        this.getDataByPost(3,maintail_homeurl+"/maintailOrderController/v1.0/cancelCustomizedOrder",{order_id:this.state.order_id})
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
                this.showTip("确认订单成功");
                this.getOrderMerchants();
                break;
            case 3:
                this.showTip("取消订单成功");
                this.getOrderMerchants();
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Tip visible={this.state.visible} msg="是否确认订单?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.sendCustomizedOrder();
                            }}></Widget.Tip>
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
                    <p1 style={{fontSize:12,marginLeft:10,marginRight:20}}>
                        共
                        <p1 style={{fontSize:12,color:'RGB(252,13,28)'}}>
                            {this.state.total}
                        </p1>
                        条订单
                    </p1>
                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getOrderMerchants()
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"订单ID",flex:1,key:'order_id'},
                        {name:"下单用户",flex:1,key:'contact_name'},
                        {name:"联系电话",flex:1,key:'contact_mobile'},
                        {name:"联系地址",flex:1,key:'address_detail'},
                        {name:"订单总价",flex:1,key:"order_price"},
                        {name:"订单状态",flex:1,key:'order_state_show'},
                        {name:"下单时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderMerchantsBeans}
                    operationData={[{title:"确认订单"},{title:"详情"},{title:"取消"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    order_id:this.state.orderMerchantsBeans[rowID].order_id
                                })
                                break;
                            case 1:
                                this.props.history.push("/customizedOrder_editor/"+this.state.orderMerchantsBeans[rowID].order_id);
                                break;
                            case 2:

                                this.openTip("确认取消?",()=>{
                                    this.setState({
                                        order_id:this.state.orderMerchantsBeans[rowID].order_id
                                    },()=>{
                                        this.cancelCustomizedOrder();
                                    })
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
                            this.getOrderMerchants()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=CustomizedOrder;


