import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

var LoginComponent=require("./component/LoginComponent");

var MainComponent=require("./component/MainComponent");

/**
 * 系统模块
 * @type {MoudleComponent}
 */
var MoudleComponent=require("./component/system/MoudleComponent");
var Moudle2Component=require("./component/system/Moudle2Component");

var MoudleEditorComponent=require("./component/system/MoudleEditorComponent");

var MerchantsAccount=require("./component/system/MerchantsAccount");
var MerchantsAccountEditor=require("./component/system/MerchantsAccountEditor");

var SystemAccountComponent=require("./component/system/SystemAccountComponent");
var SystemAccountEditorComponent=require("./component/system/SystemAccountEditorComponent");
var SystemAccountPasswordComponent=require("./component/system/SystemAccountPasswordComponent");

var SystemRoleComponent=require("./component/system/SystemRoleComponent");
var SystemRoleEditorComponent=require("./component/system/SystemRoleEditorComponent");

var SystemRoleAuthorityComponent=require("./component/system/SystemRoleAuthorityComponent");


var Clue=require("./component/clue/Clue");
var ClueEditor=require("./component/clue/ClueEditor");
var ClueIndustry=require("./component/clue/ClueIndustry");
var ClueIndustryEditor=require("./component/clue/ClueIndustryEditor");




var Welcome=require("./component/Welcome");

