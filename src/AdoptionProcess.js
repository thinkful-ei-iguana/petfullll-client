import React, {
    Component
  } from 'react';

  import { Link } from 'react-router-dom';
  
  class AdoptionProcess extends Component {

    render() {
      return (
        <main className="AdoptionProcess">
          <img
            src={require('./Images/petful-img.jpg')}
            alt="pets wanting adoption"
            width="285"
          ></img>
          <p className="description">
            This process is pretty simple:
            just click the "Start Adoption
            Process" button and you'll be
            taken directly to the page
            with friend you can adopt! But
            you'll have to wait your turn.
            If the pet you want gets
            adopted by someone else, thats
            totally fine cause there are
            plenty of other friends to
            adopt (5 of each but shhhh).
            Once its your turn, simply
            click "adopt" under the friend
            youre looking to take home! If
            you're not happy with the
            selection feel free to get in
            line again and see who comes
            up next time!
          </p>
          <Link
            className="StartProcess"
            to="/adopt"
          >
            Start Adoption Process
          </Link>
        </main>
      );
    }
  }
  
  AdoptionProcess.propTypes = {};
  
  export default AdoptionProcess;