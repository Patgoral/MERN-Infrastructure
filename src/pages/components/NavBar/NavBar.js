import { Link } from 'react-router-dom';
import * as userService from '../../../utilities/users-services'


export default function NavBar({ user, setUser }) {

  function handleLogOut () {
    // we should delegate the actual logging out to the users service
    userService.logOut()
    setUser(null)
  }
    return(
        <nav>
        <Link to="/orders">Order History</Link>
        &nbsp; | &nbsp;
        <Link to="/orders/new">New Order</Link>
        &nbsp; | &nbsp;
        <span>Welcome {user.name}</span>
        &nbsp; | &nbsp;
        <Link to="" onClick = {handleLogOut}>Log Out</Link>
      </nav>
    )
}