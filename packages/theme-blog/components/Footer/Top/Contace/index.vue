<template>
    <pr-footer-section
        class="pr-footer__contace"
        title="get in touch"
    >
        <template slot="info">
            <ul class="contace__list">
                <li
                    v-for="item in contaces.main"
                    :key="item.key"
                    class="contace__item"
                >
                    <svg-icon
                        :name="item.key"
                        class="contace__main-icon"
                    ></svg-icon>
                    <p class="contace__info">
                        <template
                            v-if="item.type === Enums.ContaceTypes.Text"
                        >{{ item.info }}</template>
                        <pr-link
                            v-else-if="item.type === Enums.ContaceTypes.Email"
                            :color="Enums.LinkColor.Light"
                            :href="'mailto:' + item.info"
                        >{{ item.info }}</pr-link>
                    </p>
                </li>
            </ul>
            <ul class="contace__social-list">
                <li
                    v-for="item in contaces.other"
                    :key="item.key"
                    class="social__item"
                >
                    <pr-link
                        :color="Enums.LinkColor.Light"
                        :href="item.info"
                    >
                        <svg-icon :name="item.key"></svg-icon>
                    </pr-link>
                </li>
            </ul>
        </template>
    </pr-footer-section>
</template>

<script lang="ts">
import Base from '@Theme/common/Base'
import { Component } from 'vue-property-decorator'

import Link from '@Core/components/Link/index.vue'
import Section from '../Section/index.vue'

interface Contace {
    key: string
    info: string
    type: Enums.ContaceTypes
}

interface Contaces {
    main: Contace[]
    other: Contace[]
}

@Component({
    name: 'PrFooterContace',
    components: {
        [Link.name]: Link,
        [Section.name]: Section
    }
})
export default class PrFooterContace extends Base {
    public get contaces(): Contaces {
        const ContaceTypes = this.Enums.ContaceTypes
        const configContaces = this.$themeConfig.contacts
        const mainKeys: Types.ContaceType[] = ['address', 'phone', 'email']

        return {
            main: mainKeys.reduce(
                (res, key) => {
                    let setting = configContaces[key]

                    if (setting) {
                        res.push({
                            key,
                            info: setting,
                            type:
                                key === 'email'
                                    ? ContaceTypes.Email
                                    : ContaceTypes.Text
                        })
                    }

                    return res
                },
                [] as Contace[]
            ),
            other: (Object.keys(configContaces) as Types.ContaceType[])
                .filter((key) => !mainKeys.includes(key))
                .map((key) => ({
                    key,
                    info: configContaces[key],
                    type: ContaceTypes.Link
                }))
        }
    }
}
</script>

<style lang="postcss" scoped>
@import './index.pcss';
</style>

