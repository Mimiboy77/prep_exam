'use strict';

// ============================================================
// seedLiterature2026.js
// Run with: node seedLiterature2026.js
// 200 questions based on WAEC/NECO 2026-2030 prescribed texts
// Safe to run multiple times — skips existing questions
//
// PRESCRIBED TEXTS:
// Shakespeare  : Antony and Cleopatra
// African Prose: So the Path Does Not Die (Pede Hollist)
//                Redemption Road (Elma Shaw)
// Non-Afr Prose: To Kill a Mockingbird (Harper Lee)
// African Drama: The Marriage of Anansewa (Efua Sutherland)
//                Once Upon an Elephant (Bosede Ademilua-Afolayan)
// Non-Afr Drama: An Inspector Calls (J.B. Priestley)
//                A Man for All Seasons (Robert Bolt)
// African Poetry: Once Upon a Time (Gabriel Okara)
//                 Not My Business (Niyi Osundare)
//                 Night (Wole Soyinka)
//                 New Tongue (Elizabeth L.A. Kamara)
//                 Hearty Garlands (S.O.H. Afriyie-Vidza)
//                 The Breast of the Sea (Syl Cheney-Coker)
// ============================================================

const mongoose = require('mongoose');
require('dotenv').config();

const User     = require('./models/User');
const Subject  = require('./models/Subject');
const Syllabus = require('./models/Syllabus');
const Question = require('./models/Question');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/exam-prep-app';

// ============================================================
// SYLLABUS TOPICS (matching prescribed text categories)
// ============================================================
const litTopics = [
  { topic: 'Shakespeare — Antony and Cleopatra',         description: 'All objective questions on Antony and Cleopatra by William Shakespeare' },
  { topic: 'African Prose — So the Path Does Not Die',   description: 'Pede Hollist: themes, characters, plot, setting and style' },
  { topic: 'African Prose — Redemption Road',            description: 'Elma Shaw: themes, characters, plot, setting and style' },
  { topic: 'Non-African Prose — To Kill a Mockingbird',  description: 'Harper Lee: themes, characters, plot, setting and style' },
  { topic: 'African Drama — The Marriage of Anansewa',   description: 'Efua Sutherland: themes, characters, plot, dramatic devices' },
  { topic: 'African Drama — Once Upon an Elephant',      description: 'Bosede Ademilua-Afolayan: themes, characters, plot, dramatic devices' },
  { topic: 'Non-African Drama — An Inspector Calls',     description: 'J.B. Priestley: themes, characters, dramatic devices and social context' },
  { topic: 'Non-African Drama — A Man for All Seasons',  description: 'Robert Bolt: themes, characters, historical context and dramatic devices' },
  { topic: 'African Poetry',                             description: 'Okara, Osundare, Soyinka, Kamara, Afriyie-Vidza, Cheney-Coker' },
];

