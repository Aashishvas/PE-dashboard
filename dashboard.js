// Peter England Retail Dashboard JavaScript

// Global variables
let storeData = [];
let currentStore = null;
let charts = {};

// Store configuration for 30 stores
const storeNames = [
    'PE Delhi CP', 'PE Mumbai Linking Road', 'PE Bangalore MG Road', 'PE Chennai Express Avenue',
    'PE Hyderabad Banjara Hills', 'PE Pune FC Road', 'PE Kolkata Park Street', 'PE Gurgaon City Centre',
    'PE Noida City Centre', 'PE Jaipur Pink Square', 'PE Ahmedabad CG Road', 'PE Lucknow Hazratganj',
    'PE Indore Treasure Island', 'PE Bhopal DB City', 'PE Chandigarh Elante', 'PE Kochi Lulu Mall',
    'PE Coimbatore Brookefields', 'PE Mysore Forum', 'PE Visakhapatnam CMR Central', 'PE Vijayawada PVP Square',
    'PE Nagpur Empress City', 'PE Surat VR Mall', 'PE Vadodara Inorbit', 'PE Rajkot RWorld', 
    'PE Ludhiana MBD Mall', 'PE Jalandhar Curo High Street', 'PE Amritsar Alpha One', 'PE Dehradun Pacific',
    'PE Kanpur Z Square', 'PE Agra TDI Mall'
];

// Metric definitions with categories
const metrics = {
    sales: [
        { key: 'salesPerSqFt', name: 'Sales Per Square Foot', unit: '₹/sqft', target: 5000 },
        { key: 'conversionRate', name: 'Conversion Rate', unit: '%', target: 25 },
        { key: 'avgTransactionValue', name: 'Average Transaction Value', unit: '₹', target: 2500 },
        { key: 'footfallCount', name: 'Footfall Count', unit: 'visitors', target: 1000 }
    ],
    operations: [
        { key: 'vmComplianceScore', name: 'VM Compliance Score', unit: '%', target: 90 },
        { key: 'planogramAdherence', name: 'Planogram Adherence', unit: '%', target: 95 },
        { key: 'cleanlinessScore', name: 'Cleanliness & Upkeep Score', unit: '%', target: 95 },
        { key: 'instockRate', name: 'In-stock Rate', unit: '%', target: 90 },
        { key: 'sellThroughRate', name: 'Sell-through Rate', unit: '%', target: 80 }
    ],
    customer: [
        { key: 'csatScore', name: 'Customer Satisfaction Score', unit: '/10', target: 8.5 },
        { key: 'npsScore', name: 'Net Promoter Score', unit: '', target: 50 },
        { key: 'grievanceResolutionTAT', name: 'Grievance Resolution TAT', unit: 'hours', target: 24 }
    ],
    staff: [
        { key: 'productKnowledgeScore', name: 'Product Knowledge Score', unit: '%', target: 85 },
        { key: 'groomingComplianceScore', name: 'Grooming Compliance', unit: '%', target: 95 },
        { key: 'trainingCompletionRate', name: 'Training Completion Rate', unit: '%', target: 100 },
        { key: 'managerKPICompliance', name: 'Manager KPI Compliance', unit: '%', target: 90 }
    ],
    infrastructure: [
        { key: 'itDowntime', name: 'IT & POS Downtime', unit: 'hours', target: 2 },
        { key: 'storeAuditScore', name: 'Store Audit Score', unit: '%', target: 90 },
        { key: 'energyEfficiency', name: 'Energy Efficiency', unit: 'kWh/sqft', target: 15 },
        { key: 'communityEngagement', name: 'Community Engagement Index', unit: '%', target: 75 }
    ]
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    generateSampleData();
    populateStoreDropdown();
    showOverview();
});

// Initialize dashboard components
function initializeDashboard() {
    updateLastUpdatedTime();
    
    // Set up chart defaults
    Chart.defaults.color = '#a0a6b8';
    Chart.defaults.backgroundColor = '#252b3b';
    Chart.defaults.borderColor = '#3a4553';
    
    // Initialize charts
    initializeCharts();
}

