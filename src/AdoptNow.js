import './AdoptNow.scss';
import * as React from 'react';
import Queue from './queue-helper';
import List from './List';

export class AdoptNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: new Queue(),
      upNext: {
        dog: {
          imageURL: '',
          imageDescription: '',
          description: '',
          name: '',
          sex: '',
          age: 0,
          breed: '',
          story: ''
        },
        cat: {
          imageURL: '',
          imageDescription: '',
          description: '',
          name: '',
          sex: '',
          age: 0,
          breed: '',
          story: ''
        }
      },
      yourTurn: false,
      alreadyAdopted: [],
      waitLength: 0
    };
  }

  getQuedPets() {
    Promise.all([
      fetch(
        'https://krys-aust-petful-server.herokuapp.com/api/cat'
      ),
      fetch(
        'https://krys-aust-petful-server.herokuapp.com/api/dog'
      )
    ])
      .then(([catrsp, dogrsp]) => {
        if (!catrsp.ok) {
          throw new Error(
            'something went wrong'
          );
        }
        if (!dogrsp.ok) {
          throw new Error(
            'something went wrong'
          );
        }
        return Promise.all([
          catrsp.json(),
          dogrsp.json()
        ]);
      })
      .then(([catjson, dogjson]) => {
        this.setState({
          ...this.state,
          upNext: {
            dog: dogjson,
            cat: catjson
          }
        });
      })
      .catch(e =>
        this.setState({
          ...this.state,
          error: e
        })
      );
  }

  componentDidMount() {
    this.getQuedPets();
    this.DequeuePeople();
  }

  QueueUpPeople(people) {
    let temp = new Queue();
    for (
      let i = 0;
      i < people.length;
      i++
    ) {
      temp.enqueue(people[i]);
    }
    temp.enqueue('You!');
    this.setState({
      ...this.state,
      people: temp,
      waitLength: people.length
    });
  }

  DequeuePeople() {
    setInterval(() => {
      let adoptedAnimal;
      let temp = this.state.people;
      if (temp.first.value !== 'You!') {
        let randompet = Math.random();
        let animalToAdopt;
        if (randompet > 0.5) {
          animalToAdopt =
            'https://krys-aust-petful-server.herokuapp.com/api/cat';
          adoptedAnimal = {
            ...this.state.upNext.cat
          };
          console.log(adoptedAnimal);
        } else {
          animalToAdopt =
            'https://krys-aust-petful-server.herokuapp.com/api/dog';
          adoptedAnimal = {
            ...this.state.upNext.dog
          };
          console.log(adoptedAnimal);
        }
        temp.dequeue();
        fetch(animalToAdopt, {
          method: 'DELETE'
        })
          .then(() => {
            let turn = false;
            let wait =
              this.state.waitLength - 1;
            if (wait <= 0) {
              turn = true;
            }
            this.setState({
              ...this.state,
              people: temp,
              waitLength: wait,
              yourTurn: turn
            });
          })
          .then(() => {
            let alreadyAdopted = [
              adoptedAnimal,
              ...this.state
                .alreadyAdopted
            ];

            this.setState({
              ...this.state,
              alreadyAdopted
            });
          })
          .then(() => {
            this.getQuedPets();
          });
      } else {
        this.setState({
          ...this.state,
          yourTurn: true
        });
      }
    }, 3000);
  }

  UNSAFE_componentWillMount() {
    const people = [
      'Tauhida',
      'Austin',
      'Krystle'
    ];
    this.QueueUpPeople(people);
  }

  adoptedList() {
    if (this.state.alreadyAdopted) {
      return this.state.alreadyAdopted.map(
        animal => {
          return (
            <ul className="AdoptNow__adoptedAnimal">
              <li>
                {' '}
                <img
                  src={animal.imageURL}
                  alt={
                    animal.imageDescription
                  }
                  width="285"
                ></img>
              </li>
              <li className="AdoptNow__name">
                name: {animal.name}
              </li>
              <li className="AdoptNow__desc">
                description:{' '}
                {animal.description}
              </li>
            </ul>
          );
        }
      );
    }
  }

  render() {
    let renderbutton = null;
    if (this.state.yourTurn) {
      renderbutton = (
        <button className="AdoptNow__button">
          Adopt this Animal Now!
        </button>
      );
    }
    return (
      <main className="AdoptNow">
        Next to adopt:
        <List
          people={this.state.people}
        ></List>
        <img
          src={
            this.state.upNext.cat
              .imageURL
          }
          alt={
            this.state.upNext.cat
              .imageDescription
          }
          width="285"
        ></img>
        <ul className="AdoptNow__stats">
          <li className="AdoptNow__name">
            name:{' '}
            {this.state.upNext.cat.name}
          </li>
          <li className="AdoptNow__desc">
            description:{' '}
            {
              this.state.upNext.cat
                .description
            }
          </li>
          <li className="AdoptNow__sex">
            sex:{' '}
            {this.state.upNext.cat.sex}
          </li>
          <li className="AdoptNow__age">
            age:{' '}
            {this.state.upNext.cat.age}
          </li>
          <li className="AdoptNow__breed">
            breed:{' '}
            {
              this.state.upNext.cat
                .breed
            }
          </li>
          <li className="AdoptNow__story">
            story:{' '}
            {
              this.state.upNext.cat
                .story
            }
          </li>
          <li>{renderbutton}</li>
        </ul>
        <img
          src={
            this.state.upNext.dog
              .imageURL
          }
          alt={
            this.state.upNext.dog
              .imageDescription
          }
          width="285"
        ></img>
        <ul className="AdoptNow__stats">
          <li className="AdoptNow__name">
            name:{' '}
            {this.state.upNext.dog.name}
          </li>
          <li className="AdoptNow__desc">
            description:{' '}
            {
              this.state.upNext.dog
                .description
            }
          </li>
          <li className="AdoptNow__sex">
            sex:{' '}
            {this.state.upNext.dog.sex}
          </li>
          <li className="AdoptNow__age">
            age:{' '}
            {this.state.upNext.dog.age}
          </li>
          <li className="AdoptNow__breed">
            breed:{' '}
            {
              this.state.upNext.dog
                .breed
            }
          </li>
          <li className="AdoptNow__story">
            story:{' '}
            {
              this.state.upNext.dog
                .story
            }
          </li>
          <li>{renderbutton}</li>
        </ul>
        <div className="AdoptNow__alreadyAdopted">
          <h2>Recently adopted</h2>
          {this.adoptedList()}
        </div>
      </main>
    );
  }
}