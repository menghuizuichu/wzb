// 玩家信息存储 Key
const PLAYER_KEY = "treasure_hunt_player";

// 全局变量
const tasks = [
    { name: "探索神秘森林", duration: 2000 },
    { name: "穿越迷雾沼泽", duration: 3000 },
    { name: "发现神秘迷宫", duration: 3000 },
    { name: "躲过重重陷阱", duration: 3000 },
    { name: "破解古代密码", duration: 2500 },
    { name: "找到藏宝箱", duration: 4000 },
    { name: "迷宫自毁启动", duration: 3000 },
    { name: "侥幸逃出迷宫", duration: 3000 },
];
let playerData = { id: null, name: null, history: [] };

// DOM 引用
const playerInfoDiv = document.getElementById("player-info");
const tasksContainer = document.getElementById("tasks-container");
const progressDiv = document.getElementById("progress");
const backgroundMusic = document.getElementById("background-music");
const toggleMusicButton = document.getElementById("toggle-music");

// 加载玩家信息
function loadPlayer() {
    const savedPlayer = localStorage.getItem(PLAYER_KEY);
    if (savedPlayer) {
        playerData = JSON.parse(savedPlayer);
    } else {
        playerData.id = Date.now();
        playerData.name = prompt("请输入您的昵称：", "玩家");
        playerData.history = [];
        savePlayer();
    }
    displayPlayerInfo();
}

// 保存玩家信息
function savePlayer() {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(playerData));
}

// 显示玩家信息
function displayPlayerInfo() {
    playerInfoDiv.innerHTML = `
        <p>玩家ID: ${playerData.id}</p>
        <p>昵称: ${playerData.name}</p>
        <p>已完成任务数: ${playerData.history.length}/${tasks.length}</p>
    `;
}

// 显示任务列表
function displayTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.innerHTML = `
            <h3>${task.name}</h3>
            <p>时长: ${task.duration / 1000} 秒</p>
            <button onclick="startTask(${index})" ${
            playerData.history.includes(task.name) ? "disabled" : ""
        }>开始任务</button>
        `;
        tasksContainer.appendChild(taskDiv);
    });
}

// 开始任务
function startTask(index) {
    const task = tasks[index];
    alert(`任务 "${task.name}" 开始！请稍候...`);
    setTimeout(() => {
        completeTask(task.name);
    }, task.duration);
}

// 完成任务
function completeTask(taskName) {
    if (!playerData.history.includes(taskName)) {
        playerData.history.push(taskName);
        savePlayer();
        updateProgress();
        alert(`任务 "${taskName}" 已完成！`);
    } else {
        alert("任务已经完成过！");
    }
}

// 更新任务进度
function updateProgress() {
    progressDiv.innerHTML = `任务进度: ${playerData.history.length}/${tasks.length}`;
    if (playerData.history.length === tasks.length) {
        alert("恭喜你，完成所有任务！");
    }
    displayPlayerInfo();
    displayTasks();
}

// 背景音乐控制
toggleMusicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleMusicButton.textContent = "🎵 暂停背景音乐";
    } else {
        backgroundMusic.pause();
        toggleMusicButton.textContent = "🎵 开启背景音乐";
    }
});

// 初始化游戏
function initGame() {
    loadPlayer();
    displayTasks();
    updateProgress();
}

// 启动游戏
initGame();
