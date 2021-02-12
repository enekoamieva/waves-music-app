//Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

function Header({ showLibrary, setShowLibrary }) {

    const toggleHandler = () => {
        if (showLibrary) {
            setShowLibrary('');
        } else {
            setShowLibrary('active');
        }
    }

    return (
        <nav className="component-header">
            <div className="site-info">
                <FontAwesomeIcon size="5x" icon={faRecordVinyl} />
            </div>
            <div className="show-library" onClick={toggleHandler}>
                <div>Ver más temas</div>
            </div>
        </nav >
    )
}

export default Header;