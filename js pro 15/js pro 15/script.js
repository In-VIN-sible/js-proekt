async function loadUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        const app = document.getElementById("app");

        users.forEach(user => {
          const div = document.createElement("div");
          div.className = "user";
          div.innerHTML = `
            <h3>${user.name}</h3>
            <p><b>Email:</b> ${user.email}</p>
            <p><b>Місто:</b> ${user.address.city}</p>
          `;
          app.appendChild(div);
        });
      } catch (error) {
        console.error("Помилка при завантаженні користувачів:", error);
      }
    }

    loadUsers();