/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MerchantsEditor extends Widget.Base{

    constructor(props) {
        super(props);
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            merchantsBean:{merchants_state:"0"},
            merchants_id:this.getNull(systemAccountBean.merchants_id,this.props.params.merchants_id),
            cityBeans:[],
            systemAccountBean:systemAccountBean,
            apply_state:"",
            typeBeans:[
                {name:"请选择",value:''},
                {name:"医院",value:'1'},
                {name:"名师",value:'2'},
                {name:"海外",value:'3'}],
            stateBeans:[
                {name:"上线",value:'1'},
                {name:"下线",value:'0'}],
            merchants_type:"2",
        };
    }

    componentDidMount() {
        if(this.props.params.merchants_id!=="-1"){
            this.getMerchantsDetail();
        }
        if(this.props.params.merchants_id==="-1"){
            var merchants_img="-1";
            var imgs=[];
            imgs=merchants_img.split(",");
            this.setState({
                imgBeans:imgs,
            });
        }
        this.getCitys();
    }


    getCitys(){
        this.getDataByPost(5,member_homeurl+"/settingController/v1.0/getCitys",{});
    }

    getMerchantsDetail(){
        this.getDataByPost(1,shop_homeurl+"/merchantsController/v1.0/getMerchantsDetail",{merchants_id:this.state.merchants_id});
    }



    doSuccess(index,data){
        switch (index){
            case 1:
                var merchants_img=data.merchants_imgs;
                var imgs=[];
                if(!this.isNull(merchants_img)){
                    imgs=merchants_img.split(",");
                }else{
                    merchants_img="-1";
                    imgs=merchants_img.split(",");
                }
                this.setState({
                    merchantsBean:data,
                    imgBeans:imgs,
                });
                console.log(imgbeans);

                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;

            case 5:
                this.setState({
                    cityBeans:data
                })
                break;
            case 6:
                this.showTip("审核成功");
                this.props.history.goBack();
                break;
        }
    }



    insertMerchants(){
        if(this.isNull(this.state.merchantsBean.merchants_type)){
            this.showTip("请先选择商家类型");
            return;
        }
        if(this.isNull(this.state.merchantsBean.merchants_name)){
            this.showTip("请先添加名称");
            return;
        }



        var params={};
        var imgsReplace = this.state.imgBeans.toString();
        if(imgsReplace&&imgsReplace.indexOf(",-1")>0){
            imgsReplace=imgsReplace.substring(0,imgsReplace.length-3);
        }
        params["merchants_province"]=this.getNull(this.state.merchantsBean.merchants_province,this.state.cityBeans[0].name);
        params["merchants_city"]=this.getNull(this.state.merchantsBean.merchants_city,this.state.cityBeans[0].cityBeans[0].name);
        params["merchants_country"]=this.getNull(this.state.merchantsBean.merchants_country,this.state.cityBeans[0].cityBeans[0].cityBeans[0].name);
        params["merchants_detail_address"]=this.state.merchantsBean.merchants_detail_address;

        params["merchants_img"]=this.state.merchantsBean.merchants_img;
        params["merchants_imgs"]=imgsReplace;
        params["merchants_name"]=this.state.merchantsBean.merchants_name;
        params["merchants_contact_name"]=this.state.merchantsBean.merchants_contact_name;
        params["merchants_contact_mobile"]=this.state.merchantsBean.merchants_contact_mobile;
        params["merchants_desc"]=this.state.merchantsBean.merchants_desc;
        params["merchants_state"]=this.state.merchantsBean.merchants_state;
        params["merchants_type"]=this.state.merchantsBean.merchants_type;
        params["merchants_certificate_no"]=this.state.merchantsBean.merchants_certificate_no;
        params["certificate_imgs"]=this.state.merchantsBean.certificate_imgs;
        params["merchants_certificate_img"]=this.state.merchantsBean.merchants_certificate_img;
        params["company_legal_positive_img"]=this.state.merchantsBean.company_legal_positive_img;
        params["company_legal_opposite_img"]=this.state.merchantsBean.company_legal_opposite_img;
        params["company_business_img"]=this.state.merchantsBean.company_business_img;
        params["company_house_rental_img"]=this.state.merchantsBean.company_house_rental_img;
        params["merchants_price_img"]=this.state.merchantsBean.merchants_price_img;
        params["company_legal_img"]=this.state.merchantsBean.company_legal_img;
        params["company_legal_hold_img"]=this.state.merchantsBean.company_legal_hold_img;











        if(this.state.merchants_id==="-1"){

            this.getDataByPost(2,shop_homeurl+"/merchantsController/v1.0/insertMerchants",params);
        }else{
            params["merchants_id"]=this.state.merchants_id;
            this.getDataByPost(3,shop_homeurl+"/merchantsController/v1.0/updateMerchants",params);
        }
    }


    render(){
        let baseData2=[]

        if(this.state.merchantsBean.merchants_type+""==="1"&& this.state.systemAccountBean.merchants_id+""===""){

            baseData2=baseData2.concat([
                {name:"医院环境照片",flex:1,key:'merchants_imgs',type:'widget'},
                {name:"医院营业执照",flex:1,key:'company_business_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院医疗许可证书",flex:1,key:'certificate_imgs',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院的医生资格证",flex:1,key:'merchants_certificate_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"房屋租赁合同",flex:1,key:'company_house_rental_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院价目表",flex:1,key:'merchants_price_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院法人身份证正面",flex:1,key:'company_legal_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},

                {name:"医院经办人手持身份证照",flex:1,key:'company_legal_hold_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院经办人正面照",flex:1,key:'company_legal_positive_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院经办人反面照",flex:1,key:'company_legal_opposite_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
            ]);
        }
        else if(this.state.merchantsBean.merchants_type+""==="2"&& this.state.systemAccountBean.merchants_id+""===""){
            baseData2=baseData2.concat([
                {name:"环境照片",flex:1,key:'merchants_imgs',type:'widget'},
                {name:"从业资格证编号",flex:1,key:'merchants_certificate_no'},
                {name:"从业资格证正面",flex:1,key:'certificate_imgs',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"从业资格证反面",flex:1,key:'merchants_certificate_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},

                {name:"身份证正面照",flex:1,key:'company_legal_positive_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"身份证反面照",flex:1,key:'company_legal_opposite_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
            ]);
        }else if(this.state.merchantsBean.merchants_type+""==="3" && this.state.systemAccountBean.merchants_id+""===""){
            baseData2=baseData2.concat([
                {name:"医院环境照片",flex:1,key:'merchants_imgs',type:'widget'},
                {name:"医院营业执照",flex:1,key:'company_business_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院医疗许可证书",flex:1,key:'certificate_imgs',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院的医生资格证",flex:1,key:'merchants_certificate_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"房屋租赁合同",flex:1,key:'company_house_rental_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院价目表",flex:1,key:'merchants_price_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院法人身份证正面",flex:1,key:'company_legal_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},

                {name:"医院经办人手持身份证照",flex:1,key:'company_legal_hold_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院经办人正面照",flex:1,key:'company_legal_positive_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                {name:"医院经办人反面照",flex:1,key:'company_legal_opposite_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
            ]);
        }
        return(
            <div>
                <Widget.Toolbar title={"商家详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="商家信息"
                    baseData={[
                        {name:"商家名称",flex:1,key:'merchants_name'},
                        {name:"商家联系人",flex:1,key:'merchants_contact_name'},
                        {name:"商家联系电话",flex:1,key:'merchants_contact_mobile'},
                        {name:"商家省市区",flex:1,key1:'merchants_province',key2:'merchants_city',key3:'merchants_country',type:'city',addressBeans:this.state.cityBeans},
                        {name:"商家联系地址",flex:1,key:'merchants_detail_address'},
                        {name:"商家头像",flex:1,key:'merchants_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                        {name:"商家简介",flex:1,key:'merchants_desc',type:'textarea'},
                        {name:"商家状态",flex:1,key:'merchants_state',type:'select',data:this.state.stateBeans,show_value:'name',select_value:'value'},
                        {name:"商家类型",flex:1,key:'merchants_type',type:'select',data:this.state.typeBeans,show_value:'name',select_value:'value'},

                    ]}
                    data={this.state.merchantsBean}
                    onChange={(key,value,index)=>{

                        this.state.merchantsBean[key]=value;
                        this.refresh();
                    }}
                    />




                {/*<Widget.Detail*/}
                    {/*title="公司信息"*/}
                    {/*baseData={[*/}
                        {/*{name:"公司名称",flex:1,key:'company_name'},*/}
                        {/*{name:"注册类型",flex:1,key:'company_type'},*/}
                        {/*{name:"公司省市区",flex:1,key1:'company_province',key2:'company_city',key3:'company_country',type:'city',addressBeans:this.state.cityBeans},*/}
                        {/*{name:"注册地址",flex:1,key:'company_detail_address'},*/}
                        {/*{name:"注册资本",flex:1,key:'company_register_capital'},*/}
                        {/*{name:"成立日期",flex:1,key:'company_register_time',type:"date"},*/}
                        {/*{name:"经营范围",flex:1,key:'company_business_range',type:'textarea'},*/}
                    {/*]}*/}
                    {/*data={this.state.merchantsBean}*/}
                    {/*onChange={(key,value,index)=>{*/}

                            {/*this.state.merchantsBean[key]=value;*/}
                        {/*this.refresh();*/}
                    {/*}}/>*/}

                <Widget.Detail
                    title="资质信息"
                    baseData={baseData2}
                    data={this.state.merchantsBean}
                    renderWidget={(key)=>{
                        if(key=="merchants_imgs"){
                            return(
                                <div className="input_div" style={this.props.style}>
                                    <div className="title" style={{width:150}}>
                                        <p1 className="title_p">*</p1>
                                        <p1 className="p" style={{color:'#000000'}}>轮播图</p1>
                                    </div>
                                    <Widget.Foreach
                                        style={{display:'flex',overflow:'auto'}}
                                        dataSource={this.state.imgBeans}
                                        renderRow={(rowID)=>{
                                            return(
                                                <div style={{display:'flex'}}>
                                                    <Widget.Img
                                                        title_style={{display:'none'}}
                                                        img_style={{width:80,height:80,marginLeft:10}}
                                                        src={this.state.imgBeans[rowID]==="-1"?"./images/add.jpg":imgurl+this.state.imgBeans[rowID]}
                                                        url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                                                        onSuccess={(value)=>{
                                                            if(this.state.imgBeans[rowID]==="-1"){
                                                                this.setState({
                                                                    imgBeans:([value]).concat(this.state.imgBeans)
                                                                })

                                                            }else{
                                                                this.state.imgBeans[rowID]=value;
                                                                this.refresh();

                                                            }
                                                        }}/>
                                                    <div style={{display:this.state.imgBeans[rowID]==='-1'?"none":"flex"}}
                                                         className={"Hui-iconfont Hui-iconfont-close2"}
                                                         onClick={()=>{
                                                             this.state.imgBeans.splice(rowID,1);
                                                             this.refresh();
                                                         }}>
                                                    </div>
                                                </div>
                                            )
                                        }}/>



                                </div>
                            )
                        }
                    }}

                    onChange={(key,value,index)=>{

                        this.state.merchantsBean[key]=value;
                        this.refresh();
                    }}
                    />


                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.insertMerchants();
                        }}/>
                    <Widget.Button
                        style={{display:this.state.merchants_id !== -1?(this.state.merchantsBean.apply_state==='0'?'flex':"none"):"none",marginLeft:20,width:200,height:30,marginBottom:20}}
                        value="通过"
                        onClick={()=>{
                            this.openTip("确认通过?",()=>{
                                this.getDataByPost(6,shop_homeurl+"/merchantsController/v1.0/auditMerchants",
                                    {merchants_id:this.state.merchants_id,apply_state:"1"});
                            });
                        }}/>
                    <Widget.Button
                        style={{display:this.state.merchants_id !== -1?(this.state.merchantsBean.apply_state==='0'?'flex':"none"):"none",marginLeft:20,width:200,height:30,marginBottom:20}}
                        value="拒绝"
                        onClick={()=>{
                            this.openTip("确认拒绝?",()=>{
                                this.getDataByPost(6,shop_homeurl+"/merchantsController/v1.0/auditMerchants",
                                    {merchants_id:this.state.merchants_id,apply_state:"2"});
                            });
                        }}/>

                </div>
            </div>
        )
    }
}

module.exports=MerchantsEditor;