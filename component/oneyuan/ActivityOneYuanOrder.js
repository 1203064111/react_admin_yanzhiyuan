/**
 * Created by liyong on 2018/7/26.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ActivityOneYuanOrder extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            goods_id:this.props.params.goods_id,
            activity_id:this.props.params.activity_id,
            ZMAyOrderBean:[],
            ZMAyOrderBean2:[],
            ZMActivityGoodsBean:[],
            order_state:"",
            is_win:"",
            page:1,
            total:0,
            order_arr:[],
            stateBeans:[{name:"全部",value:''},
                {name:"待付款",value:'wait_pay'},
                {name:"待发货",value:'wait_send'},
                {name:"待收货",value:'wait_receive'},
                {name:"待评价",value:'wait_assessment'},
                {name:"已完成",value:'end'},
                {name:"已全部退款",value:'refund'},
                {name:"已结算",value:'close'},
                {name:"已取消",value:'cancel'}]

        };
    }
    componentDidMount() {
        this.getActivityGoodsDetail();
        this.getActivityGoodsOrder();
        this.getActivityGoodsWinners();
    }
    getActivityGoodsOrder(){
        this.getDataByPost(1,sheep_homeurl+"/activityController/v1.0/getActivityGoodsOrder",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.system_type==="1"?"":this.state.systemAccountBean.merchants_id
                ,order_state:"end"
                ,order_no:this.state.order_no
                ,goods_id:this.state.goods_id
                ,activity_id:this.state.activity_id
                ,is_win:"0"
            })
    }

    updateActivityWinMember(){
        this.getDataByPost(2,sheep_homeurl+"/activityController/v1.0/updateActivityWinMember",
            {order_ids:this.state.order_arr.toString(),activity_id:this.state.activity_id,goods_id:this.state.goods_id})
    }

    getActivityGoodsDetail(){
        this.getDataByPost(3,sheep_homeurl+"/activityController/v1.0/getActivityGoodsDetail",
            {goods_id:this.state.goods_id})
    }

    getActivityGoodsWinners(){
        this.getDataByPost(4,sheep_homeurl+"/activityController/v1.0/getActivityGoodsWinners",
            {goods_id:this.state.goods_id,activity_id:this.state.activity_id},{type:2})
    }



    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    ZMAyOrderBean:data,
                    total:total
                });
                break;

            case 2:
                this.showTip("选择成功");
                this.setState({
                    order_arr:[]
                })
                console.log("====")
                this.getActivityGoodsOrder();
                this.getActivityGoodsWinners();
                break;

            case 3:
                this.setState({
                    ZMActivityGoodsBean:data,
                });
                break;

            case 4:
                this.setState({
                    ZMAyOrderBean2:data.data,
                    total2:data.total
                });
                break;
        }
    }


    render(){

        return(
            <div>
                <Widget.Toolbar title={"商品列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="已中奖者"
                        />
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'order_id'},
                        {name:"订单号",flex:1,key:'order_no'},
                        {name:"订单价格",flex:1,key:'order_price'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"订单状态",flex:1,key:"order_state"},
                        {name:"邮费订单状态",flex:1,key:"fright_order_state"},
                        {name:"下单时间",flex:1,key:'create_time'},
                        {name:"中奖",flex:1,key:"is_win"},
                        {name:"操作",flex:1,key:'-1'}
                        ]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/activity_one_yuan_order_Detail/"+this.state.ZMAyOrderBean2[rowID].order_id);
                                break;

                        }
                    }}
                    operationData={[{title:"详情"}]}
                    dataSource={this.state.ZMAyOrderBean2}
                    page={this.state.page}
                    total={this.state.total2}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getActivityGoodsWinners()
                        })
                    }}>
                </Widget.List>

                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getActivityGoodsOrder()
                        }}/>
                </Widget.View>
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
                </Widget.View>

                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="添加中奖者"
                        onClick={()=>{
                      if(this.state.order_arr.length>Number(this.state.ZMActivityGoodsBean.activity_people_win)){
                          console.log("走了")
                          this.showTip("选择中奖人数大于规定人数")
                          return;
                      }
                      this.updateActivityWinMember()
                    }
                        }/>
                </Widget.View>

                <Widget.List
                    data={[{name:"选框",flex:1,key:'-2'},
                        {name:"ID",flex:1,key:'order_id'},
                        {name:"订单号",flex:1,key:'order_no'},
                        {name:"订单价格",flex:1,key:'order_price'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"订单状态",flex:1,key:"order_state"},
                        {name:"下单时间",flex:1,key:'create_time'},
                        {name:"中奖",flex:1,key:"is_win"},
                        ]}

                    dataSource={this.state.ZMAyOrderBean}
                    page={this.state.page}
                    total={this.state.total}
                    checkArr={this.state.order_arr}
                    checkKey="order_id"
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
                            this.getActivityGoodsOrder()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=ActivityOneYuanOrder;