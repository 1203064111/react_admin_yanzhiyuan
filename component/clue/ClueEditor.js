/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ClueEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            ClueBean:{},
            clue_id:this.props.params.clue_id,
            ClueIndustryBeans:[],
            ClueImgMaterialBeans:[],
            ClueVoiceMaterialBeans:[],
            ClueVideoMaterialBeans:[],
        };
    }

    componentDidMount() {
        if(this.props.params.clue_id==="-1"){
            this.setState({
                ClueBean:{clue_buy_num:0}
            })
        }else{
            this.getClueDetail();
        }
        this.getClueIndustrysNoPage();
        this.getClueImgMaterials();
        this.getClueVoiceMaterials();
        this.getClueVideoMaterials();
    }

    getClueImgMaterials(){
        this.getDataByPost(5,clue_homeurl+"/clueController/v1.0/getClueMaterials",{clue_id:this.state.clue_id,material_type:'1'})
    }

    getClueVoiceMaterials(){
        this.getDataByPost(6,clue_homeurl+"/clueController/v1.0/getClueMaterials",{clue_id:this.state.clue_id,material_type:'2'})
    }

    getClueVideoMaterials(){
        this.getDataByPost(7,clue_homeurl+"/clueController/v1.0/getClueMaterials",{clue_id:this.state.clue_id,material_type:'3'})
    }

    getClueIndustrysNoPage(){
        this.getDataByPost(4,clue_homeurl+"/clueController/v1.0/getClueIndustrysNoPage",{})
    }
    getClueDetail(){
        this.getDataByPost(1,clue_homeurl+"/clueController/v1.0/getClueDetail",{clue_id:this.state.clue_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    ClueBean:data
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
                    ClueIndustryBeans:data
                })
                break;
            case 5:
                this.setState({
                    ClueImgMaterialBeans:data
                })
                break;
            case 6:
                this.setState({
                    ClueVoiceMaterialBeans:data
                })
                break;
            case 7:
                this.setState({
                    ClueVideoMaterialBeans:data
                })
                break;
            case 8:
                this.showTip("上传成功");
                this.setState({
                    material_img:""
                })
                this.getClueImgMaterials();
                break;
            case 9:
                this.showTip("上传成功");
                this.setState({
                    material_img2:""
                })
                this.getClueVoiceMaterials();
                break;
            case 10:
                this.showTip("上传成功");
                this.setState({
                    material_img3:""
                })
                this.getClueVideoMaterials();
                break;
            case 11:
                this.showTip("删除成功");
                this.getClueImgMaterials();
                this.getClueVoiceMaterials();
                this.getClueVideoMaterials();
                break;
        }
    }

    insertClue(){
        if(this.isNull(this.state.ClueBean.clue_name)){
            this.showTip("请先填写名称");
            return;
        }
        if(this.isNull(this.state.ClueBean.clue_desc)){
            this.showTip("请先填写描述");
            return;
        }
        if(this.isNaN(this.state.ClueBean.clue_price)){
            this.showTip("线索积分非法");
            return;
        }

        if(this.isNaN(this.state.ClueBean.clue_num)){
            this.showTip("线索数量非法");
            return;
        }
        if(this.isNaN(this.state.ClueBean.clue_buy_num)){
            this.showTip("已购线索数量非法");
            return;
        }
        if(this.isNull(this.state.ClueBean.clue_mobile)){
            this.showTip("请先填写联系电话");
            return;
        }


        var params={};
        params["clue_name"]=this.state.ClueBean.clue_name;
        params["industry_id"]=this.isNull(this.state.ClueBean.industry_id)?this.state.ClueIndustryBeans[0].industry_id:this.state.ClueBean.industry_id;
        params["clue_desc"]=this.state.ClueBean.clue_desc;
        params["clue_price"]=this.state.ClueBean.clue_price;
        params["clue_num"]=this.state.ClueBean.clue_num;
        params["clue_mobile"]=this.state.ClueBean.clue_mobile;
        params["clue_buy_num"]=this.state.ClueBean.clue_buy_num;

        if(this.state.clue_id==="-1"){
            this.getDataByPost(2,clue_homeurl+"/clueController/v1.0/insertClue",params);
        }else{
            params["clue_id"]=this.state.clue_id;
            this.getDataByPost(3,clue_homeurl+"/clueController/v1.0/updateClue",params);
        }
    }

    deleteClueMaterial(){
        this.getDataByPost(11,clue_homeurl+"/clueController/v1.0/deleteClueMaterial"
            ,{material_id:this.state.material_id});
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"线索详情"} history={this.props.history}></Widget.Toolbar>
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
                        {name:"线索名称",flex:1,key:'clue_name'},
                        {name:"行业名称",flex:1,key:'industry_id',type:'select',data:this.state.ClueIndustryBeans,show_value:'industry_name',select_value:'industry_id'},
                        {name:"线索描述",flex:3,key:'clue_desc',type:'textarea'},
                        {name:"线索积分",flex:1,key:'clue_price'},
                        {name:"总共卖几份",flex:1,key:'clue_num'},
                        {name:"已卖几份",flex:1,key:'clue_buy_num'},
                        {name:"线索联系电话",flex:1,key:'clue_mobile'},
                    ]}
                    data={this.state.ClueBean}
                    onChange={(key,value)=>{
                        this.state.ClueBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertClue();
                    }}/>
                <Widget.Detail
                    visible={this.state.clue_id==="-1"?"false":"true"}
                    title="图片材料"
                    baseData={[]}
                    data={{}}
                    renderButton={()=> {
                        return (
                            <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Widget.Img
                                    style={{marginRight:20}}
                                    img_style={{width:50,height:50}}
                                    title_p_style={{display:'none'}}
                                    src={imgurl+this.state.material_img}
                                    url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                    onSuccess={(value)=>{
                                        this.setState({
                                            material_img:value
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{marginRight:20}}
                                    value="添加"
                                    onClick={()=>{
                                        if(this.isNull(this.state.material_img)){
                                            this.showTip("请先选择图片")
                                            return;
                                        }
                                        this.getDataByPost(8,clue_homeurl+"/clueController/v1.0/insertClueMaterial"
                                            ,{clue_id:this.state.clue_id,material_img:this.state.material_img,
                                                material_url:this.state.material_img,material_type:1});
                                    }}/>
                            </div>
                        )
                    }}>
                    <Widget.List
                        data={[
                            {name:"材料ID",flex:1,key:'material_id'},
                            {name:"材料链接",flex:1,key:'material_url'},
                            {name:"操作",flex:1,key:"-1"}]}
                        dataSource={this.state.ClueImgMaterialBeans}
                        operationData={[{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                    this.setState({
                                        visible:true,
                                        material_id:this.state.ClueImgMaterialBeans[rowID].material_id
                                    })
                                    break;
                            }
                        }}>
                    </Widget.List>
                </Widget.Detail>
                <Widget.Detail
                    visible={this.state.clue_id==="-1"?"false":"true"}
                    title="语音材料"
                    baseData={[]}
                    data={{}}
                    renderButton={()=> {
                        return (
                            <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Widget.Img
                                    img_style={{display:'none'}}
                                    title_p_style={{display:'none'}}
                                    type='file'
                                    src={imgurl+this.state.material_img2}
                                    url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                    onSuccess={(value)=>{
                                        this.setState({
                                            material_img2:value
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{marginRight:20}}
                                    value="添加"
                                    onClick={()=>{
                                        if(this.isNull(this.state.material_img2)){
                                            this.showTip("请先选择文件")
                                            return;
                                        }
                                        this.getDataByPost(9,clue_homeurl+"/clueController/v1.0/insertClueMaterial"
                                            ,{clue_id:this.state.clue_id,material_img:this.state.material_img2,
                                                material_url:this.state.material_img2,material_type:2});
                                    }}/>
                            </div>
                        )
                    }}>
                    <Widget.List
                        data={[
                            {name:"材料ID",flex:1,key:'material_id'},
                            {name:"材料链接",flex:1,key:'material_url'},
                            {name:"操作",flex:1,key:"-1"}]}
                        dataSource={this.state.ClueVoiceMaterialBeans}
                        operationData={[{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                    this.setState({
                                        visible:true,
                                        material_id:this.state.ClueVoiceMaterialBeans[rowID].material_id
                                    })
                                    break;
                            }
                        }}>
                    </Widget.List>
                </Widget.Detail>
                <Widget.Detail
                    visible={this.state.clue_id==="-1"?"false":"true"}
                    title="视频材料"
                    baseData={[]}
                    data={{}}
                    renderButton={()=> {
                        return (
                            <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
                                <Widget.Img
                                    img_style={{display:'none'}}
                                    title_p_style={{display:'none'}}
                                    type='file'
                                    src={imgurl+this.state.material_img3}
                                    url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                    onSuccess={(value)=>{
                                        this.setState({
                                            material_img3:value
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{marginRight:20}}
                                    value="添加"
                                    onClick={()=>{
                                        if(this.isNull(this.state.material_img3)){
                                            this.showTip("请先选择文件")
                                            return;
                                        }
                                        this.getDataByPost(10,clue_homeurl+"/clueController/v1.0/insertClueMaterial"
                                            ,{clue_id:this.state.clue_id,material_img:this.state.material_img3,
                                                material_url:this.state.material_img3,material_type:3});
                                    }}/>
                            </div>
                        )
                    }}>
                    <Widget.List
                        data={[
                            {name:"材料ID",flex:1,key:'material_id'},
                            {name:"材料链接",flex:1,key:'material_url'},
                            {name:"操作",flex:1,key:"-1"}]}
                        dataSource={this.state.ClueVideoMaterialBeans}
                        operationData={[{title:"删除"}]}
                        operationClick={(rowID,index)=>{
                            switch (index){
                                case 0:
                                    this.setState({
                                        visible:true,
                                        material_id:this.state.ClueVideoMaterialBeans[rowID].material_id
                                    })
                                    break;
                            }
                        }}>
                    </Widget.List>
                </Widget.Detail>
            </div>
        )
    }
}

module.exports=ClueEditor;