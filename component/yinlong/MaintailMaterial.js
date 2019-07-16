/**
 * Created by Administrator on 2018/7/24.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MaintailMaterial extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            maintailMaterialBean:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getBanners();
    }
    getBanners(){
        this.getDataByPost(1,maintail_homeurl+"/maintailMaterialController/v1.0/getMaterial"
            ,{page:this.state.page})
    }

    deleteBanner(){
        this.getDataByPost(2,maintail_homeurl+"/maintailMaterialController/v1.0/deleteMaterial",{material_id:this.state.material_id})
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    maintailMaterialBean:data,
                    total:total,
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getBanners();
                break;
            case 3:
                this.getBanners();
                break;

        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Toolbar title={"维修材料列表"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/maintail_material_editor/-1");
                        }}/>
                    <Widget.ImgButton
                        url={maintail_homeurl+"/maintailMaterialController/v1.0/importMaterial"}
                        value1="导入"
                        onSuccess={
                            ()=>{
                                this.showTip("上传成功");
                                this.getBanners();
                            }
                        }
                    />
                </Widget.View>
                <Widget.List
                    data={[{name:"ID",flex:1,key:'material_id'},
                        {name:"材料名称",flex:1,key:'material_name'},
                        {name:"权重",flex:1,key:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.maintailMaterialBean}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/maintail_material_editor/"+this.state.maintailMaterialBean[rowID].material_id);
                                break;
                            case 1:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        material_id:this.state.maintailMaterialBean[rowID].material_id
                                    },()=>{
                                        this.deleteBanner();
                                    })
                                })
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getBanners()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=MaintailMaterial;