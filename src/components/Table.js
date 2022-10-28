import React from 'react'

export default function Table({ data }) {    

    return (
        <div className="border-2 border-gray-200 rounded-md bg-white">
            <table className="border-spacing-0 border-collapse border-hidden w-full max-w-full">
                <thead className="border-b-2 border-gray-200">
                    <tr className="bg-gray-200">
                        {data ? 
                            data.columns.map((c, i) => {
                                return (
                                    <th className="p-2" key={i}>{ c }</th>
                                )
                            })
                        : 
                            <th className="p-2">Column</th>
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
                                            <td className="p-2" key={i}>{ d }</td>
                                        )
                                    })}
                                </tr>
                            )
                        })
                    : 
                        <tr>
                            <td className="p-2">Row</td>
                        </tr>
                    }
                </tbody>
            </table>  
        </div>
    );
}
