/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MaintailVilage extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            CommunityBean:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getVillage();
    }
    getVillage(){
        this.getDataByPost(1,maintail_homeurl+"/communitycontroller/v1.0/getVillage"
            ,{page:this.state.page})
    }

    deleteVillage(){
        this.getDataByPost(2,maintail_homeurl+"/communitycontroller/v1.0/deleteVillage",{village_id:this.state.village_id})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    CommunityBean:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getVillage();
                break;
            case 3:
                this.getVillage();
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
                                this.deleteVillage();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"小区列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/maintailVilage_Editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"小区ID",flex:1,key:'village_id'},
                        {name:"小区名称",flex:1,key:'village_name'},
                        {name:"是否保修",flex:1,key:'is_guarantee',type:'radio_select'},
                        {name:"置顶推荐",flex:1,key:'is_recommed',type:'radio_select'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.CommunityBean}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/maintailVilage_Editor/"+this.state.CommunityBean[rowID].village_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    village_id:this.state.CommunityBean[rowID].village_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="is_guarantee"){
                            this.getDataByPost(3,maintail_homeurl+"/communitycontroller/v1.0/updateVillage"
                                ,{village_id:this.state.CommunityBean[rowID].village_id
                                    ,is_guarantee:value})
                        }else if(key==="is_recommed"){
                            this.getDataByPost(3,maintail_homeurl+"/communitycontroller/v1.0/updateVillage"
                                ,{village_id:this.state.CommunityBean[rowID].village_id
                                    ,is_recommed:value})
                        }


                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getVillage()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=MaintailVilage;