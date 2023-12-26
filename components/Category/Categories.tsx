import { CategoryProps } from '@/types'
import { categoryColumns } from '../../datatablesource'
import DatatableCategory from './DatatableCategory'

const Categories = ({
  categories,
  setCategories,
}: {
  categories: CategoryProps[]
  setCategories: React.Dispatch<React.SetStateAction<CategoryProps[]>>
}) => {
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
