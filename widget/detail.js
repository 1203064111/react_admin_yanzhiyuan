/**
 * Created by sjb on 17/7/28.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Input=require('./input');
var Button=require('./button');
var Image=require('./image');
var Video=require('./video');

var Date=require('./date');
var Textarea=require('./textarea');
var Text=require('./text');
var Select=require('./select');
var SearchBar=require('./search_bar');
var TipImage=require('./tip_img');
var Check=require('./check');
var City=require('./city');
var CityHot=require('./city_hot');
var Radio=require('./radio');
var RadioSelect=require('./radio_select');
var Foreach=require('./foreach');

class detail extends Component{
    constructor(props) {
        super(props);
        this.state={
            visible:false
        }
    };
    render(){
        var viewTemp=[];
        for(let i=0;i<this.props.baseData.length;i++){
            let title;

            if(this.props.baseData[i].keys){
                title=this.props.data;
                for(let m=0;m<this.props.baseData[i].keys.length;m++){
                    title=title[this.props.baseData[i].keys[m]];
                }
            }else{
                title=this.props.data[this.props.baseData[i].key]
            }

            if(this.props.baseData[i].type==='radio_select'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <RadioSelect
                            width={150}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            title={this.props.baseData[i].name}
                            value={title}
                            onClick={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,value);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='check'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Check
                            visible="true"
                            title={this.props.baseData[i].name}
                            checked={title}
                            onClick={(checked)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,checked);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='checks'){
                viewTemp.push(
                    <div className="detail_item" style={{wordWrap:"break-word"}}>
                        <div style={{width:150,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                            <p1 className='p_000000' >{this.props.baseData[i].name}</p1>
                        </div>
                        <Foreach
                            style={{display:'flex'}}
                            dataSource={this.props.baseData[i].data}
                            renderRow={(index)=>{
                                return(
                                    <Check
                                        visible="true"
                                        title={this.props.baseData[i].data[index][this.props.baseData[i].key]}
                                        checked={this.props.baseData[i].data[index].is_check}
                                        onClick={(checked)=>{
                                            this.props.onChange(this.props.baseData[i].key,checked,index);
                                        }}/>
                                )
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='img_click'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <div style={{display:'flex',alignItems:'center',marginLeft:0,marginTop:0, marginRight:0}}
                             onClick={()=>{
                                 this.setState({
                                     visible:true,
                                     src:this.props.data[this.props.baseData[i].key]?this.props.data[this.props.baseData[i].key].indexOf("http")>=0?this.props.data[this.props.baseData[i].key]:imgurl+this.props.data[this.props.baseData[i].key]:""
                                 })
                             }}>
                            <div style={{ width:150,display:'flex',justifyContent:'flex-end',}}>
                                <p1 style={{fontSize:13}}>{this.props.baseData[i].name}</p1>
                            </div>
                            <img src={title?title.indexOf("http")>=0?title:imgurl+title:""}
                                 style={{marginLeft:10,width:80,height:80}}/>
                        </div>
                    </div>
                )
            }else if(this.props.baseData[i].type==='imgs'){//图片展示
                let imgs=this.props.data[this.props.baseData[i].key];
                let img_array=[];
                if(imgs!=null&&imgs!==""){
                    let imgArray=imgs.split(',');
                    for(let k=0;k<imgArray.length;k++){
                        img_array.push(
                            <img src={imgArray[k]?imgArray[k].indexOf("http")>=0?imgArray[k]:imgurl+imgArray[k]:""}
                                 style={{marginLeft:10,width:80,height:80}}
                                 onClick={()=>{
                                     this.setState({
                                         visible:true,
                                         src:imgArray[k]?imgArray[k].indexOf("http")>=0?imgArray[k]:imgurl+imgArray[k]:""
                                     })
                                 }}/>
                        )
                    }
                }
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <div style={{display:'flex',alignItems:'center',marginLeft:0,marginTop:0, marginRight:0}}
                             onClick={()=>{
                                 this.setState({
                                     visible:true,
                                     src:this.props.data[this.props.baseData[i].key]?this.props.data[this.props.baseData[i].key].indexOf("http")>=0?this.props.data[this.props.baseData[i].key]:imgurl+this.props.data[this.props.baseData[i].key]:""
                                 })
                             }}>
                            <div style={{ width:150,display:'flex',justifyContent:'flex-end',}}>
                                <p1 style={{fontSize:13}}>{this.props.baseData[i].name}</p1>
                            </div>
                            {img_array}
                        </div>
                    </div>
                )
            }else if(this.props.baseData[i].type==='img'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Image
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            img_style={this.props.baseData[i].img_style}
                            close_style={{display:'flex'}}
                            title={this.props.baseData[i].name}
                            src={title?title.indexOf("http")>=0?title:imgurl+title:"./images/add.jpg"}
                            url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                            onSuccess={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,value);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='video'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Video
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            img_style={this.props.baseData[i].img_style}
                            title={this.props.baseData[i].name}
                            src={title?title.indexOf("http")>=0?title:imgurl+title:""}
                            poster={title?"":"./images/add.jpg"}
                            url={img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu"}
                            onSuccess={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,value);
                                }
                            }}/>
                        <p1 className="p" style={{display:title?"flex":"none",color:'#000000'}}>{imgurl+title}</p1>
                        <Button
                            style={{display:title?"flex":"none",marginLeft:10}}
                            value="预览"
                            onClick={()=>{
                                this.openVideo(imgurl+title);
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='date'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Date
                            title={this.props.baseData[i].name}
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            date_style={{width:this.props.width?this.props.width:600}}
                            type={this.props.baseData[i].dateType}
                            value={this.props.data[this.props.baseData[i].key]}
                            onChange={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,value);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='dates'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Date
                            title={this.props.baseData[i].name}
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            date_style={{width:this.props.width?this.props.width:600}}
                            type={this.props.baseData[i].dateType}
                            value={this.props.data[this.props.baseData[i].key]?this.props.data[this.props.baseData[i].key]+" - "+this.props.data[this.props.baseData[i].key2]:""}
                            range={true}
                            onChange={(value)=>{
                                if(this.props.onChange){
                                    let a=value.split(" - ");
                                    this.props.onChange(this.props.baseData[i].key,a[0]);
                                    this.props.onChange(this.props.baseData[i].key2,a[1]);
                                }
                            }}/>
                    </div>
                )
            }
            else if(this.props.baseData[i].type==='textDate'){
                if(title&&title.indexOf(".0")>0){
                    title=title.substring(0,title.length-2);
                }
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Text
                            titleWidth={150}
                            title={this.props.baseData[i].name}
                            width={this.props.width?this.props.width:600}
                            value={title}/>
                    </div>
                )
            }
            else if(this.props.baseData[i].type==='textarea'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Textarea
                            width={150}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            title={this.props.baseData[i].name}
                            widthContent={this.props.width?this.props.width:600}
                            height={60}
                            value={title}
                            onChange={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,value);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='text'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Text
                            titleWidth={150}
                            title={this.props.baseData[i].name}
                            width={this.props.width?this.props.width:600}
                            value={title}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='select'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Select
                            width={150}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            selectWidth={this.props.width?this.props.width:600}
                            selectHeight={30}
                            title={this.props.baseData[i].name}
                            show_value={this.props.baseData[i].show_value}
                            select_value={this.props.baseData[i].select_value}
                            init_value={title+""}
                            dataSource={this.props.baseData[i].data}
                            onChange={(index)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].show_value,this.props.baseData[i].data[index][this.props.baseData[i].show_value]);
                                    this.props.onChange(this.props.baseData[i].key,this.props.baseData[i].data[index][this.props.baseData[i].select_value]);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='search'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <SearchBar
                            width={150}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            inputWidth={this.props.width?this.props.width:600}
                            title={this.props.baseData[i].name}
                            value={this.props.baseData[i].key}
                            dataSource={this.props.baseData[i].data}
                            item_name={this.props.baseData[i].item_name}
                            onChange={(value)=>{
                                this.props.baseData[i].onChange(value);
                            }}
                            onPress={(bean)=>{
                                this.props.baseData[i].onPress(bean);
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='city'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <City
                            width={150}
                            selectWidth={this.props.width?this.props.width/3:200}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            title={this.props.baseData[i].name}
                            province={this.props.data[this.props.baseData[i].key1]}
                            city={this.props.data[this.props.baseData[i].key2]}
                            area={this.props.data[this.props.baseData[i].key3]}
                            addressBeans={this.props.baseData[i].addressBeans}
                            onChange={(province,city,area)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key1,province);
                                    this.props.onChange(this.props.baseData[i].key2,city);
                                    this.props.onChange(this.props.baseData[i].key3,area);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='city_hot'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <CityHot
                            width={150}
                            selectWidth={this.props.width?this.props.width/2:200}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            title={this.props.baseData[i].name}
                            province={this.props.data[this.props.baseData[i].key1]}
                            city={this.props.data[this.props.baseData[i].key2]}
                            addressBeans={this.props.baseData[i].addressBeans}
                            onChange={(province,city,area)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key1,province);
                                    this.props.onChange(this.props.baseData[i].key2,city);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='city'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <City
                            width={150}
                            selectWidth={this.props.width?this.props.width/3:200}
                            is_must={this.props.baseData[i].is_must?this.props.baseData[i].is_must:"true"}
                            title={this.props.baseData[i].name}
                            province={this.props.data[this.props.baseData[i].key1]}
                            city={this.props.data[this.props.baseData[i].key2]}
                            area={this.props.data[this.props.baseData[i].key3]}
                            addressBeans={this.props.baseData[i].addressBeans}
                            onChange={(province,city,area)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key1,province);
                                    this.props.onChange(this.props.baseData[i].key2,city);
                                    this.props.onChange(this.props.baseData[i].key3,area);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='editor_check'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Input
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            input_style={{marginLeft:10,width:this.props.width?this.props.width:600}}
                            type={this.props.baseData[i].type}
                            title={this.props.baseData[i].name}
                            value={this.props.data[this.props.baseData[i].key1]}
                            checked={this.props.data[this.props.baseData[i].key2]}
                            onChange={(index,value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(index==1?this.props.baseData[i].key1:this.props.baseData[i].key2,value);
                                }
                            }}/>
                    </div>
                )
            } else if(this.props.baseData[i].type==='radio'){
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Radio
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            title={this.props.baseData[i].name}
                            show_value={this.props.baseData[i].show_value}
                            select_value={this.props.baseData[i].select_value}
                            dataSource={this.props.baseData[i].data}
                            value={title+""}
                            onClick={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key, value);
                                }
                            }}/>
                    </div>
                )
            }else if(this.props.baseData[i].type==='widget'){//自定义控件
                viewTemp.push(
                    this.props.renderWidget(this.props.baseData[i].key)
                )
            }else{
                viewTemp.push(
                    <div className="detail_item" style={this.props.baseData[i].style}>
                        <Input
                            title_style={{width:150}}
                            title_p_style={{display:this.props.baseData[i].is_must?this.props.baseData[i].is_must:"flex"}}
                            input_style={{marginLeft:10,width:this.props.width?this.props.width:600}}
                            type={this.props.baseData[i].type}
                            title={this.props.baseData[i].name}
                            value={title}
                            onChange={(value)=>{
                                if(this.props.onChange){
                                    this.props.onChange(this.props.baseData[i].key,value);
                                }
                            }}/>
                    </div>
                )
            }
        }

        return(
            <div style={{display:'flex',flexDirection:'column',flex:1,marginLeft:20,marginRight:20,marginTop:20,
                marginBottom:this.props.marginBottom?this.props.marginBottom:0,
                borderWidth:1,borderColor:'#efefef',borderStyle: 'solid',}}>
                <TipImage
                    visible={this.state.visible}
                    src={this.state.src}
                    onClose={()=>{
                        this.setState({
                            visible:false
                        })
                    }}/>
                <div style={{display:'flex',background:'RGB(245,250,254)',minHeight:30,alignItems:'center'}}>
                    <p1 style={{fontSize:10,color:'#87CEFA',marginLeft:20}}>{this.props.title}</p1>
                    <div style={{display:this.props.onSave?"flex":"none",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                        <Button
                            style={{display:this.props.onSave?"flex":"none",marginRight:20}}
                            value="保存"
                            onClick={()=>{
                                if(this.props.onSave){
                                    this.props.onSave();
                                }
                            }}/>
                    </div>
                    {this.props.renderButton?this.props.renderButton():null}
                </div>
                {viewTemp}
                {this.props.children}
                <div style={{display:'flex',flex:1,height:10}}>
                </div>
                {this.props.renderBottom?this.props.renderBottom():null}
            </div>
        )
    }


    openVideo(title){
        layui.use('layer', function(){
            var layer = layui.layer;
            layer.open({
                type: 2,
                title: false,
                area: ['630px', '360px'],
                shade: 0.8,
                closeBtn: 0,
                shadeClose: true,
                content:title
            });
        });
    }
}

module.exports=detail;
