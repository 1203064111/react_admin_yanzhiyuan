import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class HtmlQuestionEditor extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            html_id:this.props.params.html_id,
            type:1,
            htmlBean:{},
        };
    }
    componentDidMount() {
        
        this.getHtmlDetail(this.state.page);
    }

    getHtmlDetail(){
        this.getDataByPost(3,member_homeurl+"/settingController/v1.0/getHtmlDetail",{html_id:this.state.html_id})
    }
    insertHtml(){
        var params={}
        params["html_name"]=this.state.htmlBean.html_name;
        params["type"]=this.state.type;
        params["html_url_desc"]=this.state.htmlBean.html_url_desc;
        if(this.isNull(this.state.htmlBean.html_id)){
            this.getDataByPost(1,member_homeurl+"/settingController/v1.0/insertHtml",params);
        }else{
            params["html_id"]=this.state.htmlBean.html_id;
            this.getDataByPost(2,member_homeurl+"/settingController/v1.0/updateHtml",params);
        }
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 2:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                this.setState({
                    htmlBean:data
                })
                break;
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"图文编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"问题",flex:1,key:'html_name'},
                        {name:"回答",flex:1,key:'html_url_desc'},

                    ]}
                    data={this.state.htmlBean}
                    onChange={(key,value)=>{
                        this.state.htmlBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertHtml();
                    }}>
                </Widget.Detail>
            </div>
        )
    }

}

module.exports=HtmlQuestionEditor;