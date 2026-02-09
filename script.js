let applications = JSON.parse(localStorage.getItem("applications")) || [];

const form = document.getElementById("applicationForm");
const tableBody = document.getElementById("applicationTable");

const totalEl = document.getElementById("total");
const interviewEl = document.getElementById("interviews");
const offerEl = document.getElementById("offers");
const rejectionEl = document.getElementById("rejections");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const application = {
        id: Date.now(),
        company: company.value,
        role: role.value,
        stage: stage.value,
        result: result.value,
        date: date.value
    };

    applications.push(application);
    saveAndRender();
    form.reset();
});

function deleteApplication(id) {
    applications = applications.filter(app => app.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("applications", JSON.stringify(applications));
    renderApplications();
    updateSummary();
}

function renderApplications() {
    tableBody.innerHTML = "";

    applications.forEach(app => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.role}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td>
                <button class="delete-btn" onclick="deleteApplication(${app.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function updateSummary() {
    totalEl.textContent = applications.length;
    interviewEl.textContent = applications.filter(app => app.stage === "Interview").length;
    offerEl.textContent = applications.filter(app => app.stage === "Offer").length;
    rejectionEl.textContent = applications.filter(app => app.stage === "Rejected").length;
}

renderApplications();
updateSummary();
