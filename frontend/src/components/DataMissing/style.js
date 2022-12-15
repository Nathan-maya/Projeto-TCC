import styled from 'styled-components';

export const Container = styled.section``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Info = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: white;
  max-width: 400px;
  width: 100%;

  >a img {
    width: 100%;
    max-height: 15rem;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;
export const InfoText = styled.div`
  display: flex;
  padding: 5px 0;
  text-transform: capitalize;
`
export const TextLabel = styled.p`
  font-weight: bold;
`
export const P = styled.p`
  margin-left: 5px;
`;
