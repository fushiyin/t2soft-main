#!/usr/bin/env node

// Simple test script to verify Firebase functions are working
const axios = require('axios');

const API_BASE = 'http://localhost:5001/trading-76356/us-central1/api';

async function testAPI() {
    console.log('🔥 Testing Firebase Functions API...\n');
    
    const tests = [
        {
            name: 'Health Check',
            url: `${API_BASE}/courses`,
            method: 'GET'
        },
        {
            name: 'YouTube API',
            url: `${API_BASE}/youtube`,
            method: 'GET'
        }
    ];
    
    for (const test of tests) {
        try {
            console.log(`Testing ${test.name}...`);
            const response = await axios({
                method: test.method,
                url: test.url,
                timeout: 5000
            });
            console.log(`✅ ${test.name}: SUCCESS (${response.status})`);
            console.log(`   Response: ${JSON.stringify(response.data).substring(0, 100)}...\n`);
        } catch (error) {
            console.log(`❌ ${test.name}: FAILED`);
            if (error.code === 'ECONNREFUSED') {
                console.log('   Error: Connection refused - Make sure Firebase emulators are running');
            } else if (error.response) {
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Error: ${error.response.data?.error || error.response.statusText}`);
            } else {
                console.log(`   Error: ${error.message}`);
            }
            console.log('');
        }
    }
    
    console.log('🏁 API testing complete!');
    console.log('\nTo start the emulators, run: firebase emulators:start');
    console.log('To start the dev server, run: npm run dev');
}

testAPI().catch(console.error);
