/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class InformationClassEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            classBean:{class_state:"0"},
            class_id:this.props.params.class_id,
        };
    }

    componentDidMount() {
        if(this.props.params.class_id!=="-1"){
            this.getInformationClassDetail();
        }
    }

    getInformationClassDetail(){
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getInformationClassDetail",{class_id:this.state.class_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    classBean:data,
                    goodsClassBeans:data.goodsClassBeans
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
            case 4:
                this.setState({
                    goodsClassBeans:data,
                })
                break;
        }
    }

    insertInformationClass(){
        var params={};
        params["class_name"]=this.state.classBean.class_name;
        params["class_state"]=this.state.classBean.class_state;

        if(this.state.class_id==="-1"){
            this.getDataByPost(2,information_homeUrl+"/informationController/v1.0/insertInformationClass",params);
        }else{
            params["class_id"]=this.state.class_id;
            this.getDataByPost(3,information_homeUrl+"/informationController/v1.0/updateInformationClass",params);
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
                        {name:"分类状态",flex:1,key:'class_state',type:'radio_select'},
                    ]}
                    data={this.state.classBean}
                    onChange={(key,value,index)=>{
                        this.state.classBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertInformationClass();
                    }}/>
            </div>
        )
    }
}

module.exports=InformationClassEditor;