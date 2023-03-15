export type AnalyDomEvent = "click" | "hover";

export interface User {
  id: string;

  username: string;
  email: string;
  name: string;
  avatar_url: string;

  projects: Project[];
}

export interface Project {
  id: string;

  name: String;
  key: String;
  user_id: String;

  created_at: Date;

  sessions: Session[];
  user: User;
}

export interface Event {
  id: string;
  session_id: string;

  name: string;
  referrer: string;
  country: string;
  window_url: string;
  date: string;
  created_at: Date;

  session?: Session;
}

export interface State {
  promises: Promise<any>[];
  apiKey: string | null;
  apiKeyVerified: boolean;
  deviceTypeKnown: boolean;
  lazyEvents: boolean;
  eventsLength: number;
  accessToken: string | null;
  session: Session | null;
  events: Event[];
}

export interface Methods {
  event: (eventName: string) => Promise<void>;
}

export interface Session {
  id: string;
  user_hash: string;
  project_key: string;
  events?: Event[];
  project?: Project;
}

/*

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(uuid())

  username   String @unique
  email      String @unique
  name       String
  avatar_url String

  projects Project[]
}

model Project {
  id String @id @default(uuid())

  name    String
  key     String @unique
  user_id String

  created_at DateTime @default(now())

  sessions Session[]
  user     User      @relation(fields: [user_id], references: [id])
}

model Session {
  id          String  @id
  user_hash   String
  project_key String
  events      Event[]

  project Project @relation(fields: [project_key], references: [key])
}

model Event {
  id         String @id @default(uuid())
  session_id String

  name       String
  window_url String
  created_at DateTime
  // ...more

  session Session @relation(fields: [session_id], references: [id])
}

*/
