import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BtnCount from './component/btn_count.jsx'
import Toast from './component/Toast.jsx'

function App() {
  const [americanoCount, setAmericanoCount] = useState(0)
  const [latteCount, setLatteCount] = useState(0)
  const [matchaCount, setMatchaCount] = useState(0)
  const [toast, setToast] = useState({ isVisible: false, message: '' })
  
  // 가격 설정
  const americanoPrice = 4500
  const lattePrice = 5500
  const matchaPrice = 6000

  // 최대 주문 개수 설정
  const maxAmericano = 2
  const maxLatte = 3
  const maxMatcha = 4

  const showToast = (message) => {
    setToast({ isVisible: true, message })
  }

  const hideToast = () => {
    setToast({ isVisible: false, message: '' })
  }

  const handleAmericanoChange = (value) => {
    const newCount = americanoCount + value
    if (newCount > maxAmericano) {
      showToast(`아메리카노는 ${maxAmericano}개 까지만 주문 가능합니다.`)
      return
    }
    setAmericanoCount(Math.max(0, newCount))
  }

  const handleLatteChange = (value) => {
    const newCount = latteCount + value
    if (newCount > maxLatte) {
      showToast(`카페라떼는 ${maxLatte}개 까지만 주문 가능합니다.`)
      return
    }
    setLatteCount(Math.max(0, newCount))
  }

  const handleMatchaChange = (value) => {
    const newCount = matchaCount + value
    if (newCount > maxMatcha) {
      showToast(`말차라떼는 ${maxMatcha}개 까지만 주문 가능합니다.`)
      return
    }
    setMatchaCount(Math.max(0, newCount))
  }

  // 총 결제금액 계산
  const totalPrice = (americanoCount * americanoPrice) + (latteCount * lattePrice) + (matchaCount * matchaPrice)

  return (
    <>
      <h1>카운트 연습</h1>

      <div className="counter">
        <div className="counter__card">
          <p className="menu">아메리카노 ({americanoPrice.toLocaleString()}원)</p>
          <div className="counter__button">
            <BtnCount 
              label="-" 
              value={-1} 
              onCountChange={handleAmericanoChange} 
            />
            <p className="count__number">{americanoCount}</p>
            <BtnCount 
              label="+" 
              value={+1}
              onCountChange={handleAmericanoChange} 
            />
          </div>
        </div>
          
        <div className="counter__card">
          <p className="menu">카페라떼 ({lattePrice.toLocaleString()}원)</p>
          <div className="counter__button">
            <BtnCount 
              label="-" 
              value={-1} 
              onCountChange={handleLatteChange} 
            />
            <p className="count__number">{latteCount}</p>
            <BtnCount 
              label="+" 
              value={+1} 
              onCountChange={handleLatteChange} 
            />
          </div>
        </div>

        <div className="counter__card">
          <p className="menu">말차라떼 ({matchaPrice.toLocaleString()}원)</p>
          <div className="counter__button">
            <BtnCount 
              label="-" 
              value={-1} 
              onCountChange={handleMatchaChange} 
            />
            <p className="count__number">{matchaCount}</p>
            <BtnCount 
              label="+" 
              value={+1} 
              onCountChange={handleMatchaChange} 
            />
          </div>
        </div>

      </div>
      
      <p className="total">총 결제금액 : {totalPrice.toLocaleString()} 원</p>

      <Toast 
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </>
  )
}

export default App
