# Janhit Hospital (जनहित हॉस्पिटल) — Backend & Database Architecture

## 1. Stack Overview

- **Runtime & Framework**: Node.js (v20+ / v24+) with Express.js (v4.21+)
- **Language**: TypeScript with ES Modules
- **Database**: PostgreSQL
- **ORM**: Prisma ORM (v6+)
- **Security & Auth**:
  - JSON Web Tokens (`jsonwebtoken`)
  - Password Hashing (`bcryptjs` with 10 salt rounds)
  - HTTP Security Headers (`helmet`)
  - Configured CORS Origin Whitelisting (`cors`)
  - Rate Limiting (`express-rate-limit`)
  - Request Payload Sanitization & Schema Validation (`zod`)
  - Complete Audit Trail (`AuditLog` table)

---

## 2. Database Models (Prisma Schema)

The schema is defined in [`prisma/schema.prisma`](./prisma/schema.prisma) with the following relational models:

| Model | Purpose | Key Attributes & Relations |
|---|---|---|
| `AdminUser` | Staff and administrator accounts | Email (unique), PasswordHash, Role enum, lastLogin, auditLogs |
| `AuditLog` | Immutable audit trail of admin actions | UserEmail, action, entity, entityId, details (Json), ipAddress, createdAt |
| `Department` | Clinical departments | Slug (unique), Bilingual titles & intros, Bed capacity, services, doctors, appointments |
| `Doctor` | Specialist physicians | Slug, Department relation, Qualifications, OPD schedule, Fee, Room, Appointments |
| `Treatment` | Clinical procedures | Department relation, Bilingual indications, procedure overview, recovery duration |
| `Facility` | Hospital infrastructure & units | Category, bilingual features, emergency flag |
| `Appointment` | Patient booking requests | ReferenceNumber (`APT-2026-XXXX`), Patient info, Doctor relation, Status enum, AdminNotes |
| `AppointmentSlot` | Dynamic booking slots | Doctor relation, date, timeSlot, booking counts, block state |
| `Blog` | Healthcare articles & CMS | Slug, Category relation, Bilingual content, Author, Status (DRAFT/PUBLISHED), Tags |
| `BlogCategory` | Health article categories | Slug, NameEn, NameHi, Description |
| `GalleryItem` | Approved hospital photos & videos | 9 official categories, mediaType, videoUrl, featured flag |
| `Testimonial` | Moderated patient reviews | PatientName, Rating, Bilingual story, isApproved, isVerified |
| `ContactEnquiry` | Patient enquiries from `/contact` | ReferenceNumber (`MSG-2026-XXXX`), Status (NEW, CONTACTED, RESOLVED), StaffNotes |
| `WebsiteSetting` | Hospital global metadata | Contact numbers, 24/7 hotline, address, OPD hours, social links, maintenance mode |

---

## 3. Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database Connection (PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/janhit_hospital?schema=public"

# Security & Authentication
JWT_SECRET="janhit_super_secret_jwt_key_2026_change_in_production"
JWT_EXPIRES_IN="7d"

# CORS Allowed Origin
CORS_ORIGIN="http://localhost:5173"

# Uploads Configuration
UPLOAD_MAX_SIZE_MB=5
UPLOAD_DIR="./uploads"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=300
```

---

## 4. Setup & Running Instructions

### Step 1: Install Dependencies
```bash
cd server
npm install
```

### Step 2: Database Migration & Prisma Generation
```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations against PostgreSQL
npx prisma migrate dev --name init
```

### Step 3: Seed Database
Populate admin accounts, departments, doctors, appointments, blogs, and gallery media:
```bash
npm run prisma:seed
```

### Step 4: Run Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:5000` with the API served at `http://localhost:5000/api/v1`.

---

