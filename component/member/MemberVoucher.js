/**
 * Created by hwq on 2018/9/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberVoucher extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberVoucherBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberVouchers();
    }
    getMemberVouchers(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getMemberVouchers"
            ,{page:this.state.page,member_account:this.state.member_account})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberVoucherBeans:data,
                    total:total
                });
                break;


        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户代金券"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="用户账号"
                        value={this.state.member_account}
                        onChange={(value)=>{
                            this.setState({
                                member_account:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getMemberVouchers()
                            })
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"用户账号",flex:1,key:'member_account'},
                        {name:"代金券",flex:1,key:'voucher_price'},
                        {name:"代金券状态",flex:1,key:'voucher_state_show'},
                        {name:"订单ID",flex:1,key:'order_merchants_id'},
                        {name:"订单号",flex:1,key:'order_merchants_no'},
                        {name:"赠送时间",flex:1,key:'create_time'},
                    ]}
                    dataSource={this.state.memberVoucherBeans}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberVouchers()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberVoucher;

