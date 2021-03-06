import React from 'react';
import { Link, graphql } from 'gatsby';
import _, { get } from 'lodash';
import PostCard from '../components/Common/PostCard';
import MainTemplate from '../components/Common/MainTemplate';
import styled from 'styled-components';
import Profile from '../components/Common/Profile';
import Footer from '../components/Common/Footer';
import '../typography.css';
import GlobalStyles from '../GlobalStyles';
import SEO from '../components/seo';
import PageResponsive from '../components/Common/PageResponsive';

interface Props {
  data: {
    allMarkdownRemark: any;
    site: {
      siteMetadata: {
        title: string;
        siteUrl: string;
        author: string;
      };
    };
  };
}

export const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const BlogIndex: React.FC<Props> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  const metaData = data.site.siteMetadata;
  return (
    <>
      <SEO title={'HOME'} />
      <GlobalStyles />
      <PageResponsive>
        <MainTemplate>
          <MainTemplate.Main>
            {/*Todo categories */}
            <PostCard posts={posts} author={metaData.author} />
          </MainTemplate.Main>
          {/* <MainTemplate.Right>
            <Profile />
          </MainTemplate.Right> */}
        </MainTemplate>
      </PageResponsive>
      <Footer />
    </>
  );
};

export default React.memo(BlogIndex);

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
        siteUrl
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD-MM-YYYY")
            title
            category
            image {
              children {
                ... on ImageSharp {
                  fixed(width: 640, height: 300) {
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
