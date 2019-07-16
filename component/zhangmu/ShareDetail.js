/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class ShareDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            shareBean:{},
            share_id:this.props.params.share_id,
        };
    }

    componentDidMount() {
        if(this.props.params.share_id!=="-1"){//添加
            this.getShareDetail();
        }
    }

    getShareDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getShareDetail",{share_id:this.state.share_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    shareBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
                
        }
    }

    insertShare(){
        var params={};

        params["share_title"]=this.state.shareBean.share_title;
        params["share_img"]=this.state.shareBean.share_img;
        params["share_desc"]=this.state.shareBean.share_desc;


        if(this.state.share_id==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertShare",params);
        }else{
            params["share_id"]=this.state.share_id;
            
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateShare",params);
        }
    }
  


    render(){
        let baseData=[];
        baseData=[
            {name:'标题',flex:1,key:'share_title'},
            {name:'图片',flex:1,key:'share_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'描述',flex:1,key:'share_desc',type:'textarea'},
        ]
         
        return(
            <div>
                <Widget.Toolbar title={"分享页面编辑"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.shareBean}
                    onChange={(key,value,index)=>{
                        this.state.shareBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:"flex",alignItems:'center',justifyContent:'flex-end',flex:2}} >
                               
                                 <Widget.Button
                                 style={{marginRight:20}}
                                  value="保存"
                                  onClick={()=>{
                                    this.insertShare();
                                  }}/>
                               
                                </div>
                            )

                        }
                    }
                   />
                   
            </div>
        )
    }
}

module.exports=ShareDetail;