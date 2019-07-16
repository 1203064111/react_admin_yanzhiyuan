/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class OrderSheep extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orders:[],
            order_state:"",
            page:1,
            total:0,
            orderTypeBeans:[
                {name:'认养订单'},
                {name:'合养订单'},
            ],
            stateBeans:[{name:"全部",value:''},
                        {name:"待付款",value:'wait_pay'},
                        {name:"待发货",value:'wait_send'},
                        {name:"待收货",value:'wait_receive'},
                        {name:"待评价",value:'wait_assessment'},
                        {name:"已完成",value:'end'},
                        {name:"已关闭",value:'close'},
                        {name:"已取消",value:'cancel'}]
        };
    }
    componentDidMount() {
        this.getOrders();
    }
    getOrders(){
        this.getDataByPost(1,sheep_homeurl+"/sheepOrderController/v1.0/getSheepOrders",
            {page:this.state.page
                ,order_state:this.state.order_state
                ,order_no:this.state.order_no})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orders:data,
                    total:total
                });
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
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="订单号"
                        value={this.state.order_no}
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
                            this.getOrders()
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'order_id'},
                        {name:"订单号",flex:1,key:'order_no'},
                        {name:"实际支付价",flex:1,key:'order_actual_price'},
                        {name:"用户账号",flex:1,key:'member_account'},
                        {name:"订单状态",flex:1,key:"order_state_show"},
                        {name:"订单类型",flex:1,key:'order_type_show'},
                        {name:"下单时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orders}
                    operationData={[{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_detail/"+this.state.orders[rowID].order_id);
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

module.exports=OrderSheep;


