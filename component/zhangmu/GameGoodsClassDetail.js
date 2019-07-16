/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameGoodsClassDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gameGoodsClassBean:{},
            class_id:this.props.params.class_id,
            
            class_name:'分类名',
        };
    }

    componentDidMount() {
       
            this.getGameGoodsClassDetail();
       
    }

    getGameGoodsClassDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameGoodsClassDetail",{class_id:this.state.class_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gameGoodsClassBean:data,
                    class_name:data.class_name
                })
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    updateGameGoodsClass(){
        var params={};
        params["class_name"]=this.state.gameGoodsClassBean.class_name;
        params["class_desc"]=this.state.gameGoodsClassBean.class_desc;
            params["class_id"]=this.state.class_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateGameGoodsClass",params);
      
    }


    render(){
        let baseData=[
            {name:'分类',flex:'1',key:'class_name'},
            {name:'描述',flex:'1',key:'class_desc',type:'textarea'},
          
        ];
        return(
            <div>
                <Widget.Toolbar title={this.state.class_name} ></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.gameGoodsClassBean}
                    onChange={(key,value,index)=>{
                        this.state.gameGoodsClassBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.updateGameGoodsClass();
                    }}/>
            </div>
        )
    }
}

module.exports=GameGoodsClassDetail;