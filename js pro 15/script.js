let dataLoaded = false;

const toggleBtn = document.getElementById('toggleBtn');
const card = document.getElementById('card');
const app = document.getElementById('app');
const search = document.getElementById('search');

toggleBtn.addEventListener('click', () => {
    const opened = card.classList.toggle('open');
    card.setAttribute('aria-hidden', String(!opened));
    toggleBtn.textContent = opened ? 'Hide Users' : 'Show Users';
    if (opened && !dataLoaded) loadUsers();
});

async function loadUsers() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();
        renderRows(users);
        dataLoaded = true;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function renderRows(users) {
    app.innerHTML = '';
    users.forEach((u, i) => {
        const tr = document.createElement('tr');
        const status = i % 2 === 0 ? 'Active' : 'Inactive';
        tr.innerHTML = `
      <td>${escapeHtml(u.name)}</td>
      <td>${escapeHtml(u.company?.name || '')}</td>
      <td>${escapeHtml(u.phone)}</td>
      <td>${escapeHtml(u.email)}</td>
      <td>${escapeHtml(u.address?.city || '')}</td>
      <td><span class="status ${status.toLowerCase()}">${status}</span></td>
    `;
        app.appendChild(tr);
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[m];
    });

}




