/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SceneClassEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            classBean:{},
            class_id:this.props.params.class_id,
            parent_id:this.props.params.parent_id,
        };
    }

    componentDidMount() {
        if(this.props.params.class_id==="-1"){
            this.setState({
                classBean:{class_state:"0"}
            })
        }else{
            this.getSceneClassDetail();
        }
    }


    getSceneClassDetail(){
        this.getDataByPost(1,koubei_homeurl+"/sceneController/v1.0/getSceneClassDetail",{class_id:this.state.class_id});
    }

   

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    classBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    insertSceneClass(){
        if(this.isNull(this.state.classBean.class_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["class_name"]=this.state.classBean.class_name;
        params["class_img"]=this.state.classBean.class_img;

        params["class_state"]=this.state.classBean.class_state;
        params["parent_id"]=this.state.parent_id;
        params["class_tags"]=JSON.stringify(this.state.goodsClassTagBeans);
        params["industrys"]=JSON.stringify(this.state.industryBeans);
        params["specifications"]=JSON.stringify(this.state.specificationBeans);

        if(this.state.class_id==="-1"){
            this.getDataByPost(2,koubei_homeurl+"/sceneController/v1.0/insertSceneClass",params);
        }else{
            params["class_id"]=this.state.class_id;
            this.getDataByPost(3,koubei_homeurl+"/sceneController/v1.0/updateSceneClass",params);
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"分类详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"分类名称",flex:1,key:'class_name'},
                        {name:"分类图标",flex:1,key:'class_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'}
                    ]}
                    data={this.state.classBean}
                    onChange={(key,value,index)=>{
                        this.state.classBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSceneClass();
                    }}/>
            </div>
        )
    }

}

module.exports=SceneClassEditor;