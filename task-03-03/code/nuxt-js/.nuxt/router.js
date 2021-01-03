import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9929d89c = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _567d8f67 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _2a7d6a67 = () => interopDefault(import('..\\pages\\loginOrRegister' /* webpackChunkName: "" */))
const _abfcfbbe = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _276ed2ab = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _b0c78c16 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _de687524 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _9929d89c,
    children: [{
      path: "",
      component: _567d8f67,
      name: "home"
    }, {
      path: "/login",
      component: _2a7d6a67,
      name: "login"
    }, {
      path: "/register",
      component: _2a7d6a67,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _abfcfbbe,
      name: "profile"
    }, {
      path: "/settings",
      component: _276ed2ab,
      name: "settings"
    }, {
      path: "/editor",
      component: _b0c78c16,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _de687524,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
