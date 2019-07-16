/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ClueIndustryEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            ClueIndustryBean:{},
            industry_id:this.props.params.industry_id
        };
    }

    componentDidMount() {
        this.getClueIndustryDetail();
    }

    getClueIndustryDetail(){
        this.getDataByPost(1,clue_homeurl+"/clueController/v1.0/getClueIndustryDetail",{industry_id:this.state.industry_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    ClueIndustryBean:data
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

    insertClueIndustry(){
        if(this.isNull(this.state.ClueIndustryBean.industry_name)){
            this.showTip("请先填写名称");
            return;
        }

        if(this.state.industry_id==="-1"){
            this.getDataByPost(2,clue_homeurl+"/clueController/v1.0/insertClueIndustry",
                {industry_name:this.state.ClueIndustryBean.industry_name});
        }else{
            this.getDataByPost(3,clue_homeurl+"/clueController/v1.0/updateClueIndustry",
                {industry_id:this.state.industry_id,industry_name:this.state.ClueIndustryBean.industry_name});
        }
    }


    render(){
       return(
           <div>
               <Widget.Toolbar title={"行业详情"} history={this.props.history}></Widget.Toolbar>
               <Widget.Detail
                   title="基础信息"
                   baseData={[
                       {name:"名称",key:'industry_name'},
                   ]}
                   data={this.state.ClueIndustryBean}
                   onChange={(key,value)=>{
                       this.state.ClueIndustryBean[key]=value;
                       this.refresh();
                   }}
                   onSave={()=>{
                       this.insertClueIndustry();
                   }}/>
           </div>
       )
    }
}

module.exports=ClueIndustryEditor;