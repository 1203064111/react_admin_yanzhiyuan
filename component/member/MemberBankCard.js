/**
 * Created by Administrator on 2018/7/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberBankCard extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            bankCardBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberBankCards();
    }
    getMemberBankCards(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getMemberBankCards"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    bankCardBeans:data,
                    total:total
                });
                break;

            case 3:
                this.getMemberBankCards();
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户银行卡列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'card_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"姓名",flex:1,key:'member_name'},
                        {name:"银行预留手机号",flex:1,key:'member_mobile'},
                        {name:"银行名称",flex:1,key:'bank_name'},
                        {name:"银行卡号",flex:1,key:'bank_card_number'},
                        {name:"银行卡类型",flex:1,key:'bank_card_type_show'},
                        {name:"创建时间",flex:1,key:'create_time'},
                    ]}
                    dataSource={this.state.bankCardBeans}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberBankCards()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberBankCard;

