import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalSate} from '../../../../GlobalState'

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalSate)
    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart
    return (
        <div className="row_btn">
        {
            isAdmin ?
            <>
            
                    <Link id="btn_buy" to="#!" onClick={()=>deleteProduct(product._id, product.images.public_id)}>
                    
                        Xóa
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Sửa
                    </Link>
            </>
            :<>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        Mua
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        Xem
                    </Link> 
            </>
        }
        
        </div>
    )
}

export default BtnRender