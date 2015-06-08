/****************************************************************************
 Copyright (c) 2014 Louis W M WU.

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
cobra.add({
    page_list: '{{?it.data1.data.length>0}}\
        {{~it.data1.data:value:inx}}<tr>\
        <td style="padding-left: 10px;">{{=value.id}}</td>\
        <td>{{=value.code}}</td>\
        <td>{{=value.name}}</td>\
        <td>{{=value.port}}</td>\
        <td>{{~value.user_type:val:ix}}{{~it.data2.data.user:va:i}}{{?va.id == val}}{{=va.type}},{{?}}{{~}}{{~}}</td>\
        <td>{{=value.age_stage}}</td>\
        <td>{{=value.rule}}</td>\
        <td>{{=value.desc}}</td>\
        <td>{{=value.apply_status}}</td>\
        <td style="padding-left: 0px;">\
        <div class="tooltip-demo">\
            <a href="javascript:;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="编辑" cb-event="click~goToEdit:{{=inx}},{{=value.id}}"><i class="fa fa-edit"></i></a>\
            <a href="special_plan.html?p_id={{=value.id}}" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="排期"  data-original-title="Edit"><i class="fa fa-clock-o"></i></a>\
            <a href="javascript:;" class="btn btn-white btn-sm" data-toggle="tooltip" data-placement="top" title="删除" data-original-title="Print email" cb-event="click~goToDelete:{{=value.id}}"><i class="fa fa-trash-o"></i> </a>\
        </div></td>\
        </tr>{{~}}\
        {{?}}\
        ',
    full_list:'<div class="hr-line-dashed"></div>\
    <div class="form-group"><label class="col-sm-3 control-label">用户类型：</label>\
    <div class="col-sm-9" >\
    <div class="checkbox-inline i-checks">\
    <div class="icheckbox_square-green" style="position: relative;" cb-id="0" cb-node="user_type_all" cb-event="click~selectAll:user_type;mouseover~showHover:1;mouseout~showHover:0;">\
    </div> 全部\
    </div>\
    <div cb-node="user_type" class="inline">\
    {{~it.data.user:value:ix}}<div class="checkbox-inline i-checks">\
        <div class="icheckbox_square-green" cb-id="{{=value.id}}" style="position: relative;"\
            cb-event="click~checkSelectEvent:user_type,user_type_all;mouseover~showHover:1;mouseout~showHover:0;">\
                </div>\
                    {{=value.type}}\
                </div>{{~}}\
                </div>\
            </div>\
        </div>\
            <div class="hr-line-dashed"></div>\
            <div class="form-group"><label class="col-sm-3 control-label">年龄分类：</label>\
                <div class="col-sm-9" cb-node="age_stage">\
                    {{~it.data.age:value:ix}}<div class="radio i-checks linedisplay">\
                        <div>\
                            <div class="iradio_square-green" cb-id="{{=value.id}}" style="position: relative;"\
                            cb-event="click~checkSelectEvent:port,0;mouseover~showHover:1;mouseout~showHover:0;">\
                            </div>\
                            {{=value.type}}\
                        </div>\
                    </div>{{~}}\
                </div>\
            </div>\
        ',
    pagination:'{{? it.page-1>0}}<li class="paginate_button previous" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_previous"><a href="javascript:;" cb-event="click~goPage:{{= it.page-1}}">上一页</a></li>{{?}}\
         {{? it.page-2>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.page-2}}">{{= it.page-2}}</a></li>{{?}}\
         {{? it.page-1>0}}<li class="paginate_button" aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.page-1}}">{{= it.page-1}}</a></li>{{?}}\
         {{? it.page && it.page>0}}<li class="paginate_button active" aria-controls="DataTables_Table_0" tabindex="0"><span class="current" cb-node="page_current">{{= it.page}}</span></li>{{?}}\
         {{? it.page+1<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.page+1}}">{{= it.page+1}}</a></li>{{?}}\
         {{? it.page+2<=it.total_pages}}<li class="paginate_button " aria-controls="DataTables_Table_0" tabindex="0"><a href="javascript:;" cb-event="click~goPage:{{= it.page+2}}">{{= it.page+2}}</a></li>{{?}}\
         {{? it.page+1<=it.total_pages}}<li class="paginate_button next" aria-controls="DataTables_Table_0" tabindex="0" id="DataTables_Table_0_next"><a href="javascript:;" cb-event="click~goPage:{{= it.page+1}}">下一页</a></li>{{?}}\
         &nbsp;&nbsp;<span class="help-block m-b-none linedisplay">{{?it.total}}{{? parseInt(it.total) > it.pagesize}}当前{{=it.pagesize}}项{{??}}当前{{=it.total}}项{{?}} - {{? it.total}}共{{=it.total}}项{{?}}{{??}}未找到任何记录{{?}}</span>\
         '
});