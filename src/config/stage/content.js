const contentRouter = {
  name: null,
  title: '期刊管理',
  type: 'folder', // 类型：folder tab view
  icon: 'iconfont icon-tushuguanli',
  order: 3,
  inNav: true,
  children: [
    {
      name: 'content',
      title: '内容管理',
      type: 'view',
      route: '/content/list',
      filePath: 'views/content/List.vue',
      inNav: true,
      icon: 'iconfont icon-tushugunali'
    },
    {
      name: 'flow',
      title: '最新期刊',
      type: 'view',
      route: '/content/flow',
      filePath: 'views/content/Flow.vue',
      inNav: true,
      icon: 'iconfont icon-tushugunali'
    },
  ],
}
export default contentRouter
