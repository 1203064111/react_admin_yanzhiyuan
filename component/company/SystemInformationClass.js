/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Information extends Widget.Base{//掌牧资讯
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            informationClassBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getInformationClasss();
    }
    getInformationClasss(){
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getSystemInformationClasss"
            ,{page:this.state.page,information_state:this.state.information_state},{type:2})
    }

    deleteInformationClass(){
        this.getDataByPost(2,information_homeUrl+"/informationController/v1.0/deleteSystemInformationClass",{class_id:this.state.class_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    informationClassBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getInformationClasss();
                break;
            case 3:
                this.getInformationClasss();
                break;

        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"资讯分类列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/system_information_class_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'class_id'},
                        {name:"分类名称",flex:2,key:'class_name'},
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'},
                        {name:"创建时间",flex:2,key:'create_time',type:'inputDate'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.informationClassBeans }
                    operationData={[{title:"编辑"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/system_information_class_editor/"+this.state.informationClassBeans[rowID].class_id);
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="class_state"){
                            this.getDataByPost(3,information_homeUrl+"/informationController/v1.0/updateSystemInformationClass"
                                ,{class_id:this.state.informationClassBeans[rowID].class_id,
                                    class_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getInformationClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=Information;