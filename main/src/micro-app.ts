import store from './store'

const microApps = [
  {
    name: 'crm', // 子应用 package.json 中 name
    entry:  process.env.VUE_APP_CRM_URL, // 子应用的 ip 地址
    activeRule: '/crm' // 激活当前子应用时路径前自动拼接的路径
  },
  {
    name: 'dashboard', // 子应用 package.json 中 name
    entry: process.env.VUE_APP_DASHBOARD_URL, // 子应用的 ip 地址
    activeRule: '/dashboard' // 激活当前子应用时路径前自动拼接的路径
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    // 子应用的容器，在主应用的 app.js 中，
    // 若为主应用，app.js 会获取 <router-view /> 的资源，
    // 若为子应用，app.js 会忽略 <router-view /> 中的资源，获取 id 为 container 的资源
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
