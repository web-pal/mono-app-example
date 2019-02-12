import React from 'react';
import {
  ErrorPageContainer, ErrorText,
} from './styled';


const ErrorComponent = () => (
  <ErrorPageContainer>
    <ErrorText>
      404 page not found
    </ErrorText>
  </ErrorPageContainer>
);

export default ErrorComponent;
