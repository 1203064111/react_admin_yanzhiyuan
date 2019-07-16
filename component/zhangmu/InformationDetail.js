/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class InformationDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            informationBean:{information_state:"0",},
            information_id:this.props.params.information_id,
            
            
        };
    }

    componentDidMount() {
        if(this.props.params.information_id!=="-1"){//添加
            this.getInformationDetail();
        }
    }

    getInformationDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getInformationDetail",{information_id:this.state.information_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    informationBean:data,
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
                case 4:
                this.showTip("发布成功");
                this.props.history.goBack();
                break
        }
    }

    insertInformation(){
        var params={};
        params["information_title"]=this.state.informationBean.information_title;
        params["information_img"]=this.state.informationBean.information_img;
        params["information_resource"]=this.state.informationBean.information_resource;
        params["information_author"]=this.state.informationBean.information_author;
        
        

        if(this.state.information_id==="-1"){
         
            params["information_url_desc"]=this.state.informationBean.information_url_desc;
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertInformation",params);
        }else{
            params["information_id"]=this.state.information_id;
            if(this.state.informationBean.information_state+""==="0"){
            params["information_url_desc"]=this.state.informationBean.information_url_desc;
            }
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateInformation",params);
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
                    url_desc={this.state.informationBean.information_url_desc}
                    onChange={(desc)=>{
                        this.state.informationBean.information_url_desc=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }


    render(){
        let baseData=[];
        if(this.state.informationBean.information_state+""==="1"){
            baseData=[
                {name:'标题',flex:'1',key:'information_title',type:'text'},
                {name:'作者',flex:'1',key:'information_author',type:'text'},
                {name:'素材来源',flex:'1',key:'information_resource',type:'text'},
                {name:'图片',flex:1,key:'information_img',type:'img_click',img_style:{width:100,height:100,marginLeft:10}},
                {name:'创作时间',flex:1,key:'create_time',type:'text'}
               
            ];
            
        }else{
            baseData=[
                {name:'标题',flex:'1',key:'information_title'},
                {name:'作者',flex:'1',key:'information_author'},
                {name:'素材来源',flex:'1',key:'information_resource'},
                {name:'图片',flex:1,key:'information_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'创作时间',flex:1,key:'create_time',type:'text'}
               
            ];
         
        }

        
         
        return(
            <div>
                <Widget.Toolbar title={"资讯详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.informationBean}
                    onChange={(key,value,index)=>{
                        this.state.informationBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:"flex",alignItems:'center',justifyContent:'flex-end',flex:2}} >
                                <div  style={{display:this.state.informationBean.information_state+""==="0"?"flex":"none",marginRight:'20'}}>
                                 <Widget.Button
                                 style={{marginRight:20}}
                                  value="保存"
                                  onClick={()=>{
                                    this.insertInformation();
                                  }}/>
                               
                                 <Widget.Button
                                  style={{marginRight:20}}
                                  value="发布"
                                  onClick={()=>{
                                      if(this.isNull(this.state.informationBean.information_id)){
                                          this.showTip("请先保存文本")
                                          return;

                                      }
                                    this.getDataByPost(4,sheep_homeurl+"/sheepController/v1.0/pushInformation",{
                                        information_id:this.state.informationBean.information_id,
                                        information_state:'1',
                                        information_title:this.state.informationBean.information_title,
                                        information_img:this.state.informationBean.information_img,
                                        information_resource:this.state.informationBean.information_resource,
                                        information_author:this.state.informationBean.information_author,
                                        information_url_desc:this.state.informationBean.information_url_desc,
        
        
                                    });
                                  }}/>
                                </div>
                                  
                                </div>
                            )

                        }
                    }
                   />
                    {this.renderDetail()}
            </div>
        )
    }
}

module.exports=InformationDetail;