// Automata Theory & Compiler Design Learning App
class AutomataLearningApp {
    constructor() {
        this.currentUnit = 'overview';
        this.progress = this.initializeProgress();
        this.currentQuestionIndex = 0;
        this.currentQuestionSet = [];
        
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
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const unit = e.target.getAttribute('data-unit');
                this.navigateToUnit(unit);
            });
        });
        
        // Unit overview cards - delegate event handling
        document.addEventListener('click', (e) => {
            const unitCard = e.target.closest('.unit-overview-card');
            if (unitCard) {
                const unit = unitCard.getAttribute('data-unit');
                if (unit) {
                    this.navigateToUnit(unit);
                }
            }
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });
        }
        
        // Bookmark buttons
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const unit = e.target.closest('.bookmark-btn').getAttribute('data-unit');
                this.toggleBookmark(unit, e.target.closest('.bookmark-btn'));
            });
        });
    }
    
    navigateToUnit(unit) {
        console.log('Navigating to unit:', unit); // Debug log
        
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-unit="${unit}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
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
        
        if (this.currentUnit === 'overview') {
            sidebarContent.innerHTML = `
                <h3>Quick Start</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="app.navigateToUnit('1'); return false;">Begin Unit 1</a></li>
                    <li><a href="#" onclick="app.navigateToUnit('tools'); return false;">Explore Tools</a></li>
                    <li><a href="#" onclick="app.generateQuickQuiz(); return false;">Quick Quiz</a></li>
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
                    <li><a href="#regex-tool" onclick="document.getElementById('regex-input').focus(); return false;">Regular Expression Tester</a></li>
                    <li><a href="#grammar-tool" onclick="document.getElementById('grammar-input').focus(); return false;">Grammar Validator</a></li>
                    <li><a href="#quiz-tool" onclick="document.getElementById('quiz-unit-select').focus(); return false;">Quick Quiz Generator</a></li>
                    <li><a href="#glossary-tool" onclick="document.getElementById('glossary-search').focus(); return false;">Glossary</a></li>
                </ul>
                
                <h3>Navigation</h3>
                <ul class="sidebar-menu">
                    <li><a href="#" onclick="app.navigateToUnit('overview'); return false;">← Back to Overview</a></li>
                </ul>
            `;
        } else {
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
                    <li><a href="#" onclick="app.navigateToUnit('overview'); return false;">← Back to Overview</a></li>
                    ${this.currentUnit > 1 ? `<li><a href="#" onclick="app.navigateToUnit('${parseInt(this.currentUnit) - 1}'); return false;">← Previous Unit</a></li>` : ''}
                    ${this.currentUnit < 6 ? `<li><a href="#" onclick="app.navigateToUnit('${parseInt(this.currentUnit) + 1}'); return false;">Next Unit →</a></li>` : ''}
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
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : (currentTheme === 'light' ? 'dark' : 'dark');
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
        
        console.log('Theme switched to:', newTheme); // Debug log
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
        // Initialize questions for all units
        for (let i = 1; i <= 6; i++) {
            this.loadQuestionsForUnit(i.toString());
        }
    }
    
    loadQuestionsForUnit(unit) {
        const questionsContainer = document.getElementById(`unit-${unit}-questions`);
        if (!questionsContainer) return;
        
        const questions = this.getQuestionsForUnit(unit);
        questionsContainer.innerHTML = questions.map((q, index) => `
            <div class="question-card" onclick="app.openQuestion('${unit}', ${index})">
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
                    question: "What is a Deterministic Finite Automaton (DFA)?",
                    type: "Definition",
                    options: [
                        "A finite state machine with exactly one transition for each state-symbol pair",
                        "A machine that can be in multiple states simultaneously",
                        "A machine with infinite states",
                        "A machine that accepts context-free languages"
                    ],
                    answer: "A finite state machine with exactly one transition for each state-symbol pair",
                    explanation: "A DFA is characterized by having exactly one transition from each state for each input symbol, making it deterministic."
                },
                {
                    question: "Convert the regular expression (a|b)*abb to an NFA using Thompson's construction.",
                    type: "Construction",
                    answer: "Step-by-step construction: 1) Create NFA for 'a', 2) Create NFA for 'b', 3) Union using ε-transitions, 4) Apply Kleene closure, 5) Concatenate with 'abb'",
                    explanation: "Thompson's construction systematically builds NFAs for basic patterns and combines them using ε-transitions."
                },
                {
                    question: "What is the difference between NFA and DFA?",
                    type: "Compare",
                    options: [
                        "NFA allows multiple transitions, DFA allows exactly one",
                        "NFA is faster than DFA",
                        "DFA can have ε-transitions, NFA cannot",
                        "There is no difference"
                    ],
                    answer: "NFA allows multiple transitions, DFA allows exactly one",
                    explanation: "The key difference is that NFAs can have multiple transitions from a state on the same symbol, while DFAs have exactly one."
                },
                {
                    question: "What is the pumping lemma for regular languages?",
                    type: "Theory",
                    answer: "If L is regular, then ∃ n such that ∀ strings w ∈ L with |w| ≥ n, w can be divided into xyz where |xy| ≤ n, |y| > 0, and xy^iz ∈ L for all i ≥ 0",
                    explanation: "The pumping lemma provides a necessary condition for regular languages and is used to prove languages are not regular."
                },
                {
                    question: "Which of the following languages is NOT regular?",
                    type: "Analysis",
                    options: [
                        "{a^n b^n | n ≥ 0}",
                        "{a^n b^m | n, m ≥ 0}",
                        "(a|b)*",
                        "{a^n | n is even}"
                    ],
                    answer: "{a^n b^n | n ≥ 0}",
                    explanation: "This language requires counting and matching equal numbers of a's and b's, which cannot be done by finite automata."
                },
                {
                    question: "What is ε-closure in NFA?",
                    type: "Definition",
                    answer: "The set of all states reachable from a given state using only ε-transitions",
                    explanation: "ε-closure is crucial for NFA to DFA conversion and determines all states accessible without consuming input."
                },
                {
                    question: "Convert the NFA with states {q0, q1, q2} and transitions δ(q0,a)={q0,q1}, δ(q1,b)={q2} to DFA.",
                    type: "Construction",
                    answer: "DFA states: {q0}, {q0,q1}, {q2}, ∅. Transitions computed using subset construction algorithm.",
                    explanation: "Use subset construction: each DFA state represents a set of NFA states, compute transitions for all possible input symbols."
                },
                {
                    question: "What is the time complexity of DFA string acceptance?",
                    type: "Complexity",
                    options: [
                        "O(n) where n is string length",
                        "O(n²)",
                        "O(2^n)",
                        "O(n log n)"
                    ],
                    answer: "O(n) where n is string length",
                    explanation: "DFA processes each character exactly once, making string acceptance linear in input length."
                },
                {
                    question: "Which operation is NOT closed for regular languages?",
                    type: "Theory",
                    options: [
                        "Intersection",
                        "Union", 
                        "Complement",
                        "Exponentiation"
                    ],
                    answer: "Exponentiation",
                    explanation: "Regular languages are closed under union, intersection, and complement, but not under exponentiation."
                },
                {
                    question: "What is the minimum number of states needed for a DFA accepting strings over {a,b} with an even number of a's?",
                    type: "Analysis",
                    answer: "2 states - one for even count, one for odd count",
                    explanation: "We only need to track the parity (even/odd) of the number of a's seen so far."
                },
                {
                    question: "Explain the relationship between regular expressions and finite automata.",
                    type: "Theory",
                    answer: "Regular expressions and finite automata are equivalent in expressive power - every regular expression can be converted to an FA and vice versa",
                    explanation: "This equivalence is fundamental to automata theory and is proven through Thompson's construction and state elimination methods."
                },
                {
                    question: "What is a regular grammar?",
                    type: "Definition",
                    answer: "A Type-3 grammar where productions are of the form A → aB or A → a (right-linear) or A → Ba or A → a (left-linear)",
                    explanation: "Regular grammars generate exactly the regular languages and correspond to finite automata."
                }
            ],
            '2': [
                {
                    question: "What is lexical analysis in compiler design?",
                    type: "Definition",
                    answer: "The first phase of compilation that breaks source code into tokens and removes whitespace and comments",
                    explanation: "Lexical analysis (scanning) converts the character stream into a token stream for parsing."
                },
                {
                    question: "What is a token in lexical analysis?",
                    type: "Definition",
                    options: [
                        "A meaningful unit like identifier, keyword, or operator",
                        "A single character",
                        "A line of source code",
                        "An error message"
                    ],
                    answer: "A meaningful unit like identifier, keyword, or operator",
                    explanation: "Tokens are the basic building blocks that represent meaningful elements in the source language."
                },
                {
                    question: "What is a context-free grammar (CFG)?",
                    type: "Definition",
                    answer: "A formal grammar where each production rule has a single non-terminal on the left side",
                    explanation: "CFGs are more powerful than regular grammars and can describe most programming language constructs."
                },
                {
                    question: "What is ambiguity in grammars?",
                    type: "Theory",
                    answer: "A grammar is ambiguous if there exists a string that has more than one parse tree",
                    explanation: "Ambiguity makes parsing difficult as there's no unique way to interpret the string."
                },
                {
                    question: "What is the difference between LL(1) and LR(1) parsing?",
                    type: "Compare",
                    answer: "LL(1) is top-down parsing with 1 lookahead, LR(1) is bottom-up parsing with 1 lookahead",
                    explanation: "LL builds parse tree from root to leaves, LR builds from leaves to root."
                },
                {
                    question: "What does LL(1) mean?",
                    type: "Definition",
                    options: [
                        "Left-to-right, Leftmost derivation, 1 lookahead",
                        "Left-to-right, Left-associative, 1 token",
                        "Low-level, Linear, 1 pass",
                        "Lexical, Logical, 1 symbol"
                    ],
                    answer: "Left-to-right, Leftmost derivation, 1 lookahead",
                    explanation: "LL(1) describes the parsing strategy: scan left-to-right, construct leftmost derivation, use 1 symbol lookahead."
                },
                {
                    question: "What is a parse tree?",
                    type: "Definition",
                    answer: "A tree representation of the syntactic structure of a string according to a grammar",
                    explanation: "Parse trees show how a string is derived from the start symbol using grammar productions."
                },
                {
                    question: "What is the FIRST set in LL(1) parsing?",
                    type: "Definition",
                    answer: "The set of terminals that can appear at the beginning of strings derivable from a non-terminal",
                    explanation: "FIRST sets help determine which production to choose during predictive parsing."
                },
                {
                    question: "What is the FOLLOW set in LL(1) parsing?",
                    type: "Definition",
                    answer: "The set of terminals that can appear immediately after a non-terminal in some derivation",
                    explanation: "FOLLOW sets are needed to handle ε-productions in predictive parsing."
                },
                {
                    question: "What is left recursion and why is it problematic for LL parsers?",
                    type: "Problem",
                    answer: "Left recursion occurs when A ⇒* Aα. LL parsers enter infinite loops on left-recursive grammars",
                    explanation: "LL parsers try to expand the leftmost non-terminal first, leading to infinite recursion."
                },
                {
                    question: "How do you eliminate left recursion?",
                    type: "Algorithm",
                    answer: "Transform A → Aα | β into A → βA', A' → αA' | ε",
                    explanation: "This transformation converts left recursion to right recursion while preserving the language."
                },
                {
                    question: "What is a lexeme?",
                    type: "Definition",
                    answer: "A sequence of characters in the source program that matches the pattern for a token",
                    explanation: "Lexemes are the actual character sequences that get classified as tokens during scanning."
                }
            ],
            '3': [
                {
                    question: "What is bottom-up parsing?",
                    type: "Definition",
                    answer: "A parsing technique that constructs parse trees from leaves to root using reductions",
                    explanation: "Bottom-up parsers try to reduce the input string to the start symbol by applying productions in reverse."
                },
                {
                    question: "What is an LR parser?",
                    type: "Definition",
                    answer: "Left-to-right, Rightmost derivation parser that uses a stack and parsing table",
                    explanation: "LR parsers are more powerful than LL parsers and can handle more grammars."
                },
                {
                    question: "What is the difference between SLR, LALR, and LR(1)?",
                    type: "Compare",
                    answer: "SLR uses FOLLOW sets, LALR merges LR(1) states, LR(1) has most power but largest tables",
                    explanation: "These are different methods for constructing LR parsing tables with trade-offs between power and table size."
                },
                {
                    question: "What is YACC?",
                    type: "Tool",
                    answer: "Yet Another Compiler Compiler - a parser generator that creates LALR(1) parsers from grammar specifications",
                    explanation: "YACC takes a grammar description and generates C code for a parser."
                },
                {
                    question: "What is syntax-directed translation?",
                    type: "Definition",
                    answer: "A method where semantic actions are associated with grammar productions to perform translation during parsing",
                    explanation: "SDT allows computation of values and generation of code during the parsing process."
                },
                {
                    question: "What is an S-attributed grammar?",
                    type: "Definition",
                    answer: "A grammar where all attributes are synthesized (computed from children's attributes)",
                    explanation: "S-attributed grammars can be evaluated during bottom-up parsing."
                },
                {
                    question: "What is an L-attributed grammar?",
                    type: "Definition",
                    answer: "A grammar where inherited attributes depend only on left siblings and parent",
                    explanation: "L-attributed grammars can be evaluated during top-down parsing."
                },
                {
                    question: "What is an Abstract Syntax Tree (AST)?",
                    type: "Definition",
                    answer: "A tree representation of the syntactic structure that omits unnecessary syntactic details",
                    explanation: "ASTs are more compact than parse trees and focus on the essential structure."
                },
                {
                    question: "What is intermediate code?",
                    type: "Definition",
                    answer: "An abstract machine-independent representation of the source program",
                    explanation: "Intermediate code facilitates optimization and retargeting to different machines."
                },
                {
                    question: "What is a handle in LR parsing?",
                    type: "Definition",
                    answer: "A substring that matches the right-hand side of a production and can be reduced",
                    explanation: "Finding handles is the key challenge in bottom-up parsing."
                },
                {
                    question: "What causes shift-reduce conflicts?",
                    type: "Problem",
                    answer: "Ambiguity in deciding whether to shift the next token or reduce the current handle",
                    explanation: "These conflicts indicate that the grammar is not suitable for the parsing method."
                },
                {
                    question: "What is the goto function in LR parsing?",
                    type: "Definition",
                    answer: "A function that determines the next state after reducing by a production",
                    explanation: "The goto function is part of the LR parsing table used after reductions."
                }
            ],
            '4': [
                {
                    question: "What is the Chomsky hierarchy?",
                    type: "Theory",
                    answer: "A classification of formal languages: Type 0 (unrestricted), Type 1 (context-sensitive), Type 2 (context-free), Type 3 (regular)",
                    explanation: "Each type is a proper subset of the previous type, with increasing restrictions on grammar productions."
                },
                {
                    question: "What is type checking?",
                    type: "Definition",
                    answer: "The process of verifying that operations are applied to operands of compatible types",
                    explanation: "Type checking helps catch errors and ensures program correctness."
                },
                {
                    question: "What is static vs dynamic typing?",
                    type: "Compare",
                    answer: "Static typing checks types at compile time, dynamic typing checks types at runtime",
                    explanation: "Static typing catches errors early but is less flexible; dynamic typing is more flexible but may have runtime errors."
                },
                {
                    question: "What is type coercion?",
                    type: "Definition",
                    answer: "Automatic conversion between data types to make operations compatible",
                    explanation: "Type coercion allows operations between different but compatible types."
                },
                {
                    question: "What is function overloading?",
                    type: "Definition",
                    answer: "Defining multiple functions with the same name but different parameter types or counts",
                    explanation: "Overloading allows the same function name to perform different operations based on arguments."
                },
                {
                    question: "What is type equivalence?",
                    type: "Theory",
                    answer: "The rules for determining when two type expressions represent the same type",
                    explanation: "Type equivalence can be structural (same structure) or nominal (same name)."
                },
                {
                    question: "What is a context-sensitive language?",
                    type: "Definition",
                    answer: "A language generated by a context-sensitive grammar where production rules can depend on context",
                    explanation: "Context-sensitive languages are recognized by linear bounded automata."
                },
                {
                    question: "What is the difference between strong and weak typing?",
                    type: "Compare",
                    answer: "Strong typing prevents type errors strictly, weak typing allows more implicit conversions",
                    explanation: "Strong typing provides better error detection but may require more explicit conversions."
                },
                {
                    question: "What is polymorphism in type systems?",
                    type: "Definition",
                    answer: "The ability of a single interface to represent different underlying data types",
                    explanation: "Polymorphism allows code reuse and flexibility in type systems."
                },
                {
                    question: "What is a type environment?",
                    type: "Definition",
                    answer: "A mapping from identifiers to their types at a given point in the program",
                    explanation: "Type environments track variable types during type checking."
                },
                {
                    question: "What is generic programming?",
                    type: "Concept",
                    answer: "Writing code that works with multiple types through parameterization",
                    explanation: "Generics allow type-safe code reuse without sacrificing performance."
                },
                {
                    question: "What is subtyping?",
                    type: "Definition",
                    answer: "A relationship between types where one type can be used wherever another is expected",
                    explanation: "Subtyping enables polymorphism and code reuse in object-oriented languages."
                }
            ],
            '5': [
                {
                    question: "What is storage organization in compilers?",
                    type: "Definition",
                    answer: "The arrangement of data structures in memory during program execution",
                    explanation: "Storage organization includes stack, heap, static, and code segments."
                },
                {
                    question: "What is an activation record?",
                    type: "Definition",
                    answer: "A data structure containing information about a function call, including parameters, local variables, and return address",
                    explanation: "Activation records are typically stored on the runtime stack."
                },
                {
                    question: "What is code optimization?",
                    type: "Definition",
                    answer: "The process of transforming code to improve performance while preserving semantics",
                    explanation: "Optimization can target speed, memory usage, or other metrics."
                },
                {
                    question: "What is peephole optimization?",
                    type: "Definition",
                    answer: "A local optimization technique that examines small sequences of instructions to find improvement opportunities",
                    explanation: "Peephole optimization looks at a small window of instructions for patterns to optimize."
                },
                {
                    question: "What is data flow analysis?",
                    type: "Definition",
                    answer: "Analysis of how data flows through a program to enable optimizations",
                    explanation: "Data flow analysis tracks the flow of values through variables in the program."
                },
                {
                    question: "What is live variable analysis?",
                    type: "Analysis",
                    answer: "Determining which variables may be used before being redefined",
                    explanation: "Live variables must be kept in registers or memory for future use."
                },
                {
                    question: "What is dead code elimination?",
                    type: "Optimization",
                    answer: "Removing code that does not affect the program's output",
                    explanation: "Dead code elimination reduces program size and may improve performance."
                },
                {
                    question: "What is constant propagation?",
                    type: "Optimization",
                    answer: "Replacing variables with their constant values when known at compile time",
                    explanation: "Constant propagation can enable further optimizations like constant folding."
                },
                {
                    question: "What is loop optimization?",
                    type: "Optimization",
                    answer: "Techniques to improve performance of loops, such as loop unrolling and invariant code motion",
                    explanation: "Loop optimization is crucial since loops often consume most execution time."
                },
                {
                    question: "What is register allocation?",
                    type: "Definition",
                    answer: "Assigning program variables to processor registers to minimize memory accesses",
                    explanation: "Effective register allocation significantly improves program performance."
                },
                {
                    question: "What is static vs dynamic allocation?",
                    type: "Compare",
                    answer: "Static allocation assigns memory at compile time, dynamic allocation assigns memory at runtime",
                    explanation: "Static allocation is faster but less flexible; dynamic allocation is flexible but has runtime overhead."
                },
                {
                    question: "What is garbage collection?",
                    type: "Definition",
                    answer: "Automatic memory management that reclaims memory occupied by objects no longer reachable",
                    explanation: "Garbage collection prevents memory leaks but adds runtime overhead."
                }
            ],
            '6': [
                {
                    question: "What is code generation in compilers?",
                    type: "Definition",
                    answer: "The final phase that translates intermediate code into target machine code",
                    explanation: "Code generation must handle instruction selection, register allocation, and instruction scheduling."
                },
                {
                    question: "What is instruction selection?",
                    type: "Definition",
                    answer: "Choosing the best target machine instructions to implement intermediate code operations",
                    explanation: "Good instruction selection can significantly impact code quality and performance."
                },
                {
                    question: "What is register allocation?",
                    type: "Process",
                    answer: "Assigning program variables and temporaries to a limited number of machine registers",
                    explanation: "Register allocation is crucial for performance as register access is much faster than memory."
                },
                {
                    question: "What is a Directed Acyclic Graph (DAG)?",
                    type: "Data Structure",
                    answer: "A graph representation of expressions that eliminates redundancy by sharing common subexpressions",
                    explanation: "DAGs help identify optimization opportunities and generate efficient code."
                },
                {
                    question: "What is register spilling?",
                    type: "Problem",
                    answer: "Storing register contents to memory when there are insufficient registers available",
                    explanation: "Spilling is necessary but reduces performance, so minimizing spills is important."
                },
                {
                    question: "What is instruction scheduling?",
                    type: "Optimization",
                    answer: "Reordering instructions to minimize pipeline stalls and maximize processor utilization",
                    explanation: "Good scheduling can hide memory latency and improve instruction-level parallelism."
                },
                {
                    question: "What is the difference between local and global optimization?",
                    type: "Compare",
                    answer: "Local optimization works within basic blocks, global optimization works across basic blocks",
                    explanation: "Global optimization is more complex but can achieve better results."
                },
                {
                    question: "What is a basic block?",
                    type: "Definition",
                    answer: "A maximal sequence of consecutive instructions with one entry point and one exit point",
                    explanation: "Basic blocks are the unit of analysis for many optimization algorithms."
                },
                {
                    question: "What is control flow analysis?",
                    type: "Analysis",
                    answer: "Analysis of the possible execution paths through a program",
                    explanation: "Control flow analysis is fundamental for many optimizations and transformations."
                },
                {
                    question: "What is machine-dependent vs machine-independent code generation?",
                    type: "Compare",
                    answer: "Machine-dependent considers target architecture specifics, machine-independent generates generic code",
                    explanation: "Machine-dependent generation produces better code but requires more compiler complexity."
                },
                {
                    question: "What is address calculation?",
                    type: "Process",
                    answer: "Computing memory addresses for array elements and record fields at runtime",
                    explanation: "Efficient address calculation is important for array and structure access performance."
                },
                {
                    question: "What is object code optimization?",
                    type: "Definition",
                    answer: "Final optimizations performed on the generated machine code",
                    explanation: "Object code optimization can improve performance beyond what higher-level optimizations achieve."
                }
            ]
        };
        
        return questionSets[unit] || [];
    }
    
    openQuestion(unit, index) {
        const questions = this.getQuestionsForUnit(unit);
        const question = questions[index];
        
        if (!question) return;
        
        this.currentQuestionSet = questions;
        this.currentQuestionIndex = index;
        
        this.displayQuestionModal(question, index + 1, questions.length);
    }
    
    displayQuestionModal(question, questionNum, totalQuestions) {
        const modal = document.getElementById('question-modal');
        const title = document.getElementById('modal-question-title');
        const content = document.getElementById('modal-question-content');
        const options = document.getElementById('modal-question-options');
        const answer = document.getElementById('modal-question-answer');
        
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
        document.getElementById('show-answer-btn').classList.remove('hidden');
        document.getElementById('next-question-btn').classList.add('hidden');
        
        // Show modal
        modal.classList.remove('hidden');
    }
    
    generateQuickQuiz() {
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
    const answer = document.getElementById('modal-question-answer');
    const question = app.currentQuestionSet[app.currentQuestionIndex];
    
    answer.innerHTML = `
        <h4>Answer:</h4>
        <p><strong>${question.answer}</strong></p>
        ${question.explanation ? `<p><em>Explanation:</em> ${question.explanation}</p>` : ''}
    `;
    
    answer.classList.remove('hidden');
    document.getElementById('show-answer-btn').classList.add('hidden');
    document.getElementById('next-question-btn').classList.remove('hidden');
    
    // Update progress
    const currentUnit = app.currentUnit;
    if (currentUnit !== 'overview' && currentUnit !== 'tools') {
        app.progress[`unit-${currentUnit}`] = Math.min(100, (app.progress[`unit-${currentUnit}`] || 0) + 5);
        app.updateProgressDisplay();
        app.loadSidebarContent();
    }
}

function nextQuestion() {
    app.currentQuestionIndex = (app.currentQuestionIndex + 1) % app.currentQuestionSet.length;
    const question = app.currentQuestionSet[app.currentQuestionIndex];
    app.displayQuestionModal(question, app.currentQuestionIndex + 1, app.currentQuestionSet.length);
}

function closeModal() {
    document.getElementById('question-modal').classList.add('hidden');
}

// Tool functions
function testRegex() {
    const regexInput = document.getElementById('regex-input').value;
    const testString = document.getElementById('regex-test-string').value;
    const result = document.getElementById('regex-result');
    
    try {
        const regex = new RegExp(regexInput);
        const matches = regex.test(testString);
        
        result.className = `result-display ${matches ? 'success' : 'error'}`;
        result.textContent = matches ? 
            `✓ String "${testString}" matches the pattern "${regexInput}"` :
            `✗ String "${testString}" does not match the pattern "${regexInput}"`;
    } catch (e) {
        result.className = 'result-display error';
        result.textContent = `Error: Invalid regular expression - ${e.message}`;
    }
}

function validateGrammar() {
    const grammarInput = document.getElementById('grammar-input').value;
    const result = document.getElementById('grammar-result');
    
    if (!grammarInput.trim()) {
        result.className = 'result-display error';
        result.textContent = 'Please enter grammar rules';
        return;
    }
    
    const rules = grammarInput.split('\n').filter(rule => rule.trim());
    const nonTerminals = new Set();
    const terminals = new Set();
    let hasStartSymbol = false;
    
    try {
        for (let rule of rules) {
            if (!rule.includes('->')) {
                throw new Error(`Invalid rule format: ${rule}`);
            }
            
            const [left, right] = rule.split('->').map(s => s.trim());
            if (!left || !right) {
                throw new Error(`Invalid rule: ${rule}`);
            }
            
            nonTerminals.add(left);
            if (!hasStartSymbol) hasStartSymbol = true;
            
            // Simple analysis for terminals/non-terminals
            for (let symbol of right.split(' ').filter(s => s.trim())) {
                if (symbol !== '|' && symbol !== 'ε') {
                    if (symbol.length === 1 && symbol >= 'a' && symbol <= 'z') {
                        terminals.add(symbol);
                    } else if (symbol.length === 1 && symbol >= 'A' && symbol <= 'Z') {
                        nonTerminals.add(symbol);
                    }
                }
            }
        }
        
        result.className = 'result-display success';
        result.innerHTML = `
            ✓ Grammar appears valid<br>
            Non-terminals: {${Array.from(nonTerminals).join(', ')}}<br>
            Terminals: {${Array.from(terminals).join(', ')}}<br>
            Rules: ${rules.length}
        `;
    } catch (e) {
        result.className = 'result-display error';
        result.textContent = `Grammar validation error: ${e.message}`;
    }
}

function generateQuiz() {
    const unitSelect = document.getElementById('quiz-unit-select');
    const selectedUnit = unitSelect.value;
    const result = document.getElementById('quiz-result');
    
    const questions = app.getQuestionsForUnit(selectedUnit);
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
        app.currentQuestionSet = questions;
        app.currentQuestionIndex = questions.indexOf(randomQuestion);
        app.displayQuestionModal(randomQuestion, 1, 1);
    };
}

function searchGlossary() {
    const searchTerm = document.getElementById('glossary-search').value.toLowerCase();
    const result = document.getElementById('glossary-result');
    
    const glossary = {
        'dfa': 'Deterministic Finite Automaton - A finite state machine with exactly one transition for each state-symbol pair',
        'nfa': 'Non-deterministic Finite Automaton - A finite state machine that allows multiple transitions for the same input',
        'cfg': 'Context-Free Grammar - A formal grammar where each production has a single non-terminal on the left side',
        'token': 'A meaningful unit in lexical analysis representing keywords, identifiers, operators, etc.',
        'ast': 'Abstract Syntax Tree - A tree representation of the syntactic structure omitting unnecessary details',
        'lr': 'Left-to-right, Rightmost derivation - A bottom-up parsing technique',
        'll': 'Left-to-right, Leftmost derivation - A top-down parsing technique',
        'yacc': 'Yet Another Compiler Compiler - A parser generator for LALR(1) grammars',
        'lexeme': 'A sequence of characters in source code that matches the pattern for a token',
        'chomsky': 'Chomsky Hierarchy - Classification of formal languages into four types',
        'optimization': 'The process of improving code performance while preserving semantics',
        'dag': 'Directed Acyclic Graph - A graph representation that eliminates redundant computations'
    };
    
    const definition = glossary[searchTerm] || 
        Object.entries(glossary).find(([term]) => term.includes(searchTerm))?.[1];
    
    if (definition) {
        result.className = 'result-display success';
        result.textContent = definition;
    } else {
        result.className = 'result-display error';
        result.textContent = `No definition found for "${searchTerm}"`;
    }
}

// Initialize the application
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new AutomataLearningApp();
    
    // Close modal when clicking outside
    document.getElementById('question-modal').addEventListener('click', (e) => {
        if (e.target.id === 'question-modal') {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('question-modal');
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'Enter') {
                const showBtn = document.getElementById('show-answer-btn');
                const nextBtn = document.getElementById('next-question-btn');
                if (!showBtn.classList.contains('hidden')) {
                    showAnswer();
                } else if (!nextBtn.classList.contains('hidden')) {
                    nextQuestion();
                }
            }
        }
    });
});