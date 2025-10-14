<script lang="ts">
  export const prerender = true;
 type Todo = {name: String, id: number, completed: Boolean};
 export let todos : Todo[] = [];
 let newTodoName : String = "";
 $: totalTodos = todos.length;
 $: completedTodos = todos.filter((todo) => todo.completed).length;
 $: canAddTodo = newTodoName === "";

 function freshId() : number {
     let maxId : number = 0;
     for(let todo of todos) {
         if(todo.id > maxId) {
             maxId = todo.id;
         }
     }
     return maxId + 1;
 }

 function addTodo() {
     todos = [...todos, {id: freshId(), name: newTodoName, completed: false}];
     newTodoName = "";
 }

 function removeTodo(todo : Todo) {
     todos = todos.filter((t) => t.id !== todo.id);
 }
 
</script>
<div class="todoapp stack-large">
  <form on:submit|preventDefault={addTodo}>
      <h2 class="label-wrapper">
          <label for="todo-0" class="label__lg">What needs to be done today?</label>
      </h2>
      <input bind:value={newTodoName} type="text" id="todo-0" autocomplete="off" class="input input__lg">
      <button type="submit" disabled={canAddTodo} class="btn btn__primary">Add</button>
  </form>

  <div class="filters butn group stack-exception">
      <button class="btn toggle-btn" aria-pressed="true">
          <span class="visually-hidden">Show</span>
          <span>All</span>
          <span class="visually-hidden">tasks</span>
      </button>
      <button class="btn toggle-btn" aria-pressed="false">
          <span class="visually-hidden">Show</span>
          <span>Active</span>
          <span class="visually-hidden">Tasks</span>
      </button>
      <button class="btn toggle-btn" aria-pressed="false">
          <span class="visually-hidden">Show</span>
          <span>Completed</span>
          <span class="visually-hidden">tasks</span>
      </button>
  </div>

  <h2 id="list-heading">{completedTodos} out of {totalTodos} items completed</h2>
  <ul role="list" class="todo-list stack-large" aria-labelledby="list-heading">
      {#each todos as todo, index (todo.id)}
          <li class="todo">
              <div class="stack-small">
                  <div class="c-cb">
                      <input
                          id="{todo.id}"
                          type="checkbox"
                          on:click={() => todo.completed = !todo.completed}
                          checked={todo.completed}
                      />
                      <label fot="todo-{todo.id}" class="todo-label">
                          {todo.name}
                      </label>
                  </div>
                  <div class="btn-group">
                      <button type="button" class="btn">
                          Edit <span class="visually-hidden">{todo.name}</span>
                      </button>
                      <button type="button" class="btn btn__danger"
                              on:click={() => removeTodo(todo)}>
                          Delete
                          <span class="visually-hidden">{todo.name}</span>
                      </button>
                  </div>
              </div>
          </li>
      {:else}
          <li>Nothing to do here!</li>
      {/each}      
  </ul>
  <br/>
  <div class="btn-group">
      <button type="button" class="btn btn__primary">Check all</button>
      <button type="button" class="btn btn__primary">Remove completed</button>
  </div>
</div>

