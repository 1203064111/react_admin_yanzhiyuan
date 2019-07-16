/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MaintailServiceTime extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            timeBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMaintailServiceTimes();
    }
    getMaintailServiceTimes(){
        this.getDataByPost(1,maintail_homeurl+"/communitycontroller/v1.0/getMaintailServiceTimes"
            ,{page:this.state.page})
    }

    deleteMaintailServiceTime(){
        this.getDataByPost(2,maintail_homeurl+"/communitycontroller/v1.0/deleteMaintailServiceTime",{service_id:this.state.service_id})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    timeBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getMaintailServiceTimes();
                break;
            case 3:
                this.getMaintailServiceTimes();
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
                                this.deleteMaintailServiceTime();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"服务时间"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/maintail_service_time_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"开始时间",flex:1,key:'service_start_time'},
                        {name:"结束时间",flex:1,key:'service_end_time'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.timeBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/maintail_service_time_editor/"+this.state.timeBeans[rowID].service_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    service_id:this.state.timeBeans[rowID].service_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="is_guarantee"){
                            this.getDataByPost(3,maintail_homeurl+"/communitycontroller/v1.0/updateVillage"
                                ,{service_id:this.state.timeBeans[rowID].service_id
                                    ,is_guarantee:value})
                        }else if(key==="is_recommed"){
                            this.getDataByPost(3,maintail_homeurl+"/communitycontroller/v1.0/updateVillage"
                                ,{service_id:this.state.timeBeans[rowID].service_id
                                    ,is_recommed:value})
                        }


                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMaintailServiceTimes()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=MaintailServiceTime;