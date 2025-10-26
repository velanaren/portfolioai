# PortfolioAI - Technical Documentation

![PortfolioAI Logo](../frontend/public/logo.png)

## Table of Contents
1. [System Overview](#1-system-overview)
2. [Architecture Components](#2-architecture-components)
3. [Data Flow](#3-data-flow)
4. [Key Features](#4-key-features)
5. [Technical Implementation](#5-technical-implementation)
6. [Security Considerations](#6-security-considerations)
7. [Performance Optimizations](#7-performance-optimizations)

## 1. System Overview

PortfolioAI is a full-stack application that helps users create professional portfolios and cover letters using AI. The system consists of two main components:

### Frontend (React + Vite)
- Modern SPA architecture using React 18
- Tailwind CSS for styling
- Vite for fast development and building

### Backend (FastAPI)
- Python-based REST API
- AI integration with Groq
- File processing and parsing capabilities

## 2. Architecture Components

### 2.1 Frontend Architecture

#### Route Structure
```
/ - Landing page
/upload - Resume upload & parsing
/templates - Template selection
/editor - Portfolio editor
/cover-letter - Cover letter generator
```

#### Key Components

##### Pages
- **Landing.jsx**
  - Entry point
  - User onboarding
  - Feature showcase

- **upload.jsx**
  - File upload interface
  - Drag & drop support
  - Format validation
  - Initial parsing

- **TemplateSelection.jsx**
  - Template preview
  - Interactive selection
  - Data preview

- **Editor.jsx**
  - Main portfolio editor
  - Section management
  - AI integration
  - Live preview

- **CoverLetter.jsx**
  - Job description input
  - AI-powered generation
  - Export functionality

##### Templates
- **MinimalTemplate.jsx**
  - Clean, professional design
  - Focus on content
  - Optimized readability

- **ModernTemplate.jsx**
  - Contemporary design
  - Gradient elements
  - Enhanced visual hierarchy

##### Utilities
- **api.js**
  - Backend API integration
  - Request handling
  - Error management

- **export.js**
  - HTML generation
  - PDF conversion
  - Asset bundling

### 2.2 Backend Architecture

#### Component Structure
```
backend/
├── app/
│   ├── api/
│   │   └── routes.py - API endpoints
│   ├── models/
│   │   └── schemas.py - Data models
│   ├── services/
│   │   ├── ai_service.py - AI integration
│   │   └── parser.py - Resume parsing
│   └── main.py - Application entry
```

#### Key Services

##### Resume Parser
- PDF/DOCX processing
- Data extraction
- Structure normalization
- Error handling

##### AI Service
- Bio generation
- Cover letter creation
- Experience enhancement
- Content optimization

##### API Routes
- File management
- AI integration
- Data processing
- Error handling

## 3. Data Flow

### 3.1 Resume Upload Flow
1. User uploads file → Frontend validation
2. File sent to backend → Format validation
3. Parser extracts data → Structured JSON
4. Data returned to frontend → Preview display

### 3.2 Portfolio Generation Flow
1. Template selection
2. Data editing in Editor
3. AI-powered bio generation
4. Export as standalone HTML

### 3.3 Cover Letter Generation Flow
1. Portfolio data + Job description input
2. AI generates personalized content
3. Preview and editing
4. Export functionality

## 4. Key Features

### 4.1 Resume Parsing
- **Supported Formats**
  - PDF documents
  - DOCX files
  - Text extraction
  - Structure preservation

- **Data Extraction**
  - Personal information
  - Professional skills
  - Work experience
  - Project history
  - Educational background

### 4.2 AI Integration
- **Bio Generation**
  - Professional tone
  - Customized content
  - Industry-specific
  - Keyword optimization

- **Cover Letter**
  - Job-specific customization
  - Skills highlighting
  - Professional formatting
  - Dynamic content

### 4.3 Templates
- **Minimal Design**
  - Clean layout
  - Professional typography
  - Optimal readability
  - Print-friendly

- **Modern Design**
  - Contemporary aesthetics
  - Color gradients
  - Dynamic elements
  - Visual hierarchy

### 4.4 Export Options
- **HTML Export**
  - Standalone files
  - Preserved styling
  - Responsive design
  - Cross-browser support

## 5. Technical Implementation

### 5.1 Frontend Technologies
- React 18
  - Hooks
  - Context API
  - Custom components
  - State management

- Styling
  - Tailwind CSS
  - Custom utilities
  - Responsive design
  - Print styles

### 5.2 Backend Technologies
- FastAPI
  - REST endpoints
  - Async support
  - Type validation
  - Error handling

- Python Services
  - File processing
  - AI integration
  - Data validation
  - Error management

## 6. Security Considerations

### File Processing
- Size limits (5MB)
- Type validation
- Secure storage
- Cleanup routines

### API Security
- CORS configuration
- Rate limiting
- Input validation
- Error handling

### Data Protection
- Temporary storage
- Secure transmission
- Access control
- Privacy compliance

## 7. Performance Optimizations

### Frontend
- Component lazy loading
- Image optimization
- Bundle size management
- Caching strategies

### Backend
- Async processing
- Resource management
- Response optimization
- Error handling

### AI Integration
- Response caching
- Batch processing
- Fallback handling
- Rate management

---

*Generated for PortfolioAI Project Documentation*
*Last Updated: October 26, 2025*
