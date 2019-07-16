/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ProgrammeEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            customizedBean:{},
            huxing_id:this.props.params.huxing_id,
            programme_id:this.props.params.programme_id,
            goodsImgBeans:[{goods_img:'-1'}],
        };
    }

    componentDidMount() {
        if(this.state.huxing_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,maintail_homeurl+"/customizedController/v1.0/getCustomizedHuxingProgrammeDetail",{programme_id:this.state.programme_id});
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
        if(this.isNull(this.state.customizedBean.programme_name)){
            this.showTip("方案名称不能为空！");
            return;
        }
        if(isNaN(this.state.customizedBean.programme_price)){
            this.showTip("方案报价含有非法数字");
            return;
        }

        var params={};
        params["programme_name"]=this.state.customizedBean.programme_name;
        params["programme_img"]=this.state.customizedBean.programme_img;
        params["programme_imgs"]=this.state.customizedBean.programme_imgs;
        params["programme_price"]=this.state.customizedBean.programme_price;
        params["sort"]=this.state.customizedBean.sort;
        params["huxing_id"]=this.state.huxing_id;



        if(this.state.programme_id ==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/customizedController/v1.0/insertCustomizedHuxingProgramme",params);
        }else{
            params["programme_id"]=this.state.programme_id;
            this.getDataByPost(3,maintail_homeurl+"/customizedController/v1.0/updateCustomizedHuxingProgramme",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"方案名称",flex:1,key:'programme_name'},
            {name:"方案报价",flex:1,key:'programme_price'},
            {name:"图标",flex:1,key:'programme_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
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

module.exports=ProgrammeEditor;