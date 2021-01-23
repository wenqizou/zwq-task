// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'blog',
  plugins: [
    // {
    //   use: '@gridsome/source-strapi',
    //   options: {
    //     apiURL: 'http://121.196.182.50:1337/',
    //     queryLimit: 1000, // Defaults to 100
    //     contentTypes: ['post'],
    //     // singleTypes: ['impressum'],
    //     // Possibility to login with a Strapi user,
    //     // when content types are not publicly available (optional).
    //     // loginData: {
    //     //   identifier: '',
    //     //   password: ''
    //     // }
    //   },
    // },
  ],
  templates: {
    StrapiPost: [
      {
        name: 'blogDetail',
        path: '/blog/detail/:id',
        component: './src/templates/blog/detail.vue',
      },
      {
        name: 'blogEdit',
        path: '/blog/edit/:id',
        component: './src/templates/blog/edit.vue',
      },
    ],
    repos: [
      {
        name: 'sourceDetail',
        path: '/source/detail/:id',
        component: './src/templates/source/detail.vue',
      },
    ],
  },
};
