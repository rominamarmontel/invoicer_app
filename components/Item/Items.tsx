import { ItemProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import DeleteButtonItem from '../DeleteButton/DeleteButtonItem'
import { LiaEditSolid } from 'react-icons/lia'

const Items = ({
  items,
  setItems,
}: {
  items: ItemProps[]
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>
}) => {
  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="items_container">
        <div className="items_header flex items-center justify-between">
          <h2>Items List</h2>
          <div className="edit-btn items_create ">
            <Link href="/dashboard/create-item">
              <p className="flex items-center gap-5">
                Create{' '}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt">
          {items ? (
            items.map((item: ItemProps) => (
              <div
                key={item._id}
                className="card_group flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <div>{item.itemName.fr}</div>
                  <div>{item.itemName.jp}</div>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <DeleteButtonItem id={item._id} setItems={setItems} />
                  <Link href={`/dashboard/edit-item/${item._id}`}>
                    <LiaEditSolid className="text-green-500 text-2xl" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Items
