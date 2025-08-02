document.addEventListener('DOMContentLoaded', function() {
    const newPatientBtn = document.getElementById('newPatientBtn');
    const randomPatientBtn = document.getElementById('randomPatientBtn');
    const completeAssessmentBtn = document.getElementById('completeAssessmentBtn');

    const requiredSteps = ['sceneSafety', 'airway', 'breathing', 'circulation', 'transportDecision', 'vitalSigns', 'reassessment'];
    const stepNames = {
        sceneSafety: 'Scene safety / PPE',
        airway: 'Assess airway',
        breathing: 'Assess breathing',
        circulation: 'Assess circulation',
        transportDecision: 'Transport decision',
        vitalSigns: 'Obtain vital signs',
        reassessment: 'Reassessment'
    };

    newPatientBtn.addEventListener('click', function() {
        const stability = document.getElementById('stability').value;
        const chiefComplaint = document.getElementById('chiefComplaint').value;
        generatePatient(stability, chiefComplaint);
    });

    randomPatientBtn.addEventListener('click', function() {
        const stabilityOptions = ['stable', 'unstable'];
        const chiefComplaintOptions = ['sob_asthma', 'chest_pain', 'allergic_reaction', 'hypoglycemia', 'opioid_od', 'trauma'];
        const randomStability = stabilityOptions[Math.floor(Math.random() * stabilityOptions.length)];
        const randomChiefComplaint = chiefComplaintOptions[Math.floor(Math.random() * chiefComplaintOptions.length)];
        generatePatient(randomStability, randomChiefComplaint);
    });

    completeAssessmentBtn.addEventListener('click', function() {
        const checked = Array.from(document.querySelectorAll('#assessmentForm input[type="checkbox"]:checked')).map(cb => cb.value);
        const missing = requiredSteps.filter(step => !checked.includes(step));
        const resultDiv = document.getElementById('assessmentResult');
        if (missing.length > 0) {
            const missingNames = missing.map(step => stepNames[step]).join(', ');
            resultDiv.textContent = `Assessment failed: missing ${missingNames}.`;
            resultDiv.style.color = 'red';
        } else {
            resultDiv.textContent = 'Assessment completed successfully!';
            resultDiv.style.color = 'green';
        }
    });
});

function generatePatient(stability, chiefComplaint) {
    let patientData = {};
    resetAssessment();

    switch(chiefComplaint) {
        case 'sob_asthma':
            patientData = generateSobAsthma(stability);
            break;
        case 'chest_pain':
            patientData = generateChestPain(stability);
            break;
        case 'allergic_reaction':
            patientData = generateAllergicReaction(stability);
            break;
        case 'hypoglycemia':
            patientData = generateHypoglycemia(stability);
            break;
        case 'opioid_od':
            patientData = generateOpioidOd(stability);
            break;
        case 'trauma':
            patientData = generateTrauma(stability);
            break;
        default:
            patientData = {};
    }

    displayPatientData(patientData);
}

function displayPatientData(patientData) {
    const patientInfoDiv = document.getElementById('patientInfo');
    patientInfoDiv.innerHTML = '';

    for (const [key, value] of Object.entries(patientData)) {
        const p = document.createElement('p');
        p.textContent = `${key}: ${value}`;
        patientInfoDiv.appendChild(p);
    }
}

