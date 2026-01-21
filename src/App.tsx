import { useEffect, useState, useCallback } from 'react'
import Autocomplete from './Autocomplete'
import styled from '@emotion/styled'
import type { Address, ResponseUser, User } from './types'
import { formatName, getNameOptions } from './utils'
import logo from './assets/logo.svg'

const USER_LIST_URL = 'https://jsonplaceholder.typicode.com/users'

function App() {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
  }

  const formatUserList = useCallback((userList: ResponseUser[]): User[] => {
    const list = userList.map(user => {
      const {name} = user;
      const nameOptions = getNameOptions(name);
      return {
        ...user,
        name: nameOptions,
      }
    })
    return list.sort((a, b) => a.name.lastName.localeCompare(b.name.lastName))
  }, [])
  useEffect(() => {
    async function fetchUserList(){
      try{
        const response = await fetch(USER_LIST_URL);
        if(!response.ok){
          console.error(`Request failed: ${response.status} ${response.statusText}`);
          return;
        } 
        const data: ResponseUser[] = await response.json().catch(err => {console.error("Error: ", err.message); return []});
        if(data){
          const formattedData = formatUserList(data);
          setUserList(formattedData);
        }  
    }
    catch(error){
      console.warn(error);
    }
  }
  fetchUserList();
  }, [formatUserList]);

  return (
    <AppContainer>
      <AutocompleteWrapper>
        <h1>Select a user</h1>
        <Autocomplete
          options={userList}
          handleSelectUser={handleSelectUser}
          />
        <SelectedUserWrapper>
          {selectedUser && <p>{formatName(selectedUser.name)}</p>}
          {selectedUser?.address && <Address address={selectedUser.address} />}
        </SelectedUserWrapper>
      </AutocompleteWrapper>
      <Footer>
        <p>ui by</p> <a href="https://aminatafoon.com" target="_blank" rel="noopener noreferrer"><Logo /></a>
      </Footer>
    </AppContainer>
  )
}

const Logo = () => <LogoWrapper>
  <p>amina</p>
  <img src={logo} alt="logo" />
</LogoWrapper>
const LogoWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
})
const SelectedUserWrapper = styled.div({
  marginTop: '2rem',
  fontFamily: 'Space Mono',
  p: {
    margin: 0,
  },
});
const Address = ({address}: {address: Address}) => {
  return <div>
    <p>{address?.street}</p>
    {address?.suite && <p>{address?.suite}</p>}
    {address?.city && <p>{address?.city}</p>}
    {address?.zipcode && <p>{address?.zipcode}</p>}
  </div>
};

const AppContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '2rem',
  height: '95svh',
}); 

const AutocompleteWrapper = styled.div({
  backgroundColor: 'var(--foreground-color)',
  padding: '2rem',
  borderRadius: '25px',
  boxShadow: 'var(--shadow)',
});

const Footer = styled.div({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.25rem',
  fontWeight: '600',
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
  'a:hover': {
    textDecoration: 'underline',
  }
})

export default App