## 5. Pre-Configured Seed Credentials

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Super Admin** | `superadmin@janhithospital.com` | `JanhitAdmin@2026` | Full administrative control, user management, settings |
| **Hospital Admin** | `admin@janhithospital.com` | `JanhitAdmin@2026` | Doctor, department, appointment, and enquiry management |
| **Reception Desk** | `reception@janhithospital.com` | `JanhitAdmin@2026` | Appointments triage, status updates, enquiries |
| **Content Editor** | `editor@janhithospital.com` | `JanhitAdmin@2026` | Blogs, gallery media, patient testimonials |

---

## 6. Complete REST API Endpoints Reference

### Authentication & Audit (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Public (Rate-Limited) | Authenticate user, returns JWT & user profile |
| `GET` | `/api/v1/auth/me` | Authenticated | Get current authenticated user profile |
| `POST` | `/api/v1/auth/logout` | Authenticated | Logout user and record audit event |
| `GET` | `/api/v1/auth/audit-logs` | Admin / Super Admin | Retrieve immutable audit events trail |

### Clinical Doctors (`/api/v1/doctors`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/doctors` | Public | List doctors with department & search filters |
| `GET` | `/api/v1/doctors/:idOrSlug` | Public | Get single doctor details and OPD schedule |
| `POST` | `/api/v1/doctors` | Admin / Super Admin | Create a new doctor profile |
| `PUT` | `/api/v1/doctors/:id` | Admin / Super Admin | Update doctor profile details |
| `DELETE` | `/api/v1/doctors/:id` | Admin / Super Admin | Remove doctor profile |

### Clinical Departments (`/api/v1/departments`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/departments` | Public | List all active departments |
| `GET` | `/api/v1/departments/:idOrSlug` | Public | Get department with doctors & treatments |
| `POST` | `/api/v1/departments` | Admin / Super Admin | Create clinical department |
| `PUT` | `/api/v1/departments/:id` | Admin / Super Admin | Update department info & services |
| `DELETE` | `/api/v1/departments/:id` | Admin / Super Admin | Delete department |

### Appointment Management (`/api/v1/appointments`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/appointments` | Public (Rate-Limited) | Submit patient appointment request |
| `GET` | `/api/v1/appointments/track/:ref` | Public | Track appointment by reference number |
| `GET` | `/api/v1/appointments` | Admin / Receptionist | List bookings with status/date/search filters |
| `PATCH`| `/api/v1/appointments/:id/status` | Admin / Receptionist | Confirm, Cancel, or Complete appointment |
| `PATCH`| `/api/v1/appointments/:id/reschedule` | Admin / Receptionist | Reschedule appointment date and time |

### Health Blog CMS (`/api/v1/blogs`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/blogs` | Public | List published articles |
| `GET` | `/api/v1/blogs/categories` | Public | List article categories |
| `GET` | `/api/v1/blogs/:slug` | Public | Get article details and increment views |
| `POST` | `/api/v1/blogs` | Admin / Content Editor | Create bilingual article |
| `PUT` | `/api/v1/blogs/:id` | Admin / Content Editor | Update article & SEO metadata |
| `DELETE`| `/api/v1/blogs/:id` | Admin / Content Editor | Remove article |

### Gallery & Media (`/api/v1/gallery`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/gallery` | Public | List photos and videos by category |
| `POST` | `/api/v1/gallery` | Admin / Content Editor | Upload/add approved media item |
| `DELETE`| `/api/v1/gallery/:id` | Admin / Content Editor | Remove media item |

### Contact Enquiries (`/api/v1/enquiries`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/enquiries` | Public (Rate-Limited) | Submit contact enquiry |
| `GET` | `/api/v1/enquiries` | Admin / Receptionist | View contact inquiries with status filter |
| `PATCH`| `/api/v1/enquiries/:id` | Admin / Receptionist | Update inquiry status & staff notes |

### Website Settings & Metrics (`/api/v1/settings`, `/api/v1/stats`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/settings` | Public | Get hospital contact info & settings |
| `PUT` | `/api/v1/settings` | Admin / Super Admin | Update hospital settings |
| `GET` | `/api/v1/stats/dashboard` | Admin / Receptionist | Get overview stats, counts, and recent feeds |

