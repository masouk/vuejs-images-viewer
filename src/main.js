/**
 * Created by fm on 2017/10/18.
 */
import Vue from 'vue'
import App from './components/app.vue'

new Vue({
    el: '#app',
    data: {
        images:[]
    },
    components: { 'images-viewer':App }
})