
const Filter = (props) => {

  return (
    <div>
      filter shown with: <input value={props.str} onChange={props.handleStrChange} />
    </div>
  )
}

export default Filter