import Link from 'next/link'

import Layout from '../components/Layout'

function OrderCompletedPage() {
  return (
    <Layout title='Order Completed'>
      <div className='flex text-balck-900 text-lg font-bold pl-14 mb-4'>
      <h1 >Thanks for order.</h1>  </div>
     <div className='flex text-balck-900 text-lg text-blue-500 pl-14 '>
      <Link href='/order-history' legacyBehavior>View Order History</Link>
     </div> 
     
      
    </Layout>
  )
}

export default OrderCompletedPage
