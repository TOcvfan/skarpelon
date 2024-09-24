import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@/lib/mui';
import { ButtonIcon, Title } from '$/Components';
import { MdDeleteForever } from "react-icons/md";
import { fredericka } from '$/fonts';

export default function Tabel({ data, top, funk }) {

    return (
        <Paper sx={{ width: '95%', overflow: 'hidden', background: 'transparent', color: '#e1c043' }}>
            <TableContainer sx={{ maxHeight: 840 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {top?.map((column) => (
                                <TableCell
                                    sx={{ background: '#e1c043', color: 'blue' }}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!data.error && data?.map((row, i) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                    {top.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align} sx={{ color: '#e1c043', textShadow: '-1px 1px 1px black' }}><Title className={fredericka.className} color='#e1c043' size={10}>
                                                {column.id === 'slet' ? <ButtonIcon onClick={() => funk(row.id)}><MdDeleteForever size={35} /></ButtonIcon> : (column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value)}</Title>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}