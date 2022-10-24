import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
function NavBar({ allItems, selectedNavItem, onNavChange }) {
    const getVariant = (currentItem) => {
        return currentItem == selectedNavItem ? "primary" : "secondary";
    }
    return (
        <Nav fill as="ul" activeKey={'lock_list'}>
            <Nav.Item as="li">
                <Button onClick={() => onNavChange('lock_list')} variant={getVariant('lock_list')}>Lock List</Button>
            </Nav.Item>
            {' '}
            <Nav.Item as="li">
                <Button onClick={() => onNavChange('other_iot_devices')} variant={getVariant('other_iot_devices')}>IOTDevices</Button>
            </Nav.Item>
            {' '}
            <Nav.Item as="li">
                <Button onClick={() => onNavChange('special_integration_lock')} variant={getVariant('special_integration_lock')}>Special Integration</Button>
            </Nav.Item>
        </Nav>
    );
}
export default NavBar;