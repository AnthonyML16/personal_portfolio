import { defineCollection, z } from "astro:content";

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
  projects,
  jobs,
  certifications,
  skills,
};
