import fs from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import CustomLink from "@/components/CustomLink";
import Layout from "@/components/Layout";
import { postFilePaths, POSTS_PATH } from "../../utils/mdxUtils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import styles from "./[slug].module.css";

const components = {
  a: CustomLink,
  TestComponent: dynamic(() => import("../../components/TestComponent")),
  Image: dynamic(() => import("next/image")),
};

export default function PostPage({
  source,
  frontMatter,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>{frontMatter.title}</title>
      </Head>
      <Layout>
        <nav>
          <Link href="/">
            <a>👈 Go back home</a>
          </Link>
        </nav>

        <main className={styles.main}>
          <header className="post-header">
            <h1 className={styles.title}>{frontMatter.title}</h1>
            {frontMatter.description && (
              <p className={`decription ${styles.description}`}>
                {frontMatter.description}
              </p>
            )}
          </header>
          <MDXRemote {...source} components={components} />
        </main>

        <style jsx>{`
          .post-header h1 {
            margin-bottom: 0;
          }

          .post-header {
            margin-bottom: 2rem;
          }
          .description {
            opacity: 0.6;
          }
        `}</style>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params?.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        [remarkShikiTwoslash, { theme: "../../../themes/light-plus" }],
      ],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
