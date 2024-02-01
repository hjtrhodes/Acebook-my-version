import { useNavigate } from 'react-router-dom';
import { Navigation } from './navigation';

const NavBar = (props) => {

  return(
    <div className='navbarcontainer'>
    <Navigation posts={ props.posts } comments={props.comments} navigate={props.navigate}/>
    </div>
  )
}

export default NavBar;
