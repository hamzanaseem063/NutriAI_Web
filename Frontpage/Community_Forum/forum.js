// --- 1. INITIAL DATA (5 Professional Discussions) ---
const initialData = [
    { id: 1, title: "Is AI tracking accurate for leafy greens?", category: "AI Help", author: "Sarah_Health", date: "2h ago", votes: 12, message: "Tested kale today. AI volume detection seems 95% accurate. Anyone tried microgreens?", replies: [{author: "Admin", text: "Microgreens are in our next update!", date: "1h ago"}] },
    { id: 2, title: "My 30-Day Anti-Inflammatory Result", category: "Success Story", author: "Mark_V", date: "5h ago", votes: 85, message: "Followed the AI meal plan for a month. Joint pain is gone!", replies: [] },
    { id: 3, title: "Best high-protein vegan snack?", category: "Recipe Swap", author: "Elena99", date: "1d ago", votes: 24, message: "Looking for something portable. The AI suggests roasted chickpeas.", replies: [{author: "Chris", text: "Try adding some nutritional yeast!", date: "10h ago"}] },
    { id: 4, title: "Feature Request: Barcode Scanner", category: "AI Help", author: "TechGuy", date: "2d ago", votes: 40, message: "Can we get barcode scanning for packaged organic snacks?", replies: [] },
    { id: 5, title: "Welcome to NutriAi Professional Hub", category: "General", author: "System", date: "1w ago", votes: 150, message: "Keep discussions health-focused and professional.", replies: [] }
];

let activeThreadId = null;

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('forumPosts')) {
        localStorage.setItem('forumPosts', JSON.stringify(initialData));
    }
    initForum();
});

function initForum() {
    updateAuthUI();
    renderPosts();

    // Event: Start Discussion (Gatekeeper)
    document.getElementById('newTopicBtn').onclick = () => {
        checkAuth(() => document.getElementById('topicModal').style.display = 'block');
    };

    // Event: Post Reply (Gatekeeper)
    document.getElementById('postReplyBtn').onclick = () => {
        checkAuth(submitReply);
    };

    // UI Navigation
    document.getElementById('closeModal').onclick = () => document.getElementById('topicModal').style.display = 'none';
    document.getElementById('backBtn').onclick = showFeed;
    document.getElementById('showAllBtn').onclick = showFeed;
}

// --- 2. THE GATEKEEPER ---
function checkAuth(callback) {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        callback();
    } else {
        alert("Please login to join the NutriAi community!");
        // Go out of Forum Code, then out of Community Forum page
        // and you are right there in FYP WEB where signUp.html is!
        window.location.href = "../../signUp.html"; 
    }
}
// --- 3. RENDERING LOGIC ---
function renderPosts() {
    const posts = JSON.parse(localStorage.getItem('forumPosts'));
    const list = document.getElementById('postsList');
    list.innerHTML = '';

    posts.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-card';
        div.onclick = () => openThread(post.id);
        div.innerHTML = `
            <div class="vote-box">
                <button onclick="handleVote(event, ${post.id})">▲</button>
                <span>${post.votes}</span>
            </div>
            <div class="post-info">
                <span class="category-tag">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.message.substring(0, 100)}...</p>
                <div class="post-meta">By ${post.author} • ${post.date} • ${post.replies.length} replies</div>
            </div>
        `;
        list.appendChild(div);
    });
}

function openThread(id) {
    const posts = JSON.parse(localStorage.getItem('forumPosts'));
    const post = posts.find(p => p.id === id);
    activeThreadId = id;

    document.getElementById('feedContainer').style.display = 'none';
    document.getElementById('threadContainer').style.display = 'block';

    document.getElementById('threadContent').innerHTML = `
        <span class="category-tag">${post.category}</span>
        <h2>${post.title}</h2>
        <p>${post.message}</p>
        <div class="post-meta">Posted by ${post.author} • ${post.date}</div>
    `;

    renderReplies(post.replies);
}

function renderReplies(replies) {
    const list = document.getElementById('repliesList');
    list.innerHTML = replies.length ? '' : '<p>No replies yet.</p>';
    replies.forEach(r => {
        list.innerHTML += `<div class="reply"><b>${r.author}</b>: ${r.text}</div>`;
    });
}

function submitReply() {
    const text = document.getElementById('replyMessage').value;
    if (!text) return;

    let posts = JSON.parse(localStorage.getItem('forumPosts'));
    const idx = posts.findIndex(p => p.id === activeThreadId);
    
    posts[idx].replies.push({
        author: sessionStorage.getItem('userName') || "Member",
        text: text,
        date: "Just now"
    });

    localStorage.setItem('forumPosts', JSON.stringify(posts));
    document.getElementById('replyMessage').value = '';
    renderReplies(posts[idx].replies);
}

function handleVote(e, id) {
    e.stopPropagation();
    checkAuth(() => {
        let posts = JSON.parse(localStorage.getItem('forumPosts'));
        const idx = posts.findIndex(p => p.id === id);
        posts[idx].votes++;
        localStorage.setItem('forumPosts', JSON.stringify(posts));
        renderPosts();
    });
}

function showFeed() {
    document.getElementById('feedContainer').style.display = 'block';
    document.getElementById('threadContainer').style.display = 'none';
    renderPosts();
}

function updateAuthUI() {
    const section = document.getElementById('authSection');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        section.innerHTML = `<span class="u-name">Welcome, ${sessionStorage.getItem('userName')}</span> <button onclick="logout()" class="logout-btn">Logout</button>`;
    } else {
        section.innerHTML = `<a href="login.html" class="login-link">Login to Post</a>`;
    }
}

function logout() { sessionStorage.clear(); window.location.reload(); }

// New Thread Submission
document.getElementById('newTopicForm').onsubmit = (e) => {
    e.preventDefault();
    let posts = JSON.parse(localStorage.getItem('forumPosts'));
    const newP = {
        id: Date.now(),
        title: document.getElementById('tTitle').value,
        category: document.getElementById('tCategory').value,
        message: document.getElementById('tMessage').value,
        author: sessionStorage.getItem('userName'),
        date: "Just now",
        votes: 0,
        replies: []
    };
    posts.unshift(newP);
    localStorage.setItem('forumPosts', JSON.stringify(posts));
    document.getElementById('topicModal').style.display = 'none';
    renderPosts();
};