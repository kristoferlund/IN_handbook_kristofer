import React from 'react';
import rehypeReact from 'rehype-react';
import styled from 'styled-components';

const H1 = styled.h1.attrs({
  className: 'f1 sans-serif lh-title'
})``;
const H2 = styled.h2.attrs({
  className: 'f2 sans-serif lh-title'
})``;
const H3 = styled.h3.attrs({
  className: 'f3 sans-serif lh-title'
})``;
const H4 = styled.h4.attrs({
  className: 'f4 sans-serif lh-title'
})``;
const H5 = styled.h5.attrs({
  className: 'f5 sans-serif lh-title'
})``;
const P = styled.p.attrs({
  className: 'sans-serif lh-copy'
})``;
const PRE = styled.p.attrs({
  className: 'bg-light-gray pa3 pre'
})``;
const OL = styled.ol.attrs({
  className: 'sans-serif'
})``;
const TABLE = styled.table.attrs({
  className: 'w-100'
})``;
const TH = styled.th.attrs({
  className: 'pv2 ph3 tl f6 fw6 ttu'
})``;
const TR = styled.tr.attrs({
  className: 'striped--light-gray'
})``;
const TD = styled.td.attrs({
  className: 'pv2 ph3'
})``;
const A = styled.a.attrs({
  className: 'link underline-hover blue'
})``;
const BLOCKQUOTE = styled.blockquote.attrs({
  className: 'bl b--light-gray bw3 ma3 pl3'
})``;
const CODE = styled.code.attrs({
  className: 'br4 bg-light-gray pa2'
})``;

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    p: P,
    pre: PRE,
    ol: OL,
    table: TABLE,
    th: TH,
    tr: TR,
    td: TD,
    a: A,
    blockquote: BLOCKQUOTE,
    code: CODE
  }
}).Compiler;
