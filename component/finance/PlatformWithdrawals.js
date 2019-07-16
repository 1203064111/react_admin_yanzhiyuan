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
        this.getMerchantsWithdrawalss();
    }

    getMerchantsWithdrawalss(){
        this.getDataByPost(1,shop_homeurl+"/merchantsController/v1.0/getMerchantsWithdrawalss",
            {page:this.state.page,withdrawals_state:this.state.withdrawals_state})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    withdrawalsBeans:data,
                    total:total
                });
                break;
            case 4:
                this.showTip("处理成功");
                this.getMerchantsWithdrawalss();
                break;

        }
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
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'withdrawals_id'},
                        {name:"商家ID",flex:1,key:'merchants_id'},
                        {name:"商家名称",flex:1,key:'merchants_name'},
                        {name:"提现金额",flex:1,key:'withdrawals_price'},
                        {name:"提现状态",flex:1,key:'withdrawals_state_show'},
                        {name:"提现时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:'-1'}
                    ]}
                    operationDatas={(index)=>{
                        return this.state.withdrawalsBeans[index].withdrawals_state==="1"?[{title:"通过"},{title:"拒绝"}]:
                            this.state.withdrawalsBeans[index].withdrawals_state==="2"?[{title:"打款"}]:[];
                    }}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip(this.state.withdrawalsBeans[index].withdrawals_state==="1"?"确认通过?":"确认打款?",()=>{
                                    this.getDataByPost(4,shop_homeurl+"/merchantsController/v1.0/handleMerchantsWithdrawals",
                                        {withdrawals_id:this.state.withdrawalsBeans[index].withdrawals_id,
                                            withdrawals_state:this.state.withdrawalsBeans[index].withdrawals_state==="1"?"2":"4"})
                                });
                                break;
                            case 1:
                                this.openTip("确认拒绝?",()=>{
                                    this.getDataByPost(4,shop_homeurl+"/merchantsController/v1.0/handleMerchantsWithdrawals",
                                        {withdrawals_id:this.state.withdrawalsBeans[index].withdrawals_id,
                                            withdrawals_state:"3"})
                                });
                                break;
                        }
                    }}
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