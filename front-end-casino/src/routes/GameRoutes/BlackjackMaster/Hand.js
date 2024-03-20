import React, { memo } from 'react';
import Card from '../Card';

const Hand = memo(({ hand, total, name }) => {
  return (
    <div className="container-fluid text-white p-3 mt-2 rounded d-flex flex-column align-items-center">
      <div className="row">
        <div className="col-md-12">
          <div className="title text-center">
            <h1>{name}: {total}</h1>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="cards mt-2 d-flex justify-content-center flex-wrap">
            {hand.map((cardData) => (
              <Card key={cardData.code} cardData={cardData} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Hand;