import PageArticles from "@/components/elements/PageArticles";
import Blog from "@/models/Blog";
import SubBlog from "@/models/SubBlog";
import { fetchDataFromApi, getData } from "@/utils/api";
import db from "@/utils/db";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Blogs = ({ blogs, blogCats }) => {
  return (
    <>
      <Head>
        <title>Safefoods|Blogs</title>
        <meta name="description" content="Safefoods: For Your Family" />
        <link rel="icon" href="/assets/images/logo-safefoods.png" />
        <meta property="og:url" content={`https://safefoods.com.bd/blogs`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Safefoods | Blogs `} />
        <meta property="og:description" content="Safefoods Blogs" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
        /> 
        {/* TWITTER CARD  */}
         <meta name="twitter:site" content="@sajibahmed5282" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://twitter.com/sajibahmed5282/"
        />
        <meta name="twitter:title" content={`Safefoods | Blogs`} />
        <meta name="twitter:description" content="Safefoods Blogs" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dymnymsph/image/upload/v1687017637/safefoods/logo-safefoods_drdvz8.png"
        />
   
      </Head>

      <main className="main px-5">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">Safefood Blogs</h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href="/">Blogs</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Listing
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
                {blogs?.map((blog) => (
                  <PageArticles key={blog?._id} blog={blog} />
                ))}

                {/* <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a
                    className="page-link page-link-prev"
                    href="#"
                    aria-label="Previous"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-left" />
                    </span>
                    Prev
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link page-link-next"
                    href="#"
                    aria-label="Next"
                  >
                    Next{" "}
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-right" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav> */}
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
                      {blogCats?.map((cat) => (
                        <li key={cat?._id}>
                          <a href={`/blogs/category/${cat?.slug}`}>
                            {cat?.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* End .sidebar */}
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

export default Blogs;

export async function getStaticProps() {
  db.connectDb();
  const blogsData = await Blog.find({})
    .populate({ path: "subBlog", model: SubBlog })
    .sort({ updatedAt: -1 });
  const blogCatsData = await SubBlog.find({}).sort({ updatedAt: -1 });
  db.disconnectDb();

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogsData)),
      blogCats: JSON.parse(JSON.stringify(blogCatsData)),
    },
    revalidate: 60,
  };
}
