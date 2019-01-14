import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

import Layout from "../layout";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import { renderAst } from "../util/Rehype";

export default class PostTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const frontMatter = data.post.frontmatter;
    if (!frontMatter.id) {
      frontMatter.id = pageContext.slug;
    }
    if (!frontMatter.category_id) {
      frontMatter.category_id = config.postDefaultCategoryID;
    }
    return (
      <Layout pageContext={pageContext} data={data}>
        <Helmet>
          <title>{`${frontMatter.title} | ${config.siteTitle}`}</title>
          <body className="w-100 sans-serif pa0 near-black" />
        </Helmet>
        <SEO postPath={pageContext.slug} postNode={data.post} postSEO />

        <div className="flex">
          <div className="w-100 flex justify-center b--moon-gray">
            <div className="mw7 pa3">
              <h1>
                {frontMatter.title}
                {' '}
              </h1>
              {renderAst(data.post.htmlAst)}
              <div className="post-meta">
                <PostTags tags={frontMatter.tags} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
    }
    nav: allSiteNavJson {
      edges {
        node {
          slug
          title
          subnodes {
            node {
              slug
              title
            }
          }
        }
      }
    }
  }
`;
