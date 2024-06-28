document.addEventListener('DOMContentLoaded', () => {
    initialize();
});

const initialState = {
    name: 'Player',
    health: 100,
    energy: 100,
    xp: 0,
    level: 1,
    quests: [],
    dailyTasks: [],
    inventory: [],
    achievements: [],
    habits: []
};

function initialize() {
    let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
    updateUI(state);
}

function saveState(state) {
    localStorage.setItem('gameState', JSON.stringify(state));
}

function updateUI(state) {
    document.getElementById('name').textContent = state.name;
    document.getElementById('health').textContent = state.health;
    document.getElementById('health-profile').textContent = state.health;
    document.getElementById('energy').textContent = state.energy;
    document.getElementById('energy-profile').textContent = state.energy;
    document.getElementById('xp').textContent = state.xp;
    document.getElementById('xp-profile').textContent = state.xp;
    document.getElementById('level').textContent = state.level;

    updateQuestList(state.quests);
    updateDailyTasks(state.dailyTasks);
    updateInventory(state.inventory);
    updateAchievements(state.achievements);
    updateHabits(state.habits);
}

function addQuest() {
    let quest = document.getElementById('new-quest').value;
    if (quest) {
        let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
        state.quests.push({ name: quest, completed: false });
        saveState(state);
        updateUI(state);
        document.getElementById('new-quest').value = '';
    }
}

function updateQuestList(quests) {
    let questList = document.getElementById('quest-list');
    questList.innerHTML = '';
    quests.forEach((quest, index) => {
        let li = document.createElement('li');
        li.textContent = quest.name;
        if (quest.completed) {
            li.style.textDecoration = 'line-through';
        }
        li.addEventListener('click', () => {
            toggleQuestCompletion(index);
        });
        questList.appendChild(li);
    });
}

function toggleQuestCompletion(index) {
    let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
    state.quests[index].completed = !state.quests[index].completed;
    if (state.quests[index].completed) {
        state.xp += 10;
    } else {
        state.xp -= 10;
    }
    saveState(state);
    updateUI(state);
}

function addDailyTask() {
    let task = document.getElementById('new-task').value;
    if (task) {
        let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
        state.dailyTasks.push({ name: task, completed: false });
        saveState(state);
        updateUI(state);
        document.getElementById('new-task').value = '';
    }
}

function updateDailyTasks(tasks) {
    let taskList = document.getElementById('daily-tasks');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        let li = document.createElement('li');
        li.textContent = task.name;
        if (task.completed) {
            li.style.textDecoration = 'line-through';
        }
        li.addEventListener('click', () => {
            toggleTaskCompletion(index);
        });
        taskList.appendChild(li);
    });
}

function toggleTaskCompletion(index) {
    let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
    state.dailyTasks[index].completed = !state.dailyTasks[index].completed;
    if (state.dailyTasks[index].completed) {
        state.xp += 5;
        state.energy -= 5;
    } else {
        state.xp -= 5;
        state.energy += 5;
    }
    saveState(state);
    updateUI(state);
}

function addHabit() {
    let habit = document.getElementById('new-habit').value;
    if (habit) {
        let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
        state.habits.push({ name: habit, streak: 0 });
        saveState(state);
        updateUI(state);
        document.getElementById('new-habit').value = '';
    }
}

function updateHabits(habits) {
    let habitList = document.getElementById('habit-list');
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        let li = document.createElement('li');
        li.textContent = `${habit.name} - Streak: ${habit.streak}`;
        li.addEventListener('click', () => {
            incrementHabitStreak(index);
        });
        habitList.appendChild(li);
    });
}

function incrementHabitStreak(index) {
    let state = JSON.parse(localStorage.getItem('gameState')) || initialState;
    state.habits[index].streak += 1;
    state.xp += 2;
    saveState(state);
    updateUI(state);
}

function updateInventory(items) {
    let inventoryList = document.getElementById('inventory-items');
    inventoryList.innerHTML = '';
    items.forEach((item) => {
        let li = document.createElement('li');
        li.textContent = item.name;
        inventoryList.appendChild(li);
    });
}

function updateAchievements(achievements) {
    let achievementList = document.getElementById('achievement-list');
    achievementList.innerHTML = '';
    achievements.forEach((achievement) => {
        let li = document.createElement('li');
        li.textContent = achievement.name;
        achievementList.appendChild(li);
    });
}

// XP and Level Management
function checkLevelUp(state) {
    let levelUpThreshold = state.level * 100;
    if (state.xp >= levelUpThreshold) {
        state.level += 1;
        state.xp -= levelUpThreshold;
    }
}

// Health and Energy Management
function updateHealthAndEnergy(state) {
    if (state.energy <= 0) {
        state.health -= 10;
        state.energy = 100;
    }

    if (state.health <= 0) {
        alert("Game Over! Your character has exhausted all health.");
        resetGame();
    }
}

// Reset Game
function resetGame() {
    localStorage.removeItem('gameState');
    initialize();
}
