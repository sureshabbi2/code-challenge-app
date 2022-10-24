import Pagination from 'react-bootstrap/Pagination';
function AppPagination(props) {
    let active = props.currentPagination || 1;
    let items = [];
    let limit = (props.size / 5) + 1;
    for (let number = 1; number <= limit; number++) {
        items.push(
            <Pagination.Item onClick={() => props.onPaginationChange(number)} key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <Pagination style={{ justifyContent: 'flex-end' }} size="lg">{items}</Pagination>
    );
}

export default AppPagination;