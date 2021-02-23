<template>
    <table class="wk-table__table">
        <tbody>
            <tr v-for="n in 7" :key="n" class="wk-table__placeholdertr">
                <td v-for="k in 5" :key="k" style="width: 20%">
                    <content-loader
                        :height="10"
                        :width="100"
                        :speed="2"
                        primaryColor="#f3f3f3"
                        secondaryColor="#e6e6e6"
                        class="wk-table__loader"
                    >
                        <rect x="0" y="0" rx="2" ry="2" :width="100" height="10" />
                    </content-loader>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { ContentLoader } from "vue-content-loader"

export default {

    components: {
      ContentLoader
    }
}
</script>