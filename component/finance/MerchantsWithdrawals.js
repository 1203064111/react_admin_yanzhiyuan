/**
 * Created by sjb on 18/7/13.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MerchantsWithdrawals extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            withdrawalsBeans:[],
            balanceBean:{},
            page:1,
            total:0,
            stateBeans:[{name:"全部",value:''},
                {name:"申请中",value:'1'},
                {name:"已接受",value:'2'},
                {name:"已拒绝",value:'3'},
                {name:"已打款",value:'4'},]
        };
    }

    componentDidMount() {
        this.getMerchantsBalanceDetail();
        this.getMerchantsWithdrawalss();
    }

    getMerchantsBalanceDetail(){
        this.getDataByPost(2,shop_homeurl+"/merchantsController/v1.0/getMerchantsBalanceDetail",
            {merchants_id:this.state.systemAccountBean.merchants_id})
    }
    getMerchantsWithdrawalss(){
        this.getDataByPost(1,shop_homeurl+"/merchantsController/v1.0/getMerchantsWithdrawalss",
            {page:this.state.page,
                merchants_id:this.state.systemAccountBean.merchants_id,
                withdrawals_state:this.state.withdrawals_state})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    withdrawalsBeans:data,
                    total:total
                });
                break;
            case 2:
                this.setState({
                    balanceBean:data
                })
                break;
            case 3:
                this.showTip("申请成功");
                this.getMerchantsBalanceDetail();
                this.getMerchantsWithdrawalss();
                break;
            case 4:
                this.showTip("处理成功");
                this.getMerchantsBalanceDetail();
                this.getMerchantsWithdrawalss();
                break;

        }
    }

    applyMerchantsWithdrawals(){
        this.getDataByPost(3,shop_homeurl+"/merchantsController/v1.0/applyMerchantsWithdrawals",
            {merchants_id:this.state.systemAccountBean.merchants_id,
                withdrawals_price:this.state.withdrawals_price})
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"提现"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="提现状态"
                        show_value="name"
                        select_value="value"
                        dataSource={this.state.stateBeans}
                        onChange={(index)=>{
                            this.setState({
                                withdrawals_state:this.state.stateBeans[index].value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getMerchantsWithdrawalss()
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="申请提现"
                        onClick={()=>{
                            this.openPrompt("提现金额",0,(value)=>{
                                this.setState({
                                    withdrawals_price:value
                                },()=>{
                                    this.applyMerchantsWithdrawals();
                                })
                            },3);
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
                    data={[{name:"ID",flex:1,key:'withdrawals_id'},
                        {name:"提现金额",flex:1,key:'withdrawals_price'},
                        {name:"提现状态",flex:1,key:'withdrawals_state_show'},
                        {name:"提现时间",flex:1,key:'create_time'},
                    ]}
                    dataSource={this.state.withdrawalsBeans}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMerchantsWithdrawalss()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}
module.exports=MerchantsWithdrawals;