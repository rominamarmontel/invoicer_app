import { CategoryProps, ItemProps, RowProps } from '@/types'
import React, { useEffect, useState } from 'react'

const EditRowForm = ({ row }: { row: RowProps }) => {
  const [category, setCategory] = useState<CategoryProps | null>(null)
  const [item, setItem] = useState<ItemProps | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      const catName = row?._id
      try {
        if (!catName) {
          return
        }

        const res = await fetch(`/api/categories/${catName}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const category = await data.category
          if (!category) {
            return
          }
          setCategory(category)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  }, [row?._id])

  useEffect(() => {
    const fetchItem = async () => {
      const rowId = row?.item
      try {
        if (!rowId) {
          return
        }

        const res = await fetch(`/api/items/${rowId}`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          const item = await data.item
          if (!item) {
            console.log('Item not found')
            return
          }
          setItem(item)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchItem()
  }, [row?.item])

  return (
    <>
      <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
        {category && category.catName && <p>{category.catName}</p>}
      </td>
      <td className="whitespace-nowrap px-3 py-2 font-medium dark:border-neutral-500 text-left">
        {item && item.itemName.fr && <p>{item.itemName.fr}</p>}
      </td>
      <td className="whitespace-nowrap  px-3 py-2 text-xs dark:border-neutral-500 text-right">
        {item && item.itemName.jp && <p className="">{item.itemName.jp}</p>}
      </td>
      <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
        {row && row.itemPlus && <p>{row.itemPlus}</p>}
      </td>
      <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
        {row && row.qty && <p>{row.qty}</p>}
      </td>
      <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
        {row && row.unit && <p>{row.unit}</p>}
      </td>
      <td className="text-right whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
        {row && row.price && <p>{row.price.toFixed(2)}</p>}
      </td>
      <td className="text-right whitespace-nowrap px-3 py-2 font-medium dark:border-neutral-500">
        {row && row.total && <p>{row.total.toFixed(2)}</p>}
      </td>
    </>
  )
}

export default EditRowForm
