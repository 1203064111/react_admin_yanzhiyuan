/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SceneClass2 extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            classBeans:[],
            page:1,
            total:0,
            parent_id:this.props.params.parent_id
        };
    }

    componentDidMount() {
        this.getSceneClasss();
    }
    getSceneClasss(){
        this.getDataByPost(1,koubei_homeurl+"/sceneController/v1.0/getSceneClasss"
            ,{page:this.state.page,parent_id:this.state.parent_id},{type:2})
    }

    deleteSceneClass(){
        this.getDataByPost(2,koubei_homeurl+"/sceneController/v1.0/deleteSceneClass",{class_id:this.state.class_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    classBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSceneClasss();
                break;
            case 3:
                this.getSceneClasss();
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
                                this.deleteSceneClass();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"二级分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/scene_class_editor/-1"+"/"+this.state.parent_id);
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"分类ID",flex:1,key:'class_id'},
                        {name:"分类名称",flex:1,key:'class_name'},
                        {name:"分类图标",flex:1,key:'class_img',type:'img'},
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.classBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/scene_class_editor/"+this.state.classBeans[rowID].class_id+"/"+this.state.parent_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    class_id:this.state.classBeans[rowID].class_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,koubei_homeurl+"/sceneController/v1.0/moveSceneClass"
                                ,{class_id:this.state.classBeans[rowID].class_id
                                    ,sort:this.state.classBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="class_state"){
                            this.getDataByPost(3,koubei_homeurl+"/sceneController/v1.0/updateSceneClass",
                                {class_id:this.state.classBeans[rowID].class_id,
                                    class_state:value});
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getSceneClasss()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=SceneClass2;