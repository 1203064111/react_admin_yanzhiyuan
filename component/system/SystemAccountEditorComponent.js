import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SystemAccountEditorComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var systemAccountBean=JSON.parse(decodeURIComponent(this.props.params.systemAccountBean));
        this.state = {
            systemAccountBean:systemAccountBean,
            type:this.props.params.type,
            baseData:[],
            roleBeans:[]
        };
    }
    componentDidMount() {
        this.getSystemRolesNoPage();
    }

    getSystemRolesNoPage(){
        this.getDataByPost(3,member_homeurl+"/systemController/v1.0/getSystemRolesNoPage",{role_type:"1"})
    }
    insertSystemAccount(){
        var params={}
        params["system_name"]=this.state.systemAccountBean.system_name;
        params["system_account"]=this.state.systemAccountBean.system_account;
        params["system_type"]=this.state.systemAccountBean.system_type;
        params["system_img"]=this.state.systemAccountBean.system_img;

        if(this.isNull(this.state.systemAccountBean.account_id)){
            params["role_id"]=this.isNull(this.state.systemAccountBean.role_id)?this.state.roleBeans[0].role_id:this.state.systemAccountBean.role_id;
            params["system_password"]=this.state.systemAccountBean.system_password;
            this.getDataByPost(1,member_homeurl+"/systemController/v1.0/insertSystemAccount",params);
        }else{
            params["account_id"]=this.state.systemAccountBean.account_id;
            this.getDataByPost(2,member_homeurl+"/systemController/v1.0/updateSystemAccount",params);
        }
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                this.setState({
                    roleBeans:data
                })
                break;
        }
    }
    render(){
        var baseData=[];


        if(this.isNull(this.state.systemAccountBean.account_id)){
            baseData=[
                    {name:"名称",flex:3,key:'system_name'},
                    {name:"头像",flex:3,key:'system_img',type:"img",img_style:{marginLeft:10,width:100,height:100}},
                    {name:"账号",flex:3,key:'system_account'},
                    {name:"密码",flex:3,key:'system_password'},
                    {name:"角色",flex:3,key:"role_id",type:'select',data:this.state.roleBeans,show_value:"role_name",select_value:"role_id"},
                ]
        }else{
                baseData=[
                    {name:"名称",flex:3,key:'system_name'},
                    {name:"头像",flex:3,key:'system_img',type:"img",img_style:{marginLeft:10,width:100,height:100}},
                ]
        }


        return(
            <div>
                <Widget.Toolbar title={"模块详情编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.systemAccountBean}
                    onChange={(key,value)=>{
                        this.state.systemAccountBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSystemAccount();
                    }}/>
            </div>
        )
    }

}

module.exports=SystemAccountEditorComponent;