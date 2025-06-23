# Personal Website Testing Guide

## Overview
This document contains comprehensive tests for your personal website's admin functionality. These tests will help verify that all features work correctly after recent refactoring and bug fixes.

## What is Testing?
Testing is the process of checking if your software works as expected. You'll manually interact with your website to see if each feature behaves correctly. This is called "manual testing" - as opposed to automated testing where code tests other code.

## Prerequisites
- Your development server must be running (`npm run dev`)
- Website should be accessible at http://localhost:3001
- You should have admin/login credentials set up

## How to Document Test Results
For each test, record:
- ✅ **PASS**: Feature works as expected
- ❌ **FAIL**: Feature doesn't work or behaves incorrectly
- ⚠️ **ISSUE**: Feature works but has minor problems

---

## TEST SUITE 1: Basic Navigation & Authentication

### Test 1.1: Homepage Load
**What this tests**: Basic website functionality and CSS loading
**Steps**:
1. Open browser to http://localhost:3001
2. Wait for page to fully load
3. Check that page displays correctly with styling

**Expected Result**: Homepage loads with proper styling, navigation, and content
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Any observations or errors]

---

### Test 1.2: Login Functionality
**What this tests**: Authentication system
**Steps**:
1. Navigate to /login
2. Enter your admin credentials
3. Click "Login" button
4. Check if redirected to admin area

**Expected Result**: Successful login redirects to admin dashboard
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Any errors or unexpected behavior]

---

### Test 1.3: Admin Dashboard Access
**What this tests**: Protected route functionality
**Steps**:
1. After logging in, go to /admin
2. Check that dashboard loads with all content tiles
3. Verify you see tiles for: Blog, Projects, Code, Research, Gameplay

**Expected Result**: Dashboard displays with 5 content section tiles
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Missing tiles or layout issues]

---

## TEST SUITE 2: Blog Post Functionality

### Test 2.1: New Post Page Load
**What this tests**: Blog post creation page and Markdown editor
**Steps**:
1. Go to /admin/new-post
2. Wait for page to load completely
3. Check that Markdown editor appears
4. Verify all form fields are present

**Expected Result**: Page loads with Markdown editor, title field, and other blog post fields
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Any missing elements or errors]

---

### Test 2.2: Create New Blog Post
**What this tests**: Server action functionality for blog posts
**Steps**:
1. On /admin/new-post page
2. Fill in:
   - Title: "Test Blog Post"
   - Slug: "test-blog-post"
   - Content: "# This is a test\n\nThis is test content."
3. Click "Create Post" button
4. Check if redirected back to admin dashboard

**Expected Result**: Post is created and you're redirected to /admin
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Any errors during creation or redirect]

---

### Test 2.3: Verify Blog Post Creation
**What this tests**: Database integration and blog display
**Steps**:
1. Go to /blog
2. Look for your test post "Test Blog Post"
3. Click on the post to view it
4. Verify content displays correctly

**Expected Result**: Test post appears in blog list and individual post page works
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Post visibility and content accuracy]

---

## TEST SUITE 3: Projects Functionality

### Test 3.1: New Project Page Load
**What this tests**: Project creation page functionality
**Steps**:
1. Go to /admin/new-project
2. Check that all form fields load
3. Verify ImageUpload component appears
4. Test any interactive elements

**Expected Result**: Form loads with all fields including image upload
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Missing fields or component issues]

---

### Test 3.2: Create New Project
**What this tests**: Project server action and database integration
**Steps**:
1. Fill in project form:
   - Title: "Test Project"
   - Slug: "test-project"
   - Description: "This is a test project"
   - Tags: "test, demo"
2. Click "Create Project" button
3. Check redirect to admin dashboard

**Expected Result**: Project created successfully, redirected to /admin
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Creation success and redirect behavior]

---

### Test 3.3: Verify Project Display
**What this tests**: Projects page and individual project pages
**Steps**:
1. Go to /projects
2. Find your "Test Project"
3. Click to view individual project page
4. Verify all information displays correctly

