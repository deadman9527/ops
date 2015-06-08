/****************************************************************************
 Copyright (c) 2014 Louis W M Wu

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
    /* 用户类型配置 */
    "getAgeList" : {
        url : "/m.php?m=PmsAge&a=getAgeList",
        dev_url : "../../../stub/age_list.json"
    },
    /* 删除用户类型 */
    "getDelAgeList" : {
        url : "/m.php?m=PmsAge&a=delete",
        dev_url : "../../../stub/del_age_list.json"
    },
    "getAgeDetail" : {
        url : "/m.php?m=PmsAge&a=getAgeInfo",
        dev_url : "../../../stub/age_detail.json"
    },
    "getAgeSubmit" : {
        url : "/m.php?m=PmsAge&a=edit",
        dev_url : "../../../stub/age_submit.json"
    }
});