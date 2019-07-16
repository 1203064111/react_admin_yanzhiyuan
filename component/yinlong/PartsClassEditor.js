/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class PartsClassEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            parts_id:this.props.params.parts_id,
            parent_id:this.props.params.parent_id,
            classBean:[],
            goodsClassTagBeans:[],
            industryBeans:[],
            specificationBeans:[]
        };
    }

    componentDidMount() {
        if(this.props.params.parts_id==="-1"){
            this.setState({
                classBean:{parts_state:"0"}
            })
            this.getIndustrysNoPage();
            this.getSpecifications();
        }else{
            this.getGoodsClassDetail();
        }
    }


    getSpecifications(){
        this.getDataByPost(5,maintail_homeurl+"/goodsController/v1.0/getSpecifications"
            ,{})
    }

    getGoodsClassDetail(){
        this.getDataByPost(1,maintail_homeurl+"/pratsClassController/v1.0/getPratsClassDetail",{parts_id:this.state.parts_id});
    }

    getIndustrysNoPage(){
        this.getDataByPost(4,maintail_homeurl+"/goodsController/v1.0/getIndustrysNoPage",{});
    }


    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    classBean:data,
                    goodsClassTagBeans:data.goodsClassTagBeans,
                    industryBeans:data.industryBeans,
                    specificationBeans:data.specificationBeans
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
                    industryBeans:data
                })
                break;
            case 5:
                this.setState({
                    specificationBeans:data
                })
                break;
        }
    }

    insertGoodsClass(){
        if(this.isNull(this.state.classBean.parts_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["parts_name"]=this.state.classBean.parts_name;
        params["parts_img"]=this.state.classBean.parts_img;

        params["parts_state"]=this.state.classBean.parts_state;
        params["parent_id"]=this.state.parent_id;


        if(this.state.parts_id==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/pratsClassController/v1.0/insertPratsClass",params);
        }else{
            params["parts_id"]=this.state.parts_id;
            this.getDataByPost(3,maintail_homeurl+"/pratsClassController/v1.0/updatePratsClass",params);
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"分类详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteClueMaterial();
                            }}></Widget.Tip>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"分类名称",flex:1,key:'parts_name'},
                        {name:"分类图标",flex:1,key:'parts_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                        {name:"分类状态",flex:1,key:'parts_state',type:'radio_select'},
                    ]}
                    data={this.state.classBean}



                    onChange={(key,value,index)=>{

                        this.state.classBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertGoodsClass();
                    }}/>

            </div>
        )
    }

}

module.exports=PartsClassEditor;