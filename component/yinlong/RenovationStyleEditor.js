/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class RenovationStyleEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            style_id:this.props.params.style_id,
            RenovationStyleBean:{},
            cityBeans:[]
        };
    }

    componentDidMount() {
        if(this.props.params.style_id!=="-1"){

            this.getVillageDetail();

        }

        this.getCitys();

    }


    getVillageDetail(){
        this.getDataByPost(1,maintail_homeurl+"/renovationController/v1.0/getRenovationStyleDetail",{style_id:this.state.style_id})
    }
    getCitys(){
        this.getDataByPost(4,member_homeurl+"/settingController/v1.0/getCitys",{});
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    RenovationStyleBean:data,
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
        if(this.isNull(this.state.RenovationStyleBean.style_name)){
            this.showTip("请先添加风格名称");
            return;
        }
        var params={};
        params["style_name"]=this.state.RenovationStyleBean.style_name;
        params["style_price"]=this.state.RenovationStyleBean.style_price;
        params["village_address"]=this.state.RenovationStyleBean.village_address;


        if(this.state.style_id==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/renovationController/v1.0/insertRenovationStyle",params)
        }else{
            params["style_id"]=this.state.style_id;
            this.getDataByPost(3,maintail_homeurl+"/renovationController/v1.0/updateRenovationStyle",params)
        }

    }

    render(){

        return(
            <div>
                <Widget.Toolbar title={"装修风格详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[
            {name:"装修风格名称",flex:1,key:'style_name'},
            {name:"风格单价",flex:1,key:'style_price'}];


        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.RenovationStyleBean}


                    onChange={(key,value)=>{
                        this.state.RenovationStyleBean[key]=value;

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



module.exports=RenovationStyleEditor;
