import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    img: z.string(),
    description: z.string(),
    date: z.date(),
    readTime: z.string(),
    category: z.string(),
    tag: z.array(z.string()),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    img: z.string(),
    date: z.date(),
    description: z.string(),
    site: z.string().optional(),
    repo: z.string().optional(),
    type: z.string().optional(),
    stack: z.array(z.string()).optional(),
  }),
});

const jobs = defineCollection({
  schema: z.object({
    title: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    company: z.string(),
    description: z.array(z.string()),
  }),
});

const certifications = defineCollection({
  schema: z.object({
    title: z.string(),
    tech: z.string(),
    date: z.date(),
    institution: z.string(),
  }),
});

const skills = defineCollection({
  schema: z.object({
    name: z.string(),
    percentage: z.number().optional(),
    category: z.enum(["core", "backend", "design", "tool"]),
  }),
});

export const collections = {
  posts,
  projects,
  jobs,
  certifications,
  skills,
};
