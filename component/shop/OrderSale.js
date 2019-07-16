/**
 * Created by hwq on 2018/8/15.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class OrderSale extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            orderSaleBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getOrderSales();
    }
    getOrderSales(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getOrderSales"
            ,{page:this.state.page})
    }


    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    orderSaleBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("同步成功");
                this.getOrderSales();
                break;

        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"商城销售额"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'order_sale_id'},
                        {name:"订单状态",flex:1,key:'order_state_show'},
                        {name:"销售额",flex:1,key:'order_price'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        ]}
                    dataSource={this.state.orderSaleBeans}


                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getOrderSales()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=OrderSale;

