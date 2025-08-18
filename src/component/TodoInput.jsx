/*
  TodoInput: 투두 입력 컨트롤러
  - 역할: 사용자의 텍스트 입력을 관리하고 제출 시 상위로 전달
  - Props
    - onAdd(text: string): 상위(App)에서 투두를 추가하는 콜백
*/
import React, { useState } from 'react'

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState('')

  /**
   * 폼 제출 시 공백이 아닌 경우에만 상위로 전달하고 입력값을 초기화합니다.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="inputRow" onSubmit={handleSubmit}>
      <input
        className="textInput"
        type="text"
        placeholder="할 일을 입력하세요..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="addButton" type="submit">추가</button>
    </form>
  )
}

export default TodoInput


