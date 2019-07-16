/**
 * Created by Administrator on 2018/6/29.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class OrderRefundReason extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderRefundReasonBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getOrderRefundReasonBeans();
    }
    getOrderRefundReasonBeans(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderRefundReasonBeans"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderRefundReasonBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getOrderRefundReasonBeans();
                break;
            case 3:
                this.getOrderRefundReasonBeans();
                break;

        }
    }

    deleteOrderRefundReasonBean(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/deleteOrderRefundReasonBean"
            ,{refund_reason_id:this.state.refund_reason_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"退款原因列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/order_refund_reason_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'refund_reason_id'},
                        {name:"退款原因",flex:1,key:'reason_name'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.orderRefundReasonBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_refund_reason_editor/"+this.state.orderRefundReasonBeans[rowID].refund_reason_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        refund_reason_id:this.state.orderRefundReasonBeans[rowID].refund_reason_id
                                    },()=>{
                                        this.deleteOrderRefundReasonBean();
                                    })
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/moveOrderRefundReasonBean"
                                ,{refund_reason_id:this.state.orderRefundReasonBeans[rowID].refund_reason_id
                                    ,sort:this.state.orderRefundReasonBeans[rowID].sort,
                                    sort_type:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getOrderRefundReasonBeans()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderRefundReason;

