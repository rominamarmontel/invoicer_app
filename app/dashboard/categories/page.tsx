'use client'
import React, { useState, useEffect } from 'react'
import { CategoryProps } from '@/types'
import Categories from '@/components/Category/Categories'

const GetAllCategories = () => {
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
  return <Categories categories={categories} setCategories={setCategories} />
}

export default GetAllCategories
