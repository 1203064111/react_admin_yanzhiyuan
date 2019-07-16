/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GamePhoto extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            gamePhotoBeans:[],
            total:'',
            page:1,
           
        };
    }

    componentDidMount() {
        this.getGamePhotos();
    }
    getGamePhotos(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGamePhotos",{page:this.state.page},{type:2})
    }
    deleteGamePhoto(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteGamePhoto",{photo_id:this.state.photo_id})

    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    gamePhotoBeans:data.data,
                    total:data.total,
                   
                });
                break;
                case 2:
                this.showTip("删除成功");
                this.getGamePhotos();
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
                                this.deleteGamePhoto();
                            }}></Widget.Tip>
               
                <Widget.Toolbar title={"截屏图片"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        style={{display:"flex",marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/game_photo_Detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'photo_id'},
                        {name:"语录",flex:1,key:'photo_desc'},
                        {name:'图片',flex:1,key:'photo_img',type:'img'},
                        {name:"操作",flex:2,key:"-1"}]}
                       
                       
                    dataSource={this.state.gamePhotoBeans}
                    operationData={[{title:"编辑"},{title:'删除'}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/game_photo_Detail/"+this.state.gamePhotoBeans[rowID].photo_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    photo_id:this.state.gamePhotoBeans[rowID].photo_id
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
                            this.getGamePhotos()
                        })
                    }}>
                    
                    >
                </Widget.List>
            </div>
        );
    }
}

module.exports=GamePhoto;