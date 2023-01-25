import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import {mediaQueries} from 'styles/shared';

const linkColor = '#337ab7';

export const container = styled.div`
  background-color: #f8f8f8;

  @media ${mediaQueries.tablet} {
    padding: 10px 20px;
  }
`;

export const noMovies = styled.div`
  margin-top: 30px;
`;

export const movieRow = styled.div`
  font-size: 15px;
  padding: 10px;
  margin-left: 0;
  margin-right: 0;
  border-bottom: 1px solid #cacaca;
  position: relative;
  display: flex;
  width: 100%;

  @media ${mediaQueries.tablet} {
    padding: 10px 0;
  }
`;

export const imageContainer = styled.div`
  height: 100%;
  background-color: #eee;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

export const content = styled.div`
  font-size: 12px;
  margin-left: 10px;
  text-align: left;
  font-family: Verdana, Arial, sans-serif;
  color: #333;
  width: 100%;

  p span::before {
    content: ' | ';
    color: #ddd;
  }
`;

export const header = styled.h3`
  font-size: 17px;
  margin: 0;
`;

export const actionLink = styled(Button)`
  color: ${linkColor};
  text-decoration: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;

  @media ${mediaQueries.tablet} {
    width: auto;
  }
`;

export const actionButton = styled(Button)`
  float: right;
  margin-left: 5px;
  color: black;
`;

export const info = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const actors = styled.p`
  margin-top: 8px;
  color: ${linkColor};
`;

export const plot = styled.p`
  overflow: hidden;
  position: relative;
  line-height: 1.4em;
  text-align: justify;
  padding-right: 1.2em;
  font-size: 14px;
  margin-bottom: 0;
`;
