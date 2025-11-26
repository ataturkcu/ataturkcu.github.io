// script.js
const pinnedRepos = ['solarbrowser/quanta', 'solarbrowser/vexel', 'solarbrowser/solar'];
const allReposToFetch = ['solarbrowser/quanta', 'solarbrowser/vexel', 'solarbrowser/solar', 'ataturkcu/neo', 'ataturkcu/GLASS'];

let selectedIndex = 0;
const menuItems = document.querySelectorAll('.menu-item');
let currentCommand = '';
let isSnake = false;

document.getElementById('terminal-input').addEventListener('input', function(e) {
    currentCommand = e.target.value;
    updatePrompt(document.getElementById('terminal-output'), currentCommand);
});

document.getElementById('terminal-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = currentCommand.trim().toLowerCase();
        const output = document.getElementById('terminal-output');
        const response = handleCommand(command, output);
        if (response === 'snake') {
            isSnake = true;
            startSnake(output);
        } else {
            output.innerHTML += 'guest@ataturkcu.me> ' + currentCommand + '<br>' + response + '<br>guest@ataturkcu.me> <span class="blink">_</span>';
        }
        currentCommand = '';
        e.target.value = '';
        updatePrompt(output, currentCommand);
        output.scrollTop = output.scrollHeight;
    }
});

function updateSelection() {
    menuItems.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedIndex);
    });
}

function selectItem() {
    const id = menuItems[selectedIndex].dataset.id;
    openWindow(id);
}

document.addEventListener('keydown', (e) => {
    if (document.getElementById('terminal-window').style.display === 'block') return;
    if (e.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % menuItems.length;
        updateSelection();
    } else if (e.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + menuItems.length) % menuItems.length;
        updateSelection();
    } else if (e.key === 'Enter') {
        selectItem();
    }
});

menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        selectedIndex = index;
        updateSelection();
        selectItem();
    });
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            selectedIndex = index;
            updateSelection();
            selectItem();
        }
    });
});

function toggleTheme() {
    document.body.classList.toggle('light-theme');
}

function openWindow(id) {
    document.getElementById(id + '-window').style.display = 'block';
    bringToFront(id + '-window');
    if (id === 'terminal') {
        const output = document.getElementById('terminal-output');
        output.innerHTML = 'guest@ataturkcu.me> <span class="blink">_</span>';
        currentCommand = '';
        isSnake = false;
        document.getElementById('terminal-input').focus();
    }
}

function closeWindow(id) {
    document.getElementById(id + '-window').style.display = 'none';
    removeFromTaskbar(id);
}

function minimizeWindow(id) {
    document.getElementById(id + '-window').style.display = 'none';
    addToTaskbar(id);
}

function restoreWindow(id) {
    document.getElementById(id + '-window').style.display = 'block';
    bringToFront(id + '-window');
    removeFromTaskbar(id);
}

function addToTaskbar(id) {
    const taskbar = document.getElementById('taskbar-items');
    const item = document.createElement('div');
    item.className = 'taskbar-item';
    item.innerHTML = `${id.charAt(0).toUpperCase() + id.slice(1)} <button class="close-btn" onclick="closeWindow('${id}')"></button>`;
    item.onclick = () => restoreWindow(id);
    taskbar.appendChild(item);
    document.getElementById('taskbar').style.display = 'flex';
}

function maximizeWindow(id) {
    const w = document.getElementById(id + '-window');
    w.style.width = '800px';
    w.style.height = '600px';
    bringToFront(id + '-window');
}

function removeFromTaskbar(id) {
    const items = document.querySelectorAll('.taskbar-item');
    items.forEach(item => {
        if (item.textContent.includes(id.charAt(0).toUpperCase() + id.slice(1))) {
            item.remove();
        }
    });
    if (document.querySelectorAll('.taskbar-item').length === 0) {
        document.getElementById('taskbar').style.display = 'none';
    }
}

function bringToFront(id) {
    const windows = document.querySelectorAll('.window');
    let maxZ = 10;
    windows.forEach(w => {
        const z = parseInt(w.style.zIndex) || 10;
        if (z > maxZ) maxZ = z;
    });
    document.getElementById(id).style.zIndex = maxZ + 1;
}

// Add click to bring to front
document.querySelectorAll('.window').forEach(w => {
    w.addEventListener('mousedown', () => {
        bringToFront(w.id);
    });
});

