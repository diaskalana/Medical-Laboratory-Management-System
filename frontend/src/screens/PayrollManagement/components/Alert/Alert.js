import '../../styles/alert-style.css';
import correct from '../../assets/correct.png'
import wrong from '../../assets/wrong.png'

export const Alert = ({message, type ,open ,setOpen}) => {
    return (
        <div className='alert'>
            <div className='alert-body'>
                <div className='icon-container'>
                    <img src={correct} />
                </div>
                    <h2>{message}</h2>
                <button className='alert-button success' onClick={()=>setOpen(!open)}>Ok</button>
            </div>
        </div>
    )
}

