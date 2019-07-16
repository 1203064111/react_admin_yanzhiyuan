/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class VideoDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            videoBean:{},
            video_id:this.props.params.video_id,
            videoTypeBeans:[{name:'羊舍直播',value:'house',},{name:'饲料直播',value:'feed'},{name:'分割直播',value:'cut',},{name:'药浴直播',value:'medicine'}],
            cameraBeans:[],

           
        };
    }

    componentDidMount() {
        if(this.props.params.video_id!=="-1"){//编辑
            this.getVideoDetail();
           
       
        }else{
            this.setState(
                {videoBean:{video_type:'house'}

                }
            )
        }
    }
    getVideoDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getVideoDetail",{video_id:this.state.video_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    videoBean:data,
                    cameraBeans:data.cameraBeans
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

    insertVideo(){
        var params={};
        params['video_title']=this.state.videoBean.video_title;
        params["video_type"]=this.state.videoBean.video_type;
        params['video_img']=this.state.videoBean.video_img;
        params['video_app_url']=this.state.videoBean.video_app_url;
        params['video_pc_url']=this.state.videoBean.video_pc_url;
        params['video_html']=this.state.videoBean.video_html;
        params['video_desc']=this.state.videoBean.video_desc;

        if(this.state.video_id+""==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertVideo",params);
        }else{
            params["video_id"]=this.state.videoBean.video_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateVideo",params);
        }
    }


    renderDetail(){
        return(
            <Widget.Detail
                title="图文详情"
                marginBottom={20}
                baseData={[]}
                data={{}}>
                <WangeditorComponent
                    name="html"
                    url_desc={this.state.videoBean.video_html}
                    onChange={(desc)=>{
                        this.state.videoBean.video_html=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }
    render(){
        let baseData=[];
        baseData=[
            {name:'名称',flex:1,key:'video_title'},
            {name:'类型',flex:1,key:'video_type',type:'select',data:this.state.videoTypeBeans,select_value:'value',show_value:'name'},
            {name:'图片',flex:1,key:'video_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'AppUrl',flex:1,key:'video_app_url'},
            {name:'PcUrl',flex:1,key:'video_pc_url'},
            {name:'描述',flex:1,key:'video_desc',type:'textarea'},
        ]
        
        return(
            <div>
                <Widget.Toolbar title={"详情"} history={this.props.history}></Widget.Toolbar>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.videoBean}
                    onSave={()=>{
                        this.insertVideo();
                    }}
                    onChange={(key,value,index)=>{
                        this.state.videoBean[key]=value;
                        this.refresh();
                    }}
                    >
                    {this.renderDetail()}
                </Widget.Detail>
                <Widget.Detail
                    title="设备信息"
                    baseData={[]}
                    data={{}}
                    renderButton={
                        ()=>{
                            return(
                                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}}>
                                     <Widget.Button
                                    style={{marginRight:20}}
                                    value="添加"
                                    onClick={()=>{
                                    this.props.history.push("/camera_detail/-1/"+this.state.video_id);
                                      }}/>
                                </div>
                            )}} >
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'camera_id'},
                        {name:"设备号",flex:1,key:'camera_no'},
                        {name:'设备名',flex:1,key:'camera_name'},
                        {name:"app_Url",flex:1,key:'camera_app_url'},
                        {name:"pc_Url",flex:1,key:'camera_pc_url'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                                this.state.cameraBeans[rowID][key]=value;
                                this.refresh();
                            }
                        }
                    dataSource={this.state.cameraBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/camera_detail/"+this.state.cameraBeans[rowID].camera_id+"/"+this.state.video_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    camera_id:this.state.cameraBeans[rowID].camera_id
                                })
                                break;
                        }
                    }}
                    >
                </Widget.List>          
                            
                     
                    
                </Widget.Detail>
                
            </div>
        )
    }

   

}

module.exports=VideoDetail;