/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameJokeDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameJokeBean:{},
            joke_id:this.props.params.joke_id,
        };
    }

    componentDidMount() {
        if(this.props.params.joke_id!=="-1"){//添加
            this.getGameJokeDetail();
        }
    }

    getGameJokeDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameJokeDetail",{joke_id:this.state.joke_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameJokeBean:data,
                })
                break;
            case 2:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
        } 
    }

    updateGameJoke(){
        var params={};
        params["joke_desc"]=this.state.gameJokeBean.joke_desc;
        if(this.state.joke_id+""==="-1"){
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/insertGameJoke",params);
        }else{
        params["joke_id"]=this.state.joke_id;
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateGameJoke",params);
        }
      
        
    }


    render(){
        let baseData=[
            {name:'ID',flex:'1',key:'joke_id',type:'text'},
            {name:'弹出语',flex:'1',key:'joke_desc',type:'textarea'},
        
        ]
        
        return(
            <div>
                <Widget.Toolbar title={"弹出语详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.gameJokeBean}
                    onChange={(key,value,index)=>{
                        
                        this.state.gameJokeBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.updateGameJoke();
                    }}/>
            </div>
        )
    }
}

module.exports=GameJokeDetail;