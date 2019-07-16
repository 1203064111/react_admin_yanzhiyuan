/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class InvoiceList extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            orderMerchantsBeans:[],
            invoice_class:"",
            page:1,
            total:0,
            stateBeans:[{name:"全部",value:''},
                {name:"纸质发票",value:'1'},
                {name:"电子发票",value:'2'},],
            invoice_stateBeans:[{name:"全部",value:''},
                {name:"待处理",value:'0'},
                {name:"已处理",value:'1'},]
        };
    }
    componentDidMount() {
        this.getOrderMerchants();
    }
    getOrderMerchants(){
        this.getDataByPost(1,maintail_homeurl+"/maintailSettingController/v1.0/getMaintailOrderInvoices",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id
                ,invoice_class:this.state.invoice_class
                ,order_no:this.state.order_no
                ,invoice_state:this.state.invoice_state})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderMerchantsBeans:data,
                    total:total
                });
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"发票列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="发票状态"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.invoice_stateBeans}
                        onChange={(index)=>{
                            this.setState({
                                invoice_state:this.state.invoice_stateBeans[index].value
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
                        条发票信息
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
                    data={[{name:"发票ID",flex:1,key:'order_invoice_id'},
                        {name:"下单用户",flex:1,key:'member_nick_name'},
                        {name:"用户账号",flex:1,key:'member_account'},
                        {name:"订单号",flex:1,key:"order_no"},
                        {name:"发票状态",flex:1,key:'invoice_state_show'},
                        {name:"申请时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.orderMerchantsBeans}
                    operationData={[{title:"详情"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/invoicelist_editor/"+this.state.orderMerchantsBeans[rowID].order_invoice_id);
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

module.exports=InvoiceList;


