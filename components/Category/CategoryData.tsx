'use client'

import { CategoryProps } from '@/types'
import { useState, useEffect } from 'react'

const CategoryData = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
          cache: 'no-store',
        })
        if (res.ok) {
          const data = await res.json()
          setCategories(data.categories)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  if (!categories) {
    return { categories: [], setCategories }
  }

  return { categories, setCategories }
}

export default CategoryData