**Expected Result**: Project appears in list and individual page shows all details
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Display accuracy and navigation]

---

## TEST SUITE 4: Code Items Functionality

### Test 4.1: New Code Item Page
**What this tests**: Code creation page functionality
**Steps**:
1. Navigate to /admin/new-code
2. Check form loads with all fields
3. Verify code snippet text area is present
4. Test any special code-related fields

**Expected Result**: Code creation form loads with all appropriate fields
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Form completeness and functionality]

---

### Test 4.2: Create New Code Item
**What this tests**: Code item server action
**Steps**:
1. Fill in code form:
   - Title: "Test Code"
   - Slug: "test-code"
   - Description: "Test code item"
   - Language: "JavaScript"
   - Code Snippet: "console.log('Hello World');"
2. Submit form
3. Check redirect

**Expected Result**: Code item created, redirected to admin
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Creation and redirect behavior]

---

### Test 4.3: Verify Code Item Display
**What this tests**: Code section display functionality
**Steps**:
1. Go to /code
2. Find your test code item
3. View individual code page
4. Check code syntax highlighting

**Expected Result**: Code item visible with proper formatting and highlighting
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Display quality and syntax highlighting]

---

## TEST SUITE 5: Research Notes Functionality

### Test 5.1: New Research Page Load
**What this tests**: Research creation page (recently refactored)
**Steps**:
1. Go to /admin/new-research
2. Verify form loads completely
3. Check all research-specific fields
4. Test any special functionality

**Expected Result**: Research form loads with all fields functional
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Any missing elements or errors]

---

### Test 5.2: Create Research Note
**What this tests**: Research server action (recently moved to centralized location)
**Steps**:
1. Fill research form:
   - Title: "Test Research"
   - Slug: "test-research"
   - Description: "Test research note"
   - Content: "This is test research content"
2. Submit form
3. Verify redirect

**Expected Result**: Research note created, redirected to admin
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Important: This tests the refactored server action]

---

### Test 5.3: Verify Research Display
**What this tests**: Research section functionality
**Steps**:
1. Navigate to /research
2. Locate test research note
3. View individual research page
4. Check content formatting

**Expected Result**: Research note displays correctly with proper formatting
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Display accuracy and formatting]

---

## TEST SUITE 6: Gameplay Items Functionality

### Test 6.1: New Gameplay Page
**What this tests**: Gameplay creation functionality
**Steps**:
1. Go to /admin/new-gameplay
2. Check gameplay-specific fields load
3. Verify video URL and platform fields
4. Test thumbnail upload

**Expected Result**: Gameplay form loads with video and gaming-related fields
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Gaming-specific field functionality]

---

### Test 6.2: Create Gameplay Item
**What this tests**: Gameplay server action
**Steps**:
1. Fill gameplay form:
   - Title: "Test Gameplay"
   - Slug: "test-gameplay"
   - Game Name: "Test Game"
   - Platform: "PC"
   - Video URL: "https://example.com/video"
2. Submit form

**Expected Result**: Gameplay item created successfully
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Creation success]

---

### Test 6.3: Verify Gameplay Display
**What this tests**: Gameplay section display
**Steps**:
1. Go to /gameplay
2. Find test gameplay item
3. View individual gameplay page
4. Check video embedding (if applicable)

**Expected Result**: Gameplay item displays with proper video/media handling
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Media display and functionality]

---

## TEST SUITE 7: Image Upload Functionality

### Test 7.1: Image Upload Component
**What this tests**: Centralized image upload functionality
**Steps**:
1. Go to any admin "new item" page with image upload
2. Click "Choose File" or upload area
3. Select a small test image (JPG or PNG)
4. Verify upload progress and completion
5. Check if image URL is generated

**Expected Result**: Image uploads successfully and generates a URL
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Upload speed, error handling, URL generation]

---

### Test 7.2: Image Display
**What this tests**: Uploaded image accessibility
**Steps**:
1. After uploading an image in previous test
2. Copy the generated image URL
3. Open URL in new browser tab
4. Verify image displays correctly

