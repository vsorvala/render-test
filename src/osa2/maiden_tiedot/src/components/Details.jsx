const Details = ({ details }) => {

    if (!details)
        return (null)
    else {
        
        const languages = details[0]["languages"].map(l => <li key={l}>{l}</li>);
      
        
        
        return (
            <>
                
                <h2>{details[0]["name"]}</h2>
                capital {details[0].capital}<br /> 
                area {details[0].area}
                
                <h3>languages:</h3> 
                <ul>{languages}</ul>
                <div id="flag">
                {details[0].flag}
                </div>
            </>
        )
    }
}

export default Details