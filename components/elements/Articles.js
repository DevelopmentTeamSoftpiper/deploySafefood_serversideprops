import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Articles = ({blog}) => {

  return (
    <article className="entry blog-overlay p-2">
    <figure className="entry-media">
      <Link href={`/blogs/${blog?.slug}`}>
        <Image
          src={blog?.image}
          alt={blog?.title}
          width={335}
          height={200}
          priority={true}
        />
      </Link>
    </figure>
    {/* End .entry-media */}
    <div className="entry-body">
      <div className="entry-meta font-size-normal">
        <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>
      </div>
      {/* End .entry-meta font-size-normal */}
      <h3 className="entry-title my-4 mt-0">
        <Link href={`/blogs/${blog?.slug}`}>{blog?.title}</Link>
      </h3>
      {/* End .entry-title */}

    </div>
    {/* End .entry-body */}
  </article>
  )
}

export default Articles