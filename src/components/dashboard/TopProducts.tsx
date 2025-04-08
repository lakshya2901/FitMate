// components/dashboard/TopProducts.tsx
'use client';

interface Product {
  id: string;
  name: string;
  popularity: number;
  sales: number;
  color: string;
}

export default function TopProducts() {
  const products: Product[] = [
    {
      id: '01',
      name: 'Premium Membership',
      popularity: 78,
      sales: 46,
      color: 'amber'
    },
    {
      id: '02',
      name: 'Fitness Training Plan',
      popularity: 62,
      sales: 37,
      color: 'cyan'
    },
    {
      id: '03',
      name: 'Nutrition Guidebook',
      popularity: 45,
      sales: 18,
      color: 'blue'
    },
    {
      id: '04',
      name: 'FitMate App Pro',
      popularity: 34,
      sales: 29,
      color: 'purple'
    }
  ];

  return (
    <div className="bg-gray-850 rounded-2xl p-5 shadow-lg h-full">
      <h2 className="text-lg font-semibold mb-5">Top Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="pb-3 text-left">#</th>
              <th className="pb-3 text-left">Name</th>
              <th className="pb-3 text-left">Popularity</th>
              <th className="pb-3 text-left">Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {products.map((product) => (
              <tr key={product.id} className="text-sm hover:bg-gray-800/30">
                <td className="py-3 pl-2">{product.id}</td>
                <td className="py-3">{product.name}</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mr-2">
                      <div
                        className={`bg-${product.color}-500 h-1.5 rounded-full`}
                        style={{ width: `${product.popularity}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">{product.popularity}%</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`bg-${product.color}-900/30 text-${product.color}-400 text-xs py-1 px-2 rounded`}>
                    {product.sales}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}