// Team data management
export const teamData = {
    // Current team year (will be updated automatically)
    currentYear: '2024-2025',
    
    // Function to get all available team years
    getAvailableYears: async () => {
        try {
            const baseUrl = window.siteConfig?.baseUrl || '';
            const response = await fetch(`${baseUrl}/team/years.json`);
            if (!response.ok) throw new Error('Failed to fetch team years');
            return await response.json();
        } catch (error) {
            console.error('Error loading team years:', error);
            return [];
        }
    },
    
    // Function to load team data for a specific year
    loadTeamData: async (year) => {
        try {
            const baseUrl = window.siteConfig?.baseUrl || '';
            const response = await fetch(`${baseUrl}/team/data/${year}.json`);
            if (!response.ok) throw new Error(`Failed to fetch team data for ${year}`);
            return await response.json();
        } catch (error) {
            console.error(`Error loading team data for ${year}:`, error);
            return null;
        }
    },
    
    // Function to render team hierarchy
    renderTeamHierarchy: (teamData) => {
        if (!teamData) return '';
        
        const renderMember = (member) => {
            return `
                <div class="team-member">
                    <div class="member-profile">
                        <img src="${member.photo || '/assets/default-profile.png'}" 
                             alt="${member.name}" 
                             title="${member.role}">
                    </div>
                    <div class="member-info">
                        <h3>${member.role}</h3>
                        <p>${member.name}</p>
                    </div>
                </div>
            `;
        };
        
        const renderRoleGroup = (role, members) => {
            return `
                <div class="role-group">
                    <h2>${role}</h2>
                    <div class="members-grid">
                        ${members.map(renderMember).join('')}
                    </div>
                </div>
            `;
        };
        
        return Object.entries(teamData.roles)
            .map(([role, members]) => renderRoleGroup(role, members))
            .join('');
    }
}; 