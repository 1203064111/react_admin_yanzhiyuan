/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberWoker extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberWorkerBean:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMembers();
    }
    getMembers(){
        this.getDataByPost(1,maintail_homeurl+"/yinlongMemberController/v1.0/getMemberWorker"
            ,{page:this.state.page,member_phone:this.state.member_phone,
                member_name:this.state.member_name})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberWorkerBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMembers();
                break;
            case 3:
                this.getMembers();
                break;
            case 4:
                this.getMembers();
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"维修师傅列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="电话号码"
                        value={this.state.member_phone}
                        onChange={(value)=>{
                            this.setState({
                                member_phone:value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="姓名"
                        value={this.state.member_name}
                        onChange={(value)=>{
                            this.setState({
                                member_name:value
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="搜索"
                        onClick={()=>{
                            this.setState({
                                page:1
                            },()=>{
                                this.getMembers();
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/maintail_add_worker/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"姓名",flex:1,key:'member_name'},
                        {name:"电话号码",flex:1,key:'member_phone'},
                        {name:"工种",flex:1,key:'worker_type'},
                        {name:"是否禁用",flex:1,key:'member_state',type:'radio_select'},
                        {name:"评论平均星级",flex:1,key:'assessment_star'},
                        {name:"注册时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.memberWorkerBean}
                    operationData={[{title:"详情"},{title:"修改密码"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/member_woker_detail/"+this.state.memberWorkerBean[rowID].member_id);
                                break;
                            case 1:
                                this.props.history.push("/maintail_password_worker/"+this.state.memberWorkerBean[rowID].member_id);
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="member_state"){
                            this.getDataByPost(3,member_homeurl+"/memberController/v1.0/updateMemberDetail"
                                ,{member_id:this.state.memberWorkerBean[rowID].member_id
                                    ,member_state:value})
                            this.getDataByPost(4,maintail_homeurl+"/yinlongMemberController/v1.0/updateMemberWoker"
                                ,{member_id:this.state.memberWorkerBean[rowID].member_id
                                    ,member_state:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMembers()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberWoker;

