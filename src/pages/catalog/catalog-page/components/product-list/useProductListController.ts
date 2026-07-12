import { filteredProductsSelector } from '@/store/filter/selectors'
import { useAppSelector } from '@/store/hooks'

export const useProductListController = () => {
  const products = useAppSelector(filteredProductsSelector)

  return { products }
}
