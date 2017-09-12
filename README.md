# Todo MVC Service

A mock API for [TodoMVC](http://todomvc.com/) apps. Provides a `fetch` method with a similar API to window.fetch. Persists data to localStorage, with a random delay to simulate a network connection.

## Demo

- [TodoMVC With Create-React-App](http://alexkrolick.github.io/todo-mvc-service-demo) ([src](https://github.com/alexkrolick/todo-mvc-service-demo/blob/master/src/App.js))

## Quick Start

```js
import Todo from 'todo-mvc-service'

Todo.fetch('/todos', {
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

## Known Issues

- ~~~Does not work with UglifyJS, so [create-react-app's prod mode does not work](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-build-fails-to-minify). I'm looking into changing the webpack config to transpile the dependencies (PR welcome... for the webpack experts in the audience 😃).~~~ Fixed by forking and transpiling the router.
- Needs tests


