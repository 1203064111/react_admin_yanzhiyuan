/**
 * Created by hwq on 2018/8/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class TerraceTotalSale extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderMerchantsBean:{},
            orderMerchantsBeans:{},

            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getTerraceTotalSales();
        this.getMerchantsTotalSales();
    }
    getTerraceTotalSales(){

        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getTerraceTotalSales",
            {goods_min_time:this.state.goods_min_time,
                goods_max_time:this.state.goods_max_time})
    }

    getMerchantsTotalSales(){
        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/getMerchantsTotalSales",
            {page:this.state.page,goods_min_time:this.state.goods_min_time,
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
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"平台对账"} history={this.props.history}></Widget.Toolbar>

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
                            this.setState({
                                page:1
                            },()=>{
                                this.getTerraceTotalSales();
                                this.getMerchantsTotalSales();
                            })
                        }}/>
                    </Widget.View>
                <Widget.Detail
                    title="平台销量"
                    baseData={[{name:"平台销售额",flex:1,key:'order_actual_price',type:'text'},
                        {name:"平台销售量",flex:1,key:'goods_num',type:'text'},
                    ]}
                    data={this.state.orderMerchantsBean}/>

                <div>
                    <Widget.List
                        data={[{name:"商家ID",flex:1,key:'merchants_id'},
                            {name:"商家名称",flex:1,key:'merchants_name'},
                            {name:"商家销售额",flex:1,key:'order_actual_price'},
                            {name:"商家销售量",flex:1,key:'goods_num'},
                            {name:"操作",flex:2,key:'-1'},
                        ]}
                        dataSource={this.state.orderMerchantsBeans}
                        operationData={[{title:"详情"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                    this.props.history.push("/merchants_sale_detail/"
                                        +this.state.orderMerchantsBeans[rowID].merchants_id);
                                    break;

                            }
                        }}


                        page={this.state.page}
                        total={this.state.total}
                        onPage={(page)=>{
                            this.setState({
                                page:page
                            },()=>{
                                this.getMerchantsTotalSales()
                            })
                        }}
                    >
                    </Widget.List>
                </div>

            </div>
        )
    }
}

module.exports=TerraceTotalSale;

