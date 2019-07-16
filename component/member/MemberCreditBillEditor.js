/**
 * Created by Administrator on 2018/8/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MemberCreditBillEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            member_id:this.props.params.member_id,
            memberCreditBillBeans:[],
            page:1,
            total:0,

        };
    }

    componentDidMount() {
        this.getMemberCreditBills();

    }

    getMemberCreditBills(){
        this.getDataByPost(2,shop_homeurl+"/creditGradesController/v1.0/getMemberCreditBills",
            {page:this.state.page,member_id:this.state.member_id})
    }






    doSuccess(index,data,total){
        switch(index){

            case 2:
                this.setState({
                    memberCreditBillBeans:data,
                    total:total,
                })
                break;


        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"额度消费明细"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){

        return(
            <div style={{display:this.state.display_detail,flexDirectin:'column'}}>

                <Widget.List
                    data={[{name:"消费方式",flex:1,key:'credit_bill_type_show'},
                        {name:"消费金额",flex:1,key:'credit_bill_price'},
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
                            this.getMemberCreditBills()
                        })
                    }}>
                </Widget.List>

            </div>
        )
    }



}



module.exports=MemberCreditBillEditor;