'use client'

import { CategoryProps } from '@/types'
import { categoryColumns } from '../../datatablesource'
import DatatableCategory from './DatatableCategory'
import { useState, useEffect } from 'react'

const Categories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([])

  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)
        if (res.ok) {
          const data = await res.json()
          setCategories(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllClients()
  }, [])
  return (
    <div className="categories m-5 p-5 bg-white rounded shadow">
      <div className="categories_container">
        <div className="categories_header">
          <div className="categories_header-logo">
            <h3>Categories List</h3>
          </div>
        </div>
        <DatatableCategory columns={categoryColumns} />
      </div>
    </div>
  )
}

export default Categories
