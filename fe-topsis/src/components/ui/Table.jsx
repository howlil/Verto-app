import { Trash, Edit } from "lucide-react";

const Table = ({ columns, data,onEdit,onDelete }) => {
  return (
    <table className="w-full">
      <thead className="bg-orange-50">
        <tr>
          {columns.map((column, index) => (
            <th className="py-2 text-start pl-4" key={index}>{column.header}</th>
          ))}
          <th className="text-end pr-6">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr className="border-b  border-neutral-100" key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td className="py-2 text-start pl-4" key={colIndex}>{row[column.accessor]}</td>
            ))}
            <td className="py-2 flex justify-end">
                <div onClick={onEdit} className="cursor-pointer ts active:scale-110 hover:scale-110">
                   <Edit className="mr-2" color="orange" />
                </div>
                <div onClick={onDelete} className="cursor-pointer ts active:scale-110 hover:scale-110" >
                   <Trash className="mr-2" color="red" />
                </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;