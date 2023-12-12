import { CategoryProps } from '@/types'
import Link from 'next/link'
import React from 'react'
import DeleteButtonCategory from '../DeleteButton/DeleteButtonCategory'
import { LiaEditSolid } from 'react-icons/lia'

const Categories = ({
  categories,
  setCategories,
}: {
  categories: CategoryProps[]
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>
}) => {
  return (
    <div className="m-5 p-5 lg:max-w-4xl lg:mx-auto bg-white rounded shadow">
      <div className="categories_container">
        <div className="categories_header flex items-center justify-between">
          <h2>Categories List</h2>
          <div className="edit-btn commissions_create ">
            <Link href="/dashboard/create-category">
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

        <div className="inline_card-group">
          {categories &&
            categories.map((category: CategoryProps) => (
              <div
                key={category._id}
                className="card_group flex items-center justify-between"
              >
                <Link href={`/dashboard/categories/${category.catName}`}>
                  <div>{category.catName}</div>
                </Link>
                <div className="flex justify-between items-center gap-2">
                  <DeleteButtonCategory
                    id={category._id}
                    setCategories={setCategories}
                  />
                  <Link href={`/dashboard/edit-category/${category.catName}`}>
                    <LiaEditSolid className="text-green-500 text-2xl" />
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Categories
