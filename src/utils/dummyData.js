export const allCourseData = [
  {
    id: 1,
    title: "Python for Beginners",
    category: "Programming",
    level: "Beginner",
    duration: "6h",
    instructor: "Sarah Johnson",
    progress: 0,
    description: "Start your programming journey with Python fundamentals.",
    modules: [
      {
        id: 1,
        title: "Introduction to Python",
        content: [
          {
            type: "theory",
            title: "Getting Started with Python",
            details:
              "Learn Python's history, syntax, indentation, and basic I/O operations. Topics include print statements, comments, and basic data types.",
            completed: true,
          },
          {
            type: "quiz",
            title: "Python Basics Quiz",
            questions: [
              {
                question: "Which symbol starts a comment?",
                options: ["#", "//", "/**"],
                answer: "#",
              },
              {
                question: "What is print(5 + 2)?",
                options: ["5", "7", "52"],
                answer: "7",
              },
              {
                question: "How do you create a variable?",
                options: ["x = 5", "let x = 5", "var x = 5"],
                answer: "x = 5",
              },
              {
                question: "What is output for print('Hello' + 'World')?",
                options: ["Hello World", "HelloWorld", "Error"],
                answer: "HelloWorld",
              },
            ],
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Data Types and Variables",
        content: [
          {
            type: "theory",
            title: "Understanding Variables",
            details:
              "Covers integers, floats, strings, and booleans. Learn declaration, initialization, and basic arithmetic operations.",
            completed: false,
          },
          {
            type: "interactive",
            title: "Variable Practice",
            description:
              "Practice creating and manipulating variables. Try arithmetic, string concatenation, and type conversions.",
            task: "Create variables 'a' as 10, 'b' as 5.5, and 'name' as 'John'. Experiment with arithmetic and concatenation.",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Essentials",
    category: "Programming",
    level: "Beginner",
    duration: "5h",
    instructor: "David Lee",
    progress: 20,
    description: "Learn JavaScript basics for web development.",
    modules: [
      {
        id: 1,
        title: "JavaScript Basics",
        content: [
          {
            type: "theory",
            title: "Intro to JavaScript",
            details:
              "Learn JavaScript's purpose, where it runs, and basic syntax like variables, data types, and operators.",
            completed: true,
          },
          {
            type: "quiz",
            title: "JavaScript Basics Quiz",
            questions: [
              {
                question: "Keyword to declare a variable?",
                options: ["let", "var", "const", "all of the above"],
                answer: "all of the above",
              },
              {
                question: "Console output method?",
                options: ["console.log()", "print()", "alert()"],
                answer: "console.log()",
              },
              {
                question: "Symbol for concatenation?",
                options: ["+", "*", "&"],
                answer: "+",
              },
              {
                question: "Syntax for if condition?",
                options: [
                  "if (x > 5) { ... }",
                  "if x > 5 { ... }",
                  "if x > 5 then ...",
                ],
                answer: "if (x > 5) { ... }",
              },
            ],
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Functions and Scope",
        content: [
          {
            type: "theory",
            title: "Understanding Functions",
            details:
              "Covers syntax for function declarations, expressions, arrow functions, and scope in JavaScript.",
            completed: false,
          },
          {
            type: "interactive",
            title: "Function Practice",
            description:
              "Create a function to calculate the square of a number. Test with multiple inputs.",
            task: "Write function 'square' to return the square of a number. Test with various values.",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    category: "DataScience",
    level: "Intermediate",
    duration: "10h",
    instructor: "Emily Rodriguez",
    progress: 60,
    description: "Learn core machine learning concepts and algorithms.",
    modules: [
      {
        id: 1,
        title: "Supervised Learning",
        content: [
          {
            type: "theory",
            title: "Basics of Supervised Learning",
            details:
              "Introduction to supervised learning, labeled data, training/testing, and algorithms like linear regression and decision trees.",
            completed: true,
          },
          {
            type: "quiz",
            title: "Supervised Learning Quiz",
            questions: [
              {
                question: "What is supervised learning?",
                options: ["Labeled data", "Unlabeled data"],
                answer: "Labeled data",
              },
              {
                question: "Algorithm for regression?",
                options: ["K-Means", "Linear Regression", "PCA"],
                answer: "Linear Regression",
              },
              {
                question: "Purpose of test set?",
                options: [
                  "Train model",
                  "Evaluate performance",
                  "Preprocess data",
                ],
                answer: "Evaluate performance",
              },
            ],
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Unsupervised Learning",
        content: [
          {
            type: "theory",
            title: "Intro to Unsupervised Learning",
            details:
              "Learn unsupervised learning, its applications, and algorithms like clustering and dimensionality reduction.",
            completed: false,
          },
          {
            type: "interactive",
            title: "K-Means Practice",
            description:
              "Implement K-means with a sample dataset. Try different cluster numbers and analyze the results.",
            task: "Cluster data points into 3 clusters using K-means. Observe centroids and boundaries.",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Deep Learning with PyTorch",
    category: "DataScience",
    level: "Advanced",
    duration: "12h",
    instructor: "Mark Kim",
    progress: 0,
    description: "Master deep learning with PyTorch and neural networks.",
    modules: [
      {
        id: 1,
        title: "Neural Networks Basics",
        content: [
          {
            type: "theory",
            title: "Intro to Neural Networks",
            details:
              "Covers basics of neural networks, activation functions, and neural layers.",
            completed: false,
          },
          {
            type: "quiz",
            title: "Neural Networks Quiz",
            questions: [
              {
                question: "What is an activation function?",
                options: ["A function for neurons", "A weight initializer"],
                answer: "A function for neurons",
              },
              {
                question: "Common activation function?",
                options: ["Sigmoid", "Square Root"],
                answer: "Sigmoid",
              },
            ],
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Working with PyTorch",
        content: [
          {
            type: "theory",
            title: "Getting Started with PyTorch",
            details:
              "Introduction to PyTorch, its features, and how to use tensors.",
            completed: false,
          },
          {
            type: "interactive",
            title: "Building Networks with PyTorch",
            description:
              "Create a simple neural network model and observe its performance on sample data.",
            task: "Build and test a basic neural network in PyTorch using a sample dataset.",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Advanced SQL Mastery",
    category: "Databases",
    level: "Advanced",
    duration: "8h",
    instructor: "Michael Chen",
    progress: 30,
    description: "Master complex SQL queries and database optimization.",
    modules: [
      {
        id: 1,
        title: "SQL Joins and Optimization",
        content: [
          {
            type: "theory",
            title: "Mastering Joins",
            details:
              "Advanced joins, including INNER, LEFT, RIGHT, and FULL JOIN. Practice with complex data structures.",
            completed: true,
          },
          {
            type: "quiz",
            title: "SQL Joins Quiz",
            questions: [
              {
                question: "What is an INNER JOIN?",
                options: ["Match records", "All records from one table"],
                answer: "Match records",
              },
              {
                question: "Difference between LEFT and RIGHT JOIN?",
                options: ["Columns matched", "Unmatched rows"],
                answer: "Unmatched rows",
              },
            ],
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Indexing Techniques",
        content: [
          {
            type: "theory",
            title: "Optimizing with Indexes",
            details:
              "Covers indexing, query optimization, and tips for efficient queries.",
            completed: false,
          },
          {
            type: "interactive",
            title: "Index Optimization Practice",
            description:
              "Practice creating indexes and test query performance before and after indexing.",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 5, // replace with generated UUID
    title: "Advanced SQL Mastery",
    category: "Databases",
    level: "Advanced",
    duration: "8h",
    instructor: "Michael Chen",
    progress: 30,
    description: "Master complex SQL queries and database optimization.",
    modules: [
      {
        id: 1,
        title: "SQL Joins and Optimization",
        content: [
          { type: "theory", title: "Mastering Joins", completed: true },
          {
            type: "quiz",
            title: "SQL Joins Quiz",
            questions: [
              {
                question: "What is an INNER JOIN?",
                options: [
                  "Combines records with a match",
                  "All records from one table",
                ],
                answer: "Combines records with a match",
              },
            ],
            completed: true,
          },
        ],
      },
      {
        id: 2,
        title: "Indexing Techniques",
        content: [
          {
            type: "theory",
            title: "Optimizing with Indexes",
            completed: false,
          },
          {
            type: "interactive",
            title: "Index Optimization Practice",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 6, // replace with generated UUID
    title: "AWS Cloud Practitioner",
    category: "Cloud",
    level: "Beginner",
    duration: "6h",
    instructor: "Ava Patel",
    progress: 0,
    description: "Get started with AWS cloud services.",
    modules: [
      {
        id: 1,
        title: "Introduction to AWS",
        content: [
          { type: "theory", title: "AWS Core Services", completed: false },
          {
            type: "quiz",
            title: "AWS Basics Quiz",
            questions: [
              {
                question: "What does EC2 stand for?",
                options: ["Elastic Compute Cloud", "Elastic Container Cloud"],
                answer: "Elastic Compute Cloud",
              },
            ],
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 7, // replace with generated UUID
    title: "Introduction to Excel",
    category: "Business",
    level: "Beginner",
    duration: "3h",
    instructor: "Rachel Adams",
    progress: 70,
    description: "Learn Excel basics for data management.",
    modules: [
      {
        id: 1,
        title: "Getting Started with Excel",
        content: [
          { type: "theory", title: "Excel Basics", completed: true },
          {
            type: "quiz",
            title: "Excel Quiz",
            questions: [
              {
                question: "What is a cell?",
                options: ["Single data point", "Multiple columns"],
                answer: "Single data point",
              },
            ],
            completed: true,
          },
        ],
      },
    ],
  },
  {
    id: 8, // replace with generated UUID
    title: "AI with ChatGPT",
    category: "AI",
    level: "Intermediate",
    duration: "4h",
    instructor: "John Doe",
    progress: 50,
    description: "Explore AI applications using ChatGPT.",
    modules: [
      {
        id: 1,
        title: "ChatGPT Basics",
        content: [
          { type: "theory", title: "Intro to ChatGPT", completed: true },
          {
            type: "quiz",
            title: "ChatGPT Quiz",
            questions: [
              {
                question: "What is ChatGPT?",
                options: ["AI Chatbot", "Image recognition tool"],
                answer: "AI Chatbot",
              },
            ],
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 9, // replace with generated UUID
    title: "G1 Driving License Preparation",
    category: "DrivingLicense",
    level: "Beginner",
    duration: "2h",
    instructor: "Karen Smith",
    progress: 0,
    description: "Prepare for the G1 written driving test.",
    modules: [
      {
        id: 1,
        title: "Rules of the Road",
        content: [
          { type: "theory", title: "Basic Road Rules", completed: false },
          {
            type: "quiz",
            title: "Road Rules Quiz",
            questions: [
              {
                question: "What does a red octagon sign mean?",
                options: ["Stop", "Yield"],
                answer: "Stop",
              },
            ],
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: 10, // replace with generated UUID
    title: "G2 Driving Skills and Road Test Prep",
    category: "DrivingLicense",
    level: "Intermediate",
    duration: "3h",
    instructor: "Tom Blake",
    progress: 0,
    description: "Build driving skills for the G2 road test.",
    modules: [
      {
        id: 1,
        title: "Parking Techniques",
        content: [
          {
            type: "theory",
            title: "Parallel Parking Basics",
            completed: false,
          },
          {
            type: "quiz",
            title: "Parking Quiz",
            questions: [
              {
                question: "What is the safest way to exit a parking spot?",
                options: ["Reverse slowly", "Accelerate quickly"],
                answer: "Reverse slowly",
              },
            ],
            completed: false,
          },
        ],
      },
    ],
  },
];