**Expected Result**: Image accessible via generated URL
**Actual Result**: [Record what you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Image accessibility and quality]

---

## TEST SUITE 8: Error Handling & Edge Cases

### Test 8.1: Invalid Form Submission
**What this tests**: Form validation and error handling
**Steps**:
1. Go to any admin "new item" page
2. Leave required fields empty
3. Try to submit form
4. Check for error messages

**Expected Result**: Form prevents submission and shows helpful error messages
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Error message quality and user guidance]

---

### Test 8.2: Duplicate Slug Test
**What this tests**: Unique constraint handling
**Steps**:
1. Try to create an item with the same slug as existing item
2. Submit form
3. Check for appropriate error handling

**Expected Result**: System prevents duplicate slugs with clear error message
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Database constraint handling]

---

### Test 8.3: Large Content Test
**What this tests**: System handling of large content
**Steps**:
1. Create a post/item with very long content (several paragraphs)
2. Submit form
3. Verify creation and display

**Expected Result**: System handles large content without issues
**Actual Result**: [Record what happens]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Performance and display with large content]

---

## TEST SUITE 9: Browser Console Check

### Test 9.1: Console Error Check
**What this tests**: JavaScript errors and warnings
**Steps**:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Navigate through admin pages
4. Look for red error messages
5. Note any warnings (yellow messages)

**Expected Result**: No critical JavaScript errors in console
**Actual Result**: [List any errors or warnings you see]
**Status**: [ ] PASS [ ] FAIL [ ] ISSUE
**Notes**: [Important: Red errors are critical, yellow warnings are less serious]

---

## CRITICAL ISSUES TO WATCH FOR

1. **"Module not found" errors**: These indicate import path problems
2. **"Cannot read property" errors**: These suggest undefined variables
3. **Authentication failures**: Login not working or admin access denied
4. **Database connection issues**: Forms submit but data not saved
5. **Image upload failures**: Files not uploading to Supabase storage
6. **Routing problems**: Pages not loading or incorrect redirects

---

## TESTING TIPS FOR BEGINNERS

1. **Take your time**: Don't rush through tests
2. **Test one thing at a time**: Complete each test before moving to the next
3. **Record everything**: Even if something works, note it down
4. **Clear cache if needed**: If something seems broken, try refreshing the page
5. **Check browser console**: Many errors show up there first
6. **Test in multiple browsers**: Try Chrome, Safari, Firefox if possible

---

## EMERGENCY STOPS

Stop testing and report immediately if you see:
- Website completely crashes or won't load
- Login system completely broken
- Multiple "Module not found" errors
- Database errors preventing any data creation
- Any error mentioning "Server Error" or "500"

---

## TEST COMPLETION SUMMARY

**Total Tests**: 23
**Tests Passed**: [ ]
**Tests Failed**: [ ]
**Tests with Issues**: [ ]

**Most Critical Issues Found**:
1. [List most important problems]
2. [Second most important]
3. [Third most important]

**Overall System Status**: [Working Well / Has Minor Issues / Has Major Issues / Broken]

**Recommended Next Steps**: [What should be fixed first]

---

## HOW TO REPORT ISSUES

When reporting a problem, include:
1. **Test number and name**
2. **Exact steps you took**
3. **What you expected to happen**
4. **What actually happened**
5. **Any error messages** (copy exactly)
6. **Screenshots** (if helpful)
7. **Browser and operating system**

Example:
```
Test 2.2: Create New Blog Post - FAILED

Steps: Filled out blog post form and clicked "Create Post"
Expected: Redirect to admin dashboard
Actual: Page showed error "Server action failed"
Error Message: "Cannot resolve module '@/lib/actions/blog'"
Browser: Chrome on macOS
Screenshot: [attach if available]
```

---

*This testing guide ensures comprehensive verification of all admin functionality after the recent server action refactoring and CSS import fixes.*
