import Vue from "vue";

/**
 * @description Injects function into vue instance.
 * src: https://typescript.nuxtjs.org/cookbook/plugins
 * src: https://nuxtjs.org/docs/directory-structure/plugins/#client-or-server-side-only
 * "It is important to know that in any Vue instance lifecycle , only
 * beforeCreate and created hooks are called both, from client-side and
 * server-side. All other hooks are called only from the client-side."
 */

declare module "vue/types/vue" {
    interface Vue {
        $myInjectedFunction(message: string): void;
        cookieconsent(message: string): void;
    }
}

Vue.prototype.$myInjectedFunction = (message: string) => console.log(message);

// example for injection into every possible stuff (vue, context, vuex):
// src: https://typescript.nuxtjs.org/cookbook/plugins
// import { Plugin } from '@nuxt/types'
//
// declare module 'vue/types/vue' {
//   // this.$myInjectedFunction inside Vue components
//   interface Vue {
//     $myInjectedFunction(message: string): void
//   }
// }
//
// declare module '@nuxt/types' {
//   // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
//   interface NuxtAppOptions {
//     $myInjectedFunction(message: string): void
//   }
//   // nuxtContext.$myInjectedFunction
//   interface Context {
//     $myInjectedFunction(message: string): void
//   }
// }
//
// declare module 'vuex/types/index' {
//   // this.$myInjectedFunction inside Vuex stores
//   interface Store<S> {
//     $myInjectedFunction(message: string): void
//   }
// }
//
// const myPlugin: Plugin = (context, inject) => {
//   inject('myInjectedFunction', (message: string) => console.log(message))
// }
//
// export default myPlugin
//
