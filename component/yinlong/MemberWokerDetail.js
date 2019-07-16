/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MemberWokerDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            member_id:this.props.params.member_id,
            memberWorkerBean:{member_state:"0"},

        };
    }

    componentDidMount() {
        this.getMemberDetail();
    }

    getMemberDetail(){
        this.getDataByPost(1,maintail_homeurl+"/yinlongMemberController/v1.0/getMemberWorkerDetail",
            {member_id:this.state.member_id})
    }

    resetMemberpassword(){
        var params={};
        params["member_id"]=this.state.member_id;
        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/resetMemberpassword",params)
    }






    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    memberWorkerBean:data,
                })
                break;
            case 2:
                this.showTip("重置密码成功！");
                this.props.history.goBack();
                break;
            case 3:
                this.getMemberDetail();
                break;


        }
    }


    render(){
        let baseData=[];
        baseData =[
            {name:"用户id",flex:1,key:'member_id',type:'text'},
            {name:"用户账号",flex:1,key:'member_account',type:'text'},
            {name:"姓名",flex:1,key:'member_name',type:'text'},
            {name:"联系电话",flex:1,key:'member_phone',type:'text'},
            {name:"工种",flex:1,key:'worker_type',type:'text'},
            {name:"评论平均星级",flex:1,key:'assessment_star',type:'text'},
            {name:"评论总星级",flex:1,key:'assessment_total_star',type:'text'},
            {name:"所在省",flex:1,key:'member_provider',type:'text'},
            {name:"所在市",flex:1,key:'member_city',type:'text'},
            {name:"所在区",flex:1,key:'member_country',type:'text'},
            {name:"注册时间",flex:1,key:'create_time',type:'text'},
            {name:"是否禁用该用户",flex:1,key:'member_state',type:'radio_select'},
        ]


        return(

            <div>
                <Widget.Toolbar title={"用户详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        value="重置密码"
                        onClick={()=>{
                            this.resetMemberpassword();
                        }}/>
                    <p1 style={{fontSize:8,marginLeft:10,color:'red',marginTop:13}}>（重置默认密码为：123456）</p1>
                </Widget.View>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.memberWorkerBean}

                    onChange={(key,value,index)=>{

                        this.state.memberWorkerBean[key]=value;
                        if(key==="member_state"){
                            this.getDataByPost(3,member_homeurl+"/memberController/v1.0/updateMemberDetail"
                                ,{member_id:this.state.memberWorkerBean.member_id
                                    ,member_state:value})
                        }
                        this.refresh();
                    }}

                />

            </div>
        )
    }


}



module.exports=MemberWokerDetail;