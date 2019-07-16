/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CustomizedEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            customizedBean:{},
            customized_id:this.props.params.customized_id,


        };
    }

    componentDidMount() {
        if(this.state.customized_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,maintail_homeurl+"/customizedController/v1.0/getCustomizedDetail",{customized_id:this.state.customized_id});
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
        if(this.isNull(this.state.customizedBean.customized_name)){
            this.showTip("方案名称不能为空！");
            return;
        }

        var params={};
        params["customized_name"]=this.state.customizedBean.customized_name;
        params["sort"]=this.state.customizedBean.sort;



        if(this.state.customized_id ==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/customizedController/v1.0/insertCustomized",params);
        }else{
            params["customized_id"]=this.state.customized_id;
            this.getDataByPost(3,maintail_homeurl+"/customizedController/v1.0/updateCustomized",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"定制方案名称",flex:1,key:'customized_name'},
                    {name:"权重",flex:1,key:'sort'},
        ];


        return(
            <div>
                <Widget.Toolbar title={"定制详情"} history={this.props.history}></Widget.Toolbar>

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

module.exports=CustomizedEditor;