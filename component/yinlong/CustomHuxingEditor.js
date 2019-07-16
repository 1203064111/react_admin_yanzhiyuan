/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CustomHuxingEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            customizedBean:{},
            huxing_id:this.props.params.huxing_id,
            customized_id:this.props.params.customized_id,

        };
    }

    componentDidMount() {
        if(this.state.huxing_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,maintail_homeurl+"/customizedController/v1.0/getCustomizedHuxingDetail",{huxing_id:this.state.huxing_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    customizedBean:data,
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

    insertBanner(){
        if(this.isNull(this.state.customizedBean.huxing_name)){
            this.showTip("户型名称不能为空！");
            return;
        }

        var params={};
        params["huxing_name"]=this.state.customizedBean.huxing_name;
        params["huxing_img"]=this.state.customizedBean.huxing_img;
        params["sort"]=this.state.customizedBean.sort;
        params["customized_id"]=this.state.customized_id;



        if(this.state.huxing_id ==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/customizedController/v1.0/insertCustomizedHuxing",params);
        }else{
            params["huxing_id"]=this.state.huxing_id;
            this.getDataByPost(3,maintail_homeurl+"/customizedController/v1.0/updateCustomizedHuxing",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"定制方案名称",flex:1,key:'huxing_name'},
                    {name:"图标",flex:1,key:'huxing_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                    {name:"权重",flex:1,key:'sort'},
        ];


        return(
            <div>
                <Widget.Toolbar title={"户型详情"} history={this.props.history}></Widget.Toolbar>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.customizedBean}
                    onChange={(key,value,index)=>{
                        this.state.customizedBean[key]=value;

                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBanner();
                    }}/>
            </div>
        )
    }
}

module.exports=CustomHuxingEditor;