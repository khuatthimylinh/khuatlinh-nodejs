import React, {useContext, useEffect} from 'react'
import {GlobalSate} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalSate)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    useEffect(() =>{
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    setHistory(res.data)
                }
            }

            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>CHI TIẾT ĐƠN HÀNG</h2>

            <h4>Bạn đã từng mua {history.length} đơn hàng ở LinHouse Shop</h4>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Mã thanh toán</th>
                            <th>Ngày mua</th>
                            <th>Thông tin đơn hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items =>(
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${items._id}`}>Xem chi tiết</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
)
}


export default OrderHistory