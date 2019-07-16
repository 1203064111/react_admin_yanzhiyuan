/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MaintailMaterialEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            maintailMaterialBean:{},
            material_id:this.props.params.material_id,


        };
    }

    componentDidMount() {
        if(this.state.material_id !== "-1"){
            this.getBannerDetail();
        }
    }

    getBannerDetail(){
        this.getDataByPost(1,maintail_homeurl+"/maintailMaterialController/v1.0/getMaterialDetail",{material_id:this.state.material_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    maintailMaterialBean:data,
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
        if(this.isNull(this.state.maintailMaterialBean.material_name)){
            this.showTip("请先添加材料名称");
            return;
        }

        var params={};
        params["material_name"]=this.state.maintailMaterialBean.material_name;
        params["sort"]=this.state.maintailMaterialBean.sort;


        if(this.state.material_id ==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/maintailMaterialController/v1.0/insertMaterial",params);
        }else{
            params["material_id"]=this.state.material_id;
            this.getDataByPost(3,maintail_homeurl+"/maintailMaterialController/v1.0/updateMaterial",params);
        }
    }


    render(){
        let baseData = [];
        baseData = [{name:"维修材料名称",flex:1,key:'material_name'},
                   {name:"权重",flex:1,key:'sort'},

        ];


        return(
            <div>
                <Widget.Toolbar title={"维修材料详情"} history={this.props.history}></Widget.Toolbar>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.maintailMaterialBean}
                    onChange={(key,value,index)=>{
                        this.state.maintailMaterialBean[key]=value;

                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBanner();
                    }}/>
            </div>
        )
    }
}

module.exports=MaintailMaterialEditor;