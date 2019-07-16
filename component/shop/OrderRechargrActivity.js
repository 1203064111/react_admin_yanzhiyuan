/**
 * Created by hwq on 2018/8/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class OrderRechargrActivity extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderRechargeActivityBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getOrderRechargeActivitys();
    }
    getOrderRechargeActivitys(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderRechargeActivitys"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderRechargeActivityBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getOrderRechargeActivitys();
                break;


        }
    }

    deleteOrderRechargeActivity(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/deleteOrderRechargeActivity"
            ,{activity_id:this.state.activity_id})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"充值活动列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/order_recharge_activity_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'activity_id'},
                        {name:"满足金额",flex:1,key:'activity_need_price'},
                        {name:"赠送金额",flex:1,key:'activity_give_price'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.orderRechargeActivityBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/order_recharge_activity_editor/"+this.state.orderRechargeActivityBeans[rowID].activity_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        activity_id:this.state.orderRechargeActivityBeans[rowID].activity_id
                                    },()=>{
                                        this.deleteOrderRechargeActivity();
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
                            this.getOrderRechargeActivitys()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderRechargrActivity;

