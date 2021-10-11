import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames, getGenres, setPage, genreFilter} from '../Redux/actions'



function Filter() {
    //const [input, setInput] = React.useState("")

    
    const dispatch = useDispatch()
    const {genres, name, page, order } = useSelector(state => state)

    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])
    

    const handleSelect = (e)=>{
        e.preventDefault()
        dispatch(genreFilter(e.target.value))
        dispatch(getGames({name, page, order}))
        dispatch(setPage(1))
    }


    
    return (
        <div>
            <select onChange={handleSelect}>
                <option selected value="all">all</option>
                {genres.map((g) => { return <option key={g.id} value={g.id}>{g.name}</option>})}
            </select>
        </div>
    )
}

export default Filter