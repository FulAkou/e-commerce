import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../../Redux/Actions/Product";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products, page, totalPages } = productListReducer;

  useEffect(() => {
    dispatch(productListAction(page));
  }, [dispatch, page]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Nos Produits</h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="text-lg font-semibold">Chargement...</span>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 font-semibold">
          {error}{" "}
          <button
            onClick={() => dispatch(productListAction(page))}
            className="ml-2 text-blue-500 underline"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-md"
              >
                <img
                  className="h-48 w-full object-cover"
                  src={product.image}
                  alt={product.title}
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-sm text-gray-700">{product.description}</p>
                  <p className="text-lg font-semibold">${product.price}</p>
                  <button className="flex justify- mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              disabled={page <= 1}
              onClick={() => dispatch(productListAction(page - 1))}
              className={`px-4 py-2 border rounded ${
                page <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Précédent
            </button>

            <span className="text-lg font-semibold">
              {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => dispatch(productListAction(page + 1))}
              className={`px-4 py-2 border rounded ${
                page >= totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
