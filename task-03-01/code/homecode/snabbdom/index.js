let snabbdom = require('snabbdom');
let patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default, // attaches event listeners
]);
let h = require('snabbdom/h').default; // helper function for creating vnodes

// 页面容器
let app = document.getElementById('app');

const wordArr = 'ABCDEFGHIJKLMNOBQRST'.split('');
// 原始数据
let data = wordArr.slice(0, 5).map((word, i) => {
  return {
    'rank': i + 1,
    'title': word,
    'desc': 'This is ' + word
  }
})
// 得到页面需要渲染的 vnode
function initVnode(data) {
  return h('div.contain', {
    style: {
      width: '800px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #000',
      background: '#201E1A',
      color: '#FFFFD9'
    }
  }, [
    h('header.header-wrap', {
      style: {
        'text-align': 'right'
      }
    }, [
      h('button', {
        style: {
          'margin-right': '10px',
        },
        on: {
          click: [changeSort, 'order']
        }
      }, '顺序排列'),
      h('button', {
        style: {
          'margin-right': '10px'
        },
        on: {
          click: [changeSort, 'desc']
        }
      }, '倒序排列'),
      h('button', {
        style: {
          'margin-right': '10px'
        },
        on: {
          click: [changeSort, 'random']
        }
      }, '随机排列'),
      h('button', {
        on: {
          click: addItem
        }
      }, '添加1项')
    ]),
    h('table', {
      style: {
        width: '100%',
        textAlign: 'center'
      }
    }, [
      h('tr', [
        h('th', '序号'),
        h('th', '标题'),
        h('th', '描述')
      ]),
      h('tbody', data.map(getTrVnode))
    ])
  ]);
}
// 保存 vnode
let vnode = initVnode(data);

// 首次渲染
patch(app, vnode);


// 设置当行内容
function getTrVnode(item) {
  return h('tr', [
    h('td', item.rank),
    h('td', item.title),
    h('td', item.desc)
  ])
}

// 点击按钮，改变排序
function changeSort(type) {
  if (type === 'order') {
    // 顺序排列
    data.sort((a, b) => a.rank - b.rank);
  } else if (type === 'desc') {
    // 倒序排列
    data.sort((a, b) => b.rank - a.rank);
  } else if (type === 'random') {
    // 随机排列
    data.sort(() => Math.random() > 0.5 ? -1 : 1)
  }
  render(data);
}

// 添加一项
function addItem() {
  const curIndex = data.length;
  const item = {
    rank: curIndex + 1,
    title: wordArr[curIndex],
    desc: 'This is ' + wordArr[curIndex]
  };
  data[0].rank == 1 ? data.push(item) : data.unshift(item);
  render(data)
}

// 数据改变，再次渲染
function render(data) {
  vnode = patch(vnode, initVnode(data))
}