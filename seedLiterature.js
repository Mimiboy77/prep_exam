'use strict';

// ============================================================
// seedLiterature.js  — COMPLETE VERSION
// Run with: node seedLiterature.js
// General Literature in English — 300 questions
// Covers ALL areas tested in WAEC/NECO/JAMB
// Safe to run multiple times — skips existing questions
//
// TOPICS:
//  1. Figure of Speech         (60 questions)
//  2. Drama                    (50 questions)
//  3. Prose and Narrative      (50 questions)
//  4. Poetry                   (50 questions)
//  5. Literary Terms & Genres  (40 questions)
//  6. African Literature       (30 questions)
//  7. Language & Style         (20 questions)
// ============================================================

const mongoose = require('mongoose');
require('dotenv').config();

const User     = require('./models/User');
const Subject  = require('./models/Subject');
const Syllabus = require('./models/Syllabus');
const Question = require('./models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/exam-prep-app';

// ============================================================
// SYLLABUS TOPICS
// ============================================================
const litTopics = [
  { topic: 'Figure of Speech',        description: 'All figures of speech including simile, metaphor, irony, hyperbole, oxymoron, alliteration, personification and more' },
  { topic: 'Drama',                   description: 'Elements of drama, dramatic devices, tragic and comic conventions, African and world drama' },
  { topic: 'Prose and Narrative',     description: 'Novels, short stories, narrative techniques, point of view, characterisation and African prose fiction' },
  { topic: 'Poetry',                  description: 'Elements of poetry, poetic forms, poetic devices, African and world poetry' },
  { topic: 'Literary Terms & Genres', description: 'Literary genres, forms, critical terms, movements and schools of criticism' },
  { topic: 'African Literature',      description: 'Oral tradition, African novel, drama and poetry, Negritude, diaspora and post-colonial literature' },
  { topic: 'Language and Style',      description: 'Diction, register, tone, mood, syntax, voice and stylistic analysis' },
];

// ============================================================
// QUESTIONS
// ============================================================
const litQuestions = [

  // ==========================================================
  // FIGURE OF SPEECH (60 questions)
  // ==========================================================

  {
    topic: 'Figure of Speech',
    questionText: '"A time to sow, a time to reap, a time to be born, a time to die." This exemplifies the use of ______',
    options: ['Anadiplosis', 'Chiasmus', 'Anaphora', 'Hendiadys'],
    answer: 'Anaphora',
    explanation: 'Anaphora is the repetition of a word or phrase at the beginning of successive clauses — here "a time to" is repeated.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Poisonous pleasure of wine" illustrates the use of ______',
    options: ['Antithesis', 'Metaphor', 'Oxymoron', 'Synecdoche'],
    answer: 'Oxymoron',
    explanation: 'Oxymoron combines two contradictory terms — "poisonous" and "pleasure" are opposites placed together.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'Alliteration is the repetition of ______',
    options: ['Vowel sounds within words', 'The same initial consonant sound in closely connected words', 'A word at the end of successive lines', 'A phrase throughout a poem'],
    answer: 'The same initial consonant sound in closely connected words',
    explanation: 'Alliteration is when the same consonant sound appears at the beginning of several closely linked words e.g. "Peter Piper picked".'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"The towering earth was tired of sitting in one position. She moved suddenly." The predominant figure of speech is ______',
    options: ['Oxymoron', 'Personification', 'Hyperbole', 'Simile'],
    answer: 'Personification',
    explanation: 'Personification gives human qualities to non-human things — the earth is described as "tired" and referred to as "she".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The phrase "living death" is an example of ______',
    options: ['Synecdoche', 'Antithesis', 'Oxymoron', 'Paradox'],
    answer: 'Oxymoron',
    explanation: '"Living death" combines two contradictory ideas in a single phrase — this is oxymoron.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"I am jealous and passionate like Jehovah." The device used is ______',
    options: ['Simile', 'Paradox', 'Metaphor', 'Hyperbole'],
    answer: 'Simile',
    explanation: 'A simile makes a comparison using "like" or "as". Here the comparison uses "like".'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"The pen is mightier than the sword" is an example of ______',
    options: ['Simile', 'Metaphor', 'Synecdoche', 'Metonymy'],
    answer: 'Metonymy',
    explanation: '"Pen" stands for writing/ideas and "sword" stands for military force — substituting a related concept is metonymy.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The use of a word that imitates a natural sound is called ______',
    options: ['Alliteration', 'Assonance', 'Onomatopoeia', 'Euphony'],
    answer: 'Onomatopoeia',
    explanation: 'Onomatopoeia refers to words that phonetically imitate the sound they describe e.g. "buzz", "hiss", "crash".'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Life is a journey" is an example of ______',
    options: ['Simile', 'Metaphor', 'Personification', 'Allegory'],
    answer: 'Metaphor',
    explanation: 'A metaphor makes a direct comparison without using "like" or "as". Life is directly said to be a journey.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"She is as brave as a lion" is an example of ______',
    options: ['Metaphor', 'Personification', 'Simile', 'Hyperbole'],
    answer: 'Simile',
    explanation: 'A simile compares two things using "as" or "like".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The repetition of vowel sounds within words in a line of poetry is called ______',
    options: ['Alliteration', 'Consonance', 'Assonance', 'Rhyme'],
    answer: 'Assonance',
    explanation: 'Assonance is the repetition of vowel sounds in nearby words e.g. "the rain in Spain stays mainly in the plain".'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"I have told you a million times!" is an example of ______',
    options: ['Litotes', 'Hyperbole', 'Irony', 'Euphemism'],
    answer: 'Hyperbole',
    explanation: 'Hyperbole is deliberate exaggeration for effect. Saying "a million times" is obviously an overstatement.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When the real meaning is opposite to the literal meaning of the words used, the figure of speech is ______',
    options: ['Sarcasm', 'Paradox', 'Irony', 'Satire'],
    answer: 'Irony',
    explanation: 'Irony is when words are used to mean the opposite of what they literally say.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"The stars danced playfully in the moonlit sky." This sentence contains ______',
    options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
    answer: 'Personification',
    explanation: 'Personification attributes human actions to non-human things — stars cannot literally dance.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A reference to a historical, literary, or mythological person, place, or event is called ______',
    options: ['Allusion', 'Allegory', 'Analogy', 'Apostrophe'],
    answer: 'Allusion',
    explanation: 'An allusion is an indirect reference to something of historical, cultural, or literary significance.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"It was the best of times, it was the worst of times." This is an example of ______',
    options: ['Oxymoron', 'Paradox', 'Antithesis', 'Irony'],
    answer: 'Antithesis',
    explanation: 'Antithesis places two contrasting ideas in parallel structure — "best" and "worst" are direct opposites placed side by side.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"She passed away" instead of "she died" is an example of ______',
    options: ['Irony', 'Euphemism', 'Litotes', 'Understatement'],
    answer: 'Euphemism',
    explanation: 'A euphemism is a mild or indirect word substituted for one that might be harsh or blunt.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Not bad" meaning "good" is an example of ______',
    options: ['Irony', 'Euphemism', 'Litotes', 'Understatement'],
    answer: 'Litotes',
    explanation: 'Litotes is understatement using a negative to express a positive — "not bad" means "quite good".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The repetition of the same consonant sound at the end of words is called ______',
    options: ['Alliteration', 'Assonance', 'Consonance', 'Rhyme'],
    answer: 'Consonance',
    explanation: 'Consonance is the repetition of consonant sounds especially at the end of words e.g. "pitter patter".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A figure of speech that states a seemingly contradictory statement that may nonetheless be true is called ______',
    options: ['Irony', 'Oxymoron', 'Paradox', 'Antithesis'],
    answer: 'Paradox',
    explanation: 'A paradox is a statement that seems self-contradictory but contains a deeper truth e.g. "I must be cruel to be kind".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The use of "the crown" to refer to the king is an example of ______',
    options: ['Synecdoche', 'Metonymy', 'Allegory', 'Irony'],
    answer: 'Metonymy',
    explanation: 'Metonymy is the use of something closely associated with an idea to represent that idea — the crown represents the king.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"O Death, where is thy sting?" is an example of ______',
    options: ['Personification', 'Apostrophe', 'Allusion', 'Rhetorical question'],
    answer: 'Apostrophe',
    explanation: 'Apostrophe directly addresses an absent or abstract entity — here death is addressed directly.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When an author gives hints about what will happen later in the story, this is called ______',
    options: ['Flashback', 'Foreshadowing', 'Irony', 'Allusion'],
    answer: 'Foreshadowing',
    explanation: 'Foreshadowing is a literary device where the author gives hints or clues about events that will happen later.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Fair is foul and foul is fair." (Macbeth) This is an example of ______',
    options: ['Oxymoron', 'Paradox', 'Chiasmus', 'Antithesis'],
    answer: 'Chiasmus',
    explanation: 'Chiasmus reverses the order of words in the second clause — "fair/foul" becomes "foul/fair".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The substitution of a part for a whole or a whole for a part is called ______',
    options: ['Metonymy', 'Synecdoche', 'Allegory', 'Symbolism'],
    answer: 'Synecdoche',
    explanation: 'Synecdoche uses a part to represent the whole e.g. "all hands on deck" where hands represent people.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"He is as old as Methuselah." The figure of speech is ______',
    options: ['Simile only', 'Allusion only', 'Both simile and allusion', 'Metaphor'],
    answer: 'Both simile and allusion',
    explanation: 'The sentence uses "as...as" making it a simile, and references a Biblical figure making it also an allusion.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"I shall return" — when a character says this and dies before returning, what device is at play?',
    options: ['Dramatic irony', 'Situational irony', 'Verbal irony', 'Sarcasm'],
    answer: 'Dramatic irony',
    explanation: 'Dramatic irony occurs when the audience knows something the character does not — we know he will not return.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The figure of speech in which a speaker says less than what is meant is ______',
    options: ['Hyperbole', 'Irony', 'Understatement', 'Euphemism'],
    answer: 'Understatement',
    explanation: 'Understatement deliberately makes something seem less important or serious than it actually is.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When an inanimate object is addressed as if it were alive, the figure used is ______',
    options: ['Personification', 'Apostrophe', 'Metaphor', 'Allegory'],
    answer: 'Apostrophe',
    explanation: 'Apostrophe directly addresses an absent or non-human entity e.g. "O Solitude! if I must with thee dwell..."'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A literary device in which parts of a sentence are grammatically the same or similar in construction is ______',
    options: ['Antithesis', 'Chiasmus', 'Parallelism', 'Anaphora'],
    answer: 'Parallelism',
    explanation: 'Parallelism is the use of components in a sentence that are grammatically the same or similar in construction.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"All the world\'s a stage." (Shakespeare) This is an example of ______',
    options: ['Simile', 'Metaphor', 'Allegory', 'Personification'],
    answer: 'Metaphor',
    explanation: 'The world is directly compared to a stage without using "like" or "as" — this is a metaphor.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A story in which characters and events represent abstract ideas or moral qualities is called ______',
    options: ['Fable', 'Allegory', 'Parable', 'Myth'],
    answer: 'Allegory',
    explanation: 'An allegory is a narrative in which characters, events, and settings represent abstract ideas or moral qualities.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"The silence was deafening." This is an example of ______',
    options: ['Simile', 'Oxymoron', 'Paradox', 'Personification'],
    answer: 'Oxymoron',
    explanation: 'Silence cannot be deafening — combining these contradictory ideas makes it an oxymoron.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Buzz", "hiss", and "murmur" are examples of ______',
    options: ['Alliteration', 'Assonance', 'Onomatopoeia', 'Euphony'],
    answer: 'Onomatopoeia',
    explanation: 'These words imitate the natural sounds they describe.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When an author uses hints and clues to suggest future events in a narrative, it is called ______',
    options: ['Flashback', 'Foreshadowing', 'Symbolism', 'Irony'],
    answer: 'Foreshadowing',
    explanation: 'Foreshadowing is a literary device that gives the reader hints about what will happen later in the story.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Peter Piper picked a peck of pickled peppers." The figure of speech is ______',
    options: ['Assonance', 'Consonance', 'Alliteration', 'Rhyme'],
    answer: 'Alliteration',
    explanation: 'The "p" sound repeats at the beginning of several words — this is alliteration.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When the outcome of events is opposite to what was expected, this is ______',
    options: ['Verbal irony', 'Dramatic irony', 'Situational irony', 'Cosmic irony'],
    answer: 'Situational irony',
    explanation: 'Situational irony occurs when the actual outcome of a situation is the opposite of what was expected.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A mild or pleasant word used in place of a harsh or offensive one is called ______',
    options: ['Irony', 'Litotes', 'Euphemism', 'Understatement'],
    answer: 'Euphemism',
    explanation: 'Euphemism substitutes a pleasant word for an unpleasant one e.g. "passed away" for "died".'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"The roaring of the lion filled the forest." "Roaring" is an example of ______',
    options: ['Alliteration', 'Assonance', 'Onomatopoeia', 'Consonance'],
    answer: 'Onomatopoeia',
    explanation: '"Roaring" imitates the actual sound a lion makes.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'Repetition of the last word of one clause at the beginning of the next is called ______',
    options: ['Anaphora', 'Anadiplosis', 'Epistrophe', 'Symploce'],
    answer: 'Anadiplosis',
    explanation: 'Anadiplosis repeats the last word of one clause at the start of the next e.g. "Fear leads to anger; anger leads to hate."'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'Repetition of words at the END of successive clauses is called ______',
    options: ['Anaphora', 'Anadiplosis', 'Epistrophe', 'Chiasmus'],
    answer: 'Epistrophe',
    explanation: 'Epistrophe (also called epiphora) is the repetition of a word or phrase at the end of successive clauses.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"She sells seashells by the seashore" uses which figure of speech?',
    options: ['Assonance', 'Consonance', 'Alliteration', 'Rhyme'],
    answer: 'Alliteration',
    explanation: 'The "s" sound repeats at the beginning of several words — this is alliteration.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A rhetorical question is one that ______',
    options: ['Requires an immediate answer', 'Is asked for effect and does not require an answer', 'Is asked by a teacher in class', 'Is always ironic'],
    answer: 'Is asked for effect and does not require an answer',
    explanation: 'A rhetorical question is asked to make a point or create an effect rather than to get an answer.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'Giving human qualities or feelings to animals or objects is called ______',
    options: ['Allegory', 'Anthropomorphism', 'Personification', 'Both B and C'],
    answer: 'Both B and C',
    explanation: 'Both personification and anthropomorphism involve giving human qualities to non-human things, though anthropomorphism is more complete.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The deliberate use of many conjunctions in succession is called ______',
    options: ['Asyndeton', 'Polysyndeton', 'Parallelism', 'Anaphora'],
    answer: 'Polysyndeton',
    explanation: 'Polysyndeton uses many conjunctions e.g. "We laughed and sang and danced and celebrated."'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The deliberate omission of conjunctions between successive phrases is called ______',
    options: ['Polysyndeton', 'Asyndeton', 'Ellipsis', 'Parallelism'],
    answer: 'Asyndeton',
    explanation: 'Asyndeton omits conjunctions for speed and effect e.g. "I came, I saw, I conquered."'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When a writer uses the name of one thing to mean another closely associated thing, it is ______',
    options: ['Synecdoche', 'Metonymy', 'Irony', 'Allegory'],
    answer: 'Metonymy',
    explanation: 'Metonymy substitutes a closely related term e.g. "the White House" for the US President or government.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The placing of a word or phrase at the beginning of a sentence for emphasis is called ______',
    options: ['Inversion', 'Anaphora', 'Fronting', 'Chiasmus'],
    answer: 'Fronting',
    explanation: 'Fronting places an element at the front of a sentence for emphasis e.g. "Beautiful she was, but cold."'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Darkness is his companion." The figure of speech is ______',
    options: ['Simile', 'Metaphor', 'Personification', 'Synecdoche'],
    answer: 'Metaphor',
    explanation: 'Darkness is directly equated to a companion without using "like" or "as" — this is a metaphor.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The figure of speech used when a part of something is used to refer to the whole is ______',
    options: ['Metonymy', 'Synecdoche', 'Allegory', 'Symbolism'],
    answer: 'Synecdoche',
    explanation: 'Synecdoche uses a part for the whole e.g. "hired hands" meaning "hired workers".'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'A figure of speech in which someone absent or dead is spoken to as if present is ______',
    options: ['Personification', 'Soliloquy', 'Apostrophe', 'Invocation'],
    answer: 'Apostrophe',
    explanation: 'Apostrophe addresses someone or something that is absent, dead, or unable to respond e.g. "O Romeo, Romeo, wherefore art thou Romeo?"'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'Using "the bottle" to mean alcohol is an example of ______',
    options: ['Synecdoche', 'Metonymy', 'Symbolism', 'Allegory'],
    answer: 'Metonymy',
    explanation: '"The bottle" is closely associated with alcohol and is used to represent it — this is metonymy.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The figure of speech "an army of ants" involves ______',
    options: ['Personification', 'Metaphor', 'Hyperbole', 'Simile'],
    answer: 'Metaphor',
    explanation: 'The ants are directly compared to an army without using "like" or "as" — this is an implied metaphor.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"The moon was a ghostly galleon tossed upon cloudy seas." This line contains ______',
    options: ['Simile', 'Metaphor', 'Personification', 'Alliteration'],
    answer: 'Metaphor',
    explanation: 'The moon is directly called a galleon (a sailing ship) without using "like" or "as" — this is a metaphor.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'Which figure of speech is used in "ten thousand saw I at a glance"?',
    options: ['Simile', 'Personification', 'Hyperbole', 'Synecdoche'],
    answer: 'Hyperbole',
    explanation: 'Seeing exactly ten thousand daffodils at a glance is a deliberate exaggeration — hyperbole.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The use of mild words to soften the effect of something painful or embarrassing is ______',
    options: ['Irony', 'Paradox', 'Euphemism', 'Litotes'],
    answer: 'Euphemism',
    explanation: 'Euphemism replaces harsh words with gentle ones to lessen their impact.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Time and tide wait for no man" is an example of ______',
    options: ['Allusion', 'Proverb', 'Hyperbole', 'Metaphor'],
    answer: 'Proverb',
    explanation: 'A proverb is a short well-known saying expressing a general truth or piece of advice.'
  },
  {
    topic: 'Figure of Speech',
    questionText: '"Laughter is the best medicine" contains which figure of speech?',
    options: ['Simile', 'Metaphor', 'Personification', 'Irony'],
    answer: 'Metaphor',
    explanation: 'Laughter is directly called medicine without using "like" or "as" — this is a metaphor.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'When a character says the opposite of what they mean sarcastically, this is ______',
    options: ['Paradox', 'Verbal irony / sarcasm', 'Dramatic irony', 'Situational irony'],
    answer: 'Verbal irony / sarcasm',
    explanation: 'Verbal irony is saying the opposite of what one means. When used harshly or mockingly, it becomes sarcasm.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'The figure of speech "the mouth of the river" is an example of ______',
    options: ['Personification', 'Metaphor', 'Allegory', 'Synecdoche'],
    answer: 'Metaphor',
    explanation: 'The word "mouth" is borrowed from the human body and applied to the river — a dead metaphor now used literally in geography.'
  },
  {
    topic: 'Figure of Speech',
    questionText: 'An extended metaphor that runs through an entire poem or passage is called a ______',
    options: ['Allegory', 'Conceit', 'Symbol', 'Motif'],
    answer: 'Conceit',
    explanation: 'A conceit is an extended, elaborate metaphor that is sustained throughout a piece of writing, common in metaphysical poetry.'
  },

  // ==========================================================
  // DRAMA (50 questions)
  // ==========================================================

  {
    topic: 'Drama',
    questionText: 'A speech in a play in which a character speaks their thoughts alone on stage is called ______',
    options: ['Aside', 'Soliloquy', 'Monologue', 'Dialogue'],
    answer: 'Soliloquy',
    explanation: 'A soliloquy is when a character speaks their innermost thoughts aloud when alone on stage, revealing feelings to the audience.'
  },
  {
    topic: 'Drama',
    questionText: 'A speech made directly to the audience without other characters hearing is called ______',
    options: ['Soliloquy', 'Aside', 'Monologue', 'Prologue'],
    answer: 'Aside',
    explanation: 'An aside is a remark made by a character directly to the audience which other characters on stage cannot hear.'
  },
  {
    topic: 'Drama',
    questionText: 'The leading character in a drama is called the ______',
    options: ['Antagonist', 'Protagonist', 'Foil', 'Narrator'],
    answer: 'Protagonist',
    explanation: 'The protagonist is the main character around whom the action of a story revolves.'
  },
  {
    topic: 'Drama',
    questionText: 'The character who opposes the protagonist is called the ______',
    options: ['Protagonist', 'Foil', 'Antagonist', 'Anti-hero'],
    answer: 'Antagonist',
    explanation: 'The antagonist is the character or force that opposes the protagonist and creates conflict.'
  },
  {
    topic: 'Drama',
    questionText: 'A drama that ends happily is called a ______',
    options: ['Tragedy', 'Farce', 'Comedy', 'Tragicomedy'],
    answer: 'Comedy',
    explanation: 'Comedy is a dramatic work that is light and humorous, typically ending happily.'
  },
  {
    topic: 'Drama',
    questionText: 'A drama that ends in the downfall or death of the main character is called a ______',
    options: ['Comedy', 'Farce', 'Melodrama', 'Tragedy'],
    answer: 'Tragedy',
    explanation: 'Tragedy is a form of drama in which the protagonist suffers a catastrophic downfall, often resulting in death.'
  },
  {
    topic: 'Drama',
    questionText: 'The fatal flaw in the character of a tragic hero is called ______',
    options: ['Nemesis', 'Catharsis', 'Hubris', 'Hamartia'],
    answer: 'Hamartia',
    explanation: 'Hamartia is the fatal flaw or error of judgement that brings about the downfall of the tragic hero.'
  },
  {
    topic: 'Drama',
    questionText: 'Excessive pride or arrogance that leads to the downfall of a tragic hero is called ______',
    options: ['Hamartia', 'Nemesis', 'Hubris', 'Catharsis'],
    answer: 'Hubris',
    explanation: 'Hubris is excessive pride or self-confidence that typically leads to the downfall of a tragic character.'
  },
  {
    topic: 'Drama',
    questionText: 'The purging of emotions such as pity and fear in the audience of a tragedy is called ______',
    options: ['Nemesis', 'Catharsis', 'Hubris', 'Anagnorisis'],
    answer: 'Catharsis',
    explanation: 'Catharsis is the emotional release and purification experienced by the audience watching a tragedy.'
  },
  {
    topic: 'Drama',
    questionText: 'The moment of highest tension or turning point in a play is called the ______',
    options: ['Exposition', 'Rising action', 'Climax', 'Denouement'],
    answer: 'Climax',
    explanation: 'The climax is the moment of greatest tension or turning point in the plot of a drama.'
  },
  {
    topic: 'Drama',
    questionText: 'The resolution or final outcome of a play is called the ______',
    options: ['Climax', 'Falling action', 'Denouement', 'Catastrophe'],
    answer: 'Denouement',
    explanation: 'The denouement is the final resolution of the plot, coming after the climax.'
  },
  {
    topic: 'Drama',
    questionText: 'A sudden reversal of fortune in a drama is called ______',
    options: ['Anagnorisis', 'Peripeteia', 'Catharsis', 'Hubris'],
    answer: 'Peripeteia',
    explanation: 'Peripeteia is the sudden reversal of fortune experienced by the protagonist in a tragedy.'
  },
  {
    topic: 'Drama',
    questionText: 'The critical moment when a character makes a crucial discovery about themselves or their situation is called ______',
    options: ['Catharsis', 'Nemesis', 'Anagnorisis', 'Peripeteia'],
    answer: 'Anagnorisis',
    explanation: 'Anagnorisis is the moment of recognition or discovery in a tragedy — the protagonist gains crucial self-knowledge.'
  },
  {
    topic: 'Drama',
    questionText: 'The divine retribution or punishment that falls on a tragic hero is called ______',
    options: ['Catharsis', 'Nemesis', 'Hubris', 'Hamartia'],
    answer: 'Nemesis',
    explanation: 'Nemesis is the divine punishment or retribution that falls on a character who has shown hubris.'
  },
  {
    topic: 'Drama',
    questionText: 'A play that combines elements of both tragedy and comedy is called a ______',
    options: ['Farce', 'Melodrama', 'Tragicomedy', 'Burlesque'],
    answer: 'Tragicomedy',
    explanation: 'A tragicomedy is a play that contains both tragic and comic elements, often ending happily despite serious events.'
  },
  {
    topic: 'Drama',
    questionText: 'An exaggerated form of comedy that relies on physical humour and improbable situations is called ______',
    options: ['Satire', 'Farce', 'Parody', 'Burlesque'],
    answer: 'Farce',
    explanation: 'A farce is a broadly comic dramatic work based on improbable situations and physical (slapstick) humour.'
  },
  {
    topic: 'Drama',
    questionText: 'A drama that mocks a serious work by imitating it in a humorous way is called a ______',
    options: ['Satire', 'Farce', 'Parody', 'Pastiche'],
    answer: 'Parody',
    explanation: 'A parody imitates a work in order to produce a comic effect, exaggerating its characteristic features.'
  },
  {
    topic: 'Drama',
    questionText: 'In Greek drama, the group of performers who comment on the action are called the ______',
    options: ['Cast', 'Chorus', 'Company', 'Ensemble'],
    answer: 'Chorus',
    explanation: 'In Greek drama, the chorus was a group of performers who commented on and interpreted the action of the play.'
  },
  {
    topic: 'Drama',
    questionText: 'A technique in drama where the audience knows something the characters do not is called ______',
    options: ['Verbal irony', 'Situational irony', 'Dramatic irony', 'Sarcasm'],
    answer: 'Dramatic irony',
    explanation: 'Dramatic irony occurs when the audience has knowledge that the characters in the play do not possess.'
  },
  {
    topic: 'Drama',
    questionText: 'The introductory section of a play that provides background information is called the ______',
    options: ['Prologue', 'Exposition', 'Both A and B', 'Epilogue'],
    answer: 'Both A and B',
    explanation: 'Both the prologue and the exposition provide background information — exposition is the more technical term.'
  },
  {
    topic: 'Drama',
    questionText: 'A short speech at the end of a play after the action is finished is called an ______',
    options: ['Prologue', 'Aside', 'Epilogue', 'Soliloquy'],
    answer: 'Epilogue',
    explanation: 'An epilogue is a concluding section that comes after the main action of a play has ended.'
  },
  {
    topic: 'Drama',
    questionText: 'A character who contrasts with the protagonist to highlight particular qualities is called a ______',
    options: ['Antagonist', 'Anti-hero', 'Foil', 'Stock character'],
    answer: 'Foil',
    explanation: 'A foil is a character who contrasts with the protagonist in order to highlight particular qualities.'
  },
  {
    topic: 'Drama',
    questionText: 'A play that uses music and spectacle to create emotional effects through exaggerated plot is called ______',
    options: ['Opera', 'Melodrama', 'Musical', 'Tragicomedy'],
    answer: 'Melodrama',
    explanation: 'Melodrama is a dramatic work that exaggerates plot and characters in order to appeal to the emotions.'
  },
  {
    topic: 'Drama',
    questionText: 'A play written to be read rather than performed is called ______',
    options: ['Closet drama', 'Chamber play', 'Radio play', 'Stage play'],
    answer: 'Closet drama',
    explanation: 'A closet drama is a play written to be read rather than performed on stage.'
  },
  {
    topic: 'Drama',
    questionText: 'The term "deus ex machina" in drama refers to ______',
    options: ['A powerful villain', 'An unlikely or artificial plot device that resolves a difficult situation', 'A stage machine used in Greek drama', 'A type of chorus'],
    answer: 'An unlikely or artificial plot device that resolves a difficult situation',
    explanation: 'Deus ex machina (Latin: god from the machine) refers to an unexpected power or event that saves a seemingly impossible situation.'
  },
  {
    topic: 'Drama',
    questionText: 'Comic relief in a tragedy is used to ______',
    options: ['Make the play a comedy', 'Provide a brief moment of humour to relieve tension before returning to the tragic action', 'Mock the tragic hero', 'Replace the tragic plot'],
    answer: 'Provide a brief moment of humour to relieve tension before returning to the tragic action',
    explanation: 'Comic relief is the inclusion of a humorous scene or character in a tragedy to provide a brief emotional respite for the audience.'
  },
  {
    topic: 'Drama',
    questionText: 'A tragic hero must be ______',
    options: ['A common person', 'A person of noble status whose downfall comes from a character flaw', 'Always killed at the end', 'An entirely evil person'],
    answer: 'A person of noble status whose downfall comes from a character flaw',
    explanation: 'According to Aristotle, a tragic hero is a person of high standing whose downfall results from their hamartia (fatal flaw).'
  },
  {
    topic: 'Drama',
    questionText: 'The series of events that build tension leading to the climax is called ______',
    options: ['Exposition', 'Rising action', 'Falling action', 'Denouement'],
    answer: 'Rising action',
    explanation: 'Rising action is the series of events that build tension and lead to the climax of a story.'
  },
  {
    topic: 'Drama',
    questionText: 'The scene in a play where the action begins to fall after the climax is called ______',
    options: ['Denouement', 'Falling action', 'Resolution', 'Catastrophe'],
    answer: 'Falling action',
    explanation: 'Falling action is the part of a plot that follows the climax and leads toward the resolution.'
  },
  {
    topic: 'Drama',
    questionText: 'The element of drama that refers to the appearance and movements on stage is called ______',
    options: ['Diction', 'Spectacle', 'Melody', 'Plot'],
    answer: 'Spectacle',
    explanation: 'Spectacle refers to the visual elements of a performance — costumes, scenery, and stage effects. Aristotle listed it among the six elements of drama.'
  },
  {
    topic: 'Drama',
    questionText: 'Aristotle\'s six elements of tragedy include all EXCEPT ______',
    options: ['Plot', 'Character', 'Setting', 'Spectacle'],
    answer: 'Setting',
    explanation: 'Aristotle\'s six elements of tragedy are: Plot, Character, Thought, Diction, Melody, and Spectacle. Setting is not one of them.'
  },
  {
    topic: 'Drama',
    questionText: 'The use of an object, person, or event to represent something beyond its literal meaning is called ______',
    options: ['Allegory', 'Symbol', 'Motif', 'Theme'],
    answer: 'Symbol',
    explanation: 'A symbol is something that represents or stands for something else, especially an abstract idea.'
  },
  {
    topic: 'Drama',
    questionText: 'The main idea or central message of a drama is called the ______',
    options: ['Plot', 'Setting', 'Theme', 'Motif'],
    answer: 'Theme',
    explanation: 'The theme is the central idea or underlying message that a dramatic work conveys.'
  },
  {
    topic: 'Drama',
    questionText: 'The time and place in which a drama occurs is called the ______',
    options: ['Theme', 'Plot', 'Setting', 'Atmosphere'],
    answer: 'Setting',
    explanation: 'Setting is the time, place, and environment in which a story or drama takes place.'
  },
  {
    topic: 'Drama',
    questionText: 'The process by which an author develops a character in a literary work is called ______',
    options: ['Plotting', 'Narration', 'Characterisation', 'Setting'],
    answer: 'Characterisation',
    explanation: 'Characterisation is the way an author creates and develops characters in a literary work.'
  },
  {
    topic: 'Drama',
    questionText: 'An anti-hero is a protagonist who ______',
    options: ['Always defeats the villain', 'Lacks conventional heroic qualities but is still the main character', 'Is purely evil', 'Never appears in tragedies'],
    answer: 'Lacks conventional heroic qualities but is still the main character',
    explanation: 'An anti-hero is a central character who lacks traditional heroic qualities like bravery, morality, or idealism.'
  },
  {
    topic: 'Drama',
    questionText: 'When a character says one thing but means another, it is called ______',
    options: ['Dramatic irony', 'Situational irony', 'Verbal irony', 'Sarcasm'],
    answer: 'Verbal irony',
    explanation: 'Verbal irony occurs when a character says something but means the opposite of what they say.'
  },
  {
    topic: 'Drama',
    questionText: 'Fatalism is a crucial element in which dramatic genre?',
    options: ['Melodrama', 'Tragicomedy', 'Tragedy', 'Comedy'],
    answer: 'Tragedy',
    explanation: 'Fatalism — the belief that events are predetermined and inevitable — is a key element in classical tragedy.'
  },
  {
    topic: 'Drama',
    questionText: 'A recurring element, image, or idea in a dramatic work is called a ______',
    options: ['Symbol', 'Theme', 'Motif', 'Allegory'],
    answer: 'Motif',
    explanation: 'A motif is a recurring element that has significance in a literary work.'
  },
  {
    topic: 'Drama',
    questionText: 'The conversation between characters in a literary work is called ______',
    options: ['Monologue', 'Dialogue', 'Soliloquy', 'Aside'],
    answer: 'Dialogue',
    explanation: 'Dialogue is the spoken conversation between two or more characters in a literary work.'
  },
  {
    topic: 'Drama',
    questionText: 'A dramatic technique in which a character speaks a long speech addressed to other characters or the audience is called a ______',
    options: ['Soliloquy', 'Aside', 'Monologue', 'Chorus'],
    answer: 'Monologue',
    explanation: 'A monologue is a long speech by a single character, addressed to other characters or to the audience.'
  },
  {
    topic: 'Drama',
    questionText: 'Satire in drama is the use of ______',
    options: ['Physical humour and slapstick', 'Humour and irony to criticise society or individuals', 'Tragic elements in a comedy', 'Music to tell a story'],
    answer: 'Humour and irony to criticise society or individuals',
    explanation: 'Satire uses humour, irony, exaggeration, or ridicule to expose and criticise human vice or folly.'
  },
  {
    topic: 'Drama',
    questionText: 'A stage direction in a play is ______',
    options: ['A speech by the main character', 'An instruction written in the script about movement, setting, or actions', 'The opening speech of the prologue', 'A comment by the chorus'],
    answer: 'An instruction written in the script about movement, setting, or actions',
    explanation: 'Stage directions are instructions in a script telling actors how to move or behave and describing the setting.'
  },
  {
    topic: 'Drama',
    questionText: 'The opening events that introduce the characters and situation of a play are called the ______',
    options: ['Climax', 'Exposition', 'Denouement', 'Falling action'],
    answer: 'Exposition',
    explanation: 'Exposition is the introduction of important background information at the beginning of a story or play.'
  },
  {
    topic: 'Drama',
    questionText: 'A play that tells the story of real historical events and people is called a ______',
    options: ['Tragedy', 'Comedy', 'History play', 'Melodrama'],
    answer: 'History play',
    explanation: 'A history play dramatises real historical events. Shakespeare\'s history plays such as Henry V are classic examples.'
  },
  {
    topic: 'Drama',
    questionText: 'The writer of a play is called a ______',
    options: ['Novelist', 'Poet', 'Playwright', 'Narrator'],
    answer: 'Playwright',
    explanation: 'A playwright is a person who writes plays for the theatre.'
  },

  // ==========================================================
  // PROSE AND NARRATIVE (50 questions)
  // ==========================================================

  {
    topic: 'Prose and Narrative',
    questionText: 'The narrator who participates in the story and uses "I" is called a ______',
    options: ['Third person narrator', 'Omniscient narrator', 'First person narrator', 'Objective narrator'],
    answer: 'First person narrator',
    explanation: 'A first person narrator is a character within the story who tells the story using "I".'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A narrator who knows everything about all characters is called ______',
    options: ['First person narrator', 'Limited narrator', 'Omniscient narrator', 'Unreliable narrator'],
    answer: 'Omniscient narrator',
    explanation: 'An omniscient narrator knows everything about all characters, their thoughts, feelings, and actions.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The technique of interrupting a story to portray an earlier event is called ______',
    options: ['Foreshadowing', 'Flashback', 'Stream of consciousness', 'In medias res'],
    answer: 'Flashback',
    explanation: 'Flashback is a narrative technique that interrupts the present action to describe a past event.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The technique of beginning a story in the middle of the action is called ______',
    options: ['Flashback', 'Foreshadowing', 'In medias res', 'Exposition'],
    answer: 'In medias res',
    explanation: 'In medias res (Latin for "in the middle of things") starts a story in the middle of the action.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A narrative technique that presents the flow of a character\'s thoughts is called ______',
    options: ['Flashback', 'Interior monologue', 'Stream of consciousness', 'Both B and C'],
    answer: 'Both B and C',
    explanation: 'Stream of consciousness and interior monologue are closely related techniques that present a character\'s continuous thought process.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'An unreliable narrator is one who ______',
    options: ['Tells the story from outside', 'Cannot be fully trusted to give accurate information', 'Knows everything about the characters', 'Uses third person perspective'],
    answer: 'Cannot be fully trusted to give accurate information',
    explanation: 'An unreliable narrator\'s credibility is compromised, often due to bias, limited knowledge, or dishonesty.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A novel that follows a character\'s development from youth to adulthood is called ______',
    options: ['Picaresque novel', 'Gothic novel', 'Bildungsroman', 'Epistolary novel'],
    answer: 'Bildungsroman',
    explanation: 'A Bildungsroman is a novel that focuses on the psychological and moral growth of the protagonist from youth to adulthood.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A novel written in the form of letters or diary entries is called ______',
    options: ['Bildungsroman', 'Picaresque', 'Epistolary novel', 'Gothic novel'],
    answer: 'Epistolary novel',
    explanation: 'An epistolary novel is written as a series of documents such as letters, diary entries, or newspaper clippings.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A picaresque novel features ______',
    options: ['A ghost or supernatural events', 'A lovable rogue hero who goes on a series of adventures', 'A tragic hero\'s downfall', 'Letters exchanged between characters'],
    answer: 'A lovable rogue hero who goes on a series of adventures',
    explanation: 'A picaresque novel follows a roguish but charming hero of low social class through a series of adventures in a corrupt society.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A Gothic novel typically features ______',
    options: ['Comedy and romance only', 'Dark, gloomy settings, mystery, horror, and the supernatural', 'Political satire', 'Adventure at sea'],
    answer: 'Dark, gloomy settings, mystery, horror, and the supernatural',
    explanation: 'Gothic fiction is characterised by dark settings, mysterious events, and supernatural or horror elements.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A flat character is one who ______',
    options: ['Changes significantly during the story', 'Is fully developed with many traits', 'Has only one or two traits and does not change', 'Is the main character'],
    answer: 'Has only one or two traits and does not change',
    explanation: 'A flat character is simple and one-dimensional with only one or two clearly defined traits.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A round character is one who ______',
    options: ['Is a supporting character', 'Is fully developed, complex, and may change', 'Has only one trait', 'Never changes during the story'],
    answer: 'Is fully developed, complex, and may change',
    explanation: 'A round character is complex and well-developed with multiple traits, capable of growth and change.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A character who changes significantly during a story is called a ______',
    options: ['Flat character', 'Stock character', 'Dynamic character', 'Static character'],
    answer: 'Dynamic character',
    explanation: 'A dynamic character undergoes significant internal change during the course of the story.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A character who remains unchanged throughout a story is called a ______',
    options: ['Dynamic character', 'Round character', 'Flat character', 'Static character'],
    answer: 'Static character',
    explanation: 'A static character does not undergo significant internal change during the course of the story.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A stock character is one who ______',
    options: ['Changes dramatically by the end', 'Is a familiar type that appears repeatedly across literature e.g. the villain, the wise old man', 'Is always the protagonist', 'Is based on a real person'],
    answer: 'Is a familiar type that appears repeatedly across literature e.g. the villain, the wise old man',
    explanation: 'A stock character is a stereotypical character type that readers immediately recognise from having appeared in many stories.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A short story is different from a novel mainly because of ______',
    options: ['Its theme', 'Its length and scope', 'Its setting', 'Its number of characters'],
    answer: 'Its length and scope',
    explanation: 'The main difference between a short story and a novel is length — short stories are shorter and have a more limited scope.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The conflict that occurs within a character\'s own mind is called ______',
    options: ['External conflict', 'Man vs nature', 'Internal conflict', 'Man vs society'],
    answer: 'Internal conflict',
    explanation: 'Internal conflict is a psychological struggle within a character\'s own mind, often between opposing desires or values.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The way a writer uses language, including sentence structure and word choice, is called ______',
    options: ['Tone', 'Mood', 'Style', 'Voice'],
    answer: 'Style',
    explanation: 'Style refers to the way a writer uses language — including diction, syntax, and figurative language — to express ideas.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A traditional story that explains natural phenomena or the origins of a culture is called a ______',
    options: ['Fable', 'Legend', 'Myth', 'Folktale'],
    answer: 'Myth',
    explanation: 'A myth is a traditional story that explains natural or social phenomena and often involves supernatural beings.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A short story that illustrates a moral through the use of animals as characters is called a ______',
    options: ['Parable', 'Myth', 'Fable', 'Legend'],
    answer: 'Fable',
    explanation: 'A fable is a short story, typically with animal characters, that conveys a moral lesson.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A story passed down through generations in oral form is called ______',
    options: ['Novel', 'Folktale', 'Fable', 'Parable'],
    answer: 'Folktale',
    explanation: 'A folktale is a traditional story passed down orally from generation to generation within a community.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A story that teaches a moral or religious lesson through human characters is called a ______',
    options: ['Fable', 'Myth', 'Parable', 'Legend'],
    answer: 'Parable',
    explanation: 'A parable is a simple story used to illustrate a moral or spiritual lesson.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A traditional story that may be based on real events but has grown through retelling is called a ______',
    options: ['Myth', 'Fable', 'Legend', 'Folktale'],
    answer: 'Legend',
    explanation: 'A legend is a traditional story that may be based on real historical events but has been embellished through retelling.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The attitude of the narrator toward the subject matter is called ______',
    options: ['Mood', 'Tone', 'Style', 'Voice'],
    answer: 'Tone',
    explanation: 'Tone is the author\'s or narrator\'s attitude toward the subject matter as conveyed through the writing.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The emotional atmosphere created in a piece of writing is called ______',
    options: ['Tone', 'Mood', 'Theme', 'Style'],
    answer: 'Mood',
    explanation: 'Mood is the emotional atmosphere or feeling that a piece of writing creates in the reader.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A narrative in which a writer describes their own life is called ______',
    options: ['Biography', 'Autobiography', 'Memoir', 'Diary'],
    answer: 'Autobiography',
    explanation: 'An autobiography is an account of a person\'s life written by that person themselves.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A life story written about someone by another person is called a ______',
    options: ['Autobiography', 'Memoir', 'Biography', 'Diary'],
    answer: 'Biography',
    explanation: 'A biography is an account of a person\'s life written by someone else.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A novella is best described as ______',
    options: ['A very long novel', 'A piece of writing longer than a short story but shorter than a full novel', 'A collection of short stories', 'A type of poem'],
    answer: 'A piece of writing longer than a short story but shorter than a full novel',
    explanation: 'A novella is a work of fiction that is longer and more complex than a short story but shorter than a novel.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The perspective from which a story is narrated is called the ______',
    options: ['Theme', 'Tone', 'Point of view', 'Voice'],
    answer: 'Point of view',
    explanation: 'Point of view is the perspective from which a story is told — first person, second person, or third person.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A frame narrative is ______',
    options: ['A sub-plot within the main story', 'A story within a story', 'A parallel narrative', 'An episodic narrative'],
    answer: 'A story within a story',
    explanation: 'A frame narrative is a literary device in which a story is presented within another story.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The use of humour, irony, or exaggeration to criticise society is called ______',
    options: ['Parody', 'Satire', 'Farce', 'Comedy'],
    answer: 'Satire',
    explanation: 'Satire is a literary technique that uses humour, irony, or exaggeration to critique social or political issues.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A dystopian novel is one that presents ______',
    options: ['A perfect ideal society', 'An imaginary society that is as bad as possible — the opposite of a utopia', 'A historical society', 'A rural farming community'],
    answer: 'An imaginary society that is as bad as possible — the opposite of a utopia',
    explanation: 'A dystopia is an imagined state or society in which there is great suffering or injustice — the opposite of a utopia.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A utopian novel presents ______',
    options: ['A terrible, oppressive society', 'A perfect, ideal society', 'A society at war', 'A future technological society'],
    answer: 'A perfect, ideal society',
    explanation: 'A utopia is an imagined place or state in which everything is perfect — the ideal society.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Multiple narrators in a novel means ______',
    options: ['The story has no clear narrator', 'Different characters each tell the story from their own perspective', 'The narrator is unreliable', 'The novel has no plot'],
    answer: 'Different characters each tell the story from their own perspective',
    explanation: 'Some novels use multiple narrators, with different characters telling parts of the story from their own point of view.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The conflict of Man vs Society in a novel refers to ______',
    options: ['A character fighting in a war', 'A character struggling against the norms, values, or laws of the society they live in', 'A character battling nature', 'Two characters in conflict'],
    answer: 'A character struggling against the norms, values, or laws of the society they live in',
    explanation: 'Man vs Society is an external conflict in which a character opposes the social institutions or cultural norms of their world.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'An archetype in literature is ______',
    options: ['A new type of character never seen before', 'A universal character type or situation that recurs across different cultures and literature', 'The main character of every story', 'A symbol unique to African literature'],
    answer: 'A universal character type or situation that recurs across different cultures and literature',
    explanation: 'An archetype is a universal pattern — such as the hero, the mentor, or the trickster — found across cultures and time periods.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'The exposition of a novel is where ______',
    options: ['The main conflict is resolved', 'Background information about the characters, setting and situation is introduced', 'The climax occurs', 'The protagonist dies'],
    answer: 'Background information about the characters, setting and situation is introduced',
    explanation: 'The exposition introduces the reader to the world of the novel — its characters, setting, and the situation before the main conflict begins.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'A recurring image or idea that contributes to the theme of a work is called a ______',
    options: ['Symbol', 'Archetype', 'Motif', 'Allegory'],
    answer: 'Motif',
    explanation: 'A motif is a recurring element — image, idea, or symbol — that has significance in relation to the theme.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Third person limited narration means ______',
    options: ['The narrator knows everything about all characters', 'The narrator tells the story from outside but only knows the thoughts of one character', 'The narrator is a character in the story', 'The narrator never reveals any character\'s thoughts'],
    answer: 'The narrator tells the story from outside but only knows the thoughts of one character',
    explanation: 'Third person limited narration uses he/she/they but restricts the reader\'s access to the thoughts of only one character.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Epistolary narration means the story is told through ______',
    options: ['A series of monologues', 'Letters, diary entries, or other documents', 'Multiple narrators alternating chapters', 'A dream sequence'],
    answer: 'Letters, diary entries, or other documents',
    explanation: 'Epistolary narration tells the story through letters, diary entries, newspaper articles, or other documentary forms.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Which of these best describes dramatic irony in prose?',
    options: ['The narrator says one thing and means another', 'The reader knows something important that the character does not know', 'The plot has an unexpected twist', 'The ending is ironic and sad'],
    answer: 'The reader knows something important that the character does not know',
    explanation: 'Dramatic irony occurs when the reader has information that a character in the story lacks, creating tension or humour.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Science fiction is a genre of fiction that deals with ______',
    options: ['Fantasy worlds with magic', 'Imaginary future technologies, space travel, and scientific concepts', 'Historical events', 'Romance and love stories'],
    answer: 'Imaginary future technologies, space travel, and scientific concepts',
    explanation: 'Science fiction is a genre dealing with imaginative concepts such as futuristic technology, space exploration, and alternative worlds.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Chinua Achebe\'s "Things Fall Apart" is set in ______',
    options: ['Colonial Nigeria', 'Pre-colonial Igbo society', 'Post-independence Nigeria', 'The civil war era'],
    answer: 'Pre-colonial Igbo society',
    explanation: '"Things Fall Apart" is set in pre-colonial Igbo society and explores the impact of colonialism on traditional African culture.'
  },
  {
    topic: 'Prose and Narrative',
    questionText: 'Okonkwo\'s tragic flaw in "Things Fall Apart" is ______',
    options: ['Cowardice', 'His obsessive fear of failure and appearing weak like his father', 'Greed', 'Jealousy of his neighbours'],
    answer: 'His obsessive fear of failure and appearing weak like his father',
    explanation: 'Okonkwo\'s hamartia is his obsession with strength and his fear of being seen as weak — the same weakness his father had.'
  },

  // ==========================================================
  // POETRY (50 questions)
  // ==========================================================

  {
    topic: 'Poetry',
    questionText: 'A poem of fourteen lines written in iambic pentameter is called a ______',
    options: ['Ode', 'Ballad', 'Sonnet', 'Elegy'],
    answer: 'Sonnet',
    explanation: 'A sonnet is a poem of 14 lines, typically written in iambic pentameter, with a specific rhyme scheme.'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem that mourns the death of someone is called an ______',
    options: ['Ode', 'Elegy', 'Epic', 'Lyric'],
    answer: 'Elegy',
    explanation: 'An elegy is a mournful poem written as a lament for the dead.'
  },
  {
    topic: 'Poetry',
    questionText: 'A long narrative poem about the heroic deeds of a great hero is called an ______',
    options: ['Ode', 'Elegy', 'Epic', 'Ballad'],
    answer: 'Epic',
    explanation: 'An epic is a long narrative poem celebrating the deeds of a legendary or historical hero.'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem of formal praise for a person or thing is called an ______',
    options: ['Elegy', 'Ode', 'Lyric', 'Ballad'],
    answer: 'Ode',
    explanation: 'An ode is a formal lyric poem that praises or glorifies a person, event, or thing.'
  },
  {
    topic: 'Poetry',
    questionText: 'A Japanese poem of three lines with a 5-7-5 syllable pattern is called a ______',
    options: ['Limerick', 'Haiku', 'Sonnet', 'Tercet'],
    answer: 'Haiku',
    explanation: 'A haiku is a traditional Japanese poem with three lines following a 5-7-5 syllable pattern.'
  },
  {
    topic: 'Poetry',
    questionText: 'A group of lines in a poem that forms a unit is called a ______',
    options: ['Verse', 'Stanza', 'Couplet', 'Refrain'],
    answer: 'Stanza',
    explanation: 'A stanza is a group of lines in a poem that forms a unit, similar to a paragraph in prose.'
  },
  {
    topic: 'Poetry',
    questionText: 'Two consecutive lines of poetry that rhyme are called a ______',
    options: ['Triplet', 'Quatrain', 'Couplet', 'Sestet'],
    answer: 'Couplet',
    explanation: 'A couplet is a pair of successive lines of poetry that rhyme and are of the same length.'
  },
  {
    topic: 'Poetry',
    questionText: 'A four-line stanza in a poem is called a ______',
    options: ['Couplet', 'Tercet', 'Quatrain', 'Sestet'],
    answer: 'Quatrain',
    explanation: 'A quatrain is a stanza of four lines, often with alternating rhymes.'
  },
  {
    topic: 'Poetry',
    questionText: 'A three-line stanza is called a ______',
    options: ['Couplet', 'Tercet', 'Quatrain', 'Sestet'],
    answer: 'Tercet',
    explanation: 'A tercet is a stanza or poem of three lines, sometimes with a single rhyme.'
  },
  {
    topic: 'Poetry',
    questionText: 'A six-line stanza is called a ______',
    options: ['Quatrain', 'Couplet', 'Sestet', 'Octet'],
    answer: 'Sestet',
    explanation: 'A sestet is a stanza or group of six lines of poetry.'
  },
  {
    topic: 'Poetry',
    questionText: 'An eight-line stanza is called an ______',
    options: ['Sestet', 'Quatrain', 'Octet', 'Octave'],
    answer: 'Octave',
    explanation: 'An octave is a stanza or group of eight lines of poetry.'
  },
  {
    topic: 'Poetry',
    questionText: 'The rhythmic pattern of stressed and unstressed syllables in poetry is called ______',
    options: ['Rhyme', 'Rhythm', 'Metre', 'Cadence'],
    answer: 'Metre',
    explanation: 'Metre is the pattern of stressed and unstressed syllables that gives poetry its rhythmic quality.'
  },
  {
    topic: 'Poetry',
    questionText: 'Poetry that does not rhyme or follow a regular metrical pattern is called ______',
    options: ['Blank verse', 'Free verse', 'Lyric poetry', 'Dramatic poetry'],
    answer: 'Free verse',
    explanation: 'Free verse is poetry that does not follow a consistent rhyme scheme or metrical pattern.'
  },
  {
    topic: 'Poetry',
    questionText: 'Unrhymed poetry written in iambic pentameter is called ______',
    options: ['Free verse', 'Blank verse', 'Lyric poetry', 'Narrative poetry'],
    answer: 'Blank verse',
    explanation: 'Blank verse is unrhymed poetry written in iambic pentameter — it has a regular meter but no rhyme.'
  },
  {
    topic: 'Poetry',
    questionText: 'A metrical foot consisting of one unstressed syllable followed by one stressed syllable is called an ______',
    options: ['Trochee', 'Iamb', 'Dactyl', 'Anapest'],
    answer: 'Iamb',
    explanation: 'An iamb is a metrical foot with one unstressed syllable followed by one stressed syllable (da-DUM).'
  },
  {
    topic: 'Poetry',
    questionText: 'A metrical foot consisting of one stressed syllable followed by one unstressed syllable is called a ______',
    options: ['Iamb', 'Trochee', 'Dactyl', 'Anapest'],
    answer: 'Trochee',
    explanation: 'A trochee is a metrical foot with one stressed syllable followed by one unstressed syllable (DUM-da).'
  },
  {
    topic: 'Poetry',
    questionText: 'Iambic pentameter means a line contains ______',
    options: ['Five iambs — ten syllables with alternating unstressed and stressed pattern', 'Four iambs — eight syllables', 'Six iambs — twelve syllables', 'Five stressed syllables with no pattern'],
    answer: 'Five iambs — ten syllables with alternating unstressed and stressed pattern',
    explanation: 'Iambic pentameter has five iambic feet per line (penta = five), creating a ten-syllable line with the pattern da-DUM da-DUM da-DUM da-DUM da-DUM.'
  },
  {
    topic: 'Poetry',
    questionText: 'The repetition of a line or group of lines at regular intervals in a poem is called the ______',
    options: ['Stanza', 'Refrain', 'Couplet', 'Chorus'],
    answer: 'Refrain',
    explanation: 'A refrain is a line or lines repeated at intervals in a poem, often at the end of each stanza.'
  },
  {
    topic: 'Poetry',
    questionText: 'The pause or break in a line of poetry is called a ______',
    options: ['Enjambment', 'Caesura', 'End-stop', 'Run-on line'],
    answer: 'Caesura',
    explanation: 'A caesura is a rhythmic pause or break in the middle of a line of poetry.'
  },
  {
    topic: 'Poetry',
    questionText: 'When a sentence continues from one line of poetry to the next without a pause, it is called ______',
    options: ['Caesura', 'End-stop', 'Enjambment', 'Run-on sentence'],
    answer: 'Enjambment',
    explanation: 'Enjambment is the continuation of a sentence from one line of poetry to the next without a pause.'
  },
  {
    topic: 'Poetry',
    questionText: 'A line of poetry that ends with a punctuation mark is called ______',
    options: ['Enjambment', 'Caesura', 'End-stopped line', 'Run-on line'],
    answer: 'End-stopped line',
    explanation: 'An end-stopped line is a line of poetry that ends with a punctuation mark, creating a natural pause.'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem written in the form of a speech by a fictional character is called a ______',
    options: ['Lyric poem', 'Dramatic monologue', 'Narrative poem', 'Ballad'],
    answer: 'Dramatic monologue',
    explanation: 'A dramatic monologue is a poem in which a fictional character speaks to a silent audience, revealing their character.'
  },
  {
    topic: 'Poetry',
    questionText: 'The voice that speaks in a poem is called the ______',
    options: ['Author', 'Narrator', 'Persona', 'Speaker'],
    answer: 'Persona',
    explanation: 'The persona is the voice or character adopted by the poet to speak in a poem — it may differ from the poet\'s own voice.'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem consisting of five lines with an AABBA rhyme scheme is called a ______',
    options: ['Sonnet', 'Haiku', 'Limerick', 'Quatrain'],
    answer: 'Limerick',
    explanation: 'A limerick is a humorous five-line poem with an AABBA rhyme scheme and a specific rhythm.'
  },
  {
    topic: 'Poetry',
    questionText: 'A ballad is a type of ______',
    options: ['Lyric poem', 'Narrative poem', 'Dramatic poem', 'Satirical poem'],
    answer: 'Narrative poem',
    explanation: 'A ballad is a form of narrative verse that tells a story, often of a dramatic or romantic nature.'
  },
  {
    topic: 'Poetry',
    questionText: 'The use of words to create pictures in the reader\'s mind is called ______',
    options: ['Diction', 'Imagery', 'Symbolism', 'Allusion'],
    answer: 'Imagery',
    explanation: 'Imagery is language that appeals to the senses and creates vivid pictures in the reader\'s mind.'
  },
  {
    topic: 'Poetry',
    questionText: 'Rhyme that occurs within a single line of poetry is called ______',
    options: ['End rhyme', 'Internal rhyme', 'Slant rhyme', 'Eye rhyme'],
    answer: 'Internal rhyme',
    explanation: 'Internal rhyme occurs when words within a single line of poetry rhyme with each other.'
  },
  {
    topic: 'Poetry',
    questionText: 'Slant rhyme (also called half rhyme) refers to ______',
    options: ['Words that rhyme perfectly', 'Words that have similar but not identical sounds', 'Words that look alike but sound different', 'Rhyme at the end of a line'],
    answer: 'Words that have similar but not identical sounds',
    explanation: 'Slant rhyme uses words with similar but not identical sounds e.g. "worm" and "swarm".'
  },
  {
    topic: 'Poetry',
    questionText: 'Eye rhyme refers to ______',
    options: ['Words that sound the same', 'Words that look like they should rhyme but do not when spoken', 'Rhyme in the middle of a line', 'A type of visual poetry'],
    answer: 'Words that look like they should rhyme but do not when spoken',
    explanation: 'Eye rhyme is when words look as though they should rhyme based on their spelling but do not rhyme when spoken e.g. "love" and "move".'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem that mourns and praises someone who has died is called both a ______',
    options: ['Dirge and elegy', 'Ode and epic', 'Ballad and lyric', 'Panegyric and satire'],
    answer: 'Dirge and elegy',
    explanation: 'Both a dirge and an elegy are poems of mourning. A dirge is typically shorter and intended to be sung at a funeral.'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem of formal praise for a person, usually a ruler or hero, is called a ______',
    options: ['Elegy', 'Dirge', 'Panegyric', 'Satire'],
    answer: 'Panegyric',
    explanation: 'A panegyric is a formal public speech or poem of elaborate praise for a person or thing.'
  },
  {
    topic: 'Poetry',
    questionText: 'The voice, diction, and personality of the poet as revealed through the poem is called the ______',
    options: ['Persona', 'Tone', 'Voice', 'Style'],
    answer: 'Voice',
    explanation: 'Voice in poetry refers to the distinctive personality and style of the poet as revealed through their writing.'
  },
  {
    topic: 'Poetry',
    questionText: 'A villanelle is a poem that ______',
    options: ['Has 14 lines', 'Has 19 lines with two repeating rhymes and two refrains', 'Has no fixed form', 'Has 17 syllables'],
    answer: 'Has 19 lines with two repeating rhymes and two refrains',
    explanation: 'A villanelle is a 19-line poem with a specific structure including two repeating rhyme sounds and two refrain lines.'
  },
  {
    topic: 'Poetry',
    questionText: 'A poem in which the first letters of each line spell out a word or message is called an ______',
    options: ['Epic', 'Elegy', 'Acrostic', 'Ode'],
    answer: 'Acrostic',
    explanation: 'An acrostic poem uses the first letters of each line to spell out a word, name, or phrase.'
  },
  {
    topic: 'Poetry',
    questionText: 'Sprung rhythm, associated with Gerard Manley Hopkins, is a rhythmic pattern that ______',
    options: ['Follows strict iambic rules', 'Counts only stressed syllables per foot, ignoring unstressed syllables', 'Has no stressed syllables', 'Is used only in haiku'],
    answer: 'Counts only stressed syllables per foot, ignoring unstressed syllables',
    explanation: 'Sprung rhythm is a type of metre invented by Gerard Manley Hopkins in which each foot begins with a stressed syllable and may have any number of unstressed syllables.'
  },
  {
    topic: 'Poetry',
    questionText: 'The choice of words used by a poet is called ______',
    options: ['Style', 'Syntax', 'Diction', 'Tone'],
    answer: 'Diction',
    explanation: 'Diction refers to the choice and use of words and phrases in a literary work.'
  },
  {
    topic: 'Poetry',
    questionText: 'The Petrarchan sonnet is divided into ______',
    options: ['Three quatrains and a couplet', 'An octave and a sestet', 'Two octaves', 'Four quatrains'],
    answer: 'An octave and a sestet',
    explanation: 'The Petrarchan (Italian) sonnet consists of an eight-line octave (rhyming ABBAABBA) and a six-line sestet.'
  },
  {
    topic: 'Poetry',
    questionText: 'The Shakespearean sonnet is divided into ______',
    options: ['An octave and a sestet', 'Three quatrains and a couplet', 'Two octaves', 'Four tercets'],
    answer: 'Three quatrains and a couplet',
    explanation: 'The Shakespearean (English) sonnet consists of three quatrains and a final rhyming couplet (ABAB CDCD EFEF GG).'
  },
  {
    topic: 'Poetry',
    questionText: 'An apostrophe in poetry is when ______',
    options: ['A punctuation mark is used', 'The poet directly addresses an absent person, object, or abstract idea', 'The poem ends with a question', 'Two opposites are placed together'],
    answer: 'The poet directly addresses an absent person, object, or abstract idea',
    explanation: 'In poetry, apostrophe is when the speaker directly addresses an absent or non-human entity.'
  },
  {
    topic: 'Poetry',
    questionText: 'Concrete poetry is poetry in which ______',
    options: ['The subject is always nature', 'The visual appearance of the poem on the page forms part of its meaning', 'No figurative language is used', 'The poem has exactly 10 lines'],
    answer: 'The visual appearance of the poem on the page forms part of its meaning',
    explanation: 'Concrete poetry uses the visual arrangement of words and letters to contribute to the poem\'s meaning.'
  },
  {
    topic: 'Poetry',
    questionText: 'Masculine rhyme refers to ______',
    options: ['Rhyme in poems written by men', 'End rhyme on a final stressed syllable e.g. "cat/hat"', 'Rhyme across two syllables', 'A type of internal rhyme'],
    answer: 'End rhyme on a final stressed syllable e.g. "cat/hat"',
    explanation: 'Masculine rhyme is a single-syllable rhyme or a rhyme that ends on a stressed syllable.'
  },
  {
    topic: 'Poetry',
    questionText: 'Feminine rhyme refers to ______',
    options: ['Rhyme in poems written by women', 'Rhyme across two syllables where the final syllable is unstressed e.g. "running/cunning"', 'Single syllable rhyme', 'Slant rhyme'],
    answer: 'Rhyme across two syllables where the final syllable is unstressed e.g. "running/cunning"',
    explanation: 'Feminine rhyme involves rhyme on a stressed syllable followed by one or more unstressed syllables.'
  },

  // ==========================================================
  // LITERARY TERMS & GENRES (40 questions)
  // ==========================================================

  {
    topic: 'Literary Terms & Genres',
    questionText: 'Literature can broadly be divided into ______',
    options: ['Prose and poetry', 'Fiction and non-fiction', 'Drama and narrative', 'All of the above'],
    answer: 'All of the above',
    explanation: 'Literature can be classified in several ways — by form (prose, poetry, drama) or by type (fiction, non-fiction).'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Writing that is based on imagination rather than fact is called ______',
    options: ['Non-fiction', 'Fiction', 'Biography', 'Autobiography'],
    answer: 'Fiction',
    explanation: 'Fiction refers to literature created from the imagination rather than from fact.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Writing that is based on real events, people, and facts is called ______',
    options: ['Fiction', 'Fantasy', 'Non-fiction', 'Fable'],
    answer: 'Non-fiction',
    explanation: 'Non-fiction is writing that deals with real events, people, and facts rather than imagined ones.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A literary work that uses humour, irony, or exaggeration to criticise people or institutions is called ______',
    options: ['Comedy', 'Parody', 'Satire', 'Farce'],
    answer: 'Satire',
    explanation: 'Satire uses wit and irony to criticise or expose the folly of individuals or society.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Writing arranged in lines with a metrical pattern is called ______',
    options: ['Prose', 'Drama', 'Verse', 'Fiction'],
    answer: 'Verse',
    explanation: 'Verse is writing arranged with a metrical rhythm, typically in the form of poetry.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A universal symbol or character type that appears across different cultures and literature is called an ______',
    options: ['Allegory', 'Symbol', 'Archetype', 'Motif'],
    answer: 'Archetype',
    explanation: 'An archetype is a universal character type, symbol, or situation that recurs across different cultures and time periods.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The study of how language is used effectively in literature is called ______',
    options: ['Linguistics', 'Grammar', 'Rhetoric', 'Syntax'],
    answer: 'Rhetoric',
    explanation: 'Rhetoric is the study of effective use of language to persuade or communicate effectively.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A piece of writing that examines and evaluates a literary work is called a ______',
    options: ['Summary', 'Paraphrase', 'Critique', 'Review'],
    answer: 'Critique',
    explanation: 'A critique is a detailed analysis and assessment of a literary work.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The use of language that is typical of a particular region or group is called ______',
    options: ['Jargon', 'Slang', 'Dialect', 'Colloquialism'],
    answer: 'Dialect',
    explanation: 'Dialect is a variety of language used by a particular group or in a particular region.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Informal words or expressions used in casual speech are called ______',
    options: ['Dialect', 'Jargon', 'Colloquialism', 'Slang'],
    answer: 'Slang',
    explanation: 'Slang refers to informal words and expressions that are more common in speech than formal writing.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Technical language used in a particular field or profession is called ______',
    options: ['Dialect', 'Slang', 'Jargon', 'Colloquialism'],
    answer: 'Jargon',
    explanation: 'Jargon is specialised technical language used by people in a particular profession or field.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The use of one thing to represent another abstract idea is called ______',
    options: ['Allegory', 'Motif', 'Symbolism', 'Metaphor'],
    answer: 'Symbolism',
    explanation: 'Symbolism is the use of symbols — objects, people, or events — to represent abstract ideas or concepts.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The climax of a story is the point of ______',
    options: ['Greatest conflict resolution', 'Highest tension and turning point', 'Introduction of characters', 'Final resolution'],
    answer: 'Highest tension and turning point',
    explanation: 'The climax is the point of highest tension in a story where the main conflict reaches its peak.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A narrative poem that tells a story of adventure or romance, often originally set to music, is called a ______',
    options: ['Epic', 'Lyric', 'Ballad', 'Ode'],
    answer: 'Ballad',
    explanation: 'A ballad is a form of narrative poetry that tells a story, often of romance or adventure.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A work that makes fun of another work by imitating its style for comic effect is called a ______',
    options: ['Satire', 'Parody', 'Farce', 'Pastiche'],
    answer: 'Parody',
    explanation: 'A parody is a work that imitates another work in an exaggerated way for comic or satirical effect.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A pastiche is a work that ______',
    options: ['Mocks another work', 'Imitates the style of another work or period without satirical intent', 'Criticises society harshly', 'Tells a story of adventure'],
    answer: 'Imitates the style of another work or period without satirical intent',
    explanation: 'A pastiche imitates the style of another work, author, or period — unlike parody, it is not necessarily mocking.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'An extended narrative that represents abstract ideas through characters and events is called ______',
    options: ['Symbol', 'Motif', 'Allegory', 'Parable'],
    answer: 'Allegory',
    explanation: 'An allegory is a narrative in which the characters and events represent abstract ideas or moral qualities.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The narrator who only reports what can be seen and heard without revealing thoughts is called ______',
    options: ['Omniscient narrator', 'First person narrator', 'Objective narrator', 'Unreliable narrator'],
    answer: 'Objective narrator',
    explanation: 'An objective narrator reports only observable facts without revealing the thoughts or feelings of any character.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A literary work set in the future or in an imaginary world with advanced science is called ______',
    options: ['Fantasy', 'Science fiction', 'Gothic fiction', 'Utopian fiction'],
    answer: 'Science fiction',
    explanation: 'Science fiction is a genre dealing with imaginative concepts such as futuristic technology and space exploration.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Fantasy as a literary genre is characterised by ______',
    options: ['Realistic settings and events', 'Imaginary worlds with magic, mythical creatures, and supernatural events', 'Future technology', 'Dark, Gothic settings'],
    answer: 'Imaginary worlds with magic, mythical creatures, and supernatural events',
    explanation: 'Fantasy is a genre of speculative fiction involving magical or supernatural elements set in imaginary worlds.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The moral of a fable is usually stated ______',
    options: ['At the beginning', 'In the middle', 'At the end', 'Throughout the story'],
    answer: 'At the end',
    explanation: 'The moral of a fable — the lesson it teaches — is typically stated explicitly at the end.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The writer\'s distinctive manner of expression is called ______',
    options: ['Voice', 'Tone', 'Style', 'Diction'],
    answer: 'Style',
    explanation: 'Style is the distinctive way a writer uses language, including choice of words, sentence structure, and tone.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Feminist criticism in literature focuses on ______',
    options: ['The economic background of characters', 'How gender and power relations affect literary texts and their interpretation', 'The historical setting of the text', 'The use of figurative language'],
    answer: 'How gender and power relations affect literary texts and their interpretation',
    explanation: 'Feminist literary criticism examines how literary texts portray women, gender roles, and power dynamics.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Post-colonial criticism in literature examines ______',
    options: ['Literature written after 1900', 'The effects of colonialism on literature, culture, and identity in formerly colonised nations', 'Literature from Western Europe only', 'The use of local dialects in writing'],
    answer: 'The effects of colonialism on literature, culture, and identity in formerly colonised nations',
    explanation: 'Post-colonial criticism examines how colonialism has shaped literary production and cultural identity in previously colonised countries.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The term "stream of consciousness" was first used as a literary technique prominently by ______',
    options: ['Charles Dickens', 'James Joyce and Virginia Woolf', 'William Shakespeare', 'Chinua Achebe'],
    answer: 'James Joyce and Virginia Woolf',
    explanation: 'James Joyce and Virginia Woolf are the writers most associated with the stream of consciousness technique in the early 20th century.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A foil character is used to ______',
    options: ['Replace the protagonist', 'Highlight the qualities of the protagonist by contrasting with them', 'Provide comic relief', 'Serve as the narrator'],
    answer: 'Highlight the qualities of the protagonist by contrasting with them',
    explanation: 'A foil character has traits that contrast with the protagonist, making the protagonist\'s characteristics stand out more clearly.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'Intertextuality refers to ______',
    options: ['Writing between two languages', 'The relationship between texts — how one text references, quotes, or is influenced by another', 'The study of text structure', 'The space between paragraphs'],
    answer: 'The relationship between texts — how one text references, quotes, or is influenced by another',
    explanation: 'Intertextuality is the way in which texts are linked to and shaped by other texts through allusion, reference, or shared themes.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The term "unreliable narrator" was popularised by literary critic ______',
    options: ['Aristotle', 'Wayne C. Booth', 'Chinua Achebe', 'T.S. Eliot'],
    answer: 'Wayne C. Booth',
    explanation: 'The term "unreliable narrator" was introduced and popularised by American literary critic Wayne C. Booth in 1961.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A literary canon refers to ______',
    options: ['A military weapon', 'The body of works considered to be the most important and influential in a literary tradition', 'A type of poetic metre', 'A collection of religious texts'],
    answer: 'The body of works considered to be the most important and influential in a literary tradition',
    explanation: 'A literary canon is the group of literary works that scholars and critics have traditionally considered the most significant.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A picaresque novel features which type of protagonist?',
    options: ['A noble tragic hero', 'A low-born rogue who has comic adventures in a corrupt society', 'A virtuous woman overcoming hardship', 'A child growing to adulthood'],
    answer: 'A low-born rogue who has comic adventures in a corrupt society',
    explanation: 'Picaresque novels feature a roguish, often low-born hero who goes through a series of episodic adventures in a corrupt world.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'The term "catharsis" was first used in relation to drama by ______',
    options: ['Shakespeare', 'Aristotle', 'Plato', 'Sophocles'],
    answer: 'Aristotle',
    explanation: 'Aristotle introduced the term catharsis in his Poetics to describe the purging of pity and fear in the audience of tragedy.'
  },
  {
    topic: 'Literary Terms & Genres',
    questionText: 'A deus ex machina is criticised in literature because ______',
    options: ['It is too violent', 'It resolves the plot artificially without proper buildup', 'It makes the tragedy too sad', 'It uses too much dialogue'],
    answer: 'It resolves the plot artificially without proper buildup',
    explanation: 'A deus ex machina is considered a lazy or unsatisfying plot device because it resolves a difficult situation without proper narrative logic.'
  },

  // ==========================================================
  // AFRICAN LITERATURE (30 questions)
  // ==========================================================

  {
    topic: 'African Literature',
    questionText: 'African oral literature is best defined as ______',
    options: ['Written literature produced in Africa', 'Literature that is spoken and passed down through generations without being written', 'African literature translated into European languages', 'Literature about African wildlife'],
    answer: 'Literature that is spoken and passed down through generations without being written',
    explanation: 'African oral literature encompasses stories, poems, proverbs, and histories that are preserved and transmitted orally rather than in writing.'
  },
  {
    topic: 'African Literature',
    questionText: 'A griot in West African tradition is ______',
    options: ['A type of traditional food', 'A professional storyteller, praise-singer, and keeper of oral history', 'A religious leader', 'A warrior chief'],
    answer: 'A professional storyteller, praise-singer, and keeper of oral history',
    explanation: 'A griot is a West African historian, storyteller, praise-singer, and musician who maintains a community\'s oral traditions.'
  },
  {
    topic: 'African Literature',
    questionText: 'Praise poetry in African literature is also known as ______',
    options: ['Elegy', 'Dirge', 'Panegyric', 'Satire'],
    answer: 'Panegyric',
    explanation: 'Praise poetry — known as panegyric — is a form of oral poetry that praises a person, often a chief or king, by listing their great deeds.'
  },
  {
    topic: 'African Literature',
    questionText: 'The Negritude movement was ______',
    options: ['A political independence movement in Nigeria', 'A literary and cultural movement celebrating Black African identity and values against European colonialism', 'A movement for the study of African languages only', 'A protest against apartheid in South Africa'],
    answer: 'A literary and cultural movement celebrating Black African identity and values against European colonialism',
    explanation: 'Negritude was a movement founded in the 1930s by African and Caribbean writers to celebrate Black African culture and identity in resistance to colonialism.'
  },
  {
    topic: 'African Literature',
    questionText: 'The founders of the Negritude movement include ______',
    options: ['Chinua Achebe and Wole Soyinka', 'Léopold Sédar Senghor and Aimé Césaire', 'Ngugi wa Thiong\'o and Okot p\'Bitek', 'Chinua Achebe and Okot p\'Bitek'],
    answer: 'Léopold Sédar Senghor and Aimé Césaire',
    explanation: 'The Negritude movement was co-founded by Léopold Sédar Senghor of Senegal and Aimé Césaire of Martinique in the 1930s.'
  },
  {
    topic: 'African Literature',
    questionText: 'Chinua Achebe\'s stated purpose in writing "Things Fall Apart" was to ______',
    options: ['Win a literary prize', 'Show that Africa had a dignified history and culture before colonialism', 'Criticise African political leaders', 'Write in the Igbo language'],
    answer: 'Show that Africa had a dignified history and culture before colonialism',
    explanation: 'Achebe said he wrote to counter the negative portrayal of Africa in Western literature and to show that Africans had a rich culture before colonisation.'
  },
  {
    topic: 'African Literature',
    questionText: 'Diaspora literature refers to ______',
    options: ['Literature written in Africa only', 'Literature written by people living outside their ancestral homelands', 'Literature about the African slave trade only', 'Literature written in African languages'],
    answer: 'Literature written by people living outside their ancestral homelands',
    explanation: 'Diaspora literature is produced by writers who live outside their countries or ancestral homelands, often exploring themes of identity and belonging.'
  },
  {
    topic: 'African Literature',
    questionText: 'Which of these is a feature of African oral tradition?',
    options: ['It is always written down', 'It includes proverbs, folktales, praise poetry, and riddles passed down orally', 'It uses only one language', 'It is always religious in content'],
    answer: 'It includes proverbs, folktales, praise poetry, and riddles passed down orally',
    explanation: 'African oral tradition encompasses diverse forms including proverbs, folktales, myths, epic narratives, riddles, and praise poetry, all transmitted orally.'
  },
  {
    topic: 'African Literature',
    questionText: 'The first African writer to win the Nobel Prize for Literature is ______',
    options: ['Chinua Achebe', 'Ngugi wa Thiong\'o', 'Wole Soyinka', 'Naguib Mahfouz'],
    answer: 'Wole Soyinka',
    explanation: 'Wole Soyinka of Nigeria became the first African to win the Nobel Prize for Literature in 1986.'
  },
  {
    topic: 'African Literature',
    questionText: 'Ngugi wa Thiong\'o is significant in African literature because he ______',
    options: ['Wrote only in English', 'Argued that African writers should write in African languages and abandoned English to write in Kikuyu', 'Founded the Negritude movement', 'Was the first African novelist'],
    answer: 'Argued that African writers should write in African languages and abandoned English to write in Kikuyu',
    explanation: 'Ngugi wa Thiong\'o famously argued that writing in colonial languages undermines African identity, and he began writing in his native Kikuyu language.'
  },
  {
    topic: 'African Literature',
    questionText: 'Post-colonial African literature often deals with themes of ______',
    options: ['Wildlife conservation only', 'Identity, colonial legacy, corruption, and the search for cultural authenticity', 'Romance and love only', 'Ancient history only'],
    answer: 'Identity, colonial legacy, corruption, and the search for cultural authenticity',
    explanation: 'Post-colonial African literature frequently explores how colonialism disrupted African identity, culture, and governance.'
  },
  {
    topic: 'African Literature',
    questionText: 'An important feature of African drama is that it often ______',
    options: ['Follows strictly Western dramatic conventions', 'Incorporates elements of oral tradition such as music, dance, and storytelling', 'Has no connection to African culture', 'Is always written in English'],
    answer: 'Incorporates elements of oral tradition such as music, dance, and storytelling',
    explanation: 'African drama frequently draws on oral traditions, incorporating music, dance, masquerade, and storytelling in its structure.'
  },
  {
    topic: 'African Literature',
    questionText: 'Moonlight stories in African tradition are ______',
    options: ['Stories told during the day', 'Folktales told by elders to children under moonlight, serving educational and entertainment purposes', 'Stories about the moon written in books', 'Religious ceremonies'],
    answer: 'Folktales told by elders to children under moonlight, serving educational and entertainment purposes',
    explanation: 'Moonlight stories are traditional African folktales told by elders to children in the evenings, combining entertainment with moral education.'
  },
  {
    topic: 'African Literature',
    questionText: 'A dirge in African literature is ______',
    options: ['A praise poem for a living chief', 'A song or poem of mourning performed at a funeral', 'A war song', 'A riddle'],
    answer: 'A song or poem of mourning performed at a funeral',
    explanation: 'A dirge is a funeral song or poem expressing grief and mourning for the dead, common in African oral tradition.'
  },
  {
    topic: 'African Literature',
    questionText: 'The African novel as a genre was significantly shaped by ______',
    options: ['French romantic novels', 'The oral tradition and the political realities of colonialism and independence', 'Ancient Greek drama', 'The British Gothic novel'],
    answer: 'The oral tradition and the political realities of colonialism and independence',
    explanation: 'The African novel emerged shaped by oral traditions, the experience of colonialism, and the political realities of the independence era.'
  },
  {
    topic: 'African Literature',
    questionText: 'Amos Tutuola\'s "The Palm-Wine Drinkard" is significant because ______',
    options: ['It was the first African novel written in English', 'It incorporated Yoruba oral tradition and mythology into novel form', 'It was the first African Nobel Prize-winning book', 'It was written in an African language'],
    answer: 'It incorporated Yoruba oral tradition and mythology into novel form',
    explanation: 'Tutuola\'s "The Palm-Wine Drinkard" (1952) is celebrated for bringing Yoruba oral mythology and folklore directly into the form of the English-language novel.'
  },
  {
    topic: 'African Literature',
    questionText: 'In African literary tradition, the role of the writer is often seen as ______',
    options: ['To entertain only', 'To serve as a teacher, moral voice, and guardian of social values', 'To imitate Western literature', 'To write only for academic audiences'],
    answer: 'To serve as a teacher, moral voice, and guardian of social values',
    explanation: 'In the African tradition, the writer — like the oral storyteller — is seen as having a social responsibility to educate and guide the community.'
  },
  {
    topic: 'African Literature',
    questionText: 'The use of proverbs in African literature serves to ______',
    options: ['Show off the writer\'s knowledge', 'Connect the text to oral tradition, add wisdom, and root the narrative in cultural values', 'Make the writing difficult to understand', 'Replace dialogue between characters'],
    answer: 'Connect the text to oral tradition, add wisdom, and root the narrative in cultural values',
    explanation: 'In African literature, proverbs connect the text to oral tradition and cultural wisdom. Achebe famously said proverbs are "the palm oil with which words are eaten."'
  },
  {
    topic: 'African Literature',
    questionText: 'Okot p\'Bitek\'s "Song of Lawino" is significant because ______',
    options: ['It was written in English from the beginning', 'It is a poem by an African woman protesting colonialism', 'It was first written in the Acoli language and celebrates African culture while criticising those who abandon it', 'It is an epic poem about African history'],
    answer: 'It was first written in the Acoli language and celebrates African culture while criticising those who abandon it',
    explanation: '"Song of Lawino" by Uganda\'s Okot p\'Bitek was originally written in Acoli and celebrates African identity while criticising Africans who abandon their culture for Western ways.'
  },
  {
    topic: 'African Literature',
    questionText: 'The Ananse stories of Ghana belong to which tradition?',
    options: ['Written literary tradition', 'Oral storytelling tradition featuring the spider trickster', 'Religious tradition', 'Historical chronicle tradition'],
    answer: 'Oral storytelling tradition featuring the spider trickster',
    explanation: 'Anansesem — Ananse stories — are part of the Akan oral storytelling tradition of Ghana featuring the spider trickster Ananse.'
  },
  {
    topic: 'African Literature',
    questionText: 'African literature written in European languages is sometimes criticised for ______',
    options: ['Being too long', 'Reaching a limited African audience and potentially reflecting colonial values', 'Not being realistic', 'Having too many characters'],
    answer: 'Reaching a limited African audience and potentially reflecting colonial values',
    explanation: 'One criticism of African literature in European languages is that it may reach only the educated elite and that the colonial language itself shapes thought and values.'
  },
  {
    topic: 'African Literature',
    questionText: 'Flora Nwapa is significant in African literature as ______',
    options: ['The first African Nobel Laureate', 'The first African woman to be published as a novelist in English', 'The founder of Negritude', 'The author of Things Fall Apart'],
    answer: 'The first African woman to be published as a novelist in English',
    explanation: 'Flora Nwapa (1931-1993) of Nigeria was the first African woman to be published as a novelist in English, with her novel "Efuru" published in 1966.'
  },
  {
    topic: 'African Literature',
    questionText: 'The term "African Renaissance" in literature refers to ______',
    options: ['A return to traditional African dress', 'A revival and celebration of African cultural, literary, and intellectual achievement', 'A period of famine in Africa', 'The study of ancient African languages'],
    answer: 'A revival and celebration of African cultural, literary, and intellectual achievement',
    explanation: 'The African Renaissance refers to the renewal and celebration of African culture, philosophy, and creativity as a reclamation of African identity and pride.'
  },
  {
    topic: 'African Literature',
    questionText: 'Wole Soyinka\'s plays are notable for combining ______',
    options: ['Only Western dramatic traditions', 'Yoruba mythology and ritual with Western dramatic forms', 'Igbo oral tradition with English poetry', 'Ghanaian oral literature with French drama'],
    answer: 'Yoruba mythology and ritual with Western dramatic forms',
    explanation: 'Soyinka uniquely combines Yoruba mythology, ritual, and cosmology with Western dramatic traditions in his plays.'
  },
  {
    topic: 'African Literature',
    questionText: 'Chimamanda Ngozi Adichie\'s "Half of a Yellow Sun" deals with ______',
    options: ['The Rwandan genocide', 'The Nigerian-Biafran civil war (1967-1970)', 'South African apartheid', 'The Kenyan Mau Mau uprising'],
    answer: 'The Nigerian-Biafran civil war (1967-1970)',
    explanation: '"Half of a Yellow Sun" by Chimamanda Ngozi Adichie is set during the Nigerian-Biafran civil war of 1967-1970.'
  },
  {
    topic: 'African Literature',
    questionText: 'Ben Okri\'s "The Famished Road" employs the concept of ______',
    options: ['Marxist ideology', 'The Abiku or spirit child from Yoruba tradition', 'Egyptian mythology', 'Islamic theology'],
    answer: 'The Abiku or spirit child from Yoruba tradition',
    explanation: 'Ben Okri\'s "The Famished Road" is narrated by Azaro, an Abiku (spirit child) from Yoruba tradition — a child who repeatedly dies and is reborn.'
  },
  {
    topic: 'African Literature',
    questionText: 'The African literary journal "Transition" was important because ______',
    options: ['It published only foreign authors', 'It provided a platform for African writers and intellectuals to debate African culture and politics', 'It was the first African newspaper', 'It published only poetry'],
    answer: 'It provided a platform for African writers and intellectuals to debate African culture and politics',
    explanation: 'Transition magazine was a key forum for African intellectual and literary debate, publishing writers like Soyinka, Achebe, and Ngugi from the 1960s.'
  },
  {
    topic: 'African Literature',
    questionText: 'The praise name or "oriki" in Yoruba literature is ______',
    options: ['A type of curse', 'A poetic praise name recited to honour a person or lineage', 'A war chant', 'A riddle'],
    answer: 'A poetic praise name recited to honour a person or lineage',
    explanation: 'Oriki is a Yoruba form of oral poetry — praise names or attributes associated with a person, deity, or lineage that honour and celebrate them.'
  },
  {
    topic: 'African Literature',
    questionText: 'The setting in African literature often serves to ______',
    options: ['Be purely decorative', 'Reflect the political, cultural, and social realities of post-colonial Africa', 'Imitate European settings', 'Be irrelevant to the theme'],
    answer: 'Reflect the political, cultural, and social realities of post-colonial Africa',
    explanation: 'Setting in African literature is often deeply meaningful, reflecting the cultural landscape, colonial history, and contemporary realities of African societies.'
  },
  {
    topic: 'African Literature',
    questionText: 'African literature that responds to and challenges European representations of Africa is described as ______',
    options: ['Romantic literature', 'Counter-discourse or post-colonial literature', 'Gothic literature', 'Modernist literature'],
    answer: 'Counter-discourse or post-colonial literature',
    explanation: 'Much African literature functions as a counter-discourse — responding to and challenging the stereotypes and misrepresentations of Africa in Western literature.'
  },

  // ==========================================================
  // LANGUAGE AND STYLE (20 questions)
  // ==========================================================

  {
    topic: 'Language and Style',
    questionText: 'Diction in literature refers to ______',
    options: ['The plot of the story', 'The writer\'s choice of words and vocabulary', 'The rhythm of the poem', 'The setting of the novel'],
    answer: 'The writer\'s choice of words and vocabulary',
    explanation: 'Diction refers to the choice and use of words and phrases by a writer — it is a key element of a writer\'s style.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Formal register in language is used when ______',
    options: ['Speaking with close friends', 'In official, academic, or professional contexts', 'Writing text messages', 'Telling jokes'],
    answer: 'In official, academic, or professional contexts',
    explanation: 'Formal register uses correct grammar, complex vocabulary, and a serious tone — appropriate for academic writing, official communication, or professional settings.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Informal register in language is characterised by ______',
    options: ['Complex vocabulary and formal structure', 'Relaxed tone, conversational language, and colloquialisms', 'Latin and Greek terminology', 'Highly structured paragraphs'],
    answer: 'Relaxed tone, conversational language, and colloquialisms',
    explanation: 'Informal register is used in everyday, casual conversations and is characterised by simple vocabulary, contractions, and a relaxed tone.'
  },
  {
    topic: 'Language and Style',
    questionText: 'The tone of a piece of writing is ______',
    options: ['The loudness of the writing', 'The writer\'s attitude towards the subject or audience', 'The setting of the story', 'The rhythm of the sentences'],
    answer: 'The writer\'s attitude towards the subject or audience',
    explanation: 'Tone reflects the attitude or feeling of the writer towards the topic or the reader, conveyed through word choice and style.'
  },
  {
    topic: 'Language and Style',
    questionText: 'A melancholic tone in writing means the writing is ______',
    options: ['Joyful and celebratory', 'Deeply sad and thoughtful', 'Angry and aggressive', 'Sarcastic and mocking'],
    answer: 'Deeply sad and thoughtful',
    explanation: 'A melancholic tone conveys deep sadness, pensiveness, and a sense of loss or longing.'
  },
  {
    topic: 'Language and Style',
    questionText: 'A sardonic tone means the writer is ______',
    options: ['Joyful', 'Grimly mocking or cynically humorous', 'Fearful', 'Respectful and serious'],
    answer: 'Grimly mocking or cynically humorous',
    explanation: 'A sardonic tone is characterised by grimly mocking, cynical, or scornful humour at the expense of the subject.'
  },
  {
    topic: 'Language and Style',
    questionText: 'A nostalgic tone in writing conveys ______',
    options: ['Anger at the past', 'A sentimental longing for the past', 'Fear of the future', 'Excitement about change'],
    answer: 'A sentimental longing for the past',
    explanation: 'Nostalgia is a bittersweet longing for the past — a nostalgic tone conveys fond remembrance mixed with sadness that those times are gone.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Syntax in literature refers to ______',
    options: ['The choice of words', 'The arrangement of words and phrases to form sentences', 'The rhyme scheme of a poem', 'The narrative structure'],
    answer: 'The arrangement of words and phrases to form sentences',
    explanation: 'Syntax refers to the way words and phrases are arranged to form well-structured sentences in a language.'
  },
  {
    topic: 'Language and Style',
    questionText: 'A writer who uses long, complex sentences is likely trying to ______',
    options: ['Confuse the reader', 'Create a sense of complexity, depth, or the flow of thought', 'Write quickly', 'Avoid figurative language'],
    answer: 'Create a sense of complexity, depth, or the flow of thought',
    explanation: 'Long, complex sentences can mirror intricate thought processes, build tension, or convey elaborate ideas — each writer uses sentence length deliberately.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Short, simple sentences in writing create a feeling of ______',
    options: ['Confusion and complexity', 'Speed, urgency, directness, or bluntness', 'Boredom and monotony', 'Scholarly depth'],
    answer: 'Speed, urgency, directness, or bluntness',
    explanation: 'Short sentences create pace and urgency — they are often used in action scenes, moments of tension, or to make a direct point.'
  },
  {
    topic: 'Language and Style',
    questionText: 'The use of passive voice in writing tends to ______',
    options: ['Make the writing more personal', 'Distance the subject from the action and can make writing seem more formal or impersonal', 'Make the writing more emotional', 'Create a conversational tone'],
    answer: 'Distance the subject from the action and can make writing seem more formal or impersonal',
    explanation: 'Passive voice construction removes the agent of an action, creating distance and a more formal, objective tone.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Ambiguity in literature refers to ______',
    options: ['A clear and single meaning', 'The quality of having more than one possible meaning or interpretation', 'A grammatical error', 'The use of difficult vocabulary'],
    answer: 'The quality of having more than one possible meaning or interpretation',
    explanation: 'Ambiguity is when a word, phrase, or situation has more than one possible meaning — sometimes deliberate for artistic effect.'
  },
  {
    topic: 'Language and Style',
    questionText: 'A writer\'s voice is best described as ______',
    options: ['The narrator\'s speaking volume', 'The unique personality and perspective that comes through in a writer\'s work', 'The dialogue in the story', 'The theme of the work'],
    answer: 'The unique personality and perspective that comes through in a writer\'s work',
    explanation: 'A writer\'s voice is the distinctive personality, style, and perspective that makes their writing recognisable.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Connotation refers to ______',
    options: ['The dictionary definition of a word', 'The emotional or cultural associations a word carries beyond its literal meaning', 'The grammatical function of a word', 'The origin of a word'],
    answer: 'The emotional or cultural associations a word carries beyond its literal meaning',
    explanation: 'Connotation is the suggested or implied meaning of a word — the associations and emotions it carries beyond its literal definition.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Denotation refers to ______',
    options: ['The emotional associations of a word', 'The literal, dictionary definition of a word', 'The figurative meaning of a word', 'The cultural meaning of a word'],
    answer: 'The literal, dictionary definition of a word',
    explanation: 'Denotation is the literal or primary meaning of a word — its dictionary definition, without any associated feelings or ideas.'
  },
  {
    topic: 'Language and Style',
    questionText: 'When a writer uses concrete and specific language rather than vague abstractions, the writing tends to be ______',
    options: ['Harder to understand', 'More vivid, precise, and engaging', 'More formal and academic', 'Less interesting'],
    answer: 'More vivid, precise, and engaging',
    explanation: 'Concrete, specific language creates clearer and more vivid writing — it gives readers something precise to imagine rather than vague generalizations.'
  },
  {
    topic: 'Language and Style',
    questionText: 'Colloquial language in literature is used to ______',
    options: ['Make writing seem academic', 'Make characters seem more realistic and natural by using everyday speech', 'Replace figurative language', 'Create a formal distance between narrator and reader'],
    answer: 'Make characters seem more realistic and natural by using everyday speech',
    explanation: 'Colloquial language — everyday informal speech — makes characters and narrators seem more real and relatable to the reader.'
  },
  {
    topic: 'Language and Style',
    questionText: 'A writer uses imagery to ______',
    options: ['Summarise the plot', 'Appeal to the reader\'s senses and create vivid mental pictures', 'Introduce characters', 'Provide historical context'],
    answer: 'Appeal to the reader\'s senses and create vivid mental pictures',
    explanation: 'Imagery uses descriptive language to appeal to the senses — sight, sound, touch, taste, and smell — creating rich mental pictures.'
  },
  {
    topic: 'Language and Style',
    questionText: 'The use of repetition in literature is used to ______',
    options: ['Show the writer forgot what they wrote', 'Create emphasis, rhythm, and reinforce key ideas', 'Fill space in a poem', 'Replace figurative language'],
    answer: 'Create emphasis, rhythm, and reinforce key ideas',
    explanation: 'Repetition emphasises important ideas, creates musical rhythm, and can build emotional intensity in a piece of writing.'
  },
  {
    topic: 'Language and Style',
    questionText: 'When analysing a poem\'s style, a student should consider ______',
    options: ['Only the rhyme scheme', 'Diction, imagery, figures of speech, tone, structure, and sound devices', 'Only the theme', 'Only the number of stanzas'],
    answer: 'Diction, imagery, figures of speech, tone, structure, and sound devices',
    explanation: 'A full stylistic analysis of a poem examines all elements including word choice, imagery, figurative language, tone, structure, and sound devices like alliteration and rhyme.'
  },

];

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function seedLiterature() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Find a teacher or admin to assign as question owner
    let teacher = await User.findOne({ role: 'teacher' });
    if (!teacher) teacher = await User.findOne({ role: 'admin' });
    if (!teacher) {
      console.error('No teacher or admin found. Run seed.js first.');
      process.exit(1);
    }
    console.log(`Using "${teacher.username}" as question owner`);

    // Create or find Literature in English subject
    let litSubject = await Subject.findOne({ name: 'Literature in English' });
    if (!litSubject) {
      litSubject = await Subject.create({
        name:        'Literature in English',
        description: 'General Literature in English — WAEC/NECO/JAMB SS level'
      });
      console.log('Created Literature in English subject');
    } else {
      console.log('Literature in English subject already exists');
    }

    // Create syllabus topics
    const syllabusMap = {};
    for (const t of litTopics) {
      let existing = await Syllabus.findOne({ subjectId: litSubject._id, topic: t.topic });
      if (!existing) {
        existing = await Syllabus.create({
          subjectId:   litSubject._id,
          topic:       t.topic,
          description: t.description
        });
        console.log(`Created topic: ${t.topic}`);
      } else {
        console.log(`Topic exists: ${t.topic}`);
      }
      syllabusMap[t.topic] = existing._id;
    }

    // Seed questions
    let added   = 0;
    let skipped = 0;
    for (const q of litQuestions) {
      const exists = await Question.findOne({
        subjectId:    litSubject._id,
        questionText: q.questionText
      });
      if (!exists) {
        await Question.create({
          teacherId:    teacher._id,
          subjectId:    litSubject._id,
          syllabusId:   syllabusMap[q.topic],
          questionText: q.questionText,
          options:      q.options,
          answer:       q.answer,
          explanation:  q.explanation
        });
        added++;
      } else {
        skipped++;
      }
    }

    console.log('');
    console.log('================================================');
    console.log('seedLiterature.js — Completed!');
    console.log(`Questions added  : ${added}`);
    console.log(`Questions skipped: ${skipped} (already exist)`);
    console.log('');
    console.log('Breakdown by topic:');
    console.log('  Figure of Speech        : 60 questions');
    console.log('  Drama                   : 50 questions');
    console.log('  Prose and Narrative     : 50 questions');
    console.log('  Poetry                  : 50 questions');
    console.log('  Literary Terms & Genres : 40 questions');
    console.log('  African Literature      : 30 questions');
    console.log('  Language and Style      : 20 questions');
    console.log('  TOTAL                   : 300 questions');
    console.log('================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedLiterature();
