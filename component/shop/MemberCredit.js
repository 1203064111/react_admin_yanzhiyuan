/**
 * Created by hwq on 2018/8/15.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberCredit extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberCreditBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberCredits();
    }
    getMemberCredits(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getMemberCredits")
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberCreditBeans:data,
                    total:total,
                });
                break;


        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"会员人数统计"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'credit_id'},
                        {name:"会员等级",flex:1,key:'credit_grades'},
                        {name:"会员人数",flex:1,key:'member_count'},
                    ]}
                    dataSource={this.state.memberCreditBeans}


                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberCredits()
                        })
                    }}
                    >
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberCredit;

