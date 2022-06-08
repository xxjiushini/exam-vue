/**
 * 导入自己需要的elementUI组件
 * @name: ele组件
 * @Author: xxjiushini
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
