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
  ],
}
export default contentRouter
