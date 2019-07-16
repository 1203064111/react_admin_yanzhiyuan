/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameJoke extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameJokeBeans:[],
            total:'',
            page:1,
           
        };
    }

    componentDidMount() {
        this.getGameJokes();
    }
    getGameJokes(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameJokes",{page:this.state.page},{type:2})
    }
    deleteGameJoke(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteGameJoke",{joke_id:this.state.joke_id})

    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameJokeBeans:data.data,
                    total:data.total,
                   
                });
                break;
                case 2:
                this.showTip("删除成功");
                this.getGameJokes();
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
             <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteGameJoke();
                            }}></Widget.Tip>
               
                <Widget.Toolbar title={"游戏弹出语"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/game_joke_detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'joke_id'},
                        {name:"弹出语",flex:1,key:'joke_desc'},
                        {name:'创建时间',flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                       
                       
                    dataSource={this.state.gameJokeBeans}
                    operationData={[{title:"编辑"},{title:'删除'}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/game_joke_detail/"+this.state.gameJokeBeans[rowID].joke_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    joke_id:this.state.gameJokeBeans[rowID].joke_id
                                })
                                break;

                        }
                    }}
                   
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getGameJokes()
                        })
                    }}>
                    
                    >
                </Widget.List>
            </div>
        );
    }
}

module.exports=GameJoke;