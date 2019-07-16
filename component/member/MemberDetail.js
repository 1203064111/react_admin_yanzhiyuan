/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MemberDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            member_id:this.props.params.member_id,
            memberBean:{},

        };
    }

    componentDidMount() {
        this.getMemberDetail();
    }

    getMemberDetail(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getMemberDetail",
            {member_id:this.state.member_id})
    }







    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    memberBean:data,
                })
                break;
            case 2:
                this.showTip("赠送成功");
                this.props.history.goBack();
                break;


        }
    }


    render(){
        let baseData=[];
        baseData =[
            {name:"用户id",flex:1,key:'member_id',type:'text'},
            {name:"账号",flex:1,key:'member_account',type:'text'},
            {name:"昵称",flex:1,key:'member_nick_name',type:'text'},
            {name:"姓名",flex:1,key:'member_real_name',type:'text'},
            {name:"性别",flex:1,key:'member_sex_show',type:'text'},
            {name:"头像",flex:1,key:'member_img',type:'img_click'},
            {name:"注册时间",flex:1,key:'create_time',type:'textDate'},
        ]


        return(
            <div>
                <Widget.Toolbar title={"用户详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.memberBean}

                    onChange={(key,value)=>{
                        this.state.memberBean[key]=value;

                        this.refresh();
                    }}


                />

            </div>
        )
    }


}



module.exports=MemberDetail;