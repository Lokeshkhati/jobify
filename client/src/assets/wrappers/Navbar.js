import styled from 'styled-components'

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;

  .user-container {
    display: flex;
  align-items: center;
  justify-content: center;
  gap:10px
  }
  @media (min-width: 992px) {
    
  }
`
export default Wrapper