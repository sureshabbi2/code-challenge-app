import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IOTDevices from './IOTDevices';
import LockList from './LockList';
import NavBar from './NavBar';
import SpecialIntegration from './SpecialIntegration';
function App() {
    const navItems = ['lock_list', 'other_iot_devices', 'special_integration_lock'];
    const [selectedNavItem, setSelectedNavItem] = useState('lock_list');
    const onNavChange = (nav_item) => {
        setSelectedNavItem(nav_item);
    }

    // LockList 
    const [lockListRows, setLockListRows] = useState([]);
    const [currentLockListPagination, setLockListPagination] = useState(1);
    useEffect(() => {
        axios.get('data/lock_list.json').then((response) => {
            setLockListRows(response?.data?.locks);
        }).catch((error) => {
            console.log('Error while fetching the lock_list.json', error);
        });

        return () => {
            console.log('cleanup LockList');
        }
    }, []);

    const onLockListPaginationChange = (newPage) => {
        console.log('newPage is', newPage);
        setLockListPagination(newPage);
    }

    const handleWiFiChange = (id) => {
        let tempRows = [...lockListRows];
        tempRows = tempRows.map((item) => {
            if (item.id == id) {
                return ({ ...item, disabled: !item.disabled })
            }
            return item;
        });
        setLockListRows(tempRows);
    }

    const handleBluetoothChange = (id) => {
        let tempRows = [...lockListRows];
        tempRows = tempRows.map((item) => {
            if (item.id == id) {
                return ({ ...item, disabled: !item.disabled })
            }
            return item;
        });
        setLockListRows(tempRows);
    }

    // IOT Devices
    const [iotDevicesRows, setIOTDevicesRows] = useState([]);
    const [currentIOTDevicesPagination, setIOTDevicesPagination] = useState(1);

    useEffect(() => {
        axios.get('data/other_iot_devices.json').then((response) => {
            setIOTDevicesRows(response?.data?.results);
        }).catch((error) => {
            console.log('Error while fetching the other_iot_devices.json', error);
        });

        return () => {
            console.log('cleanup IOTDevices');
        }
    }, []);

    const onIOTDevicesPaginationChange = (newPage) => {
        setIOTDevicesPagination(newPage);
    }

    const handleSwitchState = (id) => {
        let tempRows = [...iotDevicesRows];
        tempRows = tempRows.map((item) => {
            if (item.id == id) {
                return ({
                    ...item, state: {
                        switch_state: item.state.switch_state == 'on' ? 'off' : 'on'
                    }
                })
            }
            return item;
        });
        setIOTDevicesRows(tempRows);
    }

    const handleDimmerState = (id, evt) => {
        let tempRows = [...iotDevicesRows];
        tempRows = tempRows.map((item) => {
            if (item.id == id) {
                return ({
                    ...item, state: {
                        dimmer_state: evt.target.value
                    }
                })
            }
            return item;
        });
        setIOTDevicesRows(tempRows);
    }



    return (
        <div>
            <h1>App</h1>
            <NavBar navItems={navItems} selectedNavItem={selectedNavItem} onNavChange={onNavChange} />
            <br/>
            
            {selectedNavItem === 'lock_list' && <LockList rows={lockListRows} onLockListPaginationChange={onLockListPaginationChange} handleWiFiChange={handleWiFiChange} handleBluetoothChange={handleBluetoothChange} currentLockListPagination={currentLockListPagination} />}
            {selectedNavItem === 'other_iot_devices' && <IOTDevices 
            onIOTDevicesPaginationChange={onIOTDevicesPaginationChange}
             currentIOTDevicesPagination={currentIOTDevicesPagination}  
             handleSwitchState={handleSwitchState} handleDimmerState={handleDimmerState} rows={iotDevicesRows} />}
            {selectedNavItem === 'special_integration_lock' && <SpecialIntegration />}
        </div>
    )
}

export default App;