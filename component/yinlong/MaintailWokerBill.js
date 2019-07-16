/**
 * Created by hwq on 2018/8/13.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MaintailWokerBill extends Widget.Base{
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
        this.getDataByPost(1,maintail_homeurl+"/maintailOrderController/v1.0/getMebWorkerBillCount"
            ,{page:this.state.page})
    }

    exportMemberBills(){
        this.getDataByPost(2,maintail_homeurl+"/maintailOrderController/v1.0/exportMebWorkerBills")
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberBillBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("导出成功");
                window.location.href=imgurl+data;
                break;


        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"师傅接单统计"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                <Widget.Button
                    style={{display:"flex",marginLeft:20}}
                    value="导出"
                    onClick={()=>{
                        this.exportMemberBills()
                    }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"用户名",flex:1,key:'member_name'},
                        {name:"用户账号",flex:1,key:'member_account'},
                        {name:"接单数量",flex:1,key:'bill_count'},
                        {name:"接单总金额",flex:1,key:'order_price'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.memberBillBeans}
                    operationData={[{title:"接单明细"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/maintailWokerbill_editor/"+this.state.memberBillBeans[rowID].member_id);
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

module.exports=MaintailWokerBill;

