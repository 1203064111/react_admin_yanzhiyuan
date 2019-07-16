/**
 * Created by Administrator on 2018/8/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class CreditMember extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            shopMemberBeans:[],
            page:1,
            total:0,

            creditGradesBeans:[{credit_grades:"全部"},],
            credit_grades:"",

        };
    }
    componentDidMount() {
        this.getMemberCredits();
        this.getCreditGradess();
    }
    getMemberCredits(){
        if(this.state.credit_grades === "全部"){
            this.state.credit_grades = "";
        }
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberCredits"
            ,{page:this.state.page,member_id:this.state.member_id
                ,credit_grades:this.state.credit_grades})
    }

    getCreditGradess(){
        this.getDataByPost(3,shop_homeurl+"/creditGradesController/v1.0/getCreditGradess"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    shopMemberBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMemberCredits();
                break;
            case 3:
                this.setState({
                    creditGradesBeans:this.state.creditGradesBeans.concat(data),
                });
                break;

        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"授信列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="用户ID"
                        value={this.state.member_id}
                        onChange={(value)=>{
                            this.setState({
                                member_id:value
                            })
                        }}/>
                    <Widget.Select
                        width={60}
                        selectHeight={30}
                        title="用户等级"
                        show_value="credit_grades"
                        select_value="credit_grades"
                        dataSource={this.state.creditGradesBeans}
                        onChange={(index)=>{
                            this.setState({
                                credit_grades:this.state.creditGradesBeans[index].credit_grades
                            })
                        }}/>

                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.getMemberCredits();
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"总积分",flex:1,key:'member_integral'},
                        {name:"余额",flex:1,key:'member_balance'},
                        {name:"认证状态",flex:1,key:'credit_state_show'},
                        {name:"授信等级",flex:1,key:'credit_grades'},
                        {name:"可用额度",flex:1,key:'member_credit_balance'},
                        {name:"总额度",flex:1,key:'credit_balance'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:'-1'}]}
                    dataSource={this.state.shopMemberBeans}
                    operationData={[{title:"消费明细"},{title:"编辑"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/credit_member_editor/"+this.state.shopMemberBeans[rowID].member_id);
                                break;
                            case 1:
                                if(this.state.shopMemberBeans[rowID].credit_state !== "1"){
                                    this.showTip("用户未认证");
                                    return;
                                }
                                this.props.history.push("/credit_member_editor2/"+this.state.shopMemberBeans[rowID].member_id);
                                break;

                        }
                    }}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberCredits()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=CreditMember;

