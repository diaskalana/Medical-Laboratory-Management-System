import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
    
      <div className="container">
      <div className='image'><img src="./Logo.png"  width="300" height="150" ></img></div>
        <Link to="/">
          <h1>Patient Management</h1>
        </Link>
      </div>
    </header>
  )
}

export default Navbar