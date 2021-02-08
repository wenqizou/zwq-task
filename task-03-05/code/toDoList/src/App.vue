<template>
  <section id="app" class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input
        class="new-todo"
        placeholder="what needs to be done"
        autocomplete="off"
        autofocus
        v-model="input"
        @keyup.enter="addTodo()"
      />
    </header>
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        v-model="allDone"
      />
      <label for="toggle-all"> Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="(todo, i) in filteredTodos"
          :key="'todo.text' + i"
          :class="{ editing: todo == curryTodo, completed: todo.completed }"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{ todo.text }}</label>
            <button class="destroy" @click="remove(i)"></button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.text"
            v-editing-focus="todo == curryTodo"
            @keyup.enter="doneEdit(todo)"
            @blur="doneEdit(todo)"
            @keyup.esc="cancle(todo)"
          />
        </li>
      </ul>
    </section>
    <footer>
      <span class="todo-count">
        <strong>{{ activeCount }}</strong
        >item left
      </span>
      <ul class="filters">
        <li><a href="#/all">All</a></li>
        <li><a href="#/active">Active</a></li>
        <li><a href="#/completed">Complete</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import './assets/index.css'
// 添加代办事项
const useAdd = todos => {
  const input = ref('')
  const addTodo = () => {
    const text = input.value && input.value.trim() //ref 响应的对象要通过.value
    if (text.length == 0) return
    todos.value.unshift({
      text,
      completed: false
    })
    input.value = ''
  }
  return {
    input,
    addTodo
  }
}
// 删除代办事项
const useRemove = (todos) => {
  const remove = (i) => {
    todos.value.splice(i, 1)
  }
  const removeCompleted = () => {
    todos.value = todos.value.filter(e => !e.completed)
  }
  return {
    remove,
    removeCompleted
  }
}
// 编辑事项
const useEdit = (remove) => {
  let beforeEditText = ''
  const curryTodo = ref(null)

  const editTodo = (todo) => {
    beforeEditText = todo.text
    curryTodo.value = todo
  }

  const doneEdit = (todo) => {
    if (!curryTodo.value) return
    curryTodo.text = todo.text.trim()
    curryTodo.text || remove(todo)
    curryTodo.value = null
  }

  const cancle = (todo) => {
    curryTodo.value = null
    todo.text = beforeEditText
  }
  return {
    curryTodo,
    editTodo,
    doneEdit,
    cancle
  }

}

//切换代办事项完成状态
const useFilter = todos => {
  const allDone = computed({
    get() {
      return !todos.value.filter(todo => !todo.completed).length
    },
    set(value) {
      // 改变了allDone的值，全部都设置
      todos.value.forEach(todo => {
        todo.completed = value
      })
    }
  })
  const filter = {
    all: list => list,
    active: list => list.filter(todo => !todo.completed),
    completed: list => list.filter(todo => todo.completed)
  }
  const filteredTodos = computed(() => filter[type.value](todos.value))
  const activeCount = computed(() => filter.active(todos.value).length)
  const type = ref('all')
  const onHashChange = () => {
    const hash = window.location.hash.replace('#/', '')
    if (filter[hash]) {
      type.value = hash
    } else {
      type.value = 'all'
      window.location.hash = ''
    }

  }

  onMounted(() => {
    window.addEventListener('hashchange', onHashChange)
    //
    var test = {
      get() {
        console.log('get');
      },
      set(value) {
        console.log('set');
      }
    }
    test()
  })
  onUnmounted(() => {
    window.removeEventListener('hashchange', onHashChange)
  })

  return {
    allDone,
    filteredTodos,
    activeCount
  }
}
export default {
  name: 'App',
  setup() {
    const todos = ref([])
    const { remove, removeCompleted } = useRemove(todos)
    return {
      remove,
      removeCompleted,
      ...useAdd(todos),
      ...useEdit(remove),
      ...useFilter(todos),
      todos
    }
  },
  directives: {
    editingFocus: (el, binding) => {
      binding.value && el.focus()
    }
  }
}
</script>
