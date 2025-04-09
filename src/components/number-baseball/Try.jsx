
const Try = ( { tryInfo } ) => {

    if(!tryInfo){
        return(
            <li>
                <div>오류</div>
            </li>
        )
    }


    return(
        <li>
            <div>
                {tryInfo.try}
            </div>
            <div>
                {tryInfo.result}
            </div>
        </li>
    )
}

export default Try;