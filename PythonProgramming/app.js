// Python Programming Learning App
class PythonLearningApp {
    constructor() {
        this.currentUnit = 'overview';
        this.progress = this.initializeProgress();
        this.currentQuestionIndex = 0;
        this.currentQuestionSet = [];
        this.virtualFileSystem = {}; // For file handling simulator
        
        this.init();
    }
    
    init() {
        this.bindEventListeners();
        this.loadSidebarContent();
        this.updateProgressDisplay();
        this.initializeTheme();
        this.loadAllQuestions();
    }
    
    initializeProgress() {
        const progress = {};
        for (let i = 1; i <= 6; i++) {
            progress[`unit-${i}`] = 0;
        }
        return progress;
    }
    
    bindEventListeners() {
        console.log('Binding event listeners...');
        
        // Navigation tabs
        const navTabs = document.querySelectorAll('.nav-tab');
        console.log('Found nav tabs:', navTabs.length);
        
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const unit = tab.getAttribute('data-unit');
                console.log('Nav tab clicked:', unit);
                this.navigateToUnit(unit);
            });
        });
        
        // Unit overview cards
        const unitCards = document.querySelectorAll('.unit-overview-card');
        console.log('Found unit cards:', unitCards.length);
        
        unitCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const unit = card.getAttribute('data-unit');
                console.log('Unit card clicked:', unit);
                if (unit) {
                    this.navigateToUnit(unit);
                }
            });
        });
        
        // Theme toggle - fix the event handler
        const themeToggle = document.getElementById('theme-toggle');
        console.log('Found theme toggle:', !!themeToggle);
        
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Theme toggle clicked');
                this.toggleTheme();
            });
        }
        
        // Bookmark buttons
        const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
        console.log('Found bookmark buttons:', bookmarkButtons.length);
        
        bookmarkButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const unit = btn.getAttribute('data-unit');
                console.log('Bookmark clicked for unit:', unit);
                this.toggleBookmark(unit, btn);
            });
        });
    }
    
    navigateToUnit(unit) {
        console.log('Navigating to unit:', unit);
        
        // Update navigation
        const navTabs = document.querySelectorAll('.nav-tab');
        navTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`.nav-tab[data-unit="${unit}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
            console.log('Activated tab for unit:', unit);
        }
        
        // Update content
        const contentSections = document.querySelectorAll('.content-section');
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        let targetSection;
        if (unit === 'overview') {
            targetSection = 'overview';
        } else if (unit === 'tools') {
            targetSection = 'tools';
        } else {
            targetSection = `unit-${unit}`;
        }
        
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
            console.log('Activated content section:', targetSection);
        } else {
            console.error('Target section not found:', targetSection);
        }
        
        this.currentUnit = unit;
        this.loadSidebarContent();
        
        // Load questions for the unit if it's a unit page
        if (unit !== 'overview' && unit !== 'tools') {
            this.loadQuestionsForUnit(unit);
        }
    }
    
    loadSidebarContent() {
        const sidebarContent = document.getElementById('sidebar-content');
        console.log('Loading sidebar content for unit:', this.currentUnit);
        
        if (this.currentUnit === 'overview') {
            sidebarContent.innerHTML = `
                <h3>Quick Start</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="window.app.navigateToUnit('1'); return false;">Begin Unit 1</a></li>
                    <li><a href="#" onclick="window.app.navigateToUnit('tools'); return false;">Explore Tools</a></li>
                    <li><a href="#" onclick="window.app.generateQuickQuiz(); return false;">Quick Quiz</a></li>
                </ul>
                
                <h3>Study Progress</h3>
                <div class="progress-list">
                    ${this.generateProgressList()}
                </div>
            `;
        } else if (this.currentUnit === 'tools') {
            sidebarContent.innerHTML = `
                <h3>Available Tools</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="document.getElementById('python-code-input')?.focus(); return false;">Python Code Runner</a></li>
                    <li><a href="#" onclick="document.getElementById('string-method-search')?.focus(); return false;">String Methods</a></li>
                    <li><a href="#" onclick="document.getElementById('lc-expression')?.focus(); return false;">List Comprehension Builder</a></li>
                    <li><a href="#" onclick="document.getElementById('file-operation')?.focus(); return false;">File Handling Simulator</a></li>
                    <li><a href="#" onclick="document.getElementById('class-definition')?.focus(); return false;">Class Diagram Visualizer</a></li>
                    <li><a href="#" onclick="document.getElementById('glossary-search')?.focus(); return false;">Python Glossary</a></li>
                </ul>
                
                <h3>Navigation</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="window.app.navigateToUnit('overview'); return false;">← Back to Overview</a></li>
                </ul>
            `;
        } else {
            const unitNum = parseInt(this.currentUnit);
            sidebarContent.innerHTML = `
                <h3>Unit ${this.currentUnit} Contents</h3>
                <ul class="sidebar-menu">
                    <li><a href="#objectives" class="active">Learning Objectives</a></li>
                    <li><a href="#theory">Theory</a></li>
                    <li><a href="#examples">Examples</a></li>
                    <li><a href="#questions">Practice Questions</a></li>
                </ul>
                
                <h3>Unit Progress</h3>
                <div class="unit-progress-sidebar">
                    <div class="progress-bar small">
                        <div class="progress-fill" style="width: ${this.progress[`unit-${this.currentUnit}`] || 0}%"></div>
                    </div>
                    <p>${this.progress[`unit-${this.currentUnit}`] || 0}% Complete</p>
                </div>
                
                <h3>Navigation</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="window.app.navigateToUnit('overview'); return false;">← Back to Overview</a></li>
                    ${unitNum > 1 ? `<li><a href="#" onclick="window.app.navigateToUnit('${unitNum - 1}'); return false;">← Previous Unit</a></li>` : ''}
                    ${unitNum < 6 ? `<li><a href="#" onclick="window.app.navigateToUnit('${unitNum + 1}'); return false;">Next Unit →</a></li>` : ''}
                </ul>
            `;
        }
    }
    
    generateProgressList() {
        let html = '';
        for (let i = 1; i <= 6; i++) {
            const progress = this.progress[`unit-${i}`] || 0;
            html += `
                <div class="progress-item" style="margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-size: 12px;">Unit ${i}</span>
                        <span style="font-size: 11px; color: var(--color-text-secondary);">${progress}%</span>
                    </div>
                    <div class="progress-bar small">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        }
        return html;
    }
    
    updateProgressDisplay() {
        const totalProgress = Object.values(this.progress).reduce((a, b) => a + b, 0) / 6;
        const progressElement = document.getElementById('overall-progress');
        const progressFillElement = document.getElementById('progress-fill');
        
        if (progressElement) {
            progressElement.textContent = `${Math.round(totalProgress)}%`;
        }
        if (progressFillElement) {
            progressFillElement.style.width = `${totalProgress}%`;
        }
        
        // Update unit progress bars in overview
        document.querySelectorAll('[data-progress]').forEach(element => {
            const unit = element.getAttribute('data-progress');
            const progress = this.progress[unit] || 0;
            element.style.width = `${progress}%`;
        });
    }
    
    toggleTheme() {
        console.log('Toggling theme...');
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
        
        console.log('Theme switched to:', newTheme);
    }
    
    initializeTheme() {
        // Set initial theme based on system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-color-scheme', prefersDark ? 'dark' : 'light');
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = prefersDark ? '☀️' : '🌙';
        }
    }
    
    toggleBookmark(unit, button) {
        if (button) {
            button.classList.toggle('bookmarked');
            const isBookmarked = button.classList.contains('bookmarked');
            button.innerHTML = isBookmarked ? 
                '<span>⭐</span> Bookmarked' : 
                '<span>⭐</span> Bookmark';
        }
    }
    
    loadAllQuestions() {
        console.log('Loading all questions...');
        // Initialize questions for all units
        for (let i = 1; i <= 6; i++) {
            this.loadQuestionsForUnit(i.toString());
        }
    }
    
    loadQuestionsForUnit(unit) {
        const questionsContainer = document.getElementById(`unit-${unit}-questions`);
        if (!questionsContainer) {
            console.log(`Questions container not found for unit ${unit}`);
            return;
        }
        
        const questions = this.getQuestionsForUnit(unit);
        console.log(`Loading ${questions.length} questions for unit ${unit}`);
        
        questionsContainer.innerHTML = questions.map((q, index) => `
            <div class="question-card" onclick="window.app.openQuestion('${unit}', ${index})">
                <div class="question-header">
                    <span class="question-number">${index + 1}</span>
                    <span class="question-type">${q.type}</span>
                </div>
                <p class="question-text">${q.question}</p>
            </div>
        `).join('');
    }
    
    getQuestionsForUnit(unit) {
        const questionSets = {
            '1': [
                {
                    question: "Which of the following is a valid Python identifier?",
                    type: "Multiple Choice",
                    options: [
                        "_name",
                        "2name",
                        "class",
                        "name-1"
                    ],
                    answer: "_name",
                    explanation: "Python identifiers must start with a letter or underscore, and cannot be keywords or start with digits."
                },
                {
                    question: "What will be the output of print(type(3.14))?",
                    type: "Code Output",
                    options: [
                        "<class 'float'>",
                        "<class 'double'>",
                        "<class 'decimal'>",
                        "<class 'number'>"
                    ],
                    answer: "<class 'float'>",
                    explanation: "In Python, decimal numbers are of type 'float' by default."
                },
                {
                    question: "Write a Python program to swap two variables without using a third variable.",
                    type: "Programming",
                    answer: "a, b = b, a  # or using arithmetic: a = a + b; b = a - b; a = a - b",
                    explanation: "Python's tuple assignment allows elegant variable swapping without temporary variables."
                },
                {
                    question: "What is the result of 10 // 3 in Python?",
                    type: "Calculation",
                    options: [
                        "3.33",
                        "3",
                        "4",
                        "3.0"
                    ],
                    answer: "3",
                    explanation: "The // operator performs floor division, returning the largest integer less than or equal to the result."
                },
                {
                    question: "Which function is used to get input from user in Python?",
                    type: "Function",
                    options: [
                        "input()",
                        "get()",
                        "read()",
                        "scan()"
                    ],
                    answer: "input()",
                    explanation: "The input() function reads a line from input, converts it to a string, and returns it."
                },
                {
                    question: "What will int('123') return?",
                    type: "Type Conversion",
                    answer: "123 (integer)",
                    explanation: "int() function converts a string representation of a number to an integer."
                },
                {
                    question: "Is Python dynamically typed?",
                    type: "True/False",
                    options: ["True", "False"],
                    answer: "True",
                    explanation: "Python is dynamically typed - variables don't need explicit type declarations and can change type during execution."
                },
                {
                    question: "What is the difference between = and == in Python?",
                    type: "Concept",
                    answer: "= is assignment operator, == is comparison operator",
                    explanation: "= assigns a value to a variable, while == compares two values for equality."
                },
                {
                    question: "Write code to print 'Hello' and 'World' on the same line with space between them.",
                    type: "Programming",
                    answer: "print('Hello', 'World') or print('Hello' + ' ' + 'World')",
                    explanation: "print() function can take multiple arguments separated by commas, or strings can be concatenated."
                },
                {
                    question: "What will happen if you try to convert 'abc' to int?",
                    type: "Error Analysis",
                    answer: "ValueError will be raised",
                    explanation: "Converting a non-numeric string to int raises a ValueError exception."
                }
            ],
            '2': [
                {
                    question: "Which statement is used for decision making in Python?",
                    type: "Control Flow",
                    options: [
                        "if",
                        "switch",
                        "case", 
                        "select"
                    ],
                    answer: "if",
                    explanation: "Python uses if-elif-else statements for conditional execution."
                },
                {
                    question: "What will be the output of this code: for i in range(3): print(i)",
                    type: "Loop Output",
                    answer: "0\n1\n2",
                    explanation: "range(3) generates numbers from 0 to 2 (3 is excluded)."
                },
                {
                    question: "Write a function that returns the square of a number.",
                    type: "Programming",
                    answer: "def square(x):\n    return x * x",
                    explanation: "Functions in Python are defined using 'def' keyword followed by function name and parameters."
                },
                {
                    question: "What is the difference between 'Hello'.upper() and 'HELLO'.lower()?",
                    type: "String Methods",
                    answer: "'Hello'.upper() returns 'HELLO', 'HELLO'.lower() returns 'hello'",
                    explanation: "upper() converts to uppercase, lower() converts to lowercase."
                },
                {
                    question: "How do you create a multi-line string in Python?",
                    type: "String Creation",
                    options: [
                        "Using triple quotes \"\"\" or '''",
                        "Using \\n character",
                        "Using + operator",
                        "All of the above"
                    ],
                    answer: "All of the above",
                    explanation: "Multi-line strings can be created using triple quotes, newline characters, or concatenation."
                },
                {
                    question: "What does the len() function return for strings?",
                    type: "Function",
                    answer: "Number of characters in the string",
                    explanation: "len() returns the length (number of characters) of a string."
                },
                {
                    question: "Write a while loop that prints numbers from 1 to 5.",
                    type: "Programming",
                    answer: "i = 1\nwhile i <= 5:\n    print(i)\n    i += 1",
                    explanation: "While loop continues execution as long as the condition is True."
                },
                {
                    question: "What is string formatting in Python?",
                    type: "Concept",
                    answer: "Method to insert values into strings using format(), f-strings, or % operator",
                    explanation: "String formatting allows dynamic insertion of values into string templates."
                },
                {
                    question: "What will 'python'.find('th') return?",
                    type: "String Method",
                    options: ["2", "3", "-1", "True"],
                    answer: "2",
                    explanation: "find() returns the index of first occurrence of substring, or -1 if not found."
                },
                {
                    question: "How do you define a function with default parameters?",
                    type: "Function Definition",
                    answer: "def func(param1, param2='default'):",
                    explanation: "Default parameters are specified by assigning values in the function definition."
                }
            ],
            '3': [
                {
                    question: "How do you create an empty list in Python?",
                    type: "List Creation",
                    options: [
                        "[]",
                        "list()",
                        "Both [] and list()",
                        "None of the above"
                    ],
                    answer: "Both [] and list()",
                    explanation: "Empty lists can be created using square brackets [] or the list() constructor."
                },
                {
                    question: "What will [1, 2, 3][1] return?",
                    type: "Indexing",
                    answer: "2",
                    explanation: "Python uses 0-based indexing, so index 1 refers to the second element."
                },
                {
                    question: "Write code to add an element to the end of a list.",
                    type: "Programming",
                    answer: "my_list.append(element)",
                    explanation: "The append() method adds a single element to the end of a list."
                },
                {
                    question: "What is list slicing? Give an example.",
                    type: "Concept",
                    answer: "Extracting a portion of list using [start:end:step]. Example: [1,2,3,4,5][1:4] gives [2,3,4]",
                    explanation: "Slicing creates a new list containing elements from start index to end-1 index."
                },
                {
                    question: "What will [1, 2, 3] + [4, 5] result in?",
                    type: "List Operation",
                    options: [
                        "[1, 2, 3, 4, 5]",
                        "[5, 7, 8]", 
                        "Error",
                        "[1, 2, 3] [4, 5]"
                    ],
                    answer: "[1, 2, 3, 4, 5]",
                    explanation: "The + operator concatenates lists, creating a new list with all elements."
                },
                {
                    question: "How do you remove an element from a list by value?",
                    type: "List Method",
                    answer: "my_list.remove(value)",
                    explanation: "remove() method removes the first occurrence of the specified value."
                },
                {
                    question: "What is the difference between del and remove for lists?",
                    type: "Comparison",
                    answer: "del removes by index, remove() removes by value",
                    explanation: "del statement removes element at specific index, remove() removes first occurrence of a value."
                },
                {
                    question: "Write code to reverse a list.",
                    type: "Programming",
                    answer: "my_list.reverse() or my_list[::-1]",
                    explanation: "reverse() modifies the original list, [::-1] creates a new reversed list."
                },
                {
                    question: "What will len([1, [2, 3], 4]) return?",
                    type: "List Length",
                    options: ["4", "3", "5", "Error"],
                    answer: "3",
                    explanation: "len() counts top-level elements. The nested list [2, 3] is counted as one element."
                },
                {
                    question: "How do you sort a list in Python?",
                    type: "List Method",
                    answer: "my_list.sort() or sorted(my_list)",
                    explanation: "sort() modifies the original list, sorted() returns a new sorted list."
                }
            ],
            '4': [
                {
                    question: "How do you create an empty dictionary in Python?",
                    type: "Dictionary Creation",
                    options: [
                        "{}",
                        "dict()",
                        "Both {} and dict()",
                        "None of the above"
                    ],
                    answer: "Both {} and dict()",
                    explanation: "Empty dictionaries can be created using curly braces {} or the dict() constructor."
                },
                {
                    question: "What will {'a': 1, 'b': 2}['a'] return?",
                    type: "Dictionary Access",
                    answer: "1",
                    explanation: "Dictionary values are accessed using keys in square brackets."
                },
                {
                    question: "What is the difference between lists and tuples?",
                    type: "Comparison",
                    answer: "Lists are mutable (can be changed), tuples are immutable (cannot be changed)",
                    explanation: "Lists use square brackets and are mutable, tuples use parentheses and are immutable."
                },
                {
                    question: "Write code to add a key-value pair to a dictionary.",
                    type: "Programming",
                    answer: "my_dict['key'] = 'value' or my_dict.update({'key': 'value'})",
                    explanation: "Dictionary items can be added using square bracket notation or update() method."
                },
                {
                    question: "What will set([1, 2, 2, 3]) create?",
                    type: "Set Creation",
                    answer: "{1, 2, 3}",
                    explanation: "Sets automatically remove duplicate elements, keeping only unique values."
                },
                {
                    question: "How do you get all keys from a dictionary?",
                    type: "Dictionary Method",
                    answer: "my_dict.keys()",
                    explanation: "The keys() method returns a view object containing all dictionary keys."
                },
                {
                    question: "What is the zip() function used for?",
                    type: "Built-in Function",
                    answer: "Combines multiple iterables element-wise into tuples",
                    explanation: "zip() pairs elements from multiple sequences: zip([1,2], ['a','b']) gives [(1,'a'), (2,'b')]."
                },
                {
                    question: "Write code to check if a key exists in a dictionary.",
                    type: "Programming",
                    answer: "'key' in my_dict or my_dict.get('key') is not None",
                    explanation: "The 'in' operator checks key existence, get() returns None for missing keys."
                },
                {
                    question: "What is a frozenset in Python?",
                    type: "Data Type",
                    answer: "An immutable version of a set",
                    explanation: "frozenset is like a set but immutable - it cannot be modified after creation."
                },
                {
                    question: "How do you find the intersection of two sets?",
                    type: "Set Operation",
                    options: [
                        "set1 & set2",
                        "set1.intersection(set2)",
                        "Both & and intersection()",
                        "set1 + set2"
                    ],
                    answer: "Both & and intersection()",
                    explanation: "Set intersection can be found using & operator or intersection() method."
                }
            ],
            '5': [
                {
                    question: "What is the default mode for opening a file in Python?",
                    type: "File Mode",
                    options: [
                        "'r' (read)",
                        "'w' (write)",
                        "'a' (append)",
                        "'x' (exclusive)"
                    ],
                    answer: "'r' (read)",
                    explanation: "Files are opened in read mode by default if no mode is specified."
                },
                {
                    question: "Write code to read the entire contents of a text file.",
                    type: "Programming",
                    answer: "with open('file.txt', 'r') as f:\n    content = f.read()",
                    explanation: "The read() method reads the entire file content as a string."
                },
                {
                    question: "What is the advantage of using 'with' statement for file handling?",
                    type: "Best Practice",
                    answer: "Automatically closes the file even if an exception occurs",
                    explanation: "The 'with' statement ensures proper resource cleanup using context managers."
                },
                {
                    question: "How do you write to a file in Python?",
                    type: "File Writing",
                    answer: "with open('file.txt', 'w') as f:\n    f.write('content')",
                    explanation: "Use write() method with file opened in write mode to write content."
                },
                {
                    question: "What is the difference between 'w' and 'a' modes?",
                    type: "File Modes",
                    answer: "'w' overwrites existing file, 'a' appends to existing file",
                    explanation: "Write mode truncates the file, append mode adds to the end without removing existing content."
                },
                {
                    question: "What module is used for working with CSV files?",
                    type: "Module",
                    answer: "csv",
                    explanation: "The csv module provides functionality for reading and writing CSV files."
                },
                {
                    question: "Write code to read a file line by line.",
                    type: "Programming",
                    answer: "with open('file.txt', 'r') as f:\n    for line in f:\n        print(line.strip())",
                    explanation: "Files are iterable - you can loop through them line by line."
                },
                {
                    question: "What is pickle module used for?",
                    type: "Module Purpose",
                    answer: "Serializing and deserializing Python objects to/from binary format",
                    explanation: "pickle converts Python objects to byte streams for storage or transmission."
                },
                {
                    question: "How do you check if a file exists?",
                    type: "File Operations",
                    answer: "os.path.exists('filename') or pathlib.Path('filename').exists()",
                    explanation: "Use os.path.exists() or pathlib methods to check file existence."
                },
                {
                    question: "What is the difference between text and binary file modes?",
                    type: "File Types",
                    answer: "Text mode handles strings with encoding, binary mode handles raw bytes",
                    explanation: "Text mode ('r', 'w') works with strings, binary mode ('rb', 'wb') works with bytes."
                }
            ],
            '6': [
                {
                    question: "What is a class in Python?",
                    type: "OOP Concept",
                    answer: "A blueprint for creating objects that defines attributes and methods",
                    explanation: "Classes are templates that define the structure and behavior of objects."
                },
                {
                    question: "Write code to create a simple class with a constructor.",
                    type: "Programming",
                    answer: "class Person:\n    def __init__(self, name):\n        self.name = name",
                    explanation: "__init__ is the constructor method called when an object is created."
                },
                {
                    question: "What is inheritance in Python?",
                    type: "OOP Concept",
                    answer: "Mechanism where a class inherits attributes and methods from another class",
                    explanation: "Inheritance allows code reuse and establishes 'is-a' relationships between classes."
                },
                {
                    question: "How do you import a specific function from a module?",
                    type: "Module Import",
                    answer: "from module_name import function_name",
                    explanation: "This syntax imports only the specified function, not the entire module."
                },
                {
                    question: "What is the __init__.py file used for?",
                    type: "Module System",
                    answer: "Makes a directory a Python package and can contain package initialization code",
                    explanation: "__init__.py files turn directories into Python packages and control what gets imported."
                },
                {
                    question: "What module provides mathematical statistics functions?",
                    type: "Module",
                    options: [
                        "statistics",
                        "math",
                        "numpy",
                        "scipy"
                    ],
                    answer: "statistics",
                    explanation: "The statistics module provides functions for calculating mathematical statistics."
                },
                {
                    question: "Write code to create a subclass that inherits from a parent class.",
                    type: "Programming",
                    answer: "class Child(Parent):\n    def __init__(self, name):\n        super().__init__(name)",
                    explanation: "Use class Child(Parent) syntax and super() to call parent class methods."
                },
                {
                    question: "What is NumPy primarily used for?",
                    type: "Library Purpose",
                    answer: "Numerical computing with support for large multi-dimensional arrays and matrices",
                    explanation: "NumPy provides efficient array operations and mathematical functions for scientific computing."
                },
                {
                    question: "What is method overriding in Python?",
                    type: "OOP Concept",
                    answer: "Redefining a method in a subclass that was already defined in the parent class",
                    explanation: "Method overriding allows subclasses to provide specific implementations of parent methods."
                },
                {
                    question: "How do you create a module in Python?",
                    type: "Module Creation",
                    answer: "Save Python code in a .py file - the filename becomes the module name",
                    explanation: "Any .py file can be imported as a module using its filename (without .py extension)."
                }
            ]
        };
        
        return questionSets[unit] || [];
    }
    
    openQuestion(unit, index) {
        console.log('Opening question:', unit, index);
        const questions = this.getQuestionsForUnit(unit);
        const question = questions[index];
        
        if (!question) {
            console.error('Question not found:', unit, index);
            return;
        }
        
        this.currentQuestionSet = questions;
        this.currentQuestionIndex = index;
        
        this.displayQuestionModal(question, index + 1, questions.length);
    }
    
    displayQuestionModal(question, questionNum, totalQuestions) {
        console.log('Displaying question modal');
        const modal = document.getElementById('question-modal');
        const title = document.getElementById('modal-question-title');
        const content = document.getElementById('modal-question-content');
        const options = document.getElementById('modal-question-options');
        const answer = document.getElementById('modal-question-answer');
        
        if (!modal || !title || !content || !options || !answer) {
            console.error('Modal elements not found');
            return;
        }
        
        title.textContent = `Question ${questionNum} of ${totalQuestions}`;
        content.textContent = question.question;
        
        // Clear previous content
        options.innerHTML = '';
        answer.innerHTML = '';
        answer.classList.add('hidden');
        
        // Show options if multiple choice
        if (question.options) {
            options.innerHTML = `
                <div class="question-options">
                    ${question.options.map((option, i) => `
                        <div class="question-option" onclick="this.parentNode.querySelectorAll('.question-option').forEach(o => o.classList.remove('selected')); this.classList.add('selected');">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        // Reset buttons
        const showBtn = document.getElementById('show-answer-btn');
        const nextBtn = document.getElementById('next-question-btn');
        
        if (showBtn) showBtn.classList.remove('hidden');
        if (nextBtn) nextBtn.classList.add('hidden');
        
        // Show modal
        modal.classList.remove('hidden');
        console.log('Modal displayed');
    }
    
    generateQuickQuiz() {
        console.log('Generating quick quiz');
        const randomUnit = Math.ceil(Math.random() * 6);
        this.navigateToUnit(randomUnit.toString());
        
        const questions = this.getQuestionsForUnit(randomUnit.toString());
        if (questions.length > 0) {
            const randomQuestion = Math.floor(Math.random() * questions.length);
            this.openQuestion(randomUnit.toString(), randomQuestion);
        }
    }
}

