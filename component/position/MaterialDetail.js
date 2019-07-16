/**
 * Created by Administrator on 2018/7/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MaterialDetail extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            material_id:this.props.params.material_id,
            materialBean:{material_type:"0"},
        };
    }

    componentDidMount() {
        this.getMaterialDetail();
    }



    getMaterialDetail(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getMaterial",
            {material_id:this.state.material_id})
    }



    doSuccess(index,data){
        switch(index){

            case 1:
                this.setState({
                    materialBean:data,
                });
                break;
            case 2:
                this.showTip("已同意");
                this.getMaterialDetail();
                break;
            case 3:
                this.showTip("已拒绝");
                this.getMaterialDetail();
                break;

        }
    }




    render(){

        return(
            <div>
                <Widget.Toolbar title={"认证详情"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData = [];
        if(this.state.materialBean.material_type === "0"){
            baseData = baseData.concat([{name:"企业id",flex:1,key:'material_id',type:'text'},
                {name:"联系人姓名",flex:1,key:'linkman_name',type:'text'},
                {name:"企业名称",flex:1,key:'material_name',type:'text'},
                {name:"联系方式",flex:1,key:'material_phone',type:'text'},
                {name:"公司地址",flex:1,key:'material_address',type:'text'},
                {name:"公司简介",flex:1,key:'material_information',type:'text'},
                {name:"营业执照",flex:1,key:'material_imgs1',type:'img_click',img_style:{marginLeft:10,width:100,height:100}},
                {name:"公司展示图片",flex:1,key:'material_imgs2',type:'img_click',img_style:{marginLeft:10,width:100,height:100}},]);
        }else if(this.state.materialBean.material_type === "1"){
            baseData = baseData.concat([{name:"个人id",flex:1,key:'material_id',type:'text'},
                {name:"姓名",flex:1,key:'material_name',type:'text'},
                {name:"身份证号",flex:1,key:'id_card',type:'text'},
                {name:"联系电话",flex:1,key:'material_phone',type:'text'},
                {name:"个人简介",flex:1,key:'material_information',type:'text'},
                {name:"身份证正面",flex:1,key:'material_imgs1',type:'img_click',img_style:{marginLeft:10,width:100,height:100}},
                {name:"身份证反面",flex:1,key:'material_imgs2',type:'img_click',img_style:{marginLeft:10,width:100,height:100}},]);
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="认证信息"
                    baseData={baseData}
                    data={this.state.materialBean}

                />
                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>

                    <Widget.Button
                        style={{display:this.state.materialBean.material_state==='0'?'flex':"none",marginLeft:20,width:200,height:30,marginBottom:20}}
                        value="通过"
                        onClick={()=>{

                            this.openTip("确认通过?",()=>{
                                this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/updateMaterial",
                                    {material_id:this.state.material_id,
                                        material_state:'1'});
                            });
                        }}/>
                    <Widget.Button
                        style={{display:this.state.materialBean.material_state==='0'?'flex':"none",marginLeft:20,width:200,height:30,marginBottom:20}}
                        value="拒绝"
                        onClick={()=>{
                            this.openTip("确认拒绝?",()=>{
                                this.getDataByPost(3,information_homeUrl+"/positionController/v1.0/updateMaterial",
                                    {material_id:this.state.material_id,material_state:'2'})
                            });
                        }}/>

                </div>




            </div>
        )
    }
}



module.exports=MaterialDetail;
