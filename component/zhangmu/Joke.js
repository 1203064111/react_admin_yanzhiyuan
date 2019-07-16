import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class Joke extends Widget.Base{

    constructor(props){
           super(props);
           this.state={
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            jokeBean:{},
            jokeBeans:[],
            page:1,
            total:0,
           }
    }

    componentDidMount() {
     this.getjokeDetail();
     this.getJokes();      
    }
    getJokes(){
        this.getDataByPost(5,sheep_homeurl+"/sheepController/v1.0/getJokes",{page:this.state.page},{type:2});
    }
    getjokeDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getjokeDetail",{is_use:'1'});
    }
    
    updateJoke(){
        var params={};
        params['joke_id']=this.state.jokeBean.joke_id;
        params['joke_title']=this.state.jokeBean.joke_title;
        params['joke_img']=this.state.jokeBean.joke_img;
        params['qr_code']=this.state.jokeBean.qr_code;
        params['joke_desc']=this.state.jokeBean.joke_desc
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateJoke",params);
    }
    doSuccess(index,data){

        switch(index){
            case 1:
            this.setState(
                {
                    jokeBean:data
                }
            )
            
            break;
            case 2:
            this.showTip("更新成功");
            this.getjokeDetail();
            break;
            case 3:
            this.showTip("删除成功");
            this.getJokes();
            break;
            case 4:
            this.showTip("启用成功");
            this.getjokeDetail();
            this.getJokes();
            break;
            case 5:
            this.setState(
                {
                    jokeBeans:data.data,
                    total:data.total,
                }
            )
            break;
            case 6:
            this.showTip("导入成功");
            this.getJokes
            break;

            
            

        }

    }

    render(){
        let baseData=[];
        baseData=[
            {name:'题注',flex:1,key:'joke_title'},
            {name:'语录',flex:1,key:'joke_desc'},
            {name:'图片',flex:1,key:'joke_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        ]
        
       
        return(
            <div>
                 <Widget.Toolbar title={"经典语录"} history={this.props.history}></Widget.Toolbar>
                 <Widget.Detail
                    title="详情"
                    baseData={baseData}
                    data={this.state.jokeBean}
                    onSave={()=>{
                        this.updateJoke();
                    }}
                    onChange={(key,value,index)=>{
                        this.state.jokeBean[key]=value;
                        this.refresh();
                    }}
                    />
                    <Widget.Detail
                    title="语录库"
                    baseData={[]}
                    data={{}}
                    renderButton={
                        ()=>{ 
                        return(
                        <div style={{display:'flex',alignItems:'center',justifyContent:'flex-start',flex:1}}>
                       <Widget.ImgButton
                       url={sheep_homeurl+"/sheepController/v1.0/importJokeImgs"}
                       value1="图片上传（zip)"
                       onSuccess={
                           ()=>{
                            this.showTip("上传成功");
                            this.getJokes(); 

                           } 
                           
                       }
                       />
                       <Widget.ImgButton
                        url={sheep_homeurl+"/sheepController/v1.0/importJokes"}
                        value1="语录上传"
                        onSuccess={
                            ()=>{
                             this.showTip("上传成功");
                             this.getJokes(); 
                            } 
                        }
                       />
                        </div>
                        )
                    }}>
                    <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'joke_id'},
                        {name:'题注',flex:1,key:'joke_title'},
                        {name:"语录",flex:2,key:'joke_desc'},
                        {name:"图片",flex:1,key:'joke_img'},
                        {name:'状态',flex:1,key:'is_use_show'},
                        {name:"导入时间",flex:2,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                        operationData={[{title:'启用'},{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                this.getDataByPost(4,sheep_homeurl+"/sheepController/v1.0/useJoke",{joke_id:this.state.jokeBeans[rowID].joke_id});

                                break;
                                case 1:
                                   this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/deleteJoke",{joke_id:this.state.jokeBeans[rowID].joke_id});
                                break;
                            }
                        }}
                    dataSource={this.state.jokeBeans}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getJokes()
                        })
                    }}>
                </Widget.List>  




                    </Widget.Detail>

            </div>
        )
    }

   


}
module.exports=Joke;