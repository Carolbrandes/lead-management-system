import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as S from './styles';

export default function AdminDashboard() {
    const [leads, setLeads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsAuthenticated(true);
            fetchLeads();
        }
    }, []);

    const fetchLeads = async () => {
        try {
            const response = await fetch('/api/leads');
            const data = await response.json();
            setLeads(data);
        } catch (error) {
            console.error('Error fetching leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateLeadStatus = async (leadId, newStatus) => {
        try {
            await fetch(`/api/leads/${leadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchLeads();
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    const filteredLeads = leads
        .filter((lead) =>
            `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((lead) => (statusFilter ? lead.status === statusFilter : true));

    const paginatedLeads = filteredLeads.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);

    if (!isAuthenticated || isLoading) return <div>Loading...</div>;

    return (
        <S.Container>
            {/* Sidebar */}
            <S.Sidebar>
                <div>
                    <S.LogoWrapper>
                        <Image src="/images/logo.png" alt="Logo alma" width={65} height={23} />
                    </S.LogoWrapper>
                    <S.Nav>
                        <S.NavItem $active>Leads</S.NavItem>
                        <S.NavItem>Settings</S.NavItem>
                    </S.Nav>
                </div>
                <S.NavItem>Admin</S.NavItem>
            </S.Sidebar>

            {/* Main content */}
            <S.Main>
                <S.Header>Lead Management</S.Header>

                <S.Filters>
                    <S.SearchInput
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <S.StatusSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All Status</option>
                        <option value="PENDING">Pending</option>
                        <option value="REACHED_OUT">Reached Out</option>
                    </S.StatusSelect>
                </S.Filters>

                <S.TableWrapper>
                    <S.LeadTable>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>LinkedIn</th>
                                <th>Visas</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedLeads.map((lead) => (
                                <tr key={lead.id}>
                                    <td>{lead.firstName} {lead.lastName}</td>
                                    <td>{lead.email}</td>
                                    <td>
                                        <a href={lead.linkedIn} target="_blank" rel="noopener noreferrer">
                                            View Profile
                                        </a>
                                    </td>
                                    <td>{lead.visas.join(', ')}</td>
                                    <td>
                                        <S.StatusBadge status={lead.status}>{lead.status}</S.StatusBadge>
                                    </td>
                                    <td>
                                        <S.ActionButtons>
                                            {lead.status === 'PENDING' && (
                                                <S.ActionButtonPrimary onClick={() => updateLeadStatus(lead.id, 'REACHED_OUT')}>
                                                    Mark as Reached Out
                                                </S.ActionButtonPrimary>
                                            )}
                                            <S.ActionButtonSecondary onClick={() => window.open(`/api/leads/${lead.id}/resume`, '_blank')}>
                                                View Resume
                                            </S.ActionButtonSecondary>
                                        </S.ActionButtons>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </S.LeadTable>
                </S.TableWrapper>

                <S.Pagination>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <S.PageButton
                            key={i}
                            $active={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </S.PageButton>
                    ))}
                </S.Pagination>
            </S.Main>
        </S.Container>
    );
}