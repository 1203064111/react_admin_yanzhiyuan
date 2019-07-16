/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Video extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            videoBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getVideos();
    }
    getVideos(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getVideos"
            ,{page:this.state.page,},{type:2})
    }

    deleteVideos(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteVideo",{video_id:this.state.video_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    videoBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getVideos();
                break;
            case 3:
                this.getVideos();
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
                                this.deleteVideos();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"羊列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/video_detail/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'video_id'},
                        {name:"名称",flex:1,key:'video_title'},
                        {name:'直播类型',flex:1,key:'video_type_show'},
                        {name:"图片",flex:1,key:'video_img',type:'img_click'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                               
                                this.state.videoBeans[rowID][key]=value;
                                this.refresh();
                            }
                        }
                    dataSource={this.state.videoBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/video_detail/"+this.state.videoBeans[rowID].video_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    video_id:this.state.videoBeans[rowID].video_id
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
                            this.getVideos()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Video;