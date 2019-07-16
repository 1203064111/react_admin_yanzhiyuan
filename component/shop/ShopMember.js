/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="shop_member";
class Member extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberBeans:[],
            page:this.getNull(this.getSessionStorage(type+"page"),1),
            total:0,
            start_time:this.getNull(this.getSessionStorage(type+"start_time"),""),
            end_time:this.getNull(this.getSessionStorage(type+"end_time"),""),
            member_id:this.getNull(this.getSessionStorage(type+"member_id"),""),
            member_nick_name:this.getNull(this.getSessionStorage(type+"member_nick_name"),""),
            tengxun_im_account:this.getNull(this.getSessionStorage(type+"tengxun_im_account"),""),
        };
    }
    componentDidMount() {
        this.getMembers();
    }
    getMembers(){
        this.setSessionStorage(type+"page",this.state.page);
        this.setSessionStorage(type+"member_nick_name",this.state.member_nick_name);
        this.setSessionStorage(type+"member_id",this.state.member_id);
        this.setSessionStorage(type+"tengxun_im_account",this.state.tengxun_im_account);
        this.setSessionStorage(type+"start_time",this.state.start_time);
        this.setSessionStorage(type+"end_time",this.state.end_time);

        this.getDataByPost(1,shop_homeurl+"/shopMemberController/v1.0/getShopMembersKoubei"
            ,{page:this.state.page,member_id:this.getNull(this.state.member_id,"-1")
                ,tengxun_im_account:this.state.tengxun_im_account,
                member_nick_name:this.state.member_nick_name,
                start_time:this.state.start_time,
                end_time:this.state.end_time})
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
                this.getMembers();
                break;
        }
    }

    deleteMember(){
        this.getDataByPost(2,member_homeurl+"/memberController/v1.0/deleteMember"
            ,{member_id:this.state.member_id})
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Date
                        title="开始时间"
                        title_style={{width:60}}
                        title_p_style={{display:"none"}}
                        date_style={{width:150}}
                        type={"datetime"}
                        value={this.state.start_time}
                        onChange={(value)=>{
                            this.state.start_time=value;
                            this.refresh();
                        }}/>
                    <Widget.Date
                        title="结束时间"
                        title_style={{width:60}}
                        title_p_style={{display:"none"}}
                        date_style={{width:150}}
                        type={"datetime"}
                        value={this.state.end_time}
                        onChange={(value)=>{
                            this.state.end_time=value;
                            this.refresh();
                        }}/>
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
                        placeholder="来源"
                        value={this.state.tengxun_im_account}
                        onChange={(value)=>{
                            this.setState({
                                tengxun_im_account:value
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
                </Widget.View>
                <Widget.List
                    data={[{name:"用户ID",flex:1,key:'member_id'},
                        {name:"账号",flex:1,key:'member_account'},
                        {name:"昵称",flex:1,key:'member_nick_name'},
                        {name:"性别",flex:1,key:'member_sex_show'},
                        {name:"来源",flex:1,key:'tengxun_im_account'},
                        {name:"注册时间",flex:1,key:'create_time'},
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

