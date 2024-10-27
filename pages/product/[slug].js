import { useRouter } from "next/router"
import Image from "next/image"
import { useContext } from "react"
import Layout from "../../components/Layout"
// import productItems from "../../data/products.json"
import db from '../../utils/db'
import Product from '../../models/product'

import { Store } from "../../context/Cart"

function ProductPage({product}) {
  const { state, dispatch } = useContext(Store);  

  const router = useRouter()
  
  // const { query } = useRouter();
  // const { slug } = query;

  // const product = productItems.find((pItem) => pItem.slug === slug);

  if (!product) {
    return <div>Product not found.</div>;
  }

  function addToCartHandler() {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    )

    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty){
      alert('Product is out.')

      return
      
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...product, qty } })
    router.push('/cart')
  
  }

  return (
    <Layout title={product.title}>
      <div className="grid md:grid-cols-3 md:gap-3 bg-white rounded-xl p-10">
        <div className="md:col-span-1">
          <Image
            className="rounded-xl"
            src={product.image}
            width={350}
            height={350}
            layout="intrinsic" // Use intrinsic layout to respect width and height
          />
        </div>
        <div className="md:col-span-1 flex flex-col">
          <div className="text-lg">
            <h2 className="font-bold">{product.title}</h2>
            <p className="font-bold">{product.cat}</p>
            <p>{product.description}</p>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-2 flex justify-between">
            <div className="font-bold">Price:</div>
            <div>{product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div className="font-bold">Status:</div>
            <div>{product.count > 0 ? 'Available' : 'Unavailable'}</div>
          </div>

          <button
            onClick={addToCartHandler}
            className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage

export async function getServerSideProps(context) {
  const { params } = context
  const { slug } = params

  await db.connect()

  const product = await Product.findOne({ slug }).lean()

  return {
    props: {
      product: product ? db.convertToObj(product) : null,
    },
  }
}



