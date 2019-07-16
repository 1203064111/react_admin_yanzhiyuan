/**
 * Created by sjb on 17/9/14.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MoudleEditorComponent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var moudleBean=JSON.parse(decodeURIComponent(this.props.params.moudleBean));
        this.state = {
            moudleBean:moudleBean,
            typeBeans:[{name:'平台模块',value:'1'},{name:'商家模块',value:'2'}]
        };
    }

    insertMoudle(){
        if(this.isNull(this.state.moudleBean.moudle_name)){
            this.showTip("模块不可为空");
            return;
        }

        var params={}
        params["moudle_type"]=this.state.moudleBean.moudle_type;
        params["moudle_name"]=this.state.moudleBean.moudle_name;
        params["moudle_url"]=this.state.moudleBean.moudle_url;
        params["sort"]=this.state.moudleBean.sort;
        params["moudle_remark"]=this.state.moudleBean.moudle_remark;
        params["parent_id"]=this.state.moudleBean.parent_id;

        if(this.isNull(this.state.moudleBean.moudle_id)){
            this.getDataByPost(1,member_homeurl+"/systemController/v1.0/insertMoudle",params);
        }else{
            params["moudle_id"]=this.state.moudleBean.moudle_id;
            this.getDataByPost(2,member_homeurl+"/systemController/v1.0/updateMoudle",params);
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
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"模块详情编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                                {name:"名称",flex:3,key:'moudle_name'},
                                {name:"路由",flex:3,key:"moudle_url"},
                                {name:"权重",flex:3,key:'sort'},
                                {name:"类型",flex:3,key:"moudle_type",type:'select',data:this.state.typeBeans,show_value:"name",select_value:"value"},
                                {name:"备注",flex:3,key:'moudle_remark'},
                             ]}
                    data={this.state.moudleBean}
                    onChange={(key,value)=>{
                        this.state.moudleBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertMoudle();
                    }}/>
            </div>
        )
    }
}
module.exports=MoudleEditorComponent;