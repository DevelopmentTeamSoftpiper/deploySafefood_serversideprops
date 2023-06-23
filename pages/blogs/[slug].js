import Blog from "@/models/Blog";
import SubBlog from "@/models/SubBlog";
import { fetchDataFromApi, getData } from "@/utils/api";
import db from "@/utils/db";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
const SingleBlog = ({ blog, relatedBlogs ,blogCats}) => {

  const bl = blog;
  const htmlContent = bl?.content;
  return (
 <>
  <Head>
      <title>{bl?.title}</title>
      <meta name="description" content = {bl?.content}/>
      <meta property="og:title" content={bl?.title} />
      <meta property="og:description" content={bl?.content} />
      <meta property="og:image" content={bl?.image} />
    </Head>

    <main className="main px-5">

<nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
  <div className="container">
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link href="/">Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link href="/blogs">Blogs</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
       {bl?.title}
      </li>
    </ol>
  </div>
  {/* End .container */}
</nav>
{/* End .breadcrumb-nav */}
<div className="page-content">
  <div className="container">
    <div className="row">
      <div className="col-lg-9">
        <article className="entry single-entry">
          <figure className=" d-flex justify-content-center">
            <Image
              src={bl?.image}
              alt={bl?.title}
              width={400}
              height={200}
            />
          </figure>
          {/* End .entry-media */}
          <div className="entry-body">
            <div className="entry-meta">
              <span className="entry-author">
                by <span>{bl?.author}</span>
              </span>
              <span className="meta-separator">|</span>
              <a href="#">
                {new Date(bl?.updatedAt).toLocaleDateString()}
              </a>
            </div>
            {/* End .entry-meta */}
            <h2 className="entry-title">{bl?.title}</h2>
            {/* End .entry-title */}
            <div className="entry-cats">
              in   
        <Link key={bl?.subBlog?.id} href={`/blogs/category/${bl?.subBlog?.slug}`} style={{color:'black'}}> | {bl?.subBlog?.title} </Link>
 
            </div>
            {/* End .entry-cats */}
            <div className="entry-content editor-content">
              {/* <p>
                <ReactMarkdown>{bl?.content}</ReactMarkdown>
              </p> */}
               <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>
          {/* End .entry-body */}
        </article>
      </div>
      {/* End .col-lg-9 */}
      <aside className="col-lg-3">
        <div className="sidebar">
          {/* <div className="widget widget-search">
            <h3 className="widget-title">Search</h3>
       
            <form action="#">
              <label htmlFor="ws" className="sr-only">
                Search in blog
              </label>
              <input
                type="search"
                className="form-control"
                name="ws"
                id="ws"
                placeholder="Search in blog"
                required=""
              />
              <button type="submit" className="btn">
                <i className="icon-search" />
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div> */}
          {/* End .widget */}
          <div className="widget widget-cats">
            <h3 className="widget-title">Categories</h3>
            {/* End .widget-title */}
            <ul>
            {blogCats?.map((cat)=>(
                <li key={cat?._id}>
                <a href={`/blogs/category/${cat?.slug}`}>
                  {cat?.title}
                </a>
              </li>
            ))}

            </ul>
          </div>
          {/* End .widget */}
          <div className="widget">
            <h3 className="widget-title">Popular Posts</h3>
            {/* End .widget-title */}
            <ul className="posts-list">
             {relatedBlogs?.map((rb)=>(
               <li key={rb?._id}>
               <figure>
                 <Link href={`/blogs/${rb?.slug}`}>
                   <Image
                     src={rb?.image}
                     alt="post"
                     width={100}
                     height={100}
                   />
                 </Link>
               </figure>
               <div>
                 <span>{new Date(rb?.createdAt).toLocaleDateString()}</span>
                 <h4>
                   <Link href={`/blogs/${rb?.slug}`}>{rb?.title}</Link>
                 </h4>
               </div>
             </li>
             ))}

            </ul>
            {/* End .posts-list */}
          </div>
          {/* End .widget */}
        </div>
        {/* End .sidebar sidebar-shop */}
      </aside>
      {/* End .col-lg-3 */}
    </div>
    {/* End .row */}
  </div>
  {/* End .container */}
</div>
{/* End .page-content */}
</main>
 </>
  );
};

export default SingleBlog;

export async function getStaticPaths() {
  db.connectDb();
  const blogs = await Blog.find({});
  const paths = blogs?.map((p) => ({
    params: {
      slug: p.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params: { slug } }) {
  const blogData = await Blog.findOne({slug:slug}).populate({path:"subBlog", model:SubBlog});
  const blogCatsData=  await SubBlog.find({}).sort({ updatedAt: -1 });
  const relatedBlogsData = await Blog.find({}).populate({path:'subBlog', model:SubBlog})
  .sort({ updatedAt: -1 });
  db.disconnectDb();

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blogData)),
      relatedBlogs:JSON.parse(JSON.stringify(relatedBlogsData)),
      slug,
      blogCats: JSON.parse(JSON.stringify(blogCatsData))
    },
    revalidate:60
  };
}


// export async function getServerSideProps(context) {
//   const { slug } = context.query;
  
//   const blog = await getData(
//     `/api/admin/blog/find?slug=${slug}`
//   );
//   const blogCats=  await getData(
//     `/api/admin/sub-blog/getAll`
//   );
//   const relatedBlogs = await getData("/api/admin/blog/getAll");
//   return {
//     props: {
//       blog,
//       relatedBlogs,
//       slug,
//       blogCats
//     },
//   };
// }


