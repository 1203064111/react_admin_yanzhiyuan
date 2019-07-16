/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Broad extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            broadBean:{broad_type:'0'},
            broad_id:this.props.params.broad_id,
            broadTypeBeans:[{name:'无跳转',value:'0'},{name:'资讯详情',value:'1'},{name:'商品详情',value:'2'},{name:'羊只详情',value:'3'},{name:'外链',value:'4'}],


            
        };
    }

    componentDidMount() {
        if(this.props.params.broad_id!=="-1"){//编辑
            this.getBroadDetail();
        }
    }

    getBroadDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getBroadDetail",{broad_id:this.state.broad_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    broadBean:data,
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

    insertBroad(){
        var params={};
        params["broad_title"]=this.state.broadBean.broad_title;
        params["broad_img"]=this.state.broadBean.broad_img;
        params["broad_url"]=this.state.broadBean.broad_url;
        params["broad_desc"]=this.state.broadBean.broad_desc;
        params["broad_type"]=this.state.broadBean.broad_type;
        params["information_id"]=this.state.broadBean.information_id;
        params["goods_id"]=this.state.broadBean.goods_id;
        params["bitch_sheep_id"]=this.state.broadBean.bitch_sheep_id;


        if(this.state.broad_id==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertBroad",params);
        }else{
            params["broad_id"]=this.state.broad_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateBroad",params);
        }
    }


    render(){
        let baseData=[
            {name:'标题',flex:'1',key:'broad_title'},
            {name:'图片',flex:1,key:'broad_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'跳转',flex:1,key:'broad_type',type:'select',data:this.state.broadTypeBeans,select_value:'value',show_value:'name'},
        ]
        
        if(this.state.broadBean.broad_type+""==="0"){
            baseData=baseData;
        }
        else if(this.state.broadBean.broad_type+""==="1"){
            baseData=baseData.concat([
                {name:'资讯ID',flex:'1',key:'information_id'},]);
        }
        else if(this.state.broadBean.broad_type+""==="2"){
            baseData=baseData.concat([
                {name:'商品ID',flex:'1',key:'goods_id'},]);
        }
        else if(this.state.broadBean.broad_type+""==="3"){
            baseData=baseData.concat([
                {name:'分期羊ID',flex:'1',key:'bitch_sheep_id'},]);
        }else{
            baseData=baseData.concat([
                {name:'外链url',flex:'1',key:'broad_url'},]);
        }
        baseData= baseData.concat([ {name:'描述',flex:'1',key:'broad_desc',type:'textarea'},])
        return(
            <div>
                <Widget.Toolbar title={"轮播详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.broadBean}
                    onChange={(key,value,index)=>{
                        this.state.broadBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBroad();
                    }}/>
            </div>
        )
    }
}

module.exports=Broad;