/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class BannerEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            bannerBean:{banner_type:"0"},
            banner_id:this.props.params.banner_id,

            bannerTypeBeans:[
                            {name:"商品",value:"1"},
                            {name:"资讯",value:"2"},
                            {name:"职位",value:"3"},
                            {name:"百科",value:"4"},
                            {name:"医院",value:"5"},]

        };
    }

    componentDidMount() {
        if(this.state.banner_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,shop_homeurl+"/shopSettingController/v1.0/getBannerDetail",{banner_id:this.state.banner_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    bannerBean:data,
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
        if(this.isNull(this.state.bannerBean.banner_title)){
            this.showTip("请先添加标题");
            return;
        }

        var params={};
        params["banner_title"]=this.state.bannerBean.banner_title;
        params["banner_img"]=this.state.bannerBean.banner_img;
        params["banner_type"]=this.state.bannerBean.banner_type;
        if(this.state.bannerBean.banner_type === "1"){
            params["goods_id"]=this.state.bannerBean.goods_id;
        }else if(this.state.bannerBean.banner_type === "2"){
            params["information_site"]=this.state.bannerBean.information_site;
        }else if(this.state.bannerBean.banner_type === "3"){
            params["position_id"]=this.state.bannerBean.position_id;
        }else if(this.state.bannerBean.banner_type === "4"){
            params["baike_id"]=this.state.bannerBean.baike_id;
        }else if(this.state.bannerBean.banner_type === "5"){
            params["merchants_id"]=this.state.bannerBean.merchants_id;
        }

        if(this.state.banner_id ==="-1"){
            this.getDataByPost(2,shop_homeurl+"/shopSettingController/v1.0/insertBanner",params);
        }else{
            params["banner_id"]=this.state.banner_id;
            this.getDataByPost(3,shop_homeurl+"/shopSettingController/v1.0/updateBanner",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"标题",flex:1,key:'banner_title'},
            {name:"图片(750px*300px 不超过2M)",flex:1,key:'banner_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        ];

        baseData = baseData.concat([{name:"轮播类型",flex:1,key:'banner_type',type:'select',data:this.state.bannerTypeBeans,show_value:'name',select_value:'value'},]);
        if(this.state.bannerBean.banner_type === "2"){
            baseData = baseData.concat([{name:"资讯ID",flex:1,key:'information_site'},]);
        }else if(this.state.bannerBean.banner_type === "1"){
            baseData = baseData.concat([{name:"商品ID",flex:1,key:'goods_id'},]);
        }else if(this.state.bannerBean.banner_type === "3"){
            baseData = baseData.concat([{name:"职位ID",flex:1,key:'position_id'},]);
        }else if(this.state.bannerBean.banner_type === "4"){
            baseData = baseData.concat([{name:"百科ID",flex:1,key:'baike_id'},]);
        }else if(this.state.bannerBean.banner_type === "5"){
            baseData = baseData.concat([{name:"医院ID",flex:1,key:'merchants_id'},]);
        }
        return(
            <div>
                <Widget.Toolbar title={"轮播图详情"} history={this.props.history}></Widget.Toolbar>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.bannerBean}
                    onChange={(key,value,index)=>{
                        this.state.bannerBean[key]=value;

                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBanner();
                    }}/>
            </div>
        )
    }
}

module.exports=BannerEditor;