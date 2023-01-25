import styled from 'styled-components';
import {Row, Col, Button, Form} from 'react-bootstrap';

import {mediaQueries} from 'styles/shared';

export const wrapper = styled(Row)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const sortByContainer = styled(Col)`
  display: flex;
  justify-content: flex-start;
`;

export const searchContainer = styled(Col)`
  display: flex;
  align-items: center;
  margin: 20px 0;

  @media ${mediaQueries.tablet} {
    margin: 0;
  }

  @media ${mediaQueries.desktop} {
    justify-content: flex-start;
  }
`;

export const searchActionButton = styled(Button)`
  margin-left: 10px;
`;

export const paginationContainer = styled(Col)`
  display: flex;
  justify-content: center;

  @media ${mediaQueries.tablet} {
    margin-top: 20px;
  }

  @media ${mediaQueries.desktop} {
    margin-top: 0;
    justify-content: flex-end;
  }
`;

export const addActionContainerContainer = styled(Col)`
  display: flex;
  justify-content: flex-end;
`;

export const searchInput = styled(Form.Control)`
  height: 38px;
  max-width: 360px;
`;
