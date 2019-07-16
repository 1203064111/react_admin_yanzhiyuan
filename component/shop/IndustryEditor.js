/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class IndustryEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            industryBean:{industry_state:"0"},
            industry_id:this.props.params.industry_id,
        };
    }

    componentDidMount() {
        if(this.props.params.industry_id!=="-1"){
            this.getClueDetail();
        }
    }

    getClueDetail(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getIndustryDetail",{industry_id:this.state.industry_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    industryBean:data,
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

    insertIndustry(){
        if(this.isNull(this.state.industryBean.industry_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["industry_name"]=this.state.industryBean.industry_name;
        params["industry_state"]=this.state.industryBean.industry_state;

        if(this.state.industry_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/insertIndustry",params);
        }else{
            params["industry_id"]=this.state.industry_id;
            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateIndustry",params);
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"行业详情"} history={this.props.history}></Widget.Toolbar>
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
                        {name:"行业名称",flex:1,key:'industry_name'},
                        {name:"行业状态",flex:1,key:'industry_state',type:'radio_select'},]}
                    data={this.state.industryBean}
                    onChange={(key,value)=>{
                        this.state.industryBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertIndustry();
                    }}/>
            </div>
        )
    }
}

module.exports=IndustryEditor;