import { RowProps } from '@/types'
import { RiDeleteBin6Line } from 'react-icons/ri'

const DeleteButtonRow = ({
  id,
  setRows,
}: {
  id: string | null | undefined
  setRows: React.Dispatch<React.SetStateAction<RowProps[]>>
}) => {
  const removeRow = async () => {
    const confirmed = confirm('Are you sure?')
    if (confirmed) {
      const res = await fetch(`/api/rows/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id))
      }
    }
  }

  return (
    <button onClick={removeRow}>
      <RiDeleteBin6Line className="text-red-400 text-2xl" />
    </button>
  )
}

export default DeleteButtonRow