// Modal functions
function showAnswer() {
    console.log('Showing answer');
    const answer = document.getElementById('modal-question-answer');
    const question = window.app.currentQuestionSet[window.app.currentQuestionIndex];
    
    if (!answer || !question) {
        console.error('Answer element or question not found');
        return;
    }
    
    answer.innerHTML = `
        <h4>Answer:</h4>
        <p><strong>${question.answer}</strong></p>
        ${question.explanation ? `<p><em>Explanation:</em> ${question.explanation}</p>` : ''}
    `;
    
    answer.classList.remove('hidden');
    document.getElementById('show-answer-btn')?.classList.add('hidden');
    document.getElementById('next-question-btn')?.classList.remove('hidden');
    
    // Update progress
    const currentUnit = window.app.currentUnit;
    if (currentUnit !== 'overview' && currentUnit !== 'tools') {
        window.app.progress[`unit-${currentUnit}`] = Math.min(100, (window.app.progress[`unit-${currentUnit}`] || 0) + 10);
        window.app.updateProgressDisplay();
        window.app.loadSidebarContent();
    }
}

function nextQuestion() {
    console.log('Next question');
    window.app.currentQuestionIndex = (window.app.currentQuestionIndex + 1) % window.app.currentQuestionSet.length;
    const question = window.app.currentQuestionSet[window.app.currentQuestionIndex];
    window.app.displayQuestionModal(question, window.app.currentQuestionIndex + 1, window.app.currentQuestionSet.length);
}

