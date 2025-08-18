/*
  App: 최상위 투두 애플리케이션 컴포넌트
  - 상태 관리: todos 배열 [{ id, text, completed }]
  - 액션: addTodo(추가), toggleTodo(완료 토글), deleteTodo(삭제), clearCompleted(완료 전체 삭제)
  - 구성: 입력(TodoInput) → 목록(TodoList) → 푸터(진행 현황/정리)
*/
import { useState } from 'react'
import './App.css'
import TodoInput from './component/TodoInput.jsx'
import TodoList from './component/TodoList.jsx'

function App() {
  const [todos, setTodos] = useState([])

  /**
   * 새 투두 항목을 추가합니다. 공백만 입력되면 무시합니다.
   */
  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        completed: false,
      },
    ])
  }

  /**
   * id에 해당하는 투두의 완료 상태를 토글합니다.
   */
  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )))
  }

  /**
   * id에 해당하는 투두를 삭제합니다.
   */
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  /**
   * 완료된 투두 항목들을 한 번에 제거합니다.
   */
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  // 파생 상태: 완료된 개수
  const completedCount = todos.filter((t) => t.completed).length

  return (
    <div className="app">
      <h1 className="title">Todo List</h1>
      {/* 입력: 새 투두 추가 */}
      <TodoInput onAdd={addTodo} />
      {/* 목록: 체크/삭제 */}
      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      {todos.length > 0 && (
        <div className="footer">{/* 푸터: 진행 현황, 완료 항목 정리 */}
          <span>
            완료 {completedCount} / 전체 {todos.length}
          </span>
          {completedCount > 0 && (
            <button className="clear" onClick={clearCompleted}>완료 항목 지우기</button>
          )}
        </div>
      )}
    </div>
  )
}

export default App
