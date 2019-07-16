/**
 * Created by sjb on 18/7/31.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SceneGiveEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            systemAccountBean:systemAccountBean,
            merchants_id:this.getNull(systemAccountBean.merchants_id,"-1"),
            scene_id:this.props.params.scene_id,
            sceneBean:{scene_type:'2'},

            sceneGoodsBeans1:[],

            goodsBeans: [],
            goods_page:1,
            goods_total:0,
            goods_arr:[],
            index:this.props.params.scene_id==="-1"?0:1,


            index1:0,
            index2:0,
            sceneClassBeans:[],
            sceneClassBeans2:[]
        };
    }

    componentDidMount() {
        if(this.state.scene_id!=="-1"){
            this.getSceneDetail();
        }else{
            this.getSceneClassLinks();
        }
    }

    getSceneClassLinks(){
        this.getDataByPost(9,koubei_homeurl+"/sceneController/v1.0/getSceneClassLinks",{})
    }
    getSenceGoodss(){
        this.getDataByPost(6,koubei_homeurl+"/sceneController/v1.0/getSenceGoodss"
            ,{scene_id:this.state.scene_id,scene_goods_type:'1'})
    }

    getSceneDetail(){
        this.getDataByPost(1,koubei_homeurl+"/sceneController/v1.0/getSceneDetail"
            ,{scene_id:this.state.scene_id})
    }

    insertScene(){
        var params={};

        params["class_id"]=this.state.class_id;
        params["merchants_id"]=this.state.merchants_id;
        params["class_name"]=this.state.class_name;
        params["scene_name"]=this.state.sceneBean.scene_name;
        params["scene_desc"]=this.state.sceneBean.scene_desc;
        params["scene_type"]=this.state.sceneBean.scene_type;
        params["scene_img"]=this.state.sceneBean.scene_img;
        params["scene_img2"]=this.state.sceneBean.scene_img2;
        params["start_time"]=this.state.sceneBean.start_time;
        params["end_time"]=this.state.sceneBean.end_time;

        if(this.state.scene_id!=="-1"){
            params["scene_id"]=this.state.scene_id;
            this.getDataByPost(3,koubei_homeurl+"/sceneController/v1.0/updateScene"
                ,params)
        }else {
            this.getDataByPost(2, koubei_homeurl + "/sceneController/v1.0/insertScene", params)
        }
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    sceneBean:data,
                })
                break;
            case 2:
                this.setState({
                    scene_id:data,
                    index:2
                })
                this.getScenesOutGoods();
                this.getSenceGoodss();
                this.getSenceGoodss2();
                break;
            case 3:
                this.setState({
                    index:2
                })
                this.getScenesOutGoods();
                this.getSenceGoodss();
                this.getSenceGoodss2();
                break;
            case 4:
                this.setState({
                    goodsBeans:data,
                    goods_total:total
                })
                break;
            case 5:
                this.showTip("添加成功");
                this.setState({
                    goods_arr:[],
                },()=>{
                    this.getScenesOutGoods();
                    this.getSenceGoodss();
                    this.getSenceGoodss2();
                })
                break;
            case 6:
                this.setState({
                    sceneGoodsBeans1:data,
                })
                break;
            case 8:
                this.showTip("删除成功");
                this.getScenesOutGoods();
                this.getSenceGoodss();
                this.getSenceGoodss2();
                break;
            case 9:
                this.setState({
                    class_id:data[0].sceneClassBeans[0].class_id,
                    class_name:data[0].sceneClassBeans[0].class_name,
                    sceneClassBeans:data,
                    sceneClassBeans2:data[0].sceneClassBeans,
                })
                break;
            case 10:
                this.showTip("审核成功");
                this.props.history.goBack();
                break;
            case 11:
                this.showTip("审核成功");
                this.props.history.goBack();
                break;
        }
    }

    getScenesOutGoods(){
        this.getDataByPost(4,koubei_homeurl+"/sceneController/v1.0/getScenesOutGoods",
            {page:this.state.goods_page,
                goods_name:this.state.goods_name,
                class_name:this.state.class_name,
                scene_id:this.state.scene_id})
    }

    insertSenceGoodss(){
        this.getDataByPost(5,koubei_homeurl+"/sceneController/v1.0/insertSenceGoodss",
            {scene_id:this.state.scene_id,
                scene_goods_type:this.state.scene_goods_type,
                goods_id:this.state.goods_arr.toString(),
                apply_state:this.state.merchants_id==="-1"?"":"0"})
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"场景详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.View visible={this.state.merchants_id==='-1'?(this.state.sceneBean.apply_state==='0'?'true':"false"):"false"}>
                    <Widget.Button
                        style={{display:this.state.merchants_id==='-1'?(this.state.sceneBean.apply_state==='0'?'flex':"none"):"none",marginLeft:20}}
                        value="通过"
                        onClick={()=>{
                            this.openTip("确认通过?",()=>{
                                this.getDataByPost(10,koubei_homeurl+"/sceneController/v1.0/acceptScene",{scene_id:this.state.scene_id});
                            });
                        }}/>
                    <Widget.Button
                        style={{display:this.state.merchants_id==='-1'?(this.state.sceneBean.apply_state==='0'?'flex':"none"):'none',marginLeft:20}}
                        value="拒绝"
                        onClick={()=>{
                            this.openTip("确认拒绝?",()=>{
                                this.getDataByPost(11,koubei_homeurl+"/sceneController/v1.0/refuseScene",{scene_id:this.state.scene_id});
                            });
                        }}/>
                </Widget.View>
                {this.renderBase()}
                {this.renderGive()}
                {this.renderGoods()}
                {this.renderClass()}
            </div>
        )
    }

    renderBase(){
        return(
            <div style={{display:this.state.index==1?'flex':"none",flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={this.state.scene_id!=="-1"?[
                        {name:"场景名称",flex:1,key:'scene_name'},
                        {name:"场景描述",flex:1,key:'scene_desc',type:'textarea'},
                        {name:"场景图标(750*375)",flex:1,key:'scene_img',type:'img',img_style:{marginLeft:10,width:150,height:75}},
                        {name:"场景图标2(160*160)",flex:1,key:'scene_img2',type:'img',img_style:{marginLeft:10,width:80,height:80}},
                        {name:"活动开始时间",flex:1,key:'start_time',type:'text'},
                        {name:"活动结束时间",flex:1,key:'end_time',type:'text'},
                    ]:[
                        {name:"场景名称",flex:1,key:'scene_name'},
                        {name:"场景描述",flex:1,key:'scene_desc',type:'textarea'},
                        {name:"场景图标(750*375)",flex:1,key:'scene_img',type:'img',img_style:{marginLeft:10,width:150,height:75}},
                        {name:"场景图标2(160*160)",flex:1,key:'scene_img2',type:'img',img_style:{marginLeft:10,width:80,height:80}},
                        {name:"活动时间",flex:1,key:'start_time',key2:'end_time',type:'dates',dateType:"datetime"},
                    ]}
                    data={this.state.sceneBean}
                    onChange={(key,value,index)=>{
                        this.state.sceneBean[key]=value;
                        this.refresh();
                    }}/>

                <div style={{display:"flex",flex:1,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="下一步"
                        onClick={()=>{
                            this.insertScene();
                        }}/>
                </div>

            </div>
        )
    }

    renderGive(){
        return(
            <div style={{display:this.state.index==2?'flex':"none",flexDirection:'column'}}>
                <Widget.Detail
                    title="搭配商品"
                    baseData={[]}
                    data={{}}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center'}}>
                                <Widget.Button
                                    style={{display:"flex",marginLeft:20}}
                                    value="添加"
                                    onClick={()=>{
                                        this.setState({
                                            scene_goods_type:"1"
                                        },()=>{
                                            this.openHtml("#goods","请选择商品");
                                        })

                                    }}/>
                            </div>
                        )
                    }}>
                    <Widget.List
                        data={[
                            {name:"商品id",flex:2,key:'goods_id'},
                            {name:"商品名称",flex:1,key:'goods_name'},
                            {name:"商家名称",flex:1,key:'merchants_name'},
                            {name:"创建时间",flex:1,key:'create_time'},
                            {name:"操作",flex:2,key:"-1"}]}
                        dataSource={this.state.sceneGoodsBeans1}
                        operationData={[{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                    this.openTip("确认删除?",()=>{
                                        this.getDataByPost(8,koubei_homeurl+"/sceneController/v1.0/deleteSenceGoods",
                                            {scene_id:this.state.scene_id,scene_goods_id:this.state.sceneGoodsBeans1[rowID].scene_goods_id});
                                    });
                                    break;
                            }
                        }}>
                    </Widget.List>
                </Widget.Detail>

                <div style={{display:"flex",flex:1,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="上一步"
                        onClick={()=>{
                            this.setState({
                                index:1
                            })
                        }}/>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="退出"
                        onClick={()=>{
                            this.props.history.goBack();
                        }}/>
                </div>
            </div>
        )
    }



    renderGoods() {
        return (
            <div id="goods" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>
                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="商品名称"
                        value={this.state.goods_name}
                        onChange={(value)=> {
                            this.setState({
                                goods_name: value
                            })
                        }}/>

                    <Widget.Editor
                        style={{display: 'flex', marginLeft: 20}}
                        title_style={{display: 'none'}}
                        placeholder="分类名称"
                        value={this.state.class_name}
                        onChange={(value)=> {
                            this.setState({
                                class_name: value
                            })
                        }}/>
                    <Widget.Button
                        style={{marginLeft:20}}
                        value="搜索"
                        onClick={()=> {
                            this.setState({
                                page: 1
                            }, ()=> {
                                this.getGoodsOutGiveActivity();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertSenceGoodss();
                        }}/>
                </Widget.View>

                <Widget.List
                    data={[
                        {name: "商品ID", flex: 1, key: '-2'},
                        {name: "商品ID", flex: 1, key: 'goods_id'},
                        {name: "商品名称", flex: 1, key: 'goods_name'},
                        {name: "分类名称", flex: 1, key: 'class_name'},
                        {name: "供应商名称", flex: 1, key: 'merchants_name'},
                    ]}
                    dataSource={this.state.goodsBeans}
                    page={this.state.goods_page}
                    total={this.state.goods_total}
                    checkArr={this.state.goods_arr}
                    checkKey="goods_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.goods_arr.push(key);
                        }else{
                            this.removeArray(this.state.goods_arr,key)
                        }
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            goods_page: page
                        }, ()=> {
                            this.getScenesOutGoods()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }



    renderClass(){
        return(
            <div style={{display:this.state.index==0?'flex':"none",flexDirection:'column'}}>
                <div style={{display:'flex',marginTop:20}}>
                    <Widget.Foreach
                        className="class1"
                        dataSource={this.state.sceneClassBeans}
                        renderRow={(index)=>{
                            return(
                                <div style={{minHeight:30,display:'flex',
                                    alignItems:'center',background:this.state.index1===index?"RGB(224,248,251)":"#ffffff"}}
                                     onClick={()=>{
                                         let class_id=this.state.sceneClassBeans[index].sceneClassBeans[0].sceneClassBeans.length>0?
                                             this.state.sceneClassBeans[index].sceneClassBeans[0].sceneClassBeans[0].class_id:this.state.sceneClassBeans[index].sceneClassBeans[0].class_id

                                         let class_name=this.state.sceneClassBeans[index].sceneClassBeans[0].sceneClassBeans.length>0?
                                             this.state.sceneClassBeans[index].sceneClassBeans[0].sceneClassBeans[0].class_name:this.state.sceneClassBeans[index].sceneClassBeans[0].class_name


                                         this.setState({
                                             class_id:class_id,
                                             class_name:class_name,
                                             index1:index,
                                             index2:0,
                                             index3:0,
                                             sceneClassBeans2:this.state.sceneClassBeans[index].sceneClassBeans,
                                         })
                                     }}>
                                    <p1 className="p_000000" style={{marginLeft:10}}> {this.state.sceneClassBeans[index].class_name}</p1>
                                    <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
                                        <p1 className="p_000000" style={{marginRight:10}}>{">"}</p1>
                                    </div>
                                </div>
                            )
                        }}>
                    </Widget.Foreach>
                    <Widget.Foreach
                        className="class1"
                        dataSource={this.state.sceneClassBeans2}
                        renderRow={(index)=>{
                            return(
                                <div style={{minHeight:30,display:'flex',
                                    alignItems:'center',background:this.state.index2===index?"RGB(224,241,251)":"#ffffff"}}
                                     onClick={()=>{


                                         let class_id=this.state.sceneClassBeans2[index].sceneClassBeans.length>0?
                                             this.state.sceneClassBeans2[index].sceneClassBeans[0].class_id:this.state.sceneClassBeans2[index].class_id

                                         let class_name=this.state.sceneClassBeans2[index].sceneClassBeans.length>0?
                                             this.state.sceneClassBeans2[index].sceneClassBeans[0].class_name:this.state.sceneClassBeans2[index].class_name

                                         this.setState({
                                             class_id:class_id,
                                             class_name:class_name,

                                             index2:index,
                                             index3:0,
                                         })
                                     }}>
                                    <p1 className="p_000000" style={{marginLeft:10}}> {this.state.sceneClassBeans2[index].class_name}</p1>
                                    <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
                                        <p1 className="p_000000" style={{marginRight:10}}>{">"}</p1>
                                    </div>
                                </div>
                            )
                        }}>
                    </Widget.Foreach>
                </div>
                <div style={{display:'flex',marginTop:10}}>
                    <Widget.Button
                        value="下一步"
                        onClick={()=>{
                            if(this.state.class_id+""==='-1'){
                                this.showTip("请先选择分类");
                                return;
                            }
                            this.setState({
                                index:1
                            })
                        }}/>
                </div>
            </div>
        )
    }
}

module.exports=SceneGiveEditor;