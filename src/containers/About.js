import React, {useEffect} from 'react'

export default function About() {
    // Change title.
    useEffect (() => {
        document.title = 'About - Procedural Pokemon';
    }, []);

    return (
        <div>
            About
        </div>
    )
}
