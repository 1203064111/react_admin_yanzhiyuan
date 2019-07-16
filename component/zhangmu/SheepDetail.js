/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class SheepDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            sheepBean:{sheep_state:"1"},
            sheep_id:this.props.params.sheep_id,
            typeBeans:[],
            class_id:'',
            sheepTypeBeans:[
                {name:'1',value:'认养'},
                {name:'2',value:'二人合养'},
        ],
        bitchSheepBeans:[],
        group_index:0,
        group_type:'1',
        sheep_type:'0',


        sheepImgBeans:[]
           
        };
    }

    componentDidMount() {
        if(this.props.params.sheep_id!=="-1"){//编辑
            this.getSheepDetail();
       
        }else{


        }
       
        this.getSheepClassNoPage();
    }


    getSheepClassNoPage(){
        this.getDataByPost(4,sheep_homeurl+"/sheepController/v1.0/getSheepClassNoPage",{})
    }
    getSheepDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getSheepDetail",{sheep_id:this.state.sheep_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    sheepBean:data,
                    bitchSheepBeans:data.sheepBeans,
                    sheepImgBeans:data.sheepImgBeans.concat([{sheep_img:'-1'}])
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
            this.setState(
                {
                    typeBeans:data,
                    class_id:data[0].class_id
                }
            )
            break;
            case 5:
            this.showTip("更新成功");
            
            this.getSheepDetail();
            break;
            case 6:
            this.showTip("添加成功")
            this.getSheepDetail();
            break;

        }
    }

    insertSheep(){
        var params={};
        params["sheep_num"]=this.state.sheepBean.sheep_num;
        params["sheep_name"]=this.state.sheepBean.sheep_name;
        params["sheep_img"]=this.state.sheepBean.sheep_img;
        params["class_id"]=this.isNull(this.state.sheepBean.class_id)?this.state.class_id:this.state.sheepBean.class_id;
        params["sheep_state"]=this.state.sheepBean.sheep_state;
        params["sheep_desc"]=this.state.sheepBean.sheep_desc;
        params['sheep_html_desc']=this.state.sheepBean.sheep_html_desc
        params['sheep_video']=this.state.sheepBean.sheep_video;
        params["sheep_imgs"]=JSON.stringify(this.state.sheepImgBeans);
        params["sheep_source"]=this.state.sheepBean.sheep_source;

        if(this.state.sheep_id==="-1"){
         
            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/insertSheep",params);
        }else{
            params["sheep_id"]=this.state.sheepBean.sheep_id;
            this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/updateSheep",params);
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
                    url_desc={this.state.sheepBean.sheep_html_desc}
                    onChange={(desc)=>{
                        this.state.sheepBean.sheep_html_desc=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }
    render(){
        let baseData=[];
        if(this.state.bitchSheepBeans.length>=1){
            baseData=[
                {name:'ID',flex:'1',key:'sheep_id',type:'text'},
                {name:'名字',flex:1,key:'sheep_name'},
                {name:'状态',flex:1,key:'sheep_state', type:'radio_select'},
                {name:'总数量',flex:'1',key:'sheep_num',},
                {name:'上架数量',flex:1,key:'sheep_use_num',type:'text'},
                {name:'图片',flex:'1',key:'sheep_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'视频',flex:'1',key:'sheep_video',type:'video',img_style:{width:100,height:100,marginLeft:10}},
                {name:'种类',flex:1,key:'class_sign',type:'text'},
                {name:'产地',flex:'1',key:'sheep_source',type:'text'},
                {name:'描述',flex:'1',key:'sheep_desc',type:'textarea'},
            ]

        }else{
            baseData=[
                {name:'ID',flex:'1',key:'sheep_id',type:'text'},
                {name:'名字',flex:1,key:'sheep_name'},
                {name:'状态',flex:1,key:'sheep_state', type:'radio_select'},
                {name:'总数量',flex:'1',key:'sheep_num'},
                {name:'上架数量',flex:1,key:'sheep_use_num',type:'text'},
                {name:'图片',flex:'1',key:'sheep_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'视频',flex:'1',key:'sheep_video',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'种类',flex:"1",key:'class_sign',type:'select',data:this.state.typeBeans,show_value:"class_sign",select_value:"class_id"},
                {name:'产地',flex:'1',key:'sheep_source',},
                {name:'描述',flex:'1',key:'sheep_desc',type:'textarea'},
            ]

        }
       
       
        return(
            <div>
                <Widget.Toolbar title={"详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.sheepBean}
                    onSave={()=>{
                        this.insertSheep();
                    }}
                    onChange={(key,value,index)=>{
                        this.state.sheepBean[key]=value;
                        this.refresh();
                    }}
                    >
                    {this.renderDetail()}
                    </Widget.Detail>
                <div>
                <Widget.Detail
                    title="详情"
                    baseData={[]}
                    data={{}}>
                    <Widget.Foreach
                        style={{display:'flex',overflow:'auto'}}
                        dataSource={this.state.sheepImgBeans}
                        renderRow={(rowID)=>{
                            return(
                                <div style={{display:'flex'}}>
                                    <Widget.Img
                                        title_style={{display:'none'}}
                                        img_style={{width:80,height:80,marginLeft:10}}
                                        src={this.state.sheepImgBeans[rowID].sheep_img==="-1"?"./images/add.jpg":imgurl+this.state.sheepImgBeans[rowID].sheep_img}
                                        url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                        onSuccess={(value)=>{
                                            if(this.state.sheepImgBeans[rowID].sheep_img==="-1"){
                                                this.setState({
                                                    sheepImgBeans:([{sheep_img:value}]).concat(this.state.sheepImgBeans)
                                                })
                                            }else{
                                                this.state.sheepImgBeans[rowID].sheep_img=value;
                                                this.refresh();
                                            }
                                        }}/>
                                    <div style={{display:this.state.sheepImgBeans[rowID].sheep_img==='-1'?"none":"flex"}}
                                         className={"Hui-iconfont Hui-iconfont-close2"}
                                         onClick={()=>{
                                             this.state.sheepImgBeans.splice(rowID,1);
                                             this.refresh();
                                         }}>
                                    </div>
                                </div>
                            )
                        }}/>
                </Widget.Detail>




                <Widget.Detail
                title={"分期设置"}
                data={{}}
                baseData={[]}
                >
                    <div style={{display:'flex',alignItems:'center',marginTop:30}}>
                    <Widget.Select
                    title="类型"
                    dataSource={this.state.sheepTypeBeans}
                    selectWidth={80}
                    selectHeight={32}
                    select_value="name"
                    show_value="value"
                    is_must="false"
                    marginLeft={20}
                    onChange={
                        (index)=>{
                                this.setState({
                                    sheep_type:this.state.sheepTypeBeans[index].name+""==="1"?"0":"1",
                                    group_type:this.state.sheepTypeBeans[index].name
                                })
                        }
                    }
                    />
                    <Widget.Editor
                            style={{marginLeft:10}}
                            title_style={{display:'none'}}
                            placeholder="价格"
                            value={this.state.sheep_price}
                            onChange={(value)=>{
                                this.setState({
                                    sheep_price:value
                                })
                            }}/>
                     <Widget.Editor
                            style={{marginLeft:10}}
                            title_style={{display:'none'}}
                            placeholder="数量"
                            value={this.state.sheep_num}
                            onChange={(value)=>{
                                this.setState({
                                    sheep_num:value
                                })
                            }}/>
                    
                    <Widget.Button
                            style={{marginLeft:10}}
                            value="添加"
                            onClick={()=>{
                                if(this.isNull(this.state.sheep_price)){
                                    this.showTip("价格不可为空")
                                    return;

                                }
                                if(this.isNull(this.state.sheep_num)){
                                    this.showTip("数量不可为空")
                                    return;

                                }
                                this.getDataByPost(6,sheep_homeurl+"/sheepController/v1.0/insertBitchSheep",
                                {sheep_id:this.state.sheepBean.sheep_id,
                                sheep_name:this.state.sheepBean.sheep_name,
                                sheep_type:this.state.sheep_type,
                                group_type:this.state.group_type,
                                class_id:this.state.sheepBean.class_id,
                                sheep_state:'0',
                                sheep_price:this.state.sheep_price,
                                sheep_num:this.state.sheep_num,
                                sheep_img:this.state.sheepBean.sheep_img,
                                sheep_desc:this.state.sheepBean.sheep_desc,
                                sheep_html_desc:this.state.sheepBean.sheep_html_desc,
                                sheep_bitch_num:this.state.sheepBean.sheep_bitch_num,

                            });
                                               
                             }}/>

                </div>
                <Widget.List
                data={[
                    {name:"ID",flex:1,key:'bitch_sheep_id'},
                    {name:'类型',flex:1,key:'sheep_type_show'},
                    {name:'合养',flex:1,key:'group_type_show'},
                    {name:'期数',flex:1,key:'sheep_bitch'},
                    {name:'上架数量',flex:1,key:'sheep_bitch_num',},
                    {name:'数量',flex:1,key:'sheep_num',},
                    {name:'价格',flex:1,key:'sheep_price',type:'input'},
                    {name:"状态",flex:1,key:'sheep_state',type:'radio_select'},
                    {name:"图片",flex:1,key:'sheep_img',type:'img'},
                    {name:'耳标范围',flex:1,key:'ear_range',type:'text'},
                    {name:'创建时间',flex:1,key:'create_time'},
                    {name:"操作",flex:2,key:"-1"}]}
                dataSource={this.state.bitchSheepBeans}
                onChange={
                    
                    (rowID,key,value)=>{
                        if(key==="sheep_state"){
                            this.getDataByPost(5,sheep_homeurl+"/sheepController/v1.0/updateBitchSheep",
                            {bitch_sheep_id:this.state.bitchSheepBeans[rowID].bitch_sheep_id,
                                sheep_state:value});
                        }else{
                    this.state.bitchSheepBeans[rowID][key]=value;
                        }
                    this.refresh();

                    }
                }
                operationData={[{title:"详情"},{title:'保存'}]}
                operationClick={(rowID,index)=>{
                    switch (index){
                        case 0:
                            this.props.history.push("/bitch_sheep_detail/"+this.state.bitchSheepBeans[rowID].bitch_sheep_id+"");
                            break;
                            case 1:
                            this.getDataByPost(5,sheep_homeurl+"/sheepController/v1.0/updateBitchSheep",
                            {bitch_sheep_id:this.state.bitchSheepBeans[rowID].bitch_sheep_id,
                                sheep_price:this.state.bitchSheepBeans[rowID].sheep_price,

                            });

                            break;
                    }
                }}>

                </Widget.List>

               
                </Widget.Detail>
               </div>
            </div>
        )
    }

   

}

module.exports=SheepDetail;