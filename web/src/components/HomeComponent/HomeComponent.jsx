import React from 'react';
import {
  Link,
} from 'react-router-dom';
import
{
  NavigationContainer, LinksElement, ListLinks,
} from './styled';


const HomeComponent = () => (
  <NavigationContainer>
    <ListLinks>

      <LinksElement>
        <Link to="/products">Products</Link>
      </LinksElement>

      <LinksElement>
        <Link to="/generator">Generator</Link>
      </LinksElement>

    </ListLinks>
  </NavigationContainer>
);

export default HomeComponent;
