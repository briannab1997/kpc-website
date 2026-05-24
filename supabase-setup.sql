-- ============================================================
-- KENTISH PUBLISHING COMPANY - SUPABASE DATABASE SETUP
-- Paste this entire script into the Supabase SQL Editor and run it.
-- ============================================================


-- ============================================================
-- 1. PROFILES
-- Mirrors auth.users. Auto-populated on sign-up via trigger.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  user_type TEXT DEFAULT 'author',
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-create profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, user_type, is_approved)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'author'),
    false
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Staff can view all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);
CREATE POLICY "Staff can update profiles" ON public.profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 2. MANUSCRIPTS
-- Created on submission. Managed via Staff Dashboard.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.manuscripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author_name TEXT,
  genre TEXT,
  synopsis TEXT,
  word_count INTEGER DEFAULT 0,
  file_url TEXT,
  status TEXT DEFAULT 'submitted',
  feedback TEXT,
  assigned_interns TEXT[] DEFAULT '{}',
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.manuscripts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authors can view own manuscripts" ON public.manuscripts FOR SELECT USING (created_by = auth.email());
CREATE POLICY "Staff can view all manuscripts" ON public.manuscripts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial', 'Intern_Design', 'Intern_Marketing'))
);
CREATE POLICY "Authors can insert manuscripts" ON public.manuscripts FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- ============================================================
-- 3. CONSULTATIONS
-- Submitted alongside manuscripts from the Submission form.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name TEXT,
  email TEXT,
  manuscript_title TEXT,
  genre TEXT,
  synopsis TEXT,
  additional_notes TEXT,
  word_count TEXT,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can insert consultations" ON public.consultations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Staff can view all consultations" ON public.consultations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 4. BLOG POSTS (News page)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read blog posts" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Staff can manage blog posts" ON public.blog_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 5. PUBLISHED BOOKS (Books page)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.published_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  genre TEXT,
  description TEXT,
  cover_image_url TEXT,
  purchase_url TEXT,
  published_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.published_books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read books" ON public.published_books FOR SELECT USING (true);
CREATE POLICY "Staff can manage books" ON public.published_books FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 6. EVENTS (Events and Book Signings pages)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ,
  location TEXT,
  event_type TEXT,
  image_url TEXT,
  registration_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Staff can manage events" ON public.events FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 7. FEATURED AUTHORS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.featured_authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  book_title TEXT,
  genre TEXT,
  status TEXT DEFAULT 'active',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.featured_authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read featured authors" ON public.featured_authors FOR SELECT USING (true);
CREATE POLICY "Staff can manage featured authors" ON public.featured_authors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 8. PAGE CONTENT
-- Key/value store used by FeaturedAuthors and similar pages.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT NOT NULL,
  content_key TEXT NOT NULL,
  content_value TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read page content" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Staff can manage page content" ON public.page_content FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 9. COLLABORATION PAGES
-- Powers EditableCollaborationPage (Veterans, Prisons, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.collaboration_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  content TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.collaboration_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read collaboration pages" ON public.collaboration_pages FOR SELECT USING (true);
CREATE POLICY "Staff can manage collaboration pages" ON public.collaboration_pages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 10. CONTENT BLOCKS
-- Powers GeniusMentorshipNetwork, NarrativeBloom, ContentManagement.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.content_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_name TEXT NOT NULL,
  block_type TEXT,
  content JSONB DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.content_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read content blocks" ON public.content_blocks FOR SELECT USING (true);
CREATE POLICY "Staff can manage content blocks" ON public.content_blocks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 11. MENTOR PROFILES
-- Used by GeniusMentorshipNetwork and NarrativeBloom.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.mentor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  specialty TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mentor_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read mentor profiles" ON public.mentor_profiles FOR SELECT USING (true);
CREATE POLICY "Staff can manage mentor profiles" ON public.mentor_profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 12. CONTACT SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert contact submissions" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view contact submissions" ON public.contact_submissions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 13. CRM - AUTHORS
-- Authors managed through the Staff CRM.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  book_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage CRM authors" ON public.authors FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial'))
);


-- ============================================================
-- 14. CRM - PHASES
-- Editorial workflow phases (e.g. Manuscript Review, Editing, etc.)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.crm_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_order INTEGER NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT 'blue'
);

ALTER TABLE public.crm_phases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage CRM phases" ON public.crm_phases FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial'))
);

-- Seed: default editorial phases
INSERT INTO public.crm_phases (phase_order, name, description, color) VALUES
  (1, 'Initial Review', 'First read and assessment of the submitted manuscript', 'blue'),
  (2, 'Editorial Assessment', 'Detailed editorial notes and feedback', 'yellow'),
  (3, 'Revision', 'Author revisions based on editorial feedback', 'orange'),
  (4, 'Copyediting', 'Line-level editing for grammar, style, and consistency', 'purple'),
  (5, 'Design & Layout', 'Cover design, interior layout, and formatting', 'pink'),
  (6, 'Proofreading', 'Final proofread before publication', 'green'),
  (7, 'Publication', 'Final approval and publication', 'red')
ON CONFLICT DO NOTHING;


-- ============================================================
-- 15. CRM - WORKFLOW TASKS
-- Tasks that belong to each phase.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.crm_workflow_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID REFERENCES public.crm_phases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT
);

ALTER TABLE public.crm_workflow_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage workflow tasks" ON public.crm_workflow_tasks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial'))
);

