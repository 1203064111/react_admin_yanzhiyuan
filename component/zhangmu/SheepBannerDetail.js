/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SheepBannerDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            bannerBean:{'banner_type':'0'},
            banner_id:this.props.params.banner_id,
            bannerTypeBeans:[{name:'无跳转',value:'0'},{name:'资讯详情',value:'1'},{name:'商品详情',value:'2'},{name:'羊只详情',value:'3'},{name:'外链',value:'4'}],
        };
    }

    componentDidMount() {
        if(this.props.params.banner_id!=="-1"){//添加
            this.getbannerDetail();
        }
    }

    getbannerDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getBannerDetail",{banner_id:this.state.banner_id});
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
        var params={};
        params["banner_title"]=this.state.bannerBean.banner_title;
        params["banner_img"]=this.state.bannerBean.banner_img;
        params["banner_url"]=this.state.bannerBean.banner_url;
        params["banner_desc"]=this.state.bannerBean.banner_desc;
        params["banner_type"]=this.state.bannerBean.banner_type;
        params["information_id"]=this.state.bannerBean.information_id;
        params["goods_id"]=this.state.bannerBean.goods_id;
        params["bitch_sheep_id"]=this.state.bannerBean.bitch_sheep_id;
        

        if(this.state.banner_id==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertBanner",params);
        }else{
            params["banner_id"]=this.state.banner_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateBanner",params);
        }
    }


    render(){
        let baseData=[
            {name:'标题',flex:'1',key:'banner_title'},
            {name:'图片',flex:1,key:'banner_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'跳转',flex:1,key:'banner_type',type:'select',data:this.state.bannerTypeBeans,select_value:'value',show_value:'name'},
        ]
        if(this.state.bannerBean.banner_type+""==="0"){
            baseData=baseData;
        }
        else if(this.state.bannerBean.banner_type+""==="1"){
            baseData=baseData.concat([
                {name:'资讯ID',flex:'1',key:'information_id'},]);
        }
        else if(this.state.bannerBean.banner_type+""==="2"){
            baseData=baseData.concat([
                {name:'商品ID',flex:'1',key:'goods_id'},]);
        }
        else if(this.state.bannerBean.banner_type+""==="3"){
            baseData=baseData.concat([
                {name:'分期羊ID',flex:'1',key:'bitch_sheep_id'},]);
        }else{
            baseData=baseData.concat([
                {name:'外链url',flex:'1',key:'banner_url'},]);
        }
        baseData=baseData.concat([
            {name:'描述',flex:'1',key:'banner_desc',type:'textarea'},
        ]);
        return(
            <div>
                <Widget.Toolbar title={"轮播详情"} history={this.props.history}></Widget.Toolbar>
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

module.exports=SheepBannerDetail;