// ============================================================
// QUESTIONS (200)
// ============================================================
const litQuestions = [

  // ==========================================================
  // SHAKESPEARE: ANTONY AND CLEOPATRA (30 questions)
  // WAEC sets 20 objective questions from this text
  // ==========================================================

  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Antony and Cleopatra is set primarily in which two locations?',
    options: ['Rome and Egypt', 'Greece and Egypt', 'Rome and Greece', 'Alexandria and Athens'],
    answer: 'Rome and Egypt',
    explanation: 'The play moves between Rome, the world of duty and politics, and Egypt, the world of pleasure and passion.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'At the opening of the play, Antony is described by Philo as having become a ______',
    options: ['great general', 'strumpet\'s fool', 'coward', 'traitor'],
    answer: 'strumpet\'s fool',
    explanation: 'Philo laments that the great general Antony has become a fool enslaved to Cleopatra, whom he calls a strumpet.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Who is Octavia in the play?',
    options: ['Cleopatra\'s servant', 'Caesar\'s sister who marries Antony', 'A Roman senator\'s wife', 'Antony\'s first wife'],
    answer: 'Caesar\'s sister who marries Antony',
    explanation: 'Octavia is Caesar\'s (Octavius) sister. She marries Antony in an attempt to cement the alliance between Antony and Caesar.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'The soothsayer advises Antony to ______',
    options: ['stay in Egypt', 'return to Rome immediately', 'keep away from Caesar because Caesar\'s luck will always beat his', 'divorce Cleopatra'],
    answer: 'keep away from Caesar because Caesar\'s luck will always beat his',
    explanation: 'The soothsayer warns Antony that his fortunes will always be overshadowed when he is near Caesar.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Which battle marks the turning point and beginning of Antony\'s downfall?',
    options: ['Battle of Philippi', 'Battle of Actium', 'Battle of Pharsalus', 'Battle of the Nile'],
    answer: 'Battle of Actium',
    explanation: 'The Battle of Actium is the naval battle where Antony follows Cleopatra\'s retreating ships and loses, beginning his final downfall.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'After the defeat at Actium, Antony accuses Cleopatra of ______',
    options: ['cowardice and betrayal', 'poisoning his soldiers', 'plotting with Caesar', 'stealing his treasure'],
    answer: 'cowardice and betrayal',
    explanation: 'Antony accuses Cleopatra of fleeing during the battle and causing his defeat, calling it an act of betrayal.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'How does Enobarbus die in the play?',
    options: ['He is killed in battle', 'He is executed by Caesar', 'He dies of a broken heart after deserting Antony', 'He is poisoned by Cleopatra'],
    answer: 'He dies of a broken heart after deserting Antony',
    explanation: 'After deserting Antony for Caesar, Enobarbus is overwhelmed with guilt when Antony sends his treasure after him. He dies of grief.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'The famous description of Cleopatra on her barge is made by ______',
    options: ['Antony', 'Caesar', 'Enobarbus', 'Agrippa'],
    answer: 'Enobarbus',
    explanation: 'Enobarbus delivers the famous speech describing Cleopatra\'s magnificent appearance on her golden barge on the river Cydnus.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Cleopatra kills herself by ______',
    options: ['drinking poison', 'stabbing herself with a dagger', 'allowing an asp to bite her', 'drowning in the Nile'],
    answer: 'allowing an asp to bite her',
    explanation: 'Cleopatra kills herself by applying an asp (a venomous snake) to her breast, choosing death over the humiliation of being paraded in Rome.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'How does Antony attempt to kill himself?',
    options: ['He drinks poison', 'He drowns himself', 'He falls on his sword', 'He asks Eros to stab him'],
    answer: 'He falls on his sword',
    explanation: 'After Eros refuses to kill him and kills himself instead, Antony falls on his own sword but does not die immediately.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'What false news does Cleopatra send Antony that triggers his suicide attempt?',
    options: ['That she has surrendered to Caesar', 'That she has married Caesar', 'That she is dead', 'That she has fled Egypt'],
    answer: 'That she is dead',
    explanation: 'Cleopatra sends word that she is dead, which causes Antony to fall on his sword in grief.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'The central conflict in Antony and Cleopatra is between ______',
    options: ['Rome and Egypt', 'Love and duty/honour', 'Antony and Caesar', 'Cleopatra and Octavia'],
    answer: 'Love and duty/honour',
    explanation: 'The central conflict is Antony\'s torn loyalty between his love for Cleopatra and his duty as a Roman general and political leader.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Who is Lepidus in the play?',
    options: ['Antony\'s chief soldier', 'The third member of the ruling triumvirate', 'Caesar\'s spy in Egypt', 'Cleopatra\'s advisor'],
    answer: 'The third member of the ruling triumvirate',
    explanation: 'Lepidus is the third member of the triumvirate ruling Rome alongside Antony and Caesar, though he is the weakest of the three.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Enobarbus describes Cleopatra saying "Age cannot wither her, nor custom stale / Her infinite ______"',
    options: ['beauty', 'variety', 'power', 'wisdom'],
    answer: 'variety',
    explanation: 'Enobarbus says Cleopatra\'s "infinite variety" means she never becomes boring — she always fascinates.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Octavius Caesar in the play represents ______',
    options: ['Passion and love', 'Roman duty, cold calculation and political ambition', 'Military courage', 'Egyptian culture'],
    answer: 'Roman duty, cold calculation and political ambition',
    explanation: 'Caesar represents the cold, calculating, disciplined Roman world — a direct contrast to Antony\'s passionate nature.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'What does the play suggest about the nature of Antony and Cleopatra\'s love?',
    options: ['It is a destructive obsession that leads to ruin', 'It is a noble love that transcends death', 'It is purely political', 'It is one-sided — only Cleopatra loves Antony'],
    answer: 'It is a noble love that transcends death',
    explanation: 'Despite its tragic end, the play elevates their love as extraordinary and immortal — both die for each other.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Which character says: "I am dying, Egypt, dying"?',
    options: ['Caesar', 'Enobarbus', 'Antony', 'Lepidus'],
    answer: 'Antony',
    explanation: 'Antony says these words as he is dying after his failed suicide attempt, being brought to Cleopatra in her monument.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Antony\'s tragic flaw is best described as ______',
    options: ['cowardice', 'greed', 'his inability to balance love and duty', 'jealousy'],
    answer: 'his inability to balance love and duty',
    explanation: 'Antony\'s hamartia is that his passion for Cleopatra causes him to neglect his Roman duties, ultimately leading to his downfall.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Cleopatra refers to her death as a way to ______',
    options: ['punish Antony', 'escape Caesar\'s humiliation and join Antony', 'gain power over Egypt', 'prove her love to the gods'],
    answer: 'escape Caesar\'s humiliation and join Antony',
    explanation: 'Cleopatra kills herself to avoid being displayed as a trophy in Caesar\'s triumph in Rome and to be reunited with Antony in death.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'The play Antony and Cleopatra belongs to which genre?',
    options: ['Comedy', 'History play', 'Tragedy', 'Tragicomedy'],
    answer: 'Tragedy',
    explanation: 'Antony and Cleopatra is classified as a tragedy — it ends with the deaths of both protagonists.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Who delivers the final eulogy over the dead bodies of Antony and Cleopatra?',
    options: ['Enobarbus', 'Lepidus', 'Octavius Caesar', 'Charmian'],
    answer: 'Octavius Caesar',
    explanation: 'Caesar delivers the final speech, acknowledging the greatness of the lovers and ordering a noble burial for them.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'What is the significance of the setting of Egypt in the play?',
    options: ['It represents war and conflict', 'It represents passion, excess, femininity and freedom from Roman duty', 'It represents poverty and backwardness', 'It represents political power'],
    answer: 'It represents passion, excess, femininity and freedom from Roman duty',
    explanation: 'Egypt in the play symbolises sensuality, passion, and freedom — a direct contrast to the cold discipline of Rome.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Iras and Charmian are ______',
    options: ['Roman senators\' wives', 'Cleopatra\'s attendants', 'Egyptian spies', 'Caesar\'s messengers'],
    answer: 'Cleopatra\'s attendants',
    explanation: 'Iras and Charmian are Cleopatra\'s faithful attendants who remain loyal to her until death.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'The marriage between Antony and Octavia is primarily ______',
    options: ['A love match', 'A political arrangement to bring peace between Antony and Caesar', 'Forced by Cleopatra\'s jealousy', 'A religious ceremony'],
    answer: 'A political arrangement to bring peace between Antony and Caesar',
    explanation: 'The marriage is a political alliance suggested by Agrippa to unite the two rival leaders of Rome.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'When Antony accuses Cleopatra of betrayal after Actium, she responds with ______',
    options: ['Anger and defiance', 'Tears and appeals to his love', 'Silence', 'A plan to defeat Caesar'],
    answer: 'Tears and appeals to his love',
    explanation: 'Cleopatra uses her emotional power and beauty to win back Antony\'s affection after the battle of Actium.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'What does Cleopatra\'s death by asp symbolise in the play?',
    options: ['Cowardice and escape', 'Her triumph over Caesar and her nobility in death', 'Her guilt over Antony\'s death', 'Egypt\'s surrender to Rome'],
    answer: 'Her triumph over Caesar and her nobility in death',
    explanation: 'By dying as she chooses, Cleopatra denies Caesar his victory — her death is an act of defiance and dignity.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'A key theme in Antony and Cleopatra is ______',
    options: ['The conflict between appearance and reality', 'The rise and fall of great leaders due to personal weakness', 'Religious faith in ancient times', 'The power of money over loyalty'],
    answer: 'The rise and fall of great leaders due to personal weakness',
    explanation: 'The play explores how personal passion and weakness can bring down even the greatest of leaders.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Pompey in the play represents ______',
    options: ['A threat to the triumvirate\'s power', 'Antony\'s closest ally', 'Cleopatra\'s secret admirer', 'Caesar\'s general'],
    answer: 'A threat to the triumvirate\'s power',
    explanation: 'Sextus Pompey is a rebel leader who threatens the rule of the three triumvirs — Antony, Caesar, and Lepidus.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'Which character serves as a loyal foil to Antony by always telling him the truth?',
    options: ['Lepidus', 'Caesar', 'Enobarbus', 'Eros'],
    answer: 'Enobarbus',
    explanation: 'Enobarbus is Antony\'s most trusted officer who speaks honestly about Antony\'s decisions, even when others flatter him.'
  },
  {
    topic: 'Shakespeare — Antony and Cleopatra',
    questionText: 'The play begins with whose speech criticising Antony\'s behaviour?',
    options: ['Caesar', 'Enobarbus', 'Philo', 'Demetrius'],
    answer: 'Philo',
    explanation: 'The play opens with Philo\'s speech lamenting how the great general Antony has been reduced to a fool by his love for Cleopatra.'
  },

  // ==========================================================
  // AFRICAN PROSE: SO THE PATH DOES NOT DIE (25 questions)
  // ==========================================================

  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Who is the author of "So the Path Does Not Die"?',
    options: ['Chinua Achebe', 'Chimamanda Ngozi Adichie', 'Pede Hollist', 'Wole Soyinka'],
    answer: 'Pede Hollist',
    explanation: 'Pede Hollist is a Sierra Leonean professor and award-winning fiction writer. This is his debut novel.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The protagonist of the novel is ______',
    options: ['Baramusu', 'Nabou', 'Finaba (Fina) Marah', 'Mawaf'],
    answer: 'Finaba (Fina) Marah',
    explanation: 'Finaba, called Fina, is the central character whose life story the novel follows from her aborted circumcision to her return to Sierra Leone.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The central conflict of the novel revolves around ______',
    options: ['Civil war in Sierra Leone', 'Female Genital Mutilation and the clash between tradition and modernity', 'Political corruption in West Africa', 'Racial discrimination in America'],
    answer: 'Female Genital Mutilation and the clash between tradition and modernity',
    explanation: 'The novel explores the practice of FGM as the key tension between traditional cultural values and modern Western thinking.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Fina\'s grandmother who strongly supports her initiation is ______',
    options: ['Nabou', 'Mawaf', 'Baramusu', 'Mama Yegbe'],
    answer: 'Baramusu',
    explanation: 'Baramusu is Fina\'s paternal grandmother who firmly believes Fina must be circumcised to become a proper woman.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Who rescues Fina from the initiation ceremony?',
    options: ['Her mother Nabou', 'Her father Amadu', 'Her boyfriend Cammy', 'Baramusu'],
    answer: 'Her father Amadu',
    explanation: 'Fina\'s father Amadu, who opposes FGM, pulls her out of the initiation ground, causing a major family and community crisis.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The title "So the Path Does Not Die" refers to ______',
    options: ['The road from Sierra Leone to America', 'The cultural initiation path that must be kept alive', 'The path of education and enlightenment', 'The journey back to Africa'],
    answer: 'The cultural initiation path that must be kept alive',
    explanation: 'The title reflects Baramusu\'s insistence that the tradition of female initiation must continue — the cultural path must not die.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'After leaving Sierra Leone, Fina lives in ______',
    options: ['London, England', 'Paris, France', 'Washington D.C., USA', 'Lagos, Nigeria'],
    answer: 'Washington D.C., USA',
    explanation: 'Fina relocates to the Washington Metropolitan Area in the United States, where much of the middle section of the novel is set.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Fina\'s fiancé who is a surgeon is ______',
    options: ['Jemal', 'Aman', 'Bayo', 'Cammy'],
    answer: 'Cammy',
    explanation: 'Cammy is a Trinidadian-American surgeon who becomes engaged to Fina in America.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'One of the major themes of the novel is ______',
    options: ['Religious extremism', 'The search for identity and belonging', 'Political revolution', 'Environmental destruction'],
    answer: 'The search for identity and belonging',
    explanation: 'Fina\'s life is defined by her search for a sense of belonging — in her community, in America, and within herself.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The prologue of the novel tells the story of ______',
    options: ['Fina\'s childhood in Talaba', 'The village of Musudugu where only women lived', 'Baramusu\'s early life', 'The civil war in Sierra Leone'],
    answer: 'The village of Musudugu where only women lived',
    explanation: 'The prologue narrates the legend of Musudugu, a village of only women, which was destroyed when a girl named Kumba questioned its rules.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'What is the significance of Baramusu\'s curse on the family after Amadu removes Fina from initiation?',
    options: ['It makes Fina fall ill', 'It banishes the family from the village and haunts Fina\'s life', 'It kills Nabou', 'It destroys the farm'],
    answer: 'It banishes the family from the village and haunts Fina\'s life',
    explanation: 'Baramusu curses the family, and they are banished from Talaba. Fina spends much of her life believing this curse follows her.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The novel is set in which two countries?',
    options: ['Nigeria and England', 'Sierra Leone and the United States', 'Ghana and France', 'Liberia and Canada'],
    answer: 'Sierra Leone and the United States',
    explanation: 'The novel moves between Sierra Leone (Talaba and Freetown) and the United States (Washington D.C. area).'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Fina\'s first marriage in the novel is to ______',
    options: ['Cammy', 'Bayo', 'Jemal', 'Aman'],
    answer: 'Jemal',
    explanation: 'Fina\'s first marriage is to Jemal, which fails before she later becomes engaged to Cammy.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Mawaf in the novel is ______',
    options: ['Fina\'s sister', 'A war-traumatised teenager', 'Baramusu\'s friend', 'Cammy\'s former girlfriend'],
    answer: 'A war-traumatised teenager',
    explanation: 'Mawaf is a young girl traumatised by the Sierra Leone civil war whose story is interwoven with Fina\'s.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'At the end of the novel, Fina returns to Sierra Leone to ______',
    options: ['Get married to a village man', 'Seek revenge on Baramusu', 'Work as an advocate for war-traumatised children', 'Claim her inheritance'],
    answer: 'Work as an advocate for war-traumatised children',
    explanation: 'Fina ultimately returns home to Sierra Leone as an advocate for children affected by war, finding her purpose and belonging.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The narrative style of the novel is best described as ______',
    options: ['First person throughout', 'Third person omniscient', 'Second person', 'Stream of consciousness only'],
    answer: 'Third person omniscient',
    explanation: 'Hollist uses a third person omniscient narrator who can access the thoughts and feelings of multiple characters.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Baramusu tells Fina the story of the bird-scaring rope to teach her that ______',
    options: ['Birds are a danger to farmers', 'Life is when people work together — never cut the rope', 'Women must obey their elders', 'Hard work brings rewards'],
    answer: 'Life is when people work together — never cut the rope',
    explanation: 'Baramusu uses the rope metaphor to teach Fina the importance of communal bonds and not breaking ties with tradition.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'What does the "broken path" represent in the novel?',
    options: ['The road from the village to the city', 'Fina\'s interrupted initiation and her incomplete sense of identity', 'The death of Baramusu', 'The civil war\'s destruction'],
    answer: 'Fina\'s interrupted initiation and her incomplete sense of identity',
    explanation: 'The "broken path" is a metaphor for Fina\'s incomplete initiation and her resulting sense of not fully belonging to any world.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Pede Hollist\'s nationality is ______',
    options: ['Nigerian', 'Ghanaian', 'Sierra Leonean', 'Liberian'],
    answer: 'Sierra Leonean',
    explanation: 'Pede Hollist is a Sierra Leonean-born author who teaches at the University of Tampa, Florida.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The theme of the conflict between tradition and modernity is shown through ______',
    options: ['The war between villages', 'Baramusu\'s support for FGM versus Amadu\'s opposition', 'Fina\'s education in America', 'Cammy\'s medical practice'],
    answer: 'Baramusu\'s support for FGM versus Amadu\'s opposition',
    explanation: 'The debate between Baramusu and Amadu over Fina\'s initiation directly embodies the clash between tradition and modern values.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Which of these is NOT a theme in "So the Path Does Not Die"?',
    options: ['Female identity and agency', 'The impact of civil war', 'Colonial administration of Africa', 'Cultural belonging and displacement'],
    answer: 'Colonial administration of Africa',
    explanation: 'The novel focuses on FGM, identity, civil war, and diaspora — not on the period of colonial administration.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Fina\'s ethnic group in the novel is ______',
    options: ['Yoruba', 'Fula', 'Igbo', 'Mende'],
    answer: 'Fula',
    explanation: 'Fina is described as a Fula girl, one of the ethnic groups in Sierra Leone and West Africa.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The village where Fina grows up is called ______',
    options: ['Freetown', 'Koidu', 'Musudugu', 'Talaba'],
    answer: 'Talaba',
    explanation: 'Talaba is Fina\'s home village where her aborted initiation takes place.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'Aman in the novel is ______',
    options: ['Fina\'s sister in America', 'An African-American woman who becomes Fina\'s friend', 'Baramusu\'s daughter', 'Cammy\'s ex-girlfriend'],
    answer: 'An African-American woman who becomes Fina\'s friend',
    explanation: 'Aman is an African-American character in the Washington section of the novel whose story parallels aspects of Fina\'s experience.'
  },
  {
    topic: 'African Prose — So the Path Does Not Die',
    questionText: 'The novel "So the Path Does Not Die" was first published in ______',
    options: ['1998', '2005', '2008', '2012'],
    answer: '2008',
    explanation: 'So the Path Does Not Die was first published in 2008 and republished by Narrative Landscape Press in 2024.'
  },

  // ==========================================================
  // NON-AFRICAN PROSE: TO KILL A MOCKINGBIRD (20 questions)
  // ==========================================================

  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Who is the author of "To Kill a Mockingbird"?',
    options: ['Toni Morrison', 'Harper Lee', 'Maya Angelou', 'Zora Neale Hurston'],
    answer: 'Harper Lee',
    explanation: 'Harper Lee published "To Kill a Mockingbird" in 1960. It won the Pulitzer Prize in 1961.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The narrator of the novel is ______',
    options: ['Atticus Finch', 'Jem Finch', 'Scout (Jean Louise) Finch', 'Dill Harris'],
    answer: 'Scout (Jean Louise) Finch',
    explanation: 'The novel is narrated by Scout Finch, a young girl who tells the story as an adult looking back on her childhood.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Atticus Finch is a ______',
    options: ['Doctor', 'Sheriff', 'Lawyer', 'Teacher'],
    answer: 'Lawyer',
    explanation: 'Atticus Finch is a lawyer in Maycomb, Alabama, who defends Tom Robinson, a Black man falsely accused of rape.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Tom Robinson is accused of ______',
    options: ['Robbery', 'Murder', 'Raping Mayella Ewell', 'Assault'],
    answer: 'Raping Mayella Ewell',
    explanation: 'Tom Robinson, a Black man, is falsely accused of raping Mayella Ewell, a white woman, in the racially charged town of Maycomb.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The mysterious neighbour who leaves gifts for Scout and Jem is ______',
    options: ['Bob Ewell', 'Dill Harris', 'Boo Radley', 'Tom Robinson'],
    answer: 'Boo Radley',
    explanation: 'Boo Radley is the reclusive neighbour who leaves gifts in a tree knot for the children and later saves their lives.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The novel is set in ______',
    options: ['New York City', 'Atlanta, Georgia', 'Maycomb, Alabama', 'Mississippi'],
    answer: 'Maycomb, Alabama',
    explanation: 'The novel is set in the fictional town of Maycomb, Alabama, during the 1930s Great Depression era.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The title "To Kill a Mockingbird" symbolises ______',
    options: ['Hunting in Alabama', 'The destruction of innocence', 'A childhood game', 'Southern wildlife'],
    answer: 'The destruction of innocence',
    explanation: 'Atticus tells his children it is a sin to kill a mockingbird because they only make music. The mockingbird symbolises innocents like Tom Robinson and Boo Radley.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'What is the verdict in Tom Robinson\'s trial?',
    options: ['Not guilty', 'Guilty', 'Mistrial', 'Case dismissed'],
    answer: 'Guilty',
    explanation: 'Despite clear evidence of Tom\'s innocence and Atticus\'s brilliant defence, the all-white jury finds Tom Robinson guilty.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'How does Tom Robinson die?',
    options: ['He is lynched by a mob', 'He is electrocuted', 'He is shot while attempting to escape from prison', 'He dies of illness in prison'],
    answer: 'He is shot while attempting to escape from prison',
    explanation: 'Tom Robinson is shot seventeen times while trying to escape from the prison yard after his conviction.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Bob Ewell attacks Scout and Jem because ______',
    options: ['They trespassed on his land', 'He wants revenge on Atticus for humiliating him in court', 'He is drunk and confused', 'They insulted his daughter Mayella'],
    answer: 'He wants revenge on Atticus for humiliating him in court',
    explanation: 'Bob Ewell attacks the children on Halloween night as revenge against Atticus who exposed him as a liar in court.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Who saves Scout and Jem from Bob Ewell\'s attack?',
    options: ['Atticus Finch', 'Sheriff Heck Tate', 'Tom Robinson', 'Boo Radley'],
    answer: 'Boo Radley',
    explanation: 'Boo Radley emerges from his house and saves the children, killing Bob Ewell in the process.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'A major theme of "To Kill a Mockingbird" is ______',
    options: ['The joy of childhood adventure', 'Racial injustice and moral growth', 'The American Dream', 'Religious faith and doubt'],
    answer: 'Racial injustice and moral growth',
    explanation: 'The novel\'s central themes are racial injustice in the American South and the moral education of Scout as she grows up.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Atticus Finch\'s approach to parenting is best described as ______',
    options: ['Strict and authoritarian', 'Absent and neglectful', 'Gentle, honest, and morally instructive', 'Overprotective and fearful'],
    answer: 'Gentle, honest, and morally instructive',
    explanation: 'Atticus raises his children with honesty and moral integrity, encouraging them to see the world from others\' perspectives.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The point of view of the novel is ______',
    options: ['Third person omniscient', 'First person from Scout\'s perspective', 'Second person', 'Third person limited'],
    answer: 'First person from Scout\'s perspective',
    explanation: 'The novel is told in first person by Scout as an adult looking back on events from her childhood.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Miss Maudie Atkinson is significant in the novel because she ______',
    options: ['Testifies at Tom\'s trial', 'Is a kind neighbour who supports Atticus and teaches the children good values', 'Is Scout\'s teacher', 'Marries Atticus after the trial'],
    answer: 'Is a kind neighbour who supports Atticus and teaches the children good values',
    explanation: 'Miss Maudie is a wise, open-minded neighbour who supports Atticus and helps Scout understand moral lessons.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Which of the following characters represents class prejudice in the novel?',
    options: ['Atticus Finch', 'Aunt Alexandra', 'Miss Maudie', 'Boo Radley'],
    answer: 'Aunt Alexandra',
    explanation: 'Aunt Alexandra embodies class consciousness and social hierarchy — she is concerned with maintaining the Finch family\'s good name.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Dill Harris is modelled after the real-life childhood friend of Harper Lee named ______',
    options: ['Tennessee Williams', 'Truman Capote', 'F. Scott Fitzgerald', 'William Faulkner'],
    answer: 'Truman Capote',
    explanation: 'The character Dill is based on Harper Lee\'s childhood neighbour and lifelong friend, the author Truman Capote.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'Calpurnia in the novel is ______',
    options: ['A white teacher at the school', 'The Finch family\'s Black housekeeper who helps raise Scout and Jem', 'Bob Ewell\'s wife', 'A Black woman who testifies at the trial'],
    answer: 'The Finch family\'s Black housekeeper who helps raise Scout and Jem',
    explanation: 'Calpurnia is the Finch family\'s cook and housekeeper who plays a major role in raising the children after their mother died.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The lesson of empathy in the novel is best expressed by Atticus\'s quote ______',
    options: ['"It\'s a sin to kill a mockingbird"', '"You never really understand a person until you climb into his skin and walk around in it"', '"The one thing that doesn\'t abide by majority rule is a person\'s conscience"', '"Courage is not a man with a gun in his hand"'],
    answer: '"You never really understand a person until you climb into his skin and walk around in it"',
    explanation: 'This quote captures the novel\'s central lesson about empathy — understanding others by seeing the world from their perspective.'
  },
  {
    topic: 'Non-African Prose — To Kill a Mockingbird',
    questionText: 'The novel "To Kill a Mockingbird" was published in ______',
    options: ['1945', '1951', '1960', '1968'],
    answer: '1960',
    explanation: 'The novel was published on 11 July 1960 and went on to win the Pulitzer Prize for Fiction in 1961.'
  },

  // ==========================================================
  // AFRICAN DRAMA: THE MARRIAGE OF ANANSEWA (20 questions)
  // ==========================================================

  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'Who is the author of "The Marriage of Anansewa"?',
    options: ['Wole Soyinka', 'Ngugi wa Thiong\'o', 'Efua Sutherland', 'Ama Ata Aidoo'],
    answer: 'Efua Sutherland',
    explanation: 'Efua T. Sutherland was a pioneering Ghanaian playwright, poet, and children\'s author.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The central character Ananse is best described as ______',
    options: ['A courageous warrior', 'A cunning, scheming father who uses trickery for personal gain', 'A wise village elder', 'A heartbroken lover'],
    answer: 'A cunning, scheming father who uses trickery for personal gain',
    explanation: 'Ananse is a trickster character derived from Akan folklore. He schemes to collect bride wealth by simultaneously promising Anansewa to several chiefs.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'Ananse sends letters to several chiefs proposing ______',
    options: ['A trade agreement', 'Marriage to his daughter Anansewa', 'A peace treaty between villages', 'An alliance against a common enemy'],
    answer: 'Marriage to his daughter Anansewa',
    explanation: 'Ananse secretly writes to several chiefs simultaneously offering Anansewa as a bride, intending to collect money from all of them.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The Storyteller (Mboguo) in the play serves as ______',
    options: ['The villain of the play', 'A narrator who guides the audience through events and comments on the action', 'Ananse\'s business partner', 'Anansewa\'s secret lover'],
    answer: 'A narrator who guides the audience through events and comments on the action',
    explanation: 'The Storyteller is a chorus-like figure who narrates events, providing context and moral commentary for the audience.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'Anansewa is Ananse\'s ______',
    options: ['Wife', 'Sister', 'Daughter', 'Niece'],
    answer: 'Daughter',
    explanation: 'Anansewa is Ananse\'s only daughter, whom he uses as a tool in his scheme to acquire wealth from multiple chiefs.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The play is rooted in ______',
    options: ['Yoruba oral tradition', 'Akan storytelling tradition of Ghana', 'Igbo masquerade tradition', 'Swahili coastal culture'],
    answer: 'Akan storytelling tradition of Ghana',
    explanation: 'The play is rooted in the Ghanaian Akan tradition of Anansesem — the spider stories of the trickster Ananse.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'When the chiefs discover they have all been approached about the same woman, what does Ananse do?',
    options: ['He confesses and returns the money', 'He makes Anansewa pretend to be dead to buy time', 'He flees the village', 'He starts a war between the chiefs'],
    answer: 'He makes Anansewa pretend to be dead to buy time',
    explanation: 'When the chiefs begin to arrive, Ananse makes Anansewa pretend to be dead so he can see which chief shows the most love and wealth.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The chief who shows the greatest love for Anansewa and ultimately wins her hand is ______',
    options: ['Chief-Who-Is-Chief', 'Togbe Afede', 'Christie', 'George'],
    answer: 'Chief-Who-Is-Chief',
    explanation: 'Chief-Who-Is-Chief proves his love by sending the most and arriving to care for the "dying" Anansewa, ultimately winning her for marriage.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'A major theme of the play is ______',
    options: ['Colonial oppression', 'Trickery and greed versus love and integrity', 'Environmental conservation', 'Youth rebellion against elders'],
    answer: 'Trickery and greed versus love and integrity',
    explanation: 'The play satirises greed through Ananse\'s scheming while also exploring what genuine love looks like.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The dramatic technique Sutherland uses to involve the audience directly is called ______',
    options: ['Soliloquy', 'Aside', 'Audience participation through song and call-and-response', 'Stream of consciousness'],
    answer: 'Audience participation through song and call-and-response',
    explanation: 'Sutherland uses traditional performance elements including music, songs, and call-and-response to actively involve the audience.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'Ananse\'s secretary Christie is significant because she ______',
    options: ['Helps cover up the scheme', 'Falls in love with Ananse', 'Betrays Ananse to the chiefs', 'Is Anansewa\'s rival'],
    answer: 'Helps cover up the scheme',
    explanation: 'Christie helps Ananse manage the deception, writing letters and helping cover the scheme as it unfolds.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The play satirises ______',
    options: ['Religious hypocrisy', 'Materialism, greed, and the commercialisation of marriage', 'Political corruption', 'Western education'],
    answer: 'Materialism, greed, and the commercialisation of marriage',
    explanation: 'Through Ananse\'s scheme, Sutherland satirises the reduction of marriage to a financial transaction and the greed it can inspire.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'Efua Sutherland is from which country?',
    options: ['Nigeria', 'Sierra Leone', 'Ghana', 'Liberia'],
    answer: 'Ghana',
    explanation: 'Efua Theodora Sutherland (1924-1996) was a renowned Ghanaian playwright and literary figure.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The character Ananse is derived from ______',
    options: ['An Igbo deity', 'The spider trickster of Akan oral tradition', 'A historical Ghanaian king', 'A Yoruba masquerade character'],
    answer: 'The spider trickster of Akan oral tradition',
    explanation: 'Ananse the spider is one of the most celebrated trickster figures in African oral literature, originating from the Akan people of Ghana.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The play ends with ______',
    options: ['Ananse being punished for his trickery', 'Anansewa choosing her own husband against Ananse\'s wishes', 'Anansewa\'s marriage to Chief-Who-Is-Chief and Ananse\'s scheme succeeding', 'All the chiefs demanding their money back'],
    answer: 'Anansewa\'s marriage to Chief-Who-Is-Chief and Ananse\'s scheme succeeding',
    explanation: 'The play ends with Ananse\'s scheme succeeding — Anansewa marries the chief who loved her most, and Ananse profits from the arrangement.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The role of women in the play can best be described as ______',
    options: ['Powerful and independent', 'Marginalised and used as objects in male schemes', 'Absent and invisible', 'Warriors and leaders'],
    answer: 'Marginalised and used as objects in male schemes',
    explanation: 'Anansewa is used by her father as a commodity in his scheme, reflecting how women can be marginalised in patriarchal societies.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The play incorporates traditional African performance elements such as ______',
    options: ['Greek chorus', 'Music, dance, and oral storytelling', 'Shakespearean soliloquy', 'Western stage conventions only'],
    answer: 'Music, dance, and oral storytelling',
    explanation: 'Sutherland deliberately incorporates Ghanaian oral performance traditions — music, dance, call-and-response — into the play\'s structure.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The moral lesson of "The Marriage of Anansewa" is ______',
    options: ['Trickery always leads to punishment', 'True love is more valuable than material wealth', 'Women should obey their fathers', 'Wealth is the most important thing in marriage'],
    answer: 'True love is more valuable than material wealth',
    explanation: 'Despite Ananse\'s greed, the play ultimately rewards true love — Chief-Who-Is-Chief wins Anansewa because he genuinely loves her.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'What does Ananse\'s character say about human nature?',
    options: ['Humans are naturally generous', 'Human beings are capable of great cunning when driven by greed', 'Humans always choose love over money', 'Human beings are naturally honest'],
    answer: 'Human beings are capable of great cunning when driven by greed',
    explanation: 'Ananse embodies the universal human capacity for cleverness and deception when motivated by material desire.'
  },
  {
    topic: 'African Drama — The Marriage of Anansewa',
    questionText: 'The genre of "The Marriage of Anansewa" is best described as ______',
    options: ['Tragedy', 'Political drama', 'Comedy rooted in African oral tradition', 'Historical drama'],
    answer: 'Comedy rooted in African oral tradition',
    explanation: 'The play is a comedy with farcical elements, rooted in the Ghanaian Anansesem storytelling tradition.'
  },

  // ==========================================================
  // NON-AFRICAN DRAMA: AN INSPECTOR CALLS (20 questions)
  // ==========================================================

  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Who is the author of "An Inspector Calls"?',
    options: ['George Bernard Shaw', 'Oscar Wilde', 'J.B. Priestley', 'Arthur Miller'],
    answer: 'J.B. Priestley',
    explanation: 'John Boynton Priestley (1894-1984) was an English novelist and playwright who wrote An Inspector Calls in 1945.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'The play is set in ______',
    options: ['1945, after World War II', '1912, before World War I', '1930, during the Depression', '1960, post-war England'],
    answer: '1912, before World War I',
    explanation: 'The play is set in April 1912 — before the First World War — though it was written in 1945, giving its message added weight.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'The Birling family is celebrating ______',
    options: ['Mr Birling\'s promotion', 'The engagement of Sheila Birling and Gerald Croft', 'Mrs Birling\'s birthday', 'Eric Birling\'s graduation'],
    answer: 'The engagement of Sheila Birling and Gerald Croft',
    explanation: 'The play opens during a dinner party celebrating the engagement of Sheila Birling and Gerald Croft.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Inspector Goole arrives to investigate ______',
    options: ['A robbery at the Birling factory', 'The suicide of a young woman named Eva Smith/Daisy Renton', 'A murder in the neighbourhood', 'Eric Birling\'s criminal activities'],
    answer: 'The suicide of a young woman named Eva Smith/Daisy Renton',
    explanation: 'Inspector Goole investigates the suicide of Eva Smith, linking each member of the Birling family to her suffering.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'What was Mr Birling\'s connection to Eva Smith?',
    options: ['She was his illegitimate daughter', 'He sacked her from his factory after she asked for higher wages', 'He had an affair with her', 'He refused her a loan'],
    answer: 'He sacked her from his factory after she asked for higher wages',
    explanation: 'Mr Birling dismissed Eva Smith when she was a leader among workers asking for a pay rise, setting her on the path to ruin.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Sheila Birling\'s connection to Eva Smith is that she ______',
    options: ['Employed her as a maid', 'Had her dismissed from Milwards department store out of jealousy', 'Introduced her to Gerald', 'Offered her money and then withdrew it'],
    answer: 'Had her dismissed from Milwards department store out of jealousy',
    explanation: 'Sheila used her family influence to have Eva sacked from her job at Milwards because she felt Eva looked better in a dress than she did.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Gerald Croft\'s connection to Eva Smith (Daisy Renton) was that he ______',
    options: ['Was her employer', 'Had an affair with her and then ended the relationship', 'Refused her a charity grant', 'Reported her to the police'],
    answer: 'Had an affair with her and then ended the relationship',
    explanation: 'Gerald kept Daisy Renton as his mistress, then ended the relationship. Though he was kind to her, abandoning her contributed to her downfall.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Mrs Birling\'s connection to Eva Smith was that she ______',
    options: ['Sacked her from the factory', 'Refused her appeal for help from the Brumley Women\'s Charity Organisation', 'Blackmailed her', 'Fired her from Milwards'],
    answer: 'Refused her appeal for help from the Brumley Women\'s Charity Organisation',
    explanation: 'Mrs Birling used her influence as chairwoman to turn down Eva\'s desperate appeal for help when she was pregnant and destitute.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Eric Birling\'s connection to Eva Smith was that he ______',
    options: ['Reported her to the police', 'Got her pregnant and stole money from his father\'s business to support her', 'Was her landlord', 'Had her fired from her job'],
    answer: 'Got her pregnant and stole money from his father\'s business to support her',
    explanation: 'Eric had a relationship with Eva, got her pregnant, and stole money from Birling and Company to support her.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'A key theme of "An Inspector Calls" is ______',
    options: ['The beauty of the English countryside', 'Social responsibility — the duty of the rich towards the poor', 'The importance of marriage in society', 'The power of religion'],
    answer: 'Social responsibility — the duty of the rich towards the poor',
    explanation: 'Priestley uses the play to argue that wealthy individuals and society as a whole have a moral responsibility to the less fortunate.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Inspector Goole\'s name is significant because it ______',
    options: ['Is the name of a real Scottish inspector', 'Sounds like "ghoul" suggesting he may be a supernatural or symbolic figure', 'Is an anagram of "eagle"', 'Is a common English name in 1912'],
    answer: 'Sounds like "ghoul" suggesting he may be a supernatural or symbolic figure',
    explanation: 'Goole sounds like "ghoul" — a ghost or spirit — suggesting he may not be a real inspector but a symbolic or supernatural figure of conscience.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'The generational divide in the play is shown through ______',
    options: ['Mr and Mrs Birling refusing to accept moral responsibility versus Sheila and Eric who do', 'The Inspector\'s age versus the Birlings\' youth', 'Gerald\'s views versus Eric\'s views', 'The working class versus the upper class'],
    answer: 'Mr and Mrs Birling refusing to accept moral responsibility versus Sheila and Eric who do',
    explanation: 'The older Birlings try to escape blame, while the younger generation — Sheila and Eric — feel genuine guilt and accept responsibility.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'At the end of the play, Mr and Mrs Birling react to the revelation that the Inspector may have been fake by ______',
    options: ['Feeling deep shame and guilt', 'Immediately trying to return to their old attitudes and dismissing their guilt', 'Vowing to change their ways', 'Donating money to charity'],
    answer: 'Immediately trying to return to their old attitudes and dismissing their guilt',
    explanation: 'When they discover the Inspector may not have been real, the elder Birlings are relieved and try to forget the evening\'s moral lessons.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Mr Birling\'s speech at the start of the play, dismissing the possibility of war and praising progress, is an example of ______',
    options: ['Dramatic irony', 'Foreshadowing', 'Allegory', 'Catharsis'],
    answer: 'Dramatic irony',
    explanation: 'The audience in 1945 knows that war did come and his predictions were wrong — his confident speech is deeply ironic.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'The structure of "An Inspector Calls" is ______',
    options: ['Five acts in the Shakespearean tradition', 'Three acts set in one room on one evening', 'An episodic structure with many settings', 'A two-act play with an interval'],
    answer: 'Three acts set in one room on one evening',
    explanation: 'The play follows the classical unities — it is set in one room, in one evening, making it an intense, tightly structured drama.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Priestley\'s political message in the play is that ______',
    options: ['Capitalism and class privilege should be celebrated', 'Society must be built on collective responsibility, not selfish individualism', 'The wealthy should be left to govern as they wish', 'The police are corrupt and untrustworthy'],
    answer: 'Society must be built on collective responsibility, not selfish individualism',
    explanation: 'Priestley, a socialist, uses the play to argue against selfish capitalism and for a society in which people take responsibility for one another.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'The play ends with ______',
    options: ['The Inspector being revealed as a fraud', 'A real police inspector calling to say a girl has died and an inquiry is needed', 'Eva Smith being found alive', 'The Birlings reconciling peacefully'],
    answer: 'A real police inspector calling to say a girl has died and an inquiry is needed',
    explanation: 'The play ends with a phone call announcing that a girl has died and a real inspector is coming to ask questions — a chilling final twist.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'Sheila Birling\'s character arc in the play shows ______',
    options: ['Regression from awareness back to denial', 'Growth from a carefree girl to a morally aware young woman', 'No change throughout', 'Increasing selfishness'],
    answer: 'Growth from a carefree girl to a morally aware young woman',
    explanation: 'Sheila begins as a carefree and somewhat spoilt young woman but genuinely changes as the Inspector reveals the consequences of her actions.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: 'The Inspector\'s final speech warns the Birlings and the audience that if people do not learn responsibility ______',
    options: ['They will lose their wealth', 'They will be "taught in fire and blood and anguish"', 'The police will prosecute them', 'Their children will rebel against them'],
    answer: 'They will be "taught in fire and blood and anguish"',
    explanation: 'The Inspector\'s warning refers to the wars and social upheaval that would come if society\'s leaders failed to care for the vulnerable.'
  },
  {
    topic: 'Non-African Drama — An Inspector Calls',
    questionText: '"An Inspector Calls" was written in ______',
    options: ['1912', '1930', '1945', '1960'],
    answer: '1945',
    explanation: 'Priestley wrote the play in 1945 at the end of World War II, setting it in 1912 to contrast pre-war complacency with the lessons learned.'
  },

  // ==========================================================
  // AFRICAN POETRY (35 questions — all 6 prescribed poems)
  // ==========================================================

  // Once Upon a Time — Gabriel Okara (7 questions)
  {
    topic: 'African Poetry',
    questionText: 'Who is the poet of "Once Upon a Time"?',
    options: ['Wole Soyinka', 'Niyi Osundare', 'Gabriel Okara', 'Syl Cheney-Coker'],
    answer: 'Gabriel Okara',
    explanation: 'Gabriel Okara (1921-2019) was a celebrated Nigerian poet. "Once Upon a Time" is one of his most famous poems.'
  },
  {
    topic: 'African Poetry',
    questionText: 'In "Once Upon a Time", the speaker addresses the poem to ______',
    options: ['His wife', 'A government official', 'His son', 'A friend in exile'],
    answer: 'His son',
    explanation: 'The speaker addresses his son throughout the poem, lamenting the loss of sincerity and asking the boy to teach him how to be genuine again.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The central theme of "Once Upon a Time" is ______',
    options: ['The beauty of African nature', 'The loss of sincerity and authenticity in modern African society due to Western influence', 'The joy of childhood', 'Political corruption in Nigeria'],
    answer: 'The loss of sincerity and authenticity in modern African society due to Western influence',
    explanation: 'The poem mourns how Africans have adopted false, surface-level behaviour modelled on Western society, losing their natural authenticity.'
  },
  {
    topic: 'African Poetry',
    questionText: 'In the poem, faces that "have no hearts" represent ______',
    options: ['Dead people', 'People who wear false smiles and behave insincerely', 'Children who are sad', 'Animals in the wild'],
    answer: 'People who wear false smiles and behave insincerely',
    explanation: 'Okara uses "faces" as a metaphor for the false, hollow social behaviour of people who smile without genuine feeling.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The line "So I have learned many things, son" suggests ______',
    options: ['The speaker is proud of his learning', 'The speaker has learned to be dishonest and superficial like those around him', 'The speaker has become a teacher', 'The speaker has travelled widely'],
    answer: 'The speaker has learned to be dishonest and superficial like those around him',
    explanation: 'The speaker sadly admits he has learned to adapt to the insincere behaviour of modern society — wearing different faces for different occasions.'
  },
  {
    topic: 'African Poetry',
    questionText: 'At the end of "Once Upon a Time", the speaker asks his son to ______',
    options: ['Come back home from school', 'Teach him how to laugh and be genuine again', 'Forgive him for his mistakes', 'Travel to another country'],
    answer: 'Teach him how to laugh and be genuine again',
    explanation: 'The poem ends with the father asking his son to show him how to laugh genuinely again — recognising the child as still natural and authentic.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The dominant figure of speech in "Once Upon a Time" is ______',
    options: ['Hyperbole', 'Allegory', 'Contrast and irony', 'Onomatopoeia'],
    answer: 'Contrast and irony',
    explanation: 'The poem works through contrast between the sincere past and the insincere present, with deep irony as the father must learn from his child.'
  },

  // Not My Business — Niyi Osundare (7 questions)
  {
    topic: 'African Poetry',
    questionText: 'Who wrote "Not My Business"?',
    options: ['Gabriel Okara', 'Wole Soyinka', 'Niyi Osundare', 'Syl Cheney-Coker'],
    answer: 'Niyi Osundare',
    explanation: 'Niyi Osundare is a renowned Nigerian poet. "Not My Business" is one of his most celebrated and widely studied poems.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The refrain "What business of mine is it / So long they don\'t take the yam / From my savouring mouth?" represents ______',
    options: ['Courage and bravery', 'Cowardice and dangerous political indifference', 'Joy and contentment', 'The beauty of traditional food'],
    answer: 'Cowardice and dangerous political indifference',
    explanation: 'The refrain captures the attitude of those who ignore the oppression of others as long as they are personally unaffected — a dangerous selfishness.'
  },
  {
    topic: 'African Poetry',
    questionText: 'In the poem, Akanni, Danladi, and Chinwe represent ______',
    options: ['The poet\'s personal friends', 'Ordinary citizens who are victims of political oppression', 'Government officials', 'Three different ethnic groups who are enemies'],
    answer: 'Ordinary citizens who are victims of political oppression',
    explanation: 'These three characters represent ordinary Nigerians from different ethnic groups who are arrested, beaten, or silenced by an authoritarian regime.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The central theme of "Not My Business" is ______',
    options: ['Celebrating Nigerian culture', 'The danger of political indifference and silence in the face of oppression', 'The importance of food security', 'Religious devotion'],
    answer: 'The danger of political indifference and silence in the face of oppression',
    explanation: 'The poem warns that choosing to ignore injustice does not protect you — eventually oppression will reach you too.'
  },
  {
    topic: 'African Poetry',
    questionText: 'At the end of the poem, what happens to the speaker who said it was "not his business"?',
    options: ['He is rewarded by the government', 'A jeep comes and takes him away', 'He saves his friends', 'He escapes to another country'],
    answer: 'A jeep comes and takes him away',
    explanation: 'The poem ends with the oppressive jeep arriving at the speaker\'s own door — showing that indifference does not protect you from tyranny.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The "yam" in the poem is a symbol of ______',
    options: ['Traditional African cuisine', 'Personal comfort, self-interest, and material well-being', 'Political power', 'Agricultural prosperity'],
    answer: 'Personal comfort, self-interest, and material well-being',
    explanation: 'The yam represents the speaker\'s personal comfort and self-interest — what he clings to while others suffer.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The structure of "Not My Business" features a recurring refrain which creates a sense of ______',
    options: ['Celebration and joy', 'Mounting tension and inevitability as oppression spreads', 'Confusion and disorientation', 'Peace and resolution'],
    answer: 'Mounting tension and inevitability as oppression spreads',
    explanation: 'The repeated refrain creates irony — each time it appears the danger grows closer, building tension until oppression finally reaches the speaker.'
  },

  // Night — Wole Soyinka (6 questions)
  {
    topic: 'African Poetry',
    questionText: 'Who wrote the poem "Night"?',
    options: ['Gabriel Okara', 'Niyi Osundare', 'Syl Cheney-Coker', 'Wole Soyinka'],
    answer: 'Wole Soyinka',
    explanation: 'Wole Soyinka is Nigeria\'s most celebrated playwright and poet, and the first African to win the Nobel Prize for Literature (1986).'
  },
  {
    topic: 'African Poetry',
    questionText: 'In "Night", night is portrayed as ______',
    options: ['Peaceful and restful', 'A heavy, oppressive, and almost predatory force', 'Beautiful and romantic', 'A time of celebration'],
    answer: 'A heavy, oppressive, and almost predatory force',
    explanation: 'Soyinka personifies night as a dark, heavy, almost violent presence — "Your hand is heavy, Night, upon my brow."'
  },
  {
    topic: 'African Poetry',
    questionText: 'The dominant figure of speech in "Night" is ______',
    options: ['Simile', 'Hyperbole', 'Personification', 'Onomatopoeia'],
    answer: 'Personification',
    explanation: 'Night is given human qualities — a heavy hand, a plough — making personification the central device of the poem.'
  },
  {
    topic: 'African Poetry',
    questionText: '"Night" by Soyinka can be interpreted as a poem about ______',
    options: ['A literal description of nighttime', 'Political oppression and suffering that weighs heavily on individuals', 'A love poem to a woman named Night', 'The science of astronomy'],
    answer: 'Political oppression and suffering that weighs heavily on individuals',
    explanation: 'On a deeper level, "Night" can be read as a metaphor for political oppression — the heavy, crushing weight of tyranny on the human spirit.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The line "Exacerbation from your subtle plough" in "Night" suggests ______',
    options: ['Farming at night', 'The way night gradually intensifies suffering', 'A complaint about agricultural work', 'A reference to slavery'],
    answer: 'The way night gradually intensifies suffering',
    explanation: 'The "subtle plough" suggests night works slowly and deeply, turning up pain the way a plough turns the soil — a quiet but thorough oppression.'
  },
  {
    topic: 'African Poetry',
    questionText: 'Wole Soyinka won the Nobel Prize for Literature in ______',
    options: ['1976', '1981', '1986', '1991'],
    answer: '1986',
    explanation: 'Wole Soyinka became the first African writer to receive the Nobel Prize for Literature in 1986.'
  },

  // New Tongue — Elizabeth L.A. Kamara (5 questions)
  {
    topic: 'African Poetry',
    questionText: 'Who wrote "New Tongue"?',
    options: ['Niyi Osundare', 'Gabriel Okara', 'Elizabeth L.A. Kamara', 'S.O.H. Afriyie-Vidza'],
    answer: 'Elizabeth L.A. Kamara',
    explanation: 'Elizabeth L.A. Kamara is a Sierra Leonean poet whose work "New Tongue" is among the 2026-2030 WAEC prescribed poems.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The central concern of "New Tongue" is ______',
    options: ['Learning a foreign language', 'The tension between adopting a new language/identity and preserving cultural roots', 'Teaching children to speak', 'The power of political speeches'],
    answer: 'The tension between adopting a new language/identity and preserving cultural roots',
    explanation: '"New Tongue" explores the experience of adopting a new language — often English — and what is gained and lost in that cultural transition.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The "new tongue" in the poem refers most significantly to ______',
    options: ['A literal new language such as English', 'The adoption of Western cultural identity and values alongside or instead of African ones', 'Learning to sing', 'Medical surgery on the tongue'],
    answer: 'The adoption of Western cultural identity and values alongside or instead of African ones',
    explanation: 'The poem uses language as a metaphor for cultural identity — acquiring a "new tongue" means acquiring a new cultural perspective.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The nationality of Elizabeth L.A. Kamara is ______',
    options: ['Nigerian', 'Ghanaian', 'Sierra Leonean', 'Liberian'],
    answer: 'Sierra Leonean',
    explanation: 'Elizabeth L.A. Kamara is a Sierra Leonean poet whose work reflects African experiences of language and cultural identity.'
  },
  {
    topic: 'African Poetry',
    questionText: 'A key theme shared between "New Tongue" (Kamara) and "Once Upon a Time" (Okara) is ______',
    options: ['Political protest', 'The impact of Western influence on African identity and authenticity', 'Romantic love', 'Environmental destruction'],
    answer: 'The impact of Western influence on African identity and authenticity',
    explanation: 'Both poems explore how Western culture affects African identity — Okara through loss of sincerity, Kamara through language and cultural adoption.'
  },

  // The Breast of the Sea — Syl Cheney-Coker (5 questions)
  {
    topic: 'African Poetry',
    questionText: 'Who wrote "The Breast of the Sea"?',
    options: ['Niyi Osundare', 'Gabriel Okara', 'Wole Soyinka', 'Syl Cheney-Coker'],
    answer: 'Syl Cheney-Coker',
    explanation: 'Syl Cheney-Coker is a Sierra Leonean poet and novelist. "The Breast of the Sea" is among his celebrated poems.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The sea in "The Breast of the Sea" is primarily a symbol of ______',
    options: ['Danger and drowning', 'The African cultural and historical experience, including the slave trade', 'Romantic love', 'Environmental destruction'],
    answer: 'The African cultural and historical experience, including the slave trade',
    explanation: 'Cheney-Coker uses the sea to represent the historical experiences of Africans — including the trauma of the transatlantic slave trade.'
  },
  {
    topic: 'African Poetry',
    questionText: 'A major theme of "The Breast of the Sea" is ______',
    options: ['Agricultural prosperity', 'The historical trauma of colonialism and the slave trade and their impact on African identity', 'Joy and celebration', 'Urban life in Sierra Leone'],
    answer: 'The historical trauma of colonialism and the slave trade and their impact on African identity',
    explanation: 'The poem engages deeply with the weight of historical suffering — particularly the slave trade — on the African psyche and identity.'
  },
  {
    topic: 'African Poetry',
    questionText: 'Syl Cheney-Coker\'s nationality is ______',
    options: ['Ghanaian', 'Nigerian', 'Sierra Leonean', 'Senegalese'],
    answer: 'Sierra Leonean',
    explanation: 'Syl Cheney-Coker was born in Freetown, Sierra Leone, and is one of the country\'s most important literary voices.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The imagery of the sea in African poetry generally represents ______',
    options: ['Wealth and trade only', 'A complex symbol of history, memory, separation, and the passage between worlds', 'Holiday and leisure', 'The power of European nations'],
    answer: 'A complex symbol of history, memory, separation, and the passage between worlds',
    explanation: 'In African poetry, the sea often carries the weight of the slave trade, colonial contact, and the separation of African peoples from their roots.'
  },

  // Hearty Garlands — S.O.H. Afriyie-Vidza (5 questions)
  {
    topic: 'African Poetry',
    questionText: 'Who wrote "Hearty Garlands"?',
    options: ['Gabriel Okara', 'Niyi Osundare', 'S.O.H. Afriyie-Vidza', 'Wole Soyinka'],
    answer: 'S.O.H. Afriyie-Vidza',
    explanation: 'S.O.H. Afriyie-Vidza is one of the African poets whose work "Hearty Garlands" is prescribed for the 2026-2030 WAEC Literature syllabus.'
  },
  {
    topic: 'African Poetry',
    questionText: '"Hearty Garlands" explores the theme of ______',
    options: ['War and destruction', 'Celebration, praise, and the joy of human connection and goodwill', 'Political protest', 'Environmental pollution'],
    answer: 'Celebration, praise, and the joy of human connection and goodwill',
    explanation: '"Hearty Garlands" is a poem of celebration and praise, celebrating genuine human warmth, goodwill, and fellowship.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The title "Hearty Garlands" uses garlands as a symbol of ______',
    options: ['Death and mourning', 'Celebration, honour, and goodwill', 'Political power', 'Religious ritual'],
    answer: 'Celebration, honour, and goodwill',
    explanation: 'Garlands are traditionally given to celebrate and honour — in the poem they symbolise genuine human warmth and recognition.'
  },
  {
    topic: 'African Poetry',
    questionText: 'A contrast that runs through "Hearty Garlands" is between ______',
    options: ['Night and day', 'Genuine, warm human feeling versus cold, envious attitudes', 'Old age and youth', 'Africa and Europe'],
    answer: 'Genuine, warm human feeling versus cold, envious attitudes',
    explanation: 'The poem contrasts genuine celebration and goodwill with the green-eyed envy that can poison human relationships.'
  },
  {
    topic: 'African Poetry',
    questionText: 'The line referring to "horrid green-eyed Envy" in "Hearty Garlands" uses which figure of speech?',
    options: ['Simile', 'Personification and allusion', 'Onomatopoeia', 'Hyperbole'],
    answer: 'Personification and allusion',
    explanation: 'Envy is personified and the "green-eyed" is an allusion to Shakespeare\'s Othello where jealousy is called "the green-eyed monster".'
  },

];

// ============================================================
// MAIN SEED FUNCTION
// ============================================================
async function seedLiterature2026() {
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
        description: 'WAEC/NECO 2026-2030 prescribed texts — Senior Secondary'
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
    console.log('Seed completed!');
    console.log(`Added : ${added} questions`);
    console.log(`Skipped: ${skipped} (already exist)`);
    console.log('');
    console.log('Breakdown by prescribed text:');
    console.log('  Shakespeare — Antony and Cleopatra       : 30');
    console.log('  African Prose — So the Path Does Not Die : 25');
    console.log('  Non-African Prose — To Kill a Mockingbird: 20');
    console.log('  African Drama — The Marriage of Anansewa : 20');
    console.log('  Non-African Drama — An Inspector Calls   : 20');
    console.log('  African Poetry (all 6 poems)             : 35');
    console.log('  TOTAL                                    : 150');
    console.log('================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedLiterature2026();
