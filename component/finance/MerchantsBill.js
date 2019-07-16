/**
 * Created by sjb on 18/7/13.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MerchantsBill extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            billBeans:[],
            balanceBean:{},
            page:1,
            total:0,
            typeBeans:[{name:"全部",value:''},
                {name:"订单结算",value:'1'},
                {name:"提现申请",value:'2'},
                {name:"提现被拒",value:'3'},
                {name:"提现打款",value:'4'},]
        };
    }

    componentDidMount() {
        this.getMerchantsBalanceDetail();
        this.getMerchantsBills();
    }

    getMerchantsBalanceDetail(){
        this.getDataByPost(2,shop_homeurl+"/merchantsController/v1.0/getMerchantsBalanceDetail",
            {merchants_id:this.state.systemAccountBean.merchants_id})
    }
    getMerchantsBills(){
        this.getDataByPost(1,shop_homeurl+"/merchantsController/v1.0/getMerchantsBills",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.merchants_id,
                bill_type:this.state.bill_type})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    billBeans:data,
                    total:total
                });
                break;
            case 2:
                this.setState({
                    balanceBean:data
                })
                break;

        }
    }

    render(){


        return(
            <div>
                <Widget.Toolbar title={"账单明细"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="账单类型"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.typeBeans}
                        onChange={(index)=>{
                            this.setState({
                                bill_type:this.state.typeBeans[index].value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getMerchantsBills()
                        }}/>
                </Widget.View>
                <Widget.View background="#ffffff">
                    <Widget.Text
                        style={{display:"flex",marginLeft:20}}
                        title="可提现金额"
                        value={this.state.balanceBean.withdrawals_can_balance}/>
                    <Widget.Text
                        style={{display:"flex",marginLeft:20}}
                        title="已提现金额"
                        value={this.state.balanceBean.withdrawals_already_balance}/>
                    <Widget.Text
                        style={{display:"flex",marginLeft:20}}
                        title="提现中金额"
                        value={this.state.balanceBean.withdrawals_ing_balance}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'bill_id'},
                        {name:"账单金额",flex:1,key:'bill_price'},
                        {name:"账单类型",flex:1,key:'bill_type_show'},
                        {name:"创建时间",flex:1,key:'create_time'}
                        ]}
                    dataSource={this.state.billBeans}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMerchantsBills()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}
module.exports=MerchantsBill;