function resetAssessment() {
    const checkboxes = document.querySelectorAll('#assessmentForm input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    const resultDiv = document.getElementById('assessmentResult');
    if (resultDiv) {
        resultDiv.textContent = '';
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomInRange(min, max) {
    return (Math.random() * (max - min) + min).toFixed(1);
}

function generateSobAsthma(stability) {
    let patientData = {
        'Chief Complaint': 'Shortness of Breath / Asthma',
        'Stability': stability.charAt(0).toUpperCase() + stability.slice(1)
    };

    if (stability === 'stable') {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(80, 110) + ' bpm';
        patientData.BP = `${randomInt(110, 130)}/${randomInt(70, 85)} mmHg`;
        patientData.RR = randomInt(20, 30) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(90, 95) + '%';
    } else {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(110, 130) + ' bpm';
        patientData.BP = `${randomInt(100, 120)}/${randomInt(60, 80)} mmHg`;
        patientData.RR = randomInt(30, 40) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(85, 90) + '%';
    }

    return patientData;
}

function generateChestPain(stability) {
    let patientData = {
        'Chief Complaint': 'Chest Pain',
        'Stability': stability.charAt(0).toUpperCase() + stability.slice(1)
    };

    if (stability === 'stable') {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(70, 100) + ' bpm';
        patientData.BP = `${randomInt(120, 140)}/${randomInt(80, 90)} mmHg`;
        patientData.RR = randomInt(12, 20) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(95, 100) + '%';
    } else {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(100, 140) + ' bpm';
        patientData.BP = `${randomInt(90, 110)}/${randomInt(60, 70)} mmHg`;
        patientData.RR = randomInt(20, 30) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(90, 95) + '%';
    }

    return patientData;
}

function generateAllergicReaction(stability) {
    let patientData = {
        'Chief Complaint': 'Allergic Reaction',
        'Stability': stability.charAt(0).toUpperCase() + stability.slice(1)
    };

    if (stability === 'stable') {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(80, 110) + ' bpm';
        patientData.BP = `${randomInt(110, 130)}/${randomInt(70, 85)} mmHg`;
        patientData.RR = randomInt(12, 20) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(95, 100) + '%';
    } else {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(110, 130) + ' bpm';
        patientData.BP = `${randomInt(80, 100)}/${randomInt(50, 70)} mmHg`;
        patientData.RR = randomInt(20, 30) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(85, 95) + '%';
    }

    return patientData;
}

function generateHypoglycemia(stability) {
    let patientData = {
        'Chief Complaint': 'Hypoglycemia',
        'Stability': stability.charAt(0).toUpperCase() + stability.slice(1)
    };

    if (stability === 'stable') {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(70, 100) + ' bpm';
        patientData.BP = `${randomInt(110, 130)}/${randomInt(70, 85)} mmHg`;
        patientData.RR = randomInt(12, 20) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(95, 100) + '%';
        patientData['Blood Glucose'] = randomInt(60, 70) + ' mg/dL';
    } else {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(100, 130) + ' bpm';
        patientData.BP = `${randomInt(90, 110)}/${randomInt(60, 70)} mmHg`;
        patientData.RR = randomInt(12, 20) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(95, 100) + '%';
        patientData['Blood Glucose'] = randomInt(40, 60) + ' mg/dL';
    }

    return patientData;
}

function generateOpioidOd(stability) {
    let patientData = {
        'Chief Complaint': 'Opioid Overdose',
        'Stability': stability.charAt(0).toUpperCase() + stability.slice(1)
    };

    if (stability === 'stable') {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(60, 80) + ' bpm';
        patientData.BP = `${randomInt(110, 130)}/${randomInt(70, 85)} mmHg`;
        patientData.RR = randomInt(12, 16) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(95, 100) + '%';
        patientData['Pupil Size'] = 'Constricted';
    } else {
        patientData.Temp = randomInRange(96, 98) + ' °F';
        patientData.HR = randomInt(40, 60) + ' bpm';
        patientData.BP = `${randomInt(80, 100)}/${randomInt(50, 70)} mmHg`;
        patientData.RR = randomInt(6, 10) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(80, 90) + '%';
        patientData['Pupil Size'] = 'Constricted (Miosis)';
    }

    return patientData;
}

function generateTrauma(stability) {
    let patientData = {
        'Chief Complaint': 'Trauma',
        'Stability': stability.charAt(0).toUpperCase() + stability.slice(1)
    };

    if (stability === 'stable') {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(80, 100) + ' bpm';
        patientData.BP = `${randomInt(110, 130)}/${randomInt(70, 85)} mmHg`;
        patientData.RR = randomInt(12, 20) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(95, 100) + '%';
        patientData['Pain Level'] = randomInt(5, 7) + '/10';
    } else {
        patientData.Temp = randomInRange(97, 99) + ' °F';
        patientData.HR = randomInt(100, 140) + ' bpm';
        patientData.BP = `${randomInt(80, 100)}/${randomInt(50, 70)} mmHg`;
        patientData.RR = randomInt(20, 30) + ' breaths/min';
        patientData['O2 Sat'] = randomInt(85, 95) + '%';
        patientData['Pain Level'] = randomInt(8, 10) + '/10';
    }

    return patientData;
}
