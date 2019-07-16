/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");
class BaikeClassEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            classBean:{},
            baike_class_id:this.props.params.baike_class_id,
            parent_id:this.props.params.parent_id,

        };
    }

    componentDidMount() {
        if(this.props.params.baike_class_id==="-1"){
            this.setState({
                classBean:{class_state:"0"}
            })
        }else{
            this.getBaikeClassDetail();
        }
    }



    getBaikeClassDetail(){
        this.getDataByPost(1,shop_homeurl+"/baikeController/v1.0/getBaikeClassDetail",{baike_class_id:this.state.baike_class_id});
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

    insertBaikeClass(){
        if(this.isNull(this.state.classBean.class_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["class_name"]=this.state.classBean.class_name;
        params["class_img"]=this.state.classBean.class_img;
        params["class_desc"]=this.state.classBean.class_desc;
        params["class_special"]=this.state.classBean.class_special;
        params["class_state"]=this.state.classBean.class_state;

        params["parent_id"]=this.state.parent_id;

        if(this.state.baike_class_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/baikeController/v1.0/insertBaikeClass",params);
        }else{
            params["baike_class_id"]=this.state.baike_class_id;
            this.getDataByPost(3,shop_homeurl+"/baikeController/v1.0/updateBaikeClass",params);
        }
    }
    renderDetails1(){
        return(
            <Widget.Detail
                title="描述详情"
                marginBottom={20}
                baseData={[]}
                data={{}}>
                <WangeditorComponent
                    name="html"
                    url_desc={this.state.classBean.class_desc}
                    onChange={(desc)=>{
                        this.state.classBean.class_desc=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }
    renderDetails2(){
        return(
            <Widget.Detail
                title="特色详情"
                marginBottom={20}
                baseData={[]}
                data={{}}>
                <WangeditorComponent
                    name="html"
                    url_desc={this.state.classBean.class_special}
                    onChange={(desc)=>{
                        this.state.classBean.class_special=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
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
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'},
                    ]}
                    data={this.state.classBean}
                    onChange={(key,value,index)=>{
                            this.state.classBean[key]=value;
                            this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBaikeClass();
                    }}/>
                {this.renderDetails1()}
                {this.renderDetails2()}
            </div>
        )
    }



}

module.exports=BaikeClassEditor;