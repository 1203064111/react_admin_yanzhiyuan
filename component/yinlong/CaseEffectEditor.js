/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CaseEffectEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            yinlongBannerBean:{banner_type:"0"},
            effect_id:this.props.params.effect_id,
            goodsImgBeans:[{effect_img:'-1'}],
        };
    }

    componentDidMount() {
        if(this.state.effect_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,maintail_homeurl+"/renovationController/v1.0/getCaseEffectDetail",{effect_id:this.state.effect_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    yinlongBannerBean:data,
                    goodsImgBeans:data.effectImgBeans.concat([{effect_img:"-1"}])
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
        if(this.isNull(this.state.yinlongBannerBean.effect_name)){
            this.showTip("请先添加案列名称!");
            return;
        }

        var params={};
        params["effect_name"]=this.state.yinlongBannerBean.effect_name;
        params["effect_img"]=this.state.yinlongBannerBean.effect_img;
        params["effect_imgs"]=JSON.stringify(this.state.goodsImgBeans);

        if(this.state.effect_id ==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/renovationController/v1.0/insertCaseEffect",params);
        }else{
            params["effect_id"]=this.state.effect_id;
            this.getDataByPost(3,maintail_homeurl+"/renovationController/v1.0/updateCaseEffect",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"案例名称",flex:1,key:'effect_name'},
            {name:"案列图标",flex:1,key:'effect_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        ];


        return(
            <div>
                <Widget.Toolbar title={"案例详情"} history={this.props.history}></Widget.Toolbar>

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
                <Widget.Detail
                    title="案例效果图展示"
                    baseData={[]}
                    data={{}}>
                    <Widget.Foreach
                        style={{display:'flex',overflow:'auto'}}
                        dataSource={this.state.goodsImgBeans}
                        renderRow={(rowID)=>{
                            return(
                                <div style={{display:'flex'}}>
                                    <Widget.Img
                                        title_style={{display:'none'}}
                                        img_style={{width:80,height:80,marginLeft:10}}
                                        src={this.state.goodsImgBeans[rowID].effect_img==="-1"?"./images/add.jpg":imgurl+this.state.goodsImgBeans[rowID].effect_img}
                                        url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                        onSuccess={(value)=>{
                                            if(this.state.goodsImgBeans[rowID].effect_img==="-1"){
                                                this.setState({
                                                    goodsImgBeans:([{effect_img:value}]).concat(this.state.goodsImgBeans)
                                                })
                                            }else{
                                                this.state.goodsImgBeans[rowID].effect_img=value;
                                                this.refresh();
                                            }
                                        }}/>
                                    <div style={{display:"flex"}}
                                         className={"Hui-iconfont Hui-iconfont-close2"}
                                         onClick={()=>{
                                             this.state.goodsImgBeans.splice(rowID,1);
                                             this.refresh();
                                         }}>
                                    </div>
                                </div>
                            )
                        }}/>
                </Widget.Detail>

            </div>
        )
    }
}

module.exports=CaseEffectEditor;