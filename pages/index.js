import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { DATA } from "../utils/data";

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {DATA.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </div>
    </Layout>
  );
}
