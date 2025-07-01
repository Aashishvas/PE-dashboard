# Peter England Retail Dashboard

## Overview

A comprehensive, interactive dashboard for tracking performance metrics across 30 Peter England retail stores in India. This dashboard provides real-time insights into sales, operations, customer experience, and staff performance with stunning visualizations and detailed analytics.

## Features

### 🎯 Key Capabilities
- **Interactive Dashboard** with dark theme and modern UI
- **30 Store Management** with individual store pages
- **20+ Performance Metrics** across 5 categories
- **Excel Data Import** with template support
- **Real-time Visualizations** using Chart.js
- **Comparative Analysis** between stores
- **Performance Rankings** and action items
- **Export Functionality** for reports

### 📊 Metric Categories

#### 1. Sales Metrics
- Sales Per Square Foot
- Conversion Rate
- Average Transaction Value (ATV)
- Footfall Count

#### 2. Operations
- Visual Merchandising Compliance Score
- Planogram Adherence
- Store Cleanliness & Upkeep Score
- In-stock Rate (Availability)
- Sell-through Rate

#### 3. Customer Experience
- Customer Satisfaction Score (CSAT)
- Net Promoter Score (NPS)
- Customer Grievance Resolution TAT

#### 4. Staff Performance
- Staff Product Knowledge Score
- Staff Grooming & Uniform Adherence
- Training Completion Rate
- Store Manager KPIs Compliance

#### 5. Infrastructure
- IT and POS Downtime
- Store Audit Score
- Energy & Utility Efficiency
- Community Engagement Index

## Quick Start

### 1. Setup
```bash
# Simply open the index.html file in a web browser
# No installation required - all dependencies are loaded via CDN
```

### 2. File Structure
```
project/
├── index.html              # Main dashboard
├── styles.css             # Styling and themes
├── dashboard.js           # Core functionality
├── sample-data-template.html  # Excel template guide
└── README.md              # This file
```

### 3. Opening the Dashboard
1. Download all files to a local folder
2. Open `index.html` in a modern web browser
3. The dashboard will load with sample data for all 30 stores

## Using the Dashboard

### Navigation

#### Overview Section
- **KPI Cards**: Quick overview of key metrics
- **Charts**: Visual representations of performance data
- **Store Table**: Sortable table with all store performance
- **Filters**: Time period and category filters

#### Individual Store Pages
- **Store KPIs**: Key metrics for the selected store
- **Performance Charts**: Store-specific visualizations
- **Metric Categories**: Detailed breakdown by category
- **Trend Analysis**: Historical performance data

#### Comparison Tool
- **Side-by-side comparison** of any two stores
- **Radar charts** for metric visualization
- **Category filtering** for focused analysis

#### Reports Section
- **Performance Rankings**: Top and bottom performers
- **Action Items**: Priority-based improvement suggestions
- **Trend Analysis**: Historical performance tracking
- **Export Options**: Download reports as Excel files

### Data Management

#### Excel Upload Process

1. **Download Template**
   - Visit `sample-data-template.html`
   - Click "Download Excel Template"
   - Or generate sample data for reference

2. **Prepare Your Data**
   - Use the exact column headers from the template
   - Ensure data types match the validation rules
   - Include all 30 stores (one per row)

3. **Upload Data**
   - Click "Upload Excel Data" in the main dashboard
   - Select your prepared Excel file
   - Data will be automatically processed and visualized

#### Data Format Requirements

| Column | Data Type | Example | Range |
|--------|-----------|---------|-------|
| Sales Per Square Foot | Number (₹) | 5000 | 3000-8000 |
| Conversion Rate | Percentage | 25.5 | 15-40 |
| Average Transaction Value | Number (₹) | 2500 | 1500-4000 |
| Footfall Count | Integer | 1000 | 500-2000 |
| CSAT Score | Decimal | 8.5 | 1-10 |
| NPS Score | Integer | 50 | -100 to +100 |
| Percentage Metrics | Percentage | 85.5 | 0-100 |
| Time Metrics (TAT/Downtime) | Hours | 24 | 0-72 |

## Store List

The dashboard tracks these 30 Peter England stores:

1. PE Delhi CP
2. PE Mumbai Linking Road
3. PE Bangalore MG Road
4. PE Chennai Express Avenue
5. PE Hyderabad Banjara Hills
6. PE Pune FC Road
7. PE Kolkata Park Street
8. PE Gurgaon City Centre
9. PE Noida City Centre
10. PE Jaipur Pink Square
11. PE Ahmedabad CG Road
12. PE Lucknow Hazratganj
13. PE Indore Treasure Island
14. PE Bhopal DB City
15. PE Chandigarh Elante
16. PE Kochi Lulu Mall
17. PE Coimbatore Brookefields
18. PE Mysore Forum
19. PE Visakhapatnam CMR Central
20. PE Vijayawada PVP Square
21. PE Nagpur Empress City
22. PE Surat VR Mall
23. PE Vadodara Inorbit
24. PE Rajkot RWorld
25. PE Ludhiana MBD Mall
26. PE Jalandhar Curo High Street
27. PE Amritsar Alpha One
28. PE Dehradun Pacific
29. PE Kanpur Z Square
30. PE Agra TDI Mall

