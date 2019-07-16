/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameTask extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameTaskBeans:[],
           
        };
    }

    componentDidMount() {
        this. getGameTasks();
    }
    getGameTasks(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameTasks",{})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameTaskBeans:data,
                   
                });
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
               
                <Widget.Toolbar title={"任务列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'task_id'},
                        {name:"任务名",flex:1,key:'task_name'},
                        {name:'任务经验',flex:1,key:'task_experience'},
                        {name:"限制次数",flex:1,key:'task_num'},
                        {name:'创建时间',flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                       
                       
                    dataSource={this.state.gameTaskBeans}
                    operationData={[{title:"编辑"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/gameTask_Detail/"+this.state.gameTaskBeans[rowID].task_id);
                                break;

                        }
                    }}
                   
                    
                    >
                </Widget.List>
            </div>
        );
    }
}

module.exports=GameTask;