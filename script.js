// ==========================
// DARK MODE (partilhado entre páginas)
// ==========================

const themeBtn = document.getElementById("themeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("darkMode");
    if (themeBtn) themeBtn.textContent = "☀️";
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("darkMode");

        if (document.body.classList.contains("darkMode")) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙";
        }
    });
}


// ==========================
// PREÇOS 
// ==========================

const mensalBtn = document.getElementById("mensalBtn");
const anualBtn  = document.getElementById("anualBtn");

if (mensalBtn && anualBtn) {

    const precoBasico   = document.getElementById("precoBasico");
    const precoPopular  = document.getElementById("precoPopular");
    const precoEmpresa  = document.getElementById("precoEmpresa");

    mensalBtn.addEventListener("click", function () {
        precoBasico.innerHTML  = "<h2>50 MT a 300 MT</h2><span>/month</span>";
        precoPopular.innerHTML = "<h2>308 MT a 1.200 MT</h2><span>/month</span>";
        precoEmpresa.innerHTML = "<h2>100 MT a 3.500 MT</h2><span>/month</span>";

        mensalBtn.classList.add("active");
        anualBtn.classList.remove("active");
    });

    anualBtn.addEventListener("click", function () {
        precoBasico.innerHTML  = "<h2>500 MT a 2.500 MT</h2><span>/month</span>";
        precoPopular.innerHTML = "<h2>3.000 MT a 10.000 MT</h2><span>/month</span>";
        precoEmpresa.innerHTML = "<h2>12.000 MT a 35.000 MT</h2><span>/month</span>";

        anualBtn.classList.add("active");
        mensalBtn.classList.remove("active");
    });
}


// ==========================
// SIGN UP
// ==========================

const signupBtn   = document.getElementById("signupBtn");

if (signupBtn) {

    const nameInput     = document.getElementById("name");
    const emailInput    = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const msg           = document.getElementById("msg");

    signupBtn.addEventListener("click", () => {

        const name     = nameInput.value.trim();
        const email    = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validar campos vazios
        if (!name || !email || !password) {
            msg.textContent  = "Preenche todos os campos!";
            msg.style.color  = "red";
            return;
        }

        // Validar formato de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            msg.textContent = "Email inválido!";
            msg.style.color = "orange";
            return;
        }

        // Validar senha
        if (password.length < 6) {
            msg.textContent = "Senha fraca (mínimo 6 caracteres)";
            msg.style.color = "orange";
            return;
        }

        // Verificar se email já existe
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = users.find(u => u.email === email);

        if (userExists) {
            msg.textContent = "Este email já está registado!";
            msg.style.color = "red";
            return;
        }

        // Guardar novo utilizador
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        // Sucesso
        msg.textContent = "Conta criada com sucesso! A redirigir...";
        msg.style.color = "green";

        nameInput.value     = "";
        emailInput.value    = "";
        passwordInput.value = "";

        // Voltar para a página principal após 1.5 segundos
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    });
}




/* Área de Email na pagina principal */

const input = document.querySelector('.caixaEmail1 input');
const botao = document.querySelector('.botaoStart');
const msg = document.getElementById('msg');

// Se já existe email guardado, preenche o input automaticamente
if (localStorage.getItem('emailUtilizador')) {
    input.value = localStorage.getItem('emailUtilizador');
}

botao.addEventListener('click', function () {

    const email = input.value.trim();

    // Validação
    if (email === '') {
        msg.textContent = 'Por favor, insere o teu email.';
        msg.style.color = 'red';
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        msg.textContent = 'Email inválido. Verifica e tenta novamente.';
        msg.style.color = 'red';
        return;
    }

    // Guarda no localStorage
    localStorage.setItem('emailUtilizador', email);

    // Feedback ao utilizador
    msg.textContent = 'Obrigado! Vamos entrar em contacto em breve!';
    msg.style.color = 'white';

    input.value = '';
});