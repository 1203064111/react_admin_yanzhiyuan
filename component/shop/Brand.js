/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Brand extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            brandBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getBrands();
    }
    getBrands(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getBrands"
            ,{page:this.state.page},{type:2})
    }

    deleteBrand(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteBrand",{brand_id:this.state.brand_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    brandBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getBrands();
                break;
            case 3:
                this.getBrands();
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
                                this.deleteBrand();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"品牌列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_brand_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"品牌ID",flex:1,key:'brand_id'},
                        {name:"品牌名称",flex:1,key:'brand_name'},
                        {name:"品牌图标",flex:1,key:'brand_img',type:'img'},
                        {name:"品牌状态",flex:1,key:'brand_state',type:'radio_select'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.brandBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_brand_editor/"+this.state.brandBeans[rowID].brand_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    brand_id:this.state.brandBeans[rowID].brand_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/moveBrand"
                                ,{brand_id:this.state.brandBeans[rowID].brand_id
                                    ,sort:this.state.brandBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="brand_state"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateBrand",
                                {brand_id:this.state.brandBeans[rowID].brand_id,
                                    brand_state:value});
                        }

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getBrands()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Brand;