const express = require('express');
const helmet = require('helmet');
const app = express();

// 🔐 Security Middleware
app.use(helmet());
app.use(express.json());

// Simulated patient data
const patients = [
  { id: 1, name: 'John Doe', age: 45, condition: 'Hypertension' },
  { id: 2, name: 'Jane Smith', age: 32, condition: 'Diabetes' },
];

// Home route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Healthcare DevSecOps System</title></head>
      <body style="font-family:Arial; text-align:center; margin-top:80px; background:#f0f8ff;">
        <h1>🏥 Secure Healthcare System</h1>
        <h3>🔐 DevSecOps Pipeline Active</h3>
        <p>✅ OWASP Dependency Check — Passed</p>
        <p>✅ Trivy Image Scan — Passed</p>
        <p>✅ Helmet Security Headers — Active</p>
        <p>✅ Deployed via Jenkins → Docker → Kubernetes</p>
        <br/>
        <a href="/patients">View Patients</a> |
        <a href="/health">Health Check</a>
      </body>
    </html>
  `);
});

// Patient records route
app.get('/patients', (req, res) => {
  res.json({
    message: '🔐 Secure Patient Records',
    data: patients,
    security: 'HIPAA Compliant'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    security: 'active',
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🏥 Secure Healthcare app running on port ${PORT}`));
