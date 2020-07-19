import styled from 'styled-components'
import Modal from 'react-modal'

export const Container = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  max-width: 55rem;
  padding: 10px;
  width: 350px;
  background-color: #28262e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    padding: 10px 15px;
    justify-content: space-between;
    align-items: center;
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
    }
    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      &::-moz-focus-inner {
        border: none;
      }
    }
  }
  .content {
    min-height: 50px;
    padding: 10px 15px;
    margin-bottom: 5px;
  }
  .group-button {
    display: flex;
    height: 40px;
    justify-content: flex-end;
    button {
      background-color: #f04747;
      border: none;
      padding: 5px 15px;
      color: #fff;
      font-weight: 500;
      border-radius: 5px;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: #c93c3c;
      }
      &::-moz-focus-inner {
        border: none;
      }
    }
  }
`
