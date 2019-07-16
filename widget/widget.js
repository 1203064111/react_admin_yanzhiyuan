/**
 * Created by shenjiabo on 16/12/5.
 */


var WidgetComponent = {
    Base:require("./../component/BaseComponent"),
    Foreach:require("./foreach"),
    List:require("./list"),
    Toolbar:require("./toolbar"),
    TabBar:require("./tabbar"),

    Detail:require("./detail"),
    Button:require("./button"),
    Check:require("./check"),
    Date:require("./date"),
    Editor:require("./input"),
    Img:require("./image"),
    ImgButton:require("./image_button"),
    Page:require("./page"),
    Select:require("./select"),
    Textarea:require("./textarea"),
    Text:require("./text"),
    Tip:require("./tip"),
    TipImg:require("./tip_img"),
    View:require("./view"),
    SearchBar:require("./search_bar"),
};
module.exports = WidgetComponent;