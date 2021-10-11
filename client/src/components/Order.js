import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGames,setOrder } from '../Redux/actions'

function Order() {
    const { name, page } = useSelector(state=> state)
    const dispatch = useDispatch()

    const handleSelect = (e)=>{
       dispatch(setOrder(e.target.value))
        dispatch(getGames({name, page, order:e.target.value}))
    }

    return (
        <div>
            <select onChange={handleSelect}>
                <option selected value="asc">A-Z</option>
                <option value="des">Z-A</option>
                <option value="ratingDes">RatingDesc</option>
                <option value="ratingAsc">RatingAsc</option>
            </select>
        </div>
    )
}

export default Order
