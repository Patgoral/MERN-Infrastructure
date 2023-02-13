import { checkToken } from '../../utilities/users-services'

export default function OrderHistoryPage() {
    

    async function handleCheckToken() {
        checkToken()
    }
    return (
        <>
   <h2>Order History Page</h2>
   <button onClick={handleCheckToken}>Check When my Login Expires</button>
   </>
    )
}