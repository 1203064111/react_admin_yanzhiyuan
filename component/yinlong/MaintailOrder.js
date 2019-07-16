/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MaintailOrder extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderMerchantsBeans:[],
            maintailOrderAddressBean:{},
            OrderStateCountBean:[],
            OrdersCount:{},
            order_state:"",
            page:1,
            total:0,
            stateBeans:[{name:"全部",value:''},
                {name:"已取消",value:'0'},
                {name:"待指派",value:'1'},
                {name:"待上门",value:'2'},
                {name:"等待确认服务",value:'3'},
                {name:"待付款",value:'4'},
                {name:"已完成",value:'5'},]
        };
    }
    componentDidMount() {
        this.getOrderMerchants();
        this.getOrderStateCount();
        this.getOrdersCount();
    }
    getOrderMerchants(){
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getMaintailOrders",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id
                ,order_state:this.state.order_state
                ,order_no:this.state.order_no})
    }

    getOrderStateCount(){
        this.getDataByPost(2,maintail_homeurl+"/maintailOrderController/v1.0/getOrderStateCount")
    }

    getOrdersCount(){
        this.getDataByPost(3,maintail_homeurl+"/maintailOrderController/v1.0/getOrdersCount")
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderMerchantsBeans:data,
                    maintailOrderAddressBean:data.maintailOrderAddressBean,
                    total:total
                });
                break;
            case 2:
                this.setState({
                    OrderStateCountBean:data,
                });
                break;
            case 3:
                this.setState({
                    OrdersCount:data,
                });
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"订单列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <div className="button" style={{width:80,height:25,background:"#E6E6FA"}}
                         onClick={()=>{
                             this.setState({
                                     order_state:''
                                 },()=>{
                                     this.getOrderMerchants()
                                 }

                             )
                         }}>
                        <p1 className="p" style={this.props.p_style}><font color="#8B8B7A">全部</font>&nbsp;( &nbsp;
                            <font color="red">{this.state.OrdersCount.is_delete}</font>&nbsp;
                            {')'}
                        </p1>
                    </div>

                    <Widget.Foreach
                        style={{display:'flex',flexDirection:'row',overflow:'auto',weight:'122022'}}
                        dataSource={this.state.OrderStateCountBean}
                        renderRow={(rowID)=>{
                            return(
                                <div>
                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:12}}>
                                        <div className="button" style={{width:80,height:25,background:"#E6E6FA"}}
                                             onClick={()=>{
                                                 this.setState({
                                                         order_state:this.state.OrderStateCountBean[rowID].order_state
                                                     },()=>{
                                                         this.getOrderMerchants()
                                                     }

                                                 )
                                             }}>
                                            <p1 className="p" style={this.props.p_style}>
                                                <font color="#8B8B7A">{this.state.OrderStateCountBean[rowID].order_state_show}</font>&nbsp;{'('} &nbsp;
                                               <font color="red">{this.state.OrderStateCountBean[rowID].order_price}</font>&nbsp;
                                                {')'}</p1>
                                        </div>
                                    </div>

                                </div>
                            )
                        }}/>
                </Widget.View>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getOrderMerchants()
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/maintail_add_order/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"订单ID",flex:1,key:'order_id'},
                        {name:"下单用户",flex:1,key:'address_name'},
                        {name:"联系电话",flex:1,key:'address_mobile'},
                        {name:"维修地址",flex:1,key:'address_detailed'},
                        {name:"报修问题描述",flex:1,key:"maintail_remark"},
                        {name:"师傅接单状态",flex:1,key:'accept_state_show'},
                        {name:"下单时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderMerchantsBeans}
                    operationData={[{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/m_ordermerchants_editor/"+this.state.orderMerchantsBeans[rowID].order_id);
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

module.exports=MaintailOrder;


