import React,{useContext, useState, useEffect} from 'react'
import {GlobalSate} from '../../../GlobalState'
import axios from 'axios'
import PayPalButton from './PayPalButton'
function Cart() {
    const state = useContext(GlobalSate)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    
    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }
    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -=1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Bạn muốn xóa sản phẩm này?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("Bạn đã đặt hàng thành công.")
    }

    if(cart.length === 0) 
    return <h2 style={{textAlign: "center", fontSize: "5rem", color:"green"}}>Giỏ hàng trống vắng!!!</h2> 

    return(
        <div>
           {
               cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                         <div className="box-detail">
                            <h2>{product.title}</h2>

                            <span>{product.price * product.quantity} VNĐ</span>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                 X
                            </div>
                     </div>
                </div>
               ))
           }
           <div className="total">
               <h3>Tổng tiền: {total} VNĐ</h3>
               <h3>Vui lòng thanh toán qua paypal: ${(total/22842).toFixed(2)}</h3>
               <PayPalButton
                    total={(total/22842).toFixed(2)}
                tranSuccess={tranSuccess}
               />
           </div>
        </div>
    )
}

export default Cart