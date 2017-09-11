# Todo MVC Service

A mock API for [TodoMVC](http://todomvc.com/) apps

## Quick Start

```js
import Todo from 'todo-mvc-service'

Todo.fetch('todos', {
  method: 'POST',
  body: {
    title: 'Buy milk',
    completed: false,
  }
})

Todo
  .fetch('/todos')
  .then(res => res.json())
  .then(todos => console.log('todos', todos))
```

## Routes

```js
console.log(Todo.routes)
```

```
└── /
    └── todos (GET|POST)
        └── /
            └── :id (GET)
                :id (PUT)
                :id (DELETE)
```

