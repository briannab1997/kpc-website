# Kentish Publishing Company: Website Handoff Guide
**Prepared by:** Brianna Brockington, Senior Software Engineer Intern  
**Date:** July 2026  
**For:** Esther Ruth Kentish, CEO

---

## Welcome

This guide is your go-to reference for managing the Kentish Publishing Company website. It walks you through everything from logging in and updating content to reviewing manuscript submissions and using the staff CRM.

No technical background needed. Each section is written in plain, straightforward language with step-by-step instructions so you can pick it up and go.

---

## Table of Contents

1. [Your Website at a Glance](#1-your-website-at-a-glance)
2. [Logging In](#2-logging-in)
3. [Managing Books](#3-managing-books)
4. [Managing Events](#4-managing-events)
5. [Managing News / Blog Posts](#5-managing-news--blog-posts)
6. [Managing Featured Authors](#6-managing-featured-authors)
7. [Managing Testimonials](#7-managing-testimonials)
8. [Managing the Founder Page](#8-managing-the-founder-page)
9. [Managing Collaboration Pages](#9-managing-collaboration-pages)
10. [Approving New Users](#10-approving-new-users)
11. [The Staff CRM](#11-the-staff-crm)
12. [The Author Portal](#12-the-author-portal)
13. [Manuscript Submissions](#13-manuscript-submissions)
14. [Contact Form Submissions](#14-contact-form-submissions)
15. [Your Custom Domain](#15-your-custom-domain)
16. [Updating Social Media Links](#16-updating-social-media-links)
17. [Need Help?](#17-need-help)

---

## 1. Your Website at a Glance

| Item | Details |
|------|---------|
| **Live site** | https://www.kentishpublishingcompany.com |
| **GitHub repository** | https://github.com/briannab1997/kpc-website |
| **Database** | Supabase: https://vdvcrssrmwyjonrlexun.supabase.co |
| **File storage** | Supabase Storage (uploads bucket) |

**Tech stack (for reference):**
- Built with React and Vite
- Styled with Tailwind CSS
- Database and auth powered by Supabase
- Hosted on Vercel (auto-deploys when changes are pushed to GitHub)

---

## 2. Logging In

1. Go to your website and click **Login** in the top navigation bar
2. Enter your admin email and password
3. You will be taken to your **Dashboard**

> **Your admin account** has full access to edit every page on the site. You will see an **Admin** badge and an **Edit Mode** button on any page that supports in-page editing.

**If you forget your password:**  
Click "Forgot password?" on the login page and follow the instructions sent to your email.

---

## 3. Managing Books

The Books page displays your **Published Works** and **Upcoming Works**. As admin, you can add, edit, and delete books directly on the page without touching any code.

### How to add a book

1. Go to the **Books** page
2. Click **Edit Mode** (bottom-right corner)
3. Click **Add Book** (for published) or **Add Upcoming Book** (for upcoming)
4. Fill in the form:
   - **Title** (required)
   - **Year:** the publication year
   - **Genre:** e.g. Poetry, Memoir
   - **Author Name:** the author's full name
   - **Description:** a short summary
   - **Cover Image:** upload a photo
   - **Purchase URL:** link to Amazon or your store
   - **E-book URL:** separate link if applicable
   - **Is Upcoming:** toggle on if the book is not yet published
   - **Is E-book Only:** toggle on if there is no print edition
5. Click **Save Book**

### How to edit or delete a book

1. Click **Edit Mode**
2. Hover over any book card and the edit (blue) and delete (red) buttons will appear
3. Click the pencil icon to edit, or the trash icon to delete

---

## 4. Managing Events

1. Go to the **Events** page
2. Click **Edit Mode** (bottom-right corner)
3. Click **Add Event** to create a new one, or hover over an existing event to edit or delete it
4. Fill in: title, description, date, location, event type, image, and registration URL

**Viewing who signed up:**  
Event registrations are stored in your Supabase database. To view them:
1. Go to https://vdvcrssrmwyjonrlexun.supabase.co
2. Click **Table Editor** in the left sidebar
3. Open the **event_registrations** table

---

## 5. Managing News / Blog Posts

1. Go to the **News** page
2. Click **Edit Mode**
3. Click **Add Post** to write a new article
4. Fill in: title, content, author name, category, and an optional image
5. Click **Save**

To edit or delete a post, hover over it in Edit Mode and use the pencil or trash icon.

---

## 6. Managing Featured Authors

1. Go to the **Authors** page (or **Featured Authors**)
2. Click **Edit Mode**
3. Click **Add Author** to add a new profile
4. Fill in: name, bio, photo, book title, and genre
5. Use **Display Order** to control the order authors appear on the page

---

## 7. Managing Testimonials

Testimonials appear on the **About** page.

1. Go to the **About** page
2. Click **Edit Mode**
3. Use the testimonials section to add, edit, or remove quotes
4. Each testimonial includes: reviewer name, title or role, and the quote text

---

## 8. Managing the Founder Page

The Founder page can be fully edited while you are logged in as admin.

1. Go to the **Founder** page
2. Click **Edit Mode**
3. Use the Edit buttons that appear on each section:
   - **Hero:** your name, title, and photo
   - **Highlights:** the badge row (TEDx Speaker, Author, etc.)
   - **Bio sections:** each paragraph block (you can add, edit, or delete these)
   - **Education:** your academic credentials
   - **Affiliations:** memberships and associations
4. All changes save directly to the database

---

## 9. Managing Collaboration Pages

Each collaboration page (Veterans, Prisons, Nursing Homes, etc.) is individually editable.

1. Navigate to any collaboration page from the **Collaborations** menu
2. If you are logged in as admin, an **Edit** button will appear on the page
3. Click it to update the title, subtitle, and body content
4. Click **Save** when done

---

## 10. Approving New Users

When someone signs up on your website, their account is **pending approval** by default. They will see an "Approval Pending" screen until you approve them.

### To approve a new user

1. Go to https://vdvcrssrmwyjonrlexun.supabase.co
2. Click **Table Editor**, then open the **profiles** table
3. Find the user by their email address
4. Click on their row and set **is_approved** to true
5. Click **Save**

The user will be able to log in fully on their next visit.

### To assign a role to a user

In the same profiles table, update the **user_type** field:

| Role value | Who it's for |
|------------|-------------|
| `author` | Authors using the Author Portal |
| `Staff` | Staff members with CRM access |
| `admin` | Full admin access (you) |
| `Intern_Editorial` | Editorial interns |
| `Intern_Design` | Design interns |
| `Intern_Marketing` | Marketing interns |

---

## 11. The Staff CRM

The Staff CRM is your internal tool for tracking authors through the publishing workflow from submission to publication.

### Accessing it

1. Log in as admin or Staff
2. Click **Staff Portal** in the navigation bar
3. Click **CRM** in the staff dashboard

### Adding a new author to the CRM

1. Click **Add Author**
2. Enter their name, email, and phone number
3. Click **Save**

### Managing an author's workflow

Each author moves through 7 phases:
1. Initial Review
2. Editorial Assessment
3. Revision
4. Copyediting
5. Design and Layout
6. Proofreading
7. Publication

Click on an author to open their detail view. From there you can:
- Mark tasks as complete within each phase
- Move them to the next phase
- Leave internal staff notes and messages
- View the Gantt timeline of their progress
- Manage which team members have access to their portal

### Sharing files with an author

Files shared through the CRM will show up in the author's portal under "My Files." Upload files from the author's detail view in the CRM.

---

## 12. The Author Portal

Authors who are approved and logged in can access their personal **Author Portal**. It shows them:

- Their manuscript's current phase and progress
- Staff messages sent to them
- Files shared by your team
- Their submission details

Authors cannot see each other's information.

---

## 13. Manuscript Submissions

When someone submits a manuscript through the **Submit Your Manuscript** page, it gets saved in two places:

1. **manuscripts table:** the full submission with the file attached
2. **consultations table:** the accompanying consultation form

To review submissions:
1. Log in as admin or Staff
2. Go to **Staff Portal** then **Dashboard**
3. Submissions appear under "Manuscripts"
4. Click any manuscript to open it, add feedback, update the status, or assign interns

---

## 14. Contact Form Submissions

Messages submitted through the **Contact** page are saved in the **contact_submissions** table in Supabase.

To view them:
1. Go to https://vdvcrssrmwyjonrlexun.supabase.co
2. Click **Table Editor**, then open **contact_submissions**

---

## 15. Your Custom Domain

Your website is live at **https://www.kentishpublishingcompany.com**.

The domain was connected in July 2026 by adding the following DNS records in IONOS:

| Type | Host | Value |
|------|------|-------|
| A | @ | 216.198.79.1 |
| CNAME | www | 574077d5ecb1f40f.vercel-dns-017.com |

These records point your IONOS domain to Vercel where the site is hosted. You should not need to change these unless you move hosting providers.

If you ever need to reconnect or verify the domain, log in to https://vercel.com, open the kpc-website project, go to **Settings**, then **Domains**.

---

## 16. Updating Social Media Links

The footer currently has placeholder links for Facebook, Twitter/X, and Instagram. Once you know your handles, they can be updated in one place.

**File to edit:** `src/Layout.jsx`  
Look for the three social media links near the bottom of the file in the Contact Info section of the footer. Replace the placeholder URLs with your actual profile URLs:
```
https://facebook.com/YOUR_HANDLE
https://twitter.com/YOUR_HANDLE
https://instagram.com/YOUR_HANDLE
```

After saving and pushing to GitHub, Vercel will redeploy the site automatically within a couple of minutes.

---

## 17. Need Help?

**Brianna Brockington**  
Senior Software Engineer Intern  
briannab1997@gmail.com

**Useful links:**
- Supabase dashboard: https://vdvcrssrmwyjonrlexun.supabase.co
- GitHub repository: https://github.com/briannab1997/kpc-website
- Vercel dashboard: https://vercel.com

---

*This guide was put together as part of the Software Engineering internship at Kentish Publishing Company, 2026.*
