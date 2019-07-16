/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");
class BitchSheepDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            bitch_sheep_id:{},
            bitch_sheep_id:this.props.params.bitch_sheep_id,
            bitchSheepBean:{},
            sheepEarBeans:[],
        page:1,
        total:0,
        };
    }

    componentDidMount() {
        this.getBitchSheepDetail();
        this.getSheepEars();
    
    }

    getBitchSheepDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getBitchSheepDetail",{bitch_sheep_id:this.state.bitch_sheep_id});
    }
    getSheepEars(){
        this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/getSheepEars",
        {page:this.state.page,
            bitch_sheep_id:this.state.bitch_sheep_id,
        },{type:2})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    bitchSheepBean:data,
                })
                break;
            case 2:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
                case 3:
                this.setState({
                    sheepEarBeans:data.data,
                    total:data.total
                },()=>{
                    console.log(this.state.sheepEarBeans)
                    
                })
                break;

        }
    }

    updateBitchSheep(){
        var params={};
        params["sheep_title"]=this.state.bitchSheepBean.sheep_title
        params["sheep_num"]=this.state.bitchSheepBean.sheep_num;
        params["sheep_name"]=this.state.bitchSheepBean.sheep_name;
        params["sheep_img"]=this.state.bitchSheepBean.sheep_img;
        params["class_id"]=this.isNull(this.state.bitchSheepBean.class_id)?this.state.class_id:this.state.bitchSheepBean.class_id;
        params["sheep_state"]=this.state.bitchSheepBean.sheep_state;
        params["sheep_id"]=this.state.bitchSheepBean.sheep_id;
        params['sheep_desc']=this.state.bitchSheepBean.sheep_desc;
        params['sheep_html_desc']=this.state.bitchSheepBean.sheep_html_desc;
        params["bitch_sheep_id"]=this.state.bitch_sheep_id

            this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updateBitchSheep",params);
        
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
                    url_desc={this.state.bitchSheepBean.sheep_html_desc}
                    onChange={(desc)=>{
                        this.state.bitchSheepBean.sheep_html_desc=desc;
                        this.refresh();
                    }}/>
            </Widget.Detail>
        )
    }

    render(){
        let baseData=[];

            baseData=[
                {name:'ID',flex:'1',key:'bitch_sheep_id',type:'text'},
                {name:'名字',flex:1,key:'sheep_name'},
                {name:'标题',flex:1,key:'sheep_title'},
                {name:'状态',flex:1,key:'sheep_state', type:'radio_select'},
                {name:'数量',flex:'1',key:'sheep_num',type:'text'},
                {name:'图片',flex:'1',key:'sheep_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                {name:'视频',flex:'1',key:'sheep_video',type:'video',img_style:{width:100,height:100,marginLeft:10}},
                {name:'种类',flex:1,key:'class_id',type:'text'},
                {name:'期数',flex:1,key:'sheep_bitch',type:'text'},
                {name:'耳标',flex:1,key:'ear_range',type:'text'},
                {name:'产地',flex:'1',key:'sheep_resource',type:'text'},
                {name:'描述',flex:'1',key:'sheep_desc',type:'textarea'},
            ]
       
        return(
            <div>
                <Widget.Toolbar title={"分期详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.bitchSheepBean}
                    onSave={()=>{
                        this.updateBitchSheep();
                    }}
                    onChange={(key,value,index)=>{
                        this.state.bitchSheepBean[key]=value;
                        this.refresh();
                    }}
                    >
                    {this.renderDetail()}
                    </Widget.Detail>
                <div>
                <Widget.Detail
                title={"养只详细"}
                data={{}}
                baseData={[]}
                renderButton={
                    ()=>{
                        return(
                          <div  style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}} >
                                 <Widget.Button
                                  marginRight={20}
                                  value="模板下载"
                                  onClick={()=>{
                                  window.open(imgurl+"/"+this.state.bitchSheepBean.sheep_excel_url)
                                  }}/>


                         <Widget.ImgButton
                        marginLeft={20}
                        value1="excel导入"
                        url={sheep_homeurl + "/sheepController/v1.0/importEarSignExcel2"}
                        onSuccess={(data)=> {
                            this.showTip("导入成功");
                            this.getBitchSheepDetail;
                            this.getSheepEars()
                     }}/>
                     
                    </div>
                        )
                    }
                }
                >
               
                <Widget.List
                data={[
                    {name:"ID",flex:1,key:'ear_id'},
                    {name:'耳标',flex:1,key:'ear_sign'},
                    {name:'羊重',flex:1,key:'sheep_kg'},
                    {name:'羊舍',flex:1,key:'sheep_room'},
                    {name:"操作",flex:2,key:"-1"}]}
               
                onChange={
                    (rowID,key,value)=>{
                    this.state.sheepEarBeans[rowID][key]=value;
                    this.refresh();
                    }
                }
                dataSource={this.state.sheepEarBeans}
                operationData={[{title:"保存"}]}
                operationClick={(rowID,index)=>{
                    switch (index){
                        case 0:         

                            break;
                    }
                }}
                page={this.state.page}
                total={this.state.total}
                onPage={(page)=>{
                    this.setState({
                        page:page
                    },()=>{
                        this.getSheepEars()
                    })
                }}
                >

                </Widget.List>

               
                </Widget.Detail>
               </div>
            </div>
        )
    }

   

}

module.exports=BitchSheepDetail;