const mockInterviewReport = {
    jobDescription: "Senior Backend Engineer specializing in Node.js, distributed architectures, and performance optimization with MongoDB and Redis. Required to work on scaling critical services and API designs.",
    
    resumeText: "Software Developer Intern at ElasticRun. Built full-stack features using React, Node.js, and Java Spring Boot. Optimized PostgreSQL queries and integrated application features in an Agile environment.",
    
    selfDescription: "Passionate full-stack engineer focusing heavily on backend architectures, building fast APIs, and solving performance challenges in database engines.",

    matchScore: 85,

    technicalQuestions: [
        {
            question: "Explain the Node.js event loop and its role in handling asynchronous operations. How would you ensure optimal performance for I/O-bound tasks vs CPU-bound tasks?",
            intention: "This question assesses the candidate's fundamental understanding of Node.js's execution model, critical for high-performance backend development. It probes knowledge of non-blocking I/O and how to mitigate bottlenecks.",
            answer: "### Approach\nStart by defining the single-threaded nature of the event loop. Differentiate clearly between standard I/O tasks and heavy computation tasks.\n\n### Key Concepts\n- **Phases**: Timers, I/O callbacks, poll, check (setImmediate), close.\n- **Queues**: Microtask Queue (process.nextTick, Promises) executes before Macrotask queues.\n- **Libuv**: The underlying C++ library providing the thread pool for file/network I/O.\n\n### Experiences to Highlight\nDiscuss your multi-vendor e-commerce project where non-blocking MongoDB queries kept the API fast under parallel user registration load.\n\n### Common Mistakes to Avoid\n- Confusing the event loop with traditional multi-threading.\n- Forgetting that long loops or JSON processing blocks the entire server thread.\n\n### Ideal Structure\n1. Definition & Core Loop Mechanics.\n2. Dealing with I/O (Database pooling, streams).\n3. Dealing with CPU (Worker Threads, offloading to microservices)."
        },
        {
            question: "Describe your systematic approach to identifying and optimizing a consistently slow MongoDB query for fetching complex user profiles.",
            intention: "Evaluates production analytical skills, usage of query profiling tools, and indexing knowledge specific to MongoDB.",
            answer: "### Approach\nWalk through a clinical diagnostic flow: Monitor -> Analyze -> Index/Refactor -> Verify.\n\n### Key Concepts\n- **explain('executionStats')**: Looking for IXSCAN vs COLLSCAN (Collection Scans).\n- **Indexes**: Compound indexes (following the Equality, Sort, Range rule), Covered queries.\n- **Aggregation**: Moving `$match` stages to the very top of the pipeline.\n\n### Experiences to Highlight\nMention how you profiled analytical read paths in previous projects to introduce targeted compound indexes, dropping execution times significantly.\n\n### Common Mistakes to Avoid\n- Blindly throwing indexes at the collection without tracking index memory footprint.\n- Forgetting projections (`$project`), which unnecessarily forces MongoDB to pull documents entirely into RAM."
        }
    ],

    behavioralQuestions: [
        {
            question: "Tell me about a time you had to integrate an application with a microservice system and faced data inconsistencies or contract changes.",
            intention: "Evaluates cross-team communication, adaptability, distributed debugging abilities, and ownership in an Agile environment.",
            answer: "### Approach\nUtilize a structured STAR response. Define the boundary breakdown between the services and how your fix established robust communication.\n\n### Key Concepts\n- **Idempotency**: Ensuring retried API requests do not duplicate state changes.\n- **API Contracts**: Utilizing tools like Postman or Swagger to safely map schemas.\n\n### Mistakes to Avoid\nBlaming the other team. Focus entirely on how you collaborated horizontally to solve the business issue."
        }
    ],

    skillGaps: [
        {
            skill: "Redis Caching",
            severity: "medium"
        },
        {
            skill: "Docker Containerization",
            severity: "low"
        }
    ],
    
    preparationPlan: [
        {
            day: 1,
            focus: "Advanced Database Query Tuning",
            tasks: [
                "Review MongoDB execution plans via .explain() logs.",
                "Solve 3 optimization challenges regarding compound index strategies."
            ]
        },
        {
            day: 2,
            focus: "Caching Strategies & Distributed Operations",
            tasks: [
                "Implement a standalone Cache-Aside pattern middleware using a local Node-Redis client library setup.",
                "Outline 3 specific edge-case solutions regarding cache stampedes or invalidation loops."
            ]
        }
    ]
};

module.exports = { mockInterviewReport };