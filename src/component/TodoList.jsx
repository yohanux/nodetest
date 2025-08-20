/*
  TodoList: 투두 목록 표시 및 상호작용
  - 역할: 투두 배열을 받아 체크박스로 완료 토글, 버튼으로 삭제를 처리
  - Props
    - todos: { id, text, completed }[]
    - onToggle(id: number): 완료 상태 토글 콜백
    - onDelete(id: number): 항목 삭제 콜백
    - searchQuery?: string: 검색 쿼리 (선택적)
*/
import React from 'react'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'

const TodoList = ({ todos, onToggle, onDelete, searchQuery = '' }) => {
  if (!todos.length) {
    return (
      <p className="empty">
        {searchQuery.trim() ? (
          <>
            <SearchOutlined style={{ marginRight: 6, color: '#999' }} />
            "{searchQuery}"에 대한 검색 결과가 없습니다.
          </>
        ) : (
          '아직 할 일이 없어요. 첫 할 일을 추가해보세요!'
        )}
      </p>
    )
  }

  return (
    <ul className="list">
      {todos.map((todo) => (
        <li key={todo.id} className="listItem">
          <label className="itemLabel">{/* 체크로 완료 토글 */}
            <input
              className="checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
          </label>
          <button className="deleteButton" onClick={() => onDelete(todo.id)}>
            <DeleteOutlined style={{ marginRight: 4 }} />
            삭제
          </button>{/* 항목 삭제 */}
        </li>
      ))}
    </ul>
  )
}

export default TodoList


