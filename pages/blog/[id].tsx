// pages/blog/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';
import styles from '../../styles/Home.module.scss';
import { renderToc } from '../../libs/render-toc'; 
import { TableOfContents } from '../../component/TableOfContent';




const BlogId = ({ blog }: BlogIdProps) => {
  const toc = renderToc(blog.body);
  console.log(toc); // 検証用にconsole.logでデバッグ
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.createdAt}</p>
      <TableOfContents toc={toc} />
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
};

type Blog = {
  title: string;
  createdAt: string;
  body: string;
  // Add any other properties present in your blog data
};

type BlogIdProps = {
  blog: Blog;
};

export default BlogId;

export const getStaticPaths: GetStaticPaths = async () => {
  const data: { contents: { id: string }[] } = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<BlogIdProps> = async (context) => {
  const id = context.params?.id as string;
  const data: Blog = await client.get({ endpoint: 'blog', contentId: id });

  return {
    props: {
      blog: data,
      
    },
  };
};


