// Utility functions used across the app

// --- 1. Generate Username ---
// Takes student details and builds a unique username
// Example: Surname: "Smith", Class: "SS2", Department: "Science" = "smith_ss2_sci_1234"
const generateUsername = (surname, studentClass, department) => {
  // Shorten department to 3 letters
  const deptShort = department.substring(0, 3).toLowerCase();

  // Random 4 digit number to ensure uniqueness
  const random = Math.floor(1000 + Math.random() * 9000);

  // Combine all parts into username
  return `${surname.toLowerCase()}_${studentClass.toLowerCase()}_${deptShort}_${random}`;
};

// --- 2. Fuzzy Match ---
// Checks if a new question is too similar to existing questions
// in the same subject and syllabus
// Returns true if similar question found, false if not
const fuzzyMatch = (newQuestion, existingQuestions) => {
  // Clean and lowercase the new question for comparison
  const cleaned = newQuestion.toLowerCase().trim();

  // Loop through existing questions and compare
  for (let question of existingQuestions) {
    const existing = question.questionText.toLowerCase().trim();

    // Exact match check
    if (cleaned === existing) return true;

    // Fuzzy check: if 80% of words match, consider it similar
    const newWords      = cleaned.split(' ');
    const existingWords = existing.split(' ');

    // Count how many words appear in both questions
    const matchCount = newWords.filter(word => existingWords.includes(word)).length;

    // Calculate similarity percentage
    const similarity = matchCount / Math.max(newWords.length, existingWords.length);

    // If 80% or more words match, flag as duplicate
    if (similarity >= 0.8) return true;
  }

  // No similar question found
  return false;
};

// --- 3. Calculate Score ---
// Compares student answers to correct answers
// Returns score as a percentage
const calculateScore = (studentAnswers, questions) => {
  let correct = 0;

  // Loop through each question and check student answer
  questions.forEach(question => {
    // Find the student's answer for this question
    const studentAnswer = studentAnswers.find(
      a => a.questionId.toString() === question._id.toString()
    );

    // If answer exists and matches correct answer, count it
    if (studentAnswer && studentAnswer.selectedOption === question.answer) {
      correct++;
    }
  });

  // Return score as percentage rounded to 2 decimal places
  return parseFloat(((correct / questions.length) * 100).toFixed(2));
};

// --- 4. Get Recommendations ---
// Looks at student's exam history grouped by syllabus
// Flags any syllabus where average score is below 50%
const getRecommendations = (studentExams) => {
  // Group scores by syllabus topic
  const syllabusScores = {};

  studentExams.forEach(exam => {
    // Get the syllabus topic name from the exam's subject
    const topic = exam.examId?.subjectId?.name || 'Unknown Topic';

    // If topic not seen before, create entry
    if (!syllabusScores[topic]) {
      syllabusScores[topic] = { total: 0, count: 0 };
    }

    // Add score to total
    syllabusScores[topic].total += exam.score;
    syllabusScores[topic].count += 1;
  });

  // Build recommendations list for topics below 50% average
  const recommendations = [];

  for (let topic in syllabusScores) {
    const avg = syllabusScores[topic].total / syllabusScores[topic].count;

    // Flag topic if average score is below 50%
    if (avg < 50) {
      recommendations.push({
        topic,
        averageScore: parseFloat(avg.toFixed(2)),
        message: `You are scoring low in ${topic}. We recommend you focus on this topic.`
      });
    }
  }

  return recommendations;
};

// Export all functions
module.exports = { generateUsername, fuzzyMatch, calculateScore, getRecommendations };