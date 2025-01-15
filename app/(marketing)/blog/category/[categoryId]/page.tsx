import BlogPage from '../../page'

export default function CategoryPage({ 
  params,
}: { 
  params: { categoryId: string }
  searchParams?: {}
}) {
  // Decode category name from URL
  const decodedCategory = decodeURIComponent(params.categoryId)
  return <BlogPage 
    params={{}}
    searchParams={{ category: decodedCategory }}
  />
}

export const metadata = {
  title: 'ShipOneDay Blog',
  description: 'Latest updates and guides'
}
