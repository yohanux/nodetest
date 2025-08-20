/*
  App: 최상위 투두 애플리케이션 컴포넌트
  - 상태 관리: todos 배열 [{ id, text, completed }]
  - 액션: addTodo(추가), toggleTodo(완료 토글), deleteTodo(삭제), clearCompleted(완료 전체 삭제)
  - 구성: 입력(TodoInput) → 목록(TodoList) → 푸터(진행 현황/정리)

  useEffect 훅으로 리액트 라이프사이클을 이해하기 위한 데모가 포함되어 있습니다.
  - 마운트/언마운트: 빈 의존성 배열 []
  - 특정 상태 변경에 반응: [todos], [completedCount]
  - 정리(cleanup): setInterval 클리어
  - 외부 시스템 동기화: localStorage, document.title
*/
import { useEffect, useState } from 'react'
import { CheckCircleOutlined, DeleteOutlined, PlusOutlined, ClearOutlined, EyeOutlined, EyeInvisibleOutlined, ClockCircleOutlined, TrophyOutlined, SearchOutlined } from '@ant-design/icons'
import './App.css'
import TodoInput from './component/TodoInput.jsx'
import TodoList from './component/TodoList.jsx'

function App() {
  const [todos, setTodos] = useState([])
  const [showLifecycleDemo, setShowLifecycleDemo] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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

  // 검색된 todos 필터링 (삼항연산자 사용)
  const filteredTodos = searchQuery.trim() 
    ? todos.filter(todo => todo.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : todos

  // [마운트/언마운트] 컴포넌트가 처음 렌더링될 때/사라질 때 한 번만 실행
  useEffect(() => {
    console.log('[App] mounted')
    return () => {
      console.log('[App] unmounted')
    }
  }, [])

  // [마운트] 최초 로드 시 localStorage에서 투두 불러오기
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        setTodos(JSON.parse(saved))
        console.log('[App] loaded todos from localStorage')
      } catch (e) {
        console.warn('[App] failed to parse todos from localStorage')
      }
    }
  }, [])

  // [업데이트] todos가 바뀔 때마다 localStorage에 저장 (외부 시스템과 동기화)
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    console.log('[App] todos changed -> persisted', todos)
  }, [todos])

  // [업데이트] 파생 상태가 바뀔 때 부수효과: 문서 제목 업데이트
  useEffect(() => {
    document.title = `완료 ${completedCount} / 전체 ${todos.length}`
    console.log('[App] completedCount changed ->', completedCount)
  }, [completedCount, todos.length])

  

  return (
    <div className="app">
      <h1 className="title">
        <TrophyOutlined style={{ marginRight: 8, color: '#1890ff' }} />
        Todo List
      </h1>
      {/* 라이프사이클 데모 토글 */}
      <button style={{ marginTop: 8 }} onClick={() => setShowLifecycleDemo((v) => !v)}>
        {showLifecycleDemo ? (
          <>
            <EyeInvisibleOutlined style={{ marginRight: 4 }} />
            라이프사이클 데모 숨기기
          </>
        ) : (
          <>
            <EyeOutlined style={{ marginRight: 4 }} />
            라이프사이클 데모 보기
          </>
        )}
      </button>
      {showLifecycleDemo && (
        <EffectDemo count={completedCount} />
      )}
      {/* 입력: 새 투두 추가 */}
      <TodoInput onAdd={addTodo} />
      
      {/* 검색 입력 */}
      <div style={{ marginTop: 16, marginBottom: 8 }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <SearchOutlined 
            style={{ 
              position: 'absolute', 
              left: 8, 
              color: '#999',
              fontSize: 16
            }} 
          />
          <input
            type="text"
            placeholder="할 일 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 8px 8px 32px',
              border: '1px solid #d9d9d9',
              borderRadius: 6,
              fontSize: 14,
              outline: 'none'
            }}
          />
        </div>
        {searchQuery.trim() && (
          <small style={{ display: 'block', marginTop: 4, color: '#666' }}>
            검색 결과: {filteredTodos.length}개
          </small>
        )}
      </div>

      {/* 목록: 체크/삭제 */}
      <TodoList 
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        searchQuery={searchQuery}
      />

      {todos.length > 0 && (
        <div className="footer">{/* 푸터: 진행 현황, 완료 항목 정리 */}
          <span>
            <CheckCircleOutlined style={{ marginRight: 4, color: '#52c41a' }} />
            완료 {completedCount} / 전체 {todos.length}
            {searchQuery.trim() && (
              <span style={{ marginLeft: 8, color: '#666' }}>
                (검색: {filteredTodos.length}개)
              </span>
            )}
          </span>
          {completedCount > 0 && (
            <button className="clear" onClick={clearCompleted}>
              <ClearOutlined style={{ marginRight: 4 }} />
              완료 항목 지우기
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * 라이프사이클 데모용 자식 컴포넌트
 * - 마운트/언마운트 로그
 * - 부모로부터 받은 prop(count) 변경 반응
 * - setInterval 시작/정리
 */
function EffectDemo({ count }) {
  const [seconds, setSeconds] = useState(0)

  // 자식 마운트/언마운트
  useEffect(() => {
    console.log('[EffectDemo] mounted')
    return () => {
      console.log('[EffectDemo] unmounted')
    }
  }, [])

  // 부모 prop 변경 반응
  useEffect(() => {
    console.log('[EffectDemo] prop count changed ->', count)
  }, [count])

  // 타이머 시작/정리
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    console.log('[EffectDemo] interval started')
    return () => {
      clearInterval(id)
      console.log('[EffectDemo] interval cleared')
    }
  }, [])

  return (
    <div style={{
      marginTop: 12,
      padding: 12,
      border: '1px solid #e2e2e2',
      borderRadius: 8,
      background: '#fafafa'
    }}>
      <h2 style={{ margin: 0, fontSize: 16 }}>
        <ClockCircleOutlined style={{ marginRight: 6, color: '#722ed1' }} />
        useEffect 라이프사이클 데모
      </h2>
      <p style={{ margin: '8px 0 0' }}>
        <CheckCircleOutlined style={{ marginRight: 4, color: '#52c41a' }} />
        부모의 완료 개수: {count}
      </p>
      <p style={{ margin: '4px 0 0' }}>
        <ClockCircleOutlined style={{ marginRight: 4, color: '#1890ff' }} />
        초 타이머: {seconds}s
      </p>
      <small style={{ display: 'block', marginTop: 8, opacity: 0.7 }}>
        콘솔을 열어 마운트/업데이트/정리 타이밍을 확인해보세요.
      </small>
    </div>
  )
}

export default App
