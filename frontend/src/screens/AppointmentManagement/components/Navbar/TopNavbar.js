import '../../styles/top-navbar.css'
export const TopNavbar = () => {
    return(
        <div className="topnav-container">
            <h2 className='page-title'>Appoinments</h2>
            <div className="topnav-right">
                <div className="topnav-right-item">
                    <p>Welcome <span>User name</span></p>
                </div>
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="topnav-right-image"/>
            </div>
        </div>
    )
}
 