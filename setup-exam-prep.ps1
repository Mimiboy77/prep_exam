# ============================================
# Exam Prep App - Folder & File Setup Script
# Run this in PowerShell from where you want
# the project folder to be created
# ============================================

# --- Step 1: Define the root project folder ---
$root = "exam-prep-app"

# --- Step 2: List every folder that needs to exist ---
$folders = @(
    "$root/controllers",
    "$root/models",
    "$root/routes",
    "$root/middleware",
    "$root/utils",
    "$root/config",
    "$root/public/css",
    "$root/public/js",
    "$root/public/images",
    "$root/views/layouts",
    "$root/views/auth",
    "$root/views/admin/teachers",
    "$root/views/admin/subjects",
    "$root/views/admin/syllabus",
    "$root/views/admin/exams",
    "$root/views/admin/schools",
    "$root/views/admin/students",
    "$root/views/teacher/questions",
    "$root/views/student/exam",
    "$root/views/student/results"
)

# --- Step 3: List every file that needs to exist ---
$files = @(

    # Root files
    "$root/app.js",
    "$root/package.json",
    "$root/.env",

    # Config
    "$root/config/db.js",

    # Utils
    "$root/utils/helpers.js",

    # Middleware
    "$root/middleware/authMiddleware.js",
    "$root/middleware/roleMiddleware.js",

    # Models
    "$root/models/User.js",
    "$root/models/Subject.js",
    "$root/models/Syllabus.js",
    "$root/models/Question.js",
    "$root/models/Exam.js",
    "$root/models/StudentExam.js",
    "$root/models/School.js",

    # Controllers
    "$root/controllers/authController.js",
    "$root/controllers/adminController.js",
    "$root/controllers/teacherController.js",
    "$root/controllers/studentController.js",
    "$root/controllers/examController.js",
    "$root/controllers/questionController.js",

    # Routes
    "$root/routes/authRoutes.js",
    "$root/routes/adminRoutes.js",
    "$root/routes/teacherRoutes.js",
    "$root/routes/studentRoutes.js",
    "$root/routes/examRoutes.js",

    # Views - layouts
    "$root/views/layouts/main.ejs",

    # Views - auth
    "$root/views/auth/login.ejs",
    "$root/views/auth/register.ejs",

    # Views - admin
    "$root/views/admin/dashboard.ejs",
    "$root/views/admin/teachers/index.ejs",
    "$root/views/admin/teachers/add.ejs",
    "$root/views/admin/teachers/assign.ejs",
    "$root/views/admin/subjects/index.ejs",
    "$root/views/admin/subjects/add.ejs",
    "$root/views/admin/subjects/edit.ejs",
    "$root/views/admin/syllabus/index.ejs",
    "$root/views/admin/syllabus/add.ejs",
    "$root/views/admin/syllabus/edit.ejs",
    "$root/views/admin/exams/index.ejs",
    "$root/views/admin/exams/create.ejs",
    "$root/views/admin/exams/settings.ejs",
    "$root/views/admin/schools/index.ejs",
    "$root/views/admin/schools/add.ejs",
    "$root/views/admin/students/index.ejs",
    "$root/views/admin/students/view.ejs",
    "$root/views/admin/students/filter.ejs",

    # Views - teacher
    "$root/views/teacher/dashboard.ejs",
    "$root/views/teacher/questions/index.ejs",
    "$root/views/teacher/questions/add.ejs",
    "$root/views/teacher/questions/edit.ejs",

    # Views - student
    "$root/views/student/dashboard.ejs",
    "$root/views/student/exam/index.ejs",
    "$root/views/student/exam/instruction.ejs",
    "$root/views/student/exam/take.ejs",
    "$root/views/student/exam/submit.ejs",
    "$root/views/student/results/index.ejs",
    "$root/views/student/results/view.ejs",
    "$root/views/student/results/progress.ejs"
)

# --- Step 4: Create all folders ---
foreach ($folder in $folders) {
    # -Force means: don't throw error if folder already exists
    New-Item -ItemType Directory -Path $folder -Force | Out-Null
    Write-Host "Created folder: $folder"
}

# --- Step 5: Create all empty files ---
foreach ($file in $files) {
    # -Force means: don't throw error if file already exists
    New-Item -ItemType File -Path $file -Force | Out-Null
    Write-Host "Created file:   $file"
}

# --- Step 6: Done ---
Write-Host ""
Write-Host "Setup complete! Open exam-prep-app in your code editor."
