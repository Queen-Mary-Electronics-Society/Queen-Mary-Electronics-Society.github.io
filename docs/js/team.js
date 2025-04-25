// Team data management
export const teamData = {
    // Current team year (will be updated automatically)
    currentYear: '2024-2025',
    
    // Get available team years
    getAvailableYears: async () => {
        try {
            const baseUrl = window.siteConfig?.baseUrl || window.location.origin;
            const response = await fetch(`${baseUrl}/team/years.json`);
            if (!response.ok) throw new Error('Failed to fetch team years');
            return await response.json();
        } catch (error) {
            console.error('Error loading team years:', error);
            return [];
        }
    },
    
    // Load team data for a given year
    loadTeamData: async (year) => {
        try {
            const baseUrl = window.siteConfig?.baseUrl || window.location.origin;
            const response = await fetch(`${baseUrl}/team/data/${year}.json`);
            if (!response.ok) throw new Error(`Failed to fetch team data for ${year}`);
            return await response.json();
        } catch (error) {
            console.error(`Error loading team data for ${year}:`, error);
            return null;
        }
    },
    
    // Render team groups
    renderTeamHierarchy: (data) => {
        if (!data) return '';
        const baseUrl = window.siteConfig?.baseUrl || window.location.origin;
        const assetBase = `${baseUrl}/assets/team`;
        
        const renderMember = (member) => {
            const filename = member.name.toLowerCase().replace(/\s+/g, '-');
            const pngSrc = `${assetBase}/${filename}.png`;
            const jpgSrc = `${assetBase}/${filename}.jpg`;
            const defaultSrc = `${assetBase}/default.png`;
            
            const memberContent = `
                <div class="member-profile">
                    <img src="${pngSrc}"
                         alt="${member.name}"
                         title="${member.role || ''}"
                         onerror="if(this.src.endsWith('.png')){this.src='${jpgSrc}';}else{this.onerror=null;this.src='${defaultSrc}';}">
                </div>
                <div class="member-info">
                    ${member.role ? `<h3>${member.role}</h3>` : ''}
                    <p>${member.name}</p>
                </div>
            `;
            
            return member.link 
                ? `<a href="${member.link}" target="_blank" rel="noopener noreferrer" class="team-member-link">
                    <div class="team-member">
                        ${memberContent}
                    </div>
                   </a>`
                : `<div class="team-member">
                    ${memberContent}
                   </div>`;
        };
        
        const renderGroup = (groupName, members) => {
            return `
                <div class="role-group">
                    <h2>${groupName} (${members.length})</h2>
                    <div class="members-grid">
                        ${members.map(renderMember).join('')}
                    </div>
                </div>
            `;
        };
        
        return Object.entries(data.groups || data.roles)
            .map(([name, members]) => renderGroup(name, members))
            .join('');
    }
}; 