/**
 * Created by hwq on 2018/6/29.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class OrderRefundReasonEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            refund_reason_id:this.props.params.refund_reason_id,
            orderRefundReasonBean:[],
        };
    }

    componentDidMount() {

        this.getOrderRefundReasonBeanDetail();

    }


    getOrderRefundReasonBeanDetail(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderRefundReasonBeanDetail",{refund_reason_id:this.state.refund_reason_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    orderRefundReasonBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;

        }
    }

    insertOrderRefundReasonBean(){

        var params={};
        params["reason_name"]=this.state.orderRefundReasonBean.reason_name;

        params["sort"]=this.state.orderRefundReasonBean.sort;



        if(this.state.refund_reason_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/insertOrderRefundReasonBean",params)
        }else{
            params["refund_reason_id"]=this.state.refund_reason_id;
            this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/updateOrderRefundReasonBean",params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"退款原因"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.refund_reason_id==="-1"){
            baseData=[{name:"退款原因",flex:1,key:'reason_name'},
                ];
        }else{
            baseData=[{name:"ID",flex:1,key:'refund_reason_id',type:'text'},
                {name:"退款原因",flex:1,key:'reason_name'},
                {name:"创建时间",flex:1,key:'create_time',type:'text'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.orderRefundReasonBean}


                    onChange={(key,value)=>{
                        this.state.orderRefundReasonBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertOrderRefundReasonBean();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=OrderRefundReasonEditor;