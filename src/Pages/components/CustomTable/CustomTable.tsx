import { ReactNode } from "react"


export interface CustomTableInterface {
    columns:string[],
    children: ReactNode
}
export default function CustomTable({columns,children}:CustomTableInterface) {
  return (
    <table className="table-fixed text-center border-collapse border border-gray-300">
  <thead>
    <tr className="border border-gray-300 bg-dark text-white p-0.5">
        {columns.map((col)=>(<th className='w-1/4 border border-gray-300 p-2'>{col}</th>))}
    </tr>
  </thead>
  <tbody>
    {children}
  </tbody>
</table>
  )
}
