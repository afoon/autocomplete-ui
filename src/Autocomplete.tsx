
import { Autocomplete as MuiAutocomplete, TextField, } from '@mui/material'
import type { User } from './types'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import styled from '@emotion/styled'
import { formatName } from './utils'
const Theme = createTheme({
  typography: {
    fontFamily: 'Open Sans Variable',
  },
})

  const StyledAutocomplete = styled(MuiAutocomplete<User>)({
    minWidth: 500,
  })


const Autocomplete = ({options, handleSelectUser}: {options: User[] | undefined, handleSelectUser: (user: User) => void}) => {
    return (
        <ThemeProvider theme={Theme}>
        <StyledAutocomplete
            options={options as User[]}
            getOptionLabel={(option: User) => formatName(option?.name)}
            getOptionKey={(option: User) => option.id.toString()}
            onChange={(_, value) => handleSelectUser(value as User)}
            renderInput={(params) => <TextField {...params} label="Name" />}
        />
        </ThemeProvider>
    )
}

export default Autocomplete;