import { CSSProperties } from "react"
import { useDispatch, useSelector } from 'react-redux';

const style: CSSProperties = {
  padding: "30px 50px",
  fontSize: "20px",
  textAlign: "center",
  width: "150px",
  background: "red"
}

import { actions } from 'host/store'
console.log(actions);


const RemoteComponent = () => {
  const value = useSelector((state) => state.value)
  console.log(value);
  const dispatch = useDispatch()

  return (
    <div>
      <h2>{value}</h2>
      <div style={style}>Микрофронт 1</div>
      <div style={{
        display: 'flex',
        gap: '15px'
      }}>
        <button onClick={() => dispatch(actions.decremented())}>Decriment</button>
        <button onClick={() => dispatch(actions.incremented())}>Incriment</button>
      </div>
    </div>
  )
}
export default RemoteComponent
