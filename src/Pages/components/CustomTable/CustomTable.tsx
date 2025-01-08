import { ReactNode } from "react"


export interface CustomTableInterface {
    columns:string[],
    children: ReactNode
}
export default function CustomTable({columns,children}:CustomTableInterface) {
  return (
    <table className="w-full table-fixed border-spacing-x-0.5 border-spacing-y-1 border-separate rounded">
  <thead>
    <tr className=" bg-dark text-white">
        {columns.map((col ,index)=>(<th className='w-1/4 px-5 py-0 rounded' key ={index}>{col}</th>))}
    </tr>
  </thead>
  <tbody>
    {children}
  </tbody>
</table>
  )
}
