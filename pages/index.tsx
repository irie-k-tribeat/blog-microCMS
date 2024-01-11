import Link from "next/link";
import { client } from "../libs/client";
import { Pagination } from "../component/Pagination";


export default function Home({ blog, totalCount,category }: { blog: Array<any>; totalCount: number,category: Array<any> }) {
  return (
    <div>
      <ul>
        {blog&&blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      
      <Pagination totalCount={totalCount} />
     
      <ul>
        {category && category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 5 } });
  const categoryData = await client.get({ endpoint: "category" });
  return {
    props: {
      blog: data.contents,
      totalCount:data.totalCount,
      category: categoryData.contents,
    },
  };
};