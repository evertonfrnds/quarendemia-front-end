import styled from 'styled-components'
import { shade } from 'polished'
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

// NAVITEM

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

export const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MainTitle = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    .separator {
      width: 1px;
      height: 80%;
      background-color: #999;
      margin: 0 10px;
    }
    span {
      font-size: 19px;
      color: #999;
      font-weight: 300;
    }
  }
`
// TABLE
export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const MainName = styled.div`
  padding: 15px 10px;
  display: flex;
  font-size: 17px;
  align-items: center;
  h3 {
    color: #999;
    span {
      color: white;
    }
  }
`
export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 10px;

  thead {
    tr {
      th {
        padding: 10px 15px;
        text-align: start;
        font-weight: 300;
        color: #999;
        font-size: 14px;
      }
    }
  }
  tbody {
    tr {
      background: #2a2830;
      td {
        text-align: start;
        padding: 15px 15px;
        color: #bbb;
        .group-button {
          display: flex;
          button {
            background: #7289da;
            border: none;
            outline: none;
            padding: 10px;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            text-align: center;
            transition: background-color 0.2s ease-in-out;
            &:hover {
              background-color: #505f99;
            }
            &.del {
              background-color: #f04747;
              &:hover {
                background-color: #c93c3c;
              }
            }
            &::-moz-focus-inner {
              border: none;
            }
            svg {
              color: #fff;
            }
            &:last-child {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
`

// SearchInput

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  button {
    margin-right: 15px;
    border: none;
    background-color: #4285f4;
    color: #fff;
    width: 40px;
    height: 40px;
    padding: 5px 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: ${shade(0.2, '#4285f4')};
    }
    &::-moz-focus-inner {
      border: none;
    }
  }
  input {
    border-radius: 5px;
    padding: 10px 20px;
    background: #232129;
    flex: 1;
    border: 0;
    color: #f4ede8;
  }
`