// Generate sample data for demonstration
function generateSampleData() {
    storeData = storeNames.map((name, index) => {
        const store = {
            id: index + 1,
            name: name,
            location: name.split(' ').slice(1).join(' '),
            area: Math.floor(Math.random() * 2000) + 1000, // 1000-3000 sqft
            status: Math.random() > 0.1 ? 'Active' : 'Inactive'
        };

        // Generate metrics data
        Object.keys(metrics).forEach(category => {
            metrics[category].forEach(metric => {
                let value;
                const variance = 0.3; // 30% variance from target
                
                if (metric.unit === '%') {
                    value = Math.max(0, Math.min(100, 
                        metric.target + (Math.random() - 0.5) * metric.target * variance));
                } else if (metric.unit === 'hours') {
                    value = Math.max(0, 
                        metric.target + (Math.random() - 0.5) * metric.target * variance);
                } else if (metric.unit === '/10') {
                    value = Math.max(0, Math.min(10, 
                        metric.target + (Math.random() - 0.5) * metric.target * variance));
                } else {
                    value = Math.max(0, 
                        metric.target + (Math.random() - 0.5) * metric.target * variance);
                }
                
                store[metric.key] = Math.round(value * 100) / 100;
            });
        });

        // Calculate revenue
        store.revenue = store.salesPerSqFt * store.area;
        
        // Calculate overall score
        store.overallScore = calculateOverallScore(store);
        
        return store;
    });
}

// Calculate overall performance score
function calculateOverallScore(store) {
    let totalScore = 0;
    let totalMetrics = 0;
    
    Object.keys(metrics).forEach(category => {
        metrics[category].forEach(metric => {
            const value = store[metric.key];
            const target = metric.target;
            let score;
            
            if (metric.unit === 'hours') {
                // Lower is better for downtime/TAT
                score = Math.max(0, (target * 2 - value) / target * 100);
            } else {
                score = (value / target) * 100;
            }
            
            totalScore += Math.min(100, score);
            totalMetrics++;
        });
    });
    
    return Math.round(totalScore / totalMetrics * 100) / 100;
}

// Populate store dropdown
function populateStoreDropdown() {
    const dropdown = document.getElementById('storeDropdown');
    const compareStore1 = document.getElementById('compareStore1');
    const compareStore2 = document.getElementById('compareStore2');
    
    storeData.forEach(store => {
        // Main dropdown
        const button = document.createElement('button');
        button.textContent = store.name;
        button.onclick = () => showStore(store.id);
        dropdown.appendChild(button);
        
        // Comparison dropdowns
        const option1 = document.createElement('option');
        option1.value = store.id;
        option1.textContent = store.name;
        compareStore1.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = store.id;
        option2.textContent = store.name;
        compareStore2.appendChild(option2);
    });
}

// Initialize all charts
function initializeCharts() {
    initializeSalesChart();
    initializeConversionChart();
    initializeCSATChart();
    initializeAuditChart();
    initializeComparisonChart();
    initializeTrendsChart();
}

// Initialize sales performance chart
function initializeSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    
    const sortedStores = [...storeData].sort((a, b) => b.revenue - a.revenue).slice(0, 10);
    
    charts.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedStores.map(store => store.name.split(' ').slice(-1)[0]),
            datasets: [{
                label: 'Revenue (₹ Lakhs)',
                data: sortedStores.map(store => Math.round(store.revenue / 100000)),
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#3a4553'
                    }
                },
                x: {
                    grid: {
                        color: '#3a4553'
                    }
                }
            }
        }
    });
}

// Initialize conversion vs footfall chart
function initializeConversionChart() {
    const ctx = document.getElementById('conversionChart').getContext('2d');
    
    charts.conversionChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Stores',
                data: storeData.map(store => ({
                    x: store.footfallCount,
                    y: store.conversionRate
                })),
                backgroundColor: 'rgba(240, 147, 251, 0.8)',
                borderColor: '#f093fb',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Footfall Count'
                    },
                    grid: {
                        color: '#3a4553'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Conversion Rate (%)'
                    },
                    grid: {
                        color: '#3a4553'
                    }
                }
            }
        }
    });
}

