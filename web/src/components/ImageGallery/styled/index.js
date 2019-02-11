import styled from 'styled-components';

export const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid darkgray;
  border-radius: 4px;
  align-items: center;
  margin: 20px 5px;
  min-height: 325px;
`;

export const GalleryHeader = styled.h4`
  margin-top: 5px
`;

export const MainImageContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
`;
export const MainImage = styled.img`
  max-height: 150px;
`;

export const ImageScroller = styled.div`
  display: flex;
  justify-content: space-around;
  overflow: auto;
  overflow-y: hidden;
  margin-bottom: 10px;
`;
export const ScrollerImage = styled.img`
  width: 50px;
  height: 50px;
  padding: 1px;
  margin: 2px;
  cursor: pointer;
`;

export const ErrorPanel = styled.span`
  margin-top: 8px;
  padding: 20px;
  max-width: 100px;
  background-color: red;
  color: #fff;
`;
