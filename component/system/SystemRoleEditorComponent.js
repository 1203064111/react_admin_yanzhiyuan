import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SystemRoleEditorComponent extends Widget.Base{
    // Base
    constructor(props) {
        super(props);
        // 初始状态
        var roleBean=JSON.parse(decodeURIComponent(this.props.params.roleBean));
        this.state = {
            roleBean:roleBean,
            typeBeans:[{name:'平台角色',value:'1'},{name:'商家角色',value:'2'}]
        };
    }

    insertSystemRole(){
        var params={}
        params["role_name"]=this.state.roleBean.role_name;
        params["role_type"]=this.state.roleBean.role_type;
        if(this.isNull(this.state.roleBean.role_id)){
            this.getDataByPost(1,member_homeurl+"/systemController/v1.0/insertSystemRole",params);
        }else{
            params["role_id"]=this.state.roleBean.role_id;
            this.getDataByPost(2,member_homeurl+"/systemController/v1.0/updateSystemRole",params);
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
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"模块详情编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"名称",flex:1,key:'role_name'},
                        {name:"类型",flex:1,key:"role_type",type:'select',data:this.state.typeBeans,show_value:"name",select_value:"value"},
                    ]}
                    data={this.state.roleBean}
                    onChange={(key,value)=>{
                        this.state.roleBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSystemRole();
                    }}/>
            </div>
        )
    }

}

module.exports=SystemRoleEditorComponent;