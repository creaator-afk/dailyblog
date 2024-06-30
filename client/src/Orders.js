import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from "@mui/material/Button";

// Generate Order Data
function createData(id, date, title, category, interaction, deletePost) {
    return {id, date, title, category, interaction, deletePost};
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Technology',
        '14',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'Programing',
        '20',
        866.99,
    ),
    createData(2,
        '16 Mar, 2019',
        'Tom Scholz',
        'Technology',
        '82',
        100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Programing',
        '70',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Fiction',
        '4',
        212.79,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    return (
        <React.Fragment>
            <Title>Recent Blogs</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Interaction</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.category}</TableCell>
                            <TableCell align="right">{row.interaction}</TableCell>
                            <TableCell align="right"><Button> Delete</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{mt: 3}}>
                See more . . . .
            </Link>
        </React.Fragment>
    );
}