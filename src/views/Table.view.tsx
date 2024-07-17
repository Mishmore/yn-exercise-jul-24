import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {
    Box,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    styled,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import { APP_ROUTES } from '../domain/routes'
import { useAnswersStore } from '../state'

// TASK 4:
// - Implement the table from this mockup (public/table_view_mockup.png).
// - Display answers from store in table.
// - Each row of the table body should have the name of the answer
// and its value.
// - Add the edit and delete buttons on top of the table.

// TASK 5:
// - Redirect to Form view on edit button click.

// TASK 6:
// - Invoke useResetAnswers hook on delete button click.
// - See useResetAnswers hook for more guidelines.

const TableViewWrapper = styled(Container)(({ theme }) => ({
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        width: 650,
    },
}))

const buttonsMenuStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
}

export const TableView: React.FC = () => {
    const answers = useAnswersStore(state => state.getAnswers())

    const interests = answers.interests
        .filter(elm => Object.values(elm)[0].isChecked)
        .map(elm => Object.values(elm)[0]?.label)
        .join(', ')

    const rows = Object.entries({ ...answers, interests })

    return (
        <TableViewWrapper id="table-view">
            <Box sx={buttonsMenuStyles}>
                <Link to={APP_ROUTES.FORM}>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Box>

            <TableContainer component={Paper} sx={{ width: '100%' }}>
                <Table width="100%" aria-label="answers table">
                    <caption>Questions and Answers Registered</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Questions
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Answers
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row[0]}>
                                <TableCell component="th" scope="row">
                                    {row[0]}
                                </TableCell>
                                <TableCell>
                                    {row[1]?.length > 0 ? row[1] : '-'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TableViewWrapper>
    )
}
