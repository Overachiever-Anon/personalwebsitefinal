-- Create table for resume personal information
CREATE TABLE IF NOT EXISTS resume_personal_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  website TEXT,
  linkedin TEXT,
  github TEXT,
  summary TEXT NOT NULL,
  profile_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security policy for resume_personal_info table
ALTER TABLE resume_personal_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can modify resume_personal_info" 
  ON resume_personal_info FOR ALL USING (auth.role() = 'authenticated');

-- Create table for resume experience (work history)
CREATE TABLE IF NOT EXISTS resume_experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  highlights TEXT[],
  order_num INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security policy for resume_experience table
ALTER TABLE resume_experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can modify resume_experience" 
  ON resume_experience FOR ALL USING (auth.role() = 'authenticated');

-- Create table for resume education
CREATE TABLE IF NOT EXISTS resume_education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT,
  gpa TEXT,
  honors TEXT,
  description TEXT,
  order_num INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security policy for resume_education table
ALTER TABLE resume_education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can modify resume_education" 
  ON resume_education FOR ALL USING (auth.role() = 'authenticated');

-- Create table for resume skills (categories and skills)
CREATE TABLE IF NOT EXISTS resume_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  order_num INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security policy for resume_skills table
ALTER TABLE resume_skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can modify resume_skills" 
  ON resume_skills FOR ALL USING (auth.role() = 'authenticated');

-- Create table for resume projects
CREATE TABLE IF NOT EXISTS resume_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  url TEXT,
  github_url TEXT,
  image_url TEXT,
  start_date DATE,
  end_date DATE,
  order_num INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security policy for resume_projects table
ALTER TABLE resume_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can modify resume_projects" 
  ON resume_projects FOR ALL USING (auth.role() = 'authenticated');

-- Create table for resume certifications
CREATE TABLE IF NOT EXISTS resume_certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date DATE NOT NULL,
  url TEXT,
  expires DATE,
  description TEXT,
  order_num INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create security policy for resume_certifications table
ALTER TABLE resume_certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Only authenticated users can modify resume_certifications" 
  ON resume_certifications FOR ALL USING (auth.role() = 'authenticated');
