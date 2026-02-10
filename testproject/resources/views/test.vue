<script setup>
// Importeer ref voor reactieve state
import { ref } from 'vue'

// Maak een reactieve variabele voor de nieuwe todo input
const newTodo = ref('')

// Maak een reactieve array voor alle todos
const todos = ref([])

// Maak een counter voor unieke todo IDs
const todoIdCounter = ref(0)

// Functie om een nieuwe todo toe te voegen
const addTodo = () => {
  // Check of de input niet leeg is
  if (newTodo.value.trim() !== '') {
    // Voeg nieuwe todo toe aan de array
    todos.value.push({
      id: todoIdCounter.value++, // Geef een unieke ID
      text: newTodo.value,        // Sla de todo tekst op
      completed: false            // Markeer als niet voltooid
    })
    // Reset het input veld
    newTodo.value = ''
  }
}

// Functie om een todo te verwijderen
const removeTodo = (id) => {
  // Filter de todo met het gegeven ID eruit
  todos.value = todos.value.filter(todo => todo.id !== id)
}

// Functie om de completed status van een todo te togglen
const toggleTodo = (id) => {
  // Zoek de todo en verander de completed status
  const todo = todos.value.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}
</script>

<template>
  <!-- Hoofd container -->
  <div class="app">
    <!-- App titel -->
    <h1>Mijn To-Do Lijst</h1>
    
    <!-- Input sectie voor nieuwe todos -->
    <div class="input-section">
      <!-- Input veld voor nieuwe todo -->
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="Voeg een taak toe..."
        class="todo-input"
      />
      <!-- Knop om todo toe te voegen -->
      <button @click="addTodo" class="add-button">Toevoegen</button>
    </div>

    <div class="iets">
    <!-- Lijst van todos -->
    <ul class="todo-list">
      <!-- Loop door alle todos -->
      <li 
        v-for="todo in todos"
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <!-- Checkbox om todo te markeren als voltooid -->
        <input 
          type="checkbox" 
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
          class="todo-checkbox"
        />
        <!-- Toon de todo tekst -->
        <span class="todo-text">{{ todo.text }}</span>
        <!-- Knop om todo te verwijderen -->
        <button @click="removeTodo(todo.id)" class="delete-button">×</button>
      </li>
    </ul>
    </div>

    <!-- Toon bericht als er geen todos zijn -->
    <p v-if="todos.length === 0" class="empty-message">
      Geen taken
    </p>
  </div>
</template>

<style>
/* Algemene app styling */
@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 2rem;
  }
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
}

.app {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #1a0a2e;
}

/* Titel styling */
h1 {
  text-align: center;
  color: #e0b0ff;
  margin-bottom: 30px;
}

/* Input sectie styling */
.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* Todo input veld styling */
.todo-input {
  flex: 1;
  padding: 10px 15px;
  font-size: 16px;
  border: 2px solid #6a0dad;
  border-radius: 5px;
  outline: none;
  background-color: #2d1b4e;
  color: #e0b0ff;
}

/* Focus state voor input */
.todo-input:focus {
  border-color: #9b59b6;
}

/* Toevoegen knop styling */
.add-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #8b5cf6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.67s;
}

/* Hover state voor toevoegen knop */
.add-button:hover {
  background-color: #7c3aed;
}

/* Todo lijst styling */
.todo-list {
  list-style: none;
  padding: 0;
}

/* Individuele todo item styling */
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 10px;
  background-color: #3d2963;
  border-radius: 5px;
  transition: background-color 0.2s;
  color: #e0b0ff;
}

/* Hover state voor todo item */
.todo-item:hover {
  background-color: #4a3470;
}

/* Styling voor voltooide todo */
.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #9b7bb5;
}

/* Checkbox styling */
.todo-checkbox {
  margin-right: 10px;
  cursor: pointer;
}

/* Todo tekst styling */
.todo-text {
  flex: 1;
  font-size: 16px;
}

/* Verwijder knop styling */
.delete-button {
  padding: 5px 10px;
  font-size: 20px;
  background-color: #c026d3;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover state voor verwijder knop */
.delete-button:hover {
  background-color: #a21caf;
}

/* Lege lijst bericht styling */
.empty-message {
  text-align: center;
  color: #9b7bb5;
  font-style: italic;
  margin-top: 30px;
}
</style>