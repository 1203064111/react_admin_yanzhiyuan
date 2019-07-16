/**
 * Created by hwq on 2018/8/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberBill extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberBillBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberBillTotal();
    }
    getMemberBillTotal(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberBillTotal"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberBillBeans:data,
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
                        {name:"消费总额",flex:1,key:'bill_price'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.memberBillBeans}
                    operationData={[{title:"消费明细"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/member_bill_editor/"+this.state.memberBillBeans[rowID].member_id);
                                break;

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberBillTotal()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberBill;

