import { CategoryProps, ClientProps } from '@/types'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import EditCategoryForm from '@/components/Category/EditCategoryForm'

const getCategoryById = async (
  catName: string
): Promise<CategoryProps | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/categories/${catName}`,
      {
        cache: 'no-store',
      }
    )
    if (res.ok) {
      const data = await res.json()
      const category = await data.category
      return category
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export default async function EditCategory({
  params,
}: {
  params: { catName: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const catName = params.catName
  const category = await getCategoryById(catName)
  return (
    <>
      {category ? (
        <EditCategoryForm category={category} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}
