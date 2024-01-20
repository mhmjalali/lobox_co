import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../styles/multiselect-style.sass"

const MultiSelector = () => {
    return (
        <div>
            <div className="select-box">
                <input type="text" className='select-input' placeholder='Type Your Type :)' />
                <ExpandMoreIcon sx={{color: "#4e64c4"}} />
            </div>
            <div className='select-item'>
                <ul>
                    <li>Education</li>
                    <li>Yeeeah, science!</li>
                    <li>Art</li>
                    <li>Sport</li>
                    <li>Games</li>
                    <li>Health</li>
                </ul>
            </div>
        </div>
    )
}

export default MultiSelector