// Initialize CSAT distribution chart
function initializeCSATChart() {
    const ctx = document.getElementById('csatChart').getContext('2d');
    
    const csatRanges = {
        'Excellent (9-10)': storeData.filter(s => s.csatScore >= 9).length,
        'Good (7-8.9)': storeData.filter(s => s.csatScore >= 7 && s.csatScore < 9).length,
        'Average (5-6.9)': storeData.filter(s => s.csatScore >= 5 && s.csatScore < 7).length,
        'Poor (<5)': storeData.filter(s => s.csatScore < 5).length
    };
    
    charts.csatChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(csatRanges),
            datasets: [{
                data: Object.values(csatRanges),
                backgroundColor: [
                    '#00ff88',
                    '#4facfe',
                    '#ffb800',
                    '#ff4757'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Initialize audit scores chart
function initializeAuditChart() {
    const ctx = document.getElementById('auditChart').getContext('2d');
    
    const topStores = [...storeData]
        .sort((a, b) => b.storeAuditScore - a.storeAuditScore)
        .slice(0, 8);
    
    charts.auditChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: topStores.map(store => store.name.split(' ').slice(-1)[0]),
            datasets: [{
                label: 'Audit Scores',
                data: topStores.map(store => store.storeAuditScore),
                backgroundColor: 'rgba(76, 175, 254, 0.2)',
                borderColor: '#4caffe',
                pointBackgroundColor: '#4caffe',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4caffe'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#3a4553'
                    },
                    angleLines: {
                        color: '#3a4553'
                    }
                }
            }
        }
    });
}

// Initialize comparison chart
function initializeComparisonChart() {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    charts.comparisonChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [],
            datasets: []
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: '#3a4553'
                    },
                    angleLines: {
                        color: '#3a4553'
                    }
                }
            }
        }
    });
}

// Initialize trends chart
function initializeTrendsChart() {
    const ctx = document.getElementById('trendsChart').getContext('2d');
    
    // Generate sample trend data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const avgRevenue = months.map(() => Math.floor(Math.random() * 1000000) + 2000000);
    const avgCSAT = months.map(() => Math.random() * 2 + 7);
    
    charts.trendsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Avg Revenue (₹ Lakhs)',
                    data: avgRevenue.map(v => v / 100000),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    yAxisID: 'y'
                },
                {
                    label: 'Avg CSAT Score',
                    data: avgCSAT,
                    borderColor: '#f093fb',
                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    grid: {
                        color: '#3a4553'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: '#3a4553'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: '#3a4553'
                    }
                }
            }
        }
    });
}

// Navigation functions
function showOverview() {
    setActiveSection('overviewSection');
    setActiveNavButton(0);
    updateKPIs();
    updateStoreTable();
}

function showStore(storeId) {
    const store = storeData.find(s => s.id === storeId);
    if (!store) return;
    
    currentStore = store;
    setActiveSection('storeSection');
    updateStoreDetails(store);
}

function showComparison() {
    setActiveSection('comparisonSection');
    setActiveNavButton(2);
}

function showReports() {
    setActiveSection('reportsSection');
    setActiveNavButton(3);
    updateReports();
}

function setActiveSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function setActiveNavButton(index) {
    document.querySelectorAll('.nav-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

// Update KPI cards
function updateKPIs() {
    const totalRevenue = storeData.reduce((sum, store) => sum + store.revenue, 0);
    const totalFootfall = storeData.reduce((sum, store) => sum + store.footfallCount, 0);
    const avgCSAT = storeData.reduce((sum, store) => sum + store.csatScore, 0) / storeData.length;
    const avgTraining = storeData.reduce((sum, store) => sum + store.trainingCompletionRate, 0) / storeData.length;
    
    document.getElementById('totalRevenue').textContent = `₹${(totalRevenue / 10000000).toFixed(2)}Cr`;
    document.getElementById('totalFootfall').textContent = totalFootfall.toLocaleString();
    document.getElementById('avgCSAT').textContent = avgCSAT.toFixed(1);
    document.getElementById('trainingCompletion').textContent = `${avgTraining.toFixed(1)}%`;
    
    // Add sample percentage changes
    document.getElementById('revenueChange').textContent = '+12.5%';
    document.getElementById('footfallChange').textContent = '+8.2%';
    document.getElementById('csatChange').textContent = '+3.1%';
    document.getElementById('trainingChange').textContent = '+5.7%';
}

// Update store performance table
function updateStoreTable() {
    const tbody = document.getElementById('storeTableBody');
    tbody.innerHTML = '';
    
    const sortedStores = [...storeData].sort((a, b) => b.overallScore - a.overallScore);
    
    sortedStores.forEach(store => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${store.name}</td>
            <td>₹${store.salesPerSqFt.toLocaleString()}</td>
            <td>${store.conversionRate.toFixed(1)}%</td>
            <td>₹${store.avgTransactionValue.toLocaleString()}</td>
            <td>${store.csatScore.toFixed(1)}/10</td>
            <td>
                <span class="metric-status ${getScoreClass(store.overallScore)}">
                    ${store.overallScore.toFixed(1)}%
                </span>
            </td>
            <td>
                <button class="view-btn" onclick="showStore(${store.id})">
                    View Details
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update individual store details
function updateStoreDetails(store) {
    document.getElementById('storeTitle').textContent = store.name;
    document.getElementById('storeStatus').textContent = store.status;
    document.getElementById('storeStatus').className = `store-status ${store.status.toLowerCase()}`;
    
    // Update store KPIs
    updateStoreKPIs(store);
    updateStoreCharts(store);
    updateStoreMetrics(store);
}

// Update store KPIs
function updateStoreKPIs(store) {
    const kpisContainer = document.querySelector('.store-kpis');
    kpisContainer.innerHTML = `
        <div class="kpi-card sales">
            <div class="kpi-icon"><i class="fas fa-rupee-sign"></i></div>
            <div class="kpi-content">
                <h3>Revenue</h3>
                <div class="kpi-value">₹${(store.revenue / 100000).toFixed(1)}L</div>
                <div class="kpi-change positive">+8.5%</div>
            </div>
        </div>
        <div class="kpi-card operations">
            <div class="kpi-icon"><i class="fas fa-chart-area"></i></div>
            <div class="kpi-content">
                <h3>Sales/SqFt</h3>
                <div class="kpi-value">₹${store.salesPerSqFt.toLocaleString()}</div>
                <div class="kpi-change positive">+5.2%</div>
            </div>
        </div>
        <div class="kpi-card customer">
            <div class="kpi-icon"><i class="fas fa-percentage"></i></div>
            <div class="kpi-content">
                <h3>Conversion Rate</h3>
                <div class="kpi-value">${store.conversionRate.toFixed(1)}%</div>
                <div class="kpi-change ${store.conversionRate >= 25 ? 'positive' : 'negative'}">
                    ${store.conversionRate >= 25 ? '+' : ''}${(store.conversionRate - 25).toFixed(1)}%
                </div>
            </div>
        </div>
        <div class="kpi-card staff">
            <div class="kpi-icon"><i class="fas fa-star"></i></div>
            <div class="kpi-content">
                <h3>Overall Score</h3>
                <div class="kpi-value">${store.overallScore.toFixed(1)}%</div>
                <div class="kpi-change ${store.overallScore >= 80 ? 'positive' : 'negative'}">
                    ${store.overallScore >= 80 ? 'Good' : 'Needs Improvement'}
                </div>
            </div>
        </div>
    `;
}

// Update store charts
function updateStoreCharts(store) {
    const chartsContainer = document.querySelector('.store-charts');
    chartsContainer.innerHTML = `
        <div class="chart-container">
            <h3>Performance vs Targets</h3>
            <canvas id="storePerformanceChart"></canvas>
        </div>
        <div class="chart-container">
            <h3>Monthly Trends</h3>
            <canvas id="storeTrendsChart"></canvas>
        </div>
    `;
    
    // Create store performance chart
    setTimeout(() => {
        createStorePerformanceChart(store);
        createStoreTrendsChart(store);
    }, 100);
}

// Create store performance chart
function createStorePerformanceChart(store) {
    const ctx = document.getElementById('storePerformanceChart').getContext('2d');
    
    const keyMetrics = [
        { name: 'Sales/SqFt', value: store.salesPerSqFt, target: 5000 },
        { name: 'Conversion', value: store.conversionRate, target: 25 },
        { name: 'CSAT', value: store.csatScore * 10, target: 85 },
        { name: 'Training', value: store.trainingCompletionRate, target: 100 },
        { name: 'Audit Score', value: store.storeAuditScore, target: 90 }
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: keyMetrics.map(m => m.name),
            datasets: [
                {
                    label: 'Actual',
                    data: keyMetrics.map(m => (m.value / m.target) * 100),
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: '#667eea',
                    borderWidth: 2
                },
                {
                    label: 'Target',
                    data: keyMetrics.map(() => 100),
                    backgroundColor: 'rgba(255, 107, 53, 0.3)',
                    borderColor: '#ff6b35',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 120,
                    grid: { color: '#3a4553' }
                },
                x: {
                    grid: { color: '#3a4553' }
                }
            }
        }
    });
}

// Create store trends chart
function createStoreTrendsChart(store) {
    const ctx = document.getElementById('storeTrendsChart').getContext('2d');
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const revenue = months.map(() => store.revenue + (Math.random() - 0.5) * store.revenue * 0.2);
    const footfall = months.map(() => store.footfallCount + (Math.random() - 0.5) * store.footfallCount * 0.3);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Revenue (₹L)',
                    data: revenue.map(v => v / 100000),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    yAxisID: 'y'
                },
                {
                    label: 'Footfall',
                    data: footfall,
                    borderColor: '#f093fb',
                    backgroundColor: 'rgba(240, 147, 251, 0.1)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: '#3a4553' } },
                y: {
                    type: 'linear',
                    position: 'left',
                    grid: { color: '#3a4553' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}

// Update store metrics by category
function updateStoreMetrics(store) {
    Object.keys(metrics).forEach(category => {
        const container = document.getElementById(`${category}Metrics`);
        if (!container) return;
        
        container.innerHTML = '';
        
        metrics[category].forEach(metric => {
            const value = store[metric.key];
            const target = metric.target;
            const performance = metric.unit === 'hours' ? 
                (target * 2 - value) / target : value / target;
            
            const status = performance >= 1 ? 'good' : 
                          performance >= 0.8 ? 'average' : 'poor';
            
            const metricItem = document.createElement('div');
            metricItem.className = 'metric-item';
            metricItem.innerHTML = `
                <div class="metric-name">${metric.name}</div>
                <div class="metric-value">
                    ${value.toFixed(1)}${metric.unit}
                </div>
                <div class="metric-status ${status}">
                    ${status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
            `;
            container.appendChild(metricItem);
        });
    });
}

// Update comparison
function updateComparison() {
    const store1Id = document.getElementById('compareStore1').value;
    const store2Id = document.getElementById('compareStore2').value;
    const metricCategory = document.getElementById('compareMetric').value;
    
    if (!store1Id || !store2Id) return;
    
    const store1 = storeData.find(s => s.id == store1Id);
    const store2 = storeData.find(s => s.id == store2Id);
    
    if (!store1 || !store2) return;
    
    let metricsToCompare = [];
    if (metricCategory === 'all') {
        Object.values(metrics).forEach(categoryMetrics => {
            metricsToCompare.push(...categoryMetrics);
        });
    } else {
        metricsToCompare = metrics[metricCategory] || [];
    }
    
    const chart = charts.comparisonChart;
    chart.data.labels = metricsToCompare.map(m => m.name);
    chart.data.datasets = [
        {
            label: store1.name,
            data: metricsToCompare.map(m => store1[m.key]),
            borderColor: '#667eea',
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            pointBackgroundColor: '#667eea'
        },
        {
            label: store2.name,
            data: metricsToCompare.map(m => store2[m.key]),
            borderColor: '#f093fb',
            backgroundColor: 'rgba(240, 147, 251, 0.2)',
            pointBackgroundColor: '#f093fb'
        }
    ];
    chart.update();
}

// Update reports
function updateReports() {
    updatePerformanceRanking();
    updateActionItems();
}

// Update performance ranking
function updatePerformanceRanking() {
    const container = document.getElementById('performanceRanking');
    const sortedStores = [...storeData].sort((a, b) => b.overallScore - a.overallScore);
    
    const topPerformers = sortedStores.slice(0, 5);
    const bottomPerformers = sortedStores.slice(-5).reverse();
    
    container.innerHTML = `
        <h4 style="color: var(--success); margin-bottom: 1rem;">Top Performers</h4>
        ${topPerformers.map((store, index) => `
            <div class="performance-item">
                <div class="rank-badge top">${index + 1}</div>
                <div>
                    <div style="font-weight: 600;">${store.name}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        Score: ${store.overallScore.toFixed(1)}%
                    </div>
                </div>
            </div>
        `).join('')}
        
        <h4 style="color: var(--error); margin: 2rem 0 1rem 0;">Bottom Performers</h4>
        ${bottomPerformers.map((store, index) => `
            <div class="performance-item">
                <div class="rank-badge bottom">${sortedStores.length - index}</div>
                <div>
                    <div style="font-weight: 600;">${store.name}</div>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">
                        Score: ${store.overallScore.toFixed(1)}%
                    </div>
                </div>
            </div>
        `).join('')}
    `;
}

// Update action items
function updateActionItems() {
    const container = document.getElementById('actionItems');
    
    const actionItems = [
        {
            priority: 'high',
            store: 'PE Agra TDI Mall',
            description: 'CSAT score below 6.0. Immediate customer service training required.'
        },
        {
            priority: 'high',
            store: 'PE Kanpur Z Square',
            description: 'Stock availability at 75%. Review inventory management.'
        },
        {
            priority: 'medium',
            store: 'PE Dehradun Pacific',
            description: 'Training completion at 85%. Schedule pending modules.'
        },
        {
            priority: 'medium',
            store: 'PE Amritsar Alpha One',
            description: 'VM compliance needs improvement. Schedule audit visit.'
        },
        {
            priority: 'low',
            store: 'PE Ludhiana MBD Mall',
            description: 'Energy efficiency can be optimized. Review HVAC settings.'
        }
    ];
    
    container.innerHTML = actionItems.map(item => `
        <div class="action-item">
            <div class="action-priority ${item.priority}">${item.priority} Priority</div>
            <div style="font-weight: 600; margin-bottom: 0.5rem;">${item.store}</div>
            <div class="action-description">${item.description}</div>
        </div>
    `).join('');
}

// Excel file upload handler
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            processExcelData(jsonData);
            updateLastUpdatedTime();
            
            // Show success message
            alert('Data uploaded successfully!');
            
            // Refresh current view
            if (document.getElementById('overviewSection').classList.contains('active')) {
                showOverview();
            }
        } catch (error) {
            console.error('Error processing Excel file:', error);
            alert('Error processing Excel file. Please check the format.');
        }
    };
    reader.readAsArrayBuffer(file);
}

// Process Excel data
function processExcelData(jsonData) {
    // Map Excel data to store data structure
    jsonData.forEach((row, index) => {
        if (index < storeData.length) {
            const store = storeData[index];
            
            // Update store metrics based on Excel columns
            Object.keys(metrics).forEach(category => {
                metrics[category].forEach(metric => {
                    const excelValue = row[metric.name] || row[metric.key];
                    if (excelValue !== undefined && excelValue !== null) {
                        store[metric.key] = parseFloat(excelValue) || 0;
                    }
                });
            });
            
            // Recalculate derived values
            store.revenue = store.salesPerSqFt * store.area;
            store.overallScore = calculateOverallScore(store);
        }
    });
    
    // Refresh charts
    Object.values(charts).forEach(chart => {
        if (chart && chart.destroy) {
            chart.destroy();
        }
    });
    initializeCharts();
}

// Export reports
function exportReports() {
    const reportData = storeData.map(store => {
        const row = { 'Store Name': store.name, 'Location': store.location };
        
        Object.keys(metrics).forEach(category => {
            metrics[category].forEach(metric => {
                row[metric.name] = store[metric.key];
            });
        });
        
        row['Overall Score'] = store.overallScore;
        row['Revenue'] = store.revenue;
        
        return row;
    });
    
    const ws = XLSX.utils.json_to_sheet(reportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Store Performance Report');
    
    const filename = `Peter_England_Store_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, filename);
}

// Update charts when filters change
function updateCharts() {
    // This function would implement filtering logic
    // For now, we'll just refresh the charts
    Object.values(charts).forEach(chart => {
        if (chart && chart.update) {
            chart.update();
        }
    });
}

// Helper functions
function getScoreClass(score) {
    if (score >= 80) return 'good';
    if (score >= 60) return 'average';
    return 'poor';
}

function updateLastUpdatedTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-IN');
    document.getElementById('lastUpdated').textContent = `Last Updated: ${timeString}`;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Format percentage
function formatPercentage(value) {
    return `${value.toFixed(1)}%`;
}

// Resize charts on window resize
window.addEventListener('resize', function() {
    Object.values(charts).forEach(chart => {
        if (chart && chart.resize) {
            chart.resize();
        }
    });
});