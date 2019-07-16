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
            informationBean:{information_state:"0",member_id:"1"},
            information_id:this.props.params.information_id,
            classBeans:[],
        };
    }

    componentDidMount() {
        if(this.props.params.information_id!=="-1"){//添加
            this.getInformationDetail();
        }
        this.getInformationClasss();
    }
    getInformationClasss(){
        this.getDataByPost(4,information_homeUrl+"/informationController/v1.0/getSystemInformationClasss"
            ,{class_id:"2"})
    }

    getInformationDetail(){
        this.getDataByPost(1,information_homeUrl+"/informationController/v1.0/getSystemInformation",{information_id:this.state.information_id});
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
                this.setState({
                    classBeans:data
                })
                break;
        }
    }

    insertInformation(){
        var params={};
        params["information_title"]=this.state.informationBean.information_title;
        params["information_desc"]=this.state.informationBean.information_desc;
        params["information_img"]=this.state.informationBean.information_img;
        params["information_video"]=this.state.informationBean.information_video;

        params["information_state"]=this.state.informationBean.information_state;
        params["information_url_desc"]=this.state.informationBean.information_url_desc;
        params["class_id"]=this.getNull(this.state.informationBean.class_id,this.state.classBeans[0].class_id);
        params["member_id"]=this.state.informationBean.member_id;
        if(this.state.information_id==="-1"){
            this.getDataByPost(2,information_homeUrl+"/informationController/v1.0/insertSystemInformation",params);
        }else{
            params["information_id"]=this.state.information_id;
            this.getDataByPost(3,information_homeUrl+"/informationController/v1.0/updateSystemInformation",params);
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

        return(
            <div>
                <Widget.Toolbar title={"资讯详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:'标题',flex:'1',key:'information_title'},
                        {name:'简介',flex:'1',key:'information_desc',type:'textarea'},
                        {name:'图片',flex:1,key:'information_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                        {name:'视频',flex:1,key:'information_video',type:'video',img_style:{width:100,height:100,marginLeft:10}},
                        {name:"状态",flex:1,key:'information_state',type:'radio_select'},
                        {name:"分类",flex:1,key:'class_id',type:'select',data:this.state.classBeans,show_value:"class_name",select_value:"class_id"},
                    ]}
                    data={this.state.informationBean}
                    onChange={(key,value,index)=>{
                        this.state.informationBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:"flex",alignItems:'center',justifyContent:'flex-end',flex:2}} >
                                    <div  style={{display:"flex",marginRight:'20'}}>
                                         <Widget.Button
                                          style={{marginRight:20}}
                                          value="保存"
                                          onClick={()=>{
                                            this.insertInformation();
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