/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class brandEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            brandBean:{brand_state:"0"},
            brand_id:this.props.params.brand_id,
            goodsClassBeans:[]
        };
    }

    componentDidMount() {
        if(this.props.params.brand_id!=="-1"){
            this.getBrandDetail();
        }else{
            this.getDataByPost(4,shop_homeurl+"/goodsController/v1.0/getGoodsClasss"
                ,{page:this.state.page,parent_id:"-1"})
        }
    }

    getBrandDetail(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getBrandDetail",{brand_id:this.state.brand_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    brandBean:data,
                    goodsClassBeans:data.goodsClassBeans
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
                    goodsClassBeans:data,
                })
                break;
        }
    }

    insertBrand(){
        if(this.isNull(this.state.brandBean.brand_name)){
            this.showTip("请先添加名称");
            return;
        }

        var params={};
        params["brand_name"]=this.state.brandBean.brand_name;
        params["brand_state"]=this.state.brandBean.brand_state;
        params["brand_img"]=this.state.brandBean.brand_img;
        params["classs"]=JSON.stringify(this.state.goodsClassBeans);

        if(this.state.brand_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/insertBrand",params);
        }else{
            params["brand_id"]=this.state.brand_id;
            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateBrand",params);
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"行业详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteClueMaterial();
                            }}></Widget.Tip>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"品牌名称",flex:1,key:'brand_name'},
                        {name:"品牌图标",flex:1,key:'brand_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                        {name:"品牌状态",flex:1,key:'brand_state',type:'radio_select'},
                        {name:"分类",flex:1,key:'class_name',type:'checks',data:this.state.goodsClassBeans},
                    ]}
                    data={this.state.brandBean}
                    onChange={(key,value,index)=>{
                        if(key==="class_name"){
                            this.state.goodsClassBeans[index].is_check=value;
                        }else{
                            this.state.brandBean[key]=value;
                        }
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertBrand();
                    }}/>
            </div>
        )
    }
}

module.exports=brandEditor;