import React, {useContext} from 'react'
import {GlobalSate} from '../../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalSate)
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result

    return (
        <div className="load_more">
            {
                result < page * 9 ? ""
                : <button onClick={() => setPage(page+1)}>Tải thêm</button>
            }
        </div>
    )
}

export default LoadMore