## Chart Types & Visualizations

### Overview Charts
- **Bar Chart**: Sales performance by store
- **Scatter Plot**: Conversion rate vs footfall correlation
- **Doughnut Chart**: CSAT score distribution
- **Radar Chart**: Store audit scores comparison

### Store-Specific Charts
- **Horizontal Bar**: Performance vs targets
- **Line Chart**: Monthly trends
- **Gauge Charts**: Individual metric scores

### Comparison Charts
- **Radar Chart**: Multi-dimensional store comparison
- **Stacked Bar**: Category-wise performance

## Performance Scoring

### Overall Score Calculation
The overall performance score is calculated as:
```
Overall Score = Average of all normalized metric scores
```

### Normalization Rules
- **Higher is Better**: Sales, conversion rate, CSAT, compliance scores
- **Lower is Better**: Downtime, grievance resolution time
- **Target-Based**: Each metric has industry-standard targets

### Score Classifications
- **🟢 Good**: 80-100%
- **🟡 Average**: 60-79%
- **🔴 Poor**: Below 60%

## Customization

### Themes
The dashboard uses CSS custom properties for easy theme customization:

```css
:root {
    --primary-bg: #0f1419;
    --secondary-bg: #1a1f2e;
    --accent-color: #ff6b35;
    --text-primary: #ffffff;
    /* Modify these values for different themes */
}
```

### Adding New Metrics
1. Update the `metrics` object in `dashboard.js`
2. Add corresponding columns to the Excel template
3. Update the UI components as needed

### Store Configuration
Modify the `storeNames` array in `dashboard.js` to add/remove stores.

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 80+

### Requirements
- JavaScript enabled
- Modern browser with ES6 support
- Minimum screen resolution: 1024x768

## Troubleshooting

### Common Issues

#### Excel Upload Fails
- **Check file format**: Must be .xlsx or .xls
- **Verify column headers**: Must match template exactly
- **Check data types**: Ensure numbers are formatted correctly

#### Charts Not Displaying
- **Check browser console**: Look for JavaScript errors
- **Verify CDN access**: Ensure Chart.js library loads
- **Try refreshing**: Reload the page

#### Performance Issues
- **Large datasets**: Dashboard optimized for 30 stores
- **Browser memory**: Close other tabs if running slowly
- **Chart animations**: Can be disabled in chart options

### Data Validation Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid store count" | Wrong number of rows | Ensure exactly 30 stores |
| "Missing required columns" | Column headers don't match | Use exact template headers |
| "Invalid number format" | Text in numeric columns | Check data types |
| "Value out of range" | Metrics exceed expected ranges | Review validation rules |

## Performance Optimization

### Best Practices
- **Data Size**: Keep Excel files under 2MB
- **Browser Cache**: Clear cache if experiencing issues
- **Regular Updates**: Upload fresh data weekly/monthly
- **Export Reports**: Download reports for offline analysis

## Security & Privacy

### Data Handling
- **Local Processing**: All data processed in browser
- **No Server Storage**: Data not transmitted to external servers
- **Client-Side Only**: Dashboard runs entirely on client-side

### Recommendations
- **Sensitive Data**: Remove any confidential information before upload
- **Access Control**: Implement proper access controls in production
- **Data Backup**: Maintain backups of your Excel data files

## Support & Maintenance

### Regular Updates
- **Sample Data**: Regenerated with realistic variations
- **Performance Targets**: Adjust based on business requirements
- **Visual Improvements**: UI/UX enhancements

### Extending Functionality
The dashboard is built with modularity in mind:
- Add new chart types in `initializeCharts()`
- Extend metrics in the `metrics` configuration
- Customize styling in `styles.css`
- Add new sections by modifying the HTML structure

## Technical Architecture

### Frontend Stack
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with variables
- **Vanilla JavaScript**: ES6+ features
- **Chart.js**: Data visualization
- **SheetJS**: Excel file processing

### Key Libraries
```html
<!-- Chart.js for visualizations -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<!-- SheetJS for Excel processing -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- Font Awesome for icons -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
```

## Contributing

### Development Setup
1. Clone/download the project files
2. Open in your preferred code editor
3. Use a local web server for development (optional)
4. Make changes and test in browser

### Code Style
- **Consistent indentation**: 4 spaces
- **Meaningful names**: Descriptive variable and function names
- **Comments**: Document complex logic
- **Modular structure**: Separate concerns appropriately

---

**© 2024 Peter England Retail Dashboard - Built for comprehensive store performance tracking**
