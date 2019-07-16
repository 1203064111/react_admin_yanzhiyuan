/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameGoodsClass extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            GameGoodsClassBeans:[],
        };
    }

    componentDidMount() {
        this.getGameGoodsClass();
    }
    getGameGoodsClass(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameGoodsClass" ,{})}
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    GameGoodsClassBeans:data
                });
                break;
           
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"道具分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'class_id'},
                        {name:"名称",flex:1,key:'class_name'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.GameGoodsClassBeans}
                  
                    operationData={[{title:"编辑"},{title:'查看'}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/game_goods_class_detail/"+this.state.GameGoodsClassBeans[rowID].class_id);
                                break;
                            case 1:
                                this.props.history.push("/gameGoods/"+this.state.GameGoodsClassBeans[rowID].class_id)
                               break;

                        }
                    }}
                   >
                </Widget.List>
            </div>
        );
    }
}

module.exports=GameGoodsClass;