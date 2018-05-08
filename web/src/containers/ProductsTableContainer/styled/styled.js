import styled from 'styled-components';

const Info = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
)
const Row = ({className, children}) => (
    <div className={className}>
        {children}
    </div>
)
export const TableInfo = styled(Info)`
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        border: 1px solid #f2f2f2;
        font-size: 1rem;
        margin: 0.5rem;
        line-height: 1.5;
        width: 40%;
`;
export const TableRow = styled(Row)`
        width: 100%;
        display: flex;
        border-bottom: 1px solid #f2f2f2; 
        justify-content: space-around;
`;
