/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class InvoiceListEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            order_invoice_id:this.props.params.order_invoice_id,
            order_state:"",
            orderMerchantsBean:{},
            page:1,
            total:0,

        };
    }

    componentDidMount() {
        this.getOrderMerchantsDetail();


    }

    updateCustomizedOrderDetail(){
        var params={};
        params["courier_company"]=this.state.orderMerchantsBean.courier_company;
        params["courier_number"]=this.state.orderMerchantsBean.courier_number;

        params["order_invoice_id"]=this.state.order_invoice_id;
        this.getDataByPost(2,maintail_homeurl+"/maintailSettingController/v1.0/updateMaintailOrderInvoiceDetail",params)
    }


    getOrderMerchantsDetail(){
        this.getDataByPost(1,maintail_homeurl+"/maintailSettingController/v1.0/getMaintailOrderInvoiceDetail",{order_invoice_id:this.state.order_invoice_id})
    }

    doSuccess(index,data,total){
        switch(index){
            case 1:
                this.setState({
                    orderMerchantsBean:data,
                    order_state:data.order_state,
                    invoice_class:data.invoice_class,
                })
                break;
            case 2:
                this.showTip("保存成功");
                this.getOrderMerchantsDetail();
                break;
            case 3:
                this.setState({
                    orderMerchantsBean:data,
                })
                break;
            case 4:
                this.getOrderMerchantsDetail()
                break;
        }
    }




    render(){
        return(
            <div>
                <Widget.Toolbar title={"发票详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:"flex",flexDirection:'column'}}>
                <Widget.Detail
                    title="发票信息"
                    baseData={[
                        {name:"订单号",flex:1,key:'order_no',type:'text'},
                        {name:"订单价格",flex:1,key:'order_price',type:'text'},
                        {name:"用户名",flex:1,key:'member_nick_name',type:'text'},
                        {name:"用户账号",flex:1,key:'member_account',type:'text'},
                        {name:"发票类型",flex:1,key:'invoice_type_show',type:'text'},
                        {name:"抬头内容",flex:1,key:'invoice_name',type:'text'},
                        {name:"税号",flex:1,key:'invoice_no',type:'text'},
                        {name:"开户银行",flex:1,key:'invoice_bank_name',type:'text'},
                        {name:"银行账号",flex:1,key:'invoice_bank_no',type:'text'},
                        {name:"邮箱",flex:1,key:'invoice_email',type:'text'},
                        {name:"公司名称",flex:1,key:'invoice_company_name',type:'text'},
                        {name:"企业地址",flex:1,key:'invoice_company_address',type:'text'},
                        {name:"申请时间",flex:1,key:'create_time',type:'text'},
                    ]}
                    data={this.state.orderMerchantsBean}
                    onChange={(key,value)=>{
                        this.state.orderMerchantsBean[key]=value;
                        this.refresh();
                    }}/>
                {this.renderSend()}
            </div>
        )
    }

    renderSend(){
        return(
            <div style={{display:this.state.invoice_class === "1"?"flex":"none",flexDirection:'column'}}>
                <Widget.Detail
                    title="快递信息"
                    baseData={[{name:"快递公司",flex:1,key:'courier_company'},
                        {name:"快递单号",flex:1,key:'courier_number'},
                    ]}
                    data={this.state.orderMerchantsBean}/>
                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:this.state.invoice_class === "1"?"flex":"none",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.updateCustomizedOrderDetail();
                        }}/>
                </div>
            </div>


        )
    }

}



module.exports=InvoiceListEditor;
