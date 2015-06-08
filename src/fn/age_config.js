/****************************************************************************
 Copyright (c) 2014 Louis Y P Chen.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * Created by Louis W M Wu on 2014/12/24.
 */

(function (cb) {
    cb._({
        "~name": "op.age_config",

        "~superclass": cb.base,

        ctor: function (options) {
            this.api = "age_config";
            this._super(options);
        },
        postCreate: function () {
            this.$.side_menu.metisMenu();
            this.request("getAgeList");
        },
        /*获取年龄类型列表 */
        getAgeListArgs: function () {
            return {
                type: "post",
                data: {pageId:this.pageid
                },
                done: cobra.ride(this, function (data) {
                    $.when(this.compile(this.$.age_list, "age_config>age_list", data)).done(cobra.ride(this, function(){
                        this.compile(this.$.pagination, "age_config>pagination", data);
                    }));
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        sideMenu:function(){
            var t = arguments[arguments.length - 1];
            if(t.hasClass('showMenu')){
                t.removeClass('showMenu');
                this.$.body.removeClass('body-small');
                this.$.sideBar.hide();
                this.$.mainContent.addClass('full');
            }else{
                t.addClass('showMenu');
                this.$.body.addClass('body-small');
                this.$.sideBar.show();
                this.$.mainContent.removeClass('full');
            }
        },
        /*点击删除按钮 */
        goToDelete:function(ageid){
            this.ageid = ageid;
            this.showPopupBox();
        },
        /*点击修改按钮*/
        goToEdit:function(id){
            this.editId = id;
            this.request('getAgeDetail');
        },
        goPage:function(pageId){
            this.pageId = pageId;
            this.request('getAgeList');
        },
        getDelAgeListArgs: function () {
            return {
                type: "post",
                data: {id:this.ageid
                },
                done: cobra.ride(this, function (data) {
                    this._msgBox.info('删除成功！');
                   this.request('getAgeList');
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        getAgeDetailArgs: function () {
            return {
                type: "post",
                data: {id:this.editId
                },
                done: cobra.ride(this, function (data) {
                   var data = data.data;
                   if(data){
                       this.$.age_code.val(data.code);
                       this.$.age_name.val(data.type);
                       this.validateCheckedVal('sex',data.sex);
                       this.validateCheckedVal('apply',data.apply_status);
                       this.$.start_year.val(data.start_year);
                       this.$.start_month.val(data.start_month);
                       this.$.end_year.val(data.end_year);
                       this.$.end_month.val(data.end_month);
                       this.$.age_title.text('修改年龄类型');
                       this.$.new_add.show();
                   }else{
                   this._msgBox.warn('没有返回用户类型信息');
                   }
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*点击新增按钮刷新页面 */
        newAddAge:function(){
                window.location.reload();
        },
        validateCheckedVal:function(name, val){
            var p = this.$[name].find('.iradio_square-green');
            p.removeClass('checked');
            switch(val){
                case "0":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='0'?$(val).addClass('checked'):'';
                    });
                    break;
                case "1":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='1'?$(val).addClass('checked'):'';
                    });
                    break;
                case "2":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='2'?$(val).addClass('checked'):'';
                    });
                    break;
                case "-1":
                    p.each(function(i,val){
                        $(val).attr('cb-id')=='-1'?$(val).addClass('checked'):'';
                    });
                    break;
            }
        },
        /* 页面单选按钮的时间*/
        showHover:function(n,ele){
            if(n=='1'){
                ele.addClass('hover');
            }else{
                ele.removeClass('hover');
            }
        },
        checkSelectEvent:function(name, val){
            var ele = arguments[arguments.length - 1];
            ele.toggleClass('checked');
            var sc = ele.closest('.radio').siblings().find('.checked');
            sc.removeClass('checked');
            if(ele.hasClass('checked')){
                this[name] = val;
            }else{
                this[name] = '';
            }
        },
        /*新增或修改表单提交 */
        submitNewAdd:function(){
            if(this.validateEditForm()){
                this.request('getAgeSubmit');
            }
        },
        getAgeSubmitArgs: function () {
            return {
                type: "post",
                data: {id:this.editId,
                    code:this.$.age_code.val(),
                    type:this.$.age_name.val(),
                    sex:this.$.sex.find('.checked').attr('cb-id'),
                    start_year:this.$.start_year.val(),
                    start_month:this.$.start_month.val(),
                    end_year:this.$.end_year.val(),
                    end_month:this.$.end_month.val(),
                    apply:this.$.apply.find('.checked').attr('cb-id')
                },
                done: cobra.ride(this, function (data) {
                    var title='提交结果';
                    var result=$("<div></div>");
                    var resultOpt={
                        width:350,
                        height:150,
                        closeX:true,
                        title: this.parse(title, data),
                        content:"<div style='text-align: center;font-size: 16px;line-height: 50px;color:#E62D8B;font-weight: bold;'>提交成功!</div>",
                        'buttons':[
                            {
                                'value':'确定',
                                'type':'',
                                'click':function(){
                                    window.location.reload();
                                }
                            }
                        ],
                        clickCloseX:function(){
                            window.location.reload();
                        }
                    }
                    miniDialog(resultOpt);
                }),
                fail: function (data) {
                    this._msgBox.warn(data.responseBody.responseInfo.reasons.msg);
                }
            };
        },
        /*新增或修改表单验证 */
        validateEditForm:function(){
            var err='';
            if(this.$.age_code.val()==''){
                err += '年龄编码不能为空!<br/>';
            }
            if(this.$.age_name.val()==''){
                err += '年龄名称不能为空!<br/>';
            }
            if(this.$.sex.find('.checked').length==0){
                err += '请选择性别!<br/>';
            }
            if(this.$.apply.find('.checked').length==0){
                err += '请选择是否启用!<br/>';
            }
            if (err && err!=''){
                this._msgBox.warn(err);
                return false;
            }else{
                return true;
            }
        },
        /*删除时的弹出框 */
        showPopupBox:function(){
            this.popup_dialog = new cobra.modal({
                title : '删除年龄类型',
                tip : '',
                content : '<div class="ibox-content"><p style="text-align: center;">确定要删除该年龄类型吗？</p></div>',
                confirm : cobra.ride(this, function(){
                    this.request('getDelAgeList');
                })
            });
        }
    });
    $(function () {
        new op.age_config();
    });
})(cobra);