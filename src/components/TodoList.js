import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Componente TodoList para listar e adicionar tarefas.
 */
const TodoList = () => {
  const [todos, setTodos] = useState([]); // Estado para armazenar as tarefas
  const [newTodo, setNewTodo] = useState(''); // Estado para armazenar a nova tarefa
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros

  // Hook para buscar tarefas ao montar o componente
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTodos(response.data.slice(0, 10)); // Limita a 10 tarefas para simplicidade
      } catch (err) {
        setError('Falha ao buscar tarefas'); // Define uma mensagem de erro
      }
      setLoading(false);
    };

    fetchTodos(); // Chama a função para buscar tarefas
  }, []);

  // Função para adicionar uma nova tarefa
  const handleAddTodo = async () => {
    if (!newTodo) return;

    try {
      await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: newTodo,
        completed: false,
      });

      setTodos([...todos, { title: newTodo, completed: false }]); // Adiciona a nova tarefa à lista
      setNewTodo(''); // Limpa o campo de entrada
    } catch (err) {
      setError('Falha ao adicionar tarefa'); // Define uma mensagem de erro
    }
  };

  return (
    <div className="todo-container">
      <h1>Lista de Tarefas</h1>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Adicionar uma nova tarefa"
        />
        <button onClick={handleAddTodo}>Adicionar Tarefa</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo.title}</span> - <span>{todo.completed ? 'Concluída' : 'Pendente'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
