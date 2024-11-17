import './Loading.css'
import React from 'react';

// Tutorial:
// https://br.pinterest.com/pin/692076667771794030/
function Loading() {
    return (
        <div className="LoadingSpinner">
            <section>
                <svg className='spinner' viewBox='0 0 100 100'>
                    <circle cx="50" cy="50" r="20"></circle>
                </svg>
                {/* <h3>CSS 3</h3> */}
            </section>
        </div>
    );
  }
  
  export default Loading;