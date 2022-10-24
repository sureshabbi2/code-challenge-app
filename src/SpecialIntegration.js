import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AppPagination from './Pagination';


const SpecialIntegration = () => {
  const [rows, setRows] = useState([]);
  const [currentPagination, setPagination] = useState(1);
  useEffect(() => {
    axios.get('data/special_integration_lock.json').then((response) => {
      setRows(response?.data?.results);
    }).catch((error) => {
      console.log('Error while fetching the special_integration_lock.json', error);
    });

    return () => {
      console.log('cleanup SpecialIntegration');
    }
  }, []);

  const onPaginationChange = (newPage) => {
    console.log('newPage is', newPage);
    setPagination(newPage);
  }

  const getDisplayRows = (page) => {
    const startAt = page * 5;
    const endAt = (page + 1) * 5;
    return rows.slice(startAt, endAt);
  }


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Device Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            getDisplayRows(currentPagination - 1).map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>

                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <AppPagination size={rows.length} currentPagination={currentPagination} onPaginationChange={onPaginationChange} />
    </div >
  )
}

export default SpecialIntegration;