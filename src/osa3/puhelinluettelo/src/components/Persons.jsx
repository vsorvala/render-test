import Person from "./Person"


const Persons = (props) => {

    const personsToShow = props.showAll
        ? props.persons
        : props.persons.filter(person => person.name.toLowerCase().includes(props.str.toLowerCase()))

    

    return (
        <div>
            <table>
                <tbody>
                    {personsToShow.map(person =>
                        <Person key={person.id} name={person.name} number={person.number}
                            delFun={() => props.delFun(person.id,person.name)} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Persons