// Antigravity Core Logic

// 1. Mock Data Store (Based on real auction patterns)
const MOCK_DATA = [
    {
        id: "2023-10492",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
        court: "Seoul Central District Court",
        caseNumber: "2023 TKyung 10492",
        type: "Apartment",
        address: "Seoul, Gangnam-gu, Dogok-dong, Samsung Tower Palace #B-402",
        specs: "165㎡ (50py) | 12/35F",
        price: {
            appraisal: 3200000000,
            current: 2560000000,
            percent: 80
        },
        aiAnalysis: {
            score: 92,
            riskLevel: "SAFE",
            summary: "Highly desirable location. Tenant has no opposing power. Rights clean after sale."
        }
    },
    {
        id: "2024-3321",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
        court: "Suwon District Court",
        caseNumber: "2024 TKyung 3321",
        type: "Studio / Officetel",
        address: "Gyeonggi-do, Suwon-si, Yeongtong-gu, Ieui-dong",
        specs: "24㎡ (7py) | 5/10F",
        price: {
            appraisal: 210000000,
            current: 102900000,
            percent: 49
        },
        aiAnalysis: {
            score: 45,
            riskLevel: "DANGER",
            summary: "Tenant with opposing power present. Unpaid deposit risk high. Caution advised."
        }
    },
    {
        id: "2023-5510",
        image: "https://images.unsplash.com/photo-1600596542815-6ad4c12756ab?q=80&w=1000&auto=format&fit=crop",
        court: "Incheon District Court",
        caseNumber: "2023 TKyung 5510",
        type: "Semi-Detached",
        address: "Incheon, Michuhol-gu, Juan-dong",
        specs: "56㎡ (17py) | B01",
        price: {
            appraisal: 150000000,
            current: 105000000,
            percent: 70
        },
        aiAnalysis: {
            score: 78,
            riskLevel: "CAUTION",
            summary: "Check for building code violations (illegal extension). Price attractive but requires field visit."
        }
    }
];

// 2. Utility Functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
};

const getScoreColor = (score) => {
    if (score >= 90) return 'var(--status-safe)';
    if (score >= 70) return 'var(--status-warning)';
    return 'var(--status-danger)';
};

// 3. Render Engine
const renderAuctionCards = () => {
    const grid = document.getElementById('auction-grid');
    if (!grid) return;

    grid.innerHTML = MOCK_DATA.map(item => `
        <article class="glass-panel card fade-in" style="overflow: hidden; cursor: pointer; transition: transform 0.2s;" onclick="location.href='details.html?id=${item.id}'">
            <div style="height: 200px; overflow: hidden; position: relative;">
                <img src="${item.image}" alt="Property" style="width: 100%; height: 100%; object-fit: cover;">
                <div style="position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.7); padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; border: 1px solid var(--glass-border);">
                    <i class="fa-solid fa-gavel"></i> ${item.caseNumber}
                </div>
                <div style="position: absolute; bottom: 12px; left: 12px; display: flex; gap: 8px;">
                     <span style="background: ${getScoreColor(item.aiAnalysis.score)}; color: #000; font-weight: 800; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">
                        AI ${item.aiAnalysis.score}
                    </span>
                    <span style="background: rgba(0,0,0,0.6); padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; backdrop-filter: blur(4px);">
                        ${item.type}
                    </span>
                </div>
            </div>
            
            <div style="padding: 20px;">
                <h3 style="font-size: 1.1rem; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.address}</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px;">${item.specs}</p>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 12px;">
                    <div>
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Appraisal</div>
                        <div style="color: var(--text-secondary); text-decoration: line-through;">${formatCurrency(item.price.appraisal)}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 0.8rem; color: var(--accent-primary);">Min Bid (${item.price.percent}%)</div>
                        <div style="font-size: 1.2rem; font-weight: 700; color: white;">${formatCurrency(item.price.current)}</div>
                    </div>
                </div>

                <div style="border-top: 1px solid var(--glass-border); padding-top: 12px; font-size: 0.85rem; color: var(--text-muted);">
                    <i class="fa-solid fa-robot"></i> ${item.aiAnalysis.summary}
                </div>
            </div>
        </article>
    `).join('');
};

// 4. Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Inject Styles for Hover
    const style = document.createElement('style');
    style.innerHTML = `
        .card:hover { transform: translateY(-5px) !important; box-shadow: 0 10px 40px rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.2); }
    `;
    document.head.appendChild(style);

    renderAuctionCards();
});
