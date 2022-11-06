import {React, useState} from 'react';
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai';
import reactStringReplace from 'react-string-replace';

export default function Update({ update, showDefault }) {
    
    const [show, setShow] = useState(showDefault);

    const getLink = (string) => {
        return reactStringReplace(string, /(LINK)/g, (match, i) => (
            <span key={i}>
                <a href={update.link.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-500">
                    {update.link.text}
                </a>
            </span>
        ));
    }

    return (
        <div className="space-y-2">
            <div className="inline-flex gap-4 items-center">
                <button type="button" onClick={() => setShow(!show)}
                    className="text-blue-400 hover:text-blue-500 inline-flex gap-2 items-center">
                    { show ? <AiOutlineMinus /> : <AiOutlinePlus />}
                    <p>{update.version}</p>
                </button>                
                <div className="inline-flex gap-2 flex-wrap">
                    {update.contributors.map((c, i) => {
                        return <p key={i} className="border-gray-200 border-2 rounded-md px-1 text-sm">{c}</p>
                    })}
                </div>                
            </div>
            {show ?
                <ul className="pl-4 space-y-2 border-l-2 border-gray-400 border-dashed">
                    {update.changes.map((c, i) => {
                        return (
                            <li key={i}>
                                {update.link ? getLink(c[0]) : c[0]}
                                {c[1] ?
                                    <ul className="pl-4 text-gray-600 text-sm">
                                        {c[1].map((sub, i) => {
                                            return (
                                                <li key={i}>
                                                    {sub}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                : null}
                            </li>
                        )
                    })}
                </ul>
            : null}
        </div>
    )

}
