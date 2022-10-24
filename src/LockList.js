import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AppPagination from './Pagination';


const LockList = ({
  currentLockListPagination,
  onLockListPaginationChange,
  handleWiFiChange,
  handleBluetoothChange,
  rows
}) => {
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            getDisplayRows(currentLockListPagination - 1).map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.status}</td>
                  <td>
                    <span onClick={() => handleWiFiChange(row.id)}>{row.capabilities.indexOf("WiFi") != -1 && (row.disabled ? <Button variant="secondary">WiFi</Button> : <Button variant="primary">WiFi</Button>)}</span>
                    <span onClick={() => handleBluetoothChange(row.id)}>
                      {row.capabilities.indexOf("Bluetooth") != -1 && row.status == "active" && (row.disabled ? <Button variant="secondary">Bluetooth</Button> : <Button variant="primary">Bluetooth</Button>)}
                    </span></td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <AppPagination size={rows.length} currentPagination={currentLockListPagination} onPaginationChange={onLockListPaginationChange} />
    </div>
  )
}

export default LockList;