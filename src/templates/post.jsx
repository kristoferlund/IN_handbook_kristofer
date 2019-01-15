import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import _ from 'lodash';
import { MdToc } from 'react-icons/md';

import Layout from '../layout';
import PostTags from '../components/PostTags/PostTags';
import SEO from '../components/SEO/SEO';
import config from '../../data/SiteConfig';
import { renderAst } from '../util/Rehype';

let mql;
if (typeof window !== `undefined`) {
  mql = window.matchMedia(`(min-width: 800px)`);
}

function styleToc(toc) {
  // Hack hack;
  let newToc = toc;
  if (typeof newToc !== 'undefined') {
    // debugger;
    newToc = _.replace(
      newToc,
      /<ul>/g,
      '<ul class="list nested-list-reset pa0 pt1">'
    );
    newToc = _.replace(
      newToc,
      /<li>/g,
      '<li class="list nested-list-reset pl3 pt1">'
    );
    newToc = _.replace(newToc, /<a/g, '<a class="link dim blue f6 lh-copy"');
    newToc = _.replace(newToc, /<p/g, '<p class="ma0"');
    newToc = _.replace(newToc, /(&#x3C;code([^>]+)>)/gi, '');
    newToc = _.replace(newToc, /(&#x3C;\/code>)/gi, '');
  }
  return newToc;
}

function iconImage(icon) {
  if (icon) {
    return <img className="w-20" src={icon} alt="" />;
  }
  return null;
}

function coverImage(cover) {
  if (cover) {
    return <img className="w-100" src={cover} alt="" />;
  }
  return null;
}

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    if (typeof mql !== `undefined`) {
      this.state = {
        contentsOpen: mql.matches
      };
    } else {
      this.state = {
        contentsOpen: true
      };
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.displayContents = this.displayContents.bind(this);
  }

  componentWillMount() {
    if (typeof mql !== `undefined`) {
      mql.addListener(this.mediaQueryChanged);
    }
  }

  componentWillUnmount() {
    if (typeof mql !== `undefined`) {
      mql.removeListener(this.mediaQueryChanged);
    }
  }

  mediaQueryChanged() {
    this.setState({ contentsOpen: mql.matches });
  }

  displayContents() {
    const { contentsOpen } = this.state;
    if (contentsOpen) {
      return { width: 250, display: 'block' };
    }
    return { display: 'none' };
  }

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
          <div className="w-100 flex justify-center ">
            <div className="w-100 mw7 pa3">
              {iconImage(frontMatter.icon)}
              {coverImage(frontMatter.cover)}
              <h1 className="f1 sans-serif lh-title">{frontMatter.title}</h1>
              {renderAst(data.post.htmlAst)}
              <div className="post-meta">
                <PostTags tags={frontMatter.tags} />
              </div>
            </div>
            <div className="pa3 ml3 mr3" style={this.displayContents()}>
              <div
                className="f6 bl gray b--moon-gray pt3 pb3"
                style={{ width: 250 }}
              >
                <MdToc className="f4 relative pl3" style={{ top: 5 }} />
                {' '}
                CONTENTS
                <div
                  dangerouslySetInnerHTML={{
                    __html: styleToc(data.post.tableOfContents)
                  }}
                />
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
      tableOfContents(pathToSlugField: "frontmatter.slug")
      frontmatter {
        title
        cover
        icon
        date
        category
        tags
        slug
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
