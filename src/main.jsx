/*
  엔트리 파일: React 앱을 DOM에 마운트합니다.
  - StrictMode: 잠재적 문제를 개발 중에 더 빨리 발견하기 위한 도구
  - App: 최상위 컴포넌트를 #root 엘리먼트에 렌더링
*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// 테스트