/**
 * Created by Administrator on 2018/7/6.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class TaskClassEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            class_id:this.props.params.class_id,
            taskClassBeans:[],
        };
    }

    componentDidMount() {

        this.getTaskClassDetail();

    }


    getTaskClassDetail(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getTaskClassDetail",{class_id:this.state.class_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    taskClassBeans:data,
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

    insertTaskClass(){

        var params={};
        params["class_name"]=this.state.taskClassBeans.class_name;
        params["class_type"]=this.state.taskClassBeans.class_type;
        params["class_monnaie"]=this.state.taskClassBeans.class_monnaie;
        params["class_img"]=this.state.taskClassBeans.class_img;
        params["task_num"]=this.state.taskClassBeans.task_num;




        if(this.state.class_id==="-1"){
            this.getDataByPost(2,member_homeurl+"/memberController/v1.0/insertTaskClass",params)
        }else{
            params["class_id"]=this.state.class_id;
            this.getDataByPost(3,member_homeurl+"/memberController/v1.0/updateTaskClass",params)
        }

    }

    render(){

        return(
            <div>
                <Widget.Toolbar title={"任务详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.class_id==="-1"){
            baseData=[{name:"任务名称",flex:1,key:'class_name'},
                {name:"任务编码",flex:1,key:'class_type'},
                {name:"任务颜值币",flex:1,key:'class_monnaie'},

                {name:'任务图标',flex:1,key:'class_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:"任务总进度数",flex:1,key:'task_num'},];
        }else{
            baseData=[{name:"ID",flex:1,key:'class_id',type:'text'},
                {name:"任务名称",flex:1,key:'class_name'},
                {name:"任务编码",flex:1,key:'class_type',type:'text'},
                {name:"任务颜值币",flex:1,key:'class_monnaie'},
                {name:'任务图标',flex:1,key:'class_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:"任务总进度数",flex:1,key:'task_num'},

                {name:"创建时间",flex:1,key:'create_time',type:'textDate'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.taskClassBeans}
                    onChange={(key,value)=>{
                        this.state.taskClassBeans[key]=value;
                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertTaskClass();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=TaskClassEditor;
