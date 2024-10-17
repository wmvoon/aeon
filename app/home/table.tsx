"use client"
import { TransactionHistory } from "../api/transaction-history/route";

interface TableProps {
    data: TransactionHistory[]
}

export default function Table({ data }: TableProps) {
    if (!data || data.length === 0) {
        return <p className="flex justify-center m-20">No transaction data available</p>;
    }

    const headers = Object.keys(data[0])

    return (
        <main className="flex justify-center m-20">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="py-2 px-4 border-b text-left bg-gray-100 font-bold"
                            >
                                {header.charAt(0).toUpperCase() + header.slice(1)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {data.map((row) => (
                    <tr key={row.id}>
                        <td className="py-2 px-4 border-b">{row.date.toDateString()}</td>
                        <td className="py-2 px-4 border-b">{row.id}</td>
                        <td className="py-2 px-4 border-b">{row.receiver}</td>
                        <td className="py-2 px-4 border-b">{row.transaction}</td>
                        <td className="py-2 px-4 border-b">RM{row.amount}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </main>
    )
}