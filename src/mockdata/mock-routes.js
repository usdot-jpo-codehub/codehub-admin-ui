export default [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/add',
    name: 'add'
  },
  {
    path: '/remove',
    name: 'remove'
  },
  {
    path: '/update',
    name: 'update'
  },
  {
    path: '/reset',
    name: 'reset'
  },
  {
    path: '/cloudfrontinvalidate',
    name: 'cloudfrontinvalidate'
  },
  {
    path: '/categories',
    children: [
      {
        path: '',
        name: 'categories-home'
      },
      {
        path: '/categories/add',
        name: 'categories-add'
      },
      {
        path: '/categories/remove',
        name: 'categories-remove'
      },
      {
        path: '/categories/update',
        name: 'categories-update'
      }
    ]
  },
  {
    path: '/engagementpopup',
    children: [
      {
        path: '',
        name: 'engagementpopup-home'
      },
      {
        path: '/engagementpopup/add',
        name: 'engagementpopup-add'
      },
      {
        path: '/engagementpopup/remove',
        name: 'engagementpopup-remove'
      },
      {
        path: '/engagementpopup/update',
        name: 'engagementpopup-update'
      }
    ]
  }
]