-- Seed: default tasks per phase
INSERT INTO public.crm_workflow_tasks (phase_id, title)
SELECT id, 'Read full manuscript' FROM public.crm_phases WHERE name = 'Initial Review'
UNION ALL
SELECT id, 'Complete intake form' FROM public.crm_phases WHERE name = 'Initial Review'
UNION ALL
SELECT id, 'Write editorial report' FROM public.crm_phases WHERE name = 'Editorial Assessment'
UNION ALL
SELECT id, 'Send feedback to author' FROM public.crm_phases WHERE name = 'Editorial Assessment'
UNION ALL
SELECT id, 'Receive revised manuscript' FROM public.crm_phases WHERE name = 'Revision'
UNION ALL
SELECT id, 'Review revisions' FROM public.crm_phases WHERE name = 'Revision'
UNION ALL
SELECT id, 'Complete copyedit pass' FROM public.crm_phases WHERE name = 'Copyediting'
UNION ALL
SELECT id, 'Return copyedits to author' FROM public.crm_phases WHERE name = 'Copyediting'
UNION ALL
SELECT id, 'Approve cover design' FROM public.crm_phases WHERE name = 'Design & Layout'
UNION ALL
SELECT id, 'Approve interior layout' FROM public.crm_phases WHERE name = 'Design & Layout'
UNION ALL
SELECT id, 'Complete final proofread' FROM public.crm_phases WHERE name = 'Proofreading'
UNION ALL
SELECT id, 'Sign off on final files' FROM public.crm_phases WHERE name = 'Publication'
UNION ALL
SELECT id, 'Upload to distribution platforms' FROM public.crm_phases WHERE name = 'Publication'
ON CONFLICT DO NOTHING;


-- ============================================================
-- 16. CRM - AUTHOR TASKS
-- Tracks each author's progress through workflow tasks.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.crm_author_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
  task_id UUID REFERENCES public.crm_workflow_tasks(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES public.crm_phases(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'Not Started',
  notes TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crm_author_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage author tasks" ON public.crm_author_tasks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial'))
);


-- ============================================================
-- 17. STAFF MESSAGES
-- Internal messaging between staff about a specific CRM author.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.staff_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
  sender_email TEXT,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.staff_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage messages" ON public.staff_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial'))
);


-- ============================================================
-- 18. AUTHOR ACCESS
-- Controls which emails can access a CRM author's portal.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.author_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.author_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage author access" ON public.author_access FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 19. FOUNDER PAGE
-- Stores the Founder page content as a single JSON blob.
-- Used by Founder.jsx (section_key = 'main').
-- ============================================================
CREATE TABLE IF NOT EXISTS public.founder_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.founder_page ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read founder page" ON public.founder_page FOR SELECT USING (true);
CREATE POLICY "Admin can manage founder page" ON public.founder_page FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);


-- ============================================================
-- 20. FOUNDER INFO
-- Stores the founder spotlight block on the Home page.
-- Fields: name, title, biography, photo_url.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.founder_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  title TEXT,
  biography TEXT,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.founder_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read founder info" ON public.founder_info FOR SELECT USING (true);
CREATE POLICY "Admin can manage founder info" ON public.founder_info FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);


-- ============================================================
-- 21. TEAM MEMBERS
-- Managed via ContentManagement page (admin only).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  bio TEXT,
  photo TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read team members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admin can manage team members" ON public.team_members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);


-- ============================================================
-- 22. TESTIMONIALS
-- Displayed on the About page. Managed by admin.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_name TEXT NOT NULL,
  title TEXT,
  quote TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin can manage testimonials" ON public.testimonials FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type = 'admin')
);


-- ============================================================
-- 23. EVENT REGISTRATIONS
-- Submitted via the EventSignUpDialog on the Events page.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  event_title TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  occupation TEXT,
  how_did_you_hear TEXT,
  special_requirements TEXT,
  additional_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register for events" ON public.event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view event registrations" ON public.event_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- 24. AUTHOR FILES
-- Files shared by staff with an author via the Author Portal.
-- Authors can view their own files; staff can manage all.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.author_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.author_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage author files" ON public.author_files FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);
CREATE POLICY "Authors can view own files" ON public.author_files FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.author_access
    WHERE author_id = author_files.author_id AND email = auth.email()
  )
);


-- ============================================================
-- 25. AUTHOR MESSAGES
-- Two-way messaging between authors and the publishing team
-- via the Author Portal. Separate from staff_messages (which
-- is internal staff-only communication about an author).
-- ============================================================
CREATE TABLE IF NOT EXISTS public.author_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.authors(id) ON DELETE CASCADE,
  sender_email TEXT,
  content TEXT,
  is_from_author BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.author_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff can manage author messages" ON public.author_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);
CREATE POLICY "Authors can view and send own messages" ON public.author_messages FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.author_access
    WHERE author_id = author_messages.author_id AND email = auth.email()
  )
);


-- ============================================================
-- 26. FEEDBACK (INTERN)
-- Internal feedback submitted by interns on manuscripts.
-- Visible to staff; not surfaced directly to authors.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manuscript_id UUID REFERENCES public.manuscripts(id) ON DELETE CASCADE,
  feedback_text TEXT,
  submitted_by_role TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Interns and staff can insert feedback" ON public.feedback FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff', 'Intern_Editorial', 'Intern_Design', 'Intern_Marketing'))
);
CREATE POLICY "Staff can view all feedback" ON public.feedback FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND user_type IN ('admin', 'Staff'))
);


-- ============================================================
-- DONE
-- All tables created. Check the Table Editor to confirm.
-- ============================================================
