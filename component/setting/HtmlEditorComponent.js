import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class WelfareEditorComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            html_id:this.props.params.html_id,
            type:2,
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
    renderDetails(){
        return(
            <Widget.Detail
                title="图文详情"
                marginBottom={20}
                baseData={[]}
                data={{}}>
                <WangeditorComponent
                    name="html"
                    url_desc={this.state.htmlBean.html_url_desc}
                    onChange={(desc)=>{
                        this.state.htmlBean.html_url_desc=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"图文编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"标题",flex:1,key:'html_name'},
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
                {this.renderDetails()}
            </div>
        )
    }

}

module.exports=WelfareEditorComponent;