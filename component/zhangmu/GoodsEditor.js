/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class GoodsEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            goods_id:this.props.params.goods_id,
            merchants_id:'1',
            merchants_name:'掌牧平台',
            display_class:this.props.params.goods_id==="-1"?"flex":"none",
            display_detail:this.props.params.goods_id==="-1"?"none":"flex",
            goodsClassBeans:[],
            goodsClassBeans2:[],
            goodsClassBeans3:[],
            index1:0,
            index2:0,
            index3:0,
            goodsBean:{goods_state:"0"},
            class_id:this.props.params.class_id,
            class_name:"",
            specificationBeans:[],
            goodsSpecificationBeans:[],
            goodsSpecificationTempBeans:[],

            freightBeans:[],

            goodsClassTagBeans:[],
            brandBeans:[],
            goodsImgBeans:[{goods_img:'-1'}]
        };
    }

    componentDidMount() {
        if(this.props.params.goods_id!=="-1"){
            this.getGoodsDetail();
            this.getGoodsSpecifications(this.state.goods_id+",-1")
            this.getGoodsSelectSpecifications();
            this.getGoodsTags();
            this.getGoodsBrands();
        }else {
            this.getGoodsClassLinks();
        }

        this.getFreightsNoPage();
    }

    getGoodsBrands(){
        this.getDataByPost(9,shop_homeurl+"/goodsController/v1.0/getGoodsBrands",{class_id:this.state.class_id,goods_id:this.state.goods_id})
    }

    getGoodsTags(){
        this.getDataByPost(8,shop_homeurl+"/goodsController/v1.0/getGoodsTags",{class_id:this.state.class_id,goods_id:this.state.goods_id})
    }
    getFreightsNoPage(){
        this.getDataByPost(7,shop_homeurl+"/goodsController/v1.0/getFreightsNoPage",{merchants_id:this.state.merchants_id})
    }

    getGoodsSelectSpecifications(){
        this.getDataByPost(5,shop_homeurl+"/goodsController/v1.0/getGoodsSelectSpecifications",{goods_id:this.state.goods_id})
    }

    getGoodsDetail(){
        this.getDataByPost(4,shop_homeurl+"/goodsController/v1.0/getGoodsDetail",{goods_id:this.state.goods_id})
    }
    getGoodsClassLinks(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getMerchantsGoodsClass",{merchants_id:this.state.merchants_id})
    }

    getGoodsSpecifications(goods_id){
        this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/getGoodsSpecifications",
            {class_id:this.state.class_id,goods_id:goods_id})
    }


    doSuccess(index,data){
        switch(index){
            case 1:
                let class_id=-1;
                let class_name="";
                if(data[0].goodsClassBeans[0].goodsClassBeans.length>0){
                    class_id=data[0].goodsClassBeans[0].goodsClassBeans[0].class_id;
                    class_name=data[0].goodsClassBeans[0].goodsClassBeans[0].class_name;
                }else{
                    class_id=data[0].goodsClassBeans[0].class_id;
                    class_name=data[0].goodsClassBeans[0].class_name;
                }
                this.setState({
                    class_id:class_id,
                    class_name:class_name,
                    goodsClassBeans:data,
                    goodsClassBeans2:data[0].goodsClassBeans,
                    goodsClassBeans3:data[0].goodsClassBeans[0].goodsClassBeans,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.setState({
                    specificationBeans:data,
                })
                break;
            case 4:
                this.setState({
                    goodsBean:data,
                    goodsImgBeans:data.goodsImgBeans.concat([{goods_img:"-1"}])
                })
                break;
            case 5:
                this.setState({
                    goodsSpecificationBeans:data,
                    goodsSpecificationTempBeans:data,
                })
                break;
            case 6:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
            case 7:
                this.setState({
                    freightBeans:data
                })
                break;
            case 8:
                this.setState({
                    goodsClassTagBeans:data
                })
                break;
            case 9:
                this.setState({
                    brandBeans:data
                })
                break;
        }
    }

    insertGoods(){
        if(this.state.goodsSpecificationBeans.length<=0||this.state.specificationBeans.length<=0){
            this.showTip("请先配置规格");
            return;
        }

        if(this.state.freightBeans.length<=0){
            this.showTip("请先设置运费模板");
            return;
        }

        var params={};
        params["merchants_id"]=this.state.merchants_id;
        params["merchants_name"]=this.state.merchants_name;

        params["class_id"]=this.state.class_id;
        params["class_name"]=this.state.class_name;

        params["freight_id"]=this.isNull(this.state.goodsBean.freight_id)?this.state.freightBeans[0].freight_id:this.state.goodsBean.freight_id;

        params["goods_name"]=this.state.goodsBean.goods_name;
        params["goods_img"]=this.state.goodsBean.goods_img;
        params["goods_img2"]=this.state.goodsBean.goods_img2;
        params["goods_video_url"]=this.state.goodsBean.goods_video_url;
        params["goods_video_url2"]=this.state.goodsBean.goods_video_url2;

        params["goods_desc"]=this.state.goodsBean.goods_desc;
        params["goods_url_desc"]=this.state.goodsBean.goods_url_desc;

        params["goods_origin_price"]=this.state.goodsBean.goods_origin_price;

        params["goods_weight"]=this.state.goodsBean.goods_weight;
        params["goods_weight_unit"]=this.state.goodsBean.goods_weight_unit;
        params["goods_volume"]=this.state.goodsBean.goods_volume;
        params["goods_volume_unit"]=this.state.goodsBean.goods_volume_unit;

        params["goods_state"]=this.state.goodsBean.goods_state;
        params["goods_total_sales"]=this.state.goodsBean.goods_total_sales;

        params["specifications"]=JSON.stringify(this.state.specificationBeans);
        params["goods_specifications"]=JSON.stringify(this.state.goodsSpecificationBeans);
        params["goods_tags"]=JSON.stringify(this.state.goodsClassTagBeans);
        params["brands"]=JSON.stringify(this.state.brandBeans);
        params["goods_imgs"]=JSON.stringify(this.state.goodsImgBeans);

        if(this.state.goods_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/insertGoods",params)
        }else{
            params["goods_id"]=this.state.goods_id;
            this.getDataByPost(6,shop_homeurl+"/goodsController/v1.0/updateGoods",params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"添加商品"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
                {this.renderClass()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"商品名称",flex:1,key:'goods_name'},
                        {name:"分类名称",flex:1,key:'class_name',type:'text'},
                        {name:"供应商名称",flex:1,key:'merchants_name',type:'text'},

                        {name:"商品图标",flex:1,key:'goods_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
                        {name:"主图视频",flex:1,key:'goods_video_url',type:'video',img_style:{width:100,height:100,marginLeft:10}},
                        {name:"宝贝视频",flex:1,key:'goods_video_url2',type:'video',img_style:{width:100,height:100,marginLeft:10}},

                        {name:"展示销量",flex:1,key:'goods_total_sales'},
                        {name:"商品原价",flex:1,key:'goods_origin_price'},
                        {name:"商品现价",flex:1,key:'goods_now_price',type:'text'},
                        {name:"商品批发价",flex:1,key:'goods_wholesale_price',type:'text'},
                        {name:"库存",flex:1,key:'goods_stock',type:'text'},
                        {name:"商品重量",flex:1,key:'goods_weight',type:'widget'},
                        {name:"商品体积",flex:1,key:'goods_volume',type:'widget'},
                        {name:"运费模板",flex:1,key:'freight_id',type:'select',data:this.state.freightBeans,show_value:"freight_name",select_value:"freight_id"},

                        {name:"商品简介",flex:1,key:'goods_desc',type:'textarea'},
                        {name:"商品状态",flex:1,key:'goods_state',type:'radio_select'},

                        {name:"品牌",flex:1,key:'brand_name',type:'checks',data:this.state.brandBeans},

                    ]}
                    data={this.state.goodsBean}
                    renderWidget={(key)=>{
                        if(key=="goods_weight"){
                            return(
                                <div className="detail_item">
                                    <Widget.Editor
                                        title_style={{width:150}}
                                        title_p_style={{display:"flex"}}
                                        input_style={{marginLeft:10,width:500}}
                                        title="商品重量"
                                        value={this.state.goodsBean.goods_weight}
                                        onChange={(value)=>{
                                            this.state.goodsBean.goods_weight=value;
                                            this.refresh();
                                        }}/>
                                    <input
                                        className="input"
                                        placeholder="单位"
                                        value={this.state.goodsBean.goods_weight_unit}
                                        onChange={(e)=>{
                                            this.state.goodsBean.goods_weight_unit=e.target.value;
                                            this.refresh();
                                        }}/>
                                </div>
                            )
                        }else if(key=="goods_volume"){
                            return(
                                <div className="detail_item">
                                    <Widget.Editor
                                        title_style={{width:150}}
                                        title_p_style={{display:"flex"}}
                                        input_style={{marginLeft:10,width:500}}
                                        title="商品体积"
                                        value={this.state.goodsBean.goods_volume}
                                        onChange={(value)=>{
                                            this.state.goodsBean.goods_volume=value;
                                            this.refresh();
                                        }}/>
                                    <input
                                        className="input"
                                        placeholder="单位"
                                        value={this.state.goodsBean.goods_volume_unit}
                                        onChange={(e)=>{
                                            this.state.goodsBean.goods_volume_unit=e.target.value;
                                            this.refresh();
                                        }}/>
                                </div>)
                        }
                    }}
                    onChange={(key,value,index)=>{
                        if(key==="brand_name"){
                            this.state.brandBeans[index].is_check=value;
                        }else{
                            this.state.goodsBean[key]=value;
                        }
                        this.refresh();
                    }}
                />
                <Widget.Detail
                    title="详情页轮播图"
                    baseData={[]}
                    data={{}}>
                    <Widget.Foreach
                        style={{display:'flex',overflow:'auto'}}
                        dataSource={this.state.goodsImgBeans}
                        renderRow={(rowID)=>{
                            return(
                                <div style={{display:'flex'}}>
                                    <Widget.Img
                                        title_style={{display:'none'}}
                                        img_style={{width:80,height:80,marginLeft:10}}
                                        src={this.state.goodsImgBeans[rowID].goods_img==="-1"?"./images/add.jpg":imgurl+this.state.goodsImgBeans[rowID].goods_img}
                                        url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                        onSuccess={(value)=>{
                                            if(this.state.goodsImgBeans[rowID].goods_img==="-1"){
                                                this.setState({
                                                    goodsImgBeans:([{goods_img:value}]).concat(this.state.goodsImgBeans)
                                                })
                                            }else{
                                                this.state.goodsImgBeans[rowID].goods_img=value;
                                                this.refresh();
                                            }
                                        }}/>
                                    <div style={{display:this.state.goodsImgBeans[rowID].goods_img==='-1'?"none":"flex"}}
                                         className={"Hui-iconfont Hui-iconfont-close2"}
                                         onClick={()=>{
                                             this.state.goodsImgBeans.splice(rowID,1);
                                             this.refresh();
                                         }}>
                                    </div>
                                </div>
                            )
                        }}/>
                </Widget.Detail>
                <Widget.Detail
                    title="标签信息"
                    baseData={[]}
                    data={{}}>
                    <Widget.Foreach
                        style={{display:'flex',flexDirection:'column',overflow:'auto'}}
                        dataSource={this.state.goodsClassTagBeans}
                        renderRow={(rowID)=>{
                            return(
                                <div>
                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:12}}>
                                        {this.state.goodsClassTagBeans[rowID].tag_name}

                                    </div>
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Widget.Foreach
                                            style={{display:'flex',overflow:'auto'}}
                                            dataSource={this.state.goodsClassTagBeans[rowID].goodsClassTagBeans}
                                            renderRow={(index)=>{
                                                return(
                                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:10}}>
                                                        <Widget.Check
                                                            visible="true"
                                                            title={this.state.goodsClassTagBeans[rowID].goodsClassTagBeans[index].tag_name}
                                                            checked={this.state.goodsClassTagBeans[rowID].goodsClassTagBeans[index].is_check}
                                                            onClick={(checked)=>{
                                                                this.state.goodsClassTagBeans[rowID].goodsClassTagBeans[index].is_check=checked;
                                                                this.refresh();
                                                            }}/>
                                                    </div>

                                                )
                                            }}>
                                        </Widget.Foreach>

                                    </div>
                                </div>
                            )
                        }}/>


                </Widget.Detail>
                <Widget.Detail
                    title="规格选择"
                    baseData={[]}
                    data={{}}>
                    <Widget.Foreach
                        style={{display:'flex',flexDirection:'column',overflow:'auto'}}
                        dataSource={this.state.specificationBeans}
                        renderRow={(rowID)=>{
                            return(
                                <div>
                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:12}}>
                                        {this.state.specificationBeans[rowID].specification_value}
                                        <input className="input"
                                               style={{width:80,marginLeft:20}}
                                               value={this.state.specificationBeans[rowID].specification_value1}
                                               onChange={(e)=>{
                                                   this.state.specificationBeans[rowID].specification_value1=e.target.value;
                                                   this.refresh();
                                               }}/>

                                        <Widget.Button
                                            style={{marginLeft:20}}
                                            value="添加"
                                            onClick={()=>{
                                                if(this.isNull(this.state.specificationBeans[rowID].specification_value1)){
                                                    this.showTip("内容不可为空");
                                                    return;
                                                }
                                                for(let i=0;i<this.state.specificationBeans.length;i++){
                                                    let specificationBeans=this.state.specificationBeans[i].specificationBeans;
                                                    for(let j=0;j<specificationBeans.length;j++){
                                                        let specificationBean=specificationBeans[j];
                                                        if(specificationBean.specification_value===this.state.specificationBeans[rowID].specification_value1){
                                                            this.showTip("规格名不可重复");
                                                            return;
                                                        }
                                                    }
                                                }

                                                this.state.specificationBeans[rowID].specificationBeans.push({specification_value:this.state.specificationBeans[rowID].specification_value1})
                                                this.state.specificationBeans[rowID].specification_value1="";
                                                this.refresh();
                                            }}/>
                                    </div>
                        
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Widget.Foreach
                                            style={{display:'flex',overflow:'auto'}}
                                            dataSource={this.state.specificationBeans[rowID].specificationBeans}
                                            renderRow={(index)=>{
                                                return(
                                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:10}}>
                                                        <Widget.Check
                                                            visible="true"
                                                            title={this.state.specificationBeans[rowID].specificationBeans[index].specification_value}
                                                            checked={this.state.specificationBeans[rowID].specificationBeans[index].is_check}
                                                            onClick={(checked)=>{
                                                                this.state.specificationBeans[rowID].specificationBeans[index].is_check=checked;
                                                                var goodsSpecificationBeans=[];

                                                                var specificationBeans2=this.getS(this.state.specificationBeans,this.state.specificationBeans.length,0);

                                                                for(let i=0;i<specificationBeans2.length;i++){
                                                                    var is_have="0";
                                                                    for(let j=0;j<this.state.goodsSpecificationTempBeans.length;j++){
                                                                        if(specificationBeans2[i].specification_id+""===this.state.goodsSpecificationTempBeans[j].specification_ids+""){
                                                                            is_have="1";
                                                                            if(specificationBeans2[i].is_check==='1'){
                                                                                goodsSpecificationBeans.push(this.state.goodsSpecificationTempBeans[j])
                                                                            }
                                                                            break;
                                                                        }
                                                                    }

                                                                    if(is_have==="0"){
                                                                        if(specificationBeans2[i].is_check==='1') {
                                                                            goodsSpecificationBeans.push({
                                                                                specification_ids: specificationBeans2[i].specification_id,
                                                                                specification_names: specificationBeans2[i].specification_value,
                                                                                specification_img:this.state.goodsBean.goods_img,
                                                                                specification_cost_price:0,
                                                                                specification_wholesale_price:0,
                                                                                specification_price:0,
                                                                                group_price:0,
                                                                                specification_sku:uuid(10,16),
                                                                                specification_stock:0,
                                                                                group_state:'1'
                                                                            })
                                                                        }
                                                                    }
                                                                }
                                                                this.setState({
                                                                    goodsSpecificationBeans:goodsSpecificationBeans
                                                                })

                                                            }}/>
                                                        <div style={{display:this.state.specificationBeans[rowID].specificationBeans[index].goods_id==='-1'?"none":"flex"}}
                                                             className={"Hui-iconfont Hui-iconfont-close2"}
                                                             onClick={()=>{

                                                                 this.state.specificationBeans[rowID].specificationBeans.splice(index,1);

                                                                 var goodsSpecificationBeans=[];

                                                                 var specificationBeans2=this.getS(this.state.specificationBeans,this.state.specificationBeans.length,0);

                                                                 for(let i=0;i<specificationBeans2.length;i++){
                                                                     var is_have="0";
                                                                     for(let j=0;j<this.state.goodsSpecificationTempBeans.length;j++){
                                                                         if(specificationBeans2[i].specification_id+""===this.state.goodsSpecificationTempBeans[j].specification_ids+""){
                                                                             is_have="1";
                                                                             if(specificationBeans2[i].is_check==='1'){
                                                                                 goodsSpecificationBeans.push(this.state.goodsSpecificationTempBeans[j])
                                                                             }
                                                                             break;
                                                                         }
                                                                     }

                                                                     if(is_have==="0"){
                                                                         if(specificationBeans2[i].is_check==='1') {
                                                                             goodsSpecificationBeans.push({
                                                                                 specification_ids: specificationBeans2[i].specification_id,
                                                                                 specification_names: specificationBeans2[i].specification_value,
                                                                                 specification_img:this.state.goodsBean.goods_img,
                                                                                 specification_cost_price:0,
                                                                                 specification_wholesale_price:0,
                                                                                 specification_price:0,
                                                                                 group_price:0,
                                                                                 specification_sku:uuid(10,16),
                                                                                 specification_stock:0,
                                                                                 group_state:'1'
                                                                             })
                                                                         }
                                                                     }
                                                                 }
                                                                 this.setState({
                                                                     goodsSpecificationBeans:goodsSpecificationBeans
                                                                 })

                                                             }}>

                                                        </div>

                                                    </div>

                                                )
                                            }}>

                                        </Widget.Foreach>

                                    </div>
                                </div>
                            )
                        }}/>
                    
                    <div style={{display:'flex',alignItems:'center',marginTop:30}}>
                        <Widget.Editor
                            style={{marginLeft:10}}
                            title_style={{display:'none'}}
                            placeholder="库存"
                            value={this.state.specification_stock}
                            onChange={(value)=>{
                                this.setState({
                                    specification_stock:value
                                })
                            }}/>
                        <Widget.Editor
                            style={{marginLeft:10}}
                            title_style={{display:'none'}}
                            placeholder="价格"
                            value={this.state.specification_price}
                            onChange={(value)=>{
                                this.setState({
                                    specification_price:value
                                })
                            }}/>
                        <Widget.Editor
                            style={{marginLeft:10}}
                            title_style={{display:'none'}}
                            placeholder="成本价"
                            value={this.state.specification_cost_price}
                            onChange={(value)=>{
                                this.setState({
                                    specification_cost_price:value
                                })
                            }}/>
                        <Widget.Editor
                            style={{marginLeft:10}}
                            title_style={{display:'none'}}
                            placeholder="批发价"
                            value={this.state.specification_wholesale_price}
                            onChange={(value)=>{
                                this.setState({
                                    specification_wholesale_price:value
                                })
                            }}/>
                        <Widget.Button
                            style={{marginLeft:10}}
                            value="批量设置"
                            onClick={()=>{
                                for(let i=0;i<this.state.goodsSpecificationBeans.length;i++){
                                    this.state.goodsSpecificationBeans[i].specification_stock=this.state.specification_stock;
                                    this.state.goodsSpecificationBeans[i].specification_price=this.state.specification_price;
                                    this.state.goodsSpecificationBeans[i].specification_cost_price=this.state.specification_cost_price;
                                    this.state.goodsSpecificationBeans[i].specification_wholesale_price=this.state.specification_wholesale_price;
                                }

                                this.setState({
                                    specification_stock:"",
                                    specification_price:"",
                                    specification_cost_price:"",
                                    specification_wholesale_price:"",
                                })
                            }}/>
                    </div>
                    <Widget.List
                        data={[ {name:"ID",flex:1,key:'specification_id'},
                            {name:"规格组合ID",flex:1,key:'specification_ids'},
                            {name:"规格组合名称",flex:1,key:'specification_names'},
                            {name:"SKU",flex:1,key:'specification_sku',type:'input'},
                            {name:"库存",flex:1,key:'specification_stock',type:'input'},
                            {name:"价格",flex:1,key:'specification_price',type:'input'},
                            {name:"成本价",flex:1,key:'specification_cost_price',type:'input'},
                            {name:"批发价",flex:1,key:'specification_wholesale_price',type:'input'},
                            {name:"图标",flex:1,key:'specification_img',type:'imgButton'},
                        ]}
                        dataSource={this.state.goodsSpecificationBeans}
                        onChange={(i,key,value)=>{
                            this.state.goodsSpecificationBeans[i][key]=value;
                            this.refresh();
                        }}>
                    </Widget.List>

                </Widget.Detail>
                <Widget.Detail
                    title="图文详情"
                    marginBottom={20}
                    baseData={[]}
                    data={{}}>
                    <WangeditorComponent
                        name="goods"
                        url_desc={this.state.goodsBean.goods_url_desc}
                        onChange={(desc)=>{
                            this.state.goodsBean.goods_url_desc=desc;
                            this.refresh();
                        }}/>
                </Widget.Detail>
                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.insertGoods();
                        }}/>
                </div>
            </div>
        )
    }

    getS(data,total_count,cur_count){
        var specificationBeans=data[cur_count].specificationBeans;

        if(total_count==cur_count+1){
            return specificationBeans;
        }
        var beans=[];
        var specificationBeans2=this.getS(data,total_count,cur_count+1);

        var is_have="0";
        for(let i=0;i<specificationBeans.length;i++){
            if(specificationBeans[i].is_check==='1'){
                is_have="1";
                var is_have1="0";
                for(let j=0;j<specificationBeans2.length;j++){
                    if(specificationBeans2[j].is_check==='1'){
                        is_have1="1";
                        let ids=(specificationBeans[i].specification_id?specificationBeans[i].specification_id:"")+","+(specificationBeans2[j].specification_id?specificationBeans2[j].specification_id:"");
                        let names=specificationBeans[i].specification_value+","+specificationBeans2[j].specification_value;
                        beans.push({specification_id:ids,specification_value:names,is_check:'1'});
                    }
                }
                if(is_have1==='0'){
                    return specificationBeans;
                }
            }
        }
        if(is_have==='0'){
            return specificationBeans2;
        }
        return beans;
    }

    renderClass(){
        return(
            <div style={{display:this.state.display_class,flexDirection:'column'}}>
                <div style={{display:'flex',marginTop:20}}>
                    <Widget.Foreach
                        className="class1"
                        dataSource={this.state.goodsClassBeans}
                        renderRow={(index)=>{
                            return(
                                <div style={{minHeight:30,display:'flex',
                                    alignItems:'center',background:this.state.index1===index?"RGB(224,248,251)":"#ffffff"}}
                                     onClick={()=>{
                                         let class_id=this.state.goodsClassBeans[index].goodsClassBeans[0].goodsClassBeans.length>0?
                                             this.state.goodsClassBeans[index].goodsClassBeans[0].goodsClassBeans[0].class_id:this.state.goodsClassBeans[index].goodsClassBeans[0].class_id

                                         let class_name=this.state.goodsClassBeans[index].goodsClassBeans[0].goodsClassBeans.length>0?
                                             this.state.goodsClassBeans[index].goodsClassBeans[0].goodsClassBeans[0].class_name:this.state.goodsClassBeans[index].goodsClassBeans[0].class_name


                                         this.setState({
                                             class_id:class_id,
                                             class_name:class_name,
                                             index1:index,
                                             index2:0,
                                             index3:0,
                                             goodsClassBeans2:this.state.goodsClassBeans[index].goodsClassBeans,
                                             goodsClassBeans3:this.state.goodsClassBeans[index].goodsClassBeans[0].goodsClassBeans
                                         })
                                     }}>
                                    <p1 className="p_000000" style={{marginLeft:10}}> {this.state.goodsClassBeans[index].class_name}</p1>
                                    <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
                                        <p1 className="p_000000" style={{marginRight:10}}>{">"}</p1>
                                    </div>
                                </div>
                            )
                        }}>
                    </Widget.Foreach>
                    <Widget.Foreach
                        className="class1"
                        dataSource={this.state.goodsClassBeans2}
                        renderRow={(index)=>{
                            return(
                                <div style={{minHeight:30,display:'flex',
                                    alignItems:'center',background:this.state.index2===index?"RGB(224,241,251)":"#ffffff"}}
                                     onClick={()=>{


                                         let class_id=this.state.goodsClassBeans2[index].goodsClassBeans.length>0?
                                             this.state.goodsClassBeans2[index].goodsClassBeans[0].class_id:this.state.goodsClassBeans2[index].class_id

                                         let class_name=this.state.goodsClassBeans2[index].goodsClassBeans.length>0?
                                             this.state.goodsClassBeans2[index].goodsClassBeans[0].class_name:this.state.goodsClassBeans2[index].class_name

                                         this.setState({
                                             class_id:class_id,
                                             class_name:class_name,

                                             index2:index,
                                             index3:0,
                                             goodsClassBeans3:this.state.goodsClassBeans2[index].goodsClassBeans,
                                         })
                                     }}>
                                    <p1 className="p_000000" style={{marginLeft:10}}> {this.state.goodsClassBeans2[index].class_name}</p1>
                                    <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
                                        <p1 className="p_000000" style={{marginRight:10}}>{">"}</p1>
                                    </div>
                                </div>
                            )
                        }}>
                    </Widget.Foreach>
                    <Widget.Foreach
                        className="class1"
                        style={{display:this.state.goodsClassBeans3.length>0?"flex":"none",flexDirection:"column"}}
                        dataSource={this.state.goodsClassBeans3}
                        renderRow={(index)=>{
                            return(
                                <div style={{minHeight:30,display:'flex',
                                    alignItems:'center',background:this.state.index3===index?"RGB(245,250,254)":"#ffffff"}}
                                     onClick={()=>{
                                         let class_id=this.state.goodsClassBeans3[index].class_id

                                         let class_name=this.state.goodsClassBeans3[index].class_name

                                         this.setState({
                                             class_id:class_id,
                                             class_name:class_name,
                                             index3:index,
                                         })
                                     }}>
                                    <p1 className="p_000000"
                                        style={{marginLeft:10}}> {this.state.goodsClassBeans3[index].class_name}</p1>
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
                                display_class:"none",
                                display_detail:'flex'
                            })
                            this.getGoodsSpecifications("-1");
                            this.getGoodsTags();
                            this.getGoodsBrands();
                        }}/>
                </div>
            </div>
        )
    }
}



module.exports=GoodsEditor;