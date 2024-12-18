import { useDispatch, useSelector } from "react-redux"
import { filter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const filterValue = e.target.value
        console.log(filterValue)
        dispatch(filter(filterValue))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter