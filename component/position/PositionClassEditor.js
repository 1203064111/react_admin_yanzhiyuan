/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class PositionClassEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            position_class_id:this.props.params.position_class_id,
            positionClassBeans:[],
        };
    }

    componentDidMount() {

        this.getPositionClassDetail();

    }


    getPositionClassDetail(){
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getPositionClass",{position_class_id:this.state.position_class_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    positionClassBeans:data,
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

    insertPositionClass(){

        var params={};
        params["position_class_name"]=this.state.positionClassBeans.position_class_name;




        if(this.state.position_class_id==="-1"){
            this.getDataByPost(2,information_homeUrl+"/positionController/v1.0/insertPositionClass",params)
        }else{
            params["position_class_id"]=this.state.position_class_id;
            this.getDataByPost(3,information_homeUrl+"/positionController/v1.0/updatePositionClass",params)
        }

    }

    render(){

        return(
            <div>
                <Widget.Toolbar title={"工作类型详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.position_class_id==="-1"){
            baseData=[{name:"工作类型名称",flex:1,key:'position_class_name'}];
        }else{
            baseData=[{name:"ID",flex:1,key:'position_class_id',type:'text'},
                {name:"工作类型名称",flex:1,key:'position_class_name'},
                {name:"创建时间",flex:1,key:'create_time',type:'textDate'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.positionClassBeans}
                    onChange={(key,value)=>{
                        this.state.positionClassBeans[key]=value;
                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertPositionClass();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=PositionClassEditor;
