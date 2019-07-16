import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class GameConfig extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            GameConfigBeans:[],
            sheepImgBean:{},
        };
    }
    componentDidMount() {
        this.getGameConfigs();
        this.getSheepImgConfigs();
    }
    getSheepImgConfigs(){
        this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/getSheepImgConfigs",{img_conf_id:1});
    }

    getGameConfigs(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getGameConfigs",{});
    }


    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    GameConfigBeans:data
                })
                break;
            case 2:
                this.showTip("设置成功")
                this.getGameConfigs()
                break;
           case 3:
           this.setState(
               {
                sheepImgBean:data
               }
           )
           break;
           case 4:
           this.showTip("设置成功")
           this.getSheepImgConfigs();
           break;
        }
    }

    updateGameConfg(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateGameConfg",
            {json:JSON.stringify(this.state.GameConfigBeans)});
    }
    updateSheepImgConfig(){
       var params={};
       params["init_img2"]=this.state.sheepImgBean.init_img2;
       params["init_img"]=this.state.sheepImgBean.init_img;
       params["ill_img"]=this.state.sheepImgBean.ill_img;
       params["feed_img"]=this.state.sheepImgBean.feed_img;
       params["hello_img"]=this.state.sheepImgBean.hello_img;
       params["crue_img"]=this.state.sheepImgBean.crue_img;
       params["hunger_img"]=this.state.sheepImgBean.hunger_img;
       params["foot_img"]=this.state.sheepImgBean.foot_img;
       params["sleep_img"]=this.state.sheepImgBean.sleep_img;
       params["happy_img"]=this.state.sheepImgBean.happy_img;
       params["ill_img2"]=this.state.sheepImgBean.ill_img2;
       params["feed_img2"]=this.state.sheepImgBean.feed_img2;
       params["hello_img2"]=this.state.sheepImgBean.hello_img2;
       params["crue_img2"]=this.state.sheepImgBean.crue_img2;
       params["hunger_img2"]=this.state.sheepImgBean.hunger_img2;
       params["foot_img2"]=this.state.sheepImgBean.foot_img2;
       params["sleep_img2"]=this.state.sheepImgBean.sleep_img2;
       params["happy_img2"]=this.state.sheepImgBean.happy_img2;
       params["img_conf_id"]=this.state.sheepImgBean.img_conf_id;
       params["day_img"]=this.state.sheepImgBean.day_img;
       params["night_img"]=this.state.sheepImgBean.night_img;



        this.getDataByPost(4,sheep_homeurl+"/sheepController/v1.0/updateSheepImgConfig",params );

    }
     render(){
         return(
             <div>
                 {this.renderGameConfig()}
                 {this.renderMemberGameImgConf()}
                 {this.renderSheepImgConf()}
             </div>
         )
     }


    


    renderGameConfig(){

        return(
            <div>
              
                <Widget.Detail
                 title="游戏配置"
                    baseData={[]}
                    data={{}}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}} >
                                 <Widget.Button
                                 style={{marginRight:'30',width:'40',}}
                                 value="保存"
                                 onClick={()=>{
                                 this.updateGameConfg();
                                 }}/>
                                </div>
                            )
                        }
                    }
                    >
               
                   
               <Widget.Foreach
                        style={{display:'flex',overflow:'auto',flex:1}}
                        dataSource={this.state.GameConfigBeans}
                        count='3'
                        renderRow={(rowID)=>{
                            return(
                            <div style={{display:'flex',alignItems:'center',marginTop:20}}>
                            <Widget.Editor
                           title_style={{width:150}}
                           title_p_style={{display:"flex"}}
                           input_style={{marginLeft:10,width:150}}
                            title={this.state.GameConfigBeans[rowID].conf_name}
                            value={this.state.GameConfigBeans[rowID].conf_value}
                            onChange={(value)=>{
                                this.state.GameConfigBeans[rowID].conf_value=value;
                                this.refresh();
                                
                            }}/>
                            </div>
                            )
                        }}/>
                        </Widget.Detail>
          
            </div>
        )
    }
    renderMemberGameImgConf(){
        let baseData=[];
        baseData=[
            {name:'白天',flex:1,key:'day_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'黑夜',flex:1,key:'night_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},]

            return(
                <div>
                    <Widget.Detail
               
               title="游戏背景图"
                baseData={baseData}
                data={this.state.sheepImgBean}
                onChange={(key,value,index)=>{
                    this.state.sheepImgBean[key]=value;
                    this.refresh();
                }}
                renderButton={
                    ()=>{
                        return(
                            <div  style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}} >
                             <Widget.Button
                             style={{marginRight:'30',width:'40',}}
                             value="保存"
                             onClick={()=>{
                             this.updateSheepImgConfig();
                             }}/>
                            </div>
                        )
                    }
                } >
                    </Widget.Detail>

                </div>
            )
    }

 
    renderSheepImgConf(){
        let baseData=[];
        baseData=[
            {name:'初始状态',flex:1,key:'init_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'生病',flex:1,key:'ill_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'喂食',flex:1,key:'feed_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'打招呼',flex:1,key:'hello_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'治疗',flex:1,key:'crue_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'饥饿',flex:1,key:'hunger_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'散步',flex:1,key:'foot_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'睡觉',flex:1,key:'sleep_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'开心',flex:1,key:'happy_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            
        ]
       let baseData2=[
        {name:'初始状态',flex:1,key:'init_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'生病',flex:1,key:'ill_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'喂食',flex:1,key:'feed_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'打招呼',flex:1,key:'hello_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'治疗',flex:1,key:'crue_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'饥饿',flex:1,key:'hunger_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'散步',flex:1,key:'foot_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'睡觉',flex:1,key:'sleep_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},
        {name:'开心',flex:1,key:'happy_img2',type:'img',img_style:{width:100,height:100,marginLeft:10}},]

        return(
            <div style={{display:'flex'}}>


           
                 
                    
                   
                <Widget.Detail
               
                   title="羊只初始化（小）"
                    baseData={baseData}
                    data={this.state.sheepImgBean}
                    onChange={(key,value,index)=>{
                        this.state.sheepImgBean[key]=value;
                        console.log(this.state.sheepImgBean)
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}} >
                                 <Widget.Button
                                 style={{marginRight:'30',width:'40',}}
                                 value="保存"
                                 onClick={()=>{
                                 this.updateSheepImgConfig();
                                 }}/>
                                </div>
                            )
                        }
                    } >
                        </Widget.Detail>
                        <Widget.Detail
               
                   title="羊只初始化（大）"
                    baseData={baseData2}
                    data={this.state.sheepImgBean}
                    onChange={(key,value,index)=>{
                        this.state.sheepImgBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}} >
                                 <Widget.Button
                                 style={{marginRight:'30',width:'40',}}
                                 value="保存"
                                
                                 onClick={()=>{
                                 this.updateSheepImgConfig();
                                 }}/>
                                </div>
                            )
                        }
                    }
                    >
               
                        </Widget.Detail>
          
            </div>
        )
    }






}

module.exports=GameConfig;