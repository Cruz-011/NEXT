// StyledComponents.ts
import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #333;
`;

export const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const InputSelectStyle = styled.select`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const StyledThead = styled.thead`
  background-color: #007bff;
  color: white;
`;

export const StyledTbody = styled.tbody`
  background-color: #fff;
`;

export const StyledTr = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const StyledTh = styled.th`
  padding: 12px;
  text-align: left;
`;

export const StyledTd = styled.td`
  padding: 12px;
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  background-color: ${({ status }) =>
    status === 'completed'
      ? 'green'
      : status === 'pending'
      ? 'orange'
      : 'red'};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
