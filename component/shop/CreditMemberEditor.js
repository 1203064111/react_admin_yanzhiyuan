/**
 * Created by Administrator on 2018/8/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CreditMemberEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            member_id:this.props.params.member_id,
            shopMemberBean:[],
            memberCreditBillBeans:[],
            page:1,
            total:0,

        };
    }

    componentDidMount() {
        this.getMemberCreditDetail();
        this.getMemberCounts();

    }

    getMemberCounts(){
        this.getDataByPost(2,shop_homeurl+"/creditGradesController/v1.0/getMemberCounts",
            {page:this.state.page,member_id:this.state.member_id})
    }


    getMemberCreditDetail(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberCreditDetail",{member_id:this.state.member_id})
    }



    doSuccess(index,data,total){
        switch(index){
            case 1:
                this.setState({
                    shopMemberBean:data,
                })
                break;
            case 2:
                this.setState({
                    memberCreditBillBeans:data,
                    total:total,
                })
                break;
            case 3:

                break;

        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"授信消费明细"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){

        return(
            <div style={{display:this.state.display_detail,flexDirectin:'column'}}>

                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                    {name:"授信等级",flex:1,key:'credit_grades'},
                    {name:"可用额度",flex:1,key:'member_credit_balance'},
                    {name:"总额度",flex:1,key:'credit_balance'},
                    {name:"更新时间",flex:1,key:'update_time'},
                    ]}
                    dataSource={this.state.shopMemberBean}


                    onChange={(key,value)=>{
                        this.state.creditGradesBean[key]=value;

                        this.refresh();
                    }}
                    ></Widget.List>
                <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                    <Widget.List
                        data={[{name:"额度来源",flex:1,key:'credit_bill_type_show'},
                            {name:"额度变化",flex:1,key:'credit_bill_price'},
                            {name:"订单号",flex:1,key:'order_merchants_no'},
                            {name:"时间",flex:1,key:'create_time'},
                        ]}
                        dataSource={this.state.memberCreditBillBeans}


                        page={this.state.page}
                        total={this.state.total}
                        onPage={(page)=>{
                            this.setState({
                                page:page
                            },()=>{
                                this.getMemberCounts()
                            })
                        }}>
                    </Widget.List>

                </div>

            </div>
        )
    }



}



module.exports=CreditMemberEditor;