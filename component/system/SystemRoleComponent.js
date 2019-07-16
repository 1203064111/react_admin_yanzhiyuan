/**
 * Created by sjb on 17/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class SystemRoleComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            roleBeans:[],
            visible:false,
            role_index:1,
            baseData:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.setState({
            baseData:[
                {name:"ID",flex:1,key:'role_id'},
                {name:"名称",flex:1,key:'role_name'},
                {name:"类型",flex:1,key:'role_type_show'},
                {name:"操作",flex:2,key:"-1"}
            ]
        })
        this.getSystemRoles(this.state.page);
    }

    getSystemRoles(page){
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/getSystemRoles",{page:page},{type:2})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    roleBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSystemRoles(this.state.page);
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
                                this.deleteSystemRole();
                            }}></Widget.Tip>
                <Widget.Toolbar title="系统角色" history={this.props.history}></Widget.Toolbar>
                <div style={{display:'flex',justifyContent:'flex-end',marginTop:20}}>
                    <Widget.Button
                        marginRight={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/system_role_editor/"+encodeURIComponent(JSON.stringify({role_type:"1"})));
                        }}/>
                </div>
                <Widget.List
                    data={this.state.baseData}
                    dataSource={this.state.roleBeans}
                    page={this.state.page}
                    total={this.state.total}
                    operationData={[{title:"权限分配"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){

                            case 0:
                                this.props.history.push("/system_authority/"+this.state.roleBeans[rowID].role_id+"/"+this.state.roleBeans[rowID].role_type);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    role_index:rowID
                                })
                                break;
                        }
                    }}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        })
                        this.getSystemRoles(page);
                    }}>
                </Widget.List>
            </div>
        );
    }

    deleteSystemRole() {
        this.setState({
            visible: false,
        })
        this.getDataByPost(2, member_homeurl + "/systemController/v1.0/deleteSystemRole",
            {role_id:this.state.roleBeans[this.state.role_index].role_id});
    }
}

module.exports=SystemRoleComponent;