import React from 'react'

const Issue = ({issue}) => {
    return (
        <div className="issue">
            <h3>{issue.issue}</h3>
            <h4> {issue.time} hours </h4>
        </div>
    )
}

export default Issue