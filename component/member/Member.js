/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class Member extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMembers();
    }
    getMembers(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getMembers"
            ,{page:this.state.page,member_id:this.state.member_id
                ,member_account:this.state.member_account,
                member_nick_name:this.state.member_nick_name})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMembers();
                break;
            case 3:
                this.showTip("设置成功");
                this.getMembers();
                break;
            case 4:
                this.showTip("导出成功");
                window.location.href=texturl+data;
                break;
        }
    }

    deleteMember(){
        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/deleteMember"
            ,{member_id:this.state.member_id})
    }
    exportMembers(){
        this.getDataByPost(4,member_homeurl+"/memberController/v1.0/exportMembers"
            ,{member_id:this.state.member_id,
                member_account:this.state.member_account,
                member_nick_name:this.state.member_nick_name})
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户列表"} history={this.props.history}></Widget.Toolbar>
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

                    <Widget.Editor
                        style={{display:'flex',marginLeft:20}}
                        title_style={{display:'none'}}
                        placeholder="昵称"
                        value={this.state.member_nick_name}
                        onChange={(value)=>{
                            this.setState({
                                member_nick_name:value
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
                        value="导出"
                        onClick={()=>{
                            this.exportMembers()
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"账号",flex:1,key:'member_account'},
                        {name:"昵称",flex:1,key:'member_nick_name'},
                        {name:"性别",flex:1,key:'member_sex'},
                        {name:"是否禁用",flex:1,key:'member_state',type:'radio_select'},
                        {name:"注册时间",flex:1,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.memberBeans}
                    operationData={[{title:"详情"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/member_detail/"+this.state.memberBeans[rowID].member_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        member_id:this.state.memberBeans[rowID].member_id
                                    },()=>{
                                        this.deleteMember();
                                    })
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="member_state"){
                            this.openTip("确认修改禁用状态?",()=>{
                                this.getDataByPost(3,member_homeurl+"/memberController/v1.0/updateMemberDetail"
                                    ,{member_id:this.state.memberBeans[rowID].member_id,
                                        member_state:value});
                            })

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

module.exports=Member;

