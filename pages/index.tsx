import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author -> {
    name,
    image
  },
  description, 
  mainImage,
  slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Medium Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5 max-w-7xl mx-auto'>
          <h1 className='text-8xl max-w-xl font-serif'>Stay curious.</h1>
          <h2 className='text-4xl pb-10'>
            Discover stories, thinking, and expertise from writers on any topic.
          </h2>
          <Link href='/'>
            <h3 className='text-white bg-black px-4 py-2 rounded-full w-64 text-center text-2xl cursor-pointer'>
              Start Reading
            </h3>
          </Link>
        </div>
        <img
          className='hidden md:inline-flex h-32 lg:h-full max-w-7xl mx-auto'
          src='banner.png'
          alt='banner'
        />
      </div>

      {/* Posts */}
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='group cursor-pointe border rounded-lg overflow-hidden'>
                <img
                  className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                  src={urlFor(post.mainImage).url()!}
                  alt=''
                />
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-md'>{post.description}</p>
                    <p className='text-sm'>By {post.author.name}</p>
                  </div>
                  <img
                    className='h-12 w-12 rounded-full'
                    src={urlFor(post.author.image).url()!}
                    alt=''
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className='bg-yellow-400'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            <span className='block'>Want to learn more about medium?</span>
            <span className='block black'>Subscribe for more.</span>
          </h2>
          <div className='mt-8 flex lg:mt-0 lg:flex-shrink-0'>
            <div className='inline-flex rounded-md shadow'>
              <a
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black'
              >
                {" "}
                Get started{" "}
              </a>
            </div>
            <div className='ml-3 inline-flex rounded-md shadow'>
              <a
                href='#'
                className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white'
              >
                {" "}
                Learn more{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
