import styled from 'styled-components'
import { Table as TableMaterial } from '@material-ui/core'
import { PropsNavItem } from '.'

export const Container = styled.div``

export const Header = styled.header`
  padding: 28px 0;
  background: #28262e;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 34px auto;
  display: flex;
`

export const NavItem = styled.div<PropsNavItem>`
  background: ${(props) => (props.selected ? '#2D2A33' : 'rgb(40, 38, 46)')};
  width: 220px;
  margin-bottom: 15px;
  padding: 18px 25px;
  border-radius: 5px;

  border-left: ${(p) => (p.selected ? '2px solid #ff9000' : '')};

  a {
    text-decoration: none;
    color: ${(p) => (p.selected ? '#ff9000' : '#fff')};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    &:hover {
      color: #ff9000;
    }
  }
`

export const Table = styled(TableMaterial)`
  background-color: red;
`

// CONTENT MAIN

// export const Content = styled.main`
//   max-width: 1120px;
//   margin: 34px auto;
//   display: flex;
// `

// export const MainContainer = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: row;
// `
// export const MainTable = styled.div`
//   flex: 3;
//   margin-right: 15px;
// `
// export const Table = styled.table`
//   width: 100%;
//   border-collapse: separate;
//   border-spacing: 0px 10px;

//   thead {
//     tr {
//       th {
//         padding: 10px 15px;
//         text-align: start;
//         font-weight: 300;
//         color: #999;
//         font-size: 14px;
//       }
//     }
//   }
//   tbody {
//     tr {
//       td {
//         text-align: start;
//         background-color: #2a2830;
//         padding: 15px 15px;
//         color: #bbb;
//       }
//     }
//   }
// `

// export const MainCards = styled.div`
//   background-color: lightpink;
//   flex: 1;
// `
