import React, { useState, useEffect } from 'react';
import { Link, graphql } from "gatsby";
import { useIdentityContext } from 'react-netlify-identity-gotrue';

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Button from "../components/button";
import { openPaddleCheckout } from "../utils/utils";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;
  const identity = useIdentityContext();

  const[showPaddleCheckout, setShowPaddleCheckout] = useState(false);

  useEffect(() => {
    if (identity.user && showPaddleCheckout) {
      openPaddleCheckout(identity.user);
      setShowPaddleCheckout(false);
    }
  }, [identity.user, showPaddleCheckout])

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      {
        identity.user &&
        <>
          <h1>Add Subscription</h1>
          <Button showPaddleCheckout={showPaddleCheckout} setShowPaddleCheckout={setShowPaddleCheckout} user={identity.user}>Subscribe</Button>
        </>
      }

    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
