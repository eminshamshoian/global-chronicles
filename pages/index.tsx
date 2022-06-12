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
        <title>Global Chronicles</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <div className='flex justify-between items-center bg-red-100 border-y k py-10 lg:py-0'>
        <div className='px-10 space-y-5 max-w-7xl mx-auto'>
          <h1 className='text-6xl max-w-xl font-serif'>Global Chronitlces</h1>
          <h2 className='text-4xl pb-10'>
            A blog about discovery of global events and much more.
          </h2>
          <Link href='/'>
            <h3 className='text-white bg-black px-4 py-2 rounded-full w-64 text-center text-2xl cursor-pointer'>
              Discover
            </h3>
          </Link>
        </div>
        <img
          className='hidden md:inline-flex h-32 lg:h-1/3 max-w-7xl mx-auto p-40'
          src='banner.jpg'
          alt='banner'
        />
      </div>

      {/* Posts */}
      <div className='container mx-auto py-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='group cursor-pointer shadow-lg rounded overflow-hidden'>
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
      <div className='bg-red-100'>
        <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
          <h2 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            <span className='block'>
              Want to learn more about global chronicles?
            </span>
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

      {/* About */}
      <div
        className='2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4'
        id='about'
      >
        <div className='flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12'>
          <div className='w-full lg:w-6/12'>
            <h2 className='w-full font-bold lg:text-4xl text-3xl lg:leading-10 leading-9'>
              Our goal is to provide top quality news content.
            </h2>
            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
              The categories of our news content is what is most popular in the
              world. This is a truly unique place to find out about what is
              happening around us from vacations to basketball games.
            </p>
          </div>
          <div className='w-full lg:w-6/12'>
            <img
              className='lg:block hidden w-full'
              src='about.jpg'
              alt='people discussing on board'
            />
            <img
              className='lg:hidden sm:block hidden w-full'
              src='about.jpg'
              alt='people discussing on board'
            />
            <img
              className='sm:hidden block w-full'
              src='about.jpg'
              alt='people discussing on board'
            />
          </div>
        </div>

        <div className='relative mt-24'>
          <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4'>
            <div className='z-20 w-12 h-12 bg-gray-800 rounded-full flex justify-center items-center'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 5V21'
                  stroke='white'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M19 5V14'
                  stroke='white'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5 4.99984C5.93464 4.08371 7.19124 3.57056 8.5 3.57056C9.80876 3.57056 11.0654 4.08371 12 4.99984C12.9346 5.91598 14.1912 6.42913 15.5 6.42913C16.8088 6.42913 18.0654 5.91598 19 4.99984'
                  stroke='white'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5 14.0001C5.93464 13.084 7.19124 12.5708 8.5 12.5708C9.80876 12.5708 11.0654 13.084 12 14.0001C12.9346 14.9162 14.1912 15.4294 15.5 15.4294C16.8088 15.4294 18.0654 14.9162 19 14.0001'
                  stroke='white'
                  strokeWidth='2.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <svg
              className='z-20'
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='24' cy='24' r='24' fill='#1F2937' />
              <path
                d='M26 15V19C26 19.2652 26.1054 19.5196 26.2929 19.7071C26.4804 19.8946 26.7348 20 27 20H31'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M31 30V31C31 31.5304 30.7893 32.0391 30.4142 32.4142C30.0391 32.7893 29.5304 33 29 33H19C18.4696 33 17.9609 32.7893 17.5858 32.4142C17.2107 32.0391 17 31.5304 17 31V30'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M30 26H33M15 26H18H15ZM22.5 26H25.5H22.5Z'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M17 22V17C17 16.4696 17.2107 15.9609 17.5858 15.5858C17.9609 15.2107 18.4696 15 19 15H26L31 20V22'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>

            <svg
              className='z-20 sm:block hidden'
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='24' cy='24' r='24' fill='#1F2937' />
              <path
                d='M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M15 33V31C15 29.9391 15.4214 28.9217 16.1716 28.1716C16.9217 27.4214 17.9391 27 19 27H23C24.0609 27 25.0783 27.4214 25.8284 28.1716C26.5786 28.9217 27 29.9391 27 31V33'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M28 15.1301C28.8604 15.3504 29.623 15.8508 30.1676 16.5524C30.7122 17.254 31.0078 18.117 31.0078 19.0051C31.0078 19.8933 30.7122 20.7562 30.1676 21.4578C29.623 22.1594 28.8604 22.6598 28 22.8801'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M33 33.0001V31.0001C32.9949 30.1173 32.6979 29.2609 32.1553 28.5645C31.6126 27.8682 30.8548 27.3708 30 27.1501'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <hr className='z-10 absolute top-2/4 w-full bg-gray-200' />
        </div>
        <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4'>
          <div>
            <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6'>
              Founded @ 2022
            </p>
            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div>
            <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6'>
              100K Monthly Subscribers
            </p>
            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
          <div className='sm:block hidden'>
            <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6'>
              50k Unique Monthly Visitors
            </p>
            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>
        <div className='sm:hidden block relative mt-8'>
          <div className='grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4'>
            <svg
              className='z-20'
              width='48'
              height='48'
              viewBox='0 0 48 48'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='24' cy='24' r='24' fill='#1F2937' />
              <path
                d='M21 23C23.2091 23 25 21.2091 25 19C25 16.7909 23.2091 15 21 15C18.7909 15 17 16.7909 17 19C17 21.2091 18.7909 23 21 23Z'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M15 33V31C15 29.9391 15.4214 28.9217 16.1716 28.1716C16.9217 27.4214 17.9391 27 19 27H23C24.0609 27 25.0783 27.4214 25.8284 28.1716C26.5786 28.9217 27 29.9391 27 31V33'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M28 15.1301C28.8604 15.3504 29.623 15.8508 30.1676 16.5524C30.7122 17.254 31.0078 18.117 31.0078 19.0051C31.0078 19.8933 30.7122 20.7562 30.1676 21.4578C29.623 22.1594 28.8604 22.6598 28 22.8801'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M33 33.0001V31.0001C32.9949 30.1173 32.6979 29.2609 32.1553 28.5645C31.6126 27.8682 30.8548 27.3708 30 27.1501'
                stroke='white'
                strokeWidth='2.75'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
          <hr className='z-10 absolute top-2/4 w-full bg-gray-200' />
        </div>
        <div className='sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4'>
          <div>
            <p className='font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 mt-6'>
              400k User
            </p>
            <p className='font-normal text-base leading-6 text-gray-600 mt-6'>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
