import React from 'react'

export default function Table({ data }) {    

    return (
        <div className="border-2 border-gray-200 rounded-md bg-white inline-flex flex-col">
            <table className="border-spacing-0 border-collapse border-hidden">
                <thead className="border-b-2 border-gray-200">
                    <tr className="bg-gray-200">
                        {data ? 
                            data.columns.map((c, i) => {
                                return (
                                    <th className="py-2 px-4" key={i}>{ c }</th>
                                )
                            })
                        : 
                            <th className="py-2 px-4">Column</th>
                        }
                    </tr>
                </thead>                                                        
                <tbody className="divide-y-2 divide-gray-200">                    
                    {data ? 
                        data.rows.map((r, i) => {
                            return (
                                <tr className={i % 2 === 0 ? '' : 'bg-gray-100'} key={i}>
                                    {r.map((d, i) => {
                                        return (
                                            <td className="py-2 px-4" key={i}>{ d }</td>
                                        )
                                    })}
                                </tr>
                            )
                        })                        
                    : 
                        <tr>
                            <td className="py-2 px-4">Row</td>
                        </tr>
                    }
                </tbody>
            </table>
            {data && data.references ?
                <ul className="border-t-2 border-gray-200 px-4 py-2 space-y-1 text-xs bg-gray-200 list-disc list-inside">
                    {data.references.map((r, i) => {
                        return (
                            <li key={i}>
                                { r }
                            </li>
                        )
                    })} 
                </ul> 
            : null}                         
        </div>
    );
}
