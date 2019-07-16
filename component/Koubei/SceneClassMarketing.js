/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class SceneClassMarketing extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            marketing_type:"1",
            marketingGoodsClassBeans:[],
            page:1,
            total:0,

            goodsClassBeans:[],
            goods_class_page:1,
            goods_class_total:0,
            goods_class_arr:[],

            goodsClassSearchBeans: [],
            selectGoodsClassBean: {},
            class_name:"",
        };
    }

    componentDidMount() {
        this.getSceneClassMarketings();
        this.getGoodsClassOutMarketings();
    }
    getSceneClassMarketings(){
        this.getDataByPost(1,koubei_homeurl+"/sceneController/v1.0/getSceneClassMarketings"
            ,{page:this.state.page,marketing_type:this.state.marketing_type},{type:2})
    }
    getGoodsClassOutMarketings(){
        this.getDataByPost(6,koubei_homeurl+"/sceneController/v1.0/getSceneClassOutMarketings"
            ,{page:this.state.goods_class_page,
                marketing_type:this.state.marketing_type
                ,class_name:this.state.class_name})
    }
    insertSceneClassMarketing(){
        this.getDataByPost(7,koubei_homeurl+"/sceneController/v1.0/insertSceneClassMarketing",
            {marketing_type:this.state.marketing_type,
                class_id:this.state.goods_class_arr.toString()})
    }

    deleteActivityGoods(){
        this.getDataByPost(2,koubei_homeurl+"/sceneController/v1.0/deleteSceneClassMarketing",{marketing_id:this.state.marketing_id})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    marketingGoodsClassBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getSceneClassMarketings();
                this.getGoodsClassOutMarketings();
                break;
            case 3:
                this.showTip("移动成功");
                this.getSceneClassMarketings();

                break;
            case 4:
                this.setState({
                    goodsClassSearchBeans:data
                })
                break;
            case 5:
                this.getSceneClassMarketings();
                break;
            case 6:
                this.setState({
                    goodsClassBeans:data,
                    goods_class_total:total,
                })
                break;
            case 7:
                this.showTip("添加成功");
                this.setState({
                    goods_class_arr:[]
                })
                this.getSceneClassMarketings();
                this.getGoodsClassOutMarketings();
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteActivityGoods();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"推荐分类"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=>{
                            this.openHtml("#goodsClass","请选择场景分类");
                        }}/>

                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'marketing_id'},
                        {name:"分类id",flex:1,key:'class_id'},
                        {name:"分类名称",flex:1,key:'class_name'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.marketingGoodsClassBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.setState({
                                    visible:true,
                                    marketing_id:this.state.marketingGoodsClassBeans[rowID].marketing_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,koubei_homeurl+"/sceneController/v1.0/moveGoodsClassMarketing"
                                ,{marketing_id:this.state.marketingGoodsClassBeans[rowID].marketing_id
                                    ,marketing_type:this.state.marketing_type
                                    ,sort:this.state.marketingGoodsClassBeans[rowID].sort,
                                    sort_type:value})
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getSceneClassMarketings()
                        })
                    }}>
                </Widget.List>
                {this.renderGoodsClass()}
            </div>
        );
    }
    renderGoodsClass() {
        return (
            <div id="goodsClass" style={{display:"none",flexDirection:'column'}}>
                <Widget.View>

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
                                this.getGoodsClassOutMarketings();
                            })
                        }}/>

                    <Widget.Button
                        style={{marginLeft:20}}
                        value="添加"
                        onClick={()=> {
                            var layer = layui.layer;
                            layer.close(layer.index)
                            this.insertSceneClassMarketing();
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name: "分类ID", flex: 1, key: '-2'},
                        {name: "分类ID", flex: 1, key: 'class_id'},
                        {name: "分类名称", flex: 1, key: 'class_name'},
                    ]}
                    dataSource={this.state.goodsClassBeans}
                    page={this.state.goods_class_page}
                    total={this.state.goods_class_total}
                    checkArr={this.state.goods_class_arr}
                    checkKey="class_id"
                    onChecked={(key,checked)=>{
                        if(checked==='1'){
                            this.state.goods_class_arr.push(key);
                        }else{
                            this.removeArray(this.state.goods_class_arr,key)
                        }
                        this.refresh();
                    }}
                    onPage={(page)=> {
                        this.setState({
                            goods_class_page: page
                        }, ()=> {
                            this.getGoodsClassOutMarketings();
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }

    onGoodsPress(bean){
        this.setState({
            goodsClassSearchBeans:[],
            selectGoodsClassBean:bean,
            class_name:bean.class_name
        })
    }


    onGoodsChange(value){
        if(this.isNull(value)){
            this.setState({
                class_name:value,
                selectGoodsClassBean:{},
                goodsClassSearchBeans:[]
            })
        }else{
            this.setState({
                selectGoodsClassBean:{},
                class_name:value,
            })
            this.getGoodsClasss(value)
        }
    }

    getGoodsClasss(value){
        this.getDataByPost(4,koubei_homeurl+"/sceneController/v1.0/getGoodsClasss",{page:1,parent_id:"-1",class_name:value})
    }
}

module.exports=SceneClassMarketing;