import { useEffect } from 'react'

const SITE_NAME = 'Shop'

export const useDocumentTitle = (pageTitle: string): void => {
  useEffect(() => {
    document.title = `${pageTitle} | ${SITE_NAME}`
  }, [pageTitle])
}
