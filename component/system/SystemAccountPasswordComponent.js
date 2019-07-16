import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SystemAccountEditorComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            account_id:this.props.params.account_id,
            systemAccountBean:{}
        };
    }
    componentDidMount() {
    }

    insertSystemAccount(){
        if(this.isNull(this.state.systemAccountBean.system_password)){
            this.showTip("请先输入密码!");
            return;
        }
        if(this.state.systemAccountBean.system_password!==this.state.systemAccountBean.system_again_password){
            this.showTip("2次密码不一致!");
            return;
        }

        var params={};
        params["system_password"]=this.state.systemAccountBean.system_password;
        params["account_id"]=this.state.account_id;
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/updateSystemAccount",params);
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }
    render(){


        return(
            <div>
                <Widget.Toolbar title={"模块详情编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[{name:"密码",flex:1,key:'system_password',type:'password'},
                        {name:"确认密码",flex:1,key:'system_again_password',type:'password'}]}
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