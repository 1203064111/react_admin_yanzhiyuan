/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameTaskDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameTaskBean:{},
            task_id:this.props.params.task_id,
        };
    }

    componentDidMount() {
        if(this.props.params.banner_id!=="-1"){//添加
            this.getGameTaskDetail();
        }
    }

    getGameTaskDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameTaskDetail",{task_id:this.state.task_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameTaskBean:data,
                })
                break;
            case 2:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    updateGameTask(){
        var params={};
        params["task_desc"]=this.state.gameTaskBean.task_desc;
        params["task_experience"]=this.state.gameTaskBean.task_experience;
        params["task_num"]=this.state.gameTaskBean.task_num;
        params["task_name"]=this.state.gameTaskBean.task_name;
        params["task_id"]=this.state.task_id;

            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateGameTask",params);
        
    }


    render(){
        let baseData=[
            {name:'任务ID',flex:'1',key:'task_id',type:'text'},
            {name:'任务名',flex:'1',key:'task_name'},
            {name:'经验',flex:'1',key:'task_experience'},
            {name:'完成次数',flex:'1',key:'task_num'},
            {name:'详细描述',flex:'1',key:'task_desc',type:'textarea'},
        
        ]
        
        return(
            <div>
                <Widget.Toolbar title={"任务详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.gameTaskBean}
                    onChange={(key,value,index)=>{
                        
                        this.state.gameTaskBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.updateGameTask();
                    }}/>
            </div>
        )
    }
}

module.exports=GameTaskDetail;