# MockIQ

# For adding test
curl -X POST http://localhost:5000/api/exams \
-H "Content-Type: application/json" \
-d '{
  "title": "NEET UG",
  "subtitle": "National Eligibility cum Entrance Test",
  "description": "Single entrance exam for admission to medical and dental colleges across India",
  "category": "Medical",
  "examDate": "May 2024",
  "duration": "3 hours 20 minutes",
  "totalQuestions": "200 Questions",
  "subjects": ["Physics", "Chemistry", "Biology"],
  "difficulty": "Hard",
  "attempts": "1 attempt per year",
  "gradient": "from-red-500 to-pink-600",
  "bgColor": "bg-red-50",
  "iconColor": "text-red-600",
  "borderColor": "border-red-200",
  "stats": {
    "mockTests": 52,
    "students": "18L+",
    "successRate": "89%"
  }
}'

# For adding papers
curl -X POST http://localhost:5000/api/papers \
  -H "Content-Type: application/json" \
  -d '{
    "examId": "6862f537e55f246aee0990eb",
    "title": "April Paper 2 2024",
    "year": 2024,
    "session": "April",
    "shift": "Paper 2",
    "examDate": "28 Apr 2024",
    "duration": "1.5 hours",
    "startTime": "02:00 PM",
    "endTime": "03:30 PM",
    "subjects": ["Mathematics"],
    "totalQuestions": 75,
    "totalMarks": 300,
    "questionDistribution": [
      {
        "subject": "Mathematics",
        "questionCount": 75,
        "marks": 300
      }
    ],
    "difficulty": "Hard",
    "paperType": "Previous Year",
    "languages": ["English", "Bengali"],
    "instructions": {
      "generalInstructions": [
        "Paper 2 contains only Mathematics questions",
        "Each correct answer carries 1 mark",
        "There is no negative marking"
      ],
      "markingScheme": {
        "correctAnswer": 1,
        "wrongAnswer": 0,
        "unattempted": 0
      },
      "allowedItems": ["Rough Sheets"],
      "prohibitedItems": ["Calculator", "Mobile Phone", "Smart Watch", "Books"]
    },
    "isPremium": false,
    "isActive": true,
    "isFeatured": false
  }'