let dragElement = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(e, id) {
    dragElement = document.getElementById(id);
    offsetX = e.clientX - dragElement.offsetLeft;
    offsetY = e.clientY - dragElement.offsetTop;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
}

function drag(e) {
    if (dragElement) {
        dragElement.style.left = (e.clientX - offsetX) + 'px';
        dragElement.style.top = (e.clientY - offsetY) + 'px';
    }
}

function stopDrag() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    dragElement = null;
}

async function fetchCertificates() {
    try {
        // Since fetch from local file is blocked by CORS, using hardcoded data
        const certificates = [
            {
                "name": "AI for Google Analytics",
                "link": "https://www.linkedin.com/learning/certificates/2b43515e0e11ee6a49d9d781ca9cd56b35f873ea82835c77fe2de92055ffcbbf?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "AI for Marketing",
                "link": "https://www.linkedin.com/learning/certificates/b5acc8e2ed29b9360152602e007fa6b4e408f5dace43d469739d4f8e96aaf046?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "AI in Financial Forecasting",
                "link": "https://www.linkedin.com/learning/certificates/1252ee4466c5ee6d4f529a795dfcd99696755d85f9ae5cc91b25cc9a254b996e?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Artificial Intelligence Foundations: Machine Learning",
                "link": "https://www.linkedin.com/learning/certificates/16dda279ede865146c0b71575269c2ace1b06b37d0259908a238feb5d4c7523e?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Career Essentials in Generative AI by Microsoft and LinkedIn",
                "link": "https://www.linkedin.com/learning/certificates/2198a38b989f0c1879750dc656c8ec58b6c084714efa36ea7940bf38a9d426cd?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Data Science Foundations: Fundamentals (2019)",
                "link": "https://www.linkedin.com/learning/certificates/5eea748ae5f4320d706ef4080cdbffb323e66a621f8986aa76ef915503953200?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Digital Transformation",
                "link": "https://www.linkedin.com/learning/certificates/236defa44a06febb7f3d1e73293dfaac767afe813aef80e4a03e50cd3e0e1d64?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Ethics in the Age of Generative AI",
                "link": "https://www.linkedin.com/learning/certificates/44295a7e74338545d2022017158fa6f299a68427be21d96f81cf657c7e36106e?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Generative AI: The Evolution of Thoughtful Online Search",
                "link": "https://www.linkedin.com/learning/certificates/b91625adf099ecc4cb16a7de775876ed2506fd6723fcf893b5206f724ee1dc0c?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Streamlining Your Work with Microsoft Copilot",
                "link": "https://www.linkedin.com/learning/certificates/92b3289e7df975ce1da0cb52c403b0eaf0b47ff1d6115df868b08d46406d49e8?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Learning Microsoft 365 Copilot for Work (2024)",
                "link": "https://www.linkedin.com/learning/certificates/46df8cb433e14633d2b3fcb42f26c20a82ff1c0dc2e4179a17286751e96b2a39?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "What Is Generative AI?",
                "link": "https://www.linkedin.com/learning/certificates/96097558f008a14f778c19af2391e19b42131204c8d7c6666d3fe5ba080923d4?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            },
            {
                "name": "Elements of AI by University of Helsinki",
                "link": "https://certificates.mooc.fi/validate/5cxx5ki4gg"
            },
            {
                "name": "Mentoring Others",
                "link": "https://www.linkedin.com/learning/certificates/ae1b7cc1174525fa410d0f732587c612d2e37dd5978a99513341e3f1aa9fcfcd?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlbhBOz0mSG2vjYDYltefRg%3D%3D"
            }
        ];
        const certificatesDiv = document.getElementById('certificates');
        let html = '';
        html += certificates.map(cert => `
            <div class="repo-card" onclick="window.open('${cert.link}', '_blank')">
                <h3>${cert.name}</h3>
            </div>
        `).join('');
        certificatesDiv.innerHTML = html;
    } catch (error) {
        console.error('Error fetching certificates:', error);
        document.getElementById('certificates').innerHTML = 'Unable to load certificates.';
    }
}

async function fetchProjects() {
    try {
        // Hardcoded projects data
        const projects = [
            {
                name: 'Solar',
                link: 'https://browser.solar',
                description: 'A next-generation web browser featuring a custom engine, modular design, and strong privacy focus.',
                icon: 'img/solar.jpg'
            },
            {
                name: 'Quanta',
                link: 'https://github.com/solarbrowser/quanta',
                description: 'Optimized, modern JavaScript engine originally made for Solar Project',
                icon: 'img/quanta.png'
            },
            {
                name: 'Vexel',
                link: 'https://github.com/solarbrowser/vexel',
                description: 'Rendering engine for Solar Project',
                icon: 'img/vexel.png'
            },
            {
                name: 'GLASS',
                link: 'https://github.com/ataturkcu/GLASS',
                description: 'Graphical Layout and Application Shell System originally thought for Windows, then seperated to 2 different versions. Windows & Linux. On the Windows, it is fully replacing the "explorer.exe" and on the Linux it is a desktop environment like KDE. The Linux version thought for the Solar Project\'s operating system Prisma, which is like ChromeOS.',
                icon: ''
            },
            {
                name: 'Neo',
                link: 'https://github.com/ataturkcu/neo',
                description: 'JavaScript Engine test harness designed to validate core engine correctness stability and long running behavior. Built for testing the Quanta',
                icon: 'img/neo.png'
            }
        ];
        const projectsDiv = document.getElementById('projects');
        let html = '';
        html += projects.map(project => `
            <div class="repo-card" onclick="window.open('${project.link}', '_blank')">
                ${project.icon ? `<img src="${project.icon}" alt="${project.name}" style="width: 48px; height: 48px; margin-bottom: 10px;">` : ''}
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        `).join('');
        projectsDiv.innerHTML = html;
    } catch (error) {
        console.error('Error fetching projects:', error);
        document.getElementById('projects').innerHTML = 'Unable to load projects.';
    }
}

async function fetchRepos() {
    try {
        const repoPromises = allReposToFetch.map(repo => fetch(`https://api.github.com/repos/${repo}`).then(res => res.json()));
        const repos = await Promise.all(repoPromises);

        const pinned = repos.filter(repo => pinnedRepos.includes(`${repo.owner.login}/${repo.name}`));
        const others = repos.filter(repo => !pinnedRepos.includes(`${repo.owner.login}/${repo.name}`));

        const reposDiv = document.getElementById('repos');

        let html = '';
        if (pinned.length > 0) {
            html += '<h4>Pinned Repositories</h4>';
            html += pinned.map(repo => `
                <div class="repo-card" onclick="window.open('${repo.html_url}', '_blank')">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <p>Language: ${repo.language || 'N/A'}</p>
                    <p>Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}</p>
                    <p>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                </div>
            `).join('');
        }
        if (others.length > 0) {
            html += '<h4>Other Repositories</h4>';
            html += others.map(repo => `
                <div class="repo-card" onclick="window.open('${repo.html_url}', '_blank')">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description'}</p>
                    <p>Language: ${repo.language || 'N/A'}</p>
                    <p>Stars: ${repo.stargazers_count} | Forks: ${repo.forks_count}</p>
                    <p>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
                </div>
            `).join('');
        }

        reposDiv.innerHTML = html;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        document.getElementById('repos').innerHTML = 'Unable to load repositories at this time. Please check back later.';
    }
}

window.onload = function() {
    fetchRepos();
    fetchCertificates();
    fetchProjects();
    updateSelection();
    setupTerminal();
    // Add click to bring to front
    document.querySelectorAll('.window').forEach(w => {
        w.addEventListener('mousedown', () => {
            bringToFront(w.id);
        });
    });
};

function setupTerminal() {
    const output = document.getElementById('terminal-output');

    document.addEventListener('keydown', (e) => {
        if (isSnake) {
            if (window.handleSnakeInput) window.handleSnakeInput(e);
            return;
        }
        if (e.key === 'Enter') {
            const command = currentCommand.trim().toLowerCase();
            const response = handleCommand(command, output);
            if (response === 'snake') {
                isSnake = true;
                startSnake(output);
            } else {
                output.innerHTML += 'guest@ataturkcu.me> ' + currentCommand + '<br>' + response + '<br>guest@ataturkcu.me> <span class="blink">_</span>';
            }
            currentCommand = '';
        } else if (e.key === 'Backspace') {
            currentCommand = currentCommand.slice(0, -1);
            updatePrompt(output, currentCommand);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
            currentCommand += e.key;
            updatePrompt(output, currentCommand);
        }
        output.scrollTop = output.scrollHeight;
    });
}

function updatePrompt(output, command) {
    const lines = output.innerHTML.split('<br>');
    lines[lines.length - 1] = 'guest@ataturkcu.me> ' + command + '_';
    output.innerHTML = lines.join('<br>');
}

function handleCommand(command, output) {
    console.log('Command received:', command);
    const commands = {
        'help': 'Available commands: about, projects, contact, certificates, github, terminal, clear, snake',
        'about': () => { openWindow('about'); return 'Opening About window...'; },
        'skills': () => { openWindow('skills'); return 'Opening Skills window...'; },
        'projects': () => { openWindow('projects'); return 'Opening Projects window...'; },
        'contact': () => { openWindow('contact'); return 'Opening Contact window...'; },
        'certificates': () => { openWindow('certificates'); return 'Opening Certificates window...'; },
        'github': () => { openWindow('github'); return 'Opening GitHub window...'; },
        'terminal': () => { openWindow('terminal'); return 'Opening Terminal window...'; },
        'clear': () => { output.innerHTML = 'guest@ataturkcu.me> <span class="blink">_</span>'; return ''; },
        'easter': 'wow',
        'secret': 'Shh...',
        'snake': 'snake'
    };
    const response = commands[command] || `Command not found: ${command}`;
    if (typeof response === 'function') {
        return response();
    }
    return response;
}

function startSnake(output) {
    output.innerHTML = `
<div id="snake-menu">
    <h3>Snake Game</h3>
    <p>Press S to Start</p>
    <p>Arrow keys to move</p>
    <p>Q to Quit</p>
</div>
<div id="snake-game" style="display: none;"></div>
    `;
    let gameActive = false;
    let snake = [{x: 10, y: 10}];
    let direction = 'right';
    let food = {x: 15, y: 15};
    let score = 0;
    let gameInterval;

    function showMenu() {
        document.getElementById('snake-menu').style.display = 'block';
        document.getElementById('snake-game').style.display = 'none';
        if (gameInterval) clearInterval(gameInterval);
    }

    function startGame() {
        document.getElementById('snake-menu').style.display = 'none';
        document.getElementById('snake-game').style.display = 'block';
        gameActive = true;
        snake = [{x: 10, y: 10}];
        direction = 'right';
        food = {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)};
        score = 0;
        draw();
        gameInterval = setInterval(move, 200);
    }

    function draw() {
        const game = document.getElementById('snake-game');
        game.innerHTML = '';
        game.style.width = '300px';
        game.style.height = '300px';
        game.style.background = 'black';
        game.style.position = 'relative';
        game.style.margin = '20px auto';
        snake.forEach(segment => {
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = '10px';
            div.style.height = '10px';
            div.style.background = 'green';
            div.style.left = segment.x * 10 + 'px';
            div.style.top = segment.y * 10 + 'px';
            game.appendChild(div);
        });
        const foodDiv = document.createElement('div');
        foodDiv.style.position = 'absolute';
        foodDiv.style.width = '10px';
        foodDiv.style.height = '10px';
        foodDiv.style.background = 'red';
        foodDiv.style.left = food.x * 10 + 'px';
        foodDiv.style.top = food.y * 10 + 'px';
        game.appendChild(foodDiv);
    }

    function move() {
        if (!gameActive) return;
        const head = {x: snake[0].x, y: snake[0].y};
        if (direction === 'up') head.y--;
        if (direction === 'down') head.y++;
        if (direction === 'left') head.x--;
        if (direction === 'right') head.x++;
        if (head.x < 0 || head.x >= 30 || head.y < 0 || head.y >= 30 || snake.some(s => s.x === head.x && s.y === head.y)) {
            gameActive = false;
            clearInterval(gameInterval);
            output.innerHTML += '<br>Game Over! Score: ' + score + '<br>';
            showMenu();
            return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            food = {x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30)};
        } else {
            snake.pop();
        }
        draw();
    }

    showMenu();

    window.handleSnakeInput = function(e) {
        if (e.key === 's' || e.key === 'S') {
            startGame();
        } else if (e.key === 'q' || e.key === 'Q') {
            isSnake = false;
            currentCommand = '';
            output.innerHTML = 'guest@ataturkcu.me>';
        } else if (gameActive) {
            if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
            if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
            if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
            if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
        }
    };

    // Override the global handler for snake
    const originalHandler = window.handleSnakeInput;
    window.handleSnakeInput = window.handleSnakeInput;
}

document.getElementById('terminal-window').addEventListener('click', function() {
    document.getElementById('terminal-input').focus();
});
