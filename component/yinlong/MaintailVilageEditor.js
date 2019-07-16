/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MaintailVilageEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            village_id:this.props.params.village_id,
            CommunityBean:{is_recommed:'0',is_guarantee:"0"},
            cityBeans:[]
        };
    }

    componentDidMount() {
        if(this.props.params.village_id!=="-1"){

            this.getVillageDetail();

        }

        this.getCitys();

    }


    getVillageDetail(){
        this.getDataByPost(1,maintail_homeurl+"/communitycontroller/v1.0/getVillageDetail",{village_id:this.state.village_id})
    }
    getCitys(){
        this.getDataByPost(4,member_homeurl+"/settingController/v1.0/getCitys",{});
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    CommunityBean:data,
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
            case 4:
                this.setState({
                    cityBeans:data

                })
                break;
        }
    }

    insertVillage(){
        if(this.isNull(this.state.CommunityBean.village_name)){
            this.showTip("请先添加小区名称");
            return;
        }
        var params={};
        params["village_name"]=this.state.CommunityBean.village_name;

        params["is_guarantee"]=this.state.CommunityBean.is_guarantee;
        params["village_address"]=this.state.CommunityBean.village_address;
        params["village_province"]=this.getNull(this.state.CommunityBean.village_province,this.state.cityBeans[0].name);
        params["village_city"]=this.getNull(this.state.CommunityBean.village_city,this.state.cityBeans[0].cityBeans[0].name);
        params["village_country"]=this.getNull(this.state.CommunityBean.village_country,this.state.cityBeans[0].cityBeans[0].cityBeans[0].name);
        params["is_recommed"]=this.state.CommunityBean.is_recommed;

        if(this.state.village_id==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/communitycontroller/v1.0/insertVillage",params)
        }else{
            params["village_id"]=this.state.village_id;
            this.getDataByPost(3,maintail_homeurl+"/communitycontroller/v1.0/updateVillage",params)
        }

    }

    render(){

        return(
            <div>
                <Widget.Toolbar title={"小区详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[
                {name:"小区名称",flex:1,key:'village_name'},
                {name:"省市区",flex:1,key1:'merchants_province',key2:'merchants_city',key3:'merchants_country',type:'city',addressBeans:this.state.cityBeans},
                {name:"详情地址",flex:1,key:'village_address'},
                {name:"是否保修",flex:1,key:'is_guarantee',type:'radio_select'},
                {name:"置顶推荐",flex:1,key:'is_recommed',type:'radio_select'}];

        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.CommunityBean}


                    onChange={(key,value)=>{
                        this.state.CommunityBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertVillage();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=MaintailVilageEditor;
