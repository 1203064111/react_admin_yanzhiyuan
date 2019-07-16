/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GamePhotoDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gamePhotoBean:{},
            photo_id:this.props.params.photo_id,
        };
    }

    componentDidMount() {
        if(this.props.params.photo_id!=="-1"){//添加
            this.getGamePhotoDetail();
        }
    }

    getGamePhotoDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGamePhotoDetail",{photo_id:this.state.photo_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gamePhotoBean:data,
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

    updateGamePhoto(){
        var params={};
        params["photo_desc"]=this.state.gamePhotoBean.photo_desc;
        params["photo_img"]=this.state.gamePhotoBean.photo_img;
        if(this.state.photo_id+""==="-1"){
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/insertGamePhoto",params);
        }else{
        params["photo_id"]=this.state.photo_id;
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateGamePhoto",params);
        }
      
        
    }


    render(){
        let baseData=[
            {name:'ID',flex:'1',key:'photo_id',type:'text'},
            {name:'图片',flex:'1',key:'photo_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'尾语',flex:'1',key:'photo_desc',type:'textarea'},
        
        ]
        
        return(
            <div>
                <Widget.Toolbar title={"详情展示"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.gamePhotoBean}
                    onChange={(key,value,index)=>{
                        
                        this.state.gamePhotoBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.updateGamePhoto();
                    }}/>
            </div>
        )
    }
}

module.exports=GamePhotoDetail;