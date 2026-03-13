'use strict';

// ============================================================
// seedQuestions.js
// Run with: node seedQuestions.js
// Seeds 200 WAEC-level questions for Mathematics and English
// Creates subjects and syllabus topics automatically
// ============================================================

const mongoose = require('mongoose');
require('dotenv').config();
const User     = require('./models/User');
const Subject  = require('./models/Subject');
const Syllabus = require('./models/Syllabus');
const Question = require('./models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/exam-prep-app';

// ============================================================
// MATHEMATICS SYLLABUS TOPICS
// ============================================================
const mathTopics = [
  { topic: 'Number and Numeration',       description: 'Integers, fractions, decimals, indices, logarithms, surds and number bases' },
  { topic: 'Algebraic Processes',         description: 'Expressions, equations, inequalities, polynomials and functions' },
  { topic: 'Mensuration',                 description: 'Perimeter, area and volume of plane and solid shapes' },
  { topic: 'Plane Geometry',              description: 'Lines, angles, triangles, polygons and circles' },
  { topic: 'Trigonometry',               description: 'Sine, cosine, tangent and their applications' },
  { topic: 'Statistics and Probability', description: 'Data representation, measures of central tendency and probability' },
];

// ============================================================
// ENGLISH SYLLABUS TOPICS
// ============================================================
const englishTopics = [
  { topic: 'Comprehension',              description: 'Reading and understanding passages' },
  { topic: 'Lexis and Structure',        description: 'Vocabulary, word usage, sentence structure' },
  { topic: 'Oral English',              description: 'Vowels, consonants, stress and intonation' },
  { topic: 'Parts of Speech',           description: 'Nouns, verbs, adjectives, adverbs, pronouns, prepositions' },
  { topic: 'Tenses and Concord',        description: 'Subject-verb agreement and correct tense usage' },
  { topic: 'Essay and Summary Writing', description: 'Formal and informal writing, summarising passages' },
];

// ============================================================
// MATHEMATICS QUESTIONS (100)
// ============================================================
const mathQuestions = [

  // --- Number and Numeration (20 questions) ---
  {
    topic: 'Number and Numeration',
    questionText: 'Simplify: 2³ × 2⁴',
    options: ['2⁷', '2¹²', '4⁷', '8⁷'],
    answer: '2⁷',
    explanation: 'When multiplying numbers with the same base, add the exponents: 3 + 4 = 7, so 2⁷.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Express 0.000325 in standard form.',
    options: ['3.25 × 10⁻⁴', '3.25 × 10⁻³', '32.5 × 10⁻⁵', '0.325 × 10⁻³'],
    answer: '3.25 × 10⁻⁴',
    explanation: 'Move the decimal point 4 places to the right to get 3.25, so the answer is 3.25 × 10⁻⁴.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Convert 101101₂ to base 10.',
    options: ['45', '43', '47', '41'],
    answer: '45',
    explanation: '1×32 + 0×16 + 1×8 + 1×4 + 0×2 + 1×1 = 32+8+4+1 = 45.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Find the value of log₁₀ 1000.',
    options: ['3', '2', '4', '10'],
    answer: '3',
    explanation: 'log₁₀ 1000 = log₁₀ 10³ = 3.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Simplify: √75 + √27',
    options: ['8√3', '10√3', '7√3', '6√3'],
    answer: '8√3',
    explanation: '√75 = 5√3 and √27 = 3√3, so 5√3 + 3√3 = 8√3.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'What is the HCF of 36, 48 and 60?',
    options: ['12', '6', '24', '18'],
    answer: '12',
    explanation: 'The highest common factor of 36, 48 and 60 is 12.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Evaluate: (0.027)^(1/3)',
    options: ['0.3', '0.03', '3', '0.9'],
    answer: '0.3',
    explanation: '0.027 = 27/1000, cube root is 3/10 = 0.3.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Express 2/5 as a percentage.',
    options: ['40%', '25%', '20%', '45%'],
    answer: '40%',
    explanation: '2/5 × 100 = 40%.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'If log 2 = 0.3010, find log 8.',
    options: ['0.9030', '0.6020', '1.2040', '0.8010'],
    answer: '0.9030',
    explanation: 'log 8 = log 2³ = 3 × log 2 = 3 × 0.3010 = 0.9030.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Simplify: (16)^(3/4)',
    options: ['8', '4', '12', '6'],
    answer: '8',
    explanation: '(16)^(1/4) = 2, then 2³ = 8.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'What is the LCM of 12, 18 and 24?',
    options: ['72', '36', '48', '144'],
    answer: '72',
    explanation: 'The least common multiple of 12, 18 and 24 is 72.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Convert 3/8 to a decimal.',
    options: ['0.375', '0.38', '0.36', '0.35'],
    answer: '0.375',
    explanation: '3 ÷ 8 = 0.375.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Rationalize the denominator of 1/√5.',
    options: ['√5/5', '5/√5', '1/5', '√5'],
    answer: '√5/5',
    explanation: 'Multiply numerator and denominator by √5: √5/(√5 × √5) = √5/5.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'What is 15% of 240?',
    options: ['36', '30', '40', '45'],
    answer: '36',
    explanation: '15/100 × 240 = 36.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Evaluate: 5! (5 factorial)',
    options: ['120', '60', '24', '100'],
    answer: '120',
    explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Convert 110011₂ to base 10.',
    options: ['51', '49', '53', '47'],
    answer: '51',
    explanation: '1×32 + 1×16 + 0×8 + 0×4 + 1×2 + 1×1 = 32+16+2+1 = 51.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Simplify: (2√3)²',
    options: ['12', '6', '4√3', '8'],
    answer: '12',
    explanation: '(2√3)² = 4 × 3 = 12.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'If a number is increased by 20% and the result is 360, what is the original number?',
    options: ['300', '280', '320', '290'],
    answer: '300',
    explanation: '120% of x = 360, x = 360/1.2 = 300.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Express 45 as a product of prime factors.',
    options: ['3² × 5', '3 × 5²', '3 × 15', '9 × 5'],
    answer: '3² × 5',
    explanation: '45 = 9 × 5 = 3² × 5.'
  },
  {
    topic: 'Number and Numeration',
    questionText: 'Find the value of 2⁻³.',
    options: ['1/8', '1/6', '-8', '1/4'],
    answer: '1/8',
    explanation: '2⁻³ = 1/2³ = 1/8.'
  },

  // --- Algebraic Processes (20 questions) ---
  {
    topic: 'Algebraic Processes',
    questionText: 'Solve for x: 3x + 7 = 22',
    options: ['5', '6', '4', '7'],
    answer: '5',
    explanation: '3x = 22 - 7 = 15, x = 5.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Expand: (x + 3)(x - 2)',
    options: ['x² + x - 6', 'x² - x - 6', 'x² + x + 6', 'x² - 5x - 6'],
    answer: 'x² + x - 6',
    explanation: 'x² - 2x + 3x - 6 = x² + x - 6.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Factorize: x² - 9',
    options: ['(x+3)(x-3)', '(x-3)²', '(x+9)(x-1)', '(x+3)²'],
    answer: '(x+3)(x-3)',
    explanation: 'Difference of two squares: x² - 9 = (x+3)(x-3).'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Solve: 2x - 5 > 7',
    options: ['x > 6', 'x > 5', 'x > 7', 'x > 4'],
    answer: 'x > 6',
    explanation: '2x > 12, x > 6.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'If f(x) = 2x² - 3x + 1, find f(2).',
    options: ['3', '5', '7', '1'],
    answer: '3',
    explanation: 'f(2) = 2(4) - 3(2) + 1 = 8 - 6 + 1 = 3.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Solve: x² - 5x + 6 = 0',
    options: ['x = 2 or x = 3', 'x = -2 or x = -3', 'x = 1 or x = 6', 'x = 2 or x = -3'],
    answer: 'x = 2 or x = 3',
    explanation: '(x-2)(x-3) = 0, so x = 2 or x = 3.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Simplify: (3x²y)(4xy³)',
    options: ['12x³y⁴', '12x²y³', '7x³y⁴', '12x³y³'],
    answer: '12x³y⁴',
    explanation: '3×4 = 12, x²×x = x³, y×y³ = y⁴.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Make r the subject of the formula: A = πr²',
    options: ['r = √(A/π)', 'r = A/π', 'r = √(Aπ)', 'r = A²/π'],
    answer: 'r = √(A/π)',
    explanation: 'r² = A/π, r = √(A/π).'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Find the gradient of the line y = 3x - 7.',
    options: ['3', '-7', '7', '-3'],
    answer: '3',
    explanation: 'In y = mx + c, m is the gradient. Here m = 3.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Solve simultaneously: x + y = 5 and x - y = 1',
    options: ['x=3, y=2', 'x=2, y=3', 'x=4, y=1', 'x=1, y=4'],
    answer: 'x=3, y=2',
    explanation: 'Adding: 2x = 6, x = 3. Substituting: y = 5-3 = 2.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Factorize: 6x² + 11x + 3',
    options: ['(2x+3)(3x+1)', '(6x+1)(x+3)', '(2x+1)(3x+3)', '(3x+3)(2x+1)'],
    answer: '(2x+3)(3x+1)',
    explanation: '(2x+3)(3x+1) = 6x² + 2x + 9x + 3 = 6x² + 11x + 3.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'What is the y-intercept of the line 2y = 4x + 8?',
    options: ['4', '8', '2', '-4'],
    answer: '4',
    explanation: 'y = 2x + 4, y-intercept is 4.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Simplify: (x² - 4)/(x - 2)',
    options: ['x + 2', 'x - 2', 'x² + 2', '2x'],
    answer: 'x + 2',
    explanation: 'x² - 4 = (x+2)(x-2), dividing by (x-2) gives x+2.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'If 3x = 81, find x.',
    options: ['4', '3', '5', '6'],
    answer: '4',
    explanation: '81 = 3⁴, so x = 4.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Find the sum of the roots of x² - 7x + 10 = 0.',
    options: ['7', '-7', '10', '-10'],
    answer: '7',
    explanation: 'Sum of roots = -b/a = -(-7)/1 = 7.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Solve: |2x - 3| = 7',
    options: ['x = 5 or x = -2', 'x = 5 or x = 2', 'x = -5 or x = 2', 'x = 4 or x = -2'],
    answer: 'x = 5 or x = -2',
    explanation: '2x-3=7 gives x=5; 2x-3=-7 gives x=-2.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Find the product of roots of 2x² - 5x + 3 = 0.',
    options: ['3/2', '5/2', '-3/2', '2/3'],
    answer: '3/2',
    explanation: 'Product of roots = c/a = 3/2.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Simplify: 3(2x - 1) - 2(x + 4)',
    options: ['4x - 11', '4x + 11', '8x - 11', '4x - 3'],
    answer: '4x - 11',
    explanation: '6x - 3 - 2x - 8 = 4x - 11.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'What is the discriminant of x² + 4x + 5 = 0?',
    options: ['-4', '4', '36', '-36'],
    answer: '-4',
    explanation: 'b² - 4ac = 16 - 20 = -4.'
  },
  {
    topic: 'Algebraic Processes',
    questionText: 'Solve: (x/3) + 2 = 5',
    options: ['9', '6', '3', '12'],
    answer: '9',
    explanation: 'x/3 = 3, x = 9.'
  },

  // --- Mensuration (15 questions) ---
  {
    topic: 'Mensuration',
    questionText: 'Find the area of a circle with radius 7cm. (π = 22/7)',
    options: ['154 cm²', '44 cm²', '77 cm²', '49 cm²'],
    answer: '154 cm²',
    explanation: 'A = πr² = 22/7 × 49 = 154 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'The volume of a cube with side 5cm is:',
    options: ['125 cm³', '25 cm³', '75 cm³', '150 cm³'],
    answer: '125 cm³',
    explanation: 'V = s³ = 5³ = 125 cm³.'
  },
  {
    topic: 'Mensuration',
    questionText: 'Find the perimeter of a rectangle with length 8cm and width 5cm.',
    options: ['26 cm', '40 cm', '13 cm', '20 cm'],
    answer: '26 cm',
    explanation: 'P = 2(l + w) = 2(8 + 5) = 26 cm.'
  },
  {
    topic: 'Mensuration',
    questionText: 'Calculate the circumference of a circle with diameter 14cm. (π = 22/7)',
    options: ['44 cm', '88 cm', '22 cm', '154 cm'],
    answer: '44 cm',
    explanation: 'C = πd = 22/7 × 14 = 44 cm.'
  },
  {
    topic: 'Mensuration',
    questionText: 'Find the area of a triangle with base 10cm and height 6cm.',
    options: ['30 cm²', '60 cm²', '15 cm²', '20 cm²'],
    answer: '30 cm²',
    explanation: 'A = ½ × b × h = ½ × 10 × 6 = 30 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'The volume of a cylinder of radius 3cm and height 7cm is (π = 22/7):',
    options: ['198 cm³', '99 cm³', '63 cm³', '22 cm³'],
    answer: '198 cm³',
    explanation: 'V = πr²h = 22/7 × 9 × 7 = 198 cm³.'
  },
  {
    topic: 'Mensuration',
    questionText: 'What is the area of a trapezium with parallel sides 6cm and 10cm, and height 4cm?',
    options: ['32 cm²', '24 cm²', '40 cm²', '16 cm²'],
    answer: '32 cm²',
    explanation: 'A = ½(a+b)h = ½(6+10)×4 = 32 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'Find the total surface area of a cube with side 4cm.',
    options: ['96 cm²', '48 cm²', '64 cm²', '24 cm²'],
    answer: '96 cm²',
    explanation: 'TSA = 6s² = 6 × 16 = 96 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'A sector has radius 6cm and angle 60°. Find its area. (π = 22/7)',
    options: ['18.86 cm²', '37.71 cm²', '6.28 cm²', '12.57 cm²'],
    answer: '18.86 cm²',
    explanation: 'A = (θ/360) × πr² = (60/360) × (22/7) × 36 ≈ 18.86 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'The volume of a cone with radius 3cm and height 7cm is (π = 22/7):',
    options: ['66 cm³', '198 cm³', '22 cm³', '33 cm³'],
    answer: '66 cm³',
    explanation: 'V = ⅓πr²h = ⅓ × 22/7 × 9 × 7 = 66 cm³.'
  },
  {
    topic: 'Mensuration',
    questionText: 'What is the area of a rhombus with diagonals 8cm and 10cm?',
    options: ['40 cm²', '80 cm²', '20 cm²', '18 cm²'],
    answer: '40 cm²',
    explanation: 'A = ½ × d₁ × d₂ = ½ × 8 × 10 = 40 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'Find the length of an arc of radius 7cm subtending 90° at the centre. (π = 22/7)',
    options: ['11 cm', '22 cm', '44 cm', '7 cm'],
    answer: '11 cm',
    explanation: 'Arc = (θ/360) × 2πr = (90/360) × 2 × 22/7 × 7 = 11 cm.'
  },
  {
    topic: 'Mensuration',
    questionText: 'The surface area of a sphere with radius 7cm is (π = 22/7):',
    options: ['616 cm²', '308 cm²', '154 cm²', '1232 cm²'],
    answer: '616 cm²',
    explanation: 'SA = 4πr² = 4 × 22/7 × 49 = 616 cm².'
  },
  {
    topic: 'Mensuration',
    questionText: 'A rectangular field is 15m long and 8m wide. Find its area.',
    options: ['120 m²', '46 m²', '60 m²', '180 m²'],
    answer: '120 m²',
    explanation: 'A = l × w = 15 × 8 = 120 m².'
  },
  {
    topic: 'Mensuration',
    questionText: 'Find the volume of a sphere with radius 3cm. (π = 22/7)',
    options: ['113.14 cm³', '37.71 cm³', '56.57 cm³', '226.28 cm³'],
    answer: '113.14 cm³',
    explanation: 'V = 4/3 × πr³ = 4/3 × 22/7 × 27 ≈ 113.14 cm³.'
  },

  // --- Plane Geometry (15 questions) ---
  {
    topic: 'Plane Geometry',
    questionText: 'The angles of a triangle are in the ratio 2:3:5. Find the largest angle.',
    options: ['90°', '60°', '54°', '36°'],
    answer: '90°',
    explanation: 'Total parts = 10. Largest = (5/10) × 180° = 90°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'Find the sum of interior angles of a hexagon.',
    options: ['720°', '540°', '900°', '360°'],
    answer: '720°',
    explanation: 'Sum = (n-2) × 180° = (6-2) × 180° = 720°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'Two parallel lines are cut by a transversal. Alternate angles are:',
    options: ['Equal', 'Supplementary', 'Complementary', 'None of these'],
    answer: 'Equal',
    explanation: 'Alternate angles formed by a transversal cutting parallel lines are equal.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'The exterior angle of a regular polygon is 30°. How many sides does it have?',
    options: ['12', '10', '8', '6'],
    answer: '12',
    explanation: 'Number of sides = 360°/30° = 12.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'In a right-angled triangle, the sides are 3cm, 4cm and 5cm. The right angle is opposite the side of length:',
    options: ['5 cm', '4 cm', '3 cm', 'None'],
    answer: '5 cm',
    explanation: 'The hypotenuse (longest side) is opposite the right angle, which is 5cm.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'What is the size of each interior angle of a regular pentagon?',
    options: ['108°', '120°', '72°', '90°'],
    answer: '108°',
    explanation: 'Interior angle = (5-2)×180°/5 = 540°/5 = 108°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'An angle on a straight line is:',
    options: ['180°', '90°', '360°', '270°'],
    answer: '180°',
    explanation: 'Angles on a straight line add up to 180°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'The angle in a semicircle is:',
    options: ['90°', '180°', '45°', '60°'],
    answer: '90°',
    explanation: 'By Thales theorem, the angle in a semicircle is always 90°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'Two sides of a triangle are 5cm and 8cm. Which of the following could be the third side?',
    options: ['7 cm', '13 cm', '2 cm', '14 cm'],
    answer: '7 cm',
    explanation: 'Third side must be greater than difference (3) and less than sum (13).'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'Vertically opposite angles are:',
    options: ['Equal', 'Supplementary', 'Complementary', 'Adjacent'],
    answer: 'Equal',
    explanation: 'Vertically opposite angles are always equal.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'Find the value of x if angles are 2x and 3x on a straight line.',
    options: ['36°', '30°', '45°', '72°'],
    answer: '36°',
    explanation: '2x + 3x = 180°, 5x = 180°, x = 36°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'A chord of a circle is 8cm and the radius is 5cm. Find the distance from the centre.',
    options: ['3 cm', '4 cm', '5 cm', '2 cm'],
    answer: '3 cm',
    explanation: 'Half chord = 4, d = √(5²-4²) = √9 = 3 cm.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'The sum of angles at a point is:',
    options: ['360°', '180°', '90°', '270°'],
    answer: '360°',
    explanation: 'Angles at a point always add up to 360°.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'In a parallelogram, opposite angles are:',
    options: ['Equal', 'Supplementary', 'Complementary', 'Right angles'],
    answer: 'Equal',
    explanation: 'Opposite angles in a parallelogram are always equal.'
  },
  {
    topic: 'Plane Geometry',
    questionText: 'If two triangles are similar, what is true about their corresponding sides?',
    options: ['They are proportional', 'They are equal', 'They are parallel', 'They are perpendicular'],
    answer: 'They are proportional',
    explanation: 'In similar triangles, corresponding sides are proportional but not necessarily equal.'
  },

  // --- Trigonometry (15 questions) ---
  {
    topic: 'Trigonometry',
    questionText: 'Find sin 30°.',
    options: ['1/2', '√3/2', '1/√2', '1'],
    answer: '1/2',
    explanation: 'sin 30° = 1/2 is a standard trigonometric value.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Find cos 60°.',
    options: ['1/2', '√3/2', '1', '0'],
    answer: '1/2',
    explanation: 'cos 60° = 1/2 is a standard trigonometric value.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Find tan 45°.',
    options: ['1', '0', '√3', '1/√3'],
    answer: '1',
    explanation: 'tan 45° = sin 45°/cos 45° = 1.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'In a right triangle, if the opposite side is 3 and hypotenuse is 5, what is sin θ?',
    options: ['3/5', '4/5', '3/4', '5/3'],
    answer: '3/5',
    explanation: 'sin θ = opposite/hypotenuse = 3/5.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Which ratio represents cos θ?',
    options: ['Adjacent/Hypotenuse', 'Opposite/Hypotenuse', 'Opposite/Adjacent', 'Hypotenuse/Adjacent'],
    answer: 'Adjacent/Hypotenuse',
    explanation: 'cos θ = Adjacent/Hypotenuse (CAH in SOH CAH TOA).'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Find the angle whose sine is 0.5.',
    options: ['30°', '45°', '60°', '90°'],
    answer: '30°',
    explanation: 'sin⁻¹(0.5) = 30°.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Simplify: sin²θ + cos²θ',
    options: ['1', '0', '2', 'sin 2θ'],
    answer: '1',
    explanation: 'This is the fundamental Pythagorean identity: sin²θ + cos²θ = 1.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'A ladder of length 10m leans against a wall making 60° with the ground. How high does it reach?',
    options: ['5√3 m', '5 m', '10√3 m', '√3 m'],
    answer: '5√3 m',
    explanation: 'Height = 10 × sin 60° = 10 × (√3/2) = 5√3 m.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'What is the value of sin 90°?',
    options: ['1', '0', '1/2', '√3/2'],
    answer: '1',
    explanation: 'sin 90° = 1 is a standard trigonometric value.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'The angle of elevation of the top of a tower is 30° at a point 100m away. Find the height.',
    options: ['100/√3 m', '100√3 m', '50 m', '200 m'],
    answer: '100/√3 m',
    explanation: 'tan 30° = h/100, h = 100 × tan 30° = 100/√3 m.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Find cos 0°.',
    options: ['1', '0', '1/2', '-1'],
    answer: '1',
    explanation: 'cos 0° = 1 is a standard trigonometric value.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Which of these is an identity?',
    options: ['1 + tan²θ = sec²θ', '1 + sin²θ = cos²θ', 'tan θ = cos θ/sin θ', 'sin²θ = 1'],
    answer: '1 + tan²θ = sec²θ',
    explanation: '1 + tan²θ = sec²θ is derived from dividing sin²θ + cos²θ = 1 by cos²θ.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'In which quadrant is sin negative and cos positive?',
    options: ['Fourth', 'Second', 'Third', 'First'],
    answer: 'Fourth',
    explanation: 'In the fourth quadrant, x is positive (cos) and y is negative (sin).'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Find the value of tan 60°.',
    options: ['√3', '1/√3', '1', '2'],
    answer: '√3',
    explanation: 'tan 60° = sin 60°/cos 60° = (√3/2)/(1/2) = √3.'
  },
  {
    topic: 'Trigonometry',
    questionText: 'Using the sine rule, in triangle ABC if a = 8, A = 30°, B = 45°, find b.',
    options: ['8√2', '4√2', '4', '8'],
    answer: '8√2',
    explanation: 'b/sin B = a/sin A, b = 8 × sin45°/sin30° = 8 × (√2/2)/(1/2) = 8√2.'
  },

  // --- Statistics and Probability (15 questions) ---
  {
    topic: 'Statistics and Probability',
    questionText: 'Find the mean of: 3, 7, 5, 9, 6.',
    options: ['6', '5', '7', '30'],
    answer: '6',
    explanation: 'Mean = (3+7+5+9+6)/5 = 30/5 = 6.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'Find the median of: 4, 7, 2, 9, 5.',
    options: ['5', '4', '7', '9'],
    answer: '5',
    explanation: 'Arranged: 2, 4, 5, 7, 9. The middle value is 5.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'Find the mode of: 3, 5, 3, 7, 5, 3, 9.',
    options: ['3', '5', '7', '9'],
    answer: '3',
    explanation: '3 appears 3 times, more than any other value.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'A fair coin is tossed. What is the probability of getting a head?',
    options: ['1/2', '1', '1/4', '0'],
    answer: '1/2',
    explanation: 'There are 2 equally likely outcomes, 1 is a head. P = 1/2.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'A die is rolled. What is the probability of getting an even number?',
    options: ['1/2', '1/3', '2/3', '1/6'],
    answer: '1/2',
    explanation: 'Even numbers are 2, 4, 6 — that is 3 out of 6. P = 3/6 = 1/2.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'Find the range of: 12, 7, 3, 15, 9.',
    options: ['12', '9', '7', '15'],
    answer: '12',
    explanation: 'Range = highest - lowest = 15 - 3 = 12.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'If P(A) = 0.3 and P(B) = 0.5 and A and B are mutually exclusive, find P(A or B).',
    options: ['0.8', '0.15', '0.2', '1.0'],
    answer: '0.8',
    explanation: 'P(A or B) = P(A) + P(B) = 0.3 + 0.5 = 0.8.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'What type of chart uses sectors to represent data?',
    options: ['Pie chart', 'Bar chart', 'Histogram', 'Line graph'],
    answer: 'Pie chart',
    explanation: 'A pie chart uses circular sectors to show proportions of data.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'Find the variance of: 2, 4, 6 (mean = 4).',
    options: ['2.67', '4', '8', '1.63'],
    answer: '2.67',
    explanation: 'Variance = [(2-4)² + (4-4)² + (6-4)²]/3 = [4+0+4]/3 = 8/3 ≈ 2.67.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'A bag contains 3 red and 5 blue balls. What is the probability of picking a red ball?',
    options: ['3/8', '5/8', '1/3', '3/5'],
    answer: '3/8',
    explanation: 'Total balls = 8. P(red) = 3/8.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'In a frequency distribution, the class with the highest frequency is called the:',
    options: ['Modal class', 'Median class', 'Mean class', 'Range class'],
    answer: 'Modal class',
    explanation: 'The modal class is the class interval with the highest frequency.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'What is the probability of an impossible event?',
    options: ['0', '1', '1/2', '-1'],
    answer: '0',
    explanation: 'An impossible event has probability 0.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'If the mean of 5 numbers is 12, what is their sum?',
    options: ['60', '12', '17', '2.4'],
    answer: '60',
    explanation: 'Sum = mean × count = 12 × 5 = 60.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'Two events are mutually exclusive if:',
    options: ['They cannot occur together', 'They always occur together', 'One causes the other', 'They are independent'],
    answer: 'They cannot occur together',
    explanation: 'Mutually exclusive events cannot happen at the same time.'
  },
  {
    topic: 'Statistics and Probability',
    questionText: 'Find the standard deviation of: 2, 4, 6 (mean = 4).',
    options: ['1.63', '2.67', '4', '2'],
    answer: '1.63',
    explanation: 'SD = √variance = √(8/3) ≈ 1.63.'
  },
];

// ============================================================
// ENGLISH LANGUAGE QUESTIONS (100)
// ============================================================
const englishQuestions = [

  // --- Comprehension (15 questions) ---
  {
    topic: 'Comprehension',
    questionText: 'The word "benevolent" in a passage most likely means:',
    options: ['Kind and generous', 'Cruel and harsh', 'Lazy and slow', 'Angry and rude'],
    answer: 'Kind and generous',
    explanation: '"Benevolent" means well-meaning and kindly towards others.'
  },
  {
    topic: 'Comprehension',
    questionText: 'Which of these best describes the purpose of a topic sentence?',
    options: ['It introduces the main idea of a paragraph', 'It concludes the essay', 'It provides examples', 'It defines a term'],
    answer: 'It introduces the main idea of a paragraph',
    explanation: 'A topic sentence states the central idea of a paragraph.'
  },
  {
    topic: 'Comprehension',
    questionText: 'A word that has the same meaning as another is called a:',
    options: ['Synonym', 'Antonym', 'Homonym', 'Acronym'],
    answer: 'Synonym',
    explanation: 'A synonym is a word with the same or similar meaning to another word.'
  },
  {
    topic: 'Comprehension',
    questionText: 'A word that has the opposite meaning to another is called an:',
    options: ['Antonym', 'Synonym', 'Homonym', 'Prefix'],
    answer: 'Antonym',
    explanation: 'An antonym is a word with the opposite meaning to another.'
  },
  {
    topic: 'Comprehension',
    questionText: 'What is the meaning of "verbose"?',
    options: ['Using more words than necessary', 'Speaking very quietly', 'Being very smart', 'Writing neatly'],
    answer: 'Using more words than necessary',
    explanation: '"Verbose" means using an excess of words; wordy.'
  },
  {
    topic: 'Comprehension',
    questionText: 'What is an inference in a passage?',
    options: ['A conclusion drawn from evidence', 'A direct statement of fact', 'A definition of a word', 'A summary of the passage'],
    answer: 'A conclusion drawn from evidence',
    explanation: 'An inference is a logical conclusion based on evidence in the text.'
  },
  {
    topic: 'Comprehension',
    questionText: 'The word "indigenous" means:',
    options: ['Native to a place', 'Foreign or alien', 'Modern and new', 'Old and worn out'],
    answer: 'Native to a place',
    explanation: '"Indigenous" refers to originating or occurring naturally in a particular place.'
  },
  {
    topic: 'Comprehension',
    questionText: 'What does "ambiguous" mean?',
    options: ['Having more than one possible meaning', 'Very clear and precise', 'Completely wrong', 'Very important'],
    answer: 'Having more than one possible meaning',
    explanation: '"Ambiguous" means open to more than one interpretation.'
  },
  {
    topic: 'Comprehension',
    questionText: 'The tone of a passage refers to:',
    options: ["The writer's attitude toward the subject", 'The speed of reading', 'The length of the passage', 'The vocabulary used'],
    answer: "The writer's attitude toward the subject",
    explanation: 'Tone reflects the attitude or feeling of the writer toward the topic.'
  },
  {
    topic: 'Comprehension',
    questionText: 'What does "eloquent" mean?',
    options: ['Fluent and persuasive in speaking', 'Shy and quiet', 'Rude and aggressive', 'Confused and unclear'],
    answer: 'Fluent and persuasive in speaking',
    explanation: '"Eloquent" means expressing ideas fluently and powerfully.'
  },
  {
    topic: 'Comprehension',
    questionText: 'A "memoir" is:',
    options: ['A historical account of personal experience', 'A fictional story', 'A scientific report', 'A legal document'],
    answer: 'A historical account of personal experience',
    explanation: 'A memoir is a written record of a person\'s own life and experiences.'
  },
  {
    topic: 'Comprehension',
    questionText: 'What is the meaning of "destitute"?',
    options: ['Without basic necessities', 'Very wealthy', 'Extremely happy', 'Highly educated'],
    answer: 'Without basic necessities',
    explanation: '"Destitute" means lacking food, shelter and other necessities of life.'
  },
  {
    topic: 'Comprehension',
    questionText: '"Prolific" most nearly means:',
    options: ['Producing much output', 'Lazy and unproductive', 'Very expensive', 'Slow and careful'],
    answer: 'Producing much output',
    explanation: '"Prolific" means producing many works, results or offspring.'
  },
  {
    topic: 'Comprehension',
    questionText: 'What does "concise" mean?',
    options: ['Brief and clear', 'Long and detailed', 'Confusing and vague', 'Rude and blunt'],
    answer: 'Brief and clear',
    explanation: '"Concise" means giving a lot of information clearly in few words.'
  },
  {
    topic: 'Comprehension',
    questionText: '"Formidable" most nearly means:',
    options: ['Inspiring fear or respect', 'Friendly and welcoming', 'Weak and fragile', 'Simple and easy'],
    answer: 'Inspiring fear or respect',
    explanation: '"Formidable" means inspiring fear or respect through being impressively powerful.'
  },

  // --- Lexis and Structure (20 questions) ---
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct word: She is _____ than her sister.',
    options: ['taller', 'more taller', 'tallest', 'most tall'],
    answer: 'taller',
    explanation: 'Comparative adjective for two people is formed by adding -er: taller.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct spelling:',
    options: ['Necessary', 'Neccessary', 'Necesary', 'Necessery'],
    answer: 'Necessary',
    explanation: '"Necessary" has one c and two s letters.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Identify the phrasal verb in: "She gave up smoking."',
    options: ['gave up', 'she gave', 'up smoking', 'gave smoking'],
    answer: 'gave up',
    explanation: '"Gave up" is a phrasal verb meaning to stop or quit.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Which sentence uses the correct form of "affect/effect"?',
    options: ['The rain affected the game', 'The rain effected the game', 'The rain affects the affect', 'The effect rained on us'],
    answer: 'The rain affected the game',
    explanation: '"Affect" is the verb meaning to have an impact on something.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct option: He is one of the best students who _____ ever studied here.',
    options: ['have', 'has', 'had', 'is'],
    answer: 'have',
    explanation: 'The antecedent is "students" (plural), so "have" is correct.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'The prefix "mis-" in "misunderstand" means:',
    options: ['Wrongly', 'Again', 'Not', 'Before'],
    answer: 'Wrongly',
    explanation: 'The prefix "mis-" means wrongly or badly.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Which word is correctly hyphenated?',
    options: ['Well-known', 'Wellknown', 'Well known-', 'W-ellknown'],
    answer: 'Well-known',
    explanation: 'Compound adjectives before a noun are hyphenated: well-known.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct sentence:',
    options: ['Neither the boys nor the girl was present', 'Neither the boys nor the girl were present', 'Neither the boys nor the girl are present', 'Neither the boys nor the girl be present'],
    answer: 'Neither the boys nor the girl was present',
    explanation: 'With neither...nor, the verb agrees with the subject nearest to it (girl — singular).'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'What is a collocation?',
    options: ['Words that naturally go together', 'Words with opposite meanings', 'Words that sound alike', 'Words with the same spelling'],
    answer: 'Words that naturally go together',
    explanation: 'A collocation is a pair or group of words that habitually appear together.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct option: I have lived here _____ 2010.',
    options: ['since', 'for', 'from', 'during'],
    answer: 'since',
    explanation: '"Since" is used with a specific point in time: since 2010.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Identify the idiom: "It is raining cats and dogs."',
    options: ['It is raining very heavily', 'Animals are falling from the sky', 'It is raining lightly', 'The weather is strange'],
    answer: 'It is raining very heavily',
    explanation: '"Raining cats and dogs" is an idiom meaning raining very heavily.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'The suffix "-tion" in "education" makes it a:',
    options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    answer: 'Noun',
    explanation: 'The suffix "-tion" converts verbs to nouns.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct option: The committee _____ divided in their opinion.',
    options: ['were', 'was', 'is', 'are being'],
    answer: 'were',
    explanation: '"Committee" can be treated as plural when members act individually.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'What does the phrase "at the drop of a hat" mean?',
    options: ['Without hesitation', 'Very carefully', 'After a long delay', 'With great difficulty'],
    answer: 'Without hesitation',
    explanation: '"At the drop of a hat" means immediately and without delay.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Select the correctly punctuated sentence:',
    options: ["It's a lovely day, isn't it?", "Its a lovely day, isnt it?", "It's a lovely day isnt it?", "Its a lovely day isn't it?"],
    answer: "It's a lovely day, isn't it?",
    explanation: '"It\'s" needs an apostrophe, and the tag question needs a comma before it.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct word: The thief stole my _____ bag.',
    options: ['leather brown old', 'old brown leather', 'brown old leather', 'brown leather old'],
    answer: 'old brown leather',
    explanation: 'Adjective order in English: opinion, size, age, shape, colour, origin, material.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Identify the gerund in: "Swimming is good exercise."',
    options: ['Swimming', 'is', 'good', 'exercise'],
    answer: 'Swimming',
    explanation: '"Swimming" is a gerund — a verb form ending in -ing used as a noun.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Which is the correct conditional sentence?',
    options: ['If it rains, I will stay home', 'If it rains, I would stay home', 'If it rained, I will stay home', 'If it rains, I stay home yesterday'],
    answer: 'If it rains, I will stay home',
    explanation: 'First conditional: If + present simple, will + infinitive.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'What is a proverb?',
    options: ['A short well-known saying expressing a general truth', 'A long story with a moral', 'A type of poem', 'A figure of speech'],
    answer: 'A short well-known saying expressing a general truth',
    explanation: 'A proverb is a short traditional saying that expresses a common truth or belief.'
  },
  {
    topic: 'Lexis and Structure',
    questionText: 'Choose the correct option: She _____ to school every day.',
    options: ['walks', 'walk', 'walking', 'walked'],
    answer: 'walks',
    explanation: 'Third person singular present simple requires -s: she walks.'
  },

  // --- Oral English (15 questions) ---
  {
    topic: 'Oral English',
    questionText: 'Which word has the stress on the first syllable?',
    options: ['TAble', 'baNAna', 'comPUter', 'imPORtant'],
    answer: 'TAble',
    explanation: '"Table" is stressed on the first syllable: TA-ble.'
  },
  {
    topic: 'Oral English',
    questionText: 'How many syllables are in the word "education"?',
    options: ['4', '3', '5', '2'],
    answer: '4',
    explanation: 'e-du-ca-tion has 4 syllables.'
  },
  {
    topic: 'Oral English',
    questionText: 'Which of these words contains a diphthong?',
    options: ['Boy', 'Sit', 'Cat', 'Run'],
    answer: 'Boy',
    explanation: '"Boy" contains the diphthong /ɔɪ/ which is a combination of two vowel sounds.'
  },
  {
    topic: 'Oral English',
    questionText: 'The sound /θ/ as in "think" is:',
    options: ['A voiceless dental fricative', 'A voiced bilabial plosive', 'A voiceless alveolar stop', 'A voiced velar nasal'],
    answer: 'A voiceless dental fricative',
    explanation: 'The /θ/ sound is produced between the teeth without voice.'
  },
  {
    topic: 'Oral English',
    questionText: 'Which pair of words are homophones?',
    options: ['Flour and flower', 'Dog and cat', 'Run and walk', 'Big and large'],
    answer: 'Flour and flower',
    explanation: 'Homophones sound alike but have different spellings and meanings.'
  },
  {
    topic: 'Oral English',
    questionText: 'In the word "photograph", the stress falls on:',
    options: ['PHO-to-graph', 'pho-TO-graph', 'pho-to-GRAPH', 'PHO-TO-graph'],
    answer: 'PHO-to-graph',
    explanation: '"Photograph" is stressed on the first syllable: PHO-to-graph.'
  },
  {
    topic: 'Oral English',
    questionText: 'Which of these is a vowel sound?',
    options: ['/æ/ as in "cat"', '/p/ as in "pen"', '/s/ as in "sit"', '/t/ as in "top"'],
    answer: '/æ/ as in "cat"',
    explanation: '/æ/ is a vowel sound produced in the front of the mouth.'
  },
  {
    topic: 'Oral English',
    questionText: 'The rising intonation in English is typically used for:',
    options: ['Yes/No questions', 'Statements of fact', 'Commands', 'Exclamations'],
    answer: 'Yes/No questions',
    explanation: 'Rising intonation is used in yes/no questions to show the speaker expects an answer.'
  },
  {
    topic: 'Oral English',
    questionText: 'Which word rhymes with "height"?',
    options: ['Kite', 'Heat', 'Hit', 'Hat'],
    answer: 'Kite',
    explanation: 'Height and kite both end with the /aɪt/ sound.'
  },
  {
    topic: 'Oral English',
    questionText: 'Consonants produced with both lips are called:',
    options: ['Bilabial', 'Alveolar', 'Velar', 'Dental'],
    answer: 'Bilabial',
    explanation: 'Bilabial consonants (/p/, /b/, /m/) are made with both lips.'
  },
  {
    topic: 'Oral English',
    questionText: 'The word "record" when used as a noun has stress on:',
    options: ['First syllable', 'Second syllable', 'Both syllables', 'Neither syllable'],
    answer: 'First syllable',
    explanation: 'As a noun: RE-cord. As a verb: re-CORD.'
  },
  {
    topic: 'Oral English',
    questionText: 'How many phonemes are in the word "ship"?',
    options: ['3', '4', '2', '5'],
    answer: '3',
    explanation: '/ʃ/, /ɪ/, /p/ — the word "ship" has 3 phonemes despite having 4 letters.'
  },
  {
    topic: 'Oral English',
    questionText: 'Which of these words has a silent letter?',
    options: ['Knee', 'Cat', 'Dog', 'Run'],
    answer: 'Knee',
    explanation: 'The "k" in "knee" is silent; it is pronounced /niː/.'
  },
  {
    topic: 'Oral English',
    questionText: 'Falling intonation in English is typically used for:',
    options: ['Statements and commands', 'Yes/No questions', 'Requests for repetition', 'Listing items'],
    answer: 'Statements and commands',
    explanation: 'Falling intonation signals a complete thought, used in statements and commands.'
  },
  {
    topic: 'Oral English',
    questionText: 'The sounds /p/ and /b/ differ only in:',
    options: ['Voicing', 'Place of articulation', 'Manner of articulation', 'Aspiration'],
    answer: 'Voicing',
    explanation: '/p/ is voiceless and /b/ is voiced; they are made in the same place and manner.'
  },

  // --- Parts of Speech (15 questions) ---
  {
    topic: 'Parts of Speech',
    questionText: 'Identify the noun in: "The beautiful girl sang sweetly."',
    options: ['girl', 'beautiful', 'sang', 'sweetly'],
    answer: 'girl',
    explanation: '"Girl" is a common noun naming a person.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'What part of speech is "quickly" in "He ran quickly"?',
    options: ['Adverb', 'Adjective', 'Verb', 'Noun'],
    answer: 'Adverb',
    explanation: '"Quickly" modifies the verb "ran", so it is an adverb.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Identify the adjective in: "The tall man wore a blue shirt."',
    options: ['tall', 'man', 'wore', 'shirt'],
    answer: 'tall',
    explanation: '"Tall" describes the noun "man", so it is an adjective.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Which of these is a preposition?',
    options: ['Across', 'And', 'But', 'Oh'],
    answer: 'Across',
    explanation: '"Across" shows relationship between a noun and another word — it is a preposition.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'What is the verb in: "She writes beautiful poems."?',
    options: ['writes', 'beautiful', 'poems', 'she'],
    answer: 'writes',
    explanation: '"Writes" is the action word — the verb — in this sentence.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Identify the conjunction in: "I was tired but I kept going."',
    options: ['but', 'tired', 'kept', 'going'],
    answer: 'but',
    explanation: '"But" is a coordinating conjunction joining two independent clauses.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Which of these is a personal pronoun?',
    options: ['They', 'Which', 'This', 'Each'],
    answer: 'They',
    explanation: '"They" is a personal pronoun referring to people or things.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'What type of noun is "Lagos"?',
    options: ['Proper noun', 'Common noun', 'Abstract noun', 'Collective noun'],
    answer: 'Proper noun',
    explanation: '"Lagos" names a specific place — it is a proper noun and must be capitalised.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Which word is an interjection?',
    options: ['Wow!', 'And', 'The', 'Quickly'],
    answer: 'Wow!',
    explanation: '"Wow!" expresses strong emotion and is an interjection.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Identify the article in: "An apple a day keeps the doctor away."',
    options: ['An', 'day', 'keeps', 'away'],
    answer: 'An',
    explanation: '"An" is an indefinite article used before words starting with a vowel sound.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'What type of adjective is "this" in "this book"?',
    options: ['Demonstrative', 'Possessive', 'Interrogative', 'Distributive'],
    answer: 'Demonstrative',
    explanation: '"This" points to a specific noun and is a demonstrative adjective.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Which sentence contains a transitive verb?',
    options: ['She kicked the ball', 'He laughed', 'They slept', 'The bird flew'],
    answer: 'She kicked the ball',
    explanation: 'A transitive verb takes an object. "Kicked" takes "the ball" as object.'
  },
  {
    topic: 'Parts of Speech',
    questionText: '"Herd" in "a herd of cattle" is a:',
    options: ['Collective noun', 'Proper noun', 'Abstract noun', 'Common noun'],
    answer: 'Collective noun',
    explanation: 'A collective noun names a group of animals or people: herd, flock, team.'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'What is the plural of "phenomenon"?',
    options: ['Phenomena', 'Phenomenons', 'Phenomenas', 'Phenomeni'],
    answer: 'Phenomena',
    explanation: '"Phenomenon" is a Greek-origin word. Its plural is "phenomena".'
  },
  {
    topic: 'Parts of Speech',
    questionText: 'Identify the possessive pronoun in: "That book is mine."',
    options: ['mine', 'book', 'that', 'is'],
    answer: 'mine',
    explanation: '"Mine" is a possessive pronoun showing ownership without a following noun.'
  },

  // --- Tenses and Concord (20 questions) ---
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct sentence:',
    options: ['The news is good', 'The news are good', 'The news were good', 'The news be good'],
    answer: 'The news is good',
    explanation: '"News" is an uncountable noun and takes a singular verb.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Which tense is used in: "I had eaten before she arrived."?',
    options: ['Past perfect', 'Simple past', 'Past continuous', 'Present perfect'],
    answer: 'Past perfect',
    explanation: 'The past perfect tense (had + past participle) shows an action completed before another past action.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct form: Each of the students _____ a book.',
    options: ['has', 'have', 'had been', 'are having'],
    answer: 'has',
    explanation: '"Each" is singular and takes a singular verb: has.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Fill in: By next year, I _____ here for ten years.',
    options: ['will have lived', 'will live', 'have lived', 'had lived'],
    answer: 'will have lived',
    explanation: 'Future perfect tense is used for actions completed before a future point.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct option: The jury _____ their verdict.',
    options: ['have reached', 'has reached', 'is reaching', 'reaches'],
    answer: 'have reached',
    explanation: '"Jury" acting as individuals takes a plural verb.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Identify the tense: "She is reading a novel."',
    options: ['Present continuous', 'Simple present', 'Present perfect', 'Future simple'],
    answer: 'Present continuous',
    explanation: 'Is + reading (present participle) forms the present continuous tense.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct form: Neither John nor his friends _____ coming.',
    options: ['are', 'is', 'was', 'were'],
    answer: 'are',
    explanation: 'With neither...nor, the verb agrees with the subject nearest to it (friends — plural).'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Select the correct sentence:',
    options: ['Mathematics is my favourite subject', 'Mathematics are my favourite subject', 'Mathematics were easy', 'Mathematics have been fun'],
    answer: 'Mathematics is my favourite subject',
    explanation: 'Subjects ending in "-ics" like mathematics are singular.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Which is correct? "I _____ him since Monday."',
    options: ['have not seen', 'did not see', 'had not seen', 'was not seeing'],
    answer: 'have not seen',
    explanation: '"Since" with a specific time requires the present perfect tense.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'The sentence "If I were rich, I would travel the world" uses:',
    options: ['Second conditional', 'First conditional', 'Third conditional', 'Zero conditional'],
    answer: 'Second conditional',
    explanation: 'Second conditional uses if + past simple + would + infinitive for hypothetical situations.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct option: A number of students _____ absent.',
    options: ['were', 'was', 'is', 'has been'],
    answer: 'were',
    explanation: '"A number of" takes a plural verb.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Fill in: She _____ her homework before dinner yesterday.',
    options: ['had finished', 'has finished', 'finished', 'will finish'],
    answer: 'had finished',
    explanation: 'Past perfect is used for an action completed before another past event.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct verb form: The police _____ arrived.',
    options: ['have', 'has', 'is', 'was'],
    answer: 'have',
    explanation: '"Police" is always plural and takes plural verb forms.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Select the passive voice sentence:',
    options: ['The letter was written by John', 'John wrote the letter', 'John is writing the letter', 'John will write the letter'],
    answer: 'The letter was written by John',
    explanation: 'Passive voice: subject receives the action. was written is passive.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Which sentence is in the future continuous tense?',
    options: ['I will be studying tomorrow', 'I will study tomorrow', 'I am studying tomorrow', 'I have been studying'],
    answer: 'I will be studying tomorrow',
    explanation: 'Future continuous: will be + present participle.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct form: Two kilometres _____ a long distance to walk.',
    options: ['is', 'are', 'were', 'have been'],
    answer: 'is',
    explanation: 'A specific distance treated as a single unit takes a singular verb.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Identify the tense: "They have been waiting for two hours."',
    options: ['Present perfect continuous', 'Past perfect', 'Present continuous', 'Past continuous'],
    answer: 'Present perfect continuous',
    explanation: 'Have been + present participle forms the present perfect continuous tense.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct sentence:',
    options: ['He goes to church every Sunday', 'He go to church every Sunday', 'He going to church every Sunday', 'He gone to church every Sunday'],
    answer: 'He goes to church every Sunday',
    explanation: 'Simple present, third person singular requires -s on the verb.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Fill in: If he _____ harder, he would pass.',
    options: ['studied', 'studies', 'will study', 'had studied'],
    answer: 'studied',
    explanation: 'Second conditional: If + past simple, would + infinitive.'
  },
  {
    topic: 'Tenses and Concord',
    questionText: 'Choose the correct form: The scissors _____ on the table.',
    options: ['are', 'is', 'was', 'has been'],
    answer: 'are',
    explanation: 'Scissors is always plural and takes a plural verb.'
  },

  // --- Essay and Summary Writing (15 questions) ---
  {
    topic: 'Essay and Summary Writing',
    questionText: 'Which type of essay presents arguments for and against a topic?',
    options: ['Argumentative essay', 'Descriptive essay', 'Narrative essay', 'Expository essay'],
    answer: 'Argumentative essay',
    explanation: 'An argumentative essay presents both sides of an issue and takes a stance.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'A formal letter should begin with:',
    options: ["The writer's address and date", 'Dear friend', 'Hello', 'To whom it may concern only'],
    answer: "The writer's address and date",
    explanation: 'A formal letter begins with the sender\'s address, then the date, then the recipient\'s address.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'What is the purpose of a summary?',
    options: ['To condense a passage into main points', 'To expand a passage with details', 'To criticise a passage', 'To copy a passage word for word'],
    answer: 'To condense a passage into main points',
    explanation: 'A summary captures the essential points of a text in a shorter form.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'Which of these is an appropriate closing for a formal letter to someone you know by name?',
    options: ['Yours sincerely', 'Yours faithfully', 'Best wishes', 'Lots of love'],
    answer: 'Yours sincerely',
    explanation: '"Yours sincerely" is used when the recipient is addressed by name.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'A narrative essay primarily:',
    options: ['Tells a story', 'Describes an object', 'Argues a point', 'Explains a process'],
    answer: 'Tells a story',
    explanation: 'A narrative essay tells a story from a particular point of view.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'In essay writing, the introduction should:',
    options: ['Hook the reader and present the thesis', 'List all evidence', 'Conclude the argument', 'Define every term used'],
    answer: 'Hook the reader and present the thesis',
    explanation: 'A good introduction grabs attention and presents the main argument.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'Which closing is used when a formal letter begins with "Dear Sir"?',
    options: ['Yours faithfully', 'Yours sincerely', 'Yours truly', 'With regards'],
    answer: 'Yours faithfully',
    explanation: '"Yours faithfully" is used when the recipient is not addressed by name.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'A descriptive essay mainly aims to:',
    options: ['Paint a vivid picture with words', 'Persuade the reader', 'Narrate an event', 'Explain a concept'],
    answer: 'Paint a vivid picture with words',
    explanation: 'A descriptive essay uses sensory details to create a picture in the reader\'s mind.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'The body of an essay contains:',
    options: ['Supporting paragraphs with evidence', 'The introduction only', 'The conclusion only', 'The title and author'],
    answer: 'Supporting paragraphs with evidence',
    explanation: 'The body consists of paragraphs that develop and support the thesis.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'What is a thesis statement?',
    options: ['The main argument of an essay', 'The title of an essay', 'The conclusion of an essay', 'A quotation from a book'],
    answer: 'The main argument of an essay',
    explanation: 'A thesis statement presents the central claim or argument of the essay.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'In summary writing, you should write in:',
    options: ['Your own words', 'The exact words of the passage', 'Direct speech', 'Bullet points always'],
    answer: 'Your own words',
    explanation: 'A good summary paraphrases the original text in the writer\'s own words.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'Which of these is NOT a feature of informal letters?',
    options: ["Use of the recipient's official title", 'Friendly tone', 'Colloquial language', 'Personal topics'],
    answer: "Use of the recipient's official title",
    explanation: 'Informal letters use friendly tone and personal language, not formal titles.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'An expository essay aims to:',
    options: ['Explain and inform', 'Tell a story', 'Argue a position', 'Describe a scene'],
    answer: 'Explain and inform',
    explanation: 'An expository essay explains a topic clearly and objectively.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'A concluding paragraph should:',
    options: ['Restate the thesis and summarise key points', 'Introduce new arguments', 'Begin with "In conclusion" only', 'Copy the introduction'],
    answer: 'Restate the thesis and summarise key points',
    explanation: 'A conclusion wraps up the essay by restating the main argument and summarising.'
  },
  {
    topic: 'Essay and Summary Writing',
    questionText: 'Which is the correct format for the subject line in a formal letter?',
    options: ['Re: Application for Employment', 'Subject - application for employment', 'SUBJECT: application for employment.', 're application for Employment'],
    answer: 'Re: Application for Employment',
    explanation: 'The subject line in a formal letter is typically written as "Re:" followed by the topic.'
  },
];


// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    let teacher = await User.findOne({ role: 'teacher' });
if (!teacher) teacher = await User.findOne({ role: 'admin' });
if (!teacher) {
  console.error('No teacher or admin found. Run seed.js first.');
  process.exit(1);
}

    // --- Create or find Mathematics subject ---
    let mathSubject = await Subject.findOne({ name: 'Mathematics' });
    if (!mathSubject) {
      mathSubject = await Subject.create({
        name:        'Mathematics',
        description: 'SS3 WAEC level Mathematics'
      });
      console.log('Created Mathematics subject');
    } else {
      console.log('Mathematics subject already exists');
    }

    // --- Create or find English Language subject ---
    let englishSubject = await Subject.findOne({ name: 'English Language' });
    if (!englishSubject) {
      englishSubject = await Subject.create({
        name:        'English Language',
        description: 'SS3 WAEC level English Language'
      });
      console.log('Created English Language subject');
    } else {
      console.log('English Language subject already exists');
    }

    // --- Create Mathematics syllabus topics ---
    const mathSyllabusMap = {};
    for (const t of mathTopics) {
      let existing = await Syllabus.findOne({ subjectId: mathSubject._id, topic: t.topic });
      if (!existing) {
        existing = await Syllabus.create({
          subjectId:   mathSubject._id,
          topic:       t.topic,
          description: t.description
        });
        console.log(`Created Math topic: ${t.topic}`);
      }
      mathSyllabusMap[t.topic] = existing._id;
    }

    // --- Create English syllabus topics ---
    const englishSyllabusMap = {};
    for (const t of englishTopics) {
      let existing = await Syllabus.findOne({ subjectId: englishSubject._id, topic: t.topic });
      if (!existing) {
        existing = await Syllabus.create({
          subjectId:   englishSubject._id,
          topic:       t.topic,
          description: t.description
        });
        console.log(`Created English topic: ${t.topic}`);
      }
      englishSyllabusMap[t.topic] = existing._id;
    }

    // --- Seed Mathematics questions ---
    let mathAdded = 0;
    for (const q of mathQuestions) {
      const existing = await Question.findOne({
        subjectId:    mathSubject._id,
        questionText: q.questionText
      });
      if (!existing) {
        await Question.create({
          subjectId:    mathSubject._id,
          teacherId:    teacher._id,
          syllabusId:   mathSyllabusMap[q.topic],
          questionText: q.questionText,
          options:      q.options,
          answer:       q.answer,
          explanation:  q.explanation
        });
        mathAdded++;
      }
    }
    console.log(`Added ${mathAdded} Mathematics questions`);

    // --- Seed English questions ---
    let englishAdded = 0;
    for (const q of englishQuestions) {
      const existing = await Question.findOne({
        subjectId:    englishSubject._id,
        questionText: q.questionText
      });
      if (!existing) {
        await Question.create({
          subjectId:    englishSubject._id,
          teacherId:    teacher._id,
          syllabusId:   englishSyllabusMap[q.topic],
          questionText: q.questionText,
          options:      q.options,
          answer:       q.answer,
          explanation:  q.explanation
        });
        englishAdded++;
      }
    }
    console.log(`Added ${englishAdded} English Language questions`);

    console.log('');
    console.log('Seed completed successfully!');
    console.log(`Mathematics: ${mathAdded} questions added`);
    console.log(`English Language: ${englishAdded} questions added`);
    console.log('Subjects and syllabus topics created automatically.');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedQuestions();
