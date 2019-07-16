/**
 * Created by hwq on 2018/8/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MerchantsTotalSaleDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            merchants_id:this.props.params.merchants_id,
            orderMerchantsBean:{},
            orderMerchantsBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMerchantsTotalSale();
        this.getMerchantsTotalSaleDetail();
    }

    getMerchantsTotalSale(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getMerchantsTotalSale",
            {merchants_id:this.state.merchants_id,
                goods_min_time:this.state.goods_min_time,
                goods_max_time:this.state.goods_max_time})
    }

    getMerchantsTotalSaleDetail(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/getMerchantsTotalSaleDetail",
            {page:this.state.page,merchants_id:this.state.merchants_id,
                goods_min_time:this.state.goods_min_time,
                goods_max_time:this.state.goods_max_time})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderMerchantsBean:data,
                });
                break;
            case 2:
                this.setState({
                    orderMerchantsBeans:data,
                    total:total,
                });
                break;
            case 3:
                this.showTip("对账成功");
                this.getMerchantsTotalSaleDetail();
                break;


        }
    }


    render(){
        return(
            <div>
            <Widget.Toolbar title={"商家销量"} history={this.props.history}></Widget.Toolbar>

                <Widget.View>
                    <Widget.Date
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        type="datetime"
                        placeholder="最小时间"
                        value={this.state.goods_min_time}
                        onChange={(value)=>{
                            this.setState({
                                goods_min_time:value
                            })
                        }}/>
                    <Widget.Date
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        type="datetime"
                        placeholder="最大时间"
                        value={this.state.goods_max_time}
                        onChange={(value)=>{
                            this.setState({
                                goods_max_time:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            if(this.state.goods_min_time > this.state.goods_max_time){
                                this.showTip("时间错误");
                                return;
                            }
                            this.getMerchantsTotalSale();
                            this.getMerchantsTotalSaleDetail();
                        }}/>
                </Widget.View>
                <Widget.Detail
                    title="商家销量统计"
                    baseData={[{name:"商家ID",flex:1,key:'merchants_id',type:"text"},
                        {name:"商家名称",flex:1,key:'merchants_name',type:"text"},
                        {name:"商家销售额",flex:1,key:'order_actual_price',type:"text"},
                        {name:"商家销售量",flex:1,key:'goods_num',type:"text"},
                    ]}
                    data={this.state.orderMerchantsBean}



                />
                <div>
                    <Widget.List
                        data={[{name:"订单号",flex:1,key:'order_merchants_no'},
                            {name:"商家ID",flex:1,key:'merchants_id'},
                            {name:"订单价格",flex:1,key:'order_actual_price'},
                            {name:"购买数量",flex:1,key:'goods_num'},
                            {name:"对账状态",flex:1,key:'reconciliation_state',type:'radio_select'},
                            {name:"创建时间",flex:1,key:'create_time'},
                        ]}
                        dataSource={this.state.orderMerchantsBeans}

                        onChange={(rowID,key,value)=>{
                            if(key==="reconciliation_state"){
                                this.getDataByPost(3,shop_homeurl+"/orderController/v1.0/updateReconciliationState",
                                    {order_merchants_id:this.state.orderMerchantsBeans[rowID].order_merchants_id,
                                        reconciliation_state:value});
                            }

                        }}

                        page={this.state.page}
                        total={this.state.total}
                        onPage={(page)=>{
                            this.setState({
                                page:page
                            },()=>{
                                this.getMerchantsTotalSaleDetail()
                            })
                        }}
                    >
                    </Widget.List>
                </div>
            </div>
        )
    }
}

module.exports=MerchantsTotalSaleDetail;

