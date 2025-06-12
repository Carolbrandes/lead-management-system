import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.aside`
  width: 220px;
  background-color: #f9fafb;
  padding: 2rem 1.5rem;
  border-right: 1px solid #e5e7eb;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoWrapper = styled.div`
  margin-bottom: 3rem;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  text-align: left;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: ${({ $active }) => ($active ? '#111827' : '#6b7280')};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #111827;
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  flex: 1;
  min-width: 200px;
`;

export const StatusSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  min-width: 200px;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const LeadTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    white-space: nowrap;
  }

  th {
    background-color: #f9fafb;
    color: #374151;
    font-weight: 600;
  }

  tr:hover {
    background-color: #f3f4f6;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;

    th, td {
      padding: 0.75rem;
    }
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: white;
  background-color: ${({ status }) =>
        status === 'PENDING' ? '#f59e0b' : '#10b981'};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

export const PageButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 0.75rem;
  background-color: ${({ $active }) => ($active ? '#111827' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#111827')};
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const ActionButtonPrimary = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const ActionButtonSecondary = styled.button`
  background-color: #f3f4f6;
  color: #111827;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;