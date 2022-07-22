import React from 'react'
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
const Card = ({name, age, id, deleteUser, increaseAge}) => {
  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      This will be deleted forever.
    </Tooltip>
  );
  const renderAddAge = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Increase age by +1!
    </Tooltip>
  );
  return (
    <div className='mb-2 d-flex justify-content-between'>
        <div className="container">
          <h5>Name: {name}</h5>
        </div>
        <div className="container">
            {age&&
            <>
              <h4>Age: {age}
              <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderAddAge}
              > 
                <Button  variant='success' className='addAgeButton' onClick={() => {increaseAge(id, Number(age))}}>
                  Age++
                </Button>
                </OverlayTrigger>
              </h4>
            </>}
        </div>
        <div className="container">
            <h4 className='medium'>ID: {id} </h4>
        </div>
        <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
        >
        <Button variant='danger' onClick={() => {deleteUser(id)}}>
          Delete
        </Button>
        </OverlayTrigger>
    </div>
  )
}

export default Card