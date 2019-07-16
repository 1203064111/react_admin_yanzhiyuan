/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CameraDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            cameraBean:{},
            camera_id:this.props.params.camera_id,
            video_id:this.props.params.video_id,
           

           
        };
    }

    componentDidMount() {
        if(this.props.params.camera_id!=="-1"){//编辑
            this.getCameraDetail();
           
       
        }
    }
    getCameraDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getCameraDetail",{camera_id:this.state.camera_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    cameraBean:data,
                })
                break;
                case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
                case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break
           

        }
    }

    insertCamera(){
        var params={};
        params['camera_no']=this.state.cameraBean.camera_no;
        params["camera_name"]=this.state.cameraBean.camera_name;
        params['camera_app_url']=this.state.cameraBean.camera_app_url;
        params['camera_pc_url']=this.state.cameraBean.camera_pc_url;
        params["sheep_room"]=this.state.cameraBean.sheep_room;
       
        
        if(this.state.camera_id+""==="-1"){
            params['video_id']=this.state.video_id;

          console.log(params)
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertCamera",params);
        }else{
            params["camera_id"]=this.state.cameraBean.camera_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateCamera",params);
        }
    }


   
    render(){
        let baseData=[];
        baseData=[
            {name:'设备号',flex:1,key:'camera_no'},
            {name:'设备名',flex:1,key:'camera_name'},
            {name:'AppUrl',flex:1,key:'camera_app_url'},
            {name:'PcUrl',flex:1,key:'camera_pc_url'},
            {name:'位置（羊舍）',flex:1,key:'sheep_room'},
        ]
        
        return(
            <div>
                <Widget.Toolbar title={"详情"} history={this.props.history}></Widget.Toolbar>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.cameraBean}
                    onSave={()=>{
                        this.insertCamera();
                    }}
                    onChange={(key,value,index)=>{
                        this.state.cameraBean[key]=value;
                        this.refresh();
                    }}
                    >
                    
                </Widget.Detail>
               
                
            </div>
        )
    }

   

}

module.exports=CameraDetail;