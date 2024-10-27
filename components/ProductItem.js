import Link from "next/link";

function ProductItem({ item, addToCart }) {
  return (
    <div className="bg-white rounded-xl mb-5 block">
      <Link href={`/product/${item.slug}`} legacyBehavior>
        <a className="block">
          <div className="flex justify-center"> {/* Flexbox container */}
            <img src={item.image} alt={item.title} className="rounded-t-xl" />
          </div>
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${item.slug}`} legacyBehavior>
          <a>
            <h2 className="text-lg">{item.title}</h2>
          </a>
        </Link>
        <p className="p-2">{item.price}</p>
        <button onClick={() => addToCart(item)} 
        className="rounded-xl bg-gray-700 text-white px-4 py-2 hover:bg-slate-800">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductItem;
