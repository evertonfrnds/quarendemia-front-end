import styled from 'styled-components'

export interface PropsNavItem {
  selected?: boolean
}

export const Container = styled.div`
  margin-left: 96px;
  min-height: 350px;
`

export const NavItem = styled.div<PropsNavItem>`
  background: ${(props) => (props.selected ? '#2D2A33' : 'rgb(40, 38, 46)')};
  width: 220px;
  margin-bottom: 15px;
  padding: 18px 25px;
  border-radius: 5px;

  border-left: ${(p) => (p.selected ? '2px solid #015c92' : '')};

  a {
    text-decoration: none;
    color: ${(p) => (p.selected ? '#015c92' : '#fff')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    &:hover {
      color: #015c92;
    }
  }
`
