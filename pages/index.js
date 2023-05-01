import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogDescription} />
      <Header name={globalData.name} />
      <main className="md:container md:mx-auto">
        <h1 className="text-3xl font-bold font-mono lg:text-5xl text-center mb-8">
          {globalData.blogTitle}
        </h1>
        <h3 className="font-light font-mono text-l lg:text-xl text-center mb-12">
          {globalData.blogDescription}
        </h3>
        <div className="grid grid-cols-3 gap-4 rounded-3xl mb-12 p-4 backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
          <div>
            <h3 className="font-light font-mono text-l lg:text-xl">Weather:</h3>
            <label className="block">
              Hot <input type="checkbox" class="rounded text-pink-500" />
            </label>
            <label className="block">
              Just fine <input type="checkbox" class="rounded text-pink-500" />
            </label>
            <label className="block">
              Cold <input type="checkbox" class="rounded text-pink-500" />
            </label>
          </div>
          <div>
            <h3 className="font-light font-mono text-l lg:text-xl">
              Price Range:
            </h3>

            <input type="range" class="rounded text-pink-500" />
          </div>
          <div>
            <h3 className="font-light font-mono text-l lg:text-xl">
              Type of destination:
            </h3>

            <label>
              Europe <input type="checkbox" class="rounded text-pink-500" />
            </label>
            <label>
              National <input type="checkbox" class="rounded text-pink-500" />
            </label>
            <label>
              International{' '}
              <input type="checkbox" class="rounded text-pink-500" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <div
              key={post.filePath}
              className="flex-auto rounded-3xl radius  backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link
                legacyBehavior
                as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                href={`/posts/[slug]`}
              >
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {/* {post.data.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.data.date}
                    </p>
                  )} */}
                  <h2 className="text-2xl md:text-3xl">🛫 {post.data.title}</h2>
                  {post.data.pricerange && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      Price Range: {post.data.pricerange}
                    </p>
                  )}
                  {post.data.weather && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      The weather here is:
                      <span className="opacity-100 text-purple-900 dark:text-green-500">
                        {' '}
                        {post.data.weather}
                      </span>
                    </p>
                  )}
                  {post.data.flight && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      The flight will last:
                      <span className="opacity-100 text-purple-900 dark:text-green-500">
                        {' '}
                        {post.data.flight}
                      </span>
                    </p>
                  )}
                  {/* <h4 className="text-md md:text-large">The weather here is: cold 🥶 – just fine 👌 – hot 🥵</h4>
                   <h4 className="text-md md:text-large">Price Range:&euro;&euro;</h4>
                   <h4 className="text-md md:text-large">The flight will last at least: 🛫 between 1-3 hours || 🛫🛫 between 3 and 6 hours || 🛫🛫🛫 more than 6 hours</h4> */}

                  <ArrowIcon className="mt-2" />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