function closeModal() {
    console.log('Closing modal');
    const modal = document.getElementById('question-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Python-specific tool functions
function runPythonCode() {
    const codeInput = document.getElementById('python-code-input').value;
    const result = document.getElementById('python-code-result');
    
    if (!codeInput.trim()) {
        result.className = 'result-display error';
        result.textContent = 'Please enter Python code to run';
        return;
    }
    
    // Since we can't actually execute Python, simulate some basic outputs
    try {
        let output = '';
        const lines = codeInput.split('\n');
        
        for (let line of lines) {
            line = line.trim();
            if (line.startsWith('print(')) {
                const match = line.match(/print\((.*)\)/);
                if (match) {
                    let content = match[1];
                    // Simple evaluation for basic cases
                    if (content.startsWith("'") && content.endsWith("'")) {
                        output += content.slice(1, -1) + '\n';
                    } else if (content.startsWith('"') && content.endsWith('"')) {
                        output += content.slice(1, -1) + '\n';
                    } else {
                        output += `[Result of: ${content}]\n`;
                    }
                }
            }
        }
        
        if (output) {
            result.className = 'result-display success';
            result.textContent = output.trim();
        } else {
            result.className = 'result-display info';
            result.textContent = 'Code executed successfully (no output generated)';
        }
    } catch (e) {
        result.className = 'result-display error';
        result.textContent = `Syntax Error: ${e.message}`;
    }
}

function searchStringMethod() {
    const methodName = document.getElementById('string-method-search')?.value.toLowerCase() || '';
    const result = document.getElementById('string-method-result');
    
    if (!result) return;
    
    const stringMethods = {
        'upper': 'str.upper() - Returns string in uppercase\nExample: "hello".upper() → "HELLO"',
        'lower': 'str.lower() - Returns string in lowercase\nExample: "HELLO".lower() → "hello"',
        'split': 'str.split(sep) - Splits string into a list\nExample: "a,b,c".split(",") → ["a", "b", "c"]',
        'join': 'str.join(iterable) - Joins elements with string as separator\nExample: ",".join(["a", "b"]) → "a,b"',
        'replace': 'str.replace(old, new) - Replaces substring\nExample: "hello".replace("l", "x") → "hexxo"',
        'strip': 'str.strip() - Removes whitespace from both ends\nExample: " hello ".strip() → "hello"',
        'find': 'str.find(sub) - Returns index of first occurrence\nExample: "hello".find("ll") → 2',
        'startswith': 'str.startswith(prefix) - Checks if string starts with prefix\nExample: "hello".startswith("he") → True',
        'endswith': 'str.endswith(suffix) - Checks if string ends with suffix\nExample: "hello".endswith("lo") → True',
        'isdigit': 'str.isdigit() - Checks if all characters are digits\nExample: "123".isdigit() → True',
        'isalpha': 'str.isalpha() - Checks if all characters are letters\nExample: "abc".isalpha() → True',
        'format': 'str.format() - Formats string with placeholders\nExample: "Hello {}".format("World") → "Hello World"'
    };
    
    if (stringMethods[methodName]) {
        result.className = 'result-display success';
        result.textContent = stringMethods[methodName];
    } else {
        result.className = 'result-display error';
        result.textContent = `Method "${methodName}" not found. Try: upper, lower, split, join, replace, strip, find, startswith, endswith, isdigit, isalpha, format`;
    }
}

function buildListComprehension() {
    const expression = document.getElementById('lc-expression')?.value.trim() || '';
    const range = document.getElementById('lc-range')?.value.trim() || '';
    const condition = document.getElementById('lc-condition')?.value.trim() || '';
    const result = document.getElementById('lc-result');
    
    if (!result) return;
    
    if (!expression || !range) {
        result.className = 'result-display error';
        result.textContent = 'Please provide both expression and range';
        return;
    }
    
    let comprehension = `[${expression} for ${range}`;
    if (condition) {
        comprehension += ` ${condition}`;
    }
    comprehension += ']';
    
    result.className = 'result-display success';
    result.textContent = `List Comprehension: ${comprehension}\n\nExample result: [expression evaluated for each item in range]`;
}

function simulateFileOperation() {
    const operation = document.getElementById('file-operation')?.value || '';
    const filename = document.getElementById('file-name')?.value.trim() || '';
    const content = document.getElementById('file-content')?.value || '';
    const result = document.getElementById('file-result');
    
    if (!result) return;
    
    if (!filename) {
        result.className = 'result-display error';
        result.textContent = 'Please enter a filename';
        return;
    }
    
    // Simulate file operations using virtual file system
    switch (operation) {
        case 'create':
            window.app.virtualFileSystem[filename] = content || '';
            result.className = 'result-display success';
            result.textContent = `File "${filename}" created successfully`;
            break;
            
        case 'read':
            if (window.app.virtualFileSystem[filename] !== undefined) {
                result.className = 'result-display success';
                result.textContent = `Contents of "${filename}":\n${window.app.virtualFileSystem[filename] || '(empty file)'}`;
            } else {
                result.className = 'result-display error';
                result.textContent = `File "${filename}" not found`;
            }
            break;
            
        case 'write':
            if (window.app.virtualFileSystem[filename] !== undefined) {
                window.app.virtualFileSystem[filename] = content;
                result.className = 'result-display success';
                result.textContent = `Content written to "${filename}"`;
            } else {
                result.className = 'result-display error';
                result.textContent = `File "${filename}" does not exist. Create it first.`;
            }
            break;
            
        case 'append':
            if (window.app.virtualFileSystem[filename] !== undefined) {
                window.app.virtualFileSystem[filename] += content;
                result.className = 'result-display success';
                result.textContent = `Content appended to "${filename}"`;
            } else {
                result.className = 'result-display error';
                result.textContent = `File "${filename}" does not exist. Create it first.`;
            }
            break;
    }
}

function visualizeClass() {
    const classDefinition = document.getElementById('class-definition')?.value.trim() || '';
    const result = document.getElementById('class-diagram-result');
    
    if (!result) return;
    
    if (!classDefinition) {
        result.className = 'result-display error';
        result.textContent = 'Please enter a class definition';
        return;
    }
    
    // Simple class analysis
    const lines = classDefinition.split('\n');
    let className = 'Unknown';
    let methods = [];
    let attributes = [];
    
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('class ')) {
            const match = line.match(/class\s+(\w+)/);
            if (match) className = match[1];
        } else if (line.includes('def ')) {
            const method = line.match(/def\s+(\w+)/);
            if (method) methods.push(method[1]);
        } else if (line.includes('self.')) {
            const attr = line.match(/self\.(\w+)/);
            if (attr && !attributes.includes(attr[1])) attributes.push(attr[1]);
        }
    }
    
    result.className = 'result-display success';
    result.textContent = `Class Analysis:
Class Name: ${className}
Attributes: ${attributes.length ? attributes.join(', ') : 'None found'}
Methods: ${methods.length ? methods.join(', ') : 'None found'}

[This is a simplified visualization. In a real IDE, you would see a graphical class diagram]`;
}

