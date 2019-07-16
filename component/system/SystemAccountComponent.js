/**
 * Created by sjb on 17/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class SystemAccountComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            accountBeans:[],
            visible:false,
            moudle_index:1,
            level:this.props.params.level,
            baseData:[],
            parent_id:this.props.params.parent_id,
            page:1,
            total:0,
            system_type:"1"
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'account_id'},
                {name:"名称",flex:1,key:'system_name'},
                {name:"账号",flex:1,key:'system_account'},
                {name:"图标",flex:1,key:"system_img",type:'img'},
                {name:"角色",flex:1,key:"role_id"},
                {name:"操作",flex:3,key:"-1"}
            ]
        })
        this.getSystemAccounts(this.state.page);
    }

    getSystemAccounts(page){
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/getSystemAccounts",{system_type:this.state.system_type,page:page},{type:2})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    accountBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSystemAccounts(this.state.page);
                break;
        }
    }
    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteSystemAccount();
                            }}></Widget.Tip>
                <Widget.Toolbar title="系统账号" history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        style={{marginLeft:10}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/system_account_editor/"+encodeURIComponent(JSON.stringify({system_type:this.state.system_type}))+"/common");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={this.state.baseData}
                    dataSource={this.state.accountBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"编辑"},{title:"修改密码"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/system_account_editor/"+encodeURIComponent(JSON.stringify(this.state.accountBeans[rowID]))+"/common");
                                break;
                            case 1:
                                this.props.history.push("/system_account_password/"+this.state.accountBeans[rowID].account_id);
                                break;
                            case 2:
                                this.setState({
                                    visible:true,
                                    moudle_index:rowID
                                })
                                break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        })
                        this.getSystemAccounts(page);
                    }}>
                </Widget.List>
            </div>
        );
    }

    deleteSystemAccount() {
        this.setState({
            visible: false,
        })
        this.getDataByPost(2, member_homeurl + "/systemController/v1.0/deleteSystemAccount",
            {account_id:this.state.accountBeans[this.state.moudle_index].account_id});
    }
}

module.exports=SystemAccountComponent;