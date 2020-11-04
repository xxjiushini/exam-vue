/**
 * 导入自己需要的elementUI组件
 * @name: ele组件
 * @Author: xiao jun
 * @Date: 2020-09-10
 * Copyright(c) 2015-2010 xiaojun.
 */
import {
    Dialog,
} from 'element-ui'
const element = {
    install: function (Vue) {
        Vue.use(Dialog)
    }
}
export default element
