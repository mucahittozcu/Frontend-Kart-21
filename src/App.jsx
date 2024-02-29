import { useState } from 'react'
import './styles.css'
import Header from './components/Header'
import FrontMessage from './components/FrontMessage'
import InnerMessage from './components/InnerMessage'

export default function App() {
  /* Challenge

	Kullanıcı kartın kapağına tıkladığında kart açılır ve kapanır, ancak kart şirketi daha sofistike bir kontrol yöntemi istiyor. Kullanıcının mouse ile parmağını kaydırmasını taklit eden bir yöntem. Göreviniz aşağıdaki gibi bir tane ayarlamaktır:
		
		1. "open" class'ı, 34. satırdaki className'i "cover" olan div'e yalnızca aşağıdaki koşulların tümü karşılandığında uygulanmalıdır: 
		   	
			   - Kullanıcı mouse butonunu "cover" div'inin içinde bir yerde basılı tutuyorsa.
			   
    		   - Mouse butonunu basılı tutmaya devam ederken, imleci basılı tutmaya başladığı yerin 50 piksel soluna hareket ettirir. 
		
		2. Kullanıcı daha sonra mouse'unu "cover" div'i açıkken aşağı doğru hareket ettirirse, "open" 
		   class'ı kaldırılmalı ve böylece kart kapatılmalıdır. 
		   
	Not: cardOpen state'ini, 33. satırdaki onClick olay işleyicisini ve 34. satırdaki "open" class'ının şu anda uygulanma şeklini değiştirmeniz veya düzenlemeniz gerekecektir. 
*/

// // kartın açık mı kapalı mı olduğunu belirliyor.
const [cardOpen, setCardOpen] = useState(false)
// // yatayda(x) başlangıç noktası fare basıldığında fare konumunu saklar.
const [startX, setStartX] = useState(null) 
// // Dikeyde(y) başlangıç noktası fare basıldığında fare konumunu saklar.
const [startY, setStartY] = useState(null)


// // fare kartın üzerine basıldığında çağrılır ve fare basıldığında fare konumunu startX ve startY durumlarına kaydeder.
const handleMouseDown = (e) => {
  setStartX(e.clientX)
  setStartY(e.clientY)
}


// // fare kartın üzerinden kaldırıldığında çağrılır. Eğer fare en az 50 piksel sola hareket ettiyse, cardOpen durumunu true yapar. Eğer fare en az 50 piksel aşağıya hareket ettiyse, cardOpen durumunu false yapar.
const handleMouseUp = (e) => {
  // // 50px sol
  if (startX && e.clientX - startX <= -50) {
    setCardOpen(true)
   }// // 50px aşşağı
    else if (startY && e.clientY - startY >= 50) {
    setCardOpen(false)
  }
    setStartX(null)
    setStartY(null)
}


// // fare kartın üzerindeyken hareket ettiğinde çağrılır. Eğer fare en az 50 piksel sola hareket ettiyse, cardOpen durumunu true yapar.
const handleMouseMove = (e) => {
  if (startX && e.clientX - startX <= -50) {
    setCardOpen(true)
  
  }
}

return (
  <div className='wrapper'>
    <Header />
    <div className='card'>
      <InnerMessage />

      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`cover ${cardOpen ? 'open' : ''}`}
      >
        <FrontMessage />
        <img src='./images/forLoop.png' alt='for loop' />
      </div>
    </div>
  </div>
);
}
