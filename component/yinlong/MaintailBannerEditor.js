/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MaintailBannerEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            yinlongBannerBean:{banner_type:"0"},
            banner_id:this.props.params.banner_id,

            bannerTypeBeans:[{name:"无跳转",value:"0"},
                {name:"跳转外链",value:"1"},],
            bannerRangeBeans:[{name:"用户",value:"1"},
                {name:"师傅",value:"2"},]
        };
    }

    componentDidMount() {
        if(this.state.banner_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,maintail_homeurl+"/maintailSettingController/v1.0/getBannerDetail",{banner_id:this.state.banner_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    yinlongBannerBean:data,
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
        if(this.isNull(this.state.yinlongBannerBean.banner_title)){
            this.showTip("请先添加标题");
            return;
        }

        var params={};
        params["banner_title"]=this.state.yinlongBannerBean.banner_title;
        params["banner_img"]=this.state.yinlongBannerBean.banner_img;
        params["banner_type"]=this.state.yinlongBannerBean.banner_type;
        params["banner_range"]=this.state.yinlongBannerBean.banner_range;
        if(this.state.yinlongBannerBean.banner_type === "1"){
            params["chain_url"]=this.state.yinlongBannerBean.chain_url;
        }

        if(this.state.banner_id ==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/maintailSettingController/v1.0/insertBanner",params);
        }else{
            params["banner_id"]=this.state.banner_id;
            this.getDataByPost(3,maintail_homeurl+"/maintailSettingController/v1.0/updateBanner",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"标题",flex:1,key:'banner_title'},
            {name:"图片(375ps*150ps 不超过2M)",flex:1,key:'banner_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        ];

        baseData = baseData.concat([{name:"跳转属性",flex:1,key:'banner_type',type:'select',data:this.state.bannerTypeBeans,show_value:'name',select_value:'value'},]);
        baseData = baseData.concat([{name:"显示类型",flex:1,key:'banner_range',type:'select',data:this.state.bannerRangeBeans,show_value:'name',select_value:'value'},]);
        if(this.state.yinlongBannerBean.banner_type === "1"){
            baseData = baseData.concat([{name:"资讯网址",flex:1,key:'chain_url'},]);
        }


        return(
            <div>
                <Widget.Toolbar title={"轮播图详情"} history={this.props.history}></Widget.Toolbar>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.yinlongBannerBean}
                    onChange={(key,value,index)=>{
                        this.state.yinlongBannerBean[key]=value;

                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBanner();
                    }}/>
            </div>
        )
    }
}

module.exports=MaintailBannerEditor;