var ShopWidget=require("./component/shop/ShopWidget");
var MemberWidget=require("./component/member/MemberWidget")
var MoudleWidget=require("./component/moudle/MoudleWidget")
var FinanceWidget=require("./component/finance/FinanceWidget")
var MaintailWidget=require("./component/yinlong/MaintailWidget")
var ZhangmuWidget=require("./component/zhangmu/ZhangmuWidget")
var KoubeiWidget=require("./component/Koubei/KoubeiWidget")
var InformationWidget=require("./component/information/InformationWidget")
var SettingWidget=require("./component/setting/SettingWidget")
var OneYuanWidget=require("./component/oneyuan/OneYuanWidget")
var PositionWidget=require("./component/position/PositionWidget")
var CompanyWidget=require("./component/company/CompanyWidget")
var ShopCityWidget=require("./component/shopCity/ShopCityWidget")
var BaikeWidget=require("./component/baike/BaikeWidget")

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={LoginComponent}/>
        <Route path="/main" component={MainComponent}>


            <Route path="/baike_class" component={BaikeWidget.BaikeClass}/>
            <Route path="/baike_class2/:parent_id" component={BaikeWidget.BaikeClass2}/>
            <Route path="/baike_class3/:parent_id" component={BaikeWidget.BaikeClass3}/>
            <Route path="/baike_class_editor/:baike_class_id/:parent_id" component={BaikeWidget.BaikeClassEditor}/>

            <Route path="/system_logs" component={MemberWidget.SystemLogs}/>

            <Route path="/member_report" component={MemberWidget.MemberReport}/>
            <Route path="/goods_changer_notes" component={ShopCityWidget.GoodsChangerNotes}/>



            <Route path="/share_information" component={CompanyWidget.ShareInformation}/>
            <Route path="/share_information_editor/:information_id" component={CompanyWidget.ShareInformationEditor}/>

            <Route path="/understand_information" component={CompanyWidget.UnderstandInformation}/>
            <Route path="/understand_information_editor/:information_id" component={CompanyWidget.UnderstandInformationEditor}/>

            <Route path="/record_information" component={CompanyWidget.RecordInformation}/>
            <Route path="/record_information_editor/:information_id" component={CompanyWidget.RecordInformationEditor}/>

            <Route path="/industry_information" component={CompanyWidget.IndustryInformation}/>
            <Route path="/industry_information_editor/:information_id" component={CompanyWidget.IndustryInformationEditor}/>
            <Route path="/offical_information" component={CompanyWidget.OfficalInformation}/>
            <Route path="/offical_information_editor/:information_id" component={CompanyWidget.OfficalInformationEditor}/>
            <Route path="/system_information_class_editor/:class_id" component={CompanyWidget.SystemInformationClassEditor}/>
            <Route path="/system_information_class" component={CompanyWidget.SystemInformationClass}/>

            <Route path="/company_detail" component={CompanyWidget.CompanyEditor}/>


            <Route path="/advertise_order" component={PositionWidget.AdvertiseOrder}/>
            <Route path="/advertise_order_detail/:advertise_order_id" component={PositionWidget.AdvertiseOrderDetail}/>

            <Route path="/final_advertise_order" component={PositionWidget.FinalAdvertiseOrder}/>
            <Route path="/final_advertise_order_member/:position_id" component={PositionWidget.FinalAdvertiseOrderMember}/>
            <Route path="/final_advertise_order_detail/:advertise_order_id" component={PositionWidget.FinalAdvertiseOrderDetail}/>

            <Route path="/position" component={PositionWidget.Position}/>
            <Route path="/position_detail/:position_id" component={PositionWidget.PositionDetail}/>


            <Route path="/position_merchants" component={PositionWidget.PositionMerchants}/>
            <Route path="/position_merchants_review" component={PositionWidget.PositionMerchantsReview}/>
            <Route path="/position_merchants_refuse" component={PositionWidget.PositionMerchantsRefuse}/>


            <Route path="/material" component={PositionWidget.Material}/>
            <Route path="/material_detail/:material_id" component={PositionWidget.MaterialDetail}/>

            <Route path="/resume_score_setting" component={PositionWidget.ResumeScoreSetting}/>

            <Route path="/position_class" component={PositionWidget.PositionClass}/>
            <Route path="/position_class_editor/:position_class_id" component={PositionWidget.PositionClassEditor}/>

            <Route path="/salary" component={PositionWidget.Salary}/>
            <Route path="/salary_editor/:salary_id" component={PositionWidget.SalaryEditor}/>

            <Route path="/i_information_class" component={InformationWidget.InformationClass}/>
            <Route path="/i_information_class_editor/:class_id" component={InformationWidget.InformationClassEditor}/>
            <Route path="/i_information" component={InformationWidget.Information}/>
            <Route path="/i_information_editor/:information_id" component={InformationWidget.InformationEditor}/>

            <Route path="/scene_marketing" component={KoubeiWidget.SceneMarketing}/>
            <Route path="/scene_marketing_class" component={KoubeiWidget.SceneClassMarketing}/>
            <Route path="/scene_give" component={KoubeiWidget.SceneGive}/>
            <Route path="/scene_give_waitreview" component={KoubeiWidget.SceneGiveWaitreview}/>
            <Route path="/scene_give_refuse" component={KoubeiWidget.SceneGiveRefuse}/>
            <Route path="/scene_give_editor/:scene_id" component={KoubeiWidget.SceneGiveEditor}/>
            <Route path="/scene_reduce" component={KoubeiWidget.SceneReduce}/>
            <Route path="/scene_reduce_waitreview" component={KoubeiWidget.SceneReduceWaitreview}/>
            <Route path="/scene_reduce_refuse" component={KoubeiWidget.SceneReduceRefuse}/>
            <Route path="/scene_reduce_editor/:scene_id" component={KoubeiWidget.SceneReduceEditor}/>
            <Route path="/scene_class" component={KoubeiWidget.SceneClass}/>
            <Route path="/scene_class2/:parent_id" component={KoubeiWidget.SceneClass2}/>
            <Route path="/scene_class_editor/:class_id/:parent_id" component={KoubeiWidget.SceneClassEditor}/>


            <Route path="/merchants_bill" component={FinanceWidget.MerchantsBill}/>
            <Route path="/merchants_withdrawals" component={FinanceWidget.MerchantsWithdrawals}/>
            <Route path="/platform_withdrawals" component={FinanceWidget.PlatformWithdrawals}/>
            <Route path="/order_report" component={FinanceWidget.OrderReport}/>
            <Route path="/order_settlement" component={FinanceWidget.OrderSettlement}/>
            <Route path="/order_commission" component={FinanceWidget.OrderCommission}/>
            {/*<Route path="/order_price_by_date" component={FinanceWidget.OrderPriceByDate}/>*/}

            <Route path="/member" component={MemberWidget.Member}/>
            <Route path="/member_detail/:member_id" component={MemberWidget.MemberDetail}/>

            <Route path="/member_address" component={MemberWidget.MemberAddress}/>
            <Route path="/member_bankcard" component={MemberWidget.MemberBankCard}/>

            <Route path="/member_bill" component={MemberWidget.MemberBill}/>
            <Route path="/member_bill_editor/:member_id" component={MemberWidget.MemberBillEditor}/>

            <Route path="/member_credit_bill" component={MemberWidget.MemberCreditBill}/>
            <Route path="/member_credit_bill_editor/:member_id" component={MemberWidget.MemberCreditBillEditor}/>

            <Route path="/member_count" component={MemberWidget.MemberCount}/>

            <Route path="/member_advice" component={MemberWidget.MemberAdvice}/>
            <Route path="/member_voucher" component={MemberWidget.MemberVoucher}/>

            <Route path="/city_hot" component={MemberWidget.CityHot}/>

            <Route path="/task_class" component={MemberWidget.TaskClass}/>
            <Route path="/task_class_editor/:class_id" component={MemberWidget.TaskClassEditor}/>


            <Route path="/member_share" component={ShopWidget.MemberShare}/>

            <Route path="/shop_member" component={ShopWidget.ShopMember}/>
            <Route path="/order_sale" component={ShopWidget.OrderSale}/>
            <Route path="/member_credit" component={ShopWidget.MemberCredit}/>
            <Route path="/goods_sales" component={ShopWidget.GoodsSales}/>
            <Route path="/member_consume" component={ShopWidget.MemberConsume}/>
            <Route path="/member_goods_count" component={ShopWidget.MemberGoodsCount}/>
            <Route path="/member_insert_count" component={ShopWidget.MemberInsertCount}/>

            <Route path="/terrace_total_sale" component={ShopWidget.TerraceTotalSale}/>
            <Route path="/merchants_sale_detail/:merchants_id" component={ShopWidget.MerchantsTotalSaleDetail}/>

            <Route path="/credit_grades" component={ShopWidget.CreditGrades}/>
            <Route path="/credit_grades_editor/:credit_id" component={ShopWidget.CreditGradesEditor}/>

            <Route path="/member_level" component={ShopWidget.MemberLevel}/>
            <Route path="/member_level_editor/:level_id" component={ShopWidget.MemberLevelEditor}/>

            <Route path="/credit_member" component={ShopWidget.CreditMember}/>
            <Route path="/credit_member_editor/:member_id" component={ShopWidget.CreditMemberEditor}/>
            <Route path="/credit_member_editor2/:member_id" component={ShopWidget.CreditMemberEditor2}/>

            <Route path="/order_assessment" component={ShopWidget.OrderAssessment}/>
            <Route path="/order_assessment_goods" component={ShopWidget.OrderGoodsAssessment}/>
            <Route path="/order_assessment_merchants" component={ShopWidget.OrderMerchantsAssessment}/>
            <Route path="/order_assessment_editor/:assessment_id" component={ShopWidget.OrderAssessmentEditor}/>

            <Route path="/order_merchants" component={ShopWidget.OrderMerchants}/>
            <Route path="/order_merchants_editor/:order_id/:order_merchants_id" component={ShopWidget.OrderMerchantsEditor}/>


            <Route path="/order" component={ShopWidget.Order}/>

            <Route path="/order_price_by_date" component={ShopWidget.OrderPriceByDate}/>
            <Route path="/order_editor/:order_id" component={ShopWidget.OrderEditor}/>

            <Route path="/order_refund" component={ShopWidget.OrderRefund}/>
            <Route path="/order_refund_editor/:refund_id" component={ShopWidget.OrderRefundEditor}/>

            <Route path="/order_refund_reason" component={ShopWidget.OrderRefundReason}/>
            <Route path="/order_refund_reason_editor/:refund_reason_id" component={ShopWidget.OrderRefundReasonEditor}/>

            <Route path="/order_recharge_activity" component={ShopWidget.OrderRechargrActivity}/>
            <Route path="/order_recharge_activity_editor/:activity_id" component={ShopWidget.OrderRechargrActivityEditor}/>

            <Route path="/order_logistics_company" component={ShopWidget.OrderLogisticsCompany}/>
            <Route path="/order_logistics_company_editor/:logistics_id" component={ShopWidget.OrderLogisticsCompanyEditor}/>

            <Route path="/shop_percent" component={ShopWidget.Percent}/>
            <Route path="/goods_marketing" component={ShopWidget.MarketingGoods}/>
            <Route path="/goods_class_marketing" component={ShopWidget.MarketingGoodsClass}/>
            <Route path="/goods_activity_descending" component={ShopWidget.ActivityDescending}/>
            <Route path="/goods_activity_descending_editor/:activity_id" component={ShopWidget.ActivityDescendingEditor}/>
            <Route path="/goods_activity_reduce" component={ShopWidget.ActivityReduce}/>
            <Route path="/goods_activity_reduce_editor/:activity_id" component={ShopWidget.ActivityReduceEditor}/>
            <Route path="/goods_activity_give" component={ShopWidget.ActivityGive}/>
            <Route path="/goods_activity_give_editor/:activity_id" component={ShopWidget.ActivityGiveEditor}/>
            <Route path="/goods_activity_goods/:activity_id/:activity_type/:merchants_id" component={ShopWidget.ActivityGoods}/>
            <Route path="/goods_activity_limit" component={ShopWidget.ActivityLimit}/>
            <Route path="/goods_activity_limit_editor/:activity_id" component={ShopWidget.ActivityLimitEditor}/>
            <Route path="/goods_activity_limit_goods/:activity_id" component={ShopWidget.ActivityLimitGoods}/>

            <Route path="/goods_coupon" component={ShopWidget.Coupon}/>
            <Route path="/goods_coupon_editor/:coupon_id" component={ShopWidget.CouponEditor}/>

            <Route path="/goods_freight" component={ShopWidget.Freight}/>
            <Route path="/goods_freight_editor/:freight_id" component={ShopWidget.FreightEditor}/>

            <Route path="/goods" component={ShopWidget.Goods}/>
            <Route path="/goods_changer" component={ShopWidget.GoodsChanger}/>
            <Route path="/goods_review" component={ShopWidget.GoodsReview}/>
            <Route path="/goods_refuse" component={ShopWidget.GoodsRefuse}/>
            <Route path="/goods_add/:goods_type" component={ShopWidget.GoodsAdd}/>
            <Route path="/goods_editor/:goods_id/:class_id/:goods_type" component={ShopWidget.GoodsEditor}/>

            <Route path="/goods_assessment" component={ShopWidget.goodsAssessment}/>
            <Route path="/goods_assessment/:assessment_id" component={ShopWidget.goodsAssessmentEditor}/>

            <Route path="/goods_issue_answer/:goods_issue_id" component={ShopWidget.goodsIssueAnswer}/>
            <Route path="/goods_issue" component={ShopWidget.goodsIssue}/>

            <Route path="/information_assessment_answer/:assessment_id" component={CompanyWidget.InformationAssessmentAnswer}/>
            <Route path="/information_assessment" component={CompanyWidget.InformationAssessment}/>

            <Route path="/banner" component={ShopWidget.Banner}/>
            <Route path="/banner_editor/:banner_id" component={ShopWidget.BannerEditor}/>

            <Route path="/goods_brand" component={ShopWidget.Brand}/>
            <Route path="/goods_brand_editor/:brand_id" component={ShopWidget.BrandEditor}/>

            <Route path="/goods_class" component={ShopWidget.GoodsClass}/>
            <Route path="/goods_class2/:parent_id" component={ShopWidget.GoodsClass2}/>
            <Route path="/goods_class3/:parent_id" component={ShopWidget.GoodsClass3}/>

            <Route path="/goods_class_editor/:class_id/:parent_id" component={ShopWidget.GoodsClassEditor}/>
            <Route path="/goods_industry" component={ShopWidget.Industry}/>
            <Route path="/goods_industry_editor/:industry_id" component={ShopWidget.IndustryEditor}/>
            <Route path="/goods_specification" component={ShopWidget.Specification}/>

            <Route path="/goods_merchants" component={ShopWidget.Merchants}/>
            <Route path="/goods_merchants_refuse" component={ShopWidget.MerchantsRefuse}/>
            <Route path="/goods_merchants_review" component={ShopWidget.MerchantsReview}/>
            <Route path="/goods_merchants_editor/:merchants_id" component={ShopWidget.MerchantsEditor}/>

            <Route path="/clue" component={Clue}/>
            <Route path="/clue_editor/:clue_id" component={ClueEditor}/>
            <Route path="/clue_industry" component={ClueIndustry}/>
            <Route path="/clue_industry_editor/:industry_id" component={ClueIndustryEditor}/>

            <Route path="/type" component={MoudleWidget.Type}/>
            <Route path="/type_editor/:type_id" component={MoudleWidget.TypeEditor}/>

            <Route path="/certification" component={MoudleWidget.Certification}/>
            <Route path="/certification_editor/:certification_id" component={MoudleWidget.CertificationEditor}/>

            <Route path="/recruit" component={MoudleWidget.Recruit}/>
            <Route path="/recruit_editor/:recruit_id" component={MoudleWidget.RecruitEditor}/>

            <Route path="/jobsearch" component={MoudleWidget.JobSearch}/>
            <Route path="/jobsearch_editor/:jobsearch_id" component={MoudleWidget.JobSearchEditor}/>


            <Route path="/setting_advice" component={SettingWidget.Advice}/>
            <Route path="/list_show" component={SettingWidget.ListShowComponent}/>

            <Route path="/html_question" component={SettingWidget.HtmlQuestion}/>
            <Route path="/html_question_editor/:html_id" component={SettingWidget.HtmlQuestionEditor}/>

            <Route path="/html" component={SettingWidget.HtmlComponent}/>
            <Route path="/html_editor/:html_id" component={SettingWidget.HtmlEditorComponent}/>

            <Route path="/system_moudle/:parent_id/:level" component={MoudleComponent}/>
            <Route path="/system_moudle2/:parent_id/:level" component={Moudle2Component}/>

            <Route path="/system_moudle_editor/:moudleBean" component={MoudleEditorComponent}/>
            <Route path="/merchants_account" component={MerchantsAccount}/>
            <Route path="/merchants_account_editor/:systemAccountBean" component={MerchantsAccountEditor}/>
            <Route path="/system_account" component={SystemAccountComponent}/>
            <Route path="/system_account_editor/:systemAccountBean/:type" component={SystemAccountEditorComponent}/>
            <Route path="/system_account_password/:account_id" component={SystemAccountPasswordComponent}/>


            <Route path="/system_role" component={SystemRoleComponent}/>
            <Route path="/system_role_editor/:roleBean" component={SystemRoleEditorComponent}/>
            <Route path="/system_authority/:role_id/:moudle_type" component={SystemRoleAuthorityComponent}/>



            <Route path="/sheepClass" component={ZhangmuWidget.SheepClass}/>
            <Route path="/sheep_class_detail/:class_id" component={ZhangmuWidget.SheepClassDetail}/>
            <Route path="/sheeps" component={ZhangmuWidget.Sheep}/>
            <Route path="/sheep_detail/:sheep_id" component={ZhangmuWidget.SheepDetail}/>
            <Route path="/bitch_sheep_detail/:bitch_sheep_id" component={ZhangmuWidget.BitchSheepDetail}/>
            <Route path="/welfare" component={ZhangmuWidget.welfare}/>
            <Route path="/sheepCoupons" component={ZhangmuWidget.SheepCoupon}/>
            <Route path="/sheepCoupon_detail/:coupon_id" component={ZhangmuWidget.SheepCouponDetail}/>
            <Route path="/sheepBanner" component={ZhangmuWidget.SheepBanner}/>
            <Route path="/sheepBroad" component={ZhangmuWidget.SheepBroad}/>
            <Route path="/sheepBanner_detail/:banner_id"  component={ZhangmuWidget.SheepBannerDetail}/>
            <Route path="/sheepBroad_detail/:broad_id" component={ZhangmuWidget.SheepBroadDetail}/>

            <Route path="/information" component={ZhangmuWidget.Information}/>
            <Route path="/information_detail/:information_id" component={ZhangmuWidget.InformationDetail}/>
            <Route path="/joke_detail" component={ZhangmuWidget.JokeDetail}/>
            <Route path="/video" component={ZhangmuWidget.Video}/>
            <Route path="/video_detail/:video_id" component={ZhangmuWidget.VideoDetail}/>

            <Route path="/camera_detail/:camera_id/:video_id" component={ZhangmuWidget.CameraDetail}/>
            <Route path="/percent" component={ZhangmuWidget.Percent}/>
            <Route path="/msg" component={ZhangmuWidget.MsgType}/>
            <Route path="/sendMsg" component={ZhangmuWidget.SendMsg}/>
            <Route path="/ShopGoods" component={ZhangmuWidget.ShopGoods}/>
            <Route path="/shopGoods_detail/:shop_id" component={ZhangmuWidget.ShopGoodsDetail} />

            <Route path="/selectGoods" component={ZhangmuWidget.SelectGoods}/>
            <Route path="/shopGoods_detailV2/:goods_id" component={ZhangmuWidget.ShopGoodsDetailV2}/>
            <Route path="/sheepOrders" component={ZhangmuWidget.SheepOrders}/>
            <Route path="/memberSheeps" component={ZhangmuWidget.MemberSheeps}/>
            <Route path="/member_sheep_Detail/:member_sheep_id" component={ZhangmuWidget.MemberSheepDetail}/>

            <Route path="/sheep_source" component={ZhangmuWidget.SheepSource} />
            <Route path="/order_detail/:order_id" component={ZhangmuWidget.SheepOrderDetail}/>
            <Route path="/questionClass"  component={ZhangmuWidget.QuestionClass}/>
            <Route path="/questtion_class_detail/:class_id" component={ZhangmuWidget.QuestionClassDetail}/>
            <Route path="/questions/:class_id" component={ZhangmuWidget.Questions}/>
            <Route path="/question_Detail/:question_id/:class_id" component={ZhangmuWidget.QuestionDetail}/>
            <Route path="/shopCoupons" component={ZhangmuWidget.ShopCoupons}/>
            <Route path="/shop_coupon_editor/:coupon_id" component={ZhangmuWidget.ShopCOuponDetail}/>
            <Route path="/gameConfig" component={ZhangmuWidget.GameConfig}/>
            <Route path="/gameGoods/:class_id" component={ZhangmuWidget.GameGoods}/>
            <Route path="/gameGoodss_detail/:goods_id/:class_id" component={ZhangmuWidget.GameGoodsDetail}/>
            <Route path="/gameTask" component={ZhangmuWidget.GameTask}/>
            <Route path="/gameTask_Detail/:task_id" component={ZhangmuWidget.GameTaskDetail}/>
            <Route path="/gameGoodsClass" component={ZhangmuWidget.GameGoodsClass}/>
            <Route path="/game_goods_class_detail/:class_id" component={ZhangmuWidget.GameGoodsClassDetail}/>
            <Route path="/gameJokes" component={ZhangmuWidget.GameJokes}/>
            <Route path="/game_joke_detail/:joke_id" component={ZhangmuWidget.GameJokeDetail}/>
            <Route path="/gamePhoto" component={ZhangmuWidget.GamePhoto}/>
            <Route path="/game_photo_Detail/:photo_id" component={ZhangmuWidget.GamePhotoDetail}/>
            <Route path="/share"  component={ZhangmuWidget.Share}/>
            <Route path="/share_detail/:share_id"  component={ZhangmuWidget.ShareDetail}/>
            
            {/* 集市整合 */}
            <Route path="/goodsV2" component={ZhangmuWidget.Goods}/>
            <Route path="/goods_editorV2/:goods_id/:class_id" component={ZhangmuWidget.GoodsDetail}/>



            <Route path="/activity_one_yuan_shopping" component={OneYuanWidget.ActivityOneYuanShopping}/>
            <Route path="/activity_add/:activity_id" component={OneYuanWidget.AddActivity}/>
            <Route path="/activity_one_yuan_shopping_editor/:activity_id" component={OneYuanWidget.ActivityOneYuanShoppingEditor}/>
            <Route path="/activity_one_yuan_shopping_goods/:activity_id" component={OneYuanWidget.ActivityOneYuanShoppingGoods}/>
            <Route path="/activity_one_yuan_order" component={OneYuanWidget.ActivityOneYuanOrder}/>
            <Route path="/activity_one_yuan_order_Detail/:order_id" component={OneYuanWidget.ActivityOneYuanOrderDetail}/>
            <Route path="/activity_one_yuan_order/:goods_id/:activity_id" component={OneYuanWidget.ActivityOneYuanOrder}/>
            <Route path="/activity_one_yuan_sunburn/:goods_id/:activity_id" component={OneYuanWidget.ActivityOneYuanSunburn}/>
            <Route path="/activity_one_yuan_banner" component={OneYuanWidget.ActivityOneYuanBanner}/>
            <Route path="/activity_one_yuan_banner_editor/:banner_id" component={OneYuanWidget.ActivityOneYuanBannerEditor}/>
            <Route path="/activity_one_yuan_shopping_goodsDetail/:goods_id/:activity_id" component={OneYuanWidget.ActivityOneYuanShoppingGoodsDetail}/>

            <Route path="/maintailVilage" component={MaintailWidget.MaintailVilage}/>
            <Route path="/maintailVilage_Editor/:village_id" component={MaintailWidget.MaintailVilageEditor}/>
            <Route path="/maintail_service_time" component={MaintailWidget.MaintailServiceTime}/>
            <Route path="/maintail_service_time_editor/:service_id" component={MaintailWidget.MaintailServiceTimeEditor}/>
            <Route path="/parts_class" component={MaintailWidget.PartsClass}/>
            <Route path="/parts_class2/:parent_id" component={MaintailWidget.PartsClass2}/>
            <Route path="/parts_class3/:parent_id" component={MaintailWidget.PartsClass3}/>
            <Route path="/parts_class_editor/:parts_id/:parent_id" component={MaintailWidget.PartsClassEditor}/>

            <Route path="/maintail_order" component={MaintailWidget.MaintailOrder}/>
            <Route path="/m_ordermerchants_editor/:order_id" component={MaintailWidget.MaintailOrderEditor}/>
            <Route path="/maintail_order_assessment" component={MaintailWidget.MaintailOrderAssessment}/>
            <Route path="/maintail_order_assessment_editor/:assessment_id" component={MaintailWidget.MaintailOrderAssEditor}/>
            <Route path="/maintail_add_order/:order_id" component={MaintailWidget.MaintailAddOrder}/>

            <Route path="/maintail_banner" component={MaintailWidget.MaintailBanner}/>
            <Route path="/maintail_banner_editor/:banner_id" component={MaintailWidget.MaintailBannerEditor}/>
            <Route path="/member_woker" component={MaintailWidget.MemberWoker}/>
            <Route path="/member_woker_detail/:member_id" component={MaintailWidget.MemberWokerDetail}/>
            <Route path="/maintail_add_worker/:member_id" component={MaintailWidget.MemberWorkerAdd}/>
            <Route path="/maintail_password_worker/:member_id" component={MaintailWidget.MemberPasswordComponent}/>

            <Route path="/maintail_material" component={MaintailWidget.MaintailMaterial}/>
            <Route path="/maintail_material_editor/:material_id" component={MaintailWidget.MaintailMaterialEditor}/>

            <Route path="/renovation_style" component={MaintailWidget.RenovationStyle}/>
            <Route path="/renovation_style_editor/:style_id" component={MaintailWidget.RenovationStyleEditor}/>

            <Route path="/renovation_order" component={MaintailWidget.RenovationOrder}/>
            <Route path="/renovation_order_editor/:order_id" component={MaintailWidget.RenovationOrderEditor}/>

            <Route path="/customized" component={MaintailWidget.Customized}/>
            <Route path="/customized_editor/:customized_id" component={MaintailWidget.CustomizedEditor}/>

            <Route path="/customizedhuxing/:customized_id" component={MaintailWidget.CustomizedHuxing}/>
            <Route path="/customhuxing_editor/:huxing_id/:customized_id" component={MaintailWidget.CustomHuxingEditor}/>

            <Route path="/programme/:huxing_id" component={MaintailWidget.Programme}/>
            <Route path="/programme_editor/:programme_id/:huxing_id" component={MaintailWidget.ProgrammeEditor}/>

            <Route path="/customizedOrder" component={MaintailWidget.CustomizedOrder}/>
            <Route path="/customizedOrder_editor/:order_id" component={MaintailWidget.CustomizedOrderEditor}/>

            <Route path="/caseeffect" component={MaintailWidget.CaseEffect}/>
            <Route path="/caseeffect_editor/:effect_id" component={MaintailWidget.CaseEffectEditor}/>

            <Route path="/maintailmemberbill" component={MaintailWidget.MaintailMemberBill}/>
            <Route path="/maintailmemberbill_editor/:member_id" component={MaintailWidget.MaintailMemberBillEditor}/>
            <Route path="/maintailWokerbill" component={MaintailWidget.MaintailWokerBill}/>
            <Route path="/maintailWokerbill_editor/:member_id" component={MaintailWidget.MaintailWokerEditor}/>
            <Route path="/invocelist" component={MaintailWidget.InvoiceList}/>
            <Route path="/invoicelist_editor/:order_invoice_id" component={MaintailWidget.InvoiceListEditor}/>





            <Route path="/welcome" component={Welcome}/>

        </Route>
    </Router>),document.body);