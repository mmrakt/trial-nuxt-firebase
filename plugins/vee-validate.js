import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import en from 'vee-validate/dist/locale/en.json'

let rule
for (rule in originalRules) {
  extend(rule, {
    ...originalRules[rule], // eslint-disable-line
  })
}

localize('en', en)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
