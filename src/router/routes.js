import homeRouter from './home-router'

console.log('-- homeRouter --')
console.log(homeRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/about',
    component: () => import('@/views/home/Home'),
    children: [...homeRouter],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login'),
  },
  {
    redirect: '/404',
    path: '*',
  },
]

export default routes
