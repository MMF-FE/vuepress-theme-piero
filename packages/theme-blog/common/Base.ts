import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import DefaultSetting from '@Theme/common/default-setting'
import * as Enums from '@Theme/common/enum'
import * as Utils from '@Core/common/utils'

@Component({
    name: 'Base'
})
export default class Base extends Vue {
    public readonly DefaultSetting = DefaultSetting

    public readonly Enums = Enums

    public readonly Utils = Utils

    public loadBusuanziScript() {
        const script = document.createElement('script')

        script.setAttribute('async', '')
        script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'
        document.head.appendChild(script)
    }
}
