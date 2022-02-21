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
        <div className='search'>
            <form onSubmit={onSubmit}>
                <input className='searchbar-input' type="text" placeholder="Search..." onChange={handleOnChange} value={input} />
                <button className='searchbar-button' type="submit" >🔍</button>
                
            </form>
        </div>
    )
}

export default Search
