// pages/blog/page/[id].js
import Link from 'next/link';
import { Pagination } from '../../../component/Pagination';
import { client } from "../../../libs/client";

const PER_PAGE = 5; 

// pages/blog/[id].js
export default function BlogPageId({blog,totalCount}:{ blog:Array<any>, totalCount:number }) {
  return (
    <div>
      <ul>
        {blog.map(blog => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} />
    </div>
  );
}

// 動的なページを作成
export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start:number, end:number) => [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context:{params: {id:number}}) => {
  const id = context.params.id;

  const data = await client.get({ endpoint: "blog", queries: { offset: (id - 1) * 5, limit: 5 } });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
};