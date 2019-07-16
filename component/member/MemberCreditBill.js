/**
 * Created by hwq on 2018/8/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberCreditBill extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberCreditBillBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberCreditBillTotal();
    }
    getMemberCreditBillTotal(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberCreditBillTotal"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberCreditBillBeans:data,
                    total:total
                });
                break;


        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户消费总额"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"额度消费总额",flex:1,key:'credit_bill_price'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.memberCreditBillBeans}
                    operationData={[{title:"消费明细"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/member_credit_bill_editor/"+this.state.memberCreditBillBeans[rowID].member_id);
                                break;

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberCreditBillTotal()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberCreditBill;

