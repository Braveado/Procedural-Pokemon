import {React} from 'react';

export default function ProgressBar({ progress, label }) {    

    return (
        <div className="relative w-full h-12 bg-gray-200 rounded-md">
            <div 
                className="absolute top-0 left-0 h-full bg-blue-100 ring ring-blue-200 rounded-md animate-pulse"
                style={{width: `${progress}%`, transition: 'width 250ms ease-in-out'}}
            />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {label} {`${progress}%`}
            </span>
        </div>
      );
}