function generateQuiz() {
    const unitSelect = document.getElementById('quiz-unit-select');
    const selectedUnit = unitSelect?.value || '1';
    const result = document.getElementById('quiz-result');
    
    if (!result) return;
    
    const questions = window.app.getQuestionsForUnit(selectedUnit);
    if (questions.length === 0) {
        result.className = 'result-display error';
        result.textContent = 'No questions available for this unit';
        return;
    }
    
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    
    result.className = 'result-display info';
    result.innerHTML = `
        <strong>Random Question from Unit ${selectedUnit}:</strong><br>
        ${randomQuestion.question}<br>
        <small>Click to see full question and answer</small>
    `;
    
    result.style.cursor = 'pointer';
    result.onclick = () => {
        window.app.currentQuestionSet = questions;
        window.app.currentQuestionIndex = questions.indexOf(randomQuestion);
        window.app.displayQuestionModal(randomQuestion, 1, 1);
    };
}

function searchGlossary() {
    const searchTerm = document.getElementById('glossary-search')?.value.toLowerCase() || '';
    const result = document.getElementById('glossary-result');
    
    if (!result) return;
    
    const glossary = {
        'variable': 'A named storage location that holds data which can be modified during program execution',
        'function': 'A reusable block of code that performs a specific task and can accept parameters',
        'list': 'An ordered, mutable collection of items that can hold different data types',
        'dictionary': 'A collection of key-value pairs that allows fast lookup by key',
        'tuple': 'An ordered, immutable collection of items',
        'set': 'An unordered collection of unique items',
        'string': 'A sequence of characters used to represent text',
        'loop': 'A control structure that repeatedly executes a block of code',
        'class': 'A blueprint for creating objects that defines attributes and methods',
        'object': 'An instance of a class containing data and methods',
        'method': 'A function defined inside a class that operates on class instances',
        'module': 'A file containing Python definitions and statements that can be imported',
        'exception': 'An error that occurs during program execution that can be handled',
        'indentation': 'Whitespace at the beginning of lines used to define code blocks in Python',
        'import': 'A statement used to bring modules or specific functions into your program',
        'inheritance': 'A mechanism where a class inherits attributes and methods from another class',
        'polymorphism': 'The ability of objects of different classes to be used interchangeably',
        'encapsulation': 'The bundling of data and methods within a class and controlling access to them'
    };
    
    const definition = glossary[searchTerm] || 
        Object.entries(glossary).find(([term]) => term.includes(searchTerm))?.[1];
    
    if (definition) {
        result.className = 'result-display success';
        result.textContent = definition;
    } else {
        result.className = 'result-display error';
        result.textContent = `No definition found for "${searchTerm}". Try: variable, function, list, dictionary, tuple, set, string, loop, class, object, method, module, exception, indentation, import, inheritance, polymorphism, encapsulation`;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new PythonLearningApp();
    
    // Close modal when clicking outside
    const modal = document.getElementById('question-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'question-modal') {
                closeModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('question-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'Enter') {
                const showBtn = document.getElementById('show-answer-btn');
                const nextBtn = document.getElementById('next-question-btn');
                if (showBtn && !showBtn.classList.contains('hidden')) {
                    showAnswer();
                } else if (nextBtn && !nextBtn.classList.contains('hidden')) {
                    nextQuestion();
                }
            }
        }
    });
    
    console.log('App initialization complete');
});