// src/pages/account.js
import React from "react"
import { graphql } from "gatsby"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import PrivateRoute from "../components/privateRoute"

const Account = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Router>
        <PrivateRoute path="/account/profile" component={Profile} />
      </Router>
    </Layout>
  )
}

export default Account

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
