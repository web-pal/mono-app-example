import styled from 'styled-components';


export const NavigationContainer = styled.div`
  background: linear-gradient(45deg, rgba(255,255,255,1) 0%, rgba(0,255,255,1) 100%);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom:0;
  right: 0;
  left: 0; 
`;


export const ListLinks = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  padding:0;
`;


export const LinksElement = styled.li`
  display: inline;
  margin: 20px;
  font-size: 25px;
  border-bottom: none;
  transition: border-bottom 220ms ease-out;
  
  &:hover {
      border-bottom: 2px solid white;
    transition: border-bottom 220ms ease-out, color 220ms ease-out;
  }
  
`;
