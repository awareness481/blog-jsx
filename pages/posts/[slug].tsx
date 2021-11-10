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
import { GetStaticPaths, GetStaticProps } from "next";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import styles from "./[slug].module.css";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  a: CustomLink,
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  TestComponent: dynamic(() => import("../../components/TestComponent")),
};

export default function PostPage({
  source,
  frontMatter,
}: {
  source: {
    compiledSource: string;
    scope?: Record<string, unknown>;
    lazy?: boolean;
  };
  frontMatter: {
    title: string;
    description: string;
  };
}): JSX.Element {
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

        <header className="post-header">
          <h1 className={styles.title}>{frontMatter.title}</h1>
          {frontMatter.description && (
            <p className={`decription ${styles.description}`}>
              {frontMatter.description}
            </p>
          )}
        </header>
        <main className={styles.main}>
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
      remarkPlugins: [[remarkShikiTwoslash, { theme: "github-dark" }]],
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
