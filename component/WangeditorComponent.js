import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import E from 'wangeditor'
var storage = require('key-storage');

var Widget=require('./../widget/widget');

class WangeditorComponent extends Widget.Base{
    constructor(props){
        super(props);
        this.state = {
            editor:null
        };
    }

    componentDidMount(){
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.uploadImgServer = img_homeUrl+"settingInterfaces/v1.0/uploadImgToQiNiu";
        editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024;//默认限制图片大小是 5M
        editor.customConfig.uploadImgMaxLength = 1;//限制一次最多能传几张图片
        editor.customConfig.uploadFileName="file";
        editor.customConfig.menus = [
            'head',
            'fontName',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'foreColor',
            'backColor',
            'link',
            'justify',
            'image',
        ]
        editor.customConfig.fontNames = [
            '宋体',
            '微软雅黑',
            'Arial',
            'Tahoma',
            'Verdana'
        ]
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                console.log(result)
                if(result.status==="ok"){
                    insertImg(imgurl+result.data)
                }else{
                    alert(result.error);
                }
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }

        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            if(this.props.onChange){
                this.props.onChange(html);
            }
        }
        editor.create();
        this.setState({
            editor:editor,
            height:"auto"
        })

    }

    componentWillReceiveProps(nextProps){
        if(this.props.url_desc!==nextProps.url_desc&&!this.isNull(nextProps.url_desc)&&this.state.editor.txt.text()===""){
            this.state.editor.txt.html(nextProps.url_desc)
        }
    }
    // doSuccess(index,data){
    //     switch (index){
    //         case 1:
    //             this.state.editor.txt.html(data)
    //             break;
    //     }
    // }
    //
    // componentWillUnmount() {
    //     // 组件卸载后，清除放入库的id
    //     UE.delEditor(this.props.id);
    // }

    render(){
        return (
            <div ref="editorElem" style={{textAlign: 'left'}}>
            </div>
        )
    }
}

module.exports=WangeditorComponent;