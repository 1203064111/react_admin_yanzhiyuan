/**
 * Created by hwq on 2018/8/16.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberConsume extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberConsumeBeans:{},
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberConsumeOrderBys();
    }
    getMemberConsumeOrderBys(){
        this.getDataByPost(1,shop_homeurl+"/orderController/v1.0/getMemberConsumeOrderBys",
            {page:this.state.page,member_account:this.state.member_account})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberConsumeBeans:data,
                    total:total,
                });
                break;


        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户消费排行"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="手机号"
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
                                this.getMemberConsumeOrderBys();
                            })
                        }}/>
                </Widget.View>

                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"用户电话",flex:1,key:'member_account'},
                        {name:"消费金额",flex:1,key:'bill_price'},
                    ]}
                    dataSource={this.state.memberConsumeBeans}


                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberConsumeOrderBys()
                        })
                    }}
                >
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberConsume;

