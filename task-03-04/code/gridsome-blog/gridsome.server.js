// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios');
module.exports = function (api) {
  api.loadSource(async ({ addCollection }) => {
    console.log('加载followers');
    const { data } = await axios.get(
      'https://api.github.com/users/GitHub-Laziji/followers',
    );
    const collection = addCollection({
      typeName: 'followers',
    });

    for (const follower of data) {
      collection.addNode(follower);
    }
    console.log('加载following');
    const { data: followings } = await axios.get(
      'https://api.github.com/users/GitHub-Laziji/following',
    );
    const collection1 = addCollection({
      typeName: 'followings',
    });

    for (const following of followings) {
      collection1.addNode(following);
    }
    console.log('加载repos');
    const { data: repos } = await axios.get(
      'https://api.github.com/users/GitHub-Laziji/repos',
    );
    const collection2 = addCollection({
      typeName: 'repos',
    });

    for (const repo of repos) {
      collection2.addNode(repo);
    }
    console.log('加载posts');
    const { data: posts } = await axios.get('http://121.196.182.50:1337/posts');
    const collection3 = addCollection({
      typeName: 'StrapiPost',
    });

    for (const post of posts) {
      collection3.addNode(post);
    }
  });

  api.createPages(({ createPage }) => {
    createPage({
      name: 'socialDetail',
      path: '/social/detail',
      component: './src/templates/social/detail.vue',
    });
  });
};
