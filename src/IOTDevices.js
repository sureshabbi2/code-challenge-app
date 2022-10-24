import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AppPagination from './Pagination';


const IOTDevices = ({
  rows,
  onIOTDevicesPaginationChange,
  currentIOTDevicesPagination,
  handleSwitchState,
  handleDimmerState,

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
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            getDisplayRows(currentIOTDevicesPagination - 1).map((row) => {
              return (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.type}</td>
                  <td>
                    <span onClick={() => handleSwitchState(row.id)}>{(row.type.includes('Light Switch') || row.type.includes('Outlet Switch')) && (row.state.switch_state == "on" ? (<Button variant="primary"> {row.type} </Button>) : (<Button variant="secondary">{row.type}</Button>))}</span>
                    <span onClick={() => handleSwitchState(row.id)}>{row.type.includes('Dimmer Switch') && (
                      <><label htmlFor="dimmer_state">Brightness (between 0 and 100):</label>
                        <input type="range" id="dimmer_state" value={row.state.dimmer_state} onChange={(evt) => handleDimmerState(row.id, evt)} name="dimmer_state" min="0" max="50"></input></>
                    )}</span>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <AppPagination size={rows.length} currentPagination={onIOTDevicesPaginationChange} onPaginationChange={onIOTDevicesPaginationChange} />
    </div >
  )
}

export default IOTDevices;