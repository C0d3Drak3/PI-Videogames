import React from 'react'
import { useDispatch } from 'react-redux'
import { getGames, setName, setPage} from '../Redux/actions'


function Search() {
    const [input, setInput] = React.useState("")

    const dispatch = useDispatch()

    const handleOnChange = (e)=>{
        e.preventDefault()
        setInput(e.target.value)
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(setName(input))
        dispatch(getGames({page:1, name:input})) 
        dispatch(setPage(1))
        setInput("")
    }
    
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Search..." onChange={handleOnChange} value={input} />
            <button type="submit" >🔍</button>
            
        </form>
    )
}

export default Search
