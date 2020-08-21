import Vue from 'vue'
import Router from 'vue-router'
import Index from "../views/index"


Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home',
      component: Index,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: '/dataAnalysis',
          name: 'dataAnalysis',
          component: () => import('@/views/dataAnalysis.vue'),
        },
        {
          path: '/workbench',
          name: 'WorkBench',
          component: () => import('@/views/WorkBench.vue'),
        },
        {
          path: '/me',
          name: 'Me',
          component: () => import('@/views/Me.vue')
        },
      ]
    },
    {
      path: '/nopayment',
      name: 'NoPayment',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/notask/NoPayment.vue'),
    },
    {
      path: '/nopay',
      name: 'NoPay',
      component: () => import('@/views/notask/NoPay.vue'),
    },
    {
      path: '/noexamine',
      name: 'NoExamine',
      component: () => import('@/views/notask/NoExamine.vue'),
    },
    {
      path: '/noprocess',
      name: 'NoProcess',
      component: () => import('@/views/notask/NoProcess.vue'),
    },
    {
      path: '/dopayment',
      name: 'DoPayment',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/dotask/DoPayment.vue'),
    },

    {
      path: '/dopay',
      name: 'DoPay',
      component: () => import('@/views/dotask/DoPay.vue'),
    },
    {
      path: '/doprocess',
      name: 'DoProcess',
      component: () => import('@/views/dotask/DoProcess.vue'),
    },
    {
      path: '/visit',
      name: 'Visit',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('@/views/visit/Visit.vue'),
    },
    {
      path: '/addvisit',
      name: 'AddVisit',
      component: () => import('@/views/visit/AddVisit.vue'),
    },
    {
      path: '/customer',
      name: 'Customer',
      meta: {
        keepAlive: true
      },
      component: () => import('@/views/customer/Customer.vue'),
    },
    {
      path: '/orderinquiry',
      name: 'OrderInquiry',
      component: () => import('@/views/order/OrderInquiry.vue'),
      meta: {
        title: "订单列表",
        keepAlive: true
      }
    },
    {
      path: '/orderdetail',
      name: 'OrderDetail',
      component: () => import('@/views/order/OrderDetail.vue'),
    },
    {
      path: '/contactinformation',
      name: 'ContactInformation',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('@/views/contacts/ContactInformation.vue'),
    },
    {
      path: '/contactrecord',
      name: 'ContactRecord',
      // meta: {
      //   keepAlive: true
      // },
      component: () => import('@/views/contacts/ContactRecord.vue'),
    },
    {
      path: '/addcontact',
      name: 'AddContact',
      component: () => import('@/views/contacts/AddContact.vue'),
    },
    {
      path: '/addinformation',
      name: 'AddInformation',
      component: () => import('@/views/contacts/AddInformation.vue'),
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => import('@/views/analysis/analysis.vue'),
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: () => import('@/views/analysis/statistics.vue'),
    },
    {
      path: '/overdue',
      name: 'Overdue',
      component: () => import('@/views/receivable/overdue.vue'),
    },
    {
      path: '/overdueDetail',
      name: 'OverdueDetail',
      component: () => import('@/views/receivable/overdueDetail.vue'),
    },

    {
      path: '/receivable',
      name: 'Receivable',
      component: () => import('@/views/receivable/receivable.vue'),
    },

    {
      path: '/payment',
      name: 'Payment',
      component: () => import('@/views/search/payment.vue'),
    },

    {
      path: '/receivables',
      name: 'Receivables',
      component: () => import('@/views/search/receivables.vue'),
    },
    {
      path: '/modify',
      name: 'modify',
      component: () => import('@/views/meModify.vue'),
    },
    {
      path: '/fit',
      name: 'fit',
      component: () => import('@/views/fit.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/Login.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        let scrollTop = localStorage.getItem("scrollTop")
        from.meta.savedPosition = parseInt(scrollTop) + 200;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }


})



router.beforeEach((to, from, next) => {
  const isLogin = localStorage.token ? true : false;
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next()
  }

  console.log(to)
  console.log(from)
  if (to.name == 'NoPayment' && from.name == 'WorkBench') {
    to.meta.keepAlive = false
  }
  if (to.name == 'NoPayment' && from.name == 'NoProcess') {
    to.meta.keepAlive = true
  }
  if (to.name == 'NoPayment' && from.name == 'NoPay') {
    to.meta.keepAlive = true
  }
  if (to.name == 'NoPayment' && from.name == 'NoExamine') {
    to.meta.keepAlive = false
  }

  if (to.name == 'DoPayment' && from.name == 'WorkBench') {
    to.meta.keepAlive = false
  }
  if (to.name == 'DoPayment' && from.name == 'DoProcess') {
    to.meta.keepAlive = true
  }
  if (to.name == 'DoPayment' && from.name == 'DoPay') {
    to.meta.keepAlive = true
  }
  if (to.name == 'Customer' && from.name == 'WorkBench') {
    to.meta.keepAlive = false
  }
  if (to.name == 'Customer' && from.name == 'Visit') {
    to.meta.keepAlive = true
  }
  if (to.name == 'Customer' && from.name == 'ContactInformation') {
    to.meta.keepAlive = true
  }
  if (to.name == 'Customer' && from.name == 'ContactRecord') {
    to.meta.keepAlive = true
  }
  if (to.name == 'OrderInquiry' && from.name == 'WorkBench') {
    to.meta.keepAlive = false
  }
  if (to.name == 'OrderInquiry' && from.name == 'OrderDetail') {
    to.meta.keepAlive = true
  }

})




export default router;