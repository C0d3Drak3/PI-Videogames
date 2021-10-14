import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { originFilter, getGenres, setPage, genreFilter} from '../Redux/actions'



function Filter() {
    //const [input, setInput] = React.useState("")

    
    const dispatch = useDispatch()
    const {genres} = useSelector(state => state)

    useEffect(()=>{
        dispatch(getGenres())
    },[dispatch])
    

    const handleOnChangeSelect = (e)=>{
        e.preventDefault()
        console.log("lo que me llega de filtros", e.target.value)
        dispatch(genreFilter(e.target.value))
        dispatch(setPage(1))
    }

    const handleSelectO = (e)=>{
        e.preventDefault()
        dispatch(originFilter(e.target.value))
        
    }


    
    return (
        <div>
            <select onChange={handleOnChangeSelect}>
                <option  selected value="all">all</option>
                {genres.map((g) => { return <option key={g.id} value={g.id}>{g.name}</option>})}
            </select>
            <div>
                <select onChange={handleSelectO}>
                    <option selected value="all">all</option>
                    <option  value="api">api</option>
                    <option  value="db">db</option>
                </select>
                
            </div>
        </div>
        
    )
}

